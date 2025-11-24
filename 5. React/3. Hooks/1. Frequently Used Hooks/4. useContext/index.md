# `useContext` Hook

## TL;DR
- Reads value from React Context
- Avoids prop drilling (passing props through many levels)
- Component re-renders when context value changes
- Must be used with `createContext` and `Provider`
- Always provide a default value to `createContext`

## What is `useContext`?

`useContext` is a Hook that lets you read and subscribe to context from your component. Context provides a way to pass data through the component tree without having to pass props down manually at every level.

## Basic Setup

### Step 1: Create Context

```jsx
import { createContext } from 'react';

// Create context with default value
const ThemeContext = createContext('light'); // default: 'light'
```

### Step 2: Provide Context Value

```jsx
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

### Step 3: Consume Context with `useContext`

```jsx
import { useContext } from 'react';

function ThemedButton() {
  const theme = useContext(ThemeContext);
  
  return (
    <button className={theme}>
      I'm styled with {theme} theme
    </button>
  );
}
```

## Complete Example: Theme Switching

```jsx
import { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext(null);

// 2. Create Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Create Custom Hook (optional but recommended)
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

// 4. Use in Components
function Header() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <header style={{ background: theme === 'light' ? '#fff' : '#333' }}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Toggle to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
    </header>
  );
}

function Content() {
  const { theme } = useTheme();
  
  return (
    <div style={{ color: theme === 'light' ? '#000' : '#fff' }}>
      Content here
    </div>
  );
}

// 5. Wrap App
function App() {
  return (
    <ThemeProvider>
      <Header />
      <Content />
    </ThemeProvider>
  );
}
```

## Common Patterns

### 1. Authentication Context

```jsx
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in
    checkAuth().then(userData => {
      setUser(userData);
      setLoading(false);
    });
  }, []);
  
  const login = async (email, password) => {
    const userData = await loginAPI(email, password);
    setUser(userData);
  };
  
  const logout = () => {
    setUser(null);
    logoutAPI();
  };
  
  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

// Usage
function ProfilePage() {
  const { user, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 2. Multi-Language Support (i18n)

```jsx
const LanguageContext = createContext(null);

function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  
  const translations = {
    en: {
      welcome: 'Welcome',
      goodbye: 'Goodbye'
    },
    es: {
      welcome: 'Bienvenido',
      goodbye: 'Adiós'
    }
  };
  
  const t = (key) => translations[language][key] || key;
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

function useLanguage() {
  return useContext(LanguageContext);
}

// Usage
function Greeting() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}
```

### 3. Shopping Cart Context

```jsx
const CartContext = createContext(null);

function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  
  const addItem = (product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  
  const removeItem = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, quantity) => {
    setItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    total,
    itemCount: items.length
  };
  
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// Usage
function CartIcon() {
  const { itemCount } = useCart();
  return <div>🛒 {itemCount}</div>;
}

function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <div>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}
```

## Multiple Contexts

You can use multiple contexts in the same component:

```jsx
function Component() {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const language = useContext(LanguageContext);
  
  return <div>Using all three contexts</div>;
}

// Nesting providers
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <MainApp />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
```

## Performance Optimization

### Problem: Context changes cause all consumers to re-render

```jsx
const UserContext = createContext(null);

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  // ❌ PROBLEM: Changing theme re-renders all consumers
  const value = { user, setUser, theme, setTheme };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

### Solution 1: Split Contexts

```jsx
const UserContext = createContext(null);
const ThemeContext = createContext(null);

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}

// Now components only re-render when their specific context changes
function UserProfile() {
  const { user } = useContext(UserContext); // Only re-renders on user change
  return <div>{user?.name}</div>;
}

function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext); // Only re-renders on theme change
  return <button onClick={() => setTheme('dark')}>{theme}</button>;
}
```

### Solution 2: Memoize Context Value

```jsx
function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  
  // ✅ Memoize to prevent unnecessary re-renders
  const value = useMemo(() => ({ user, setUser }), [user]);
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

### Solution 3: Use React.memo for Consumers

```jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent() {
  const { theme } = useContext(ThemeContext);
  return <div>{/* expensive render */}</div>;
});
```

## Common Interview Questions

### Q1: What's the difference between Context and Props?

**Answer:**
- **Props**: Explicit, passed down through component tree, type-safe
- **Context**: Implicit, available anywhere in tree below Provider, can cause unexpected re-renders

Use props by default, Context for truly global data (theme, auth, language).

### Q2: When does a component using useContext re-render?

**Answer:** Component re-renders when:
1. Context value changes (referential equality check)
2. Parent component re-renders (normal React behavior)

```jsx
// This creates new object every render → all consumers re-render
<Context.Provider value={{ user, theme }}>

// This only changes when dependencies change
const value = useMemo(() => ({ user, theme }), [user, theme]);
<Context.Provider value={value}>
```

### Q3: Can you update context value from a consumer?

**Answer:** Yes, pass update functions through context:

```jsx
const CountContext = createContext(null);

function CountProvider({ children }) {
  const [count, setCount] = useState(0);
  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}

function Counter() {
  const { count, setCount } = useContext(CountContext);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Q4: What happens if no Provider exists?

**Answer:** `useContext` returns the default value passed to `createContext`:

```jsx
const ThemeContext = createContext('light'); // Default value

function Component() {
  const theme = useContext(ThemeContext); // Returns 'light' if no Provider
  return <div>{theme}</div>;
}
```

### Q5: Context vs Redux - when to use which?

**Answer:**
- **Context**: Built-in, simple, good for infrequent updates (theme, auth)
- **Redux**: Advanced features (middleware, devtools, time-travel), frequent updates, complex state

## Common Pitfalls & Gotchas

### 1. **Creating New Object Every Render**

```jsx
// ❌ WRONG - new object every render
function Provider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// ✅ CORRECT - memoize value
function Provider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
```

### 2. **Forgetting Error Handling**

```jsx
// ❌ WRONG - no error if used outside Provider
function useTheme() {
  return useContext(ThemeContext);
}

// ✅ CORRECT - helpful error message
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === null) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### 3. **Context Hell (Too Many Providers)**

```jsx
// ❌ WRONG - hard to maintain
<Provider1>
  <Provider2>
    <Provider3>
      <Provider4>
        <Provider5>
          <App />
        </Provider5>
      </Provider4>
    </Provider3>
  </Provider2>
</Provider1>

// ✅ BETTER - compose providers
function AppProviders({ children }) {
  return (
    <Provider1>
      <Provider2>
        <Provider3>
          {children}
        </Provider3>
      </Provider2>
    </Provider1>
  );
}

<AppProviders>
  <App />
</AppProviders>
```

## Best Practices

1. **Create custom hooks** for each context (`useAuth`, `useTheme`)
2. **Memoize context values** to prevent unnecessary re-renders
3. **Split contexts** by concern (don't put everything in one)
4. **Add error handling** for usage outside Provider
5. **Provide meaningful defaults** to `createContext`
6. **Keep context values simple** - avoid deeply nested objects

## When to Use `useContext`

✅ **Use for:**
- Theme/styling
- User authentication
- Language/i18n
- Global UI state (modals, notifications)
- Feature flags

❌ **Don't use for:**
- Frequently changing data (performance issues)
- Complex state logic (use Redux/Zustand)
- Prop drilling one level (just pass props)

## Related Concepts

- **Context API**: The underlying React feature
- **useReducer**: Often used with Context for complex state
- **Redux/Zustand**: Alternative state management solutions
- **React.memo**: Optimize context consumers



