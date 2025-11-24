# State Management: When to Use What

## TL;DR

- **Local State** (useState): Default choice, component-specific
- **Context API**: Avoid prop drilling, infrequent updates
- **Redux**: Complex state, frequent updates, need devtools
- Start simple, add complexity only when needed

## Decision Tree

```
Is the state needed by only one component?
├─ YES → Use Local State (useState/useReducer)
└─ NO → Is it shared by a few nearby components?
    ├─ YES → Lift state up or use Context
    └─ NO → Is it truly global and complex?
        ├─ YES → Consider Redux/Zustand
        └─ NO → Use Context API
```

## Comparison Table

| Feature           | Local State     | Context     | Redux        |
| ----------------- | --------------- | ----------- | ------------ |
| Complexity        | Low             | Medium      | High         |
| Learning Curve    | Easy            | Easy        | Steep        |
| Performance       | Best            | Good        | Good         |
| DevTools          | Basic           | Basic       | Excellent    |
| Middleware        | No              | No          | Yes          |
| Time-Travel Debug | No              | No          | Yes          |
| Best For          | Component state | Theme, Auth | Complex apps |

## Use Cases by Tool

### 1. Local State (useState/useReducer)

✅ **Use for:**

```jsx
// Form inputs
const [email, setEmail] = useState("");

// Toggles
const [isOpen, setIsOpen] = useState(false);

// Lists (component-specific)
const [todos, setTodos] = useState([]);

// UI state
const [activeTab, setActiveTab] = useState("home");
```

❌ **Don't use for:**

- Data needed across many components
- Global app settings
- User session data

### 2. Context API

✅ **Use for:**

```jsx
// Theme
<ThemeContext.Provider value={{ theme, setTheme }}>

// Authentication
<AuthContext.Provider value={{ user, login, logout }}>

// Language
<LanguageContext.Provider value={{ language, t }}>

// Feature Flags
<FeaturesContext.Provider value={features}>
```

❌ **Don't use for:**

- Frequently changing data (causes many re-renders)
- Complex state with many actions
- Need for time-travel debugging

### 3. Redux

✅ **Use for:**

```js
// Complex shopping cart
dispatch(addToCart(product));
dispatch(updateQuantity(id, quantity));
dispatch(applyDiscount(code));

// User data with many operations
dispatch(fetchUser(id));
dispatch(updateProfile(data));
dispatch(updatePreferences(prefs));

// Complex filters
dispatch(setFilter("category", "electronics"));
dispatch(setPriceRange(0, 1000));
dispatch(setSortBy("price"));
```

❌ **Don't use for:**

- Simple apps
- Mostly local state
- When learning React (adds complexity)

## Real-World Examples

### Example 1: E-Commerce App

```jsx
// ✅ Local State
function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1); // Local to card
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div>
      <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      <button onClick={() => setShowDetails(!showDetails)}>Details</button>
    </div>
  );
}

// ✅ Context
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ Redux
function ShoppingCart() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div>
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdate={(qty) => dispatch(updateQuantity(item.id, qty))}
          onRemove={() => dispatch(removeItem(item.id))}
        />
      ))}
    </div>
  );
}
```

### Example 2: Dashboard App

```jsx
// ✅ Local State - Widget state
function Widget() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(60);

  return <div>{/* widget UI */}</div>;
}

// ✅ Context - User auth
function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Login />;
  return <DashboardLayout />;
}

// ✅ Redux - Dashboard data
function DataGrid() {
  const data = useSelector((state) => state.dashboard.data);
  const filters = useSelector((state) => state.dashboard.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(filters));
  }, [filters]);

  return <Grid data={data} />;
}
```

## Migration Path

### Start Simple → Add Complexity

```jsx
// Phase 1: Local State
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  return <Dashboard user={user} theme={theme} />;
}

// Phase 2: Add Context (prop drilling becomes painful)
function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Dashboard />
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Phase 3: Add Redux (state becomes complex)
function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}
```

## Common Interview Questions

### Q1: Should I always use Redux for global state?

**Answer:** No! Context is often sufficient. Only use Redux when you need:

- Complex state logic
- Time-travel debugging
- Middleware
- Redux DevTools features

### Q2: Can I use Context and Redux together?

**Answer:** Yes! Common pattern:

- **Context**: Theme, auth, language (infrequent changes)
- **Redux**: App data, complex state (frequent changes)

### Q3: How do I decide between useReducer and Redux?

**Answer:**

- **useReducer**: Component or section-level state
- **Redux**: Global state shared across entire app

### Q4: Is Context slow for frequently changing data?

**Answer:** Yes! Every context change re-renders all consumers. Solutions:

- Split contexts
- Use Redux for frequent updates
- Use specialized libraries (Zustand, Jotai)

## Performance Considerations

### Context Performance

```jsx
// ❌ BAD - Everything in one context
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [cart, setCart] = useState([]);

  // Theme change re-renders ALL consumers!
  return (
    <AppContext.Provider value={{ user, theme, cart }}>
      {children}
    </AppContext.Provider>
  );
}

// ✅ GOOD - Split contexts
function AppProviders({ children }) {
  return (
    <UserProvider>
      <ThemeProvider>
        <CartProvider>{children}</CartProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
```

### Redux Performance

```jsx
// ✅ Select only what you need
function Component() {
  const userName = useSelector((state) => state.user.name); // Only re-renders on name change

  // ❌ Don't select entire state
  const state = useSelector((state) => state); // Re-renders on ANY change
}
```

## Best Practices

1. **Start with local state** - don't premature optimize
2. **Lift state when needed** - to common parent
3. **Use Context for globals** - theme, auth, i18n
4. **Add Redux only if needed** - complex apps
5. **Profile before optimizing** - measure actual problems
6. **Keep state normalized** - avoid deep nesting
7. **Colocate state** - keep it close to where it's used

## Quick Reference

```
Component needs state?
├─ Only this component?
│  └─ useState / useReducer
│
├─ Few nearby components?
│  └─ Lift state up
│
├─ Many distant components?
│  ├─ Changes infrequently? (theme, auth)
│  │  └─ Context API
│  │
│  └─ Changes frequently? (cart, filters)
│     └─ Redux / Zustand
```

## Related Concepts

- **Prop Drilling**: Problem solved by Context/Redux
- **State Colocation**: Keep state close to usage
- **State Lifting**: Move state to common parent
- **Global State**: App-wide state management
