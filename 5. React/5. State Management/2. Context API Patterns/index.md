# Context API Patterns

## TL;DR
- Share state across component tree without prop drilling
- Create with `createContext` + provide with `<Provider>`
- Consume with `useContext` Hook
- Avoid overuse - can cause unnecessary re-renders
- Best for infrequently changing data (theme, auth, language)

## Basic Pattern

```jsx
// 1. Create Context
const ThemeContext = createContext('light');

// 2. Provide Value
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Header />
      <Content />
    </ThemeContext.Provider>
  );
}

// 3. Consume with useContext
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle {theme}
    </button>
  );
}
```

## Advanced Patterns

### 1. Custom Provider Component

```jsx
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication on mount
    checkAuth().then(user => {
      setUser(user);
      setLoading(false);
    });
  }, []);
  
  const login = async (email, password) => {
    const user = await loginAPI(email, password);
    setUser(user);
  };
  
  const logout = () => {
    logoutAPI();
    setUser(null);
  };
  
  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading]
  );
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

### 2. Split Contexts for Performance

```jsx
// ❌ BAD - all consumers re-render on any change
const AppContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  
  return (
    <AppContext.Provider value={{ user, setUser, theme, setTheme, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

// ✅ GOOD - split contexts
const UserContext = createContext();
const ThemeContext = createContext();
const LanguageContext = createContext();

function AppProviders({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <LanguageContext.Provider value={{ language, setLanguage }}>
          {children}
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

### 3. Reducer + Context Pattern

```jsx
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.item]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id)
      };
    case 'CLEAR':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  
  const value = useMemo(() => ({ state, dispatch }), [state]);
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// Usage
function Product({ product }) {
  const { dispatch } = useCart();
  
  return (
    <button onClick={() => dispatch({ type: 'ADD_ITEM', item: product })}>
      Add to Cart
    </button>
  );
}
```

## Performance Optimization

### 1. Memoize Context Value

```jsx
// ❌ BAD - new object every render
function Provider({ children }) {
  const [user, setUser] = useState(null);
  
  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
}

// ✅ GOOD - memoized value
function Provider({ children }) {
  const [user, setUser] = useState(null);
  
  const value = useMemo(() => ({ user, setUser }), [user]);
  
  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
```

### 2. Split State and Dispatch

```jsx
const StateContext = createContext();
const DispatchContext = createContext();

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

// Components only re-render if they use state
function Display() {
  const state = useContext(StateContext); // Re-renders on state change
  return <div>{state.count}</div>;
}

// Components using only dispatch never re-render
function Controls() {
  const dispatch = useContext(DispatchContext); // Never re-renders
  return <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>;
}
```

## Common Interview Questions

### Q1: Context vs Props - when to use which?

**Answer:**
- **Props**: Default choice, explicit, type-safe, easy to trace
- **Context**: When props need to go through many levels (theme, auth, language)

### Q2: Does Context replace Redux?

**Answer:** Depends on needs:
- **Context**: Simple global state, infrequent updates
- **Redux**: Complex state, frequent updates, middleware, devtools

### Q3: How to prevent unnecessary re-renders with Context?

**Answer:**
1. Split contexts by concern
2. Memoize context values
3. Use React.memo on consumers
4. Split state and dispatch contexts

### Q4: Can you have multiple Providers?

**Answer:** Yes! Stack them or compose:

```jsx
<UserProvider>
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
</UserProvider>
```

## When to Use Context

✅ **Good for:**
- Theme/styling
- User authentication
- Language/i18n
- Feature flags
- Global UI state (modals, toasts)

❌ **Not ideal for:**
- Frequently changing data
- Complex state logic
- Performance-critical updates
- Form state

## Related Concepts

- **useReducer**: Often paired with Context
- **Redux**: Alternative for complex state
- **Prop Drilling**: Problem Context solves



