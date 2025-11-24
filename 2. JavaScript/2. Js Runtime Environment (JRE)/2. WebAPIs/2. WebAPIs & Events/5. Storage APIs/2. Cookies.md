# Cookies

Understanding cookies - how to set, read, and manage cookies using `document.cookie`.

---

## Core Concept

**Cookies** are small pieces of data stored by the browser and sent with every HTTP request to the server.

**Key Characteristics:**
- ✅ Sent with HTTP requests (server-readable)
- ✅ ~4KB size limit
- ✅ Can have expiration date
- ✅ Domain and path scoping
- ✅ Can be HTTP-only (not accessible via JavaScript)

---

## Cookie API

### Setting Cookies

**Basic Syntax:**

```javascript
document.cookie = "name=value";
```

**With Attributes:**

```javascript
document.cookie = "name=value; expires=date; path=/; domain=.example.com; secure; SameSite=Strict";
```

---

### Cookie Attributes

| Attribute | Description | Example |
|-----------|-------------|---------|
| **expires** | Expiration date | `expires=Wed, 21 Oct 2024 07:28:00 GMT` |
| **max-age** | Seconds until expiration | `max-age=3600` (1 hour) |
| **path** | Path where cookie is valid | `path=/` (all paths) |
| **domain** | Domain where cookie is valid | `domain=.example.com` |
| **secure** | Only sent over HTTPS | `secure` |
| **SameSite** | CSRF protection | `SameSite=Strict` |

---

## Setting Cookies

### Basic Cookie

```javascript
// Set cookie
document.cookie = "username=John";

// Set cookie with expiration
document.cookie = "username=John; expires=Wed, 21 Oct 2024 07:28:00 GMT";
```

### Cookie with max-age

```javascript
// Cookie expires in 1 hour
document.cookie = "username=John; max-age=3600";

// Cookie expires in 1 day
document.cookie = "username=John; max-age=86400";
```

### Cookie with Path

```javascript
// Cookie valid for entire site
document.cookie = "username=John; path=/";

// Cookie valid only for /admin path
document.cookie = "admin=true; path=/admin";
```

### Cookie with Domain

```javascript
// Cookie valid for current domain
document.cookie = "username=John; domain=example.com";

// Cookie valid for all subdomains
document.cookie = "username=John; domain=.example.com";
```

### Secure Cookie (HTTPS only)

```javascript
// Cookie only sent over HTTPS
document.cookie = "sessionId=abc123; secure";
```

### SameSite Cookie

```javascript
// Strict: Never sent in cross-site requests
document.cookie = "sessionId=abc123; SameSite=Strict";

// Lax: Sent in top-level navigation
document.cookie = "sessionId=abc123; SameSite=Lax";

// None: Always sent (requires Secure)
document.cookie = "sessionId=abc123; SameSite=None; Secure";
```

---

## Reading Cookies

**Reading all cookies:**

```javascript
// Get all cookies as string
const allCookies = document.cookie;
// Returns: "username=John; theme=dark; language=en"
```

**Parsing cookies:**

```javascript
// Helper function to get cookie value
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

// Usage
const username = getCookie('username'); // 'John'
```

**Better cookie parser:**

```javascript
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [key, value] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}
```

---

## Deleting Cookies

**To delete a cookie, set it with expiration in the past:**

```javascript
// Delete cookie
document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
```

**Helper function:**

```javascript
function deleteCookie(name, path = '/') {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
}

// Usage
deleteCookie('username');
```

---

## Cookie Helper Functions

**Complete cookie utility:**

```javascript
const cookies = {
  // Set cookie
  set: (name, value, days = 7, path = '/') => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=${path}`;
  },
  
  // Get cookie
  get: (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;
  },
  
  // Delete cookie
  delete: (name, path = '/') => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  },
  
  // Get all cookies as object
  getAll: () => {
    const cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [key, value] = cookie.trim().split('=');
      if (key) {
        cookies[key] = decodeURIComponent(value);
      }
    });
    return cookies;
  }
};

// Usage
cookies.set('username', 'John', 30); // Expires in 30 days
const username = cookies.get('username');
cookies.delete('username');
const allCookies = cookies.getAll();
```

---

## Cookie Examples

### Example 1: User Preferences

```javascript
// Set theme preference
cookies.set('theme', 'dark', 365); // Expires in 1 year

// Get theme preference
const theme = cookies.get('theme') || 'light';
document.body.className = theme;
```

### Example 2: Session Tracking

```javascript
// Set session ID
cookies.set('sessionId', generateSessionId(), 1); // Expires in 1 day

