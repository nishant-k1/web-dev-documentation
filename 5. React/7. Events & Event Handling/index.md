# Events & Event Handling in React

## TL;DR

- React uses **Synthetic Events** (cross-browser wrapper around native events)
- Event handlers use camelCase: `onClick`, `onChange`, `onSubmit`
- `e.preventDefault()` stops default browser behavior (form submission, link navigation)
- `e.stopPropagation()` stops event bubbling up the DOM tree
- Pass function reference, not call: `onClick={handleClick}` not `onClick={handleClick()}`
- Event object is automatically passed as first argument
- In React 17+, events delegate to root, not document

---

## 1. What are Events in React?

Events are **actions or occurrences** that happen in the browser that React can respond to:

- User clicks a button → `onClick` event
- User types in input → `onChange` event
- Form is submitted → `onSubmit` event
- Mouse hovers over element → `onMouseEnter` event

### ✅ Basic Example

```jsx
function Button() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <button onClick={handleClick}>Click Me</button>;
}
```

**Key Points:**

- `onClick` is the event handler (camelCase, not lowercase `onclick`)
- `handleClick` is the handler function
- Function reference is passed (`handleClick`), not called (`handleClick()`)

---

## 2. React Events vs Native DOM Events

### Native DOM (Vanilla JavaScript)

```javascript
// HTML
<button onclick="handleClick()">Click</button>;

// JavaScript
document.getElementById("btn").addEventListener("click", function (e) {
  console.log("Clicked!");
});
```

### React Events

```jsx
// React (JSX)
<button onClick={handleClick}>Click</button>;

function handleClick(e) {
  console.log("Clicked!");
}
```

### Key Differences

| Feature            | Native DOM            | React                      |
| ------------------ | --------------------- | -------------------------- |
| **Naming**         | lowercase (`onclick`) | camelCase (`onClick`)      |
| **Handler**        | String or function    | Function reference only    |
| **Event Object**   | Native browser event  | SyntheticEvent (wrapper)   |
| **Delegation**     | Manual                | Automatic (root element)   |
| **Browser Compat** | Varies by browser     | Consistent across browsers |

---

## 3. Synthetic Events

React wraps native browser events in a **SyntheticEvent** for **cross-browser consistency**.

### What is a SyntheticEvent?

```jsx
function Input() {
  const handleChange = (e) => {
    console.log(e); // ← SyntheticEvent, not native Event
    console.log(e.nativeEvent); // ← Access native event
    console.log(e.target.value); // ← Same API as native
  };

  return <input onChange={handleChange} />;
}
```

**Why Synthetic Events?**

- ✅ **Cross-browser compatibility** (IE, Firefox, Chrome behave the same)
- ✅ **Performance** (event pooling in React 16, removed in React 17+)
- ✅ **Consistent API** (same properties/methods across browsers)

### SyntheticEvent Properties

```jsx
function handleClick(e) {
  console.log(e.type); // "click"
  console.log(e.target); // Element that triggered event
  console.log(e.currentTarget); // Element handler is attached to
  console.log(e.bubbles); // true/false
  console.log(e.preventDefault); // Function
  console.log(e.stopPropagation); // Function
  console.log(e.nativeEvent); // Original browser event
}
```

---

## 4. Common Event Handlers

### Mouse Events

```jsx
function MouseEvents() {
  return (
    <div
      onClick={() => console.log("Clicked")}
      onDoubleClick={() => console.log("Double clicked")}
      onMouseEnter={() => console.log("Mouse entered")}
      onMouseLeave={() => console.log("Mouse left")}
      onMouseMove={() => console.log("Mouse moved")}
      onMouseDown={() => console.log("Mouse button pressed")}
      onMouseUp={() => console.log("Mouse button released")}
    >
      Interact with me
    </div>
  );
}
```

### Keyboard Events

