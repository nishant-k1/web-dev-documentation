# HTTP Clients

HTTP client libraries for making API requests in JavaScript.

---

## Built-in: fetch

**Native browser API** - No installation needed.

**Pros:**
- ✅ Built into browsers
- ✅ Promise-based
- ✅ Modern API

**Cons:**
- ❌ No request/response interceptors
- ❌ No automatic JSON parsing
- ❌ No timeout by default

**Example:**

```javascript
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
  },
  body: JSON.stringify({ name: 'John' })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

---

## axios

**Popular HTTP client library** - Most features.

**Pros:**
- ✅ Request/response interceptors
- ✅ Automatic JSON parsing
- ✅ Request/response transformation
- ✅ Timeout support
- ✅ Request cancellation

**Cons:**
- ❌ Requires installation
- ❌ Larger bundle size

**Example:**

```javascript
import axios from 'axios';

// Basic request
axios.get('/api/users')
  .then(res => console.log(res.data))
  .catch(error => console.error(error));

// With interceptors
axios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

axios.get('/api/users');
```

---

## react-query (TanStack Query)

**Data fetching and caching library** - Best for React.

**Pros:**
- ✅ Automatic caching
- ✅ Background refetching
- ✅ Optimistic updates
- ✅ Request deduplication
- ✅ Built-in loading/error states

**Cons:**
- ❌ React-specific
- ❌ Requires installation
- ❌ Learning curve

**Example:**

```javascript
import { useQuery } from '@tanstack/react-query';

function UsersList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json())
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return <div>{/* Render data */}</div>;
}
```

---

## SWR

**Stale-While-Revalidate strategy** - Lightweight React hook.

**Pros:**
- ✅ Automatic revalidation
- ✅ Focus revalidation
- ✅ Request deduplication
- ✅ Lightweight

**Cons:**
- ❌ React-specific
- ❌ Requires installation

**Example:**

```javascript
import useSWR from 'swr';

function UsersList() {
  const { data, error, isLoading } = useSWR('/api/users', fetcher);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return <div>{/* Render data */}</div>;
}
```

---

## Comparison

| Feature | fetch | axios | react-query | SWR |
|---------|-------|-------|------------|-----|
| **Built-in** | ✅ Yes | ❌ No | ❌ No | ❌ No |
| **Interceptors** | ❌ No | ✅ Yes | ❌ No | ❌ No |
| **Caching** | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| **React-specific** | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| **Bundle Size** | 0 KB | ~13 KB | ~12 KB | ~5 KB |

---

## When to Use Each

**fetch:**
- Simple requests
- No caching needed
- Vanilla JavaScript

**axios:**
- Need interceptors
- Need request transformation
- Non-React applications

**react-query:**
- React applications
- Need caching
- Complex data fetching

**SWR:**
- React applications
- Need lightweight solution
- Stale-while-revalidate pattern

---

## Related Topics

- [HTTP Methods](./2.%20HTTP%20Methods.md) - How to use HTTP methods
- [Error Handling](./7.%20Error%20Handling.md) - Error handling with clients
- [Authentication](./8.%20Authentication.md) - Authentication with clients
