# Quick Reference

Quick lookup tables for browser networking and resource loading.

---

## HTML Tags That Make Requests

| Tag        | Request Type | Purpose                |
| ---------- | ------------ | ---------------------- |
| `<img>`    | GET          | Load image             |
| `<script>` | GET          | Load JavaScript        |
| `<link>`   | GET          | Load CSS, fonts, icons |
| `<iframe>` | GET          | Load webpage           |
| `<video>`  | GET          | Load video             |
| `<audio>`  | GET          | Load audio             |
| `<form>`   | GET/POST     | Send data to backend   |

---

## POST Content-Types

| Content-Type                        | Use For           |
| ----------------------------------- | ----------------- |
| `application/json`                  | JSON API requests |
| `multipart/form-data`               | File uploads      |
| `application/x-www-form-urlencoded` | Simple HTML forms |

---

## Loading Behavior

| Element                   | Blocks HTML? | Blocks Render? |
| ------------------------- | ------------ | -------------- |
| `<script>`                | ✅ Yes       | ✅ Yes         |
| `<script defer>`          | ❌ No        | ❌ No          |
| `<script async>`          | ❌ No        | ❌ No          |
| `<script type="module">`  | ❌ No        | ❌ No          |
| `<link rel="stylesheet">` | ❌ No        | ✅ Yes         |
| `<img>`                   | ❌ No        | ❌ No          |

---

## Form HTTP Methods

| Method | Supported?     |
| ------ | -------------- |
| GET    | ✅ Yes         |
| POST   | ✅ Yes         |
| PUT    | ❌ No (use JS) |
| PATCH  | ❌ No (use JS) |
| DELETE | ❌ No (use JS) |

---

## Module vs Regular Script

| Feature          | Regular Script | Module      |
| ---------------- | -------------- | ----------- |
| Scope            | Global         | Private     |
| import/export    | ❌             | ✅          |
| Strict mode      | Optional       | Always      |
| Top-level `this` | `window`       | `undefined` |

---

## Request Destinations

| Resource URL                   | Request Goes To                                               |
| ------------------------------ | ------------------------------------------------------------- |
| `/path/file`                   | Same server as the website (localhost in dev, domain in prod) |
| `./file`                       | Same folder as current page                                   |
| `file.jpg`                     | Same folder as current page                                   |
| `https://example.com/file`     | External server                                               |
| `https://cdn.company.com/file` | CDN server                                                    |

---

## Content-Type Quick Guide

| Scenario                | Right Content-Type                  |
| ----------------------- | ----------------------------------- |
| JSON API request        | `application/json`                  |
| Upload image/video/PDF  | `multipart/form-data`               |
| Submit simple HTML form | `application/x-www-form-urlencoded` |
| File upload using JS    | No header (FormData handles it)     |

---

## Rendering Pipeline Stages

| Stage | What It Does | Cost |
|-------|--------------|------|
| **DOM Construction** | Parse HTML → Build DOM tree | Low |
| **CSSOM Construction** | Parse CSS → Build CSSOM tree | Low |
| **Render Tree** | Combine DOM + CSSOM | Low |
| **Layout (Reflow)** | Calculate positions/sizes | ⚠️ High |
| **Paint** | Fill in pixels | ⚠️ Medium |
| **Composite** | Combine layers (GPU) | ✅ Low |

---

## Layout/Repaint/Composite Triggers

| Operation | Triggers | Cost |
|-----------|----------|------|
| `offsetWidth`, `getBoundingClientRect()` | Layout | ⚠️ High |
| `style.width = '100px'` | Layout | ⚠️ High |
| `style.color = 'red'` | Paint | ⚠️ Medium |
| `style.transform = 'translateX(100px)'` | Composite | ✅ Low |
| `style.opacity = '0.5'` | Composite | ✅ Low |

---

## Cache-Control Directives

| Directive | Meaning |
|-----------|---------|
| `max-age=3600` | Cache for 1 hour |
| `no-cache` | Must revalidate with server |
| `no-store` | Don't cache at all |
| `public` | Cache in browser and CDN |
| `private` | Cache only in browser |

---

## Key Takeaways

1. **HTTP is universal** — Every resource (HTML, CSS, JS, images, APIs) uses HTTP
2. **Browser makes automatic requests** — Many HTML tags trigger HTTP requests automatically
3. **Forms are special** — Only HTML element that can send data (GET/POST only)
4. **File uploads need FormData** — `<input type="file">` doesn't upload by itself
5. **Content-Type matters** — Different POST types for different purposes
6. **Loading behavior affects performance** — Sync vs async impacts page load time
7. **Modules have private scope** — Variables don't leak to global scope
8. **Bundlers handle modules** — React build tools manage `type="module"` automatically
9. **CSS blocks rendering** — Browser waits for CSSOM before painting
10. **Layout is expensive** — Minimize reflows, use `transform` for animations
11. **Cache aggressively** — Use `Cache-Control` headers for static assets

---

## Related Topics

- [Browser Request Lifecycle](./1.%20Browser%20Request%20Lifecycle.md)
- [HTML Tags and HTTP Requests](./2.%20HTML%20Tags%20and%20HTTP%20Requests.md)
- [Form Submissions](./4.%20Form%20Submissions.md)
- [POST Request Content Types](./5.%20POST%20Request%20Content%20Types.md)
- [Resource Loading Behavior](./6.%20Resource%20Loading%20Behavior.md)
- [JavaScript Modules](./8.%20JavaScript%20Modules.md)
- [Static File Serving](./11.%20Static%20File%20Serving.md)
- [Blob URLs and Memory Management](./12.%20Blob%20URLs%20and%20Memory%20Management.md)
- [Large File Uploads and Chunking](./13.%20Large%20File%20Uploads%20and%20Chunking.md)
- [HTTP Request Data Types](./14.%20HTTP%20Request%20Data%20Types.md)
- [Browser Rendering Pipeline](./15.%20Browser%20Rendering%20Pipeline.md)
- [Browser Caching Mechanisms](./16.%20Browser%20Caching%20Mechanisms.md)
- [Browser Layout and Rendering](./17.%20Browser%20Layout%20and%20Rendering.md)
- [Browser Storage Mechanisms](./18.%20Browser%20Storage%20Mechanisms.md)

