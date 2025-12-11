# Props in React

## TL;DR

- **Props** = Properties passed from parent to child component
- Props are **read-only** (immutable) - child cannot modify them
- Props flow **one-way** (parent → child, never child → parent)
- Changing props in parent triggers **re-render** in child
- Props vs State: **Props are external** (from parent), **State is internal** (component's own data)
- Use **destructuring** for cleaner code: `function User({ name, age }) {}`
- **children** is a special prop for nested content

---

## 1. What are Props?

**Props** (short for "properties") are **arguments passed to React components**, just like function parameters.

### Basic Example

```jsx
// Parent component
function App() {
  return <User name="John" age={25} />;
}

// Child component receives props
function User(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Age: {props.age}</p>
    </div>
  );
}
```

**Think of props like function arguments:**

```javascript
// Regular JavaScript function
function greet(name, age) {
  return `Hello ${name}, you are ${age} years old`;
}
greet("John", 25);

// React component (same concept!)
function User(props) {
  return `Hello ${props.name}, you are ${props.age} years old`;
}
<User name="John" age={25} />;
```

---

## 2. How Props Work (Data Flow)

### One-Way Data Flow (Parent → Child)

```jsx
function App() {
  const userName = "Alice";
  const userAge = 30;

  // App passes data DOWN to User
  return <User name={userName} age={userAge} />;
}

function User(props) {
  // User RECEIVES data from App
  return (
    <div>
      {props.name} is {props.age}
    </div>
  );
}
```

**Key Rule:** Data flows **DOWN** the component tree, never up.

```
App (has data)
  ↓ passes props
User (receives data)
  ↓ passes props
Avatar (receives data)
```

---

## 3. Props vs State

| Feature           | Props                       | State                         |
| ----------------- | --------------------------- | ----------------------------- |
| **Ownership**     | Owned by **parent**         | Owned by **component itself** |
| **Mutability**    | **Immutable** (read-only)   | **Mutable** (can change)      |
| **Flow**          | Passed **down** from parent | Internal to component         |
| **Changes cause** | Child re-renders            | Component re-renders          |
| **Purpose**       | Configure child component   | Manage component's own data   |

### Example: Props vs State

```jsx
// STATE: Component's own data (can change)
function Counter() {
  const [count, setCount] = useState(0); // ← STATE (internal)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// PROPS: Data from parent (read-only)
function Display({ count }) {
  // ← PROPS (external)
  // count is read-only, Display cannot change it
  return <p>Count: {count}</p>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Display count={count} /> {/* Pass state as props */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**When to use what?**

- Use **State**: Data that changes within the component
- Use **Props**: Pass data from parent to child

---

## 4. Props are Immutable (Read-Only)

**Golden Rule:** Child components **CANNOT modify props**.

### ❌ WRONG: Trying to Modify Props

```jsx
function User(props) {
  // ❌ ERROR: Cannot modify props!
  props.name = "Bob"; // TypeError: Cannot assign to read-only property

  return <div>{props.name}</div>;
}
```

### ✅ CORRECT: If you need to modify, use state

```jsx
function User({ initialName }) {
  // ✅ Copy prop to state if you need to modify it
  const [name, setName] = useState(initialName);

  return (
    <div>
      <p>{name}</p>
      <button onClick={() => setName("Bob")}>Change Name</button>
    </div>
  );
}
```

**Why props are read-only?**

- Ensures **predictable data flow**
- Prevents **confusing bugs** (child can't change parent's data unexpectedly)
- Makes debugging easier (data flows in one direction)

---

## 5. Passing Different Types of Props

### String Props

```jsx
// No curly braces needed for strings
<User name="John" />

// Or with curly braces (same result)
<User name={"John"} />
```

### Number Props

```jsx
// ✅ Use curly braces for numbers
<User age={25} />

// ❌ WRONG: This is a string "25", not number 25
<User age="25" />
```

### Boolean Props

```jsx
// ✅ Explicit
<User isAdmin={true} />
<User isAdmin={false} />

// ✅ Shorthand for true
<User isAdmin />  {/* Same as isAdmin={true} */}

// For false, must be explicit
<User isAdmin={false} />
```

### Array Props

```jsx
<TodoList items={["Task 1", "Task 2", "Task 3"]} />;

function TodoList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

### Object Props

```jsx
<User profile={{ name: "John", age: 25, city: "NYC" }} />;

function User({ profile }) {
  return (
    <div>
      <h1>{profile.name}</h1>
      <p>Age: {profile.age}</p>
      <p>City: {profile.city}</p>
    </div>
  );
}
```

### Function Props (Callbacks)

```jsx
function App() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <Button onClick={handleClick} />;
}

function Button({ onClick }) {
  return <button onClick={onClick}>Click Me</button>;
}
```

### JSX/Component Props

```jsx
<Card header={<h1>Title</h1>} footer={<button>Save</button>} />;

function Card({ header, footer }) {
  return (
    <div>
      <div className="header">{header}</div>
      <div className="footer">{footer}</div>
    </div>
  );
}
```

---

## 6. Destructuring Props (Best Practice)

### Without Destructuring (Verbose)

```jsx
function User(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Age: {props.age}</p>
      <p>Email: {props.email}</p>
    </div>
  );
}
```

### ✅ With Destructuring (Clean)

```jsx
function User({ name, age, email }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}
```

### Destructuring with Default Values

```jsx
function User({ name = 'Guest', age = 0, isAdmin = false }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      {isAdmin && <span>Admin</span>}
    </div>
  );
}

// Usage
<User name="John" age={25} />  // isAdmin defaults to false
<User />  // All props use defaults: Guest, 0, false
```

### Destructuring with Rest Operator

```jsx
function User({ name, age, ...otherProps }) {
  console.log(otherProps); // { email: 'john@example.com', city: 'NYC' }

  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
    </div>
  );
}

<User name="John" age={25} email="john@example.com" city="NYC" />;
```

---

## 7. The Special `children` Prop

**`children`** is a special prop that contains the content between opening and closing tags.

### Basic Children

```jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

// Usage
<Card>
  <h1>Title</h1>
  <p>This is the content</p>
</Card>;

// children = <h1>Title</h1><p>This is the content</p>
```

### Children Types

```jsx
// Text children
<Button>Click Me</Button>  // children = "Click Me"

// JSX children
<Card>
  <h1>Title</h1>
  <p>Content</p>
</Card>

// Component children
<Layout>
  <Header />
  <Content />
  <Footer />
</Layout>

// Mixed children
<Card>
  Hello
  <strong>World</strong>
  {someVariable}
</Card>
```

### Manipulating Children

```jsx
import { Children } from "react";

function List({ children }) {
  // Convert children to array
  const childArray = Children.toArray(children);

  return (
    <ul>
      {childArray.map((child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
}

// Usage
<List>
  <span>Item 1</span>
  <span>Item 2</span>
  <span>Item 3</span>
</List>;
```

---

## 8. Default Props

### Method 1: Default Parameters (Modern)

```jsx
function User({ name = "Guest", age = 0 }) {
  return (
    <div>
      {name} is {age} years old
    </div>
  );
}
```

### Method 2: defaultProps (Legacy)

```jsx
function User({ name, age }) {
  return (
    <div>
      {name} is {age} years old
    </div>
  );
}

User.defaultProps = {
  name: "Guest",
  age: 0,
};
```

**Recommendation:** Use default parameters (Method 1) - cleaner and more modern.

---

## 9. PropTypes (Type Checking)

PropTypes validate props at runtime (development only).

### Installation

```bash
npm install prop-types
```

### Basic PropTypes

```jsx
import PropTypes from "prop-types";

function User({ name, age, email, isAdmin }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      {isAdmin && <span>Admin</span>}
    </div>
  );
}

User.propTypes = {
  name: PropTypes.string.isRequired, // Required string
  age: PropTypes.number.isRequired, // Required number
  email: PropTypes.string, // Optional string
  isAdmin: PropTypes.bool, // Optional boolean
};
```

### Common PropTypes

```jsx
import PropTypes from "prop-types";

Component.propTypes = {
  // Primitive types
  name: PropTypes.string,
  age: PropTypes.number,
  isActive: PropTypes.bool,
  callback: PropTypes.func,
  data: PropTypes.object,
  items: PropTypes.array,

  // Required
  id: PropTypes.number.isRequired,

  // Specific values
  status: PropTypes.oneOf(["pending", "success", "error"]),

  // One of types
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // Array of specific type
  ids: PropTypes.arrayOf(PropTypes.number),

  // Object with specific shape
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),

  // Exact object shape
  config: PropTypes.exact({
    apiUrl: PropTypes.string,
    timeout: PropTypes.number,
  }),

  // React node (anything renderable)
  children: PropTypes.node,

  // React element
  icon: PropTypes.element,

  // Instance of class
  date: PropTypes.instanceOf(Date),

  // Custom validator
  email: function (props, propName, componentName) {
    if (!/\S+@\S+\.\S+/.test(props[propName])) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected valid email.`
      );
    }
  },
};
```

**Note:** PropTypes are removed in production builds for performance.

---

## 10. Spread Props Pattern

### Passing All Props Down

```jsx
function Button(props) {
  // Pass all props to the button element
  return <button {...props}>Click</button>;
}

