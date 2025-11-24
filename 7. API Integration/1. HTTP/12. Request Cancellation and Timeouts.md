# Request Cancellation and Timeouts

Understanding how to cancel HTTP requests and implement timeouts for better user experience.

---

## Core Concept

**Request cancellation** allows you to abort ongoing requests, and **timeouts** prevent requests from hanging indefinitely.

**Use Cases:**
- User navigates away (cancel request)
- Request taking too long (timeout)
- Component unmounts (cleanup)
- User cancels action (cancel request)

---

## AbortController

### What is AbortController?

**AbortController** is a Web API that allows you to cancel fetch requests.

**Basic Usage:**

```javascript
// Create controller
const controller = new AbortController();
const signal = controller.signal;

// Start request
fetch('/api/users', { signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Request cancelled');
    }
  });

// Cancel request
controller.abort();
```

---

## Cancelling Requests

### Basic Cancellation

```javascript
const controller = new AbortController();

fetch('/api/users', { signal: controller.signal })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Request was cancelled');
    }
  });

// Cancel after 2 seconds
setTimeout(() => {
  controller.abort();
}, 2000);
```

---

### User-Initiated Cancellation

```javascript
let controller;

function startRequest() {
  // Cancel previous request if exists
  if (controller) {
    controller.abort();
  }
  
  // Create new controller
  controller = new AbortController();
  
  fetch('/api/users', { signal: controller.signal })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      controller = null;
    })
    .catch(error => {
      if (error.name === 'AbortError') {
        console.log('Request cancelled by user');
      }
    });
}

function cancelRequest() {
  if (controller) {
    controller.abort();
    controller = null;
  }
}

// HTML
// <button onclick="startRequest()">Start</button>
// <button onclick="cancelRequest()">Cancel</button>
```

---

### Component Cleanup (React)

```javascript
import { useEffect, useState } from 'react';

function UsersList() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const controller = new AbortController();
    
    fetch('/api/users', { signal: controller.signal })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error:', error);
        }
      });
    
    // Cleanup: cancel request on unmount
    return () => {
      controller.abort();
    };
  }, []);
  
  return <div>{/* Render users */}</div>;
}
```

---

## Request Timeouts

### Implementing Timeout

**Method 1: AbortController with setTimeout**

```javascript
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  return fetch(url, {
    ...options,
    signal: controller.signal
  })
    .then(res => {
      clearTimeout(timeoutId);
      return res;
    })
    .catch(error => {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    });
}

// Usage
fetchWithTimeout('/api/users', {}, 5000)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.message === 'Request timeout') {
      console.error('Request took too long');
    }
  });
```

---

### Method 2: Promise.race

```javascript
function fetchWithTimeout(url, options = {}, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
}

// Usage
fetchWithTimeout('/api/users', {}, 5000)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.message === 'Request timeout') {
      console.error('Request timeout');
    }
  });
```

---

## Advanced Patterns

### Reusable Fetch Wrapper

```javascript
class FetchClient {
  constructor() {
    this.controllers = new Map();
  }
  
  async request(url, options = {}) {
    const { timeout = 5000, signal, ...fetchOptions } = options;
    
    // Create abort controller
    const controller = new AbortController();
    const requestId = `${url}-${Date.now()}`;
    this.controllers.set(requestId, controller);
    
    // Combine signals
    if (signal) {
      signal.addEventListener('abort', () => controller.abort());
    }
    
    // Set timeout
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
    
    try {
      const res = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      this.controllers.delete(requestId);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      return res;
    } catch (error) {
      clearTimeout(timeoutId);
      this.controllers.delete(requestId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request cancelled or timeout');
      }
      throw error;
    }
  }
  
  cancel(requestId) {
    const controller = this.controllers.get(requestId);
    if (controller) {
      controller.abort();
      this.controllers.delete(requestId);
    }
  }
  
  cancelAll() {
    this.controllers.forEach(controller => controller.abort());
    this.controllers.clear();
  }
}

// Usage
const client = new FetchClient();
const res = await client.request('/api/users', { timeout: 5000 });
const data = await res.json();
```

---

### React Hook with Cancellation

