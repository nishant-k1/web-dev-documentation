# Caching Strategies

Understanding HTTP caching, client-side caching, ETags, Cache-Control headers, and caching libraries (SWR, React Query) for optimal API performance.

---

## Overview

Caching is critical for API performance. Understanding different caching strategies helps reduce server load, improve response times, and provide better user experience.

---

## Topics

### 1. [HTTP Caching with Cache-Control](./1.%20HTTP%20Caching%20with%20Cache-Control.md)

Complete guide to Cache-Control header - max-age, no-cache, no-store, public, private, must-revalidate, stale-while-revalidate. How browsers and CDNs cache responses.

### 2. [ETags and Conditional Requests](./2.%20ETags%20and%20Conditional%20Requests.md)

Understanding ETags (Entity Tags) - how they work, If-None-Match headers, 304 Not Modified responses, and cache validation. Essential for efficient caching.

### 3. [Client-Side Caching Strategies](./3.%20Client-Side%20Caching%20Strategies.md)

Client-side caching approaches - in-memory caching, localStorage/sessionStorage for API data, when to cache, cache invalidation, and cache strategies.

### 4. [SWR and React Query Caching](./4.%20SWR%20and%20React%20Query%20Caching.md)

Complete guide to SWR and React Query - automatic caching, revalidation, stale-while-revalidate pattern, cache invalidation, and best practices.

### 5. [Freshness vs Staleness](./5.%20Freshness%20vs%20Staleness.md)

Understanding cache freshness - when cached data is fresh vs stale, revalidation strategies, and how to handle stale data in your application.

### 6. [CDN Caching](./6.%20CDN%20Caching.md)

CDN caching for API responses - how CDNs cache content, cache headers for CDNs, edge caching, and CDN cache invalidation.

---

## Quick Reference

### Cache-Control Directives

| Directive | Meaning | Example |
|-----------|---------|---------|
| `max-age=3600` | Cache for 3600 seconds | `Cache-Control: max-age=3600` |
| `no-cache` | Must revalidate before use | `Cache-Control: no-cache` |
| `no-store` | Don't cache at all | `Cache-Control: no-store` |
| `public` | Cache in browser and CDN | `Cache-Control: public, max-age=3600` |
| `private` | Cache only in browser | `Cache-Control: private, max-age=3600` |
| `must-revalidate` | Check with server if expired | `Cache-Control: must-revalidate` |
| `stale-while-revalidate` | Serve stale while fetching fresh | `Cache-Control: stale-while-revalidate=86400` |

---

## Related Topics

- [HTTP Headers](../1.%20HTTP/4.%20HTTP%20Headers.md) - Cache-Control header basics
- [Browser Caching Mechanisms](../../3.%20Browser%20Internals/16.%20Browser%20Caching%20Mechanisms.md) - Browser-level caching
- [Performance Optimization](../7.%20Performance%20Optimization/index.md) - API performance

---

## Summary

**Caching Strategies:**
- HTTP caching (Cache-Control, ETags)
- Client-side caching (in-memory, storage)
- Library caching (SWR, React Query)
- CDN caching

**Key Benefits:**
- ✅ Reduced server load
- ✅ Faster response times
- ✅ Better user experience
- ✅ Lower bandwidth usage