// Usage
<Button onClick={handleClick} disabled={true} className="btn-primary">
  Submit
</Button>

// Becomes:
<button onClick={handleClick} disabled={true} className="btn-primary">
  Submit
</button>
```

### Spread with Override

```jsx
function Button({ className, ...otherProps }) {
  // Override className, pass rest
  return (
    <button className={`btn ${className}`} {...otherProps}>
      Click
    </button>
  );
}
```

### Extracting Specific Props

```jsx
function User({ name, age, ...restProps }) {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <Details {...restProps} /> {/* Pass rest to child */}
    </div>
  );
}
```

---

## 11. Props and Re-rendering

### When Props Change → Component Re-renders

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child count={count} /> {/* Child re-renders when count changes */}
    </div>
  );
}

function Child({ count }) {
  console.log("Child rendered!"); // Logs on every count change
  return <p>Count: {count}</p>;
}
```

**Flow:**

1. User clicks button
2. Parent's state changes (`setCount`)
3. Parent re-renders
4. Props change (count increases)
5. Child re-renders (props changed)

### Props Equality Check (React.memo)

React uses **shallow comparison** for props to determine if component should re-render.

```jsx
// Without React.memo: Re-renders every time parent renders
function Child({ name, age }) {
  console.log("Child rendered");
  return (
    <div>
      {name} - {age}
    </div>
  );
}

// With React.memo: Only re-renders if props actually change
const Child = React.memo(function Child({ name, age }) {
  console.log("Child rendered");
  return (
    <div>
      {name} - {age}
    </div>
  );
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child name="John" age={25} /> {/* Won't re-render when count changes */}
    </div>
  );
}
```

