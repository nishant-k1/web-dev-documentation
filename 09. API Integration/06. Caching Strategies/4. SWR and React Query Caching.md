# SWR and React Query Caching

Understanding SWR and React Query - automatic caching, revalidation, stale-while-revalidate pattern, and best practices.

---

## Core Concept

**SWR (stale-while-revalidate)** and **React Query** are data fetching libraries that provide automatic caching, revalidation, and state management for API calls.

**Key Features:**
- ✅ Automatic caching
- ✅ Background revalidation
- ✅ Request deduplication
- ✅ Error handling
- ✅ Loading states

---

## SWR (Vercel)

### Basic Usage

```javascript
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(res => res.json());

function UserProfile({ userId }) {
  const { data, error, isLoading } = useSWR(
    `/api/users/${userId}`,
    fetcher
  );

  if (error) return <div>Error loading user</div>;
  if (isLoading) return <div>Loading...</div>;

  return <div>{data.name}</div>;
}
```

---

### SWR Configuration

```javascript
import { SWRConfig } from 'swr';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then(res => res.json()),
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 0,
        dedupingInterval: 2000,
      }}
    >
      <UserProfile />
    </SWRConfig>
  );
}
```

---

### SWR Caching Behavior

```javascript
// First component
function Component1() {
  const { data } = useSWR('/api/users', fetcher);
  // Fetches from server
}

// Second component (same key)
function Component2() {
  const { data } = useSWR('/api/users', fetcher);
  // Uses cache from Component1 (no duplicate request)
}
```

---

### SWR Revalidation

```javascript
const { data, mutate } = useSWR('/api/users', fetcher);

// Manual revalidation
mutate();

// Optimistic update
mutate([...data, newUser], false); // Update UI immediately
mutate(); // Revalidate in background
```

---

## React Query (TanStack Query)

### Basic Usage

```javascript
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
  });

  if (error) return <div>Error loading user</div>;
  if (isLoading) return <div>Loading...</div>;

  return <div>{data.name}</div>;
}
```

---

### React Query Configuration

```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: 3,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProfile />
    </QueryClientProvider>
  );
}
```

---

### React Query Caching

```javascript
// First component
function Component1() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  // Fetches from server
}

// Second component (same queryKey)
function Component2() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  // Uses cache from Component1
}
```

---

### React Query Mutations

```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      }).then(res => res.json()),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'John' })}>
      Create User
    </button>
  );
}
```

---

## Comparison: SWR vs React Query

| Feature | SWR | React Query |
|---------|-----|-------------|
| **Caching** | ✅ Automatic | ✅ Automatic |
| **Revalidation** | ✅ Built-in | ✅ Configurable |
| **Mutations** | ⚠️ Manual | ✅ Built-in |
| **DevTools** | ❌ No | ✅ Yes |
| **Bundle Size** | ✅ Smaller | ⚠️ Larger |
| **Ecosystem** | ⚠️ Smaller | ✅ Larger |

---

## Best Practices

### 1. Use Query Keys Consistently

```javascript
// ✅ Good - Consistent query keys
useQuery({ queryKey: ['user', userId] });
useQuery({ queryKey: ['user', userId] }); // Same key = same cache

// ❌ Bad - Inconsistent keys
useQuery({ queryKey: ['user', userId] });
useQuery({ queryKey: ['users', userId] }); // Different key = different cache
```

---

### 2. Configure Stale Time

```javascript
// ✅ Good - Set appropriate stale time
useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

---

### 3. Invalidate on Mutations

```javascript
// ✅ Good - Invalidate after mutation
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});
```

---

## Common Questions

### Q: Which should I use, SWR or React Query?

**A:** React Query has more features (mutations, devtools). SWR is simpler and smaller. Choose based on your needs.

### Q: How does caching work?

**A:** Both libraries cache responses by query key. Same key = same cache. Automatic deduplication prevents duplicate requests.

### Q: When does revalidation happen?

**A:** On window focus, reconnect, or after stale time. Configurable in both libraries.

---

## Related Topics

- [HTTP Caching with Cache-Control](./1.%20HTTP%20Caching%20with%20Cache-Control.md) - HTTP-level caching
- [Client-Side Caching Strategies](./3.%20Client-Side%20Caching%20Strategies.md) - Other caching approaches

---

## Summary

**SWR & React Query:**
- Automatic caching by query key
- Background revalidation
- Request deduplication
- Built-in loading/error states

**Key Benefits:**
- ✅ Reduced API calls
- ✅ Better performance
- ✅ Simpler code
- ✅ Better UX

**Key Takeaway:** SWR and React Query provide automatic caching and revalidation. Use consistent query keys, configure stale time appropriately, and invalidate cache after mutations.