// Get session ID
const sessionId = cookies.get('sessionId');
```

### Example 3: Remember Me

```javascript
// Set remember me cookie
if (rememberMe) {
  cookies.set('rememberMe', 'true', 30); // Expires in 30 days
} else {
  cookies.delete('rememberMe');
}
```

---

## Cookie Limitations

### 1. Size Limit

**Problem:** ~4KB size limit per cookie.

**Solution:** Store minimal data, use other storage for large data.

```javascript
// ❌ Too large
document.cookie = `data=${veryLargeString}`; // May fail

// ✅ Store ID, fetch data from server
document.cookie = `dataId=123`;
```

---

### 2. Number of Cookies

**Problem:** Limited number of cookies per domain (~20-50).

**Solution:** Combine data into fewer cookies.

```javascript
// ❌ Many cookies
document.cookie = "pref1=value1";
document.cookie = "pref2=value2";
document.cookie = "pref3=value3";

// ✅ Single cookie with JSON
document.cookie = `preferences=${JSON.stringify({ pref1: 'value1', pref2: 'value2', pref3: 'value3' })}`;
```

---

### 3. String Storage Only

**Problem:** Can only store strings.

**Solution:** Use `JSON.stringify()` and `JSON.parse()`.

```javascript
// Store object
const user = { name: 'John', age: 30 };
cookies.set('user', JSON.stringify(user));

// Retrieve object
const user = JSON.parse(cookies.get('user'));
```

---

## Security Considerations

### 1. HTTP-Only Cookies

**HTTP-only cookies** cannot be accessed via JavaScript (prevents XSS attacks).

**Set by server only:**

```http
Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict
```

**Cannot be set via `document.cookie`** - only server can set HttpOnly cookies.

---

### 2. Secure Cookies

**Secure cookies** are only sent over HTTPS.

```javascript
// Only sent over HTTPS
document.cookie = "sessionId=abc123; secure";
```

---

### 3. SameSite Attribute

**SameSite** prevents CSRF attacks.

```javascript
// Strict: Never sent in cross-site requests
document.cookie = "sessionId=abc123; SameSite=Strict";

// Lax: Sent in top-level navigation (default)
document.cookie = "sessionId=abc123; SameSite=Lax";

// None: Always sent (requires Secure)
document.cookie = "sessionId=abc123; SameSite=None; Secure";
```

---

## Cookies vs localStorage

| Feature | Cookies | localStorage |
|---------|---------|-------------|
| **Size Limit** | ~4KB | ~5-10MB |
| **Server Accessible** | ✅ Yes | ❌ No |
| **Sent with Requests** | ✅ Yes | ❌ No |
| **Expiration** | ✅ Yes | ❌ No (until cleared) |
| **Domain/Path Scope** | ✅ Yes | ❌ No (origin only) |
| **Use Case** | Server-readable data | Client-only data |

---

## When to Use Cookies

✅ **Use cookies for:**
- Authentication tokens (session IDs)
- Server-readable data
- Data that needs expiration
- Cross-subdomain data sharing

❌ **Don't use cookies for:**
- Large data (use localStorage/IndexedDB)
- Client-only data (use localStorage)
- Sensitive data without HttpOnly flag

---

## Common Questions

### Q: Can I store objects in cookies?

**A:** Yes, but you must stringify them: `JSON.stringify(object)`

### Q: How do I make cookies secure?

**A:** Use `secure` flag (HTTPS only) and `HttpOnly` (server-side only).

### Q: What's the difference between expires and max-age?

**A:** `expires` uses a date, `max-age` uses seconds. `max-age` is preferred.

### Q: Can cookies be accessed from other domains?

**A:** No, cookies are domain-scoped. Use `domain` attribute for subdomains.

---

## Related Topics

- [localStorage and sessionStorage](./1.%20localStorage%20and%20sessionStorage.md) - Alternative storage
- [Storage Comparison](./4.%20Storage%20Comparison.md) - Compare all storage types
- [Browser Storage Mechanisms](../../../../../../19.%20Browser%20Internals/18.%20Browser%20Storage%20Mechanisms.md) - How browsers store cookies internally

---

## Summary

**Cookies:**
- ✅ Sent with HTTP requests (server-readable)
- ✅ ~4KB size limit
- ✅ Can have expiration
- ✅ Domain and path scoping
- ✅ Use for authentication, server-readable data

**Key Attributes:**
- `expires` / `max-age` - Expiration
- `path` - Path scope
- `domain` - Domain scope
- `secure` - HTTPS only
- `SameSite` - CSRF protection

**Security:**
- Use `HttpOnly` for sensitive data (server-side only)
- Use `Secure` for HTTPS-only cookies
- Use `SameSite` for CSRF protection

