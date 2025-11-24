# Browser Security

Understanding browser security restrictions that affect web development.

---

## File Input Restrictions

- ❌ Cannot read the selected file's path (browser hides it for security)
- ❌ Cannot auto-upload without user interaction
- ❌ Cannot pre-fill a file input (`value` attribute is forbidden)
- ❌ JavaScript can't read file contents without `FileReader` API

These restrictions prevent malicious websites from accessing files on your computer without your knowledge.

---

## CORS (Cross-Origin Resource Sharing)

When making requests to external domains:

- Browser enforces CORS policies
- Requests to different origins may be blocked unless server allows it

### What is Same-Origin?

Two URLs have the same origin if they have:
- Same **protocol** (http/https)
- Same **domain** (example.com)
- Same **port** (80/443)

### CORS Example

```javascript
// This will fail if api.example.com doesn't allow CORS
fetch("https://api.example.com/users", {
  method: "GET",
});
```

**Error:** `Access to fetch at 'https://api.example.com/users' from origin 'https://mysite.com' has been blocked by CORS policy`

**Solution:** Server must include CORS headers:
```
Access-Control-Allow-Origin: https://mysite.com
```

---

## Content Security Policy (CSP)

Browsers can restrict:

- Which scripts can run
- Which resources can be loaded
- Which domains can be accessed

### CSP Example

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

This policy:
- ✅ Allows scripts from same origin
- ✅ Allows inline scripts (`unsafe-inline`)
- ❌ Blocks external scripts
- ❌ Blocks external stylesheets (unless specified)

---

## Mixed Content

Browsers block **mixed content** — HTTP resources on HTTPS pages.

**Example:**

```html
<!-- HTTPS page -->
<img src="http://insecure.com/image.jpg" />
<!-- ❌ Blocked -->
```

**Why?** Security risk — HTTPS page loading HTTP resources can be intercepted.

**Solution:** Use HTTPS for all resources.

---

## XSS (Cross-Site Scripting) Protection

Browsers have built-in XSS protection:

- Escapes HTML in user input
- Blocks inline event handlers in some contexts
- CSP can prevent inline scripts

---

## Cookie Security

- **SameSite attribute** — Prevents CSRF attacks
- **HttpOnly flag** — Prevents JavaScript access
- **Secure flag** — Only sent over HTTPS

---

## Related Topics

- [Basic File Uploads](./3.%20Basic%20File%20Uploads.md) - File input security restrictions
- [HTTP Request Destinations](./7.%20HTTP%20Request%20Destinations.md) - CORS and cross-origin requests
- [HTML Tags and HTTP Requests](./2.%20HTML%20Tags%20and%20HTTP%20Requests.md) - CSP restrictions on resources

