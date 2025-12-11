# Render Props Pattern

## TL;DR
- **Render Props** = Pass a function as a prop that returns JSX
- **Pattern:** Component calls the function with data, function returns what to render
- **Use case:** Share logic between components while giving control over rendering
- **Modern alternative:** Custom Hooks (preferred)
- **Common prop names:** `render`, `children` (as function)
- **Key benefit:** Inversion of control - caller decides what to render
- **Legacy pattern:** Still asked in interviews, but Hooks are preferred

---

## 1. What is the Render Props Pattern?

The **Render Props pattern** is a technique for sharing code between components using a prop whose value is a function that returns React elements.

### Basic Concept

```jsx
<Component render={(data) => <div>{data}</div>} />
```

The component calls `this.props.render(data)` and renders whatever the function returns.

---

### Simple Example

```jsx
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (e) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {/* Call render prop with data */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage
<MouseTracker render={({ x, y }) => (
  <h1>Mouse position: ({x}, {y})</h1>
)} />
```

---

## 2. Why Use Render Props?

### Problem: Sharing Logic Without Render Props

```jsx
// ❌ Without render props: Logic tied to specific UI
class MousePosition extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (e) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        <h1>Mouse: ({this.state.x}, {this.state.y})</h1>
      </div>
    );
  }
}
```

**Problem:** Can't reuse the mouse tracking logic with different UI.

---

### Solution: With Render Props

```jsx
// ✅ With render props: Logic decoupled from UI
class Mouse extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (e) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Usage 1: Display as text
<Mouse render={({ x, y }) => (
  <h1>Mouse: ({x}, {y})</h1>
)} />

// Usage 2: Display as circle
<Mouse render={({ x, y }) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: 'red',
    }}
  />
)} />
```

**Benefit:** Same logic, different UIs!

---

## 3. Children as a Function

A common variation uses `children` as the render prop:

```jsx
class DataFetcher extends React.Component {
  state = { data: null, loading: true };

  componentDidMount() {
    fetch(this.props.url)
      .then(res => res.json())
      .then(data => this.setState({ data, loading: false }));
  }

  render() {
    return this.props.children(this.state);
  }
}

// Usage
<DataFetcher url="/api/users">
  {({ data, loading }) => (
    loading ? <div>Loading...</div> : <UserList users={data} />
  )}
</DataFetcher>
```

**Advantage:** More idiomatic JSX syntax.

---

## 4. Real-World Examples

### Example 1: Data Fetching

```jsx
class FetchData extends React.Component {
  state = { data: null, loading: true, error: null };

  componentDidMount() {
    fetch(this.props.url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => this.setState({ data, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  }

  render() {
    return this.props.children(this.state);
  }
}

// Usage
function UserProfile({ userId }) {
  return (
    <FetchData url={`/api/users/${userId}`}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <Error message={error.message} />;
        return <UserCard user={data} />;
      }}
    </FetchData>
  );
}
```

---

### Example 2: Authentication

```jsx
class Auth extends React.Component {
  state = { user: null, loading: true };

  componentDidMount() {
    authService.getCurrentUser()
      .then(user => this.setState({ user, loading: false }))
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    return this.props.children(this.state);
  }
}

// Usage
<Auth>
  {({ user, loading }) => (
    loading ? <LoadingPage /> :
    user ? <Dashboard user={user} /> :
    <LoginPage />
  )}
</Auth>
```

---

### Example 3: Toggle State

```jsx
class Toggle extends React.Component {
  state = { on: false };

  toggle = () => {
    this.setState(prevState => ({ on: !prevState.on }));
  };

  render() {
    return this.props.children({
      on: this.state.on,
      toggle: this.toggle,
    });
  }
}

// Usage
<Toggle>
  {({ on, toggle }) => (
    <div>
      <button onClick={toggle}>
        {on ? 'Turn Off' : 'Turn On'}
      </button>
      {on && <div>Content is visible!</div>}
    </div>
  )}
</Toggle>
```

---

### Example 4: Form Management