```jsx
function KeyboardEvents() {
  const handleKeyDown = (e) => {
    console.log("Key:", e.key); // "Enter", "a", "ArrowUp"
    console.log("Key Code:", e.keyCode); // 13, 65, 38 (deprecated)
    console.log("Code:", e.code); // "Enter", "KeyA", "ArrowUp"

    // Check modifiers
    if (e.ctrlKey) console.log("Ctrl is pressed");
    if (e.shiftKey) console.log("Shift is pressed");
    if (e.altKey) console.log("Alt is pressed");
    if (e.metaKey) console.log("Cmd/Win is pressed");
  };

  return (
    <input
      onKeyDown={handleKeyDown}
      onKeyUp={() => console.log("Key released")}
      onKeyPress={() => console.log("Key pressed (deprecated)")}
      placeholder="Type something"
    />
  );
}
```

**Common Use Cases:**

```jsx
// Submit on Enter key
const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    submitForm();
  }
};

// Keyboard shortcuts (Ctrl+S)
const handleKeyDown = (e) => {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault(); // Prevent browser save dialog
    saveDocument();
  }
};
```

### Form Events

```jsx
function FormEvents() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    console.log("Value:", e.target.value);
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ← CRUCIAL: Prevents page reload
    console.log("Form submitted with:", value);
  };

  const handleFocus = () => console.log("Input focused");
  const handleBlur = () => console.log("Input lost focus");

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Focus Events

```jsx
function FocusEvents() {
  return (
    <input
      onFocus={() => console.log("Focused")}
      onBlur={() => console.log("Blurred (lost focus)")}
    />
  );
}
```

### Clipboard Events

```jsx
function ClipboardEvents() {
  const handleCopy = (e) => {
    console.log("Copied:", e.clipboardData.getData("text"));
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Prevent default paste
    const pastedText = e.clipboardData.getData("text");
    console.log("Pasted:", pastedText);
    // Custom paste logic here
  };

  return (
    <input
      onCopy={handleCopy}
      onCut={() => console.log("Cut")}
      onPaste={handlePaste}
    />
  );
}
```

### Drag & Drop Events

```jsx
function DragDropExample() {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", "Dragged data");
    console.log("Drag started");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    console.log("Dropped:", data);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  return (
    <>
      <div draggable onDragStart={handleDragStart}>
        Drag me
      </div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{ border: "2px dashed gray", padding: "20px" }}
      >
        Drop here
      </div>
    </>
  );
}
```

---

## 5. Event Handler Patterns

### Pattern 1: Inline Arrow Function (Simple logic)

```jsx
<button onClick={() => console.log("Clicked")}>Click</button>
```

**When to use:**

- Very simple logic (1 line)
- No re-use needed
- **⚠️ Creates new function on every render**

---

### Pattern 2: Function Reference (Best for most cases)

```jsx
function Component() {
  const handleClick = () => {
    console.log("Clicked");
  };

  return <button onClick={handleClick}>Click</button>;
}
```

**When to use:**

- ✅ Multi-line logic
- ✅ Reusable handler
- ✅ Better for performance (same function reference)

---

### Pattern 3: Inline with Arguments

```jsx
function TodoList() {
  const todos = ["Task 1", "Task 2"];

  const handleDelete = (id) => {
    console.log("Deleting:", id);
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          {/* ❌ BAD: Calls immediately */}
          <button onClick={handleDelete(index)}>Delete</button>

          {/* ✅ GOOD: Arrow function wrapper */}
          <button onClick={() => handleDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
```

---

### Pattern 4: Currying (For reusable handlers with arguments)

```jsx
function Component() {
  // Returns a function that returns a function
  const handleClick = (id) => (e) => {
    console.log("Clicked item:", id);
    console.log("Event:", e);
  };

  return (
    <>
      <button onClick={handleClick(1)}>Item 1</button>
      <button onClick={handleClick(2)}>Item 2</button>
    </>
  );
}
```

---

### Pattern 5: Using Data Attributes

```jsx
function TodoList() {
  const todos = ["Task 1", "Task 2"];

  const handleDelete = (e) => {
    const id = e.currentTarget.dataset.id; // Get data-id
    console.log("Deleting:", id);
  };

  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          {/* ✅ No inline arrow function needed */}
          <button data-id={index} onClick={handleDelete}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
```

---

## 6. e.preventDefault() - Stop Default Behavior

**What does it do?** Prevents the browser's default action for that event.

### Common Use Cases

#### Use Case 1: Form Submission (Most Common!)

```jsx
function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault(); // ← Prevents page reload!

    // Without preventDefault():
    // - Browser submits form to server
    // - Page reloads
    // - React state is lost

    // With preventDefault():
    // - We handle submission in React
    // - No page reload
    // - State persists

    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" />
      <button type="submit">Login</button>
    </form>
  );
}
```

**Why needed?**

- ✅ Prevents page reload (default form behavior)
- ✅ Allows React to handle submission (API calls, validation)
- ✅ Keeps React state intact

---

#### Use Case 2: Link Navigation

```jsx
function CustomLink() {
  const handleClick = (e) => {
    e.preventDefault(); // ← Prevents navigation!

    // Custom logic (analytics, routing, etc.)
    console.log("Link clicked");
    // Then maybe navigate programmatically
    window.history.pushState({}, "", "/new-page");
  };

  return (
    <a href="/some-page" onClick={handleClick}>
      Click me
    </a>
  );
}
```

---

#### Use Case 3: Context Menu (Right Click)

```jsx
function CustomContextMenu() {
  const handleContextMenu = (e) => {
    e.preventDefault(); // ← Prevents browser's context menu

    // Show custom context menu
    console.log("Show custom menu at:", e.clientX, e.clientY);
  };

  return <div onContextMenu={handleContextMenu}>Right-click me</div>;
}
```

---

#### Use Case 4: Drag & Drop

```jsx
function DropZone() {
  const handleDragOver = (e) => {
    e.preventDefault(); // ← REQUIRED for drop to work!
  };

  const handleDrop = (e) => {
    e.preventDefault(); // ← Prevents browser opening file
    const files = e.dataTransfer.files;
    console.log("Files dropped:", files);
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      Drop files here
    </div>
  );
}
```

---

## 7. e.stopPropagation() - Stop Event Bubbling

**What does it do?** Stops the event from bubbling up to parent elements.

### Understanding Event Bubbling

Events **bubble up** the DOM tree by default:

```jsx
function BubblingExample() {
  return (
    <div onClick={() => console.log("Div clicked")}>
      <button onClick={() => console.log("Button clicked")}>Click me</button>
    </div>
  );
}

// When button is clicked:
// 1. "Button clicked" (button's handler)
// 2. "Div clicked" (event bubbles up to div)
```

### Using stopPropagation()

```jsx
function StopBubbling() {
  const handleButtonClick = (e) => {
    e.stopPropagation(); // ← Stop here, don't bubble up!
    console.log("Button clicked");
  };

  const handleDivClick = () => {
    console.log("Div clicked"); // ← Won't run when button clicked
  };

  return (
    <div onClick={handleDivClick}>
      <button onClick={handleButtonClick}>Click me</button>
    </div>
  );
}

// When button is clicked:
// 1. "Button clicked" (button's handler)
// 2. (Nothing - bubbling stopped)
```

### Real-World Example: Modal with Backdrop

```jsx
function Modal({ onClose }) {
  const handleBackdropClick = () => {
    onClose(); // Close modal when clicking backdrop
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); // Don't close when clicking modal content
  };

  return (
    <div className="backdrop" onClick={handleBackdropClick}>
      <div className="modal" onClick={handleModalClick}>
        <h2>Modal Content</h2>
        <p>Click outside to close</p>
      </div>
    </div>
  );
}
```

---

## 8. e.target vs e.currentTarget

### e.target

- **Element that triggered the event** (where event originated)
- Can be any descendant element

### e.currentTarget

- **Element the handler is attached to** (where you put onClick/onChange)
- Always the element with the event listener

### Example

```jsx
function TargetExample() {
  const handleClick = (e) => {
    console.log("target:", e.target); // The specific element clicked
    console.log("currentTarget:", e.currentTarget); // The div (handler's element)
  };

  return (
    <div onClick={handleClick} style={{ padding: "20px", border: "1px solid" }}>
      <button>Button</button>
      <span>Span</span>
      <p>Paragraph</p>
    </div>
  );
}

// Click button:
// target: <button> (what you clicked)
// currentTarget: <div> (where onClick is)

// Click span:
// target: <span>
// currentTarget: <div>

// Click div (empty area):
// target: <div>
// currentTarget: <div>
```

### When to Use Each

```jsx
// Use e.target when you need the specific clicked element
const handleClick = (e) => {
  if (e.target.tagName === "BUTTON") {
    console.log("A button was clicked");
  }
};

// Use e.currentTarget when you need the element with the handler
const handleClick = (e) => {
  const parentDiv = e.currentTarget; // Always the div
  console.log("Handler on:", parentDiv);
};
```

---

## 9. Event Bubbling & Capturing

### Event Flow (3 Phases)

```
1. CAPTURING PHASE (top → down)
   ↓ document
   ↓ html
   ↓ body
   ↓ div
   ↓ button (target)

2. TARGET PHASE
   • Event reaches target element

3. BUBBLING PHASE (bottom → up)
   ↑ button (target)
   ↑ div
   ↑ body
   ↑ html
   ↑ document
```

### React Events (Bubbling by Default)

```jsx
function BubblingDemo() {
  return (
    <div onClick={() => console.log("Div")}>
      {" "}
      {/* 3rd (bubbling) */}
      <ul onClick={() => console.log("UL")}>
        {" "}
        {/* 2nd (bubbling) */}
        <li onClick={() => console.log("LI")}>
          {" "}
          {/* 1st (target) */}
          Click me
        </li>
      </ul>
    </div>
  );
}

// Output when clicking LI:
// "LI"
// "UL"
// "Div"
```

### Capture Phase in React

```jsx
function CapturingDemo() {
  return (
    <div onClickCapture={() => console.log("Div (capture)")}>
      {" "}
      {/* 1st */}
      <ul onClickCapture={() => console.log("UL (capture)")}>
        {" "}
        {/* 2nd */}
        <li onClick={() => console.log("LI (bubble)")}>
          {" "}
          {/* 3rd */}
          Click me
        </li>
      </ul>
    </div>
  );
}

// Output when clicking LI:
// "Div (capture)"
// "UL (capture)"
// "LI (bubble)"
```

**Capture Events in React:**

- `onClickCapture` (instead of `onClick`)
- `onChangeCapture`
- `onFocusCapture`
- etc.

---

## 10. Event Delegation in React

React automatically delegates events to the **root container** (React 17+).

### Before React 17 (Delegated to document)

```
document
  └── Listens to ALL events
      └── Routes to appropriate components
```

### React 17+ (Delegated to root)

```
<div id="root">
  └── Listens to ALL events
      └── Routes to appropriate components
```

**Why this matters:**

- ✅ Better performance (one listener per event type, not per element)
- ✅ Works with multiple React roots on same page
- ✅ Better integration with non-React code

---

## 11. Common Patterns & Use Cases

### Pattern 1: Toggle State on Click

```jsx
function Toggle() {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return <button onClick={handleToggle}>{isOn ? "ON" : "OFF"}</button>;
}
```

---

### Pattern 2: Controlled Input

```jsx
function Input() {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value); // Update state on every keystroke
  };

  return <input value={value} onChange={handleChange} />;
}
```

---

### Pattern 3: Handle Multiple Inputs

```jsx
function Form() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Dynamic key based on input's name attribute
    }));
  };

  return (
    <form>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="age" value={formData.age} onChange={handleChange} />
    </form>
  );
}
```

---

### Pattern 4: Debounced Input (Search)

```jsx
function SearchInput() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Searching for:", query);
      // API call here
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId); // Cleanup
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return <input value={query} onChange={handleChange} />;
}
```

---

### Pattern 5: Conditional Event Handler

```jsx
function Button({ disabled }) {
  const handleClick = () => {
    console.log("Clicked");
  };

  return <button onClick={disabled ? undefined : handleClick}>Click me</button>;
}
```

---

### Pattern 6: Event Handler with Async Logic

```jsx
function AsyncButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await fetch("/api/data");
      console.log("Success");
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Loading..." : "Submit"}
    </button>
  );
}
```

---

## 12. Common Mistakes & Fixes

### ❌ Mistake 1: Calling Function Instead of Passing Reference

```jsx
// BAD: Function is called immediately during render
<button onClick={handleClick()}>Click</button>

