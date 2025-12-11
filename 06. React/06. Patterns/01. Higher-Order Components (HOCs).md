# Higher-Order Components (HOCs)

## TL;DR
- **HOC** = Function that takes a component and returns a new enhanced component
- **Pattern:** `const EnhancedComponent = higherOrderComponent(WrappedComponent)`
- **Not a component** - It's a function that creates components
- **Use case:** Code reuse, logic sharing, prop manipulation, state abstraction
- **Modern alternative:** Custom Hooks (preferred in most cases)
- **Common HOCs:** `withAuth`, `withLoading`, `withLogger`, `withRouter`
- **Convention:** Prefix with `with` (e.g., `withAuth`)
- **Important:** Don't mutate original component, create new one

---

## 1. What is a Higher-Order Component?

A **Higher-Order Component (HOC)** is an advanced pattern in React for reusing component logic. It's a function that takes a component and returns a new component with additional props or behavior.

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

**Not a React feature** - It's a pattern that emerges from React's compositional nature.

### The Concept

Think of HOCs like decorators in other languages - they "wrap" a component to enhance it.

```jsx
// HOC Definition
function withExtraInfo(Component) {
  return function EnhancedComponent(props) {
    return <Component {...props} extraInfo="Hello from HOC!" />;
  };
}

// Usage
const RegularButton = ({ label, extraInfo }) => (
  <button>{label} - {extraInfo}</button>
);

const EnhancedButton = withExtraInfo(RegularButton);

// Renders: <button>Click Me - Hello from HOC!</button>
<EnhancedButton label="Click Me" />
```

---

## 2. Basic HOC Pattern

### Simple Example

```jsx
// HOC that adds a timestamp prop
function withTimestamp(WrappedComponent) {
  return function EnhancedComponent(props) {
    const timestamp = new Date().toLocaleString();
    
    return <WrappedComponent {...props} timestamp={timestamp} />;
  };
}

// Original Component
function UserProfile({ name, timestamp }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Loaded at: {timestamp}</p>
    </div>
  );
}

// Enhanced Component
const UserProfileWithTimestamp = withTimestamp(UserProfile);

// Usage
<UserProfileWithTimestamp name="John Doe" />
```

---

### Arrow Function Syntax

```jsx
const withTimestamp = (WrappedComponent) => (props) => {
  const timestamp = new Date().toLocaleString();
  return <WrappedComponent {...props} timestamp={timestamp} />;
};
```

---

## 3. Common Use Cases

### Use Case 1: Authentication (withAuth)

```jsx
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Check authentication
      checkAuth()
        .then(authenticated => {
          setIsAuthenticated(authenticated);
          setIsLoading(false);
        });
    }, []);

    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage
function Dashboard() {
  return <h1>Dashboard - Protected Content</h1>;
}

const ProtectedDashboard = withAuth(Dashboard);

// In App
<Route path="/dashboard" element={<ProtectedDashboard />} />
```

---

### Use Case 2: Loading State (withLoading)

```jsx
function withLoading(WrappedComponent, loadingMessage = "Loading...") {
  return function LoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div className="loading">
          <Spinner />
          <p>{loadingMessage}</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage
function UserList({ users }) {
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList, "Loading users...");

// In parent component
<UserListWithLoading users={users} isLoading={loading} />
```

---

### Use Case 3: Data Fetching (withData)

```jsx
function withData(WrappedComponent, fetchDataFn) {
  return function DataComponent(props) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchDataFn()
        .then(result => {
          setData(result);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <WrappedComponent {...props} data={data} />;
  };
}

// Usage
function UserList({ data }) {
  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

const UserListWithData = withData(UserList, () => 
  fetch('/api/users').then(res => res.json())
);

// Renders with data automatically fetched
<UserListWithData />
```

---

### Use Case 4: Logging (withLogger)

```jsx
function withLogger(WrappedComponent, componentName) {
  return function LoggerComponent(props) {
    useEffect(() => {
      console.log(`[${componentName}] Mounted with props:`, props);
      
      return () => {
        console.log(`[${componentName}] Unmounted`);
      };
    }, [props]);

    useEffect(() => {
      console.log(`[${componentName}] Props updated:`, props);
    });

    return <WrappedComponent {...props} />;
  };
}

// Usage
function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}

const ButtonWithLogger = withLogger(Button, "Button");

// Now logs every mount, unmount, and prop change
<ButtonWithLogger label="Click Me" onClick={handleClick} />
```