```javascript
import { useEffect, useRef, useState } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);
  
  useEffect(() => {
    // Cancel previous request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    
    // Create new controller
    const controller = new AbortController();
    controllerRef.current = controller;
    
    setLoading(true);
    setError(null);
    
    fetch(url, {
      ...options,
      signal: controller.signal
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (!controller.signal.aborted) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (error.name !== 'AbortError' && !controller.signal.aborted) {
          setError(error);
          setLoading(false);
        }
      });
    
    // Cleanup
    return () => {
      controller.abort();
    };
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UsersList() {
  const { data, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>{/* Render data */}</div>;
}
```

---

## Common Patterns

### Pattern 1: Debounced Search

```javascript
let controller;
let timeoutId;

function search(query) {
  // Cancel previous request
  if (controller) {
    controller.abort();
  }
  
  // Clear timeout
  clearTimeout(timeoutId);
  
  // Debounce
  timeoutId = setTimeout(() => {
    controller = new AbortController();
    
    fetch(`/api/search?q=${query}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        console.log('Results:', data);
      })
      .catch(error => {
        if (error.name !== 'AbortError') {
          console.error('Error:', error);
        }
      });
  }, 300);
}
```

---

### Pattern 2: Race Condition Prevention

```javascript
let requestId = 0;

async function fetchUsers() {
  const currentRequestId = ++requestId;
  
  const res = await fetch('/api/users');
  const data = await res.json();
  
  // Only update if this is the latest request
  if (currentRequestId === requestId) {
    setUsers(data);
  }
}
```

---

### Pattern 3: Multiple Requests with Cancellation

```javascript
async function fetchMultiple(urls) {
  const controllers = urls.map(() => new AbortController());
  
  const requests = urls.map((url, index) =>
    fetch(url, { signal: controllers[index].signal })
      .then(res => res.json())
  );
  
  try {
    const results = await Promise.all(requests);
    return results;
  } catch (error) {
    // Cancel all on error
    controllers.forEach(controller => controller.abort());
    throw error;
  }
}

// Usage
try {
  const results = await fetchMultiple([
    '/api/users',
    '/api/posts',
    '/api/comments'
  ]);
} catch (error) {
  console.error('Error:', error);
}
```

---

## Best Practices

### 1. Always Clean Up

```javascript
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/users', { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data));
  
  // ✅ Cleanup on unmount
  return () => {
    controller.abort();
  };
}, []);
```

### 2. Handle AbortError

```javascript
fetch('/api/users', { signal })
  .then(res => res.json())
  .catch(error => {
    if (error.name === 'AbortError') {
      // Request was cancelled - don't show error
      return;
    }
    // Handle other errors
    console.error('Error:', error);
  });
```

### 3. Set Reasonable Timeouts

```javascript
// ✅ Good - Reasonable timeout
fetchWithTimeout('/api/users', {}, 5000);  // 5 seconds

// ❌ Bad - Too short or too long
fetchWithTimeout('/api/users', {}, 100);   // Too short
fetchWithTimeout('/api/users', {}, 60000); // Too long
```

### 4. Cancel on Navigation

```javascript
// Cancel requests when user navigates away
window.addEventListener('beforeunload', () => {
  // Cancel all ongoing requests
  controllers.forEach(controller => controller.abort());
});
```

---

## Common Questions

### Q: Can I cancel a request after it's completed?

**A:** No. AbortController only cancels ongoing requests. Completed requests cannot be cancelled.

### Q: What happens if I abort a request?

**A:** The fetch promise rejects with `AbortError`. The request is cancelled and no response is received.

### Q: Should I always use timeouts?

**A:** Yes, for better UX. Set reasonable timeouts (5-10 seconds for most requests).

### Q: Can I reuse AbortController?

**A:** No. Once aborted, it cannot be reused. Create a new one for each request.

---

## Related Topics

- [Error Handling](./7.%20Error%20Handling.md) - Error handling patterns
- [HTTP Clients](./http%20clients.md) - Client libraries with cancellation support
- [Response Handling](./11.%20Response%20Handling.md) - Handling responses
- [File Uploads and Downloads](./13.%20File%20Uploads%20and%20Downloads.md) - Cancelling file uploads

---

## Summary

**AbortController:**
- Cancel ongoing requests
- Clean up on component unmount
- Prevent race conditions

**Timeouts:**
- Prevent hanging requests
- Better user experience
- Use AbortController or Promise.race

**Best Practices:**
- Always clean up in useEffect
- Handle AbortError appropriately
- Set reasonable timeouts
- Cancel on navigation/unmount

**Key Takeaway:** Always cancel requests when components unmount or users navigate away to prevent memory leaks and race conditions.

