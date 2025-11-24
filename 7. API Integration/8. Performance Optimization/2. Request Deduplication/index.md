# Request Deduplication

Preventing duplicate API requests - request deduplication patterns, caching, and how libraries handle it.

---

## Core Concept

**Request deduplication** prevents multiple identical requests from executing simultaneously.

**How it works:**
- Track pending requests
- If same request pending, reuse promise
- Return same promise to all callers

---

## Implementation

```javascript
const pendingRequests = new Map();

function deduplicatedFetch(url) {
  if (pendingRequests.has(url)) {
    return pendingRequests.get(url);
  }

  const promise = fetch(url).then(res => res.json());
  pendingRequests.set(url, promise);
  
  promise.finally(() => {
    pendingRequests.delete(url);
  });

  return promise;
}
```

---

## Summary

**Deduplication:**
- Prevents duplicate requests
- Libraries (SWR, React Query) do this automatically
- Reuse pending promises

**Key Takeaway:** Deduplicate requests to avoid redundant API calls. Libraries like SWR and React Query handle this automatically.