---

### Use Case 5: Theming (withTheme)

```jsx
function withTheme(WrappedComponent) {
  return function ThemedComponent(props) {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
      <WrappedComponent
        {...props}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  };
}

// Usage
function Card({ title, content, theme, toggleTheme }) {
  return (
    <div className={`card ${theme}`}>
      <h2>{title}</h2>
      <p>{content}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

const ThemedCard = withTheme(Card);

<ThemedCard title="Hello" content="Card content" />
```

---

## 4. HOC with Parameters

HOCs can accept configuration parameters:

```jsx
function withPermission(requiredPermission) {
  return function (WrappedComponent) {
    return function PermissionComponent(props) {
      const { user } = useContext(UserContext);

      if (!user.permissions.includes(requiredPermission)) {
        return <div>Access Denied</div>;
      }

      return <WrappedComponent {...props} />;
    };
  };
}

// Usage
const AdminPanel = ({ data }) => <div>Admin Panel: {data}</div>;

const ProtectedAdminPanel = withPermission('admin')(AdminPanel);

// Or with multiple permissions
const withAdminPermission = withPermission('admin');
const withModeratorPermission = withPermission('moderator');

const AdminPanel1 = withAdminPermission(Panel);
const ModeratorPanel = withModeratorPermission(Panel);
```

---

## 5. Composing Multiple HOCs

You can apply multiple HOCs to a single component:

```jsx
// Method 1: Manual composition
const EnhancedComponent = withAuth(withLoading(withLogger(MyComponent)));

// Method 2: Using compose utility
import { compose } from 'redux'; // or create your own

const enhance = compose(
  withAuth,
  withLoading,
  withLogger
);

const EnhancedComponent = enhance(MyComponent);

// Custom compose function
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
```

### Real-World Example

```jsx
function AdminDashboard({ user, data, isLoading }) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.name}</p>
      <DataTable data={data} />
    </div>
  );
}

// Apply multiple enhancements
const EnhancedDashboard = compose(
  withAuth,
  withData(fetchDashboardData),
  withLoading,
  withLogger('AdminDashboard')
)(AdminDashboard);
```

---

## 6. Forwarding Refs

HOCs don't automatically forward refs. Use `React.forwardRef`:

```jsx
function withLogging(WrappedComponent) {
  class WithLogging extends React.Component {
    componentDidMount() {
      console.log('Component mounted');
    }

    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  // Forward ref
  return React.forwardRef((props, ref) => {
    return <WithLogging {...props} forwardedRef={ref} />;
  });
}

// Usage
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="fancy-button">
    {props.children}
  </button>
));

const FancyButtonWithLogging = withLogging(FancyButton);

// Can now use ref
const ref = useRef();
<FancyButtonWithLogging ref={ref}>Click Me</FancyButtonWithLogging>
```

---

## 7. Preserving Static Methods

HOCs don't copy static methods. You must copy them manually:

```jsx
function withAnalytics(WrappedComponent) {
  class WithAnalytics extends React.Component {
    componentDidMount() {
      trackPageView(WrappedComponent.name);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  // Copy static methods
  WithAnalytics.displayName = `WithAnalytics(${getDisplayName(WrappedComponent)})`;
  
  // Use hoist-non-react-statics library
  // hoistNonReactStatics(WithAnalytics, WrappedComponent);

  return WithAnalytics;
}

// Helper function for display name
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

---

## 8. Best Practices

### ✅ DO: Pass Unrelated Props

```jsx
function withExtraInfo(WrappedComponent) {
  return function (props) {
    return <WrappedComponent {...props} extraInfo="data" />;
  };
}
```

### ✅ DO: Maximize Composability

```jsx
// Good: HOC returns a component
function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    // ...
    return <WrappedComponent {...props} />;
  };
}
```

### ✅ DO: Set Display Name

```jsx
function withAuth(WrappedComponent) {
  function WithAuth(props) {
    // ...
  }

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  return WithAuth;
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}
```

### ❌ DON'T: Mutate Original Component

```jsx
// ❌ BAD: Modifies original component
function withAuth(WrappedComponent) {
  WrappedComponent.prototype.componentDidMount = function() {
    // This mutates the original component!
  };
  return WrappedComponent;
}

