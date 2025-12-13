# HTTP Caching with Cache-Control

Understanding Cache-Control header - directives, caching strategies, and how browsers and CDNs cache HTTP responses.

---

## Core Concept

**Cache-Control** is an HTTP header that tells browsers and CDNs how to cache responses.

**Purpose:**
- Control how long responses are cached
- Specify where responses can be cached
- Define revalidation behavior
- Optimize performance

---

## Cache-Control Directives

### Basic Directives

#### `max-age=<seconds>`

**How long to cache the response.**

```http
Cache-Control: max-age=3600
```

**Meaning:** Cache for 3600 seconds (1 hour)

**Example:**
```javascript
// Server response
res.setHeader('Cache-Control', 'max-age=3600');

// Browser caches for 1 hour
// Subsequent requests within 1 hour use cache
```

---

#### `no-cache`

**Must revalidate with server before using cached response.**

```http
Cache-Control: no-cache
```

**Meaning:** Always check with server, but can use cache if server says "not modified"

**Use Case:** Dynamic content that might change

**Example:**
```javascript
// Server response
res.setHeader('Cache-Control', 'no-cache');

// Browser behavior:
// 1. Check with server (If-None-Match header)
// 2. If 304 Not Modified → Use cache
// 3. If 200 OK → Use new response
```

---

#### `no-store`

**Don't cache at all.**

```http
Cache-Control: no-store
```

**Meaning:** Never cache this response, always fetch fresh

**Use Case:** Sensitive data, authentication responses

**Example:**
```javascript
// Server response
res.setHeader('Cache-Control', 'no-store');

// Browser behavior:
// Always fetch from server, never cache
```

---

#### `public`

**Can be cached by browser and CDN.**

```http
Cache-Control: public, max-age=3600
```

**Meaning:** Anyone can cache this (browser, CDN, proxy)

**Use Case:** Public static assets

**Example:**
```javascript
// Server response
res.setHeader('Cache-Control', 'public, max-age=86400');

// Can be cached by:
// - Browser
// - CDN
// - Proxy servers
```

---

#### `private`

**Can only be cached by browser, not CDN.**

```http
Cache-Control: private, max-age=3600
```

**Meaning:** Only browser can cache, CDN/proxy cannot

**Use Case:** User-specific content

**Example:**
```javascript
// Server response
res.setHeader('Cache-Control', 'private, max-age=3600');

// Can be cached by:
// - Browser ✅
// - CDN ❌
// - Proxy ❌
```

---

#### `must-revalidate`

**Must check with server if cache is expired.**

```http
Cache-Control: max-age=3600, must-revalidate
```

**Meaning:** If cache expired, must check with server (no stale serving)

**Example:**
```javascript
res.setHeader('Cache-Control', 'max-age=3600, must-revalidate');

// After 1 hour:
// - Must check with server
// - Cannot serve stale content
```

---

#### `stale-while-revalidate`

**Serve stale content while fetching fresh in background.**

```http
Cache-Control: max-age=3600, stale-while-revalidate=86400
```

**Meaning:** 
- Cache for 3600 seconds (fresh)
- After 3600 seconds, serve stale but fetch fresh in background
- Stale serving allowed for up to 86400 seconds

**Use Case:** Better UX - show cached content immediately while updating

**Example:**
```javascript
res.setHeader('Cache-Control', 'max-age=3600, stale-while-revalidate=86400');

// Timeline:
// 0-3600s: Serve from cache (fresh)
// 3600-86400s: Serve stale, fetch fresh in background
// After 86400s: Must fetch fresh
```

---

## Common Cache-Control Patterns

### Pattern 1: Static Assets (Long Cache)

```javascript
// Images, fonts, CSS, JS
res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

// Cache for 1 year
// immutable = content never changes (versioned files)
```

---

### Pattern 2: Dynamic Content (Short Cache)

```javascript
// User data, API responses
res.setHeader('Cache-Control', 'private, max-age=60');

// Cache for 1 minute
// private = user-specific
```

---

### Pattern 3: No Cache (Sensitive Data)

```javascript
// Authentication, payment data
res.setHeader('Cache-Control', 'no-store');

// Never cache
```

---

### Pattern 4: Revalidate Always

```javascript
// Content that might change
res.setHeader('Cache-Control', 'no-cache, must-revalidate');

// Always check with server
// Use cache only if server says "not modified"
```

---

### Pattern 5: Stale While Revalidate

```javascript
// Good UX for frequently updated content
res.setHeader('Cache-Control', 'max-age=300, stale-while-revalidate=3600');

// Fresh for 5 minutes
// Stale for 1 hour (while fetching fresh)
```

---

## Frontend: Reading Cache-Control

### Check Cache Headers

