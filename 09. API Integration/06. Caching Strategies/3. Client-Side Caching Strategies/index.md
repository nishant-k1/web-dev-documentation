# Client-Side Caching Strategies

Client-side caching approaches - in-memory caching, localStorage/sessionStorage for API data, when to cache, cache invalidation, and strategies.

---

## Core Concept

**Client-side caching** stores API responses in browser memory or storage to avoid redundant requests.

**Storage Options:**
- In-memory (variables)
- localStorage
- sessionStorage
- IndexedDB

---

## In-Memory Caching

```javascript
const cache = new Map();

async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  const data = await fetch(url).then(res => res.json());
  cache.set(url, data);
  return data;
}
```

---

## localStorage Caching

```javascript
function fetchWithLocalStorage(url) {
  const cached = localStorage.getItem(url);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < 3600000) { // 1 hour
      return Promise.resolve(data);
    }
  }

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      localStorage.setItem(url, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
      return data;
    });
}
```

---

## Summary

**Client-Side Caching:**
- In-memory: Fast, cleared on refresh
- localStorage: Persistent, survives refresh
- sessionStorage: Session-only

**Key Takeaway:** Use in-memory for temporary cache, localStorage for persistent cache. Always set expiration times.

