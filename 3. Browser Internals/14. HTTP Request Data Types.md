# HTTP Request Data Types

Complete guide to how different data types (text, files, JSON, etc.) are encoded and transmitted in HTTP requests.

---

## Core Concept

When you send data over HTTP, it's always converted to text or binary bytes — because HTTP itself is a byte-stream protocol.

**The key is:** The `Content-Type` header defines how that data is formatted or interpreted.

---

## Master Table: Data Types and HTTP Formats

| # | Data Type (in JS/frontend) | Typical HTTP Content-Type | How It's Encoded in Request | How Backend Reads It | Example Use Case |
|---|---------------------------|-------------------------|----------------------------|---------------------|------------------|
| 1️⃣ | **JSON** (object, array, string, number, boolean) | `application/json` | Sent as UTF-8 text, e.g. `{ "name": "Nishant", "age": 26 }` | `req.body` → parsed JSON object | APIs (REST, GraphQL) |
| 2️⃣ | **Form fields** (text, number) | `application/x-www-form-urlencoded` | Key-value pairs encoded like `name=Nishant&age=26` | `req.body` → `{ name: 'Nishant', age: '26' }` | HTML forms, OAuth, login forms |
| 3️⃣ | **File** (image, video, pdf, etc.) + text together | `multipart/form-data` | Text parts = plain text, Files = binary bytes separated by boundaries | `req.file` (binary), `req.body` (text) | File upload (image + caption) |
| 4️⃣ | **File** (binary only, no extra fields) | `application/octet-stream` | Raw binary stream (no form structure) | Read binary stream from body | Direct uploads, downloads |
| 5️⃣ | **Plain text** | `text/plain` | UTF-8 text body (no structure) | `req.body` as string | Simple webhook or debug APIs |
| 6️⃣ | **Query params** (in URL) | (part of URL, no Content-Type) | Key-value pairs in URL: `?page=1&limit=10` | `req.query` | GET filters, pagination |
| 7️⃣ | **Path params** | (part of URL) | `/users/123/posts/45` | `req.params` | RESTful routing |
| 8️⃣ | **Binary file as base64** | `application/json` (or `text/plain`) | File encoded as base64 string (text) | Decode base64 → binary | Emails, limited APIs |
| 9️⃣ | **FormData** (frontend JS API) | auto → `multipart/form-data` | Browser constructs multipart format | Framework parses into text + binary | File + form data combo |
| 🔟 | **Blob** (binary object) | `application/octet-stream` | Raw binary stream | Same as file buffer | Download, file streaming |
| 1️⃣1️⃣ | **URLSearchParams** | `application/x-www-form-urlencoded` | Key-value pairs | `req.body` or `req.query` | HTML form-like requests |

---

## Real-World Examples

### 1. JSON API Request

```javascript
fetch("/api/user", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Nishant", age: 26 }),
});
```

**HTTP payload:**

```
POST /api/user
Content-Type: application/json

{ "name": "Nishant", "age": 26 }
```

---

### 2. Form Submission (Text Fields)

```javascript
const formData = new URLSearchParams();
formData.append("username", "nishant");
formData.append("password", "1234");

fetch("/login", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: formData,
});
```

**HTTP payload:**

```
POST /login
Content-Type: application/x-www-form-urlencoded

username=nishant&password=1234
```

---

### 3. File Upload (with Text)

```javascript
const formData = new FormData();
formData.append("caption", "My trip");
formData.append("photo", file); // binary

fetch("/upload", { method: "POST", body: formData });
```

**HTTP payload (simplified):**

```
Content-Type: multipart/form-data; boundary=----XYZ

------XYZ
Content-Disposition: form-data; name="caption"

My trip

------XYZ
Content-Disposition: form-data; name="photo"; filename="image.jpg"
Content-Type: image/jpeg

<binary bytes here>

------XYZ--
```

---

### 4. Raw Binary Upload (Direct to S3)

```javascript
fetch(s3PresignedUrl, {
  method: "PUT",
  headers: { "Content-Type": "video/mp4" },
  body: file, // binary
});
```

**HTTP payload:**

```
PUT /upload
Content-Type: video/mp4

<binary stream>
```

---

### 5. Plain Text

```javascript
fetch("/api/note", {
  method: "POST",
  headers: { "Content-Type": "text/plain" },
  body: "This is a simple note.",
});
```

---

## React Hook Form Example

### Form with Mixed Data Types

```javascript
import { useForm } from "react-hook-form";

function UploadForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append all fields to FormData
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof FileList) {
        // handle file inputs
        Array.from(data[key]).forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    await fetch("/api/upload", {
      method: "POST",
      body: formData, // Browser sets Content-Type automatically
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name")} />
      <input {...register("email")} />
      <input {...register("phone")} />
      <input type="file" accept="image/*" {...register("image")} />
      <input type="file" accept="audio/*" {...register("audio")} />
      <input type="file" accept="video/*" {...register("video")} />
      <input type="file" accept="application/pdf" {...register("pdf")} />
      <button type="submit">Upload</button>
    </form>
  );
}
```

### What Happens When Submitted

**React Hook Form gives you:**

```javascript
{
  name: "Nishant",
  email: "nishant@email.com",
  phone: "9876543210",
  image: FileList { 0: File(...) },
  audio: FileList { 0: File(...) },
  video: FileList { 0: File(...) },
  pdf: FileList { 0: File(...) }
}
```

**Browser automatically sets:**

```
Content-Type: multipart/form-data; boundary=----abc123
```

**HTTP Request Body:**

