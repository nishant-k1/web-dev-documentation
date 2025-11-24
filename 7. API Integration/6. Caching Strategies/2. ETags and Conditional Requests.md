# ETags and Conditional Requests

Understanding ETags (Entity Tags), conditional requests, 304 Not Modified responses, and efficient cache validation.

---

## Core Concept

**ETag (Entity Tag)** is a unique identifier for a specific version of a resource. Used with conditional requests to check if cached content is still valid.

**Purpose:**
- Validate if cached content is still fresh
- Avoid downloading unchanged content
- Reduce bandwidth usage
- Improve performance

---

## How ETags Work

### Basic Flow

```
1. First Request:
   Client → Server: GET /api/users
   Server → Client: 200 OK + ETag: "abc123" + Data

2. Second Request (with ETag):
   Client → Server: GET /api/users + If-None-Match: "abc123"
   Server checks: Is current ETag still "abc123"?
   
   If YES (unchanged):
   Server → Client: 304 Not Modified (no body, just headers)
   
   If NO (changed):
   Server → Client: 200 OK + ETag: "xyz789" + New Data
```

---

## ETag Format

### Weak vs Strong ETags

**Strong ETag:**
```http
ETag: "abc123"
```

**Weak ETag:**
```http
ETag: W/"abc123"
```

**Difference:**
- **Strong ETag** - Content is byte-for-byte identical
- **Weak ETag** - Content is semantically equivalent (may differ in formatting)

**Use Case:**
- Strong: Exact match required
- Weak: Semantic match acceptable

---

## Server Implementation

### Generate ETag

```javascript
const crypto = require('crypto');

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  const data = JSON.stringify(users);
  
  // Generate ETag from content hash
  const etag = crypto
    .createHash('md5')
    .update(data)
    .digest('hex');
  
  // Check If-None-Match header
  const ifNoneMatch = req.headers['if-none-match'];
  
  if (ifNoneMatch === `"${etag}"`) {
    // Content unchanged - return 304
    res.status(304).end();
    return;
  }
  
  // Content changed - return 200 with new ETag
  res.setHeader('ETag', `"${etag}"`);
  res.setHeader('Cache-Control', 'max-age=3600');
  res.json(users);
});
```

---

### Using Express with ETag

```javascript
const express = require('express');
const app = express();

// Enable ETag (automatic)
app.set('etag', true);

// Or custom ETag function
app.set('etag', (body, encoding) => {
  return crypto.createHash('md5').update(body).digest('hex');
});

app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users); // Express automatically handles ETag
});
```

---

## Frontend Implementation

### Store and Use ETag

```javascript
let cachedETag = null;
let cachedData = null;

async function fetchUsers() {
  const headers = {};
  
  // Include ETag if we have cached data
  if (cachedETag) {
    headers['If-None-Match'] = cachedETag;
  }
  
  const res = await fetch('/api/users', { headers });
  
  if (res.status === 304) {
    // Content unchanged - use cached data
    console.log('Content unchanged, using cache');
    return cachedData;
  }
  
  // Content changed - update cache
  const etag = res.headers.get('ETag');
  const data = await res.json();
  
  cachedETag = etag;
  cachedData = data;
  
  return data;
}
```

---

### React Hook with ETag

```javascript
import { useState, useEffect } from 'react';

function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [etag, setEtag] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const headers = {};
      if (etag) {
        headers['If-None-Match'] = etag;
      }

      const res = await fetch('/api/users', { headers });

      if (res.status === 304) {
        // Content unchanged
        setLoading(false);
        return;
      }

      const newEtag = res.headers.get('ETag');
      const data = await res.json();

      setEtag(newEtag);
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, [etag]);

  return { users, loading };
}
```

---

## Conditional Request Headers

### If-None-Match

**Purpose:** Check if content changed since last request.

```javascript
// First request
fetch('/api/users')
  .then(res => {
    const etag = res.headers.get('ETag');
    localStorage.setItem('users-etag', etag);
  });

// Second request (conditional)
const etag = localStorage.getItem('users-etag');
fetch('/api/users', {
  headers: {
    'If-None-Match': etag
  }
})
  .then(res => {
    if (res.status === 304) {
      // Use cached data
    } else {
      // Use new data
    }
  });
```

