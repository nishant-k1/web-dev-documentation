# Context Value Comparison

## How React Compares Context Values

React uses **`Object.is()`** (reference equality) to compare context values, not shallow or deep comparison.

## Basic Behavior

```js
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

function ThemedComponent() {
  const theme = useContext(ThemeContext);
  console.log("ThemedComponent rendered");
  return <div>Theme: {theme}</div>;
}
```

**Behavior:**
- When `theme` changes from `'light'` to `'dark'` → Component re-renders ✅
- When `theme` stays `'light'` → Component does NOT re-render ✅

## Reference Equality Check

React compares context values using `Object.is()`:

```js
// React's internal check (simplified):
if (Object.is(previousContextValue, newContextValue)) {
  // Same value → Don't re-render consumers
  return;
}
// Different value → Re-render all consumers
```

## Primitive Values

For primitive values (string, number, boolean), React compares by value:

```js
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      <ThemedComponent />
    </ThemeContext.Provider>
  );
}

// Click button to change theme:
setTheme('dark'); // Different value → Re-renders consumers ✅
setTheme('light'); // Same value → No re-render ✅
```

## Object Values: Reference Comparison

**⚠️ Critical:** For object/array values, React compares by **reference**, not by contents!

```js
const UserContext = createContext({ name: 'John', age: 30 });

function App() {
  const [count, setCount] = useState(0);
  
  // ❌ BAD: New object every render
  return (
    <UserContext.Provider value={{ name: 'John', age: 30 }}>
      <UserComponent />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </UserContext.Provider>
  );
}

function UserComponent() {
  const user = useContext(UserContext);
  console.log("UserComponent rendered");
  return <div>{user.name}</div>;
}
```

**Problem:**
- Every render creates a **new object** `{ name: 'John', age: 30 }`
- New object = different reference
- `Object.is(oldValue, newValue)` → `false`
- **All consumers re-render on every parent render!** ❌

### ✅ Solution: Memoize Context Value

```js
function App() {
  const [count, setCount] = useState(0);
  
  // ✅ GOOD: Memoize context value
  const userValue = useMemo(
    () => ({ name: 'John', age: 30 }),
    [] // Empty deps = never changes
  );
  
  return (
    <UserContext.Provider value={userValue}>
      <UserComponent />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </UserContext.Provider>
  );
}
```

**Result:**
- `userValue` has the **same reference** across renders
- `Object.is(oldValue, newValue)` → `true`
- **Consumers don't re-render when count changes!** ✅

## Multiple Context Values

When context value is an object with multiple properties:

```js
const AppContext = createContext({
  theme: 'light',
  user: { name: 'John' },
  settings: { lang: 'en' }
});

function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'John' });
  
  // ❌ BAD: New object every render
  const contextValue = {
    theme,
    user,
    settings: { lang: 'en' } // New object every render!
  };
  
  return (
    <AppContext.Provider value={contextValue}>
      <AppComponent />
    </AppContext.Provider>
  );
}
```

**Problem:** Even if `theme` and `user` don't change, `settings` is a new object → entire context value is new → all consumers re-render.

### ✅ Solution: Memoize Entire Context Value

```js
function App() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'John' });
  const [settings] = useState({ lang: 'en' }); // Stable reference
  
  // ✅ GOOD: Memoize with dependencies
  const contextValue = useMemo(
    () => ({
      theme,
      user,
      settings
    }),
    [theme, user, settings] // Only recreate when these change
  );
  
  return (
    <AppContext.Provider value={contextValue}>
      <AppComponent />
    </AppContext.Provider>
  );
}
```

## When Context Consumers Re-render

A component using `useContext` re-renders when:

1. **Context value reference changes** (using `Object.is()`)
2. **Parent component re-renders** (if not prevented)

```js
function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');
  
  const contextValue = useMemo(
    () => ({ theme }),
    [theme] // Only changes when theme changes
  );
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <CounterComponent /> {/* Not using context */}
      <ThemedComponent /> {/* Using context */}
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </ThemeContext.Provider>
  );
}

function CounterComponent() {
  // Doesn't use context, but still re-renders when App re-renders
  return <div>Counter</div>;
}

function ThemedComponent() {
  const { theme } = useContext(ThemeContext);
  // Re-renders when:
  // 1. App re-renders (parent re-render)
  // 2. contextValue reference changes (theme changes)
  return <div>Theme: {theme}</div>;
}
```

## Preventing Unnecessary Re-renders

### Option 1: Split Contexts

```js
// Instead of one large context:
const AppContext = createContext({ theme, user, settings });

// Split into multiple contexts:
const ThemeContext = createContext('light');
const UserContext = createContext({ name: 'John' });
const SettingsContext = createContext({ lang: 'en' });

// Components only subscribe to contexts they need
```

### Option 2: Memoize Consumers

```js
const ThemedComponent = React.memo(() => {
  const theme = useContext(ThemeContext);
  return <div>Theme: {theme}</div>;
});
```

### Option 3: Select Specific Values

```js
// Custom hook to select only needed value
function useTheme() {
  const context = useContext(AppContext);
  return context.theme; // Only re-renders if theme changes
}
```

## Common Mistakes

### ❌ Mistake 1: Inline Object Literal

```js
<ThemeContext.Provider value={{ theme: 'light' }}>
  {/* New object every render → all consumers re-render */}
</ThemeContext.Provider>
```

### ❌ Mistake 2: Unstable Nested Objects

```js
const contextValue = {
  theme: 'light',
  config: { lang: 'en' } // New object every render
};
```

### ❌ Mistake 3: Functions in Context Value

```js
const contextValue = {
  theme: 'light',
  toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light')
  // New function every render → context value is new
};
```

### ✅ Correct Patterns

```js
// Memoize entire value
const contextValue = useMemo(
  () => ({
    theme,
    config: stableConfig,
    toggleTheme: stableToggleTheme
  }),
  [theme, stableConfig, stableToggleTheme]
);

// Or use useCallback for functions
const toggleTheme = useCallback(() => {
  setTheme(prev => prev === 'light' ? 'dark' : 'light');
}, []);
```

## Comparison Table

| Context Value Type | Comparison Method | Re-renders When |
|-------------------|-------------------|-----------------|
| Primitive (string, number, boolean) | Value comparison (`Object.is()`) | Value changes |
| Object/Array | Reference comparison (`Object.is()`) | Reference changes |
| Function | Reference comparison (`Object.is()`) | Reference changes |

## Summary

- **React uses `Object.is()`** to compare context values (reference equality)
- **Primitive values** are compared by value
- **Object/array values** are compared by reference
- **Always memoize context values** that contain objects/arrays/functions
- **Split contexts** to prevent unnecessary re-renders
- **Memoize consumers** if needed for additional optimization

