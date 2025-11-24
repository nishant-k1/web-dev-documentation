# `useState` Hook

## TL;DR
- Adds state to functional components
- Returns array: `[currentState, setterFunction]`
- State updates trigger re-renders
- State updates are asynchronous and batched
- Use functional updates when new state depends on previous state

## What is `useState`?

`useState` is a React Hook that lets you add state to functional components. Before Hooks, only class components could have state.

```jsx
const [state, setState] = useState(initialValue);
```

**Returns:**
- `state`: Current state value
- `setState`: Function to update state

## Basic Usage

### Simple State

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

### Multiple State Variables

```jsx
function UserForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);
  
  return (
    <form>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input value={age} onChange={(e) => setAge(Number(e.target.value))} />
    </form>
  );
}
```

### Complex State (Objects/Arrays)

```jsx
function UserProfile() {
  const [user, setUser] = useState({
    name: 'John',
    age: 30,
    email: 'john@example.com'
  });
  
  // ❌ WRONG - mutating state
  const updateName = (newName) => {
    user.name = newName; // Don't do this!
    setUser(user);
  };
  
  // ✅ CORRECT - create new object
  const updateName = (newName) => {
    setUser({ ...user, name: newName });
  };
  
  return <div>{user.name}</div>;
}
```

## Functional Updates

### Why Use Functional Updates?

When new state depends on previous state, use functional updates to avoid stale state issues.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  // ❌ WRONG - May get stale state with rapid updates
  const increment = () => {
    setCount(count + 1);
    setCount(count + 1); // Both use same 'count' value!
    // Result: count increases by 1, not 2
  };
  
  // ✅ CORRECT - Uses latest state
  const increment = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // Result: count increases by 2
  };
  
  return <button onClick={increment}>Count: {count}</button>;
}
```

### Real-World Example: Form Array

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    // ✅ Functional update - safe
    setTodos(prevTodos => [...prevTodos, { id: Date.now(), text }]);
  };
  
  const removeTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => removeTodo(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## Lazy Initialization

For expensive initial state calculations, pass a function to `useState`:

```jsx
// ❌ WRONG - Runs on every render
const [state, setState] = useState(expensiveComputation());

// ✅ CORRECT - Runs only once
const [state, setState] = useState(() => expensiveComputation());
```

**Example:**

```jsx
function DataTable() {
  // This only runs once, not on every render
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('tableData');
    return stored ? JSON.parse(stored) : [];
  });
  
  return <table>{/* render data */}</table>;
}
```

## State Updates are Asynchronous

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
    console.log(count); // ❌ Still shows old value!
    // State hasn't updated yet
  };
  
  // ✅ To see updated value, use useEffect
  useEffect(() => {
    console.log('Count updated:', count);
  }, [count]);
  
  return <button onClick={handleClick}>Count: {count}</button>;
}
```

## State Batching (React 18+)

React automatically batches multiple state updates for performance:

```jsx
function App() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  
  const handleClick = () => {
    // React 18: These are batched together
    // Only 1 re-render happens
    setCount(c => c + 1);
    setFlag(f => !f);
    setCount(c => c + 1);
  };
  
  console.log('Render'); // Logs once per click
  
  return <button onClick={handleClick}>Update</button>;
}
```

## Common Interview Questions

### Q1: What happens if you call `setState` with the same value?

**Answer:** React uses `Object.is()` comparison. If the new value is the same as current, React **skips the re-render** (bailout optimization).

```jsx
const [count, setCount] = useState(0);

setCount(0); // No re-render if count is already 0
```

### Q2: Can you update multiple state variables at once?

**Answer:** You can call multiple `setState` functions, and React will batch them (in React 18+) into a single re-render.

```jsx
setName('John');
setAge(30);
setEmail('john@example.com');
// All batched → 1 re-render
```

### Q3: `useState` vs `useReducer` - when to use which?

**Answer:**
- **useState**: Simple state, independent values
- **useReducer**: Complex state logic, related state values, or when next state depends on previous state in complex ways

### Q4: Why can't we use `useState` conditionally?

**Answer:** React relies on the **order** of Hook calls to match state with the right component. Conditional Hooks break this order.

```jsx
// ❌ WRONG
if (condition) {
  const [count, setCount] = useState(0);
}

// ✅ CORRECT
const [count, setCount] = useState(0);
if (condition) {
  // use count
}
```

## Common Pitfalls & Gotchas

### 1. **Directly Mutating State**

```jsx
// ❌ WRONG
const [user, setUser] = useState({ name: 'John', age: 30 });
user.age = 31; // Mutation!
setUser(user); // React won't detect change

// ✅ CORRECT
setUser({ ...user, age: 31 });
```

### 2. **Stale Closures**

```jsx
function Timer() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(count); // ❌ Always logs 0 (stale closure)
      setCount(count + 1); // ❌ Wrong
    }, 1000);
    
    return () => clearInterval(interval);
  }, []); // Empty dependency array
  
  return <div>{count}</div>;
}

// ✅ CORRECT - Use functional update
setCount(prev => prev + 1);
```

### 3. **State Not Updating Immediately**

```jsx
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // ❌ Still old value
  
  // Use functional update to access latest
  setCount(prev => {
    console.log(prev); // ✅ Latest value
    return prev + 1;
  });
};
```

### 4. **Unnecessary State**

```jsx
// ❌ WRONG - derived value doesn't need state
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState(''); // Redundant!

// ✅ CORRECT - calculate during render
const fullName = `${firstName} ${lastName}`;
```

## Best Practices

1. **Keep state minimal** - derive values when possible
2. **Co-locate related state** - use objects for related data
3. **Use functional updates** when new state depends on old
4. **Initialize expensive state lazily**
5. **Don't store props in state** unless you need to diverge from them

## When to Use `useState`

✅ **Use when:**
- Simple, independent state values
- UI-related state (toggles, form inputs)
- Local component state
- State changes are straightforward

❌ **Don't use when:**
- State is derived from props (calculate instead)
- Complex state transitions (use `useReducer`)
- State needs to be shared (use Context or state management)

## Related Concepts

- **useReducer**: For complex state logic
- **useRef**: For mutable values that don't trigger re-renders
- **Context API**: For sharing state across components
- **React.memo**: Optimize components that use state