---

### If-Modified-Since

**Purpose:** Check if content modified since specific date.

```javascript
// First request
fetch('/api/users')
  .then(res => {
    const lastModified = res.headers.get('Last-Modified');
    localStorage.setItem('users-last-modified', lastModified);
  });

// Second request (conditional)
const lastModified = localStorage.getItem('users-last-modified');
fetch('/api/users', {
  headers: {
    'If-Modified-Since': lastModified
  }
})
  .then(res => {
    if (res.status === 304) {
      // Use cached data
    }
  });
```

---

## 304 Not Modified Response

### What is 304?

**304 Not Modified** means:
- Content hasn't changed
- Use your cached version
- No response body (saves bandwidth)

**Example:**
```http
HTTP/1.1 304 Not Modified
ETag: "abc123"
Cache-Control: max-age=3600
Date: Wed, 01 Jan 2024 12:00:00 GMT

(No body)
```

---

### Handling 304 in Frontend

```javascript
fetch('/api/users', {
  headers: {
    'If-None-Match': cachedETag
  }
})
  .then(res => {
    if (res.status === 304) {
      // Content unchanged
      // Use cached data
      return cachedData;
    } else {
      // Content changed
      return res.json();
    }
  });
```

---

## ETag vs Last-Modified

### Comparison

| Aspect | ETag | Last-Modified |
|--------|------|---------------|
| **Granularity** | Any change | Time-based |
| **Accuracy** | Exact match | Approximate |
| **Use Case** | Any content | Time-stamped content |
| **Header** | `If-None-Match` | `If-Modified-Since` |

**Recommendation:** Use ETag for most cases (more accurate).

---

## Best Practices

### 1. Always Include ETag in Responses

```javascript
// ✅ Good
res.setHeader('ETag', etag);
res.json(data);

// ❌ Bad - No ETag
res.json(data);
```

---

### 2. Check If-None-Match on Server

```javascript
// ✅ Good
const ifNoneMatch = req.headers['if-none-match'];
if (ifNoneMatch === etag) {
  return res.status(304).end();
}
```

---

### 3. Store ETag in Frontend

```javascript
// ✅ Good - Store ETag for next request
const etag = res.headers.get('ETag');
localStorage.setItem('users-etag', etag);
```

---

### 4. Use ETag with Cache-Control

```javascript
// ✅ Good - Combine ETag with Cache-Control
res.setHeader('ETag', etag);
res.setHeader('Cache-Control', 'max-age=3600');
```

---

## Common Questions

### Q: What's the difference between ETag and Cache-Control?

**A:**
- **Cache-Control** - How long to cache (time-based)
- **ETag** - Whether content changed (content-based)

Use both together for optimal caching.

### Q: When should I use weak ETags?

**A:** When content is semantically equivalent but may differ in formatting (e.g., JSON with different key order).

### Q: What if ETag changes but content is the same?

**A:** Use weak ETags (`W/"abc123"`) for semantic equivalence, or ensure ETag generation is consistent.

### Q: Do I need to implement ETag manually?

**A:** Many frameworks (Express, Django) handle ETags automatically. Check framework documentation.

---

## Related Topics

- [HTTP Caching with Cache-Control](./1.%20HTTP%20Caching%20with%20Cache-Control.md) - Cache-Control header
- [Client-Side Caching Strategies](./3.%20Client-Side%20Caching%20Strategies.md) - Client-side caching
- [HTTP Headers](../1.%20HTTP/4.%20HTTP%20Headers.md) - All HTTP headers

---

## Summary

**ETags:**
- Unique identifier for resource version
- Used with `If-None-Match` header
- Server returns 304 if unchanged
- Saves bandwidth and improves performance

**Flow:**
1. First request → Server returns ETag
2. Store ETag in frontend
3. Next request → Include `If-None-Match: etag`
4. Server checks → 304 if unchanged, 200 if changed

**Best Practices:**
- Always include ETag in responses
- Check `If-None-Match` on server
- Store ETag in frontend
- Combine with Cache-Control

**Key Takeaway:** ETags enable efficient cache validation. Server generates ETag from content, client sends it back in `If-None-Match` header, server returns 304 if unchanged (saves bandwidth).

