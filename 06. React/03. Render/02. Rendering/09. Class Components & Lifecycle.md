# Class Components & Lifecycle Methods

## TL;DR
- **Class Components** = Legacy pattern (pre-Hooks)
- **Modern React:** Functional components + Hooks (preferred)
- **Lifecycle Methods:** Special methods that run at different stages
- **3 Phases:** Mounting → Updating → Unmounting
- **Key Methods:** `constructor`, `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`
- **Hooks Equivalent:** `useEffect` replaces most lifecycle methods
- **Still Asked in Interviews:** Understanding lifecycle is important for legacy code

---

## 1. What are Class Components?

**Class Components** are ES6 classes that extend `React.Component`. They were the standard way to build React components before Hooks (React 16.8).

###

 Basic Class Component

```jsx
import React, { Component } from 'react';

class Welcome extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

---

### Functional Component (Modern Equivalent)

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

**Modern React:** Functional components + Hooks are preferred.

---

## 2. Component Lifecycle Phases

React class components go through 3 lifecycle phases:

```
┌──────────┐       ┌──────────┐       ┌──────────────┐
│ MOUNTING │  ───→ │ UPDATING │  ───→ │  UNMOUNTING  │
└──────────┘       └──────────┘       └──────────────┘
     ↓                  ↓                      ↓
  Creates           Re-renders             Cleans up
  component         on changes             and removes
