# Performance Considerations

## When to Use Optimization Techniques

Not all optimizations are beneficial. Sometimes the cost of comparison exceeds the cost of re-rendering.

## Cost of Re-rendering vs Comparison

### Re-rendering Cost

- **Simple components:** Very cheap (< 1ms)
- **Medium components:** Cheap (1-5ms)
- **Complex components:** Expensive (5-50ms+)
- **Heavy calculations:** Very expensive (50ms+)

### Comparison Cost

- **`Object.is()` (reference check):** Extremely cheap (~0.001ms)
- **`shallowEqual`:** Cheap for small objects (~0.01-0.1ms)
- **`shallowEqual`:** Expensive for large objects (~0.5-5ms)
- **`deepEqual`:** Very expensive (~1-100ms+)

## When React.memo Helps

### ✅ Good Use Cases

**1. Expensive Components**

```js
// ✅ GOOD: Expensive chart component
const ExpensiveChart = React.memo(({ data, title }) => {
  // Heavy computation
  const processedData = processLargeDataset(data);
  return <ComplexChart data={processedData} title={title} />;
});
```

**2. Frequently Rendered with Same Props**

```js
// ✅ GOOD: List item rendered many times
const ListItem = React.memo(({ id, name, email }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
});

function List({ items }) {
  return items.map(item => <ListItem key={item.id} {...item} />);
}
```

**3. Stable Props (Primitives or Memoized)**

```js
// ✅ GOOD: Props are primitives
const UserCard = React.memo(({ name, age, email }) => {
  return <div>{name} - {age} - {email}</div>;
});
```

### ❌ Bad Use Cases

**1. Simple Components**

```js
// ❌ BAD: Too simple, comparison cost > render cost
const SimpleText = React.memo(({ text }) => {
  return <p>{text}</p>;
});
```

**2. Props Always Change**

```js
// ❌ BAD: Props change every render anyway
const Timer = React.memo(({ timestamp }) => {
  return <div>{timestamp}</div>;
});

// Used like:
<Timer timestamp={Date.now()} /> // New value every render
```

**3. Unstable Object Props**

```js
// ❌ BAD: New object every render, memo is useless
const UserCard = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});

// Used like:
<UserCard user={{ name: 'John' }} /> // New object every render
```

## When shallowEqual is Slower Than Re-rendering

### Small Objects (Fast shallowEqual)

```js
const props = { name: 'John', age: 30 };
// shallowEqual cost: ~0.01ms
// Re-render cost: ~0.1ms
// ✅ shallowEqual is faster
```

### Large Objects (Slow shallowEqual)

```js
const props = {
  user: { /* 1000 properties */ },
  config: { /* 500 properties */ },
  data: { /* 2000 properties */ }
};
// shallowEqual cost: ~5ms (checks all first-level properties)
// Re-render cost: ~2ms (if component is simple)
// ❌ shallowEqual is slower!
```

### Solution: Don't Use React.memo for Large Objects

```js
// ❌ BAD: Large object props
const Component = React.memo(({ largeData }) => {
  return <div>{largeData.summary}</div>;
});

// ✅ BETTER: Extract needed values
const Component = React.memo(({ summary }) => {
  return <div>{summary}</div>;
});
```

## When useMemo/useCallback Help

### ✅ Good Use Cases

**1. Expensive Calculations**

```js
// ✅ GOOD: Expensive calculation
const sortedItems = useMemo(() => {
  return largeArray.sort(complexSortFunction);
}, [largeArray]);
```

**2. Stable References for React.memo**

```js
// ✅ GOOD: Stable reference for memoized child
const user = useMemo(() => ({ name: 'John' }), []);
const Child = React.memo(({ user }) => <div>{user.name}</div>);
<Child user={user} />
```

**3. Preventing Effect Re-runs**

```js
// ✅ GOOD: Stable config prevents unnecessary effects
const config = useMemo(() => ({ theme: 'dark' }), []);
useEffect(() => {
  fetchData(config);
}, [config]);
```

### ❌ Bad Use Cases

**1. Simple Calculations**

```js
// ❌ BAD: Calculation is cheaper than memoization
const sum = useMemo(() => a + b, [a, b]);
// Just do: const sum = a + b;
```

**2. Without React.memo**

```js
// ❌ BAD: useMemo without React.memo (no benefit)
const user = useMemo(() => ({ name: 'John' }), []);
const Child = ({ user }) => <div>{user.name}</div>; // Not memoized
<Child user={user} />
```

## Performance Measurement

### Using React DevTools Profiler

```js
// Measure component render time
function Component() {
  console.time('Component render');
  // ... component code
  console.timeEnd('Component render');
}
```

### Using Performance API

```js
function Component() {
  useEffect(() => {
    const start = performance.now();
    // ... operation
    const end = performance.now();
    console.log(`Operation took ${end - start}ms`);
  });
}
```

## Optimization Guidelines

### Rule of Thumb

1. **Measure first** - Don't optimize without measuring
2. **Optimize bottlenecks** - Focus on slow parts
3. **Avoid premature optimization** - Simple code first
4. **Test with real data** - Use realistic scenarios

### Decision Tree

```
Is component expensive to render?
├─ NO → Don't use React.memo
└─ YES → Does it receive stable props?
    ├─ NO → Fix props first (useMemo/useCallback)
    └─ YES → Use React.memo ✅
```

## Common Performance Mistakes

### ❌ Mistake 1: Over-optimization

```js
// ❌ BAD: Memoizing everything
const SimpleText = React.memo(({ text }) => <p>{text}</p>);
const SimpleButton = React.memo(({ onClick }) => <button onClick={onClick}>Click</button>);
// These are too simple to benefit from memoization
```

### ❌ Mistake 2: Unstable Memo Dependencies

```js
// ❌ BAD: Dependency changes every render
const user = useMemo(() => ({ name: 'John' }), [someValue]);
// If someValue changes every render, memo is useless
```

### ❌ Mistake 3: Memoizing Without Need

```js
// ❌ BAD: Component never re-renders anyway
const StaticComponent = React.memo(() => {
  return <div>Static content</div>;
});
// Parent never changes, so memo provides no benefit
```

## Performance Best Practices

### ✅ Practice 1: Profile Before Optimizing

```js
// Use React DevTools Profiler to identify slow components
// Only optimize components that actually cause performance issues
```

### ✅ Practice 2: Optimize at the Right Level

```js
// ✅ GOOD: Optimize expensive child
const ExpensiveChild = React.memo(({ data }) => {
  // Expensive rendering
});

// ❌ BAD: Optimize simple parent
const SimpleParent = React.memo(() => {
  return <ExpensiveChild data={data} />;
});
```

### ✅ Practice 3: Use React.memo with Stable Props

```js
// ✅ GOOD: Stable primitive props
const UserCard = React.memo(({ name, age }) => {
  return <div>{name} - {age}</div>;
});

// ✅ GOOD: Stable memoized object props
const user = useMemo(() => ({ name: 'John', age: 30 }), []);
const UserCard = React.memo(({ user }) => {
  return <div>{user.name}</div>;
});
```

## Summary

- **Measure before optimizing** - Use React DevTools Profiler
- **Optimize expensive components** - Not simple ones
- **Ensure stable props** - Use useMemo/useCallback if needed
- **Avoid over-optimization** - Simple code is often fast enough
- **shallowEqual can be slower** - For large objects, comparison cost > render cost
- **useMemo/useCallback help** - When used with React.memo or for expensive calculations
- **Focus on bottlenecks** - Optimize the slowest parts first

