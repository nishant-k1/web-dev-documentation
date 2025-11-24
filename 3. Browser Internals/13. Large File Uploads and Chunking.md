# Large File Uploads and Chunking

Understanding how large files (like 500GB videos) are uploaded using chunked/multipart uploads.

---

## The Problem with Large Files

### Why Normal Upload Fails

Normally, when you use:

```javascript
const formData = new FormData();
formData.append("video", file);
fetch("/api/upload", { method: "POST", body: formData });
```

The browser:
- Reads the entire file into memory (or temporary storage)
- Sends it in one HTTP request

**But for large files like 500 GB:**

- ❌ Browser can't load it fully into memory
- ❌ The connection might time out
- ❌ Network failures would force a complete reupload
- ❌ Server can't buffer or parse such huge payloads

---

## The Solution: Chunked/Multipart Upload

Instead of uploading 500 GB at once, the browser splits it into small chunks (like 5 MB or 50 MB each) and uploads them piece by piece.

**Example Flow:**

```
video.mp4 (500 GB)
→ split into 10,000 chunks of 50 MB each
→ upload chunks one-by-one or in parallel
→ server/S3 reassembles them into one full file
```

---

## How Chunked Upload Works

### Step 1: Initiate Upload

Frontend asks backend for a multipart upload session:

```javascript
POST /api/s3/start

// Backend calls AWS:
const upload = await s3.createMultipartUpload({
  Bucket: "my-bucket",
  Key: "huge_video.mp4",
  ContentType: "video/mp4"
});

return upload.UploadId;
```

Server returns an `UploadId` to the frontend.

---

### Step 2: Upload Chunks Directly to S3

Frontend reads the file in chunks using the File API:

```javascript
const chunkSize = 50 * 1024 * 1024; // 50 MB

for (let start = 0; start < file.size; start += chunkSize) {
  const chunk = file.slice(start, start + chunkSize);
  const presignedUrl = await getPresignedUrl(uploadId, partNumber);
  await fetch(presignedUrl, { method: "PUT", body: chunk });
}
```

**Each chunk is sent directly to S3** — not via your backend.

**Benefits:**

- ✅ Browser never keeps all 500 GB in memory
- ✅ Only ~50 MB at a time
- ✅ Upload can resume if interrupted
- ✅ Backend stays light and fast

---

### Step 3: Complete Upload

After all parts are uploaded, the frontend tells the backend:

```javascript
POST /api/s3/complete

{
  uploadId: "abc123",
  parts: [
    { ETag: "...", PartNumber: 1 },
    { ETag: "...", PartNumber: 2 },
    // ... all parts
  ]
}
```

Backend finalizes it:

```javascript
await s3.completeMultipartUpload({
  Bucket: "my-bucket",
  Key: "huge_video.mp4",
  UploadId,
  MultipartUpload: { Parts }
});
```

Now AWS S3 combines all the chunks into a single 500 GB video object.

---

## Memory & Browser Behavior

The browser doesn't load the entire file at once.

**When you select a 500 GB file:**

1. The `<input type="file" />` gives you a File object
2. That object doesn't contain the full file — it's a reference (pointer) to the actual file on your hard disk
3. When you call `file.slice()`, it reads just that portion (streamed into memory)
4. That small chunk (~50 MB) is uploaded, then discarded
5. The process repeats

**So:**
- ✅ Memory usage stays low
- ✅ The upload can resume if stopped
- ✅ You never actually "store" 500 GB in RAM

---

## Chunk Size Limits by Cloud Service

### Amazon S3

| Property | Value |
|----------|-------|
| **Minimum part size** | 5 MB |
| **Maximum part size** | 5 GB |
| **Maximum number of parts** | 10,000 |
| **Maximum file size** | 50 TB (10,000 × 5 GB) |
| **Recommended chunk size** | 5–100 MB (50 MB is sweet spot) |

**Example for 500 GB:**

- Using 50 MB chunks: 500 GB ÷ 50 MB = 10,000 chunks ✅ Perfect fit
- Using 100 MB chunks: 500 GB ÷ 100 MB = 5,000 chunks ✅ Also fine

---

### Google Cloud Storage (GCS)

