# JSX (JavaScript XML)

## TL;DR

- JavaScript syntax extension that looks like HTML
- Gets compiled to `React.createElement()` calls
- Must return single root element
- Use `{}` for JavaScript expressions
- Use `className` instead of `class`, `htmlFor` instead of `for`
- Self-closing tags must end with `/>`

## What is JSX?

JSX is a syntax extension for JavaScript that lets you write HTML-like markup inside JavaScript files.

```jsx
// JSX
const element = <h1>Hello, World!</h1>;

// Compiles to (React.createElement)
const element = React.createElement("h1", null, "Hello, World!");
```

**Key Point**: JSX is NOT HTML. It's syntactic sugar for `React.createElement()`.

---

## Why JSX?

1. **Readability**: Easier to visualize UI structure
2. **Co-location**: Keep markup and logic together
3. **Type Safety**: Better TypeScript/IDE support
4. **Performance**: Compile-time optimizations

---

## Basic Syntax

### 1. Single Root Element

```jsx
// ❌ Wrong - Multiple roots
function App() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}

// ✅ Correct - Single root
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ✅ Or use Fragment
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}
```

### 2. JavaScript Expressions in `{}`

```jsx
function Greeting({ name, age }) {
  const isAdult = age >= 18;

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Age: {age}</p>
      <p>Status: {isAdult ? "Adult" : "Minor"}</p>
      <p>Next year: {age + 1}</p>
    </div>
  );
}
```

### 3. Self-Closing Tags

```jsx
// ❌ Wrong
<img src="photo.jpg">
<input type="text">

// ✅ Correct
<img src="photo.jpg" />
<input type="text" />
```

---

## JSX vs HTML - Key Differences

| HTML                 | JSX                        | Reason                                  |
| -------------------- | -------------------------- | --------------------------------------- |
| `class`              | `className`                | `class` is JS reserved keyword          |
| `for`                | `htmlFor`                  | `for` is JS reserved keyword            |
| `onclick`            | `onClick`                  | camelCase for event handlers            |
| `tabindex`           | `tabIndex`                 | camelCase convention                    |
| `<input checked>`    | `<input checked={true} />` | Boolean attributes need explicit values |
| `style="color: red"` | `style={{ color: 'red' }}` | Style is an object                      |

### Examples

```jsx
// HTML
<div class="container">
  <label for="username">Name</label>
  <input type="text" id="username" onclick="handleClick()" />
</div>

// JSX
<div className="container">
  <label htmlFor="username">Name</label>
  <input type="text" id="username" onClick={handleClick} />
</div>
```

---

## Embedding Expressions

### Variables

```jsx
const name = "Nishant";
const element = <h1>Hello, {name}!</h1>;
```

### Functions

```jsx
function formatName(user) {
  return `${user.firstName} ${user.lastName}`;
}

const user = { firstName: "John", lastName: "Doe" };
const element = <h1>Hello, {formatName(user)}!</h1>;
```

### Ternary Operators

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please sign in.</h1>}</div>
  );
}
```

### Logical AND (`&&`)

```jsx
function Mailbox({ unreadMessages }) {
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}
```

**⚠️ Falsy Values Warning**:

```jsx
// ❌ Will render "0" on screen
{
  count && <div>Count: {count}</div>;
}

// ✅ Correct
{
  count > 0 && <div>Count: {count}</div>;
}
```

---

## Styling in JSX

### 1. Inline Styles (Object)

```jsx
const divStyle = {
  color: 'blue',
  backgroundColor: 'lightgray',
  fontSize: '16px',
  padding: '10px'
};

<div style={divStyle}>Styled content</div>

// Or inline
<div style={{ color: 'red', fontSize: '20px' }}>Text</div>
```

**Note**: CSS properties use camelCase (`backgroundColor`, not `background-color`).

### 2. CSS Classes

```jsx
<div className="container primary-bg">Content</div>

// Dynamic classes
<div className={isActive ? 'active' : 'inactive'}>Content</div>

// Multiple dynamic classes
<div className={`container ${isActive ? 'active' : ''}`}>Content</div>
```

---

## Comments in JSX

```jsx
function App() {
  return (
    <div>
      {/* Single line comment */}

      {/* 
        Multi-line
        comment
      */}

      <h1>Hello</h1>

      {/* Comment after element */}
    </div>
  );
}
```

**⚠️ Cannot use `//` inside JSX**:

```jsx
// ❌ Wrong
<div>
  // This won't work
  <h1>Hello</h1>
</div>

// ✅ Correct
<div>
  {/* This works */}
  <h1>Hello</h1>
</div>
```

---

## Conditional Rendering

### 1. If-Else (Outside JSX)

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign in.</h1>;
}
```

### 2. Ternary (Inside JSX)

```jsx
function Greeting({ isLoggedIn }) {
  return <div>{isLoggedIn ? <UserPanel /> : <LoginButton />}</div>;
}
```

### 3. Logical AND

```jsx
function Notification({ message }) {
  return <div>{message && <Alert>{message}</Alert>}</div>;
}
```

### 4. IIFE (Complex Logic)

```jsx
function Dashboard({ role }) {
  return (
    <div>
      {(() => {
        if (role === "admin") return <AdminPanel />;
        if (role === "user") return <UserPanel />;
        return <GuestPanel />;
      })()}
    </div>
  );
}
```

---

## Lists and Keys

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

**⚠️ Key Rules**:

- Must be unique among siblings
- Should be stable (not index if list can reorder)
- Don't use `Math.random()` - defeats the purpose

```jsx
// ❌ Bad - Using index as key
{
  todos.map((todo, index) => <li key={index}>{todo.text}</li>);
}

