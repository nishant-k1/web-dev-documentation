# React.memo and Memoization

## TL;DR

- `React.memo` prevents re-renders if props haven't changed
- Use with `useMemo` and `useCallback` for complete optimization
- Don't over-optimize - profile first
- Shallow comparison of props by default
- Can provide custom comparison function

## What is React.memo?

`React.memo` is a Higher Order Component that memoizes a component. It only re-renders if props change.

```jsx
const MemoizedComponent = React.memo(Component);
```

## Basic Usage

### Without React.memo

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <Child name="John" />
    </div>
  );
}

function Child({ name }) {
  console.log("Child rendered"); // Logs on every Parent render!
  return <div>{name}</div>;
}
```

### With React.memo

```jsx
const Child = React.memo(function Child({ name }) {
  console.log("Child rendered"); // Only logs when name changes!
  return <div>{name}</div>;
});
```

## Complete Optimization Pattern

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  // ✅ Memoize callback
  const handleAdd = useCallback((todo) => {
    setTodos((prev) => [...prev, todo]);
  }, []);

  // ✅ Memoize complex data
  const sortedTodos = useMemo(() => {
    return todos.sort((a, b) => a.priority - b.priority);
  }, [todos]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <TodoList todos={sortedTodos} onAdd={handleAdd} />
    </div>
  );
}

// ✅ Memoize component
const TodoList = React.memo(function TodoList({ todos, onAdd }) {
  console.log("TodoList rendered");
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
});
```

## Real-World Examples

### 1. Expensive List Item

```jsx
const ListItem = React.memo(function ListItem({ item, onDelete }) {
  console.log("Rendering item:", item.id);

  return (
    <div className="list-item">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
});

function List({ items }) {
  const handleDelete = useCallback((id) => {
    // delete logic
  }, []);

  return (
    <div>
      {items.map((item) => (
        <ListItem key={item.id} item={item} onDelete={handleDelete} />
      ))}
    </div>
  );
}
```

### 2. Complex Component with Multiple Props

```jsx
const UserCard = React.memo(function UserCard({ user, onUpdate, theme }) {
  console.log("UserCard rendered");

  return (
    <div className={`card ${theme}`}>
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => onUpdate(user.id)}>Update</button>
    </div>
  );
});

function Dashboard() {
  const [users, setUsers] = useState([]);
  const theme = useContext(ThemeContext);

  const handleUpdate = useCallback((id) => {
    // update logic
  }, []);

  return (
    <div>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onUpdate={handleUpdate}
          theme={theme}
        />
      ))}
    </div>
  );
}
```

### 3. Custom Comparison Function

```jsx
const Chart = React.memo(
  function Chart({ data, width, height }) {
    // Expensive chart rendering
    return <svg>{/* complex chart */}</svg>;
  },
  (prevProps, nextProps) => {
    // Custom comparison
    return (
      prevProps.width === nextProps.width &&
      prevProps.height === nextProps.height &&
      JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
    );
  }
);
```

## Common Pitfalls

### 1. Inline Functions Break Memoization

```jsx
// ❌ BAD - new function every render
function Parent() {
  return <Child onClick={() => console.log("clicked")} />;
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered"); // Renders every time!
  return <button onClick={onClick}>Click</button>;
});

// ✅ GOOD - memoized function
function Parent() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <Child onClick={handleClick} />;
}
```

### 2. Inline Objects Break Memoization

```jsx
// ❌ BAD - new object every render
function Parent() {
  return <Child style={{ color: "red" }} />;
}

// ✅ GOOD - memoized object
function Parent() {
  const style = useMemo(() => ({ color: "red" }), []);
  return <Child style={style} />;
}
```

### 3. Over-Memoization

```jsx
// ❌ BAD - unnecessary memo for simple component
const SimpleText = React.memo(({ text }) => {
  return <div>{text}</div>;
});

// ✅ GOOD - no memo needed
function SimpleText({ text }) {
  return <div>{text}</div>;
}
```

## When to Use React.memo

✅ **Use when:**

- Component renders often with same props
- Component is expensive to render
- Noticeably impacts performance
- Component is in a list

❌ **Don't use when:**

- Props change frequently
- Component is simple/fast
- No performance problem (premature optimization)
- Every component "just in case"

## Performance Comparison

```jsx
// Measure with React DevTools Profiler

// Before React.memo
// List with 1000 items: 45ms render time
// Changing unrelated state: 45ms (unnecessary render)

// After React.memo + useCallback
// List with 1000 items: 45ms initial render
// Changing unrelated state: 0ms (skipped render) ✅
```

## Testing Memoization

```jsx
import { render, screen } from "@testing-library/react";

test("does not re-render with same props", () => {
  const renderSpy = jest.fn();

  const MemoComponent = React.memo(({ value }) => {
    renderSpy();
    return <div>{value}</div>;
  });

  const { rerender } = render(<MemoComponent value="test" />);

  expect(renderSpy).toHaveBeenCalledTimes(1);

  // Re-render with same props
  rerender(<MemoComponent value="test" />);

  expect(renderSpy).toHaveBeenCalledTimes(1); // Still 1!

  // Re-render with different props
  rerender(<MemoComponent value="new" />);

  expect(renderSpy).toHaveBeenCalledTimes(2); // Now 2
});
```

## Common Interview Questions

### Q1: What's the difference between React.memo and useMemo?

**Answer:**

- **React.memo**: Memoizes entire component
- **useMemo**: Memoizes a value inside component

```jsx
// React.memo - memoize component
const Component = React.memo(function Component({ prop }) {
  return <div>{prop}</div>;
});

// useMemo - memoize value
function Component({ data }) {
  const processed = useMemo(() => process(data), [data]);
  return <div>{processed}</div>;
}
```

### Q2: Does React.memo do deep comparison?

**Answer:** No! Only shallow comparison. For deep comparison, provide custom function:

```jsx
const Component = React.memo(
  MyComponent,
  (prev, next) => _.isEqual(prev, next) // Deep comparison
);
```

### Q3: Should I wrap all components in React.memo?

**Answer:** No! Only use when:

- Profiling shows performance issue
- Component is expensive
- Renders often with same props

### Q4: Can React.memo hurt performance?

**Answer:** Yes, if overused:

- Comparison overhead
- Memory overhead
- Breaks React's natural optimization

## Best Practices

1. **Profile first** - use React DevTools Profiler
2. **Memoize expensive components** - lists, charts, complex UI
3. **Complete the optimization** - memo + useCallback + useMemo
4. **Don't over-optimize** - simple components don't need it
5. **Use custom comparison sparingly** - usually unnecessary
6. **Measure impact** - verify it actually helps

## Debugging Memoization

```jsx
// Add logging to see when component renders
const Component = React.memo(function Component({ value }) {
  console.log("Component rendered with:", value);
  return <div>{value}</div>;
});

// Or use why-did-you-render library
import whyDidYouRender from "@welldone-software/why-did-you-render";

whyDidYouRender(React, {
  trackAllPureComponents: true,
});
```

## Related Concepts

- **useMemo**: Memoize values
- **useCallback**: Memoize functions
- **React DevTools Profiler**: Measure performance
- **Pure Components**: Class component equivalent