---

## 12. Props Drilling Problem

**Props Drilling** = Passing props through multiple layers of components that don't need them.

### The Problem

```jsx
function App() {
  const user = { name: "John", age: 25 };

  return <Layout user={user} />;
}

function Layout({ user }) {
  // Layout doesn't use user, just passes it down
  return (
    <div>
      <Header user={user} />
    </div>
  );
}

function Header({ user }) {
  // Header doesn't use user, just passes it down
  return (
    <div>
      <UserMenu user={user} />
    </div>
  );
}

function UserMenu({ user }) {
  // Finally uses user!
  return <div>Welcome, {user.name}</div>;
}
```

**Problem:** `user` prop drilled through Layout → Header → UserMenu

### Solutions

#### Solution 1: Context API

```jsx
const UserContext = createContext();

function App() {
  const user = { name: "John", age: 25 };

  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

function Layout() {
  // No user prop needed!
  return (
    <div>
      <Header />
    </div>
  );
}

function Header() {
  // No user prop needed!
  return (
    <div>
      <UserMenu />
    </div>
  );
}

function UserMenu() {
  // Access user directly from context
  const user = useContext(UserContext);
  return <div>Welcome, {user.name}</div>;
}
```

#### Solution 2: Component Composition

```jsx
function App() {
  const user = { name: "John", age: 25 };

  // Pass UserMenu as children
  return (
    <Layout>
      <Header>
        <UserMenu user={user} />
      </Header>
    </Layout>
  );
}

function Layout({ children }) {
  // Just renders children, doesn't care about user
  return <div>{children}</div>;
}

function Header({ children }) {
  // Just renders children, doesn't care about user
  return <div>{children}</div>;
}

function UserMenu({ user }) {
  return <div>Welcome, {user.name}</div>;
}
```

---

## 13. Communicating from Child to Parent

Props flow **down** (parent → child), but how does child communicate **up**?

