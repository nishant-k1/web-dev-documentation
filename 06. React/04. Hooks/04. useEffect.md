# `useEffect` Hook

## TL;DR
- Handles side effects in functional components
- Runs after render (by default)
- Cleanup function runs before next effect or unmount
- Dependency array controls when effect runs
- Empty array `[]` = runs once (mount only)
- No array = runs after every render

## What is `useEffect`?

`useEffect` lets you perform side effects in functional components. It replaces lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in class components.

**Side effects include:**
- Data fetching
- Subscriptions
- Manual DOM manipulation
- Timers
- Logging

## Basic Syntax

```jsx
useEffect(() => {
  // Effect code here
  
  return () => {
    // Cleanup code (optional)
  };
}, [dependencies]); // Dependency array
```

## The Three Forms of `useEffect`

### 1. No Dependency Array - Runs After Every Render

```jsx
function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Runs after every render');
  }); // No array
  
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### 2. Empty Dependency Array - Runs Once (Mount Only)

```jsx
function Component() {
  useEffect(() => {
    console.log('Runs once after initial render');
    // Like componentDidMount
  }, []); // Empty array
  
  return <div>Hello</div>;
}
```

### 3. With Dependencies - Runs When Dependencies Change

```jsx
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  useEffect(() => {
    console.log('Runs when count changes');
    // Does NOT run when name changes
  }, [count]); // Runs only if count changes
  
  return <div>{count} - {name}</div>;
}
```

## Common Use Cases

### 1. Data Fetching

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Reset state when userId changes
    setLoading(true);
    setError(null);
    
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]); // Re-fetch when userId changes
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{user?.name}</div>;
}
```

### 2. Subscriptions & Event Listeners

```jsx
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    
    // Subscribe
    window.addEventListener('resize', handleResize);
    
    // Cleanup - unsubscribe
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Setup once
  
  return <div>Window width: {width}px</div>;
}
```

### 3. Timers

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup - clear interval
    return () => clearInterval(interval);
  }, []); // Setup once
  
  return <div>Seconds: {seconds}</div>;
}
```

### 4. Document Title

```jsx
function PageTitle({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]); // Update when title changes
  
  return <h1>{title}</h1>;
}
```

### 5. Local Storage Sync

```jsx
function PersistentCounter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('count');
    return saved ? parseInt(saved) : 0;
  });
  
  useEffect(() => {
    localStorage.setItem('count', count);
  }, [count]); // Save when count changes
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## Cleanup Function

The cleanup function runs:
1. Before the component unmounts
2. Before the effect runs again (if dependencies changed)

```jsx
function Chat({ roomId }) {
  useEffect(() => {
    // 1. Setup
    const connection = createConnection(roomId);
    connection.connect();
    
    // 2. Cleanup
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  
  return <div>Chat Room: {roomId}</div>;
}
```

**Execution Order:**
```
1. Component renders
2. Effect runs → connection.connect()
3. roomId changes
4. Cleanup runs → connection.disconnect()
5. Effect runs again with new roomId
6. Component unmounts
7. Cleanup runs → connection.disconnect()
```

## Dependency Array Deep Dive

### What Should Be in Dependencies?

**Rule:** Include **every value** from component scope used inside effect.

```jsx
function Component({ userId }) {
  const [count, setCount] = useState(0);
  const multiplier = 2;
  
  useEffect(() => {
    // Uses: userId, count, multiplier
    const result = (userId + count) * multiplier;
    console.log(result);
  }, [userId, count, multiplier]); // ✅ All included
}
```

### Objects & Arrays in Dependencies

```jsx
function Component({ user }) {
  // ❌ WRONG - infinite loop!
  // user object reference changes every render
  useEffect(() => {
    console.log(user.name);
  }, [user]); // New object every render
  
  // ✅ CORRECT - depend on specific property
  useEffect(() => {
    console.log(user.name);
  }, [user.name]); // Only re-run if name changes
}
```

### Functions in Dependencies

```jsx
function Component() {
  const [count, setCount] = useState(0);
  
  // ❌ WRONG - fetchData is new every render
  const fetchData = () => {
    console.log(count);
  };
  
  useEffect(() => {
    fetchData();
  }, [fetchData]); // Infinite loop!
  
  // ✅ SOLUTION 1 - Move function inside effect
  useEffect(() => {
    const fetchData = () => {
      console.log(count);
    };
    fetchData();
  }, [count]);
  
  // ✅ SOLUTION 2 - Use useCallback
  const fetchData = useCallback(() => {
    console.log(count);
  }, [count]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
}
```

## Common Interview Questions

### Q1: What's the execution order of useEffect?