```

---

## 3. Mounting Phase

**Mounting:** When a component is created and inserted into the DOM.

### Mounting Lifecycle Methods (in order):

1. **`constructor()`**
2. **`static getDerivedStateFromProps()`**
3. **`render()`**
4. **`componentDidMount()`**

---

### 3.1. constructor()

**Purpose:** Initialize state, bind methods.

```jsx
class Counter extends Component {
  constructor(props) {
    super(props); // MUST call super(props) first

    // Initialize state
    this.state = {
      count: 0,
      user: props.user
    };

    // Bind methods (if not using arrow functions)
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

**Modern Equivalent (Hooks):**

```jsx
function Counter({ user }) {
  const [count, setCount] = useState(0);
  // user is already available as prop

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

---

### 3.2. componentDidMount()

**Purpose:** Runs **once** after the component is rendered for the first time. Perfect for:
- API calls
- Setting up subscriptions
- Manipulating DOM
- Setting up timers

```jsx
class UserProfile extends Component {
  state = { user: null, loading: true };

  componentDidMount() {
    // API call after component mounts
    fetch(`/api/users/${this.props.userId}`)
      .then(res => res.json())
      .then(user => {
        this.setState({ user, loading: false });
      });

    // Set up subscription
    this.subscription = eventEmitter.subscribe('userUpdate', this.handleUpdate);

    // Set up timer
    this.timer = setInterval(() => {
      console.log('Tick');
    }, 1000);
  }

  componentWillUnmount() {
    // Clean up
    this.subscription.unsubscribe();
    clearInterval(this.timer);
  }

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return <div>Hello, {this.state.user.name}</div>;
  }
}
```

**Modern Equivalent (Hooks):**

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // componentDidMount + componentDidUpdate (when userId changes)
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(user => {
        setUser(user);
        setLoading(false);
      });

    const subscription = eventEmitter.subscribe('userUpdate', handleUpdate);
    const timer = setInterval(() => console.log('Tick'), 1000);

    // componentWillUnmount
    return () => {
      subscription.unsubscribe();
      clearInterval(timer);
    };
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;
  return <div>Hello, {user.name}</div>;
}
```

---

## 4. Updating Phase

**Updating:** When a component re-renders due to changes in props or state.

### Updating Lifecycle Methods (in order):

1. **`static getDerivedStateFromProps()`**
2. **`shouldComponentUpdate()`**
3. **`render()`**
4. **`getSnapshotBeforeUpdate()`**
5. **`componentDidUpdate()`**

---

### 4.1. shouldComponentUpdate()

**Purpose:** Optimize performance by preventing unnecessary re-renders.

```jsx
class Counter extends Component {
  state = { count: 0 };

  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if count actually changed
    return nextState.count !== this.state.count;
  }

  render() {
    console.log('Rendering...');
    return <div>Count: {this.state.count}</div>;
  }
}
```

**Modern Equivalent:**

```jsx
// React.memo for functional components
const Counter = React.memo(function Counter({ count }) {
  console.log('Rendering...');
  return <div>Count: {count}</div>;
});

// Or useMemo for expensive computations
function Counter({ count }) {
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(count);
  }, [count]);

  return <div>{expensiveValue}</div>;
}
```

---

### 4.2. componentDidUpdate()

**Purpose:** Runs after the component updates (re-renders). Use for:
- Responding to prop/state changes
- Operating on the DOM after updates
- Network requests based on prop changes

```jsx
class UserProfile extends Component {
  state = { user: null };

  componentDidMount() {
    this.fetchUser(this.props.userId);
  }

  componentDidUpdate(prevProps, prevState) {
    // Fetch new user data if userId prop changed
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId);
    }

    // Log when user changes
    if (prevState.user !== this.state.user) {
      console.log('User changed:', this.state.user);
    }
  }

  fetchUser(userId) {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  render() {
    return <div>{this.state.user?.name}</div>;
  }
}
```

**Modern Equivalent:**

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(user => setUser(user));
  }, [userId]); // Runs when userId changes

  useEffect(() => {
    if (user) {
      console.log('User changed:', user);
    }
  }, [user]); // Runs when user changes

  return <div>{user?.name}</div>;
}
```

---

### 4.3. getSnapshotBeforeUpdate()

**Purpose:** Capture info from DOM before it updates (rare use case).

```jsx
class ChatThread extends Component {
  chatRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // Capture scroll position before update
    if (prevProps.messages.length < this.props.messages.length) {
      const chat = this.chatRef.current;
      return chat.scrollHeight - chat.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // Restore scroll position after update
    if (snapshot !== null) {
      const chat = this.chatRef.current;
      chat.scrollTop = chat.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.chatRef}>
        {this.props.messages.map(msg => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>
    );
  }
}
```

**Modern Equivalent:**

```jsx
function ChatThread({ messages }) {
  const chatRef = useRef();
  const prevMessagesLength = useRef(messages.length);

  useLayoutEffect(() => {
    const chat = chatRef.current;
    
    // If new messages added, maintain scroll position
    if (messages.length > prevMessagesLength.current) {
      const prevScrollHeight = chat.scrollHeight;
      // After render, adjust scroll
      chat.scrollTop = chat.scrollHeight - prevScrollHeight;
    }

    prevMessagesLength.current = messages.length;
  }, [messages]);

  return (
    <div ref={chatRef}>
      {messages.map(msg => (
        <div key={msg.id}>{msg.text}</div>
      ))}
    </div>
  );
}
```

---

## 5. Unmounting Phase

**Unmounting:** When a component is removed from the DOM.

### Unmounting Lifecycle Method:

1. **`componentWillUnmount()`**

---

### 5.1. componentWillUnmount()

**Purpose:** Clean up before component is removed. Use for:
- Canceling network requests
- Removing event listeners
- Clearing timers
- Unsubscribing from subscriptions

```jsx
class Timer extends Component {
  state = { seconds: 0 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  componentWillUnmount() {
    // Clean up timer
    clearInterval(this.interval);

    // Remove event listener
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

    // Cancel pending requests (if using AbortController)
    this.abortController?.abort();
  }

  handleVisibilityChange = () => {
    console.log('Visibility changed');
  };

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}
```

**Modern Equivalent:**

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    const handleVisibilityChange = () => {
      console.log('Visibility changed');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function (runs on unmount)
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return <div>Seconds: {seconds}</div>;
}
```

---

## 6. Static Methods

### 6.1. getDerivedStateFromProps()

**Purpose:** Sync state with props (rare use case, usually not needed).

```jsx
class EmailInput extends Component {
  state = { email: '' };

  static getDerivedStateFromProps(props, state) {
    // Update state when props change
    if (props.email !== state.email) {
      return { email: props.email };
    }
    return null;
  }

  render() {
    return <input value={this.state.email} />;
  }
}
```

**Modern Equivalent:**

```jsx
// Usually just use props directly
function EmailInput({ email }) {
  return <input value={email} />;
}

// If you need local state that syncs with props:
function EmailInput({ email: initialEmail }) {
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  return <input value={email} onChange={(e) => setEmail(e.target.value)} />;
}
```

---

### 6.2. getDerivedStateFromError()

**Purpose:** Error boundary - catch errors in child components.

```jsx
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to service
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong: {this.state.error.message}</div>;
    }

    return this.props.children;
  }
}
```

**Modern Equivalent:** No Hooks equivalent yet! Error Boundaries still require class components.

---

## 7. Complete Lifecycle Example

```jsx
class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null,
    };
    console.log('1. Constructor');
  }

  componentDidMount() {
    console.log('3. componentDidMount');
    this.fetchUser();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('4. componentDidUpdate');
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }

  componentWillUnmount() {
    console.log('5. componentWillUnmount');
    // Cleanup
  }

  fetchUser() {
    this.setState({ loading: true });
    fetch(`/api/users/${this.props.userId}`)
      .then(res => res.json())
      .then(user => this.setState({ user, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    console.log('2. Render');
    const { user, loading, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>Welcome, {user.name}!</div>;
  }
}
```

---

## 8. Lifecycle to Hooks Mapping

| Class Lifecycle | Hooks Equivalent |
|----------------|------------------|
| `constructor()` | `useState()` |
| `componentDidMount()` | `useEffect(() => {}, [])` |
| `componentDidUpdate()` | `useEffect(() => {})` or `useEffect(() => {}, [deps])` |
| `componentWillUnmount()` | `useEffect(() => { return () => {} }, [])` |
| `shouldComponentUpdate()` | `React.memo()`, `useMemo()`, `useCallback()` |
| `getDerivedStateFromProps()` | Update state directly or use `useEffect()` |
| `getSnapshotBeforeUpdate()` | `useLayoutEffect()` + refs |
| `componentDidCatch()` | No equivalent (use class Error Boundary) |

---

## 9. Interview Questions

### Q1: What are the main lifecycle methods?

**Answer:**

**Mounting:**
- `constructor()` - Initialize state
- `componentDidMount()` - Side effects after first render

**Updating:**
- `componentDidUpdate()` - Side effects after re-render
- `shouldComponentUpdate()` - Performance optimization

**Unmounting:**
- `componentWillUnmount()` - Cleanup

---

### Q2: What's the difference between componentDidMount and componentDidUpdate?

**Answer:**

**`componentDidMount()`:**
- Runs **once** after initial render
- Use for initial data fetching, subscriptions

**`componentDidUpdate()`:**
- Runs after **every re-render** (except initial)
- Use for responding to prop/state changes
- Must compare prev props/state to avoid infinite loops

---

### Q3: How do you prevent infinite loops in componentDidUpdate?

**Answer:** Always compare previous props/state before calling `setState()`:

```jsx
componentDidUpdate(prevProps) {
  // ✅ GOOD: Check before setState
  if (prevProps.userId !== this.props.userId) {
    this.fetchUser(this.props.userId);
  }

  // ❌ BAD: Infinite loop!
  // this.setState({ ... });
}
```

---

### Q4: What's the Hooks equivalent of componentDidMount?

**Answer:**

```jsx
useEffect(() => {
  // Code here runs once after mount
  console.log('Mounted');
}, []); // Empty dependency array
```

---

### Q5: What's the Hooks equivalent of componentWillUnmount?

**Answer:**

```jsx
useEffect(() => {
  // Setup
  const subscription = subscribe();

  // Cleanup (runs on unmount)
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

---

### Q6: Why was componentWillMount deprecated?

**Answer:** `componentWillMount()` was removed because:
- Ran before initial render, causing confusion
- Often misused for data fetching (better in `componentDidMount`)
- Caused issues with async rendering (React Fiber)
- Replaced by `componentDidMount()` and `useEffect()`

---

### Q7: Can you use Hooks in class components?

**Answer:** No! Hooks only work in functional components. Class components must use lifecycle methods.

---

### Q8: What's shouldComponentUpdate() used for?

**Answer:** Performance optimization - prevent unnecessary re-renders:

```jsx
shouldComponentUpdate(nextProps, nextState) {
  return nextProps.id !== this.props.id; // Only re-render if id changes
}
```

Modern equivalent: `React.memo()` for functional components.

---

### Q9: When do you still need class components?

**Answer:** Only for **Error Boundaries** - there's no Hooks equivalent for `componentDidCatch()` yet.

---

### Q10: What happens if you forget to call super(props) in constructor?

**Answer:** `this.props` will be `undefined` in the constructor:

```jsx
constructor(props) {
  // ❌ Forgot super(props)
  console.log(this.props); // undefined
}

constructor(props) {
  super(props); // ✅ Now this.props works
  console.log(this.props); // { ... }
}
```

---

## Summary: Class Components Checklist

Understanding class components:

- ✅ Know 3 phases: Mounting, Updating, Unmounting
- ✅ Understand key methods: `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`
- ✅ Map lifecycle methods to Hooks equivalents
- ✅ Know when to still use classes (Error Boundaries)
- ✅ Avoid `componentWillMount` (deprecated)
- ✅ Always call `super(props)` in constructor
- ✅ Avoid infinite loops in `componentDidUpdate`
- ✅ Clean up in `componentWillUnmount`

Your lifecycle knowledge is interview-ready when you can explain:

1. The 3 lifecycle phases
2. Purpose of each major lifecycle method
3. Hooks equivalent for each method
4. When you still need class components (Error Boundaries)
5. How to prevent infinite loops in `componentDidUpdate`
6. Why modern React prefers Hooks over lifecycle methods

