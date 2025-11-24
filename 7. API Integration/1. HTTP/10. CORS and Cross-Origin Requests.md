# CORS and Cross-Origin Requests

Understanding CORS (Cross-Origin Resource Sharing) - how browsers handle cross-origin requests and how to work with them.

---

## Core Concept

**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that controls which origins can access resources from your server.

**Same-Origin Policy:**
- Browsers block requests to different origins by default
- CORS allows servers to specify which origins can access their resources

---

## What is Same-Origin?

**Same-Origin** means:
- Same **protocol** (http vs https)
- Same **domain** (example.com)
- Same **port** (80 vs 443)

**Examples:**

| URL 1 | URL 2 | Same-Origin? |
|-------|-------|--------------|
| `https://example.com` | `https://example.com/api` | ✅ Yes |
| `https://example.com` | `http://example.com` | ❌ No (different protocol) |
| `https://example.com` | `https://api.example.com` | ❌ No (different domain) |
| `https://example.com:443` | `https://example.com:8080` | ❌ No (different port) |

---

## Why CORS Exists

**Security:** Prevents malicious websites from making unauthorized requests to other sites.

**Example Attack (Without CORS):**
```
1. User visits evil.com
2. evil.com makes request to bank.com/api/transfer
3. Browser sends user's cookies automatically
4. Money transferred! 💸
```

