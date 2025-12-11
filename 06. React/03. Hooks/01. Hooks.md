# React Hooks - Complete Guide

## Overview

Hooks are functions that let you "hook into" React state and lifecycle features from function components. Introduced in React 16.8.

## Rules of Hooks

1. **Only call Hooks at the top level** - Don't call inside loops, conditions, or nested functions
2. **Only call Hooks from React functions** - Function components or custom Hooks

## Frequently Used Hooks

### 1. [useState](./1.%20Frequently%20Used%20Hooks/1.%20useState/index.md)

- Add state to functional components
- Returns `[state, setState]`
- State updates trigger re-renders

**Quick Example:**

```jsx
const [count, setCount] = useState(0);
```

### 2. [useEffect](./1.%20Frequently%20Used%20Hooks/2.%20useEffect/index.md)

- Handle side effects (data fetching, subscriptions, timers)
- Runs after render
- Can return cleanup function

**Quick Example:**

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

### 3. [useRef](./1.%20Frequently%20Used%20Hooks/3.%20useRef/index.md)

- Access DOM elements directly
- Store mutable values that don't trigger re-renders
- Persists across renders

**Quick Example:**

```jsx
const inputRef = useRef(null);
inputRef.current.focus();
```

### 4. [useContext](./1.%20Frequently%20Used%20Hooks/4.%20useContext/index.md)

- Read and subscribe to context
- Avoid prop drilling
- Component re-renders when context changes

**Quick Example:**

```jsx
const theme = useContext(ThemeContext);
```

### 5. [useMemo](./1.%20Frequently%20Used%20Hooks/5.%20useMemo/index.md)

- Memoize expensive calculations
- Only recalculates when dependencies change
- Performance optimization

**Quick Example:**

```jsx
const expensiveValue = useMemo(() => computeExpensive(a, b), [a, b]);
```

### 6. [useCallback](./1.%20Frequently%20Used%20Hooks/6.%20useCallback/index.md)

- Memoize functions
- Prevent unnecessary re-renders of child components
- Use with React.memo

**Quick Example:**

```jsx
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### 7. [useReducer](./1.%20Frequently%20Used%20Hooks/7.%20useReducer/index.md)

- Alternative to useState for complex state
- Similar to Redux pattern
- Better for related state values

**Quick Example:**

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "INCREMENT" });
```

### 8. [Custom Hooks](./1.%20Frequently%20Used%20Hooks/8.%20Custom%20Hooks/index.md)

- Extract and reuse stateful logic
- Must start with "use"
- Can call other Hooks

**Quick Example:**

```jsx
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth });
  // ... logic
  return size;
}
```

## Hook Comparison Quick Reference

| Hook        | Purpose           | Returns           | When to Use                |
| ----------- | ----------------- | ----------------- | -------------------------- |
| useState    | Simple state      | [state, setter]   | Independent values         |
| useEffect   | Side effects      | cleanup fn        | Async operations           |
| useRef      | Mutable refs      | ref object        | DOM access, persist values |
| useContext  | Context values    | context value     | Avoid prop drilling        |
| useMemo     | Memoize values    | memoized value    | Expensive calculations     |
| useCallback | Memoize functions | memoized function | Optimize child renders     |
| useReducer  | Complex state     | [state, dispatch] | Related state values       |
| Custom      | Reuse logic       | anything          | Extract common patterns    |

## Common Patterns

### 1. State Management

```jsx
// Simple state
const [count, setCount] = useState(0);

// Complex state
const [state, dispatch] = useReducer(reducer, initialState);

// Global state
const value = useContext(MyContext);
```

### 2. Side Effects

```jsx
// Run once (mount)
useEffect(() => {
  // setup
  return () => {
    /* cleanup */
  };
}, []);

// Run on dependency change
useEffect(() => {
  // effect
}, [dependency]);
```

### 3. Performance Optimization

```jsx
// Memoize values
const value = useMemo(() => expensive(), [dep]);

// Memoize functions
const fn = useCallback(() => {}, [dep]);

// Memoize components
const MemoComp = React.memo(Component);
```

### 4. Refs

```jsx
// DOM ref
const inputRef = useRef(null);
<input ref={inputRef} />;

// Mutable value
const countRef = useRef(0);
countRef.current++;
```

## Interview Preparation Checklist

### Beginner Level

- [ ] Explain what Hooks are
- [ ] Rules of Hooks
- [ ] useState basics
- [ ] useEffect basics
- [ ] When to use which hook

### Intermediate Level

- [ ] useEffect cleanup
- [ ] useEffect dependency array
- [ ] useContext with Provider
- [ ] useMemo vs useCallback
- [ ] Custom hooks basics

### Advanced Level

- [ ] useReducer patterns
- [ ] Complex custom hooks
- [ ] Performance optimization strategies
- [ ] Stale closure problems
- [ ] Race conditions in useEffect

## Common Interview Questions

### useState

1. How does useState work?
2. Why use functional updates?
3. What happens if you update state with same value?

### useEffect

1. When does useEffect run?
2. How to cleanup in useEffect?
3. useEffect vs useLayoutEffect?

### useContext

1. Context vs Redux?
2. How to prevent unnecessary re-renders with Context?
3. Can you update context from consumer?

### useMemo/useCallback

1. When should you use them?
2. What's the difference?
3. Do you need them everywhere?

### useReducer

1. useReducer vs useState?
2. How is it different from Redux?
3. When to use useReducer?

### Custom Hooks

1. Why must they start with "use"?
2. Do they share state?
3. Can they return JSX?

## Additional Hooks (Not Covered Yet)

### Occasionally Used

- `useLayoutEffect` - Synchronous useEffect
- `useTransition` - Mark updates as transitions
- `useDeferredValue` - Defer updating part of UI
- `useId` - Generate unique IDs
- `useSyncExternalStore` - Subscribe to external store

### Rarely Used

- `useImperativeHandle` - Customize ref value
- `useInsertionEffect` - Insert styles before DOM
- `useDebugValue` - Display label in DevTools

## Best Practices Summary

1. ✅ Always follow Rules of Hooks
2. ✅ Use ESLint plugin for Hooks
3. ✅ Keep effects focused (one concern per effect)
4. ✅ Always include dependencies
5. ✅ Clean up side effects
6. ✅ Use functional updates when needed
7. ✅ Create custom hooks for reusable logic
8. ✅ Profile before optimizing with useMemo/useCallback
9. ✅ Use TypeScript for better type safety
10. ✅ Test custom hooks with React Testing Library

## Resources

- [Official React Hooks Documentation](https://react.dev/reference/react)
- [Rules of Hooks](https://react.dev/warnings/invalid-hook-call-warning)
- [React Hooks Testing Library](https://react-hooks-testing-library.com/)


