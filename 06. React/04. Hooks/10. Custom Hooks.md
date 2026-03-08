# Custom Hooks

## TL;DR
- Functions that use React Hooks and encapsulate logic
- Must start with `use` prefix (convention and rule)
- Enable logic reuse across components
- Can use other hooks (built-in or custom)
- Return values, not JSX

## What are Custom Hooks?

Custom Hooks are JavaScript functions that:
1. Start with `use` (e.g., `useCustomHook`)
2. Can call other Hooks
3. Allow you to extract and reuse stateful logic

**Not a React feature** - just a naming convention that enables Hooks to work correctly.

## Why Custom Hooks?

### Before Custom Hooks (Duplicate Logic)

```jsx
function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}

function UserSettings() {
  // Same logic duplicated!
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <div>Loading...</div>;
  return <div>{user.email}</div>;
}
```

### After Custom Hooks (Reusable)

```jsx
// Custom Hook
function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, []);
  
  return { user, loading };
}

// Components use the hook
function UserProfile() {
  const { user, loading } = useUser();
  
  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}

function UserSettings() {
  const { user, loading } = useUser();
  
  if (loading) return <div>Loading...</div>;
  return <div>{user.email}</div>;
}
```

## Essential Custom Hooks Examples

### 1. useFetch - Data Fetching

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isCancelled = false;
    
    setLoading(true);
    setError(null);
    
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        if (!isCancelled) {
          setData(data);
          setLoading(false);
        }
      })
      .catch(error => {
        if (!isCancelled) {
          setError(error.message);
          setLoading(false);
        }
      });
    
    return () => {
      isCancelled = true; // Cleanup to prevent state updates after unmount
    };
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}
```

### 2. useLocalStorage - Persistent State

```jsx
function useLocalStorage(key, initialValue) {
  // Get from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Wrapped setter that also updates localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function like useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

### 3. useToggle - Boolean State Toggle

```jsx
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle];
}

// Usage
function Modal() {
  const [isOpen, toggleOpen] = useToggle(false);
  
  return (
    <div>
      <button onClick={toggleOpen}>Open Modal</button>
      {isOpen && (
        <div className="modal">
          <p>Modal Content</p>
          <button onClick={toggleOpen}>Close</button>
        </div>
      )}
    </div>
  );
}
```

### 4. useDebounce - Debounced Value

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage
function SearchBox() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // API call here
      fetch(`/api/search?q=${debouncedSearchTerm}`)
        .then(res => res.json())
        .then(data => console.log(data));
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### 5. useWindowSize - Responsive Design

```jsx
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}

// Usage
function ResponsiveComponent() {
  const { width } = useWindowSize();
  
  return (
    <div>
      {width < 768 ? (
        <MobileView />
      ) : (
        <DesktopView />
      )}
    </div>
  );
}
```

### 6. usePrevious - Previous Value

```jsx
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Usage
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  
  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### 7. useOnClickOutside - Click Outside Detection

```jsx
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// Usage
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  
  useOnClickOutside(ref, () => setIsOpen(false));
  
  return (
    <div ref={ref}>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && (
        <ul>
          <li>Option 1</li>
          <li>Option 2</li>
        </ul>
      )}
    </div>
  );
}
```

### 8. useForm - Form Management

```jsx
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  
  const handleChange = (name) => (e) => {
    setValues({
      ...values,
      [name]: e.target.value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleSubmit = (onSubmit, validate) => (e) => {
    e.preventDefault();
    
    if (validate) {
      const validationErrors = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }
    
    onSubmit(values);
  };
  
  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };
  
  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    reset,
    setErrors
  };
}

// Usage
function LoginForm() {
  const { values, errors, handleChange, handleSubmit, setErrors } = useForm({
    email: '',
    password: ''
  });
  
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Email required';
    if (!values.password) errors.password = 'Password required';
    return errors;
  };
  
  const onSubmit = async (values) => {
    try {
      await login(values);
      alert('Login successful!');
    } catch (error) {
      setErrors({ form: error.message });
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit, validate)}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange('email')}
      />
      {errors.email && <span>{errors.email}</span>}
      
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange('password')}
      />
      {errors.password && <span>{errors.password}</span>}
      
      {errors.form && <div>{errors.form}</div>}
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### 9. useAsync - Async Operations

```jsx
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  
  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);
    
    return asyncFunction()
      .then(response => {
        setValue(response);
        setStatus('success');
      })
      .catch(error => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);
  
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  
  return { execute, status, value, error };
}

// Usage
function UserProfile({ userId }) {
  const fetchUser = useCallback(
    () => fetch(`/api/users/${userId}`).then(res => res.json()),
    [userId]
  );
  
  const { value: user, status, error } = useAsync(fetchUser);
  
  if (status === 'pending') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}</div>;
  if (status === 'success') return <div>{user.name}</div>;
  
  return null;
}
```