**Answer:**
```
1. Component renders (JSX → Virtual DOM)
2. React commits changes to DOM
3. Browser paints screen
4. useEffect runs (after paint)
```

**For cleanup:**
```
1. Component re-renders (dependencies changed)
2. React commits DOM changes
3. Browser paints
4. Cleanup function runs
5. New effect runs
```

### Q2: useEffect vs useLayoutEffect?

**Answer:**
- **useEffect**: Runs **after** browser paint (async)
- **useLayoutEffect**: Runs **before** browser paint (sync)

```jsx
// Most cases - use useEffect
useEffect(() => {
  // Runs after paint (doesn't block browser)
});

// Use useLayoutEffect for DOM measurements
useLayoutEffect(() => {
  const height = ref.current.offsetHeight;
  // Runs before paint (prevents flicker)
});
```

### Q3: How to handle async functions in useEffect?

**Answer:** Can't make useEffect callback `async` directly. Use IIFE or separate function:

```jsx
// ❌ WRONG
useEffect(async () => {
  const data = await fetch('/api');
}, []);

// ✅ CORRECT - IIFE
useEffect(() => {
  (async () => {
    const data = await fetch('/api');
  })();
}, []);

// ✅ CORRECT - Separate function
useEffect(() => {
  async function fetchData() {
    const data = await fetch('/api');
  }
  fetchData();
}, []);
```

### Q4: How to prevent effect from running on mount?

**Answer:** Use a ref to track first render:

```jsx
function Component({ value }) {
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip first run
    }
    
    console.log('Runs on updates only');
  }, [value]);
}
```

### Q5: Can you conditionally call useEffect?

**Answer:** No! Hooks must be called unconditionally. Use conditional logic inside:

```jsx
// ❌ WRONG
if (condition) {
  useEffect(() => {});
}

// ✅ CORRECT
useEffect(() => {
  if (condition) {
    // conditional logic inside
  }
}, [condition]);
```

## Common Pitfalls & Gotchas

### 1. **Infinite Loops**

```jsx
// ❌ WRONG - infinite loop
const [count, setCount] = useState(0);

useEffect(() => {
  setCount(count + 1); // Triggers re-render → effect runs again
}); // No dependency array

// ✅ CORRECT
useEffect(() => {
  // Only run once or with specific dependency
}, []);
```

### 2. **Missing Dependencies**

```jsx
function Component({ userId }) {
  const [data, setData] = useState(null);
  
  // ❌ WRONG - userId missing from deps
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setData);
  }, []); // Won't re-fetch on userId change!
  
  // ✅ CORRECT
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setData);
  }, [userId]);
}
```

### 3. **Stale Closures**

```jsx
function Timer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1); // ❌ count is stale (always 0)
    }, 1000);
    
    return () => clearInterval(interval);
  }, []); // Empty deps - captures initial count
  
  // ✅ CORRECT - Use functional update
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1); // Always latest value
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
}
```

### 4. **Race Conditions**

```jsx
function SearchResults({ query }) {
  const [results, setResults] = useState([]);
  
  // ❌ WRONG - can show old results
  useEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(setResults);
  }, [query]);
  
  // ✅ CORRECT - Ignore stale requests
  useEffect(() => {
    let ignore = false;
    
    fetch(`/api/search?q=${query}`)
      .then(res => res.json())
      .then(data => {
        if (!ignore) {
          setResults(data);
        }
      });
    
    return () => {
      ignore = true; // Cancel if new effect runs
    };
  }, [query]);
}
```

### 5. **Forgetting Cleanup**

```jsx
// ❌ WRONG - memory leak
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  // No cleanup!
}, []);

// ✅ CORRECT
useEffect(() => {
  const interval = setInterval(() => {}, 1000);
  return () => clearInterval(interval);
}, []);
```

## Best Practices

1. **One effect per concern** - split unrelated effects
2. **Always cleanup** subscriptions, timers, listeners
3. **Include all dependencies** - use ESLint plugin
4. **Use functional updates** to avoid stale closures
5. **Handle race conditions** for async operations
6. **Move functions inside effects** when possible

## When to Use `useEffect`

✅ **Use for:**
- Data fetching
- Subscriptions
- Manual DOM manipulation
- Timers/intervals
- Side effects triggered by state/prop changes

❌ **Don't use for:**
- Transforming data for rendering (do in render)
- Handling user events (use event handlers)
- Initializing state (use useState initializer)

## Related Concepts

- **useLayoutEffect**: Synchronous version of useEffect
- **useCallback**: Memoize functions for effect dependencies
- **useMemo**: Memoize values for effect dependencies
- **Custom Hooks**: Encapsulate effect logic