```jsx
class Form extends React.Component {
  state = { values: {}, errors: {} };

  handleChange = (name, value) => {
    this.setState(prevState => ({
      values: { ...prevState.values, [name]: value },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.values);
  };

  render() {
    return this.props.children({
      values: this.state.values,
      errors: this.state.errors,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
    });
  }
}

// Usage
<Form onSubmit={handleLogin}>
  {({ values, handleChange, handleSubmit }) => (
    <form onSubmit={handleSubmit}>
      <input
        value={values.email || ''}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <input
        type="password"
        value={values.password || ''}
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  )}
</Form>
```

---

## 5. Render Props with Functional Components

Render props work with functional components too:

```jsx
function Mouse({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div onMouseMove={handleMouseMove}>
      {render(position)}
    </div>
  );
}

// Usage
<Mouse render={({ x, y }) => (
  <h1>Mouse: ({x}, {y})</h1>
)} />
```

---

## 6. Render Props vs HOCs

### HOC Approach

```jsx
function withMouse(Component) {
  return class extends React.Component {
    state = { x: 0, y: 0 };

    handleMouseMove = (e) => {
      this.setState({ x: e.clientX, y: e.clientY });
    };

    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <Component {...this.props} mouse={this.state} />
        </div>
      );
    }
  };
}

// Usage
const ComponentWithMouse = withMouse(MyComponent);
```

---

### Render Props Approach

```jsx
class Mouse extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (e) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}

// Usage
<Mouse>
  {(mouse) => <MyComponent mouse={mouse} />}
</Mouse>
```

---

### Comparison

| Feature | HOCs | Render Props |
|---------|------|--------------|
| **Syntax** | Wrapper function | Component with function prop |
| **Composition** | Can be confusing (wrapper hell) | Explicit in JSX |
| **Naming collisions** | Possible | Explicit param names |
| **Static methods** | Lost (need hoisting) | Not an issue |
| **Ref forwarding** | Needs `forwardRef` | Direct access |
| **Visibility in DevTools** | Extra wrapper components | Clearer hierarchy |

---

## 7. Render Props vs Custom Hooks

**Modern React:** Custom Hooks are preferred over render props for most use cases.

### Render Props Approach

```jsx
<Mouse>
  {({ x, y }) => (
    <div>Mouse: ({x}, {y})</div>
  )}
</Mouse>
```

---

### Custom Hook Approach (Preferred)

```jsx
function useMouse() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
}

// Usage
function Component() {
  const { x, y } = useMouse();
  return <div>Mouse: ({x}, {y})</div>;
}
```

**Advantages of Hooks:**
- Simpler syntax
- No extra nesting
- Easier composition
- Better performance (no extra components)
- More readable

---

### When to Still Use Render Props

Use render props when you need to:
- Wrap rendered content with elements (e.g., Portal, ErrorBoundary)
- Control rendering conditionally
- Add event listeners to wrapper
- Work with class components (no Hooks)

---

## 8. Advanced Patterns

### Pattern 1: Compound Render Props

```jsx
class Tabs extends React.Component {
  state = { activeTab: 0 };

  render() {
    return this.props.children({
      activeTab: this.state.activeTab,
      setActiveTab: (index) => this.setState({ activeTab: index }),
    });
  }
}

// Usage
<Tabs>
  {({ activeTab, setActiveTab }) => (
    <div>
      <button onClick={() => setActiveTab(0)}>Tab 1</button>
      <button onClick={() => setActiveTab(1)}>Tab 2</button>
      
      {activeTab === 0 && <div>Content 1</div>}
      {activeTab === 1 && <div>Content 2</div>}
    </div>
  )}
</Tabs>
```

---

### Pattern 2: Multiple Render Props

```jsx
class DataProvider extends React.Component {
  state = { data: null, loading: true, error: null };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    // ... fetch logic
  };

  render() {
    const { renderLoading, renderError, renderData } = this.props;

    if (this.state.loading) {
      return renderLoading();
    }

    if (this.state.error) {
      return renderError(this.state.error);
    }

    return renderData(this.state.data);
  }
}

// Usage
<DataProvider
  url="/api/users"
  renderLoading={() => <Spinner />}
  renderError={(error) => <ErrorMessage error={error} />}
  renderData={(data) => <UserList users={data} />}
/>
```