```javascript
fetch('/api/users')
  .then(res => {
    const cacheControl = res.headers.get('Cache-Control');
    console.log('Cache-Control:', cacheControl);
    
    // Parse max-age
    const maxAgeMatch = cacheControl?.match(/max-age=(\d+)/);
    if (maxAgeMatch) {
      const maxAge = parseInt(maxAgeMatch[1]);
      console.log('Cache duration:', maxAge, 'seconds');
    }
  });
```

---

## Cache-Control in Different Scenarios

### Scenario 1: Static Assets

```javascript
// Server
app.get('/static/:file', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.sendFile(path.join(__dirname, 'static', req.params.file));
});
```

**Why:**
- Static files don't change (versioned)
- Long cache = better performance
- `immutable` = browser knows it won't change

---

### Scenario 2: API Responses

```javascript
// Server
app.get('/api/users', (req, res) => {
  res.setHeader('Cache-Control', 'private, max-age=300');
  res.json({ users: [...] });
});
```

**Why:**
- User-specific data
- Short cache = fresh data
- `private` = not cached by CDN

---

### Scenario 3: Real-Time Data

```javascript
// Server
app.get('/api/stock-price', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.json({ price: getCurrentPrice() });
});
```

**Why:**
- Real-time data changes constantly
- `no-store` = always fresh

---

### Scenario 4: User Profile

```javascript
// Server
app.get('/api/profile', authenticateToken, (req, res) => {
  res.setHeader('Cache-Control', 'private, max-age=3600, must-revalidate');
  res.json({ profile: req.user });
});
```

**Why:**
- User-specific
- Might change
- `must-revalidate` = check if expired

---

## Cache-Control Best Practices

### 1. Use Appropriate max-age

```javascript
// ✅ Good - Match content update frequency
// Static assets: long cache
res.setHeader('Cache-Control', 'public, max-age=31536000');

// Dynamic content: short cache
res.setHeader('Cache-Control', 'private, max-age=60');
```

---

### 2. Use public for Static Assets

```javascript
// ✅ Good - Static assets can be cached by CDN
res.setHeader('Cache-Control', 'public, max-age=31536000');

// ❌ Bad - Static assets shouldn't be private
res.setHeader('Cache-Control', 'private, max-age=31536000');
```

---

### 3. Use private for User Data

```javascript
// ✅ Good - User data should be private
res.setHeader('Cache-Control', 'private, max-age=300');

// ❌ Bad - User data shouldn't be public
res.setHeader('Cache-Control', 'public, max-age=300');
```

---

### 4. Use no-store for Sensitive Data

```javascript
// ✅ Good - Never cache sensitive data
res.setHeader('Cache-Control', 'no-store');

// ❌ Bad - Sensitive data shouldn't be cached
res.setHeader('Cache-Control', 'max-age=3600');
```

---

### 5. Use stale-while-revalidate for Better UX

```javascript
// ✅ Good - Better UX with stale-while-revalidate
res.setHeader('Cache-Control', 'max-age=300, stale-while-revalidate=3600');

// Shows cached content immediately
// Fetches fresh in background
```

---

## Common Questions

### Q: What's the difference between no-cache and no-store?

**A:**
- **no-cache** - Can cache, but must revalidate with server
- **no-store** - Cannot cache at all

### Q: When should I use public vs private?

**A:**
- **public** - Static assets, public content (can be cached by CDN)
- **private** - User-specific content (only browser cache)

### Q: What does immutable mean?

**A:** Content never changes. Browser can cache aggressively without revalidation. Use for versioned files (e.g., `app-v1.2.3.js`).

### Q: How does stale-while-revalidate work?

**A:** After cache expires, serve stale content immediately while fetching fresh in background. Better UX than waiting for fresh response.

---

## Related Topics

- [ETags and Conditional Requests](./2.%20ETags%20and%20Conditional%20Requests.md) - Cache validation
- [Browser Caching Mechanisms](../../3.%20Browser%20Internals/16.%20Browser%20Caching%20Mechanisms.md) - Browser cache behavior
- [HTTP Headers](../1.%20HTTP/4.%20HTTP%20Headers.md) - All HTTP headers

---

## Summary

**Cache-Control Directives:**
- `max-age` - How long to cache
- `no-cache` - Must revalidate
- `no-store` - Don't cache
- `public` - Cache in browser and CDN
- `private` - Cache only in browser
- `must-revalidate` - Check if expired
- `stale-while-revalidate` - Serve stale while fetching fresh

**Best Practices:**
- Static assets: `public, max-age=31536000, immutable`
- Dynamic content: `private, max-age=60`
- Sensitive data: `no-store`
- Better UX: `stale-while-revalidate`

**Key Takeaway:** Cache-Control controls how responses are cached. Use appropriate directives based on content type - static assets (long cache), dynamic content (short cache), sensitive data (no cache).