**With CORS:**
- Browser blocks the request
- Server must explicitly allow evil.com (which it won't)

---

## Simple Requests vs Preflight Requests

### Simple Requests

**Simple requests** don't trigger CORS preflight. Browser sends request directly.

**Conditions for Simple Request:**
- ✅ Method: GET, POST, or HEAD
- ✅ Headers: Only simple headers (Accept, Accept-Language, Content-Language, Content-Type)
- ✅ Content-Type: `application/x-www-form-urlencoded`, `multipart/form-data`, or `text/plain`

**Example:**

```javascript
// ✅ Simple request
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
});
```

---

### Preflight Requests

**Preflight requests** are OPTIONS requests sent before the actual request.

**Triggers Preflight:**
- ❌ Methods: PUT, DELETE, PATCH
- ❌ Custom headers (X-API-Key, X-Custom-Header)
- ❌ Content-Type: `application/json`

**Example:**

```javascript
// ❌ Triggers preflight
fetch('https://api.example.com/users', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'abc123'  // Custom header
  },
  body: JSON.stringify({ name: 'John' })
});
```

**What Happens:**
```
1. Browser sends OPTIONS request (preflight)
   OPTIONS /users HTTP/1.1
   Origin: https://example.com
   Access-Control-Request-Method: PUT
   Access-Control-Request-Headers: content-type, x-api-key

2. Server responds with CORS headers
   Access-Control-Allow-Origin: https://example.com
   Access-Control-Allow-Methods: PUT, POST, GET
   Access-Control-Allow-Headers: content-type, x-api-key

3. Browser sends actual PUT request (if preflight succeeded)
```

---

## CORS Headers

### Request Headers (Browser Sends)

**Origin:**
```
Origin: https://example.com
```
- Browser automatically adds this
- Cannot be set by JavaScript

**Access-Control-Request-Method:**
```
Access-Control-Request-Method: PUT
```
- Sent in preflight request
- Specifies method of actual request

**Access-Control-Request-Headers:**
```
Access-Control-Request-Headers: content-type, x-api-key
```
- Sent in preflight request
- Lists custom headers

---

### Response Headers (Server Must Send)

**Access-Control-Allow-Origin:**
```
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Origin: *  // Allow all origins
```
- **Required** - Specifies allowed origins
- `*` allows all origins (not recommended for credentials)

**Access-Control-Allow-Methods:**
```
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```
- Required for preflight
- Lists allowed HTTP methods

**Access-Control-Allow-Headers:**
```
Access-Control-Allow-Headers: content-type, authorization, x-api-key
```
- Required for preflight
- Lists allowed request headers

**Access-Control-Allow-Credentials:**
```
Access-Control-Allow-Credentials: true
```
- Allows cookies/credentials
- Cannot use with `Access-Control-Allow-Origin: *`

**Access-Control-Max-Age:**
```
Access-Control-Max-Age: 86400
```
- How long to cache preflight response (seconds)
- Reduces preflight requests

---

## Common CORS Errors

### Error 1: "No 'Access-Control-Allow-Origin' header"

**Error Message:**
```
Access to fetch at 'https://api.example.com/users' from origin 'https://example.com' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present 
on the requested resource.
```

**Cause:** Server not sending CORS headers

**Solution:** Server must add `Access-Control-Allow-Origin` header

---

### Error 2: "Credentials flag is true"

**Error Message:**
```
Access to fetch at 'https://api.example.com/users' from origin 'https://example.com' 
has been blocked by CORS policy: The value of the 'Access-Control-Allow-Credentials' 
header in the response is '' which must be 'true' when the request's credentials mode is 'include'.
```

**Cause:** Request includes credentials but server doesn't allow it

**Solution:** 
- Server: Add `Access-Control-Allow-Credentials: true`
- Client: Remove `credentials: 'include'` or server must allow it

---

### Error 3: "Method PUT is not allowed"

**Error Message:**
```
Access to fetch at 'https://api.example.com/users' from origin 'https://example.com' 
has been blocked by CORS policy: Method PUT is not allowed by Access-Control-Allow-Methods.
```

**Cause:** Server doesn't allow PUT method

**Solution:** Server must include PUT in `Access-Control-Allow-Methods`

---

### Error 4: "Header x-api-key is not allowed"

**Error Message:**
```
Access to fetch at 'https://api.example.com/users' from origin 'https://example.com' 
has been blocked by CORS policy: Request header field x-api-key is not allowed by 
Access-Control-Allow-Headers.
```

**Cause:** Server doesn't allow custom header

**Solution:** Server must include header in `Access-Control-Allow-Headers`

---

## Handling CORS in Frontend

### Making CORS Requests

**Simple Request:**

```javascript
// ✅ Simple request (no preflight)
fetch('https://api.example.com/users', {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
});
```

**Preflight Request:**

```javascript
// ✅ Preflight request (OPTIONS sent first)
fetch('https://api.example.com/users', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({ name: 'John' })
});
```

---

### Including Credentials

**With Credentials:**

```javascript
fetch('https://api.example.com/users', {
  credentials: 'include',  // Include cookies
  headers: {
    'Authorization': 'Bearer token123'
  }
});
```

**Requirements:**
- Server must send: `Access-Control-Allow-Credentials: true`
- Server cannot use: `Access-Control-Allow-Origin: *`
- Must specify exact origin: `Access-Control-Allow-Origin: https://example.com`

---

### Handling CORS Errors

```javascript
fetch('https://api.example.com/users')
  .then(res => res.json())
  .catch(error => {
    if (error.message.includes('CORS')) {
      console.error('CORS error:', error.message);
      // Show user-friendly message
      // Or use proxy/server-side request
    }
  });
```

---

## CORS Solutions

### Solution 1: Server-Side Fix (Recommended)

**Backend must add CORS headers:**

```javascript
// Express.js example
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
```

---

### Solution 2: Proxy Server

**Use proxy to avoid CORS:**

```javascript
// Instead of: https://api.example.com/users
// Use: /api/proxy/users (your server)

// Your server makes request to api.example.com
// Returns response to frontend
```

---

### Solution 3: CORS Proxy (Development Only)

**⚠️ Development only - not for production:**

```javascript
// Use public CORS proxy (development only!)
fetch('https://cors-anywhere.herokuapp.com/https://api.example.com/users')
```

**Why not for production:**
- Security risk
- Performance issues
- Unreliable

---

## CORS Best Practices

### 1. Specify Exact Origins

```javascript
// ❌ Bad - Too permissive
Access-Control-Allow-Origin: *

// ✅ Good - Specific origin
Access-Control-Allow-Origin: https://example.com

// ✅ Good - Multiple origins (check dynamically)
const allowedOrigins = ['https://example.com', 'https://app.example.com'];
if (allowedOrigins.includes(req.headers.origin)) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
}
```

---

### 2. Limit Allowed Methods

```javascript
// ❌ Bad - Too permissive
Access-Control-Allow-Methods: *

// ✅ Good - Only needed methods
Access-Control-Allow-Methods: GET, POST, PUT
```

---

### 3. Limit Allowed Headers

```javascript
// ❌ Bad - Too permissive
Access-Control-Allow-Headers: *

// ✅ Good - Only needed headers
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

### 4. Cache Preflight Responses

```javascript
// ✅ Cache preflight for 24 hours
Access-Control-Max-Age: 86400
```

---

## Common Questions

### Q: Why do I get CORS errors in browser but not Postman?

**A:** CORS is a browser security feature. Postman doesn't enforce CORS, so requests work there but fail in browser.

### Q: Can I disable CORS in browser?

**A:** No (for security). You can disable for development using browser flags, but never for production.

### Q: Does CORS apply to server-to-server requests?

**A:** No. CORS only applies to browser requests. Server-to-server requests don't have CORS restrictions.

### Q: What's the difference between CORS and CORS preflight?

**A:**
- **CORS** - Overall mechanism
- **Preflight** - OPTIONS request sent before actual request (for non-simple requests)

---

## Related Topics

- [HTTP Headers](./4.%20HTTP%20Headers.md) - CORS headers details
- [HTTP Methods](./2.%20HTTP%20Methods.md) - Which methods trigger preflight
- [HTTP Status Codes](./3.%20HTTP%20Status%20Codes.md) - CORS error status codes
- [Error Handling](./7.%20Error%20Handling.md) - Handling CORS errors
- [Browser Security](../../19.%20Browser%20Internals/9.%20Browser%20Security.md) - Browser security mechanisms

---

## Summary

**CORS:**
- Browser security mechanism
- Controls cross-origin requests
- Server must send CORS headers

**Simple vs Preflight:**
- **Simple requests** - GET, POST, HEAD (no preflight)
- **Preflight requests** - PUT, DELETE, custom headers (OPTIONS first)

**Common Errors:**
- Missing `Access-Control-Allow-Origin`
- Credentials not allowed
- Method/header not allowed

**Solutions:**
- Fix server-side (recommended)
- Use proxy server
- CORS proxy (development only)

**Key Takeaway:** CORS is a browser security feature. Server must explicitly allow cross-origin requests by sending CORS headers.

