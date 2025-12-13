# Parallel & Sequential Requests

Managing multiple API requests - parallel requests with Promise.all, sequential requests, request dependencies, and error handling.

---

## Core Concept

**Parallel requests** execute simultaneously. **Sequential requests** execute one after another.

**When to use:**
- **Parallel** - Independent requests (faster)
- **Sequential** - Dependent requests (one needs result of other)

---

## Parallel Requests

### Promise.all

```javascript
// Execute all requests simultaneously
const [users, posts, comments] = await Promise.all([
  fetch('/api/users').then(res => res.json()),
  fetch('/api/posts').then(res => res.json()),
  fetch('/api/comments').then(res => res.json()),
]);
```

---

### Promise.allSettled

```javascript
// Execute all, don't fail if one fails
const results = await Promise.allSettled([
  fetch('/api/users').then(res => res.json()),
  fetch('/api/posts').then(res => res.json()),
]);

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value);
  } else {
    console.error('Error:', result.reason);
  }
});
```

---

## Sequential Requests

### Await in Loop

```javascript
// Execute one after another
const users = await fetch('/api/users').then(res => res.json());
const posts = await fetch(`/api/posts?userId=${users[0].id}`).then(res => res.json());
const comments = await fetch(`/api/comments?postId=${posts[0].id}`).then(res => res.json());
```

---

## Summary

**Parallel:** Use `Promise.all` for independent requests (faster).
**Sequential:** Use `await` in sequence for dependent requests.

**Key Takeaway:** Use parallel for independent requests, sequential for dependent requests. Use `Promise.allSettled` if you want all results even if some fail.

