# Local State Management

## TL;DR

- State contained within a single component
- Use `useState` or `useReducer`
- Doesn't affect other components
- Simplest form of state management
- Prefer local state when possible

## What is Local State?

Local state is state that belongs to a single component and doesn't need to be shared with other components. It's the most basic form of state management in React.

## When to Use Local State

✅ **Use for:**

- Form input values
- Toggle states (open/closed, show/hide)
- Local UI state (hover, focus)
- Component-specific data
- Temporary data

## Basic Patterns

### 1. Simple Boolean State

```jsx
function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      {isOpen && <div>Dropdown content</div>}
    </div>
  );
}
```

### 2. Form Input State

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### 3. List State

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Lifting State Up

When two components need to share state, lift it to their common parent:

```jsx
// ❌ BEFORE - separate state
function ComponentA() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}

function ComponentB() {
  const [value, setValue] = useState(""); // Duplicate!
  return <div>{value}</div>;
}

// ✅ AFTER - lifted to parent
function Parent() {
  const [value, setValue] = useState("");

  return (
    <>
      <ComponentA value={value} onChange={setValue} />
      <ComponentB value={value} />
    </>
  );
}

function ComponentA({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

function ComponentB({ value }) {
  return <div>{value}</div>;
}
```

## Best Practices

1. **Keep state as local as possible** - don't lift prematurely
2. **Co-locate related state** - use objects for related values
3. **Use `useReducer` for complex state** - multiple related values
4. **Derive values instead of storing** - avoid redundant state
5. **Initialize state properly** - use lazy initialization for expensive computations

## Related Concepts

- **Global State**: Shared across app (Context, Redux)
- **Lifting State Up**: Moving state to parent
- **useState/useReducer**: Local state hooks
