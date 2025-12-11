# API Integration in React

## TL;DR

- Fetch data in `useEffect` with empty dependency array for mount
- Always handle: **loading**, **error**, and **success** states
- Use `async/await` inside useEffect (not directly on useEffect)
- Cleanup: abort requests in useEffect cleanup to prevent memory leaks
- Use custom hooks for reusable data fetching logic
- Consider libraries: React Query, SWR for caching/revalidation

---

## 1. Basic Data Fetching Pattern

### ✅ The Standard Pattern (3 States)

```jsx
function UserProfile({ userId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Re-fetch when userId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return null;

  return <div>{data.name}</div>;
}
```

**Key Points:**

- ✅ Three states: `loading`, `error`, `data`
- ✅ `async` function INSIDE useEffect (not on useEffect itself)
- ✅ Check `response.ok` before parsing
- ✅ `finally` block ensures loading ends regardless of success/failure

---

## 2. Request Cancellation (Prevent Memory Leaks)

### ❌ Problem: Component Unmounts Before Request Completes

```jsx
// BAD: Can cause "Can't perform state update on unmounted component"
useEffect(() => {
  fetch("/api/data")
    .then((res) => res.json())
    .then((data) => setData(data)); // ❌ Component might be unmounted!
}, []);
```

### ✅ Solution: Abort Controller

```jsx
useEffect(() => {
  const controller = new AbortController();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/data", {
        signal: controller.signal, // ← Attach signal
      });

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Fetch aborted"); // ← Not an error
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();

  // Cleanup: abort on unmount
  return () => {
    controller.abort();
  };
}, []);
```

**Why This Matters:**

- Component unmounts → `controller.abort()` → fetch cancels
- Prevents state updates on unmounted components
- **Always include cleanup for API calls!**

---

## 3. Custom Hook for Data Fetching

### ✅ Reusable `useFetch` Hook

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return; // Guard: don't fetch if no URL

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch("/api/users");

  if (loading) return <Spinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## 4. POST Requests (Create/Update Data)

### ✅ Submitting Data to API

```jsx
function CreateUser() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      setError(null);
      setSuccess(false);

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      const result = await response.json();
      console.log("Created user:", result);

      setSuccess(true);
      setFormData({ name: "", email: "" }); // Reset form
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
      />
      <input
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />

      <button type="submit" disabled={submitting}>
        {submitting ? "Creating..." : "Create User"}
      </button>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">User created!</div>}
    </form>
  );
}
```

**Key Points:**

- ✅ Disable button during submission (`disabled={submitting}`)
- ✅ Show loading text while submitting
- ✅ Handle both success and error feedback
- ✅ Reset form on success

---

## 5. Using Axios (Alternative to Fetch)

### Installation

```bash
npm install axios
```

### ✅ Axios Benefits Over Fetch

```jsx
import axios from "axios";

function useFetchWithAxios(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Axios automatically:
        // - Parses JSON (no .json() needed)
        // - Throws on error status codes
        const response = await axios.get(url, {
          cancelToken: source.token,
        });

        setData(response.data); // ← Direct access to data
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.response?.data?.message || err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => source.cancel("Component unmounted");
  }, [url]);

  return { data, loading, error };
}
```

**Axios vs Fetch:**

| Feature              | Fetch               | Axios                |
| -------------------- | ------------------- | -------------------- |
| JSON parsing         | Manual `.json()`    | Automatic            |
| Error handling       | Check `response.ok` | Auto-throws on error |
| Request cancellation | `AbortController`   | `CancelToken`        |
| Interceptors         | ❌                  | ✅                   |
| Timeout              | Manual              | Built-in             |

---

## 6. Setting Up Axios Interceptors

### ✅ Global Config (Auth Tokens, Error Handling)

```jsx
// api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
});

// Request interceptor (add auth token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

// Usage in components
import api from "./api/axios";

function Users() {
  useEffect(() => {
    api
      .get("/users") // ← Automatically includes token
      .then((res) => setUsers(res.data))
      .catch((err) => setError(err.message));
  }, []);
}
```

---

## 7. Dependent Requests (Fetch After First Completes)