// ✅ Good - Using unique ID
{
  todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
}
```

---

## JSX Props

### Spreading Props

```jsx
const props = { firstName: 'John', lastName: 'Doe' };

// Instead of
<Greeting firstName={props.firstName} lastName={props.lastName} />

// Use spread
<Greeting {...props} />
```

### Children Prop

```jsx
function Container({ children }) {
  return <div className="container">{children}</div>;
}

<Container>
  <h1>Title</h1>
  <p>Content</p>
</Container>;
```

### Default Props (Legacy)

```jsx
function Greeting({ name = "Guest" }) {
  return <h1>Hello, {name}!</h1>;
}
```

---

## JSX Compilation

### What Babel Does

```jsx
// Before (JSX)
const element = (
  <div className="container">
    <h1>Hello, {name}!</h1>
  </div>
);

// After (Compiled)
const element = React.createElement(
  "div",
  { className: "container" },
  React.createElement("h1", null, "Hello, ", name, "!")
);
```

### React 17+ (New JSX Transform)

```jsx
// Before
import React from "react"; // Required even without using React

// After React 17+
// No need to import React for JSX
// Babel automatically imports jsx runtime
```

---

## Common Pitfalls

### 1. Return Must Have Parentheses (Multi-line)

```jsx
// ❌ Wrong - Returns undefined
function App() {
  return;
  <div>
    <h1>Hello</h1>
  </div>;
}

// ✅ Correct
function App() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
}
```

### 2. Cannot Render Objects Directly

```jsx
const user = { name: 'John', age: 30 };

// ❌ Error: Objects are not valid as a React child
<div>{user}</div>

// ✅ Correct
<div>{user.name}</div>
<div>{JSON.stringify(user)}</div>
```

### 3. Falsy Values Rendering

```jsx
// Renders nothing: null, undefined, true, false
{
  null;
} // Nothing
{
  undefined;
} // Nothing
{
  true;
} // Nothing
{
  false;
} // Nothing

// Renders the value: 0, "", NaN
{
  0;
} // "0"
{
  ("");
} // Empty string
{
  NaN;
} // "NaN"
```

### 4. Event Handlers

```jsx
// ❌ Wrong - Function is called immediately
<button onClick={handleClick()}>Click</button>

// ✅ Correct - Pass function reference
<button onClick={handleClick}>Click</button>

// ✅ Correct - With arrow function
<button onClick={() => handleClick(id)}>Click</button>
```

---

## Interview Questions

### Q1: What is JSX?

**Answer**: JSX is a syntax extension for JavaScript that allows writing HTML-like markup in JavaScript. It gets compiled to `React.createElement()` calls by Babel.

### Q2: Is JSX required for React?

**Answer**: No, but it's highly recommended for readability. You can use `React.createElement()` directly.

### Q3: Why `className` instead of `class`?

**Answer**: Because `class` is a reserved keyword in JavaScript (used for ES6 classes).

### Q4: What gets rendered for `{false}` and `{0}`?

**Answer**: `{false}` renders nothing. `{0}` renders "0" on screen.

### Q5: Can you use `if-else` inside JSX?

**Answer**: No, but you can use ternary operators, logical AND, or IIFE.

### Q6: What's the difference between `<Fragment>` and `<div>`?

**Answer**: Fragment doesn't create an extra DOM node, while `div` does. Fragment is useful when you need a wrapper but don't want extra HTML.

### Q7: Why do we need keys in lists?

**Answer**: Keys help React identify which items have changed, been added, or removed. They should be stable and unique among siblings for optimal performance.

---

## Best Practices

1. ✅ Use semantic HTML elements
2. ✅ Keep JSX readable - break into smaller components
3. ✅ Use fragments to avoid unnecessary divs
4. ✅ Extract complex logic outside JSX
5. ✅ Use proper keys for lists
6. ✅ Avoid inline functions in render when possible (performance)
7. ✅ Use TypeScript for better JSX type safety

---

## JSX vs Template Literals

```jsx
// Template Literal (String)
const html = `<div class="container"><h1>Hello</h1></div>`;

// JSX (React Elements)
const element = (
  <div className="container">
    <h1>Hello</h1>
  </div>
);
```

**Key Difference**: JSX creates React elements (objects), not strings.

---

## Summary Cheat Sheet

```jsx
// ✅ Valid JSX patterns
<Component />                           // Self-closing
<Component>children</Component>         // With children
<Component prop="value" />              // String prop
<Component prop={value} />              // Expression prop
<Component {...props} />                // Spread props
<Component>{expression}</Component>     // Expression as child
<>Fragment</>                          // Short Fragment syntax

// ❌ Invalid JSX
<Component>                            // Not self-closed
<component />                          // Lowercase (treated as HTML)
<Component class="name" />             // Use className
<Component onclick={fn} />             // Use onClick (camelCase)
return <div></div><div></div>          // Multiple roots
```
