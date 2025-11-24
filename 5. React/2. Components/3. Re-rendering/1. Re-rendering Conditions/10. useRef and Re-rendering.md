# useRef and Re-rendering

## Key Concept: useRef Does NOT Cause Re-renders

**Critical:** `useRef` is designed to store mutable values that persist across renders **without triggering re-renders** when they change.

## How useRef Works

```js
const myRef = useRef(initialValue);
```

- `useRef` returns a mutable object with a `.current` property
- The `.current` property can be changed without causing a re-render
- The ref object itself has a stable reference across renders

## useRef vs useState: Re-rendering Behavior

### useState: Changes Trigger Re-renders

```js
function Component() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);

  renderCount.current += 1; // Doesn't cause re-render

  return (
    <div>
      <p>State count: {count}</p>
      <p>Render count: {renderCount.current}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment State (triggers re-render)
      </button>
      <button
        onClick={() => {
          renderCount.current += 1; // No re-render!
          console.log("Ref updated:", renderCount.current);
        }}
      >
        Increment Ref (NO re-render)
      </button>
    </div>
  );
}
```

**Behavior:**

- Clicking "Increment State" → Component re-renders → UI updates
- Clicking "Increment Ref" → No re-render → UI does NOT update (but value changes in memory)

### useRef: Changes Do NOT Trigger Re-renders

```js
function Component() {
  const timerRef = useRef(null);

  const startTimer = () => {
    // Changing ref.current does NOT cause re-render
    timerRef.current = setInterval(() => {
      console.log("Timer running...");
    }, 1000);
  };

  const stopTimer = () => {
    // Clearing ref.current does NOT cause re-render
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
    </div>
  );
}
```

## Why useRef Doesn't Cause Re-renders

React uses `Object.is()` to compare state values:

```js
// useState internal check:
if (Object.is(prevState, newState)) {
  return; // Skip re-render
}
// Different value → Re-render
```

**useRef is different:**

- `useRef` returns the **same object reference** on every render
- Only the `.current` property changes, not the ref object itself
- React doesn't track `.current` changes for re-rendering

```js
function Component() {
  const ref1 = useRef(0);
  const ref2 = useRef(0);

  // ref1 === ref2 is FALSE (different objects)
  // But ref1 === ref1 is TRUE across renders (same reference)

  useEffect(() => {
    console.log("Render");
    ref1.current += 1; // Changes .current, but ref1 object is same
  });

  // Component re-renders for other reasons, but ref1 object reference stays same
}
```

## Common Use Cases for useRef

### 1. Storing Mutable Values Without Re-renders

```js
function Component() {
  const renderCount = useRef(0);
  const previousValue = useRef(null);

  useEffect(() => {
    renderCount.current += 1; // Track renders without causing re-renders
  });

  const [value, setValue] = useState(0);

  useEffect(() => {
    previousValue.current = value; // Store previous value
  }, [value]);

  return <div>Rendered {renderCount.current} times</div>;
}
```

### 2. DOM References

```js
function Component() {
  const inputRef = useRef(null);

  const focusInput = () => {
    // Accessing DOM element doesn't cause re-render
    inputRef.current?.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}
```

### 3. Storing Previous Values

```js
function Component() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef();

  useEffect(() => {
    prevCountRef.current = count; // Store previous value
  });

  const prevCount = prevCountRef.current;

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### 4. Timer/Interval IDs

```js
function Component() {
  const intervalRef = useRef(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      console.log("Tick");
    }, 1000);
  };

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      stopInterval();
    };
  }, []);

  return (
    <div>
      <button onClick={startInterval}>Start</button>
      <button onClick={stopInterval}>Stop</button>
    </div>
  );
}
```

## Important Notes

### ⚠️ useRef Changes Are Not Reflected in UI

```js
function Component() {
  const countRef = useRef(0);

  return (
    <div>
      <p>Count: {countRef.current}</p> {/* Always shows 0! */}
      <button
        onClick={() => {
          countRef.current += 1;
          console.log(countRef.current); // Logs: 1, 2, 3...
          // But UI doesn't update!
        }}
      >
        Increment
      </button>
    </div>
  );
}
```

**Why?** Because changing `ref.current` doesn't trigger a re-render, so React doesn't re-execute the render function to show the new value.

### ✅ When to Use useRef vs useState

**Use `useRef` when:**

- You need to store a value that persists across renders
- The value change shouldn't trigger a re-render
- You need to access DOM elements
- You need to store previous values
- You need to store timer/interval IDs

**Use `useState` when:**

- The value change should trigger a re-render
- The UI needs to reflect the value change
- You need React to track the value

## Comparison Table

| Feature                       | useState                          | useRef             |
| ----------------------------- | --------------------------------- | ------------------ |
| Triggers re-render on change  | ✅ Yes                            | ❌ No              |
| Value persists across renders | ✅ Yes                            | ✅ Yes             |
| UI updates when value changes | ✅ Yes                            | ❌ No              |
| Comparison method             | `Object.is()`                     | N/A (not compared) |
| Use for UI state              | ✅ Yes                            | ❌ No              |
| Use for DOM refs              | ❌ No                             | ✅ Yes             |
| Use for mutable values        | ⚠️ Possible but causes re-renders | ✅ Yes             |

## Summary

- **useRef does NOT cause re-renders** when `.current` changes
- **useRef returns a stable object reference** across renders
- **Only `.current` property changes**, not the ref object itself
- **Use useRef** for values that shouldn't trigger re-renders (DOM refs, timers, previous values)
- **Use useState** for values that should trigger re-renders (UI state)