| Property | Value |
|----------|-------|
| **Chunk size** | Flexible (no strict limit) |
| **Minimum recommended** | 256 KB |
| **Maximum recommended** | Several hundred MB |
| **Recommended chunk size** | 8–100 MB |

Uses resumable uploads instead of multipart.

---

### Azure Blob Storage

| Property | Value |
|----------|-------|
| **Maximum block size** | 4000 MiB (≈ 4 GB) |
| **Maximum number of blocks** | 50,000 |
| **Maximum file size** | ~190 TB |
| **Recommended chunk size** | 8–100 MB |

---

### Google Drive (Client SDK)

| Property | Value |
|----------|-------|
| **Chunk size** | Flexible (no fixed limit) |
| **Default in Drive SDK** | 256 KB |
| **Recommended** | 256 KB – 100 MB |

Uses resumable upload with no fixed chunk size limit.

---

## Browser Best Practices

Even though S3 allows 5 GB per chunk, you generally don't go anywhere near that in browsers because:

| Limitation | Reason |
|------------|--------|
| **Memory constraint** | Browser can't easily buffer >100–200 MB in memory |
| **Network reliability** | A 500 MB chunk failing midway means a big re-upload |
| **Progress tracking** | Smaller chunks give better progress reporting |
| **Parallelism** | You can upload 5–10 chunks at once for faster speeds |

**So, in frontend apps, chunk sizes of 5 MB to 50 MB are ideal.**

---

## Trade-Offs Summary

| Chunk Size | Pros | Cons |
|------------|------|------|
| **Small (5–10 MB)** | Easy retries, stable uploads | Many requests, more overhead |
| **Medium (25–100 MB)** | Balanced performance | Fine for browser uploads |
| **Large (500 MB–5 GB)** | Fewer requests, high throughput | Risky for browsers, memory heavy |

---

## Resumable Uploads

If upload stops midway (say after 200 GB):

- Browser remembers which chunks were uploaded
- When you reopen the app, it resumes from chunk #4001, not from the beginning

This is how YouTube, Google Drive, Dropbox work — using resumable chunked uploads with tracking.

---

## Data Transfer via HTTPS

Each chunk is still sent over HTTPS:

- Each chunk request has `Content-Type: video/mp4`
- Each is encrypted via TLS
- The server (or S3) just receives small encrypted chunks sequentially

So HTTPS doesn't care whether it's 1 KB or 50 MB per request — the principle is identical.

---

## Summary Table

| Step | Description | Memory Used | Sent Over |
|------|-------------|-------------|-----------|
| **Select File** | Browser references file on disk | Almost 0 MB | — |
| **Slice Chunk** | Read 50 MB portion | ~50 MB | Local |
| **Upload Chunk** | Send over HTTPS | ~50 MB | HTTPS (TLS encrypted) |
| **Next Chunk** | Repeat until done | ~50 MB per chunk | HTTPS |
| **Finalize** | Backend/S3 combines chunks | Minimal | HTTPS |

---

## Complete Comparison

| Concept | Small File Upload | 500 GB Large File Upload |
|---------|------------------|-------------------------|
| **Format** | Single HTTP POST (FormData) | Multiple chunked PUTs |
| **Memory** | Entire file in RAM | One small chunk in memory |
| **Reliability** | Fails on interruption | Resumable |
| **Backend Load** | Handles file | Offloaded to S3 |
| **Time** | Depends on connection | Chunked + resumable |

---

## Key Takeaways

1. **Large files can't be uploaded in one request** — Browser memory and network constraints
2. **Chunked uploads split files** — Into manageable pieces (5–50 MB)
3. **Each chunk is sent separately** — Over HTTPS, encrypted
4. **Server reassembles chunks** — Into the final complete file
5. **Resumable** — Can resume from where it stopped
6. **Memory efficient** — Only one chunk in memory at a time

---

## Related Topics

- [Basic File Uploads](./3.%20Basic%20File%20Uploads.md) - Basic file uploads
- [Blob URLs and Memory Management](./12.%20Blob%20URLs%20and%20Memory%20Management.md) - How files are stored in memory
- [POST Request Content Types](./5.%20POST%20Request%20Content%20Types.md) - multipart/form-data format