### 10. useInterval - Declarative setInterval

```jsx
function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  // Set up the interval
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// Usage
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  
  useInterval(
    () => setSeconds(seconds + 1),
    isRunning ? 1000 : null // Pass null to pause
  );
  
  return (
    <div>
      <p>{seconds} seconds</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Resume'}
      </button>
    </div>
  );
}
```

## Custom Hook Patterns

### Pattern 1: Composing Hooks

```jsx
function useUserWithPosts(userId) {
  // Compose multiple custom hooks
  const { data: user, loading: userLoading } = useFetch(`/api/users/${userId}`);
  const { data: posts, loading: postsLoading } = useFetch(`/api/users/${userId}/posts`);
  
  return {
    user,
    posts,
    loading: userLoading || postsLoading
  };
}
```

### Pattern 2: Hook Factory

```jsx
function createFetchHook(baseUrl) {
  return function useFetchResource(endpoint) {
    return useFetch(`${baseUrl}${endpoint}`);
  };
}

const useAPIFetch = createFetchHook('https://api.example.com');

// Usage
function Component() {
  const { data } = useAPIFetch('/users');
}
```

### Pattern 3: Hook with Actions

```jsx
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return {
    count,
    increment,
    decrement,
    reset
  };
}
```

## Common Interview Questions

### Q1: Why must custom hooks start with "use"?

**Answer:** React uses this convention to:
1. Identify hooks (for linting and rules enforcement)
2. Check for Hooks rules violations
3. Make code more readable

Without `use`, React can't enforce Rules of Hooks.

### Q2: Can a custom hook return JSX?

**Answer:** No! Custom hooks should return data/functions, not JSX. That would be a component.

```jsx
// ❌ WRONG - This is a component, not a hook
function useButton() {
  return <button>Click</button>;
}

// ✅ CORRECT - Returns data
function useButton() {
  const [clicked, setClicked] = useState(false);
  return { clicked, setClicked };
}
```

### Q3: Do custom hooks share state?

**Answer:** No! Each call to a custom hook has isolated state.

```jsx
function Component() {
  const counter1 = useCounter(); // Independent state
  const counter2 = useCounter(); // Independent state
  
  // counter1 and counter2 don't share state
}
```

### Q4: Can custom hooks call other custom hooks?

**Answer:** Yes! Hooks can call any other hooks.

```jsx
function useUserData() {
  const user = useUser();
  const posts = usePosts(user.id);
  const settings = useSettings(user.id);
  
  return { user, posts, settings };
}
```

### Q5: When should I create a custom hook?

**Answer:** When you:
- Have duplicate stateful logic across components
- Want to encapsulate complex logic
- Need to share logic between components
- Want better code organization

## Common Pitfalls & Gotchas

### 1. **Not Starting with "use"**

```jsx
// ❌ WRONG - React won't recognize this as a hook
function fetchData() {
  const [data, setData] = useState(null);
  // ... 
}

// ✅ CORRECT
function useFetchData() {
  const [data, setData] = useState(null);
  // ...
}
```

### 2. **Returning JSX**

```jsx
// ❌ WRONG - This is a component
function useModal() {
  return <div>Modal</div>;
}

// ✅ CORRECT - Return state/functions
function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  return { isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) };
}
```

### 3. **Not Memoizing Returned Functions**

```jsx
// ❌ POTENTIAL ISSUE - new function every render
function useCounter() {
  const [count, setCount] = useState(0);
  
  return {
    count,
    increment: () => setCount(c => c + 1) // New function each time
  };
}

// ✅ BETTER - memoized
function useCounter() {
  const [count, setCount] = useState(0);
  
  return {
    count,
    increment: useCallback(() => setCount(c => c + 1), [])
  };
}
```

## Best Practices

1. **Always start with "use"** - required convention
2. **Return objects for multiple values** - easier to destructure
3. **Memoize functions** - use useCallback for returned functions
4. **Keep hooks focused** - single responsibility
5. **Document parameters and return values**
6. **Handle cleanup** - return cleanup functions from useEffect
7. **TypeScript** - add types for better DX

## When to Create Custom Hooks

✅ **Create when:**
- Logic is reused across multiple components
- Complex stateful logic needs encapsulation
- Want to extract component logic for testing
- Improve code readability and organization

❌ **Don't create when:**
- Logic is only used once
- Simple one-liner functions
- Just wrapping a single built-in hook with no logic
- Over-abstracting simple code

## Related Concepts

- **Built-in Hooks**: useState, useEffect, etc.
- **Composition**: Building complex hooks from simple ones
- **Hooks Rules**: Must follow all React Hooks rules
- **React Testing Library**: Test custom hooks with `renderHook`



