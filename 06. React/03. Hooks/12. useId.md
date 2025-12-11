# `useId` Hook

## TL;DR
- Generates stable unique IDs for accessibility
- Works with Server-Side Rendering (SSR)
- Introduced in React 18
- Don't use for keys in lists
- Perfect for form inputs and ARIA attributes

## What is `useId`?

`useId` is a React Hook for generating unique IDs that are stable across server and client rendering. Essential for accessibility attributes like `aria-describedby` and linking labels to inputs.

## Syntax

```jsx
const id = useId();
```

## Why useId?

### ❌ Before useId (Problems)

```jsx
let nextId = 0;

function TextField() {
  // ❌ PROBLEM 1: Not unique across component instances
  const id = `field-${nextId++}`;
  
  // ❌ PROBLEM 2: Different IDs on server vs client (hydration mismatch)
  const id = `field-${Math.random()}`;
  
  return (
    <>
      <label htmlFor={id}>Name:</label>
      <input id={id} />
    </>
  );
}
```

### ✅ After useId (Solution)

```jsx
function TextField() {
  const id = useId(); // Stable, unique, SSR-safe
  
  return (
    <>
      <label htmlFor={id}>Name:</label>
      <input id={id} />
    </>
  );
}
```

## Basic Usage

### Form Inputs

```jsx
function NameField() {
  const id = useId();
  
  return (
    <div>
      <label htmlFor={id}>Name:</label>
      <input id={id} type="text" />
    </div>
  );
}
```

### Multiple IDs in Same Component

```jsx
function RegistrationForm() {
  const id = useId();
  
  return (
    <form>
      <div>
        <label htmlFor={`${id}-name`}>Name:</label>
        <input id={`${id}-name`} type="text" />
      </div>
      
      <div>
        <label htmlFor={`${id}-email`}>Email:</label>
        <input id={`${id}-email`} type="email" />
      </div>
      
      <div>
        <label htmlFor={`${id}-password`}>Password:</label>
        <input id={`${id}-password`} type="password" />
      </div>
    </form>
  );
}
```

## Real-World Examples

### 1. Accessible Form Field with Error

```jsx
function FormField({ label, error, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <div id={errorId} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

// Usage
function LoginForm() {
  const [errors, setErrors] = useState({});
  
  return (
    <form>
      <FormField 
        label="Email" 
        type="email"
        error={errors.email}
      />
      <FormField 
        label="Password" 
        type="password"
        error={errors.password}
      />
    </form>
  );
}
```

### 2. Accordion with ARIA

```jsx
function Accordion({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;
  
  return (
    <div>
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}
```

### 3. Tooltip with ARIA

```jsx
function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);
  const id = useId();
  
  return (
    <>
      <button
        aria-describedby={isVisible ? id : undefined}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </button>
      
      {isVisible && (
        <div id={id} role="tooltip">
          {content}
        </div>
      )}
    </>
  );
}
```

## Common Interview Questions

### Q1: Why not use Math.random() for IDs?

**Answer:** 
- Server renders with one ID
- Client hydrates with different ID
- Causes hydration mismatch errors
- useId generates matching IDs on server and client

### Q2: Can you use useId for list keys?

**Answer:** No! Keys need to be stable across renders and based on data, not generated.

```jsx
// ❌ WRONG - new key every render
items.map(item => <li key={useId()}>{item}</li>)

// ✅ CORRECT - stable key from data
items.map(item => <li key={item.id}>{item}</li>)
```

### Q3: Is useId unique globally or per component?

**Answer:** Unique across the entire app, including multiple instances of the same component. React ensures uniqueness.

### Q4: Does useId change on re-render?

**Answer:** No! Once generated, the ID stays the same for the component's lifetime.

## Common Pitfalls

### 1. **Using for List Keys**

```jsx
// ❌ WRONG
function List({ items }) {
  return items.map(item => (
    <Item key={useId()} {...item} />
  ));
}

// ✅ CORRECT
function List({ items }) {
  return items.map(item => (
    <Item key={item.id} {...item} />
  ));
}
```

### 2. **Using for CSS Selectors**

```jsx
// ⚠️ WORKS but IDs are ugly
const id = useId(); // :r1:
document.querySelector(`#${CSS.escape(id)}`);

// ✅ BETTER - use refs
const ref = useRef();
ref.current // Direct access
```

### 3. **Generating Multiple IDs Unnecessarily**

```jsx
// ❌ INEFFICIENT
function Form() {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
}

// ✅ BETTER
function Form() {
  const id = useId();
  const nameId = `${id}-name`;
  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;
}
```

## Best Practices

1. **Use for accessibility** - `htmlFor`, `aria-describedby`, etc.
2. **Generate once, suffix for multiple** - `${id}-suffix`
3. **Don't use for keys** - use data-based keys instead
4. **Don't rely on format** - IDs are opaque, may change between React versions
5. **Perfect for SSR** - automatically handles server/client consistency

## When to Use useId

✅ **Use for:**
- Linking labels to inputs (`htmlFor` / `id`)
- ARIA attributes (`aria-describedby`, `aria-labelledby`)
- Connecting form fields to error messages
- Accordion/tab panels
- Any accessibility-related IDs

❌ **Don't use for:**
- List keys (use data IDs)
- CSS selectors (use refs or classes)
- Database IDs (use actual data)
- Random number generation

## SSR Example

```jsx
// Server renders:
<label htmlFor=":r1:">Name</label>
<input id=":r1:" />

// Client hydrates with SAME IDs:
<label htmlFor=":r1:">Name</label>
<input id=":r1:" />

// ✅ No hydration mismatch!
```

## Related Concepts

- **htmlFor / id**: Linking labels to inputs
- **ARIA attributes**: Accessibility
- **SSR/Hydration**: Server-client consistency
- **useRef**: Alternative for DOM access



