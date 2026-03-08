# `useReducer` Hook

## TL;DR

- Alternative to useState for complex state logic
- Similar to Redux pattern (state + action → new state)
- Takes reducer function and initial state
- Returns `[state, dispatch]`
- Better for complex state transitions and related state values

## What is `useReducer`?

`useReducer` is a React Hook that lets you add a reducer to your component. It's an alternative to `useState` that's better suited for complex state logic, especially when:

- Next state depends on previous state
- Multiple related state values
- Complex state transitions

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

## Basic Syntax

```jsx
// 1. Define reducer function
function reducer(state, action) {
  switch (action.type) {
    case "ACTION_TYPE":
      return { ...state /* new state */ };
    default:
      return state;
  }
}

// 2. Use in component
function Component() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 3. Dispatch actions
  dispatch({ type: "ACTION_TYPE", payload: data });

  return <div>{state.value}</div>;
}
```

## useState vs useReducer

### Simple State - Use useState

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </div>
  );
}
```

### Complex State - Use useReducer

```jsx
function Counter() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "increment":
          return { count: state.count + 1 };
        case "decrement":
          return { count: state.count - 1 };
        case "reset":
          return { count: 0 };
        default:
          return state;
      }
    },
    { count: 0 }
  );

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
```

## Real-World Examples

### Example 1: Form State Management

```jsx
const initialState = {
  username: "",
  email: "",
  password: "",
  errors: {},
  isSubmitting: false,
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: "" }, // Clear error
      };

    case "SET_ERROR":
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };

    case "SET_ERRORS":
      return {
        ...state,
        errors: action.errors,
      };

    case "SUBMIT_START":
      return {
        ...state,
        isSubmitting: true,
        errors: {},
      };

    case "SUBMIT_SUCCESS":
      return initialState; // Reset form

    case "SUBMIT_ERROR":
      return {
        ...state,
        isSubmitting: false,
        errors: action.errors,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function RegistrationForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field) => (e) => {
    dispatch({ type: "SET_FIELD", field, value: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const errors = {};
    if (!state.username) errors.username = "Required";
    if (!state.email) errors.email = "Required";
    if (state.password.length < 6) errors.password = "Min 6 characters";

    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    // Submit
    dispatch({ type: "SUBMIT_START" });
    try {
      await api.register(state.username, state.email, state.password);
      dispatch({ type: "SUBMIT_SUCCESS" });
      alert("Registration successful!");
    } catch (error) {
      dispatch({ type: "SUBMIT_ERROR", errors: { form: error.message } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={state.username}
        onChange={handleChange("username")}
        placeholder="Username"
      />
      {state.errors.username && <span>{state.errors.username}</span>}

      <input
        value={state.email}
        onChange={handleChange("email")}
        placeholder="Email"
      />
      {state.errors.email && <span>{state.errors.email}</span>}

      <input
        type="password"
        value={state.password}
        onChange={handleChange("password")}
        placeholder="Password"
      />
      {state.errors.password && <span>{state.errors.password}</span>}

      {state.errors.form && <div className="error">{state.errors.form}</div>}

      <button type="submit" disabled={state.isSubmitting}>
        {state.isSubmitting ? "Submitting..." : "Register"}
      </button>

      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </form>
  );
}
```

### Example 2: Shopping Cart

```jsx
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existing = state.items.find((item) => item.id === action.item.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id ? { ...item, quantity: action.quantity } : item
        ),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "APPLY_DISCOUNT":
      return {
        ...state,
        discount: action.discount,
      };

    default:
      return state;
  }
};

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    discount: 0,
  });

  const subtotal = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * (state.discount / 100);
  const total = subtotal - discountAmount;

  return (
    <div>
      <h2>Shopping Cart</h2>
      {state.items.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <span>${item.price}</span>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_QUANTITY",
                id: item.id,
                quantity: parseInt(e.target.value),
              })
            }
          />
          <button
            onClick={() => dispatch({ type: "REMOVE_ITEM", id: item.id })}
          >
            Remove
          </button>
        </div>
      ))}

      <div>
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Discount: -${discountAmount.toFixed(2)}</p>
        <p>Total: ${total.toFixed(2)}</p>
      </div>

      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
        Clear Cart
      </button>
    </div>
  );
}
```

### Example 3: Data Fetching with Multiple States

```jsx
const fetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: null,
      };

    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null,
      };

    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case "REFRESH":
      return {
        ...state,
        loading: true,
        error: null,
      };

    default:
      return state;
  }
};

