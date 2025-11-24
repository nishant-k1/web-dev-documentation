# HTTP Headers

Understanding HTTP headers - request headers, response headers, and common headers.

---

## Core Concept

**HTTP headers** provide metadata about the request or response. They're key-value pairs that give additional information.

**Header Format:**

```
Header-Name: header-value
```

**Example:**

```
Content-Type: application/json
Authorization: Bearer token123
```

---

## Request Headers

### Common Request Headers

#### Content-Type

**Purpose:** Specifies the format of the request body.

**When to use:**

- ✅ **POST** - Always include when sending body
- ✅ **PUT** - Always include when sending body
- ✅ **PATCH** - Always include when sending body
- ❌ **GET** - Not needed (no body)
- ❌ **DELETE** - Usually not needed (no body)

**Note:** Content-Type is only needed when the request has a body. GET and DELETE requests typically don't have bodies, so Content-Type is not needed.

**Common Values:**

- `application/json` - JSON data
- `application/x-www-form-urlencoded` - Form data
- `multipart/form-data` - File uploads
- `text/plain` - Plain text

**Example:**

```javascript
// POST request - Content-Type required
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "John" }),
});

// GET request - Content-Type not needed (no body)
fetch("/api/users"); // No Content-Type header needed

// PUT request - Content-Type required
fetch("/api/users/123", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "John Updated" }),
});
```

---

#### Authorization

**Purpose:** Contains authentication credentials.

**Common Formats:**

- `Bearer token123` - OAuth 2.0 / JWT tokens
- `Basic base64(username:password)` - Basic auth
- `ApiKey your-api-key` - API key

**Example:**

```javascript
fetch("/api/users", {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  },
});
```

---

#### Accept

**Purpose:** Specifies what response format the client accepts.

**Common Values:**

- `application/json` - Accept JSON
- `application/xml` - Accept XML
- `text/html` - Accept HTML
- `*/*` - Accept any format

**Example:**

```javascript
fetch("/api/users", {
  headers: {
    Accept: "application/json",
  },
});
```

---

#### Accept-Language

**Purpose:** Specifies preferred language for response.

**Example:**

```javascript
fetch("/api/users", {
  headers: {
    "Accept-Language": "en-US,en;q=0.9",
  },
});
```

---

#### User-Agent

**Purpose:** Identifies the client making the request.

**Example:**

```javascript
fetch("/api/users", {
  headers: {
    "User-Agent": "MyApp/1.0",
  },
});
```

**Note:** Browsers set this automatically. You can override it.

---

#### If-None-Match / If-Modified-Since

**Purpose:** Conditional requests for caching.

**Example:**

```javascript
// Check if resource changed
fetch("/api/users/123", {
  headers: {
    "If-None-Match": etag, // From previous response
  },
}).then((res) => {
  if (res.status === 304) {
    // Use cached version
  }
});
```

---

## Response Headers

### Common Response Headers

#### Content-Type

**Purpose:** Specifies the format of the response body.

**Example:**

```http
Content-Type: application/json
Content-Type: text/html; charset=utf-8
Content-Type: image/png
```

---

#### Content-Length

**Purpose:** Size of response body in bytes.

**Example:**

```http
Content-Length: 1024
```

---

#### Cache-Control

**Purpose:** Controls caching behavior.

**Common Values:**

- `no-cache` - Must revalidate
- `no-store` - Don't cache
- `max-age=3600` - Cache for 1 hour
- `public` - Can be cached publicly
- `private` - Only browser can cache

**Example:**

```http
Cache-Control: public, max-age=3600
```

---

#### Set-Cookie

**Purpose:** Sets cookies in the browser.

**Example:**

```http
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure; SameSite=Strict
```

---

#### Location

**Purpose:** URL for redirects or created resources.

**Example:**

```http
Location: /api/users/123
```

**Used with:**

- 201 Created - URL of created resource
- 301/302 Redirect - Redirect URL

---

#### ETag

**Purpose:** Entity tag for cache validation.

**Example:**

```http
ETag: "abc123"
```

**Usage:**

```javascript
// First request
fetch("/api/users/123").then((res) => {
  const etag = res.headers.get("ETag");
  // Store etag

  // Second request (check if changed)
  fetch("/api/users/123", {
    headers: {
      "If-None-Match": etag,
    },
  });
});
```

---

## CORS Headers

### Access-Control-Allow-Origin

**Purpose:** Specifies which origins can access the resource.