### ✅ Fetch User, Then Fetch Posts

```jsx
function UserWithPosts({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        setLoading(true);

        // Step 1: Fetch user
        const userRes = await fetch(`/api/users/${userId}`);
        const userData = await userRes.json();
        setUser(userData);

        // Step 2: Fetch user's posts (depends on user data)
        const postsRes = await fetch(`/api/users/${userData.id}/posts`);
        const postsData = await postsRes.json();
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndPosts();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 8. Parallel Requests (Fetch Multiple Resources)

### ✅ Promise.all for Concurrent Requests

```jsx
function Dashboard() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all in parallel (faster!)
        const [usersRes, postsRes, commentsRes] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/posts"),
          fetch("/api/comments"),
        ]);

        // Parse all
        const [users, posts, comments] = await Promise.all([
          usersRes.json(),
          postsRes.json(),
          commentsRes.json(),
        ]);

        setData({ users, posts, comments });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users: {data.users.length}</h2>
      <h2>Posts: {data.posts.length}</h2>
      <h2>Comments: {data.comments.length}</h2>
    </div>
  );
}
```

**Why Promise.all?**

- ✅ Faster: Requests happen simultaneously
- ❌ All-or-nothing: If one fails, all fail
- Alternative: `Promise.allSettled()` (continues even if some fail)

---

## 9. Pagination & Infinite Scroll

### ✅ Load More Pattern

```jsx
function InfiniteUserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users?page=${page}&limit=20`);
        const newUsers = await response.json();

        if (newUsers.length === 0) {
          setHasMore(false);
        } else {
          setUsers((prev) => [...prev, ...newUsers]); // Append to existing
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]); // Re-fetch when page changes

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      {loading && <div>Loading...</div>}

      {hasMore && !loading && <button onClick={loadMore}>Load More</button>}

      {!hasMore && <div>No more users</div>}
    </div>
  );
}
```

---

## 10. Search/Debouncing (Avoid Excessive Requests)

### ✅ Debounced Search

```jsx
import { useState, useEffect } from "react";

function SearchUsers() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    // Debounce: wait 500ms after user stops typing
    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/search?q=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms delay

    // Cleanup: cancel previous timeout if user types again
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users..."
      />

      {loading && <div>Searching...</div>}

      <ul>
        {results.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

**Why Debouncing?**

- User types "hello" → 5 keystrokes
- Without debounce: 5 API calls ("h", "he", "hel", "hell", "hello")
- With debounce: 1 API call (after user stops typing)

---

## 11. Error Handling Best Practices

### ✅ Comprehensive Error Handling

```jsx
function RobustDataFetcher() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/data");

        // Handle HTTP errors
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Data not found");
          } else if (response.status === 500) {
            throw new Error("Server error. Please try again later.");
          } else if (response.status === 401) {
            throw new Error("Unauthorized. Please log in.");
          } else {
            throw new Error(`Error: ${response.status}`);
          }
        }

        const result = await response.json();

        // Validate data structure
        if (!result || !Array.isArray(result.items)) {
          throw new Error("Invalid data format received");
        }

        setData(result);
      } catch (err) {
        // Network error
        if (err.name === "TypeError" && err.message === "Failed to fetch") {
          setError("Network error. Please check your connection.");
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      {error && (
        <ErrorAlert message={error} onRetry={() => window.location.reload()} />
      )}
      {data && <DataDisplay data={data} />}
    </div>
  );
}
```

---

## 12. React Query (Modern Solution)

### ✅ Replaces Manual State Management

```bash
npm install @tanstack/react-query
```

```jsx
import { useQuery } from "@tanstack/react-query";

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      if (!response.ok) throw new Error("Failed to fetch");
      return response.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

