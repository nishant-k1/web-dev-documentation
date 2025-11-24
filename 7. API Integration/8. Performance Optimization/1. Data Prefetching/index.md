# Data Prefetching

Prefetching data before it's needed - link prefetching, route prefetching, and predictive prefetching strategies.

---

## Core Concept

**Prefetching** loads data before user needs it, improving perceived performance.

**Strategies:**
- Link prefetching (on hover)
- Route prefetching (Next.js)
- Predictive prefetching

---

## Link Prefetching

```javascript
// Prefetch on hover
<a
  href="/users"
  onMouseEnter={() => {
    fetch('/api/users').then(res => res.json());
  }}
>
  Users
</a>
```

---

## Next.js Route Prefetching

```javascript
import Link from 'next/link';

<Link href="/users" prefetch>
  Users
</Link>
```

---

## Summary

**Prefetching:**
- Load data before needed
- Better perceived performance
- Use on hover or route prefetch

**Key Takeaway:** Prefetch data on user interaction (hover, route navigation) to improve perceived performance.

