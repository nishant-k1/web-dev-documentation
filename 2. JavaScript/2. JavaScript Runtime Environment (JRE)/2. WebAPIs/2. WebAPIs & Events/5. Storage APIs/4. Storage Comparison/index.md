# Storage Comparison

Comprehensive comparison of all browser storage types: localStorage, sessionStorage, cookies, IndexedDB, and Cache API.

---

## Quick Comparison Table

| Storage Type | Size Limit | Persistence | Scope | Server Accessible | Data Types | API Type |
|-------------|------------|-------------|-------|-------------------|------------|----------|
| **localStorage** | ~5-10MB | Until cleared | Per origin | ❌ No | Strings | Synchronous |
| **sessionStorage** | ~5-10MB | Tab session | Per tab | ❌ No | Strings | Synchronous |
| **Cookies** | ~4KB | Until expiry | Per domain | ✅ Yes | Strings | Synchronous |
| **IndexedDB** | ~50% disk | Until cleared | Per origin | ❌ No | Any | Asynchronous |
| **Cache API** | Varies | Until cleared | Per origin | ❌ No | Responses | Asynchronous |

---

## Detailed Comparison

### localStorage

**Best for:** User preferences, settings, persistent client-side data

**Pros:**
- ✅ Simple API
- ✅ Persists across sessions
- ✅ Shared across tabs
- ✅ No expiration needed

**Cons:**
- ❌ String storage only
- ❌ Limited size (~5-10MB)
- ❌ Synchronous (can block)
- ❌ Not server-accessible

**Example Use Cases:**
- Theme preferences
- Language settings
- User preferences
- Shopping cart (persistent)

---

### sessionStorage

**Best for:** Temporary data, form data, tab-specific data

**Pros:**
- ✅ Simple API
- ✅ Tab isolation
- ✅ Auto-cleared when tab closes
- ✅ No expiration needed

**Cons:**
- ❌ String storage only
- ❌ Limited size (~5-10MB)
- ❌ Synchronous (can block)
- ❌ Not shared across tabs
- ❌ Not server-accessible

**Example Use Cases:**
- Multi-step form data
- Temporary shopping cart
- Tab-specific state
- Temporary UI state

---

### Cookies

**Best for:** Server-readable data, authentication, tracking

**Pros:**
- ✅ Server-accessible
- ✅ Sent with requests
- ✅ Expiration control
- ✅ Domain/path scoping

**Cons:**
- ❌ Very small size (~4KB)
- ❌ Sent with every request (overhead)
- ❌ String storage only
- ❌ Limited number per domain

**Example Use Cases:**
- Authentication tokens
- Session IDs
- User tracking
- Server-readable preferences

---

### IndexedDB

**Best for:** Large structured data, offline apps, complex queries

**Pros:**
- ✅ Large storage (~50% disk)
- ✅ Stores any data type
- ✅ Indexed queries
- ✅ Asynchronous (non-blocking)
- ✅ Transaction support

**Cons:**
- ❌ Complex API
- ❌ More code required
- ❌ Not server-accessible

**Example Use Cases:**
- Large datasets
- Offline-first apps
- File storage
- Complex queries

---

### Cache API

**Best for:** Caching network resources, offline functionality

**Pros:**
- ✅ Stores HTTP responses
- ✅ Offline support
- ✅ Programmable cache
- ✅ Asynchronous

**Cons:**
- ❌ Service Worker only
- ❌ More complex
- ❌ Not for general data

**Example Use Cases:**
- Offline resources
- Caching API responses
- PWA functionality

---

## Decision Tree

```
Need to store data?
│
├─ Server needs to read it?
│  └─ Yes → Use Cookies
│
├─ Large amount of data (>10MB)?
│  └─ Yes → Use IndexedDB
│
├─ Complex queries needed?
│  └─ Yes → Use IndexedDB
│
├─ Need to persist across sessions?
│  ├─ Yes → Use localStorage
│  └─ No → Use sessionStorage
│
└─ Caching network resources?
   └─ Yes → Use Cache API
```

---

## Size Limits Summary

| Storage Type | Typical Limit | Notes |
|-------------|---------------|-------|
| **localStorage** | 5-10MB | Varies by browser |
| **sessionStorage** | 5-10MB | Varies by browser |
| **Cookies** | 4KB | Per cookie, ~20-50 cookies per domain |
| **IndexedDB** | ~50% disk | Varies by browser and disk space |
| **Cache API** | Varies | Depends on browser and disk space |

---

## Persistence Summary

| Storage Type | When Cleared |
|-------------|--------------|
| **localStorage** | User clears browser data |
| **sessionStorage** | Tab closes |
| **Cookies** | Expiration date reached |
| **IndexedDB** | User clears browser data |
| **Cache API** | User clears browser data or Service Worker unregisters |

---

## Security Considerations

| Storage Type | Security Notes |
|-------------|----------------|
| **localStorage** | Same-origin only, accessible to all scripts on origin |
| **sessionStorage** | Same-origin only, accessible to all scripts on origin |
| **Cookies** | Domain-scoped, can use HttpOnly, Secure, SameSite |
| **IndexedDB** | Same-origin only, accessible to all scripts on origin |
| **Cache API** | Same-origin only, Service Worker context |

---

## Performance Considerations

| Storage Type | Performance Notes |
|-------------|-------------------|
| **localStorage** | Synchronous (can block UI), fast for small data |
| **sessionStorage** | Synchronous (can block UI), fast for small data |
| **Cookies** | Sent with every request (overhead), synchronous |
| **IndexedDB** | Asynchronous (non-blocking), slower for simple operations |
| **Cache API** | Asynchronous (non-blocking), optimized for network resources |

---

## Best Practices

### 1. Choose the Right Storage

- **Simple key-value:** localStorage/sessionStorage
- **Server-readable:** Cookies
- **Large data:** IndexedDB
- **Network caching:** Cache API

### 2. Handle Errors

```javascript
try {
  localStorage.setItem('key', 'value');
} catch (e) {
  if (e.name === 'QuotaExceededError') {
    // Handle quota exceeded
  }
}
```

### 3. Check Support

```javascript
if (typeof Storage !== 'undefined') {
  // localStorage supported
}
```

### 4. Use Helper Functions

Create utility functions to handle JSON serialization, error handling, etc.

---

## Related Topics

- [localStorage and sessionStorage](./1.%20localStorage%20and%20sessionStorage.md) - Web Storage API
- [Cookies](./2.%20Cookies.md) - Cookie API
- [IndexedDB](./3.%20IndexedDB.md) - IndexedDB API
- [Browser Storage Mechanisms](../../../../../../19.%20Browser%20Internals/18.%20Browser%20Storage%20Mechanisms.md) - How browsers store data internally
- [Browser Caching Mechanisms](../../../../../../19.%20Browser%20Internals/16.%20Browser%20Caching%20Mechanisms.md) - HTTP cache and Service Worker cache

---

## Summary

**Choose storage based on:**
- **Size:** IndexedDB > localStorage/sessionStorage > Cookies
- **Persistence:** localStorage/IndexedDB > sessionStorage > Cookies
- **Server access:** Cookies only
- **Complexity:** localStorage/sessionStorage < Cookies < IndexedDB < Cache API

**General rule:**
- Simple data → localStorage/sessionStorage
- Server-readable → Cookies
- Large/complex data → IndexedDB
- Network resources → Cache API

