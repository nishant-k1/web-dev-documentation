# StrictMode and Development Behavior

## What is React.StrictMode?

`React.StrictMode` is a development-only tool that helps identify potential problems in your application by intentionally **double-invoking** certain functions and enabling additional checks.

## Key Behavior: Double Invocation

In **development mode**, React.StrictMode intentionally:

1. **Double-invokes component render functions**
2. **Double-invokes state updater functions**
3. **Double-invokes useEffect, useMemo, and other hooks**

**Important:** This behavior **only happens in development mode**, not in production.

## Why Double Invocation?

React uses double invocation to help detect:

- **Side effects in render functions** (should be pure)
- **Non-idempotent functions** (functions that produce different results when called multiple times)
- **Unsafe lifecycle methods**
- **Deprecated APIs**

## Example: Double Render

```js
function Component() {
  console.log('Render'); // Logs TWICE in development with StrictMode ✅
  
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// Wrapped in StrictMode:
function App() {
  return (
    <React.StrictMode>
      <Component />
    </React.StrictMode>
  );
}
```

**Behavior:**
- **Development:** "Render" logs **twice** on mount
- **Production:** "Render" logs **once** on mount

## Double Invocation of State Updaters

```js
function Component() {
  const [count, setCount] = useState(() => {
    console.log('Initial state'); // Logs TWICE in development ✅
    return 0;
  });
  
  return <div>Count: {count}</div>;
}
```

**Behavior:**
- Initial state function is called **twice** in development
- Final state is still `0` (React discards first result)

## Double Invocation of useEffect

```js
function Component() {
  useEffect(() => {
    console.log('Effect ran'); // Logs TWICE in development ✅
    
    return () => {
      console.log('Cleanup'); // Also runs twice
    };
  }, []);
  
  return <div>Component</div>;
}
```

**Behavior:**
- Effect runs **twice** in development
- Cleanup runs **twice** in development
- **Production:** Effect runs once, cleanup runs once

## Why This Matters for Re-rendering

### Understanding Double Renders

When you see components rendering twice in development:

```js
function Component() {
  console.log('Render'); // Logs: "Render", "Render"
  
  // This is NORMAL in development with StrictMode
  // Don't try to "fix" it - it's intentional!
}
```

**Key Points:**
- **This is expected behavior** in development
- **Not a bug** - it's a feature to catch issues
- **Production builds** don't have this behavior
- **Don't optimize for double renders** - optimize for single renders

### Side Effects in Render

StrictMode helps catch side effects:

```js
// ❌ BAD: Side effect in render
function Component() {
  const [count, setCount] = useState(0);
  
  // Side effect - will run twice in development
  document.title = `Count: ${count}`; // ❌ Wrong place!
  
  return <div>Count: {count}</div>;
}

// ✅ GOOD: Side effect in useEffect
function Component() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = `Count: ${count}`; // ✅ Correct place
  }, [count]);
  
  return <div>Count: {count}</div>;
}
```

## What Gets Double-Invoked

### ✅ Double-Invoked in StrictMode

1. **Component render functions**
2. **State initializer functions** (`useState(() => ...)`)
3. **State updater functions** (in some cases)
4. **useEffect callbacks**
5. **useMemo callbacks**
6. **useCallback callbacks**
7. **Class component constructors**
8. **Class component render methods**

### ❌ NOT Double-Invoked

1. **Event handlers** (onClick, onChange, etc.)
2. **State setters called from event handlers**
3. **Production builds**

## Example: Full Component with StrictMode

```js
function Component() {
  console.log('1. Render function'); // Logs twice
  
  const [count, setCount] = useState(() => {
    console.log('2. State initializer'); // Logs twice
    return 0;
  });
  
  useEffect(() => {
    console.log('3. Effect'); // Logs twice
    return () => {
      console.log('4. Cleanup'); // Logs twice
    };
  }, []);
  
  const memoized = useMemo(() => {
    console.log('5. useMemo'); // Logs twice
    return count * 2;
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// Development output (with StrictMode):
// 1. Render function
// 2. State initializer
// 1. Render function (again)
// 2. State initializer (again)
// 3. Effect
// 4. Cleanup (immediate)
// 3. Effect (again)
// 5. useMemo
// 5. useMemo (again)
```

## Production vs Development

### Development (StrictMode)

```js
// Component renders twice
// Effects run twice
// Initializers run twice
```

### Production (No StrictMode)

```js
// Component renders once
// Effects run once
// Initializers run once
```

## Common Confusion

### ❌ "My component is rendering twice, there's a bug!"

```js
function Component() {
  console.log('Render'); // Logs twice in dev
  
  // This is NORMAL with StrictMode!
  // Not a bug - it's intentional
}
```

### ✅ Understanding the Behavior

```js
function Component() {
  // In development with StrictMode:
  // - First render: React renders to detect side effects
  // - Second render: React renders again to verify consistency
  // - If both renders produce same result → Component is pure ✅
  // - If renders produce different results → Potential bug ⚠️
}
```

## Best Practices

### ✅ Write Pure Components

```js
// ✅ GOOD: Pure component (same output for same input)
function Component({ name }) {
  return <div>Hello, {name}</div>;
}
```

### ✅ Keep Side Effects in useEffect

```js
// ✅ GOOD: Side effects in useEffect
function Component() {
  useEffect(() => {
    // Side effects here
    fetchData();
  }, []);
  
  return <div>Component</div>;
}
```

### ✅ Make Functions Idempotent

```js
// ✅ GOOD: Idempotent function (same result when called multiple times)
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// ❌ BAD: Non-idempotent function
let counter = 0;
const getNextId = () => {
  return counter++; // Different result each time!
};
```

## Disabling StrictMode (Not Recommended)

```js
// ❌ NOT RECOMMENDED: Removing StrictMode
function App() {
  return (
    // <React.StrictMode> {/* Removed */}
    <Component />
    // </React.StrictMode>
  );
}
```

**Why not recommended:**
- You lose helpful development warnings
- You might miss potential bugs
- Your code might work in dev but fail in production

## Summary

- **StrictMode is development-only** - doesn't affect production
- **Double invocation is intentional** - helps catch bugs
- **Components render twice** in development with StrictMode
- **Effects run twice** in development with StrictMode
- **This is expected behavior** - not a bug
- **Write pure components** - same output for same input
- **Keep side effects in useEffect** - not in render
- **Don't disable StrictMode** - it helps catch issues early

