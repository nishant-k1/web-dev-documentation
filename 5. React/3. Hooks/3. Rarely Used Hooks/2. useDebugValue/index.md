# `useDebugValue` Hook

## TL;DR
- Display label for custom hooks in React DevTools
- Only for development/debugging
- Has zero impact on production
- Accepts optional formatter function
- Purely for developer experience

## What is `useDebugValue`?

`useDebugValue` is used to display a label for custom Hooks in React DevTools. It helps with debugging by showing meaningful information about your custom Hook's state.

## Syntax

```jsx
useDebugValue(value);
useDebugValue(value, formatterFn); // With formatter
```

## Basic Usage

```jsx
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    function handleOnline() { setIsOnline(true); }
    function handleOffline() { setIsOnline(false); }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Shows "OnlineStatus: true" or "OnlineStatus: false" in DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline');
  
  return isOnline;
}
```

## With Formatter Function

```jsx
function useDate() {
  const [date, setDate] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  // Formatter only runs if DevTools is open
  useDebugValue(date, date => date.toLocaleString());
  
  return date;
}
```

## Real-World Examples

### 1. User Hook with Debug Info

```jsx
function useUser(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      });
  }, [userId]);
  
  // Shows user info in DevTools
  useDebugValue(
    loading ? 'Loading...' : user?.name || 'No user',
    value => `User: ${value}`
  );
  
  return { user, loading };
}
```

### 2. Form Hook with Validation Status

```jsx
function useFormField(initialValue, validate) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  
  const handleChange = (newValue) => {
    setValue(newValue);
    const validationError = validate(newValue);
    setError(validationError);
  };
  
  // Shows validation status in DevTools
  useDebugValue(
    error ? `❌ Invalid: ${error}` : '✓ Valid'
  );
  
  return { value, error, handleChange };
}
```

### 3. Media Query Hook

```jsx
function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = () => setMatches(mediaQuery.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [query]);
  
  // Shows current match status
  useDebugValue(`${query}: ${matches ? '✓' : '✗'}`);
  
  return matches;
}
```

## When to Use Formatter

The formatter function only runs when DevTools is open, so use it for expensive operations:

```jsx
function useExpensiveData(data) {
  // ❌ Without formatter - always runs
  useDebugValue(JSON.stringify(data));
  
  // ✅ With formatter - only runs when DevTools open
  useDebugValue(data, d => JSON.stringify(d));
  
  return data;
}
```

## Common Interview Questions

### Q1: Does useDebugValue affect production?

**Answer:** No! It's completely stripped out or ignored in production builds. Zero performance impact.

### Q2: Can you use it in regular components?

**Answer:** Technically yes, but it's designed for custom Hooks. React DevTools won't display it meaningfully in components.

### Q3: When should you use the formatter function?

**Answer:** When formatting is expensive (JSON.stringify, date formatting, etc.). Formatter only runs when DevTools is open.

### Q4: Can you see useDebugValue in browser console?

**Answer:** No! Only in React DevTools browser extension. It's a DevTools-only feature.

## Best Practices

1. **Use in custom hooks only** - not regular components
2. **Keep messages concise** - short, descriptive labels
3. **Use formatter for expensive operations**
4. **Add when debugging complex hooks**
5. **Remove if not useful** - don't add just because you can

## When to Use

✅ **Use for:**
- Complex custom hooks with multiple states
- Debugging hook behavior
- Showing derived/computed values
- Team collaboration (helps others debug)

❌ **Don't use for:**
- Regular components (use props in DevTools)
- Simple hooks (useState/useEffect don't need it)
- Production debugging (use proper logging)
- "Just because" (adds noise to DevTools)

## DevTools Display

```jsx
function Component() {
  const isOnline = useOnlineStatus();
  const user = useUser(123);
  
  return <div>...</div>;
}

// In React DevTools you'll see:
// Component
//   ├─ useOnlineStatus: "Online"
//   └─ useUser: "User: John Doe"
```

## Related Concepts

- **React DevTools**: Where useDebugValue displays
- **Custom Hooks**: Primary use case
- **Development Mode**: Only meaningful in dev
- **Debugging**: Part of debug tooling