**Example:**

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Origin: *  # Allow all origins
```

---

### Access-Control-Allow-Methods

**Purpose:** Specifies allowed HTTP methods.

**Example:**

```http
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
```

---

### Access-Control-Allow-Headers

**Purpose:** Specifies allowed request headers.

**Example:**

```http
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

### CORS Preflight

**When CORS preflight happens:**

- Non-simple requests (PUT, DELETE, custom headers)
- Browser sends OPTIONS request first

**Example:**

```javascript
// This triggers preflight
fetch("https://api.example.com/users", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token",
  },
});
```

---

## Custom Headers

### Creating Custom Headers

**Request:**

```javascript
fetch("/api/users", {
  headers: {
    "X-API-Version": "v2",
    "X-Client-ID": "my-app-123",
    "X-Request-ID": generateRequestId(),
  },
});
```

**Response:**

```http
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-Request-ID: abc-123-def
```

**Convention:** Custom headers often start with `X-` prefix.

---

## Reading Headers

### Reading Response Headers

```javascript
fetch("/api/users").then((res) => {
  // Get single header
  const contentType = res.headers.get("Content-Type");

  // Get all headers
  res.headers.forEach((value, key) => {
    console.log(key, value);
  });

  // Check if header exists
  if (res.headers.has("ETag")) {
    const etag = res.headers.get("ETag");
  }
});
```

---

## Common Header Patterns

### Authentication Pattern

```javascript
// Bearer token
headers: {
  'Authorization': 'Bearer ' + token
}

// Basic auth
headers: {
  'Authorization': 'Basic ' + btoa(username + ':' + password)
}

// API key
headers: {
  'X-API-Key': apiKey
}
```

---

### Content Negotiation Pattern

```javascript
// Request JSON response
headers: {
  'Accept': 'application/json'
}

// Request specific language
headers: {
  'Accept-Language': 'en-US'
}
```

---

### Caching Pattern

```javascript
// Conditional request
headers: {
  'If-None-Match': etag,
  'If-Modified-Since': lastModified
}
```

---

## Headers by Request Type

### Which Headers for Which Methods?

| Header                | GET    | POST   | PUT    | PATCH  | DELETE | Notes                       |
| --------------------- | ------ | ------ | ------ | ------ | ------ | --------------------------- |
| **Content-Type**      | ❌ No  | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No  | Only for requests with body |
| **Authorization**     | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | For authenticated requests  |
| **Accept**            | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | Preferred response format   |
| **Accept-Language**   | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | Preferred language          |
| **User-Agent**        | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | Client identification       |
| **If-None-Match**     | ✅ Yes | ❌ No  | ❌ No  | ❌ No  | ❌ No  | Conditional GET (caching)   |
| **If-Modified-Since** | ✅ Yes | ❌ No  | ❌ No  | ❌ No  | ❌ No  | Conditional GET (caching)   |
| **X-API-Key**         | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | API key authentication      |
| **X-Request-ID**      | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes | Request tracking            |

**Legend:**

- ✅ **Yes** - Commonly used with this method
- ❌ **No** - Not needed or not applicable

---

### Quick Reference by Method

#### GET Requests

**Common Headers:**

```javascript
fetch("/api/users", {
  headers: {
    Accept: "application/json", // ✅ Preferred response format
    Authorization: "Bearer token123", // ✅ If authenticated
    "Accept-Language": "en-US", // ✅ Optional
    "If-None-Match": etag, // ✅ Conditional request (caching)
  },
});
```

**Not Needed:**

- ❌ `Content-Type` - No body

---

#### POST Requests

**Common Headers:**

```javascript
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json", // ✅ Required (has body)
    Authorization: "Bearer token123", // ✅ If authenticated
    Accept: "application/json", // ✅ Preferred response format
  },
  body: JSON.stringify({ name: "John" }),
});
```

**Required:**

- ✅ `Content-Type` - Must specify body format

---

#### PUT Requests

**Common Headers:**

```javascript
fetch("/api/users/123", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json", // ✅ Required (has body)
    Authorization: "Bearer token123", // ✅ If authenticated
    Accept: "application/json", // ✅ Preferred response format
  },
  body: JSON.stringify({ name: "John Updated" }),
});
```

**Required:**

- ✅ `Content-Type` - Must specify body format

---

#### PATCH Requests

**Common Headers:**

```javascript
fetch("/api/users/123", {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json", // ✅ Required (has body)
    Authorization: "Bearer token123", // ✅ If authenticated
    Accept: "application/json", // ✅ Preferred response format
  },
  body: JSON.stringify({ email: "new@example.com" }),
});
```

