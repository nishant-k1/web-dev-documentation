# Race Conditions & Request Deduplication

Handling race conditions in API calls - preventing duplicate requests, AbortController patterns, request deduplication, and handling concurrent requests.

---

## Core Concept

**Race conditions** occur when multiple requests are made and responses arrive out of order, causing incorrect state updates.

**Common Scenarios:**
- User clicks button multiple times
- Component re-renders trigger multiple requests
- Fast navigation between pages

---

## Problem: Race Condition Example

### The Problem

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data));
  }, [userId]);

  // Problem: If userId changes quickly (1 → 2 → 3)
  // Request for userId=1 might complete last
  // User sees wrong data!
}
```

---

## Solution 1: AbortController

### Cancel Previous Requests

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(`/api/users/${userId}`, {
      signal: abortController.signal
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      });

    // Cleanup: Cancel request if userId changes
    return () => {
      abortController.abort();
    };
  }, [userId]);

  return <div>{user?.name}</div>;
}
```

---

## Solution 2: Request Deduplication

### Prevent Duplicate Requests

```javascript
const pendingRequests = new Map();

function deduplicatedFetch(url) {
  // If request already pending, return same promise
  if (pendingRequests.has(url)) {
    return pendingRequests.get(url);
  }

  // Create new request
  const promise = fetch(url)
    .then(res => res.json())
    .finally(() => {
      // Remove from pending after completion
      pendingRequests.delete(url);
    });

  pendingRequests.set(url, promise);
  return promise;
}

// Usage
function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Multiple components can call this
    // Only one request will be made
    deduplicatedFetch('/api/users')
      .then(setUsers);
  }, []);

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

---

## Solution 3: Request ID Tracking

### Track Request Order

```javascript
function useApi(url) {
  const [data, setData] = useState(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const currentRequestId = ++requestIdRef.current;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        // Only update if this is the latest request
        if (currentRequestId === requestIdRef.current) {
          setData(data);
        }
      });
  }, [url]);

  return data;
}
```

---

## Solution 4: Debounce for User Actions

### Prevent Multiple Clicks

```javascript
function useDebouncedCallback(callback, delay) {
  const timeoutRef = useRef(null);

  return useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);
}

function CreateUser() {
  const [loading, setLoading] = useState(false);

  const createUser = useDebouncedCallback(async (userData) => {
    setLoading(true);
    try {
      await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } finally {
      setLoading(false);
    }
  }, 300);

  return (
    <button onClick={() => createUser({ name: 'John' })} disabled={loading}>
      {loading ? 'Creating...' : 'Create User'}
    </button>
  );
}
```

---

## Common Interview Questions

### Q: How do you handle race conditions in API calls?

**A:** Use AbortController to cancel previous requests, track request IDs to ignore stale responses, or use request deduplication to prevent duplicate requests.

### Q: What happens if user clicks button multiple times?

**A:** Use debouncing, disable button during request, or use request deduplication to prevent multiple submissions.

### Q: How do you prevent duplicate API requests?

**A:** Use request deduplication (cache pending promises), AbortController to cancel duplicates, or libraries like SWR/React Query that handle this automatically.

---

## Related Topics

- [Request Cancellation](../1.%20HTTP/12.%20Request%20Cancellation%20and%20Timeouts.md) - AbortController
- [Debouncing & Throttling](../7.%20Client-Side%20Integration%20Techniques/1.%20Debouncing%20%26%20Throttling%20API%20Calls.md) - Debounce patterns

---

## Summary

**Race Condition Solutions:**
- AbortController (cancel previous requests)
- Request deduplication (prevent duplicates)
- Request ID tracking (ignore stale responses)
- Debouncing (prevent rapid clicks)

**Best Practices:**
- Always cancel requests on cleanup
- Deduplicate identical requests
- Track request order
- Debounce user actions

**Key Takeaway:** Handle race conditions by canceling previous requests with AbortController, deduplicating requests, or tracking request order. Always clean up requests on component unmount.

