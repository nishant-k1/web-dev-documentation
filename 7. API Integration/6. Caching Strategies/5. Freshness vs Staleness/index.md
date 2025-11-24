# Freshness vs Staleness

Understanding cache freshness - when cached data is fresh vs stale, revalidation strategies, and handling stale data.

---

## Core Concept

**Fresh data** - Still valid, can use cache.
**Stale data** - Expired, should revalidate.

---

## Freshness Calculation

```javascript
const maxAge = 3600; // 1 hour
const cachedAt = Date.now();
const now = Date.now();
const age = now - cachedAt;

const isFresh = age < maxAge * 1000;
```

---

## Summary

**Freshness:**
- Fresh = within max-age
- Stale = beyond max-age
- Revalidate stale data

**Key Takeaway:** Check cache age against max-age. Use fresh cache, revalidate stale cache.