---

## 9. Performance Considerations

### Issue: Inline Functions

```jsx
// ❌ BAD: Creates new function on every render
class App extends React.Component {
  render() {
    return (
      <Mouse>
        {({ x, y }) => <div>Mouse: ({x}, {y})</div>}
      </Mouse>
    );
  }
}
```

**Problem:** New function prop causes Mouse to re-render even if parent doesn't change.

---

### Solution: Extract Function

```jsx
// ✅ GOOD: Stable function reference
class App extends React.Component {
  renderMouse = ({ x, y }) => {
    return <div>Mouse: ({x}, {y})</div>;
  };

  render() {
    return <Mouse>{this.renderMouse}</Mouse>;
  }
}
```

---

## 10. Interview Questions

### Q1: What is the Render Props pattern?

**Answer:** Render Props is a pattern where a component receives a function as a prop, calls it with data, and renders whatever the function returns. It's a way to share logic while letting the caller control rendering.

```jsx
<Component render={(data) => <div>{data}</div>} />
```

---

### Q2: Why use Render Props?

**Answer:** Render Props allow you to:
- Share logic between components
- Decouple logic from presentation
- Give caller control over what to render
- Avoid HOC wrapper hell
- Make data flow explicit

---

### Q3: What's the difference between render props and HOCs?

**Answer:**

**Render Props:**
- Component with function prop
- Explicit composition in JSX
- No naming collisions
- Clear in DevTools

**HOCs:**
- Function that wraps component
- Implicit composition
- Can cause wrapper hell
- Props might collide

---

### Q4: Can you use children as a render prop?

**Answer:** Yes! It's a common pattern:

```jsx
<Component>
  {(data) => <div>{data}</div>}
</Component>
```

Instead of:

```jsx
<Component render={(data) => <div>{data}</div>} />
```

---

### Q5: Should you use render props or Hooks in modern React?

**Answer:** **Custom Hooks are preferred** in modern React because they:
- Have simpler syntax
- Avoid extra nesting
- Are easier to compose
- Perform better
- Are more readable

**Use render props** only when you need wrapper elements or work with class components.

---

### Q6: What are the performance concerns with render props?

**Answer:** Inline render functions create new references on every render, causing unnecessary re-renders. Solution: Extract the function or use `useCallback`.

---

### Q7: Can you use render props with functional components?

**Answer:** Yes! Render props work with both class and functional components:

```jsx
function Mouse({ render }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return <div>{render(pos)}</div>;
}
```

---

### Q8: What's a real-world use case for render props?

**Answer:** Common use cases:
- Data fetching with loading states
- Authentication wrappers
- Form management
- Mouse/touch tracking
- Toggling visibility
- Viewport detection

---

### Q9: Is render props deprecated?

**Answer:** No, but it's considered a **legacy pattern**. Custom Hooks are the modern, preferred alternative. Render props still work and are useful in specific scenarios.

---

### Q10: How do render props compare to Context API?

**Answer:**

**Render Props:**
- Explicit data flow
- Local state sharing
- More flexible rendering

**Context:**
- Implicit data flow
- Global state sharing
- Simpler for deeply nested components

Use Context for app-wide state, render props for localized logic sharing.

---

## Summary: Render Props Checklist

When using render props:

- ✅ Understand it passes a function that returns JSX
- ✅ Know it shares logic while controlling rendering
- ✅ Use children as function for cleaner syntax
- ✅ Extract render functions to avoid performance issues
- ✅ Prefer Custom Hooks in modern React
- ✅ Use only when Hooks aren't suitable
- ✅ Understand differences from HOCs and Hooks

Your render props knowledge is interview-ready when you can explain:

1. What render props are (function prop that returns JSX)
2. Why they're useful (share logic, control rendering)
3. When to use them (class components, wrapper elements)
4. How they compare to HOCs and Hooks
5. Performance considerations (inline functions)
6. Modern alternatives (Custom Hooks preferred)
7. Real-world use cases