// ✅ GOOD: Returns new component
function withAuth(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      // ...
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
```

### ❌ DON'T: Use HOCs Inside render()

```jsx
// ❌ BAD: Creates new component on every render
function MyComponent() {
  const EnhancedComponent = withAuth(Button); // Never do this!
  return <EnhancedComponent />;
}

// ✅ GOOD: Define outside
const EnhancedButton = withAuth(Button);

function MyComponent() {
  return <EnhancedButton />;
}
```

---

## 9. HOCs vs Custom Hooks

**Modern React (post-Hooks) prefers Custom Hooks over HOCs** for most use cases.

### HOC Approach

```jsx
function withUser(WrappedComponent) {
  return function UserComponent(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
      fetchUser().then(setUser);
    }, []);

    return <WrappedComponent {...props} user={user} />;
  };
}

const ProfileWithUser = withUser(Profile);
```

### Custom Hook Approach (Preferred)

```jsx
function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  return user;
}

function Profile() {
  const user = useUser(); // Simpler, more readable
  return <div>{user?.name}</div>;
}
```

### When to Use Each

**Use HOCs when:**
- You need to wrap the component visually (add wrapper elements)
- You're working with class components
- You need to manipulate component lifecycle
- You want to conditionally render different components

**Use Hooks when:**
- You only need to share stateful logic
- Working with functional components
- You want cleaner, more readable code
- You need to share logic between multiple hooks

---

## 10. Real-World Examples

### Example 1: Error Boundary HOC

```jsx
function withErrorBoundary(WrappedComponent, FallbackComponent) {
  return class extends React.Component {
    state = { hasError: false, error: null };

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Error caught by HOC:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return FallbackComponent ? (
          <FallbackComponent error={this.state.error} />
        ) : (
          <div>Something went wrong</div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}

// Usage
const SafeUserProfile = withErrorBoundary(UserProfile, ErrorFallback);
```

---

### Example 2: Analytics HOC

```jsx
function withAnalytics(WrappedComponent, eventName) {
  return function AnalyticsComponent(props) {
    useEffect(() => {
      // Track page view
      analytics.track(eventName, {
        component: WrappedComponent.name,
        timestamp: Date.now(),
      });
    }, []);

    const handleClick = (e) => {
      analytics.track(`${eventName}_click`, {
        element: e.target.tagName,
      });
    };

    return (
      <div onClick={handleClick}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// Usage
const TrackedDashboard = withAnalytics(Dashboard, 'dashboard_view');
```

---

### Example 3: Responsive HOC

```jsx
function withResponsive(WrappedComponent) {
  return function ResponsiveComponent(props) {
    const [isMobile, setIsMobile] = useState(
      window.innerWidth < 768
    );

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
      <WrappedComponent
        {...props}
        isMobile={isMobile}
        isTablet={window.innerWidth >= 768 && window.innerWidth < 1024}
        isDesktop={window.innerWidth >= 1024}
      />
    );
  };
}

// Usage
function Layout({ isMobile, isDesktop, children }) {
  return (
    <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
      {children}
    </div>
  );
}

const ResponsiveLayout = withResponsive(Layout);
```

---

## 11. Interview Questions

### Q1: What is a Higher-Order Component?

**Answer:** A Higher-Order Component (HOC) is a function that takes a component and returns a new enhanced component. It's a pattern for reusing component logic.

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

---

### Q2: When should you use HOCs?

**Answer:** Use HOCs when you need to:
- Reuse component logic across multiple components
- Add wrapper elements or conditional rendering
- Work with class components (can't use Hooks)
- Abstract state or lifecycle logic

However, **Custom Hooks are preferred** in modern React (React 16.8+) for most cases.

---

### Q3: What are the limitations of HOCs?

**Answer:**
1. **Wrapper Hell**: Multiple HOCs create nested components
2. **Naming Collisions**: Props from different HOCs might conflict
3. **Refs Not Forwarded**: Need `forwardRef` to pass refs
4. **Static Methods Lost**: Must manually copy static methods
5. **Less Readable**: Harder to trace data flow than Hooks

---

### Q4: How do you pass refs through an HOC?

**Answer:** Use `React.forwardRef`:

```jsx
function withLogging(Component) {
  class WithLogging extends React.Component {
    render() {
      const { forwardedRef, ...rest } = this.props;
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => (
    <WithLogging {...props} forwardedRef={ref} />
  ));
}
```

---

### Q5: What's wrong with using HOCs inside render()?

**Answer:** Creates a new component on every render, causing:
- Entire subtree unmounts and remounts
- State is lost
- Performance issues

```jsx
// ❌ BAD
render() {
  const EnhancedComponent = withAuth(MyComponent);
  return <EnhancedComponent />;
}

// ✅ GOOD
const EnhancedComponent = withAuth(MyComponent);
render() {
  return <EnhancedComponent />;
}
```

---

### Q6: How do you compose multiple HOCs?

**Answer:** Use a `compose` utility or apply manually:

```jsx
// Manual
const Enhanced = withAuth(withLoading(withData(Component)));

// Using compose (right to left)
const enhance = compose(withAuth, withLoading, withData);
const Enhanced = enhance(Component);
```

---

### Q7: HOCs vs Render Props vs Hooks - which to use?

**Answer:**

| Pattern | Use When | Modern Preference |
|---------|----------|-------------------|
| **HOCs** | Need wrapper elements, class components | ⚠️ Legacy |
| **Render Props** | Need to control rendering logic | ⚠️ Legacy |
| **Hooks** | Share stateful logic | ✅ Preferred |

**Modern approach**: Use Custom Hooks for logic sharing, compose components naturally.

---

### Q8: How do you preserve display name in HOCs?

**Answer:**

```jsx
function withAuth(WrappedComponent) {
  function WithAuth(props) {
    // ...
  }

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;
  return WithAuth;
}

function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}
```

---

### Q9: Can HOCs modify props?

**Answer:** Yes, HOCs can add, remove, or transform props:

```jsx
function withUpperCase(Component) {
  return function (props) {
    const upperProps = {
      ...props,
      text: props.text?.toUpperCase(),
    };
    return <Component {...upperProps} />;
  };
}
```

---

### Q10: What's the difference between HOC and Container Component?

**Answer:**

**HOC**: Function that takes a component and returns enhanced component
**Container Component**: Component that handles logic and passes data to presentational components

HOCs are a **pattern**, Container Components are an **architecture**.

---

## 12. Common Pitfalls

### 1. Mutating the Original Component

```jsx
// ❌ BAD
function withAuth(WrappedComponent) {
  WrappedComponent.prototype.componentDidMount = function() {/* ... */};
  return WrappedComponent; // Mutated!
}
```

### 2. Props Name Collision

```jsx
// ❌ BAD: Both HOCs add 'data' prop
const Enhanced = withUser(withPosts(Component));
// Which 'data' wins?
```

### 3. Not Passing Through Props

```jsx
// ❌ BAD: Doesn't pass through unrelated props
function withAuth(Component) {
  return function (props) {
    return <Component isAuth={true} />; // Lost other props!
  };
}

// ✅ GOOD
function withAuth(Component) {
  return function (props) {
    return <Component {...props} isAuth={true} />;
  };
}
```

---

## Summary: HOC Checklist

When creating HOCs, ensure you:

- ✅ Return a new component (don't mutate original)
- ✅ Pass through unrelated props (`{...props}`)
- ✅ Set display name for debugging
- ✅ Don't use HOC inside render()
- ✅ Forward refs if needed
- ✅ Consider Custom Hooks as alternative
- ✅ Compose HOCs outside components
- ✅ Copy static methods if needed

Your HOC knowledge is interview-ready when you can explain:

1. What HOCs are (functions returning enhanced components)
2. When to use them vs Hooks
3. Common use cases (auth, loading, data fetching)
4. Limitations and pitfalls
5. How to compose multiple HOCs
6. Why Custom Hooks are preferred in modern React
7. How to forward refs through HOCs



