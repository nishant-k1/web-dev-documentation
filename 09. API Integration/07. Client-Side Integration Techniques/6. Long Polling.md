# Long Polling

Understanding long polling - how it works, implementation, use cases, and comparison with WebSockets and SSE.

---

## Core Concept

**Long polling** keeps HTTP request open until server has data, then closes and opens new request.

**Use Case:** Fallback when WebSockets/SSE not available.

---

## Implementation

```javascript
async function longPoll(url) {
  try {
    const res = await fetch(url, { timeout: 30000 });
    const data = await res.json();
    handleData(data);
    longPoll(url); // Poll again
  } catch (error) {
    setTimeout(() => longPoll(url), 1000); // Retry after delay
  }
}
```

---

## Summary

**Long Polling:**
- Fallback for WebSockets/SSE
- Keeps request open
- Less efficient than WebSockets/SSE

**Key Takeaway:** Use as fallback. Prefer WebSockets or SSE when possible.