**Answer:** Parent passes a **function** as prop, child **calls** it.

### Example: Child Updates Parent's State

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // Pass function to child
  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <Child onIncrement={handleIncrement} />
    </div>
  );
}

function Child({ onIncrement }) {
  // Call parent's function
  return <button onClick={onIncrement}>Increment</button>;
}
```

### Passing Data Up

```jsx
function Parent() {
  const [name, setName] = useState("");

  const handleNameChange = (newName) => {
    setName(newName);
  };

  return (
    <div>
      <p>Name: {name}</p>
      <Child onNameChange={handleNameChange} />
    </div>
  );
}

function Child({ onNameChange }) {
  return (
    <input
      onChange={(e) => onNameChange(e.target.value)}
      placeholder="Enter name"
    />
  );
}
```

**Flow:**

1. Parent passes function as prop (`onNameChange`)
2. Child calls function with data (`onNameChange(value)`)
3. Parent's function updates state
4. Parent re-renders with new state
5. Props change, child re-renders

---

## 14. Common Patterns

### Pattern 1: Render Props

```jsx
function DataFetcher({ url, render }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);

  return render(data); // Call render prop with data
}

// Usage
<DataFetcher
  url="/api/users"
  render={(data) =>
    data ? (
      <ul>
        {data.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    ) : (
      "Loading..."
    )
  }
/>;
```

### Pattern 2: Configuration Props

```jsx
function Button({ variant = 'primary', size = 'medium', children }) {
  const className = `btn btn-${variant} btn-${size}`;
  return <button className={className}>{children}</button>;
}

// Usage
<Button variant="primary" size="large">Submit</Button>
<Button variant="secondary" size="small">Cancel</Button>
```

### Pattern 3: Conditional Rendering Props

```jsx
function Card({ title, subtitle, footer, children }) {
  return (
    <div className="card">
      {title && <h1>{title}</h1>}
      {subtitle && <h2>{subtitle}</h2>}
      <div className="content">{children}</div>
      {footer && <div className="footer">{footer}</div>}
    </div>
  );
}

// Usage
<Card title="My Card" subtitle="Subtitle here" footer={<button>Save</button>}>
  Card content
</Card>;
```

---

## 15. Common Mistakes & Fixes

### ❌ Mistake 1: Modifying Props

```jsx
// BAD
function User(props) {
  props.name = "Bob"; // ❌ Cannot modify props
  return <div>{props.name}</div>;
}

// GOOD
function User({ initialName }) {
  const [name, setName] = useState(initialName);
  return <div>{name}</div>;
}
```

---

### ❌ Mistake 2: Using Props as State Initial Value Without Updating

```jsx
// BAD: name state won't update if userName prop changes
function User({ userName }) {
  const [name, setName] = useState(userName);
  // If userName prop changes, name state stays the same!
  return <div>{name}</div>;
}

// GOOD: Synchronize state with props using useEffect
function User({ userName }) {
  const [name, setName] = useState(userName);

  useEffect(() => {
    setName(userName); // Update state when prop changes
  }, [userName]);

  return <div>{name}</div>;
}

// BETTER: Just use the prop directly if you don't need local state
function User({ userName }) {
  return <div>{userName}</div>;
}
```

---

### ❌ Mistake 3: Passing Incorrect Types

```jsx
// BAD
<User age="25" />  // String "25", not number 25

// GOOD
<User age={25} />  // Number 25
```

---

### ❌ Mistake 4: Forgetting Keys in Lists

```jsx
// BAD
<ul>
  {users.map(user => (
    <li>{user.name}</li>  // ❌ Missing key
  ))}
</ul>

// GOOD
<ul>
  {users.map(user => (
    <li key={user.id}>{user.name}</li>  // ✅ Unique key
  ))}
</ul>
```

---

### ❌ Mistake 5: Creating Functions in Render

```jsx
// BAD: Creates new function on every render
function Parent() {
  return <Child onClick={() => console.log("clicked")} />;
}

// GOOD: Define function outside JSX
function Parent() {
  const handleClick = () => console.log("clicked");
  return <Child onClick={handleClick} />;
}

// BETTER: Use useCallback if performance matters
function Parent() {
  const handleClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <Child onClick={handleClick} />;
}
```

---

## 16. Interview Questions

### Q1: What are props in React?

**Answer:** Props (properties) are arguments passed from parent to child components, similar to function parameters. They allow components to receive data and configuration from their parent.

```jsx
<User name="John" age={25} />
```

---

### Q2: Are props mutable or immutable?

**Answer:** Props are **immutable** (read-only). Child components cannot modify the props they receive. If you need to modify data, copy it to state first.

```jsx
function User({ initialName }) {
  const [name, setName] = useState(initialName); // Copy to state
  return <input value={name} onChange={(e) => setName(e.target.value)} />;
}
```

---

### Q3: What's the difference between props and state?

**Answer:**

| Props                   | State                   |
| ----------------------- | ----------------------- |
| From parent             | Component's own         |
| Read-only               | Mutable                 |
| Configure component     | Manage component data   |
| Changes cause re-render | Changes cause re-render |

---

### Q4: How do you pass data from child to parent?

**Answer:** Parent passes a function as prop, child calls it with data:

```jsx
function Parent() {
  const handleData = (data) => console.log(data);
  return <Child onData={handleData} />;
}

function Child({ onData }) {
  return <button onClick={() => onData("Hello")}>Send</button>;
}
```

---

### Q5: What is the children prop?

**Answer:** `children` is a special prop that contains the content between component's opening and closing tags:

```jsx
<Card>
  <h1>Title</h1> {/* This is children */}
</Card>;

function Card({ children }) {
  return <div className="card">{children}</div>;
}
```

---

### Q6: What is prop drilling?

**Answer:** Prop drilling is passing props through multiple component layers that don't use them, just to reach a deeply nested component.

**Solution:** Use Context API or component composition to avoid it.

---

### Q7: How does React know when to re-render based on props?

**Answer:** React performs **shallow comparison** on props. If any prop reference changes, the component re-renders. For objects/arrays, a new reference (not deep changes) triggers re-render.

```jsx
// New object reference → re-render
<User profile={{ name: "John" }} />;

// Same reference → no re-render (with React.memo)
const profile = { name: "John" };
<User profile={profile} />;
```

---

### Q8: What are default props?

**Answer:** Default props provide fallback values when props are not provided:

```jsx
function User({ name = "Guest", age = 0 }) {
  return (
    <div>
      {name} - {age}
    </div>
  );
}
```

---

### Q9: What are PropTypes?

**Answer:** PropTypes are runtime type validators for props (development only):

```jsx
import PropTypes from "prop-types";

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
};
```

---

### Q10: Can you pass functions as props?

**Answer:** Yes! Functions are commonly passed as props for event handling and callbacks:

```jsx
<Button onClick={handleClick} />;

