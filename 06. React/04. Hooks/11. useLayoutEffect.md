# `useLayoutEffect` Hook

## TL;DR

- Synchronous version of `useEffect`
- Runs **before** browser paint (blocks painting)
- Use for DOM measurements and mutations
- Same API as useEffect
- Prefer useEffect unless you need synchronous behavior

## What is `useLayoutEffect`?

`useLayoutEffect` has the same signature as `useEffect`, but it fires synchronously **after all DOM mutations but before the browser paints**. This makes it useful for reading layout from the DOM and synchronously re-rendering.

## Execution Timeline

### useEffect (Asynchronous)

```
1. React updates DOM
2. Browser paints screen ✨ (user sees update)
3. useEffect runs
```

### useLayoutEffect (Synchronous)

```
1. React updates DOM
2. useLayoutEffect runs (blocks painting)
3. Browser paints screen ✨ (user sees update)
```

## Syntax

```jsx
useLayoutEffect(() => {
  // DOM measurement or mutation

  return () => {
    // Cleanup
  };
}, [dependencies]);
```

## When to Use useLayoutEffect

### ✅ Use Cases

#### 1. **Measuring DOM Elements**

```jsx
function Tooltip({ targetRef, text }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const rect = targetRef.current.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  }, [targetRef]);

  return (
    <div
      style={{ position: "absolute", top: position.top, left: position.left }}
    >
      {text}
    </div>
  );
}
```

#### 2. **Preventing Visual Flicker**

```jsx
function AnimatedBox() {
  const ref = useRef(null);

  // ❌ useEffect - user sees flicker
  useEffect(() => {
    ref.current.style.transform = "translateX(100px)";
  }, []);

  // ✅ useLayoutEffect - no flicker
  useLayoutEffect(() => {
    ref.current.style.transform = "translateX(100px)";
  }, []);

  return <div ref={ref}>Box</div>;
}
```

#### 3. **Synchronizing with External DOM**

```jsx
function VideoPlayer({ src }) {
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    // Must happen before paint to avoid flicker
    videoRef.current.src = src;
    videoRef.current.load();
  }, [src]);

  return <video ref={videoRef} controls />;
}
```

#### 4. **Scroll Position Restoration**

```jsx
function ScrollableList({ items }) {
  const listRef = useRef(null);
  const [scrollPos, setScrollPos] = useState(0);

  useLayoutEffect(() => {
    // Restore scroll before paint
    listRef.current.scrollTop = scrollPos;
  }, [scrollPos]);

  const handleScroll = () => {
    setScrollPos(listRef.current.scrollTop);
  };

  return (
    <div ref={listRef} onScroll={handleScroll}>
      {items.map((item) => (
        <div key={item.id}>{item.text}</div>
      ))}
    </div>
  );
}
```

### ❌ When NOT to Use