// App setup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Users />
    </QueryClientProvider>
  );
}
```

**React Query Benefits:**

- ✅ **Automatic caching** (no redundant requests)
- ✅ **Background refetching** (data stays fresh)
- ✅ **Retry logic** (auto-retry failed requests)
- ✅ **Loading/error states** (built-in)
- ✅ **Optimistic updates**
- ✅ **Pagination/infinite scroll helpers**

**When to Use:**

- ✅ Complex apps with lots of API calls
- ✅ Need caching/revalidation
- ✅ Want to avoid Redux/Context for server state

---

## 13. Common Patterns Comparison

### Pattern 1: Fetch on Mount

```jsx
useEffect(() => {
  fetchData();
}, []); // ← Empty array: fetch once on mount
```

### Pattern 2: Fetch on Prop Change

```jsx
useEffect(() => {
  fetchData(userId);
}, [userId]); // ← Refetch when userId changes
```

### Pattern 3: Fetch on Button Click

```jsx
const [data, setData] = useState(null);

const handleFetch = async () => {
  const result = await fetch("/api/data");
  setData(await result.json());
};

return <button onClick={handleFetch}>Load Data</button>;
```

### Pattern 4: Conditional Fetch

```jsx
useEffect(() => {
  if (!shouldFetch) return; // Guard: only fetch when needed

  fetchData();
}, [shouldFetch]);
```

---

## 14. Common Mistakes & Fixes

### ❌ Mistake 1: Async useEffect Directly

```jsx
// BAD: useEffect cannot be async
useEffect(async () => {
  const data = await fetch("/api/data");
}, []);
```

✅ **Fix: Use async function inside**

```jsx
useEffect(() => {
  const fetchData = async () => {
    const data = await fetch("/api/data");
  };
  fetchData();
}, []);
```

---

### ❌ Mistake 2: Missing Error Handling

```jsx
// BAD: What if fetch fails?
useEffect(() => {
  fetch("/api/data")
    .then((res) => res.json())
    .then((data) => setData(data));
}, []);
```

✅ **Fix: Always catch errors**

```jsx
useEffect(() => {
  fetch("/api/data")
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((err) => setError(err.message)); // ← Always include
}, []);
```

---

### ❌ Mistake 3: No Loading State

```jsx
// BAD: User sees nothing while loading
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

✅ **Fix: Show loading indicator**

```jsx
function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

### ❌ Mistake 4: Not Checking response.ok

```jsx
// BAD: 404/500 errors won't throw
const response = await fetch("/api/data");
const data = await response.json(); // ← Might fail silently
```

✅ **Fix: Check status**

```jsx
const response = await fetch("/api/data");
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
const data = await response.json();
```

---

### ❌ Mistake 5: Race Conditions (Fast Prop Changes)

```jsx
// BAD: User clicks User #1, then quickly clicks User #2
// Response for User #1 might arrive AFTER User #2's response
// Result: Wrong user displayed!

useEffect(() => {
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then((data) => setUser(data)); // ← Race condition!
}, [userId]);
```

✅ **Fix: Cleanup with flag**

```jsx
useEffect(() => {
  let isCancelled = false;

  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      if (!isCancelled) {
        // ← Only update if still relevant
        setUser(data);
      }
    });

  return () => {
    isCancelled = true; // ← Cancel on unmount or userId change
  };
}, [userId]);
```

---

## 15. Interview Questions

### Q1: Where should you fetch data in React?

**Answer:** In `useEffect` hook for function components, or `componentDidMount` for class components.

```jsx
// Function component
useEffect(() => {
  fetchData();
}, []);

// Class component
componentDidMount() {
  this.fetchData();
}
```

---

### Q2: Why can't useEffect be async directly?

**Answer:** `useEffect` expects either:

1. Nothing returned (undefined)
2. A cleanup function

If you make useEffect async, it returns a Promise, which violates this rule.

```jsx
// ❌ WRONG
useEffect(async () => {
  await fetchData(); // Returns Promise<void>
}, []);

// ✅ CORRECT
useEffect(() => {
  const loadData = async () => {
    await fetchData();
  };
  loadData();
}, []);
```

---

### Q3: How do you prevent memory leaks when fetching data?

**Answer:** Use cleanup function to abort/cancel requests:

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch("/api/data", { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setData(data));

  return () => controller.abort(); // ← Cleanup
}, []);
```

---

### Q4: Fetch vs Axios - which to use?

**Answer:**