function UserList() {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    dispatch({ type: "FETCH_START" });

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "FETCH_SUCCESS", data }))
      .catch((error) =>
        dispatch({ type: "FETCH_ERROR", error: error.message })
      );
  }, []);

  const handleRefresh = () => {
    dispatch({ type: "REFRESH" });
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "FETCH_SUCCESS", data }))
      .catch((error) =>
        dispatch({ type: "FETCH_ERROR", error: error.message })
      );
  };

  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      <ul>
        {state.data?.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Example 4: Todo App with Filters

```jsx
const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.text, completed: false },
        ],
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: action.filter,
      };

    case "CLEAR_COMPLETED":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };

    default:
      return state;
  }
};

function TodoApp() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
    filter: "all", // 'all' | 'active' | 'completed'
  });

  const [input, setInput] = useState("");

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch({ type: "ADD_TODO", text: input });
      setInput("");
    }
  };

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add todo..."
        />
        <button type="submit">Add</button>
      </form>

      <div>
        <button onClick={() => dispatch({ type: "SET_FILTER", filter: "all" })}>
          All
        </button>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", filter: "active" })}
        >
          Active
        </button>
        <button
          onClick={() => dispatch({ type: "SET_FILTER", filter: "completed" })}
        >
          Completed
        </button>
        <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
          Clear Completed
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => dispatch({ type: "DELETE_TODO", id: todo.id })}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Lazy Initialization

For expensive initial state:

```jsx
function init(initialCount) {
  // Expensive computation
  return { count: initialCount };
}

function Counter({ initialCount }) {
  // init runs only once
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return <div>{state.count}</div>;
}
```

## useReducer with Context

Combine for global state management:

```jsx
const TodoContext = createContext(null);

function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within TodoProvider");
  }
  return context;
}

// Usage
function TodoList() {
  const { state, dispatch } = useTodos();

  return (
    <ul>
      {state.todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

## Common Interview Questions

### Q1: When should I use useReducer instead of useState?

**Answer:**

- **useState**: Simple, independent state values
- **useReducer**: Complex state logic, related state values, multiple state transitions

### Q2: Can dispatch cause re-renders?

**Answer:** Yes, like setState. But React uses `Object.is` comparison - same state object means no re-render.

```jsx
// No re-render if state doesn't change
function reducer(state, action) {
  if (action.type === "NO_OP") {
    return state; // Same reference, no re-render
  }
  return { ...state }; // New object, re-render
}
```

### Q3: Is dispatch stable across renders?

**Answer:** Yes! `dispatch` identity is stable, like `setState` from useState.

```jsx
// Safe to use in useEffect without dependency
useEffect(() => {
  dispatch({ type: "SOME_ACTION" });
}, []); // dispatch never changes
```

### Q4: Can I have multiple reducers?

**Answer:** Yes! Use multiple useReducer calls or combine reducers:

```jsx
// Multiple reducers
const [userState, userDispatch] = useReducer(userReducer, userInitialState);
const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);

// Combined reducer
function rootReducer(state, action) {
  return {
    user: userReducer(state.user, action),
    cart: cartReducer(state.cart, action),
  };
}
```

### Q5: useReducer vs Redux?

**Answer:**

- **useReducer**: Built-in, component-level, simpler
- **Redux**: Global, middleware, devtools, more features

Use useReducer for component state, Redux for complex global state.

## Common Pitfalls & Gotchas

### 1. **Mutating State**

```jsx
// ❌ WRONG - mutating state
function reducer(state, action) {
  state.count++; // Mutation!
  return state; // Same reference, no re-render
}

// ✅ CORRECT - return new object
function reducer(state, action) {
  return { ...state, count: state.count + 1 };
}
```

### 2. **Not Handling Default Case**

```jsx
// ❌ WRONG - no default
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    // Missing default!
  }
}

// ✅ CORRECT
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    default:
      return state; // Always return state
  }
}
```

### 3. **Complex Logic in Component**

```jsx
// ❌ WRONG - logic in component
function Component() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAction = () => {
    // Complex logic here
    const newValue = /* ... */;
    dispatch({ type: 'UPDATE', value: newValue });
  };
}

// ✅ CORRECT - logic in reducer
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE':
      // Complex logic here
      const newValue = /* ... */;
      return { ...state, value: newValue };
  }
}
```

## Best Practices

1. **Keep reducer pure** - no side effects
2. **Use action types as constants** - avoid typos
3. **Include payload in actions** - `{ type, payload }`
4. **Return new object** - never mutate state
5. **Handle default case** - always return state
6. **Combine with Context** for global state
7. **Use TypeScript** - type safety for actions

## When to Use `useReducer`

✅ **Use when:**

- Complex state logic with multiple sub-values
- Next state depends on previous state
- Multiple related state values
- Complex state transitions
- Need centralized state update logic

❌ **Don't use when:**

- Simple state (single value)
- Independent state values
- No complex transitions
- Just learning React (start with useState)

## Related Concepts

- **useState**: Simpler alternative
- **Context API**: Combine for global state
- **Redux**: Similar pattern, more features
- **Immer**: Library for easier immutable updates