```
------abc123
Content-Disposition: form-data; name="name"

Nishant

------abc123
Content-Disposition: form-data; name="email"

nishant@email.com

------abc123
Content-Disposition: form-data; name="phone"

9876543210

------abc123
Content-Disposition: form-data; name="image"; filename="profile.png"
Content-Type: image/png

<binary bytes of image>

------abc123
Content-Disposition: form-data; name="audio"; filename="voice.mp3"
Content-Type: audio/mpeg

<binary bytes of audio>

------abc123
Content-Disposition: form-data; name="video"; filename="intro.mp4"
Content-Type: video/mp4

<binary bytes of video>

------abc123
Content-Disposition: form-data; name="pdf"; filename="resume.pdf"
Content-Type: application/pdf

<binary bytes of pdf>

------abc123--
```

---

## How Each Data Type Travels

| Data Type | Example Input | Encoded as | In HTTP Body | Content-Type | Human Readable? |
|-----------|--------------|------------|--------------|--------------|------------------|
| **Text** | name, email, phone | UTF-8 text | Plain text field | `text/plain` (implicitly) | ✅ Yes |
| **Image** | .png, .jpg | Binary bytes | File section | `image/png` or `image/jpeg` | ❌ No |
| **Audio** | .mp3, .wav | Binary bytes | File section | `audio/mpeg` or `audio/wav` | ❌ No |
| **Video** | .mp4, .mov | Binary bytes | File section | `video/mp4` | ❌ No |
| **PDF** | .pdf | Binary bytes | File section | `application/pdf` | ❌ No |

**So:**
- Text fields are sent as plain UTF-8 text
- Files (image, audio, video, pdf) are sent as binary streams, each with its own MIME type

---

## Backend Parsing

### How Backends Interpret Different Formats

| Format | Common Backend Parser | Output |
|--------|----------------------|--------|
| `application/json` | `express.json()` | `req.body = { name: "Nishant" }` |
| `multipart/form-data` | `multer`, `busboy` | `req.file`, `req.body` |
| `application/x-www-form-urlencoded` | `express.urlencoded()` | `req.body = { a: '1' }` |
| `application/octet-stream` | Manual stream handling | Raw bytes |
| `text/plain` | `express.text()` | `req.body = "plain string"` |

---

## Example: Uploading Video File

### Frontend

```javascript
const file = e.target.files[0]; // File object from <input type="file">
const formData = new FormData();
formData.append("name", "Nishant");
formData.append("video", file);

fetch("/api/upload", {
  method: "POST",
  body: formData, // Browser sets Content-Type automatically
});
```

### HTTP Request (Simplified)

```
POST /api/upload HTTP/1.1
Host: example.com
Content-Type: multipart/form-data; boundary=----abc123
Content-Length: 10485800

------abc123
Content-Disposition: form-data; name="name"

Nishant

------abc123
Content-Disposition: form-data; name="video"; filename="vid_example.mp4"
Content-Type: video/mp4

(binary bytes of the video start here)
00000000 00000001 00000010 00101101 10001000 10101010 ...
00001010 11010010 10010100 01101001 10101001 10010100 ...
(continues for millions of bytes)

------abc123--
```

### Backend (Node.js + Multer)

```javascript
app.post("/api/upload", upload.single("video"), (req, res) => {
  console.log(req.body.name); // "Nishant"
  console.log(req.file); // { buffer: <binary>, mimetype: "video/mp4", size: 10485760 }
});
```

---

## Comparison: Text vs Binary

| Property | Text Data ("Nishant") | Binary File (vid_example.mp4) |
|----------|----------------------|------------------------------|
| **Type in JS** | `string` (primitive) | `File` object (non-primitive) |
| **HTTP Format** | `application/json` or `multipart/form-data` | `multipart/form-data` |
| **Body Data** | UTF-8 text | Binary bytes |
| **Transfer Medium** | HTTPS (TLS encrypted) | HTTPS (TLS encrypted) |
| **Content-Type** | `application/json` or `text/plain` | `video/mp4` |
| **Readable by Humans?** | ✅ Yes | ❌ No (binary stream) |
| **How Backend Receives** | `req.body.name` | `req.file.buffer` |

---

## Key Insights

### Everything is Binary at Transmission Level

**You're correct** — at the lowest level, everything transmitted over networks is binary (bits). Text is just binary data that represents characters according to an encoding scheme (like UTF-8).

**The distinction isn't "binary vs text" at the transmission level, but rather:**

- **Text-based formats** (JSON, XML, HTML) — Binary data that represents human-readable characters
- **Binary file formats** (images, videos, executables) — Binary data that doesn't represent characters

**Both are binary at transmission, but:**
- Text-based formats can be sent directly as UTF-8 encoded strings
- Binary file formats need special handling (like `multipart/form-data` with proper encoding)

---

## Summary: Mental Model

Every HTTP request's body is either:

- **Text** (encoded as JSON, plain text, or URL params)
- **Binary** (encoded as multipart or octet-stream)
- **Or nothing** (for GET requests)

**The key identifier is always:**

```
Content-Type: <MIME type>
```

That tells the server how to decode what it receives.

---

## Quick Reference

| If you are sending... | Use |
|----------------------|-----|
| JSON object (API data) | `Content-Type: application/json` |
| FormData (file upload) | Don't set any header manually (browser handles it) |
| Basic form fields (no files) | `Content-Type: application/x-www-form-urlencoded` |
| Just plain string | `Content-Type: text/plain` |

---

## Related Topics

- [POST Request Content Types](./5.%20POST%20Request%20Content%20Types.md) - Detailed Content-Type explanations
- [Basic File Uploads](./3.%20Basic%20File%20Uploads.md) - How files are uploaded
- [Large File Uploads and Chunking](./13.%20Large%20File%20Uploads%20and%20Chunking.md) - Handling huge files
- [Blob URLs and Memory Management](./12.%20Blob%20URLs%20and%20Memory%20Management.md) - How files are represented in JS

