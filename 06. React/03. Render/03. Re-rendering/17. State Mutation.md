# State Mutation in React

State mutation occurs when you directly modify state values instead of creating new ones. React expects immutable state updates.

## Why Mutation is a Problem

React uses **reference equality** (`Object.is()`) to detect state changes. If you mutate an object or array in place, the reference stays the same, so React doesn't detect the change.

```jsx
const [user, setUser] = useState({ name: "John", age: 30 });

// ❌ MUTATION - React won't detect the change
user.name = "Jane"; // Same reference
setUser(user); // React thinks nothing changed → no re-render

// ✅ IMMUTABLE UPDATE - React detects the change
setUser({ ...user, name: "Jane" }); // New reference → re-render
```

## Common Mutation Mistakes

### 1. Post Increment vs Pre-Increment in State Updates

```jsx
const [count, setCount] = useState(0);

// ❌ WRONG - prev++ returns old value and mutates
setCount((prev) => prev++); // Returns 0, mutates prev, state stays 0

// ❌ WRONG - ++prev mutates the parameter
setCount((prev) => ++prev); // Mutates prev, impure function

// ✅ CORRECT - Pure function, no mutation
setCount((prev) => prev + 1); // Returns new value, no mutation
```

**Why it matters:** React state updater functions must be pure and non-mutating. Using `prev++` or `++prev` mutates the parameter and violates React's rules.

### 2. Direct Object Property Mutation

```jsx
// ❌ WRONG
const [state, setState] = useState({ count: 0 });
state.count = 1; // Mutating state
setState(state); // Reference unchanged → no update

// ✅ CORRECT
setState({ ...state, count: 1 }); // New object → update
```

### 3. Array Mutation

```jsx
const [items, setItems] = useState([1, 2, 3]);

// ❌ WRONG - Mutating methods
items.push(4); // Mutates array
setItems(items); // Same reference → no update

items.pop(); // Mutates array
setItems(items); // Same reference → no update

// ✅ CORRECT - Immutable methods
setItems([...items, 4]); // New array → update
setItems(items.filter((_, i) => i !== items.length - 1)); // New array → update
```

### 4. Nested Object Mutation

```jsx
const [state, setState] = useState({
  user: { name: "John", profile: { age: 30 } },
});

// ❌ WRONG
state.user.name = "Jane"; // Nested mutation
setState(state); // Top-level reference unchanged → no update

// ✅ CORRECT - Shallow copy all levels
setState({
  ...state,
  user: {
    ...state.user,
    name: "Jane",
  },
});

// Or update nested property
setState({
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      age: 31,
    },
  },
});
```

### 5. Mutation in State Updater Functions

```jsx
const [items, setItems] = useState([1, 2, 3]);

// ❌ WRONG - Mutating the parameter
setItems((prev) => {
  prev.push(4); // Mutating prev
  return prev; // Same reference → no update
});

// ✅ CORRECT - Return new array
setItems((prev) => [...prev, 4]); // New reference → update
```

### 6. Mutation in Event Handlers

```jsx
const [formData, setFormData] = useState({ name: "", email: "" });

function handleChange(e) {
  // ❌ WRONG
  formData[e.target.name] = e.target.value; // Direct mutation
  setFormData(formData); // Same reference → no update

  // ✅ CORRECT
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
}
```

## Why React Doesn't Detect Mutations

React uses `Object.is()` for comparison:

```jsx
const obj1 = { count: 1 };
const obj2 = obj1; // Same reference
obj2.count = 2; // Mutation

Object.is(obj1, obj2); // true (same reference)
// React thinks nothing changed → no re-render
```

## Impact of Mutation

1. **No Re-render**: Component won't update when state mutates
2. **Stale UI**: UI shows old values despite state changes
3. **Broken Memoization**: `React.memo`, `useMemo`, `useCallback` won't work correctly
4. **Broken Effects**: `useEffect` dependencies won't trigger correctly
5. **Unexpected Behavior**: React DevTools may show stale values

## Best Practices

### 1. Always Create New References

```jsx
// Objects
setState({ ...state, newProp: value });

// Arrays
setState([...items, newItem]);
setState(items.filter((item) => item.id !== id));
setState(items.map((item) => (item.id === id ? updated : item)));

// Nested updates
setState({
  ...state,
  nested: {
    ...state.nested,
    property: newValue,
  },
});
```

### 2. Use Functional Updates for Complex Logic

```jsx
setState((prev) => ({
  ...prev,
  count: prev.count + 1,
}));
```

### 3. Use Libraries for Deep Updates (Optional)

For deeply nested state, consider libraries like `immer`:

```jsx
import { useImmer } from "use-immer";

const [state, updateState] = useImmer({
  user: { profile: { name: "John" } },
});

// Mutation-like syntax that's actually immutable
updateState((draft) => {
  draft.user.profile.name = "Jane"; // Safe mutation with immer
});
```

## Detection in Development

React StrictMode helps catch mutations:

```jsx
<React.StrictMode>
  <App />
</React.StrictMode>
```

In development, React may log warnings when it detects potential mutations.

## Summary

- ❌ Never mutate state directly
- ✅ Always create new objects/arrays
- ✅ Use spread operator (`...`) for shallow copies
- ✅ Copy nested objects at all levels
- ✅ Return new values from updater functions
- ✅ React uses reference equality - mutations won't trigger updates
