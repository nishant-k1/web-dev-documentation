# CDN Caching

CDN caching for API responses - how CDNs cache content, cache headers for CDNs, edge caching, and cache invalidation.

---

## Core Concept

**CDN (Content Delivery Network)** caches content at edge locations for faster delivery.

**Cache Headers:**
```javascript
res.setHeader('Cache-Control', 'public, max-age=3600');
```

---

## Summary

**CDN Caching:**
- Use `public` in Cache-Control
- CDN caches at edge locations
- Faster global delivery

**Key Takeaway:** Use `public` Cache-Control for CDN caching. CDNs cache at edge for faster delivery worldwide.

