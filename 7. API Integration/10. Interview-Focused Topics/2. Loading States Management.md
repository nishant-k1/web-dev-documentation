# Loading States Management

Loading state patterns in React - loading indicators, skeleton screens, optimistic updates, preventing loading flicker, and best practices.

---

## Core Concept

**Loading states** inform users that data is being fetched. Proper loading state management improves UX.

**Key Patterns:**
- Loading indicators
- Skeleton screens
- Optimistic updates
- Preventing flicker

---

## Pattern 1: Basic Loading State

### Simple Loading Indicator

```javascript
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Pattern 2: Skeleton Screens

### Skeleton Component

```javascript
function UserSkeleton() {
  return (
    <div className="skeleton">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-text">
        <div className="skeleton-line"></div>
        <div className="skeleton-line short"></div>
      </div>
    </div>
  );
}

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        {[1, 2, 3].map(i => (
          <UserSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Pattern 3: Optimistic Updates

### Update UI Immediately

```javascript
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = async (text) => {
    // Optimistic update - add immediately
    const optimisticTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos(prev => [...prev, optimisticTodo]);

    try {
      // Actual API call
      const res = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
      });
      const newTodo = await res.json();

      // Replace optimistic with real
      setTodos(prev =>
        prev.map(t => t.id === optimisticTodo.id ? newTodo : t)
      );
    } catch (error) {
      // Rollback on error
      setTodos(prev =>
        prev.filter(t => t.id !== optimisticTodo.id)
      );
      alert('Failed to add todo');
    }
  };

  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
      <button onClick={() => addTodo('New Todo')}>Add</button>
    </div>
  );
}
```

---

## Pattern 4: Preventing Loading Flicker

### Minimum Loading Time

```javascript
function useApiWithMinLoading(url, minLoadingTime = 300) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      startTime.current = Date.now();
      setLoading(true);

      try {
        const res = await fetch(url);
        const data = await res.json();
        
        // Ensure minimum loading time
        const elapsed = Date.now() - startTime.current;
        const remaining = Math.max(0, minLoadingTime - elapsed);
        
        await new Promise(resolve => setTimeout(resolve, remaining));
        
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, minLoadingTime]);

  return { data, loading };
}
```

---

## Pattern 5: Multiple Loading States

### Different Loading States

```javascript
function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState({
    users: true,
    posts: true,
  });

  useEffect(() => {
    // Load users
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(prev => ({ ...prev, users: false }));
      });

    // Load posts
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(prev => ({ ...prev, posts: false }));
      });
  }, []);

  return (
    <div>
      {loading.users ? (
        <div>Loading users...</div>
      ) : (
        <UserList users={users} />
      )}

      {loading.posts ? (
        <div>Loading posts...</div>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}
```

---

## Common Interview Questions

### Q: How do you handle loading states in React?

**A:** Use loading state in hooks, show loading indicators or skeleton screens, use optimistic updates for better UX, and prevent loading flicker.

### Q: What's the difference between loading indicator and skeleton screen?

**A:** Loading indicator is generic (spinner), skeleton screen mimics content layout (better UX, shows structure).

### Q: What are optimistic updates?

**A:** Update UI immediately before API call completes, then update with real data or rollback on error.

---

## Related Topics

- [Error Handling Patterns](./1.%20Error%20Handling%20Patterns%20in%20React.md) - Error handling
- [Optimistic Updates](./6.%20Optimistic%20Updates.md) - Detailed optimistic updates

---

## Summary

**Loading State Patterns:**
- Loading indicators (simple)
- Skeleton screens (better UX)
- Optimistic updates (immediate feedback)
- Prevent flicker (minimum loading time)
- Multiple loading states (independent)

**Best Practices:**
- Always show loading state
- Use skeleton screens for better UX
- Use optimistic updates when appropriate
- Prevent loading flicker
- Handle loading errors

**Key Takeaway:** Manage loading states properly. Use skeleton screens for better UX, optimistic updates for immediate feedback, and prevent loading flicker for smoother experience.

