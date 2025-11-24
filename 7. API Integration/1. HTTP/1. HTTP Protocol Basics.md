# HTTP Protocol Basics

Understanding the HTTP protocol - what it is, how it works, and HTTP versions.

---

## Core Concept

**HTTP (Hypertext Transfer Protocol)** is a protocol for transferring data between a client and a server over the internet.

**Key Characteristics:**

- ✅ **Stateless** - Each request is independent
- ✅ **Request-Response** - Client sends request, server sends response
- ✅ **Text-based** - Human-readable protocol
- ✅ **Application layer** - Works on top of TCP/IP

---

## What is HTTP?

**HTTP** is a protocol that defines:

- How clients request data from servers
- How servers respond to requests
- Format of requests and responses
- Status codes and error handling

**Analogy:** HTTP is like a language that browsers and servers use to communicate.

---

## HTTP vs HTTPS

### HTTP (Hypertext Transfer Protocol)

- ❌ **Not encrypted** - Data sent in plain text
- ❌ **Not secure** - Vulnerable to interception
- ✅ **Faster** - No encryption overhead
- ✅ **Port 80**

### HTTPS (HTTP Secure)

- ✅ **Encrypted** - Data encrypted with TLS/SSL
- ✅ **Secure** - Protected from interception
- ⚠️ **Slightly slower** - Encryption overhead
- ✅ **Port 443**

**When to use:**

- **HTTP:** Development, internal networks
- **HTTPS:** Production, any sensitive data (required for modern web)

---

## How HTTP Works

### Basic Flow

```
1. Client sends HTTP request
   ↓
2. Request travels over internet
   ↓
3. Server receives request
   ↓
4. Server processes request
   ↓
5. Server sends HTTP response
   ↓
6. Client receives response
```

### Example Request

```
GET /api/users HTTP/1.1
Host: api.example.com
Accept: application/json
Authorization: Bearer token123
```

### Example Response

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 156

{
  "users": [
    { "id": 1, "name": "John" }
  ]
}
```

---

## HTTP Versions

### HTTP/1.1 (Most Common)

**Features:**

- ✅ Persistent connections (keep-alive)
- ✅ Chunked transfer encoding
- ✅ Host header required
- ✅ Pipelining (limited support)

**Limitations:**

- ❌ One request per connection (mostly)
- ❌ Head-of-line blocking
- ❌ No server push

**Status:** Widely supported, current standard.

---

### HTTP/2

**Features:**

- ✅ **Multiplexing** - Multiple requests over single connection
- ✅ **Header compression** - Reduces overhead
- ✅ **Server push** - Server can push resources
- ✅ **Binary protocol** - More efficient

**Benefits:**

- Faster page loads
- Better performance
- Reduced latency

**Status:** Widely supported, recommended for production.

---

### HTTP/3

**Features:**

- ✅ **QUIC protocol** - Built on UDP instead of TCP
- ✅ **Faster connection** - No TCP handshake
- ✅ **Better multiplexing** - Improved over HTTP/2
- ✅ **Connection migration** - Survives network changes

**Benefits:**

- Even faster than HTTP/2
- Better for mobile networks
- Reduced latency

**Status:** Emerging standard, growing support.

---

## HTTP Request Structure

### Request Components

```
[Method] [URL] [HTTP Version]
[Headers]
[Blank Line]
[Body] (optional)
```

**Example:**

```
POST /api/users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer token123

{
  "name": "John",
  "email": "john@example.com"
}
```

---

## HTTP Response Structure

### Response Components

```
[HTTP Version] [Status Code] [Status Message]
[Headers]
[Blank Line]
[Body] (optional)
```

**Example:**

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 45

{
  "id": 1,
  "name": "John"
}
```

---

## Stateless Nature

### What Does Stateless Mean?

**Stateless** means the server doesn't remember previous requests. Each request is independent.

**Implications:**

- Server doesn't remember if you're logged in (need tokens/cookies)
- Each request must include all necessary information
- No server-side session state (by default)

**Example:**

```
Request 1: GET /api/users
→ Server responds with users

Request 2: GET /api/users
→ Server doesn't remember Request 1
→ Must include auth token again
```

---

## HTTP Methods Overview

| Method     | Purpose         | Example               |
| ---------- | --------------- | --------------------- |
| **GET**    | Retrieve data   | `GET /api/users`      |
| **POST**   | Create resource | `POST /api/users`     |
| **PUT**    | Update/replace  | `PUT /api/users/1`    |
| **PATCH**  | Partial update  | `PATCH /api/users/1`  |
| **DELETE** | Delete resource | `DELETE /api/users/1` |

_(See [HTTP Methods](./2.%20HTTP%20Methods.md) for details)_

---

## Common Questions

### Q: What's the difference between HTTP and HTTPS?

**A:** HTTPS is HTTP with encryption (TLS/SSL). HTTPS is required for secure data transfer.

### Q: Why is HTTP stateless?

**A:** Stateless design makes HTTP scalable - servers don't need to maintain session state, allowing them to handle more requests.

### Q: Should I use HTTP/2 or HTTP/3?

**A:**

- **HTTP/2:** Widely supported, good performance
- **HTTP/3:** Best performance, growing support

Most modern servers support HTTP/2 automatically. HTTP/3 is still emerging.

### Q: Can HTTP work without the internet?

**A:** Yes, HTTP works on local networks (localhost, LAN). It's a protocol, not tied to the internet.

---

## Related Topics

- [HTTP Methods](./2.%20HTTP%20Methods.md) - GET, POST, PUT, PATCH, DELETE
- [HTTP Status Codes](./3.%20HTTP%20Status%20Codes.md) - Response status codes
- [HTTP Headers](./4.%20HTTP%20Headers.md) - Request and response headers
- [HTTP Request Response Structure](./5.%20HTTP%20Request%20Response%20Structure.md) - Detailed request/response structure
- [Browser Request Lifecycle](../../19.%20Browser%20Internals/1.%20Browser%20Request%20Lifecycle.md) - How browsers use HTTP

---

## Summary

**HTTP:**

- Protocol for client-server communication
- Stateless (each request is independent)
- Request-response model
- Text-based (human-readable)

**HTTPS:**

- HTTP with encryption
- Required for secure data transfer
- Uses TLS/SSL

**HTTP Versions:**

- **HTTP/1.1** - Current standard, widely supported
- **HTTP/2** - Multiplexing, better performance
- **HTTP/3** - QUIC protocol, fastest

**Key Takeaway:** HTTP is the foundation of web APIs. Understanding HTTP is essential for API integration.