```jsx
// ❌ BAD - blocks painting unnecessarily
useLayoutEffect(() => {
  fetch("/api/data").then(setData);
}, []);

// ✅ GOOD - use useEffect for async operations
useEffect(() => {
  fetch("/api/data").then(setData);
}, []);

// ❌ BAD - simple state updates don't need it
useLayoutEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ GOOD - useEffect is fine
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

## Real-World Example: Tooltip Positioning

```jsx
function SmartTooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef(null);
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    if (isVisible && targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      // Calculate position to keep tooltip on screen
      let top = targetRect.bottom + 8;
      let left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;

      // Adjust if tooltip goes off right edge
      if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 8;
      }

      // Adjust if tooltip goes off left edge
      if (left < 8) {
        left = 8;
      }

      // Show above if no room below
      if (top + tooltipRect.height > window.innerHeight) {
        top = targetRect.top - tooltipRect.height - 8;
      }

      setPosition({ top, left });
    }
  }, [isVisible]);

  return (
    <>
      <div
        ref={targetRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            background: "black",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
          }}
        >
          {content}
        </div>
      )}
    </>
  );
}
```

## Common Interview Questions

### Q1: What's the difference between useEffect and useLayoutEffect?

**Answer:**

- **useEffect**: Runs **after** paint (asynchronous, doesn't block)
- **useLayoutEffect**: Runs **before** paint (synchronous, blocks painting)

Use useLayoutEffect only when you need to read layout or prevent visual flicker.

### Q2: Does useLayoutEffect block rendering?

**Answer:** Yes! It blocks the browser from painting, which can hurt performance. Only use when necessary.

```jsx
// This blocks painting for 1 second - BAD!
useLayoutEffect(() => {
  const start = Date.now();
  while (Date.now() - start < 1000) {} // Blocks!
}, []);
```

### Q3: Can you use useLayoutEffect on the server?

**Answer:** No! It causes warnings because there's no DOM on the server. Use useEffect or check if you're on client:

```jsx
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
```

### Q4: When would you actually need useLayoutEffect?

**Answer:**

- Reading DOM measurements (scrollHeight, getBoundingClientRect)
- Preventing flicker from DOM mutations
- Synchronizing with third-party DOM libraries
- Restoring scroll positions

### Q5: Performance impact of useLayoutEffect?

**Answer:** Blocks painting, so can cause janky UI if effect is slow. Always measure and only use when useEffect causes visual issues.

## Common Pitfalls

### 1. **Using for Async Operations**

```jsx
// ❌ WRONG - blocks paint while fetching
useLayoutEffect(() => {
  fetch("/api").then(setData);
}, []);

// ✅ CORRECT
useEffect(() => {
  fetch("/api").then(setData);
}, []);
```

### 2. **Server-Side Rendering Warning**

```jsx
// ❌ Causes warning in SSR
useLayoutEffect(() => {
  // DOM code
}, []);

// ✅ Safe for SSR
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

useIsomorphicLayoutEffect(() => {
  // DOM code
}, []);
```

### 3. **Blocking Paint with Slow Operations**

```jsx
// ❌ BAD - expensive calculation blocks paint
useLayoutEffect(() => {
  const result = expensiveCalculation(); // Blocks!
  setData(result);
}, []);

// ✅ BETTER - move to useEffect or useMemo
const result = useMemo(() => expensiveCalculation(), []);
```

## Best Practices

1. **Default to useEffect** - only use useLayoutEffect when needed
2. **Keep it fast** - blocking paint hurts performance
3. **Measure layout synchronously** - that's what it's for
4. **Handle SSR** - use isomorphic helper or conditional logic
5. **Profile performance** - verify it actually helps

## Visual Comparison

```jsx
function FlickerDemo() {
  const [show, setShow] = useState(false);
  const ref = useRef(null);

  // Try switching between these:

  // Option 1: useEffect - you'll see flicker
  useEffect(() => {
    if (show) {
      ref.current.style.opacity = "1";
    }
  }, [show]);

  // Option 2: useLayoutEffect - no flicker
  useLayoutEffect(() => {
    if (show) {
      ref.current.style.opacity = "1";
    }
  }, [show]);

  return (
    <>
      <button onClick={() => setShow(true)}>Show</button>
      <div ref={ref} style={{ opacity: 0 }}>
        Content
      </div>
    </>
  );
}
```

## When to Use Which

| Scenario                    | Use             |
| --------------------------- | --------------- |
| Data fetching               | useEffect       |
| Subscriptions               | useEffect       |
| Logging                     | useEffect       |
| DOM measurements            | useLayoutEffect |
| Preventing flicker          | useLayoutEffect |
| Synchronizing with DOM libs | useLayoutEffect |
| Restoring scroll position   | useLayoutEffect |

## Related Concepts

- **useEffect**: Asynchronous alternative (prefer this)
- **useRef**: Often used together for DOM access
- **getBoundingClientRect()**: Common use case
- **React.flushSync**: Force synchronous updates