**Required:**

- ✅ `Content-Type` - Must specify body format

---

#### DELETE Requests

**Common Headers:**

```javascript
fetch("/api/users/123", {
  method: "DELETE",
  headers: {
    Authorization: "Bearer token123", // ✅ If authenticated
    Accept: "application/json", // ✅ Preferred response format
  },
});
```

**Not Needed:**

- ❌ `Content-Type` - Usually no body

---

## Header Best Practices

### 1. Always Set Content-Type (for requests with body)

```javascript
// ✅ Good - POST with Content-Type
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});

// ❌ Bad - POST without Content-Type (browser may guess wrong)
fetch("/api/users", {
  method: "POST",
  body: JSON.stringify(data),
});

// ✅ Good - GET doesn't need Content-Type (no body)
fetch("/api/users");

// ✅ Good - PUT/PATCH need Content-Type (has body)
fetch("/api/users/123", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
});
```

### 2. Use Appropriate Accept Header

```javascript
// ✅ Good - Specify what you want
headers: {
  'Accept': 'application/json'
}

// ❌ Bad - Accepts anything
headers: {
  'Accept': '*/*'
}
```

### 3. Include Request ID for Debugging

```javascript
// ✅ Good - Track requests
headers: {
  'X-Request-ID': generateId()
}
```

---

## Common Questions

### Q: Do I need to set Content-Type for GET requests?

**A:** No. GET requests don't have a body, so Content-Type isn't needed. Content-Type is only for requests with a body (POST, PUT, PATCH).

### Q: Is Content-Type only for POST requests?

**A:** No. Content-Type is for any request that has a body:

- ✅ **POST** - Always include Content-Type
- ✅ **PUT** - Always include Content-Type
- ✅ **PATCH** - Always include Content-Type
- ❌ **GET** - Not needed (no body)
- ❌ **DELETE** - Usually not needed (no body)

**Rule:** If your request has a body, include Content-Type header.

### Q: What's the difference between Authorization and X-API-Key?

**A:**

- **Authorization** - Standard header for authentication
- **X-API-Key** - Custom header (some APIs use this)

### Q: Can I create custom headers?

**A:** Yes, but some headers are restricted by CORS. Use `X-` prefix for custom headers.

---

## Related Topics

- [HTTP Methods](./2.%20HTTP%20Methods.md) - Which headers for which methods
- [HTTP Status Codes](./3.%20HTTP%20Status%20Codes.md) - Headers in responses
- [HTTP Request Response Structure](./5.%20HTTP%20Request%20Response%20Structure.md) - How headers fit in structure
- [Authentication](./8.%20Authentication.md) - Authentication headers
- [POST Request Content Types](../../19.%20Browser%20Internals/5.%20POST%20Request%20Content%20Types.md) - Content-Type header details
- [Browser Caching Mechanisms](../../19.%20Browser%20Internals/16.%20Browser%20Caching%20Mechanisms.md) - Cache-Control header details
- [Browser Security](../../19.%20Browser%20Internals/9.%20Browser%20Security.md) - CORS and security headers

---

## Summary

**Headers by Request Type:**

| Header            | GET | POST | PUT | PATCH | DELETE |
| ----------------- | --- | ---- | --- | ----- | ------ |
| **Content-Type**  | ❌  | ✅   | ✅  | ✅    | ❌     |
| **Authorization** | ✅  | ✅   | ✅  | ✅    | ✅     |
| **Accept**        | ✅  | ✅   | ✅  | ✅    | ✅     |

**Key Rules:**

1. **Content-Type** - Only for requests with body (POST, PUT, PATCH)
2. **Authorization** - For all authenticated requests (all methods)
3. **Accept** - For all requests (specify response format)
4. **Conditional headers** - Only for GET (If-None-Match, If-Modified-Since)

**Common Request Headers:**

- `Content-Type` - Request body format (POST, PUT, PATCH only)
- `Authorization` - Authentication credentials (all methods)
- `Accept` - Preferred response format (all methods)

**Common Response Headers:**

- `Content-Type` - Response body format
- `Cache-Control` - Caching instructions
- `Set-Cookie` - Set cookies
- `ETag` - Cache validation

**CORS Headers:**

- `Access-Control-Allow-Origin` - Allowed origins
- `Access-Control-Allow-Methods` - Allowed methods
- `Access-Control-Allow-Headers` - Allowed headers

**Best Practices:**

- Always set Content-Type for POST/PUT/PATCH
- Use Accept header to specify response format
- Include Authorization header for authenticated requests