// ✅ GOOD: Function reference is passed
<button onClick={handleClick}>Click</button>
```

**Exception:** When you need to pass arguments:

```jsx
// ✅ Wrap in arrow function
<button onClick={() => handleClick(id)}>Click</button>
```

---

### ❌ Mistake 2: Forgetting preventDefault() in Forms

```jsx
// BAD: Page reloads on submit
function Form() {
  const handleSubmit = () => {
    console.log("Submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}

// ✅ GOOD: Prevent default behavior
function Form() {
  const handleSubmit = (e) => {
    e.preventDefault(); // ← Add this!
    console.log("Submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### ❌ Mistake 3: Not Accessing Event Asynchronously (React 16 and earlier)

```jsx
// BAD in React 16: Event pooling issue
function Input() {
  const handleChange = (e) => {
    setTimeout(() => {
      console.log(e.target.value); // ❌ e is nullified!
    }, 1000);
  };

  return <input onChange={handleChange} />;
}

// ✅ FIX 1: Store value in variable
function Input() {
  const handleChange = (e) => {
    const value = e.target.value; // Store before async
    setTimeout(() => {
      console.log(value); // ✅ Works
    }, 1000);
  };

  return <input onChange={handleChange} />;
}

// ✅ FIX 2: Use e.persist() (React 16 only)
function Input() {
  const handleChange = (e) => {
    e.persist(); // Prevents event pooling
    setTimeout(() => {
      console.log(e.target.value); // ✅ Works
    }, 1000);
  };

  return <input onChange={handleChange} />;
}

// ℹ️ React 17+: Event pooling removed, no longer an issue!
```

---

### ❌ Mistake 4: Confusing target and currentTarget

```jsx
function Example() {
  const handleClick = (e) => {
    // BAD: Might not be what you expect
    console.log(e.target); // Could be child element

    // GOOD: Always the element with onClick
    console.log(e.currentTarget); // The div
  };

  return (
    <div onClick={handleClick}>
      <button>Click me</button>
    </div>
  );
}

// If you click the button:
// e.target = <button> (what you clicked)
// e.currentTarget = <div> (where onClick is attached)
```

---

### ❌ Mistake 5: Creating New Functions in Render (Performance)

```jsx
// BAD: New function on every render
function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} onClick={() => console.log(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ✅ BETTER: Use data attributes
function List({ items }) {
  const handleClick = (e) => {
    const id = e.currentTarget.dataset.id;
    console.log("Clicked:", id);
  };

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} data-id={item.id} onClick={handleClick}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}

// ℹ️ In practice, the first approach is fine unless performance is critical
```

---

### ❌ Mistake 6: Not Stopping Propagation When Needed

```jsx
// BAD: Both handlers fire
function Modal({ onClose }) {
  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={onClose}>
        {" "}
        {/* ❌ Also closes! */}
        Modal content
      </div>
    </div>
  );
}

// ✅ GOOD: Stop propagation on modal
function Modal({ onClose }) {
  const handleModalClick = (e) => {
    e.stopPropagation(); // Don't trigger backdrop's onClick
  };

  return (
    <div className="backdrop" onClick={onClose}>
      <div className="modal" onClick={handleModalClick}>
        Modal content
      </div>
    </div>
  );
}
```

---

## 13. Event Handlers in Class Components

For completeness, here's how events work in class components:

### Method 1: Bind in Constructor (Best)

```jsx
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this); // ← Bind this
  }

  handleClick() {
    console.log("Clicked:", this.props.label);
  }

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

### Method 2: Arrow Function (Class Field)

```jsx
class Button extends React.Component {
  handleClick = () => {
    // ← Arrow function (auto-binds)
    console.log("Clicked:", this.props.label);
  };

  render() {
    return <button onClick={this.handleClick}>Click</button>;
  }
}
```

### Method 3: Inline Arrow Function (Less performant)

```jsx
class Button extends React.Component {
  handleClick() {
    console.log("Clicked:", this.props.label);
  }

  render() {
    return (
      <button onClick={() => this.handleClick()}>
        {" "}
        {/* New function every render */}
        Click
      </button>
    );
  }
}
```

---

## 14. Interview Questions

### Q1: What are Synthetic Events in React?

**Answer:** Synthetic Events are React's cross-browser wrapper around native browser events. They provide a consistent API across all browsers.

**Key points:**

- Same interface as native events (`preventDefault()`, `stopPropagation()`, etc.)
- Automatic cross-browser compatibility
- Access native event via `e.nativeEvent`

---

### Q2: Why do we use camelCase for event handlers?

**Answer:** React uses JSX (JavaScript), not HTML. In JavaScript, property names use camelCase convention. Also, it distinguishes React events from HTML attributes.

```jsx
// React (JSX)
<button onClick={handler}>Click</button>

// HTML
<button onclick="handler()">Click</button>
```

---

### Q3: What's the difference between preventDefault() and stopPropagation()?

**Answer:**

| Method              | Purpose                             | Example                                        |
| ------------------- | ----------------------------------- | ---------------------------------------------- |
| `preventDefault()`  | Stops **default browser behavior**  | Prevent form reload, link navigation           |
| `stopPropagation()` | Stops **event bubbling** to parents | Prevent parent's onClick when child is clicked |

```jsx
// preventDefault: Stop form submission
<form onSubmit={(e) => e.preventDefault()}>

// stopPropagation: Stop event from reaching parent
<div onClick={closeModal}>
  <div onClick={(e) => e.stopPropagation()}>
    Modal content
  </div>
</div>
```

---

### Q4: Why pass function reference instead of calling it?

**Answer:**

```jsx
// ❌ BAD: Function is called immediately during render
<button onClick={handleClick()}>Click</button>
// This executes handleClick() right now and passes the return value to onClick

// ✅ GOOD: Function reference is passed
<button onClick={handleClick}>Click</button>
// This passes the function itself, React calls it when button is clicked
```

**Exception:** When you need to pass arguments, wrap in arrow function:

```jsx
<button onClick={() => handleClick(id)}>Click</button>
```

---

### Q5: What's the difference between e.target and e.currentTarget?

**Answer:**

- **`e.target`**: Element that **triggered** the event (where event originated)
- **`e.currentTarget`**: Element the **handler is attached to**

```jsx
<div onClick={handler}>
  {" "}
  {/* currentTarget */}
  <button>Click</button> {/* target if button is clicked */}
</div>

// If you click the button:
// e.target = <button>
// e.currentTarget = <div>
```

---

### Q6: How does event bubbling work in React?

**Answer:** Events propagate from the target element up through parent elements (bubbling phase).

```jsx
<div onClick={() => console.log('Div')}>
  <button onClick={() => console.log('Button')}>Click</button>
</div>

// Click button:
// 1. "Button" (target)
// 2. "Div" (bubbles up)

// Stop bubbling:
<button onClick={(e) => {
  e.stopPropagation();
  console.log('Button');
}}>
```

---

### Q7: Why do forms need preventDefault()?

**Answer:** By default, HTML forms submit to the server and reload the page. In React SPAs:

- We want to handle submission in JavaScript (API calls, validation)
- We don't want page reload (loses React state)
- `e.preventDefault()` stops the default submission behavior

```jsx
<form onSubmit={(e) => {
  e.preventDefault(); // ← Prevents reload
  // Handle submission in React
}}>
```

---

### Q8: What changed in React 17 regarding events?

**Answer:** React 17 changed event delegation from `document` to the React root container.

**Why it matters:**

- Better support for multiple React versions on same page
- Easier integration with non-React code
- `e.stopPropagation()` now stops propagation to other React roots, not document

---

### Q9: How do you handle multiple inputs in a form?

**Answer:** Use a single handler with the `name` attribute:

```jsx
const [form, setForm] = useState({ username: '', email: '' });

const handleChange = (e) => {
  const { name, value } = e.target;
  setForm(prev => ({
    ...prev,
    [name]: value, // Dynamic key
  }));
};

<input name="username" value={form.username} onChange={handleChange} />
<input name="email" value={form.email} onChange={handleChange} />
```

---

### Q10: What was event pooling in React 16?

**Answer:** React 16 reused event objects for performance (event pooling). After the event handler, all properties were nullified.

**Problem:**

```jsx
const handleClick = (e) => {
  setTimeout(() => {
    console.log(e.target); // ❌ null in React 16!
  }, 1000);
};
```

**Solution (React 16):**

```jsx
const handleClick = (e) => {
  e.persist(); // Prevent pooling
  // OR
  const target = e.target; // Store before async
};
```

**React 17+:** Event pooling removed! No longer an issue.

---

## 15. Best Practices Summary

### ✅ Always Do:

1. Use camelCase for event handlers (`onClick`, not `onclick`)
2. Pass function reference, not call (`onClick={handler}`, not `onClick={handler()}`)
3. Use `preventDefault()` for forms/links
4. Use `stopPropagation()` when you need to prevent bubbling
5. Extract handlers into functions (not always inline)
6. Use meaningful handler names (`handleClick`, `handleSubmit`)

### ❌ Never Do:

1. Call function in JSX (`onClick={handleClick()}`)
2. Forget `preventDefault()` in form submissions
3. Confuse `target` with `currentTarget`
4. Access event object asynchronously without storing values (React 16 only)
5. Add too many inline arrow functions (performance in large lists)

### 🎯 Advanced:

- Use event delegation for dynamic lists
- Use `useCallback` to memoize handlers (performance optimization)
- Use data attributes to pass data instead of creating inline functions
- Consider debouncing for expensive operations (search, resize)

---

## 16. Quick Reference: All Event Handlers

### Mouse Events

- `onClick`, `onDoubleClick`
- `onMouseDown`, `onMouseUp`, `onMouseMove`
- `onMouseEnter`, `onMouseLeave`, `onMouseOver`, `onMouseOut`
- `onContextMenu` (right-click)

### Keyboard Events

- `onKeyDown`, `onKeyUp`, `onKeyPress` (deprecated)

### Form Events

- `onChange`, `onInput`, `onSubmit`
- `onFocus`, `onBlur`
- `onInvalid`

### Drag & Drop Events

- `onDrag`, `onDragStart`, `onDragEnd`
- `onDragEnter`, `onDragLeave`, `onDragOver`
- `onDrop`

### Clipboard Events

- `onCopy`, `onCut`, `onPaste`

### Touch Events (Mobile)

- `onTouchStart`, `onTouchMove`, `onTouchEnd`, `onTouchCancel`

### UI Events

- `onScroll`
- `onWheel` (mouse wheel)

### Media Events

- `onPlay`, `onPause`, `onEnded`
- `onLoadedData`, `onCanPlay`
- `onError`

### Other Events

- `onLoad`, `onError` (images, scripts)
- `onTransitionEnd`, `onAnimationEnd`

---

## Summary: Events Checklist

When working with events in React, ensure you:

- ✅ Use camelCase (`onClick`, not `onclick`)
- ✅ Pass function reference (`onClick={handler}`)
- ✅ Use `preventDefault()` for forms/links
- ✅ Use `stopPropagation()` when needed
- ✅ Understand `target` vs `currentTarget`
- ✅ Know event bubbling flow
- ✅ Use proper patterns for passing arguments
- ✅ Extract complex handlers into functions

Your event handling is interview-ready when you can explain:

1. What are Synthetic Events and why React uses them
2. Difference between `preventDefault()` and `stopPropagation()`
3. Difference between `target` and `currentTarget`
4. Event bubbling and how to stop it
5. Why pass function reference instead of calling it
6. How to handle events in lists without inline functions