function Button({ onClick }) {
  return <button onClick={onClick}>Click</button>;
}
```

---

## 17. Best Practices Summary

### ✅ Always Do:

1. **Destructure props** for cleaner code
2. **Use PropTypes** or TypeScript for type checking
3. **Pass functions** for child-to-parent communication
4. **Use default values** for optional props
5. **Keep props simple** - avoid complex objects when possible
6. **Document props** with comments or PropTypes

### ❌ Never Do:

1. **Modify props** (they're read-only)
2. **Create functions in JSX** (creates new function every render)
3. **Pass incorrect types** (string when expecting number)
4. **Drill props unnecessarily** (use Context or composition)
5. **Forget keys** when rendering lists
6. **Over-use spread props** (makes it unclear what props component accepts)

### 🎯 Advanced:

- Use `React.memo` to prevent re-renders when props haven't changed
- Use `useCallback` for function props to maintain referential equality
- Use Context API to avoid prop drilling
- Consider component composition over prop drilling

---

## Summary: Props Checklist

When working with props, ensure you:

- ✅ Pass props from parent to child (one-way flow)
- ✅ Treat props as read-only (immutable)
- ✅ Use destructuring for cleaner code
- ✅ Provide default values for optional props
- ✅ Pass functions for child-to-parent communication
- ✅ Use PropTypes or TypeScript for validation
- ✅ Avoid prop drilling (use Context or composition)
- ✅ Understand props cause re-renders when they change

Your props knowledge is interview-ready when you can explain:

1. Props vs State (ownership, mutability)
2. One-way data flow (parent → child)
3. Why props are read-only
4. How to communicate from child to parent (callback props)
5. The children prop and its uses
6. Prop drilling problem and solutions
7. How props changes trigger re-renders


