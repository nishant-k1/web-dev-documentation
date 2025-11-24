# Parallelization

Executing multiple API requests in parallel - Promise.all, batching, and performance benefits.

---

## Core Concept

**Parallelization** executes multiple independent requests simultaneously instead of sequentially.

**Benefit:** Faster overall execution time.

---

## Promise.all

```javascript
// Sequential (slow)
const users = await fetch('/api/users').then(res => res.json());
const posts = await fetch('/api/posts').then(res => res.json());

// Parallel (fast)
const [users, posts] = await Promise.all([
  fetch('/api/users').then(res => res.json()),
  fetch('/api/posts').then(res => res.json()),
]);
```

---

## Summary

**Parallelization:**
- Execute independent requests simultaneously
- Use Promise.all
- Faster than sequential

**Key Takeaway:** Use Promise.all for parallel independent requests. Much faster than sequential execution.