| Use Case                             | Recommendation                            |
| ------------------------------------ | ----------------------------------------- |
| Simple GET requests                  | Fetch (native, no dependencies)           |
| Complex apps with many API calls     | Axios (interceptors, auto-error handling) |
| Need request/response transformation | Axios                                     |
| Need to support old browsers         | Axios (better compatibility)              |

---

### Q5: How do you handle authentication tokens?

**Answer:**

**Option 1: Manual (Fetch)**

```jsx
fetch("/api/data", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

**Option 2: Axios Interceptor (Better)**

```jsx
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

### Q6: How do you show loading state?

**Answer:** Track loading with state variable:

```jsx
const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);
  fetch("/api/data")
    .then((res) => res.json())
    .then((data) => setData(data))
    .finally(() => setLoading(false)); // ← Always runs
}, []);

if (loading) return <Spinner />;
return <Data data={data} />;
```

---

### Q7: What is debouncing in search?

**Answer:** Waiting for user to stop typing before sending request:

```jsx
useEffect(() => {
  const timeoutId = setTimeout(() => {
    searchAPI(query); // Only search after 500ms of no typing
  }, 500);

  return () => clearTimeout(timeoutId); // Cancel previous timer
}, [query]);
```

**Without debounce:** 10 keystrokes = 10 API calls  
**With debounce:** 10 keystrokes = 1 API call

---

### Q8: What is React Query and why use it?

**Answer:** Library that handles:

- ✅ Caching (no duplicate requests)
- ✅ Background refetching (data stays fresh)
- ✅ Loading/error states (automatic)
- ✅ Retry logic
- ✅ Pagination/infinite scroll

**Use when:**

- Complex app with many API calls
- Need caching/revalidation
- Want to avoid manual state management

---

### Q9: How do you handle 401 (Unauthorized) globally?

**Answer:** Use Axios interceptor:

```jsx
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

---

### Q10: How do you fetch data that depends on previous data?

**Answer:** Sequential async/await:

```jsx
useEffect(() => {
  const fetchData = async () => {
    // Step 1: Get user
    const userRes = await fetch("/api/user");
    const user = await userRes.json();

    // Step 2: Get user's posts (depends on user.id)
    const postsRes = await fetch(`/api/users/${user.id}/posts`);
    const posts = await postsRes.json();

    setPosts(posts);
  };
  fetchData();
}, []);
```

---

## 16. Best Practices Summary

### ✅ Always Do:

1. Handle 3 states: **loading**, **error**, **success**
2. Check `response.ok` before parsing
3. Use `try/catch/finally` for error handling
4. Abort requests in cleanup function
5. Show loading indicators
6. Validate API response structure
7. Debounce search/autocomplete

### ❌ Never Do:

1. Make useEffect async directly
2. Ignore error states
3. Fetch without loading state
4. Forget cleanup (memory leaks!)
5. Make API calls in render
6. Store sensitive data in state (use httpOnly cookies)

### 🎯 Advanced:

- Use React Query for complex apps
- Implement retry logic
- Cache responses (React Query, SWR)
- Use Axios interceptors for auth
- Handle race conditions
- Implement optimistic updates

---

## 17. Quick Reference: useEffect Dependencies

```jsx
// No dependencies: Runs every render (AVOID!)
useEffect(() => {
  fetchData();
});

// Empty array: Runs once on mount
useEffect(() => {
  fetchData();
}, []);

// With dependencies: Runs when deps change
useEffect(() => {
  fetchData(userId);
}, [userId]);

// Multiple dependencies
useEffect(() => {
  fetchData(userId, filter);
}, [userId, filter]);
```

---

## Summary: API Integration Checklist

When fetching data, always ensure:

- ✅ Fetch in `useEffect` (not in render)
- ✅ Handle **loading**, **error**, **success** states
- ✅ Use async/await INSIDE useEffect (not directly)
- ✅ Check `response.ok` before parsing JSON
- ✅ Cleanup: abort requests on unmount
- ✅ Show loading indicators
- ✅ Display error messages
- ✅ Debounce search queries
- ✅ Consider React Query for complex apps

Your API integration is interview-ready when you can explain:

1. Why useEffect for data fetching
2. How to prevent memory leaks (cleanup)
3. Race conditions and solutions
4. When to use fetch vs axios vs React Query
