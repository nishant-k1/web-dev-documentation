# Compound Components Pattern

## TL;DR

- **Compound Components** = Components that work together to form a complete UI
- **Pattern:** Parent component manages state, children components access it via Context
- **Use case:** Build flexible, composable component APIs (e.g., `<Select>`, `<Menu>`, `<Tabs>`)
- **Key benefit:** Flexible composition, intuitive API, separation of concerns
- **Used by:** Radix UI, Headless UI, Reach UI, React Bootstrap
- **Modern implementation:** Context API + `React.cloneElement` or Context only
- **Think:** HTML `<select>` and `<option>` - they work together

---

## 1. What are Compound Components?

**Compound Components** are components designed to work together, sharing an implicit state. They form a cohesive UI pattern where the parent manages state and children consume it.

### Example from HTML

```html
<!-- <select> and <option> are compound components -->
<select>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

**They work together:**

- `<select>` manages state (selected value)
- `<option>` renders individual items
- They communicate implicitly

---

## 2. Why Use Compound Components?

### Problem: Prop Drilling Hell

```jsx
// ❌ BAD: Rigid, prop-heavy API
<Tabs
  tabs={[
    { label: "Tab 1", content: "Content 1" },
    { label: "Tab 2", content: "Content 2" },
  ]}
  defaultTab={0}
  onTabChange={handleChange}
/>
```

**Problems:**

- Inflexible structure
- Can't customize individual tabs
- Props get complex
- Hard to extend

---

### Solution: Compound Components

```jsx
// ✅ GOOD: Flexible, composable API
<Tabs defaultTab={0} onChange={handleChange}>
  <TabList>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>Content 1</TabPanel>
    <TabPanel>Content 2</TabPanel>
  </TabPanels>
</Tabs>
```

**Benefits:**

- Flexible composition
- Easy to customize
- Intuitive API
- Extensible

---

## 3. Basic Implementation

### Using Context API

```jsx
import { createContext, useContext, useState } from "react";

// 1. Create Context
const TabsContext = createContext();

// 2. Parent Component (manages state)
function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// 3. Child Components (consume state)
function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === index;

  return (
    <button
      className={isActive ? "tab active" : "tab"}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div className="tab-panels">{children}</div>;
}

function TabPanel({ children, index }) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== index) return null;

  return <div className="tab-panel">{children}</div>;
}

// 4. Attach child components to parent
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

// Usage
function App() {
  return (
    <Tabs defaultTab={0}>
      <Tabs.TabList>
        <Tabs.Tab index={0}>Profile</Tabs.Tab>
        <Tabs.Tab index={1}>Settings</Tabs.Tab>
        <Tabs.Tab index={2}>Messages</Tabs.Tab>
      </Tabs.TabList>

      <Tabs.TabPanels>
        <Tabs.TabPanel index={0}>Profile Content</Tabs.TabPanel>
        <Tabs.TabPanel index={1}>Settings Content</Tabs.TabPanel>
        <Tabs.TabPanel index={2}>Messages Content</Tabs.TabPanel>
      </Tabs.TabPanels>
    </Tabs>
  );
}
```

---

## 4. Automatic Index Assignment

Improve the API by automatically assigning indices:

```jsx
const TabsContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  // Clone children with automatic index assignment
  const childrenWithIndex = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { index });
    }
    return child;
  });

  return <div className="tab-list">{childrenWithIndex}</div>;
}

function Tab({ children, index }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === index;

  return (
    <button
      className={isActive ? "tab active" : "tab"}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

// Same for TabPanels and TabPanel...

// Usage (no manual indices!)
<Tabs defaultTab={0}>
  <Tabs.TabList>
    <Tabs.Tab>Profile</Tabs.Tab>
    <Tabs.Tab>Settings</Tabs.Tab>
    <Tabs.Tab>Messages</Tabs.Tab>
  </Tabs.TabList>

  <Tabs.TabPanels>
    <Tabs.TabPanel>Profile Content</Tabs.TabPanel>
    <Tabs.TabPanel>Settings Content</Tabs.TabPanel>
    <Tabs.TabPanel>Messages Content</Tabs.TabPanel>
  </Tabs.TabPanels>
</Tabs>;
```

---

## 5. Real-World Examples

### Example 1: Accordion

```jsx
const AccordionContext = createContext();

function Accordion({ children, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ children, index }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(index);

  return (
    <div className={`accordion-item ${isOpen ? "open" : ""}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { index, isOpen });
        }
        return child;
      })}
    </div>
  );
}

function AccordionHeader({ children, index }) {
  const { toggleItem } = useContext(AccordionContext);

  return (
    <button className="accordion-header" onClick={() => toggleItem(index)}>
      {children}
    </button>
  );
}

function AccordionPanel({ children, isOpen }) {
  if (!isOpen) return null;

  return <div className="accordion-panel">{children}</div>;
}

Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Panel = AccordionPanel;

// Usage
<Accordion allowMultiple>
  <Accordion.Item index={0}>
    <Accordion.Header>Section 1</Accordion.Header>
    <Accordion.Panel>Content 1</Accordion.Panel>
  </Accordion.Item>

  <Accordion.Item index={1}>
    <Accordion.Header>Section 2</Accordion.Header>
    <Accordion.Panel>Content 2</Accordion.Panel>
  </Accordion.Item>

  <Accordion.Item index={2}>
    <Accordion.Header>Section 3</Accordion.Header>
    <Accordion.Panel>Content 3</Accordion.Panel>
  </Accordion.Item>
</Accordion>;
```

---

### Example 2: Dropdown Menu

```jsx
const MenuContext = createContext();

function Menu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <MenuContext.Provider
      value={{ isOpen, setIsOpen, selectedValue, setSelectedValue }}
    >
      <div className="menu">{children}</div>
    </MenuContext.Provider>
  );
}

function MenuButton({ children }) {
  const { isOpen, setIsOpen } = useContext(MenuContext);

  return (
    <button className="menu-button" onClick={() => setIsOpen(!isOpen)}>
      {children}
    </button>
  );
}

function MenuList({ children }) {
  const { isOpen } = useContext(MenuContext);

  if (!isOpen) return null;

  return <div className="menu-list">{children}</div>;
}

function MenuItem({ children, value, onClick }) {
  const { setIsOpen, setSelectedValue } = useContext(MenuContext);

  const handleClick = () => {
    setSelectedValue(value);
    setIsOpen(false);
    onClick?.(value);
  };

  return (
    <button className="menu-item" onClick={handleClick}>
      {children}
    </button>
  );
}

Menu.Button = MenuButton;
Menu.List = MenuList;
Menu.Item = MenuItem;

// Usage
<Menu>
  <Menu.Button>Select Option ▼</Menu.Button>
  <Menu.List>
    <Menu.Item value="1" onClick={console.log}>
      Option 1
    </Menu.Item>
    <Menu.Item value="2" onClick={console.log}>
      Option 2
    </Menu.Item>
    <Menu.Item value="3" onClick={console.log}>
      Option 3
    </Menu.Item>
  </Menu.List>
</Menu>;
```

---

### Example 3: Modal Dialog

```jsx
const ModalContext = createContext();

function Modal({ children, isOpen, onClose }) {
  return (
    <ModalContext.Provider value={{ isOpen, onClose }}>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          {children}
        </div>
      )}
    </ModalContext.Provider>
  );
}

function ModalContent({ children }) {
  return (
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
}

function ModalHeader({ children }) {
  const { onClose } = useContext(ModalContext);

  return (
    <div className="modal-header">
      {children}
      <button className="close-button" onClick={onClose}>
        ×
      </button>
    </div>
  );
}

function ModalBody({ children }) {
  return <div className="modal-body">{children}</div>;
}

function ModalFooter({ children }) {
  return <div className="modal-footer">{children}</div>;
}

Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

// Usage
<Modal isOpen={isOpen} onClose={handleClose}>
  <Modal.Content>
    <Modal.Header>
      <h2>Confirm Action</h2>
    </Modal.Header>

    <Modal.Body>
      <p>Are you sure you want to proceed?</p>
    </Modal.Body>

    <Modal.Footer>
      <button onClick={handleClose}>Cancel</button>
      <button onClick={handleConfirm}>Confirm</button>
    </Modal.Footer>
  </Modal.Content>
</Modal>;
```

---

### Example 4: Form with Validation

```jsx
const FormContext = createContext();

function Form({ children, onSubmit, initialValues = {} }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateField = (name, value, rules) => {
    if (rules.required && !value) {
      return "This field is required";
    }
    if (rules.minLength && value.length < rules.minLength) {
      return `Minimum ${rules.minLength} characters required`;
    }
    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.message || "Invalid format";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    // ... validation logic

    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <FormContext.Provider
      value={{ values, errors, handleChange, validateField }}
    >
      <form onSubmit={handleSubmit}>{children}</form>
    </FormContext.Provider>
  );
}

function FormField({ name, label, validation = {}, ...props }) {
  const { values, errors, handleChange } = useContext(FormContext);

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={values[name] || ""}
        onChange={(e) => handleChange(name, e.target.value)}
        {...props}
      />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );
}

function SubmitButton({ children }) {
  return <button type="submit">{children}</button>;
}

Form.Field = FormField;
Form.Submit = SubmitButton;

// Usage
<Form onSubmit={handleLogin} initialValues={{ email: "" }}>
  <Form.Field
    name="email"
    label="Email"
    type="email"
    validation={{ required: true }}
  />
  <Form.Field
    name="password"
    label="Password"
    type="password"
    validation={{ required: true, minLength: 8 }}
  />
  <Form.Submit>Login</Form.Submit>
</Form>;
```

---

## 6. Advanced Patterns

### Pattern 1: Controlled vs Uncontrolled

```jsx
function Tabs({ children, value, defaultValue, onChange }) {
  // Controlled if value is provided
  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] = useState(defaultValue || 0);

  const activeTab = isControlled ? value : internalValue;

  const setActiveTab = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

// Uncontrolled usage
<Tabs defaultValue={0}>
  {/* ... */}
</Tabs>

// Controlled usage
<Tabs value={activeTab} onChange={setActiveTab}>
  {/* ... */}
</Tabs>
```

---

### Pattern 2: Render Props Integration

```jsx
function Tabs({ children, ...props }) {
  const [activeTab, setActiveTab] = useState(props.defaultTab || 0);

  const context = { activeTab, setActiveTab };

  return (
    <TabsContext.Provider value={context}>
      {typeof children === "function" ? children(context) : children}
    </TabsContext.Provider>
  );
}

// Usage with render prop
<Tabs>
  {({ activeTab }) => (
    <>
      <Tabs.TabList>
        <Tabs.Tab>Tab 1</Tabs.Tab>
        <Tabs.Tab>Tab 2</Tabs.Tab>
      </Tabs.TabList>

      <div>Active: {activeTab}</div>

      <Tabs.TabPanels>
        <Tabs.TabPanel>Content 1</Tabs.TabPanel>
        <Tabs.TabPanel>Content 2</Tabs.TabPanel>
      </Tabs.TabPanels>
    </>
  )}
</Tabs>;
```

---

### Pattern 3: Flexible Children Order

```jsx
function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// Flexible: TabPanels can come before TabList
<Tabs>
  <Tabs.TabPanels>
    <Tabs.TabPanel>Content 1</Tabs.TabPanel>
    <Tabs.TabPanel>Content 2</Tabs.TabPanel>
  </Tabs.TabPanels>

  <Tabs.TabList>
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
  </Tabs.TabList>
</Tabs>;
```

---

## 7. TypeScript Implementation

```typescript
import { createContext, useContext, useState, ReactNode } from "react";

interface TabsContextType {
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs compound components must be used within Tabs");
  }
  return context;
}

interface TabsProps {
  children: ReactNode;
  defaultTab?: number;
  onChange?: (index: number) => void;
}

function Tabs({ children, defaultTab = 0, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    onChange?.(index);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

interface TabProps {
  children: ReactNode;
  index?: number;
}

function Tab({ children, index }: TabProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === index;

  return (
    <button
      className={isActive ? "tab active" : "tab"}
      onClick={() => index !== undefined && setActiveTab(index)}
    >
      {children}
    </button>
  );
}

// Export
Tabs.Tab = Tab;
Tabs.TabList = TabList;
Tabs.TabPanel = TabPanel;
Tabs.TabPanels = TabPanels;

export { Tabs };
```

---

## 8. Best Practices

### ✅ DO: Use Context for State Sharing

```jsx
// ✅ GOOD: Context for implicit state sharing
const TabsContext = createContext();

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}
```

---

### ✅ DO: Provide Custom Hook for Context

```jsx
// ✅ GOOD: Custom hook with error checking
function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab components must be used within <Tabs>");
  }
  return context;
}
```

---

### ✅ DO: Attach Child Components to Parent

```jsx
// ✅ GOOD: Namespace components
Tabs.TabList = TabList;
Tabs.Tab = Tab;

// Usage
<Tabs>
  <Tabs.TabList>
    <Tabs.Tab>Tab 1</Tabs.Tab>
  </Tabs.TabList>
</Tabs>;
```

---

### ❌ DON'T: Require Specific Children Order

```jsx
// ❌ BAD: Rigid order requirement
// Only works if TabList comes before TabPanels

// ✅ GOOD: Flexible order
// Works regardless of children order
```

---

### ❌ DON'T: Overuse React.cloneElement

```jsx
// ❌ BAD: Overusing cloneElement
// Can cause performance issues and complexity

// ✅ GOOD: Prefer Context API
// Cleaner, more performant
```

---

## 9. Interview Questions

### Q1: What are Compound Components?

**Answer:** Compound Components are components designed to work together as a set, sharing implicit state through Context. They provide a flexible, composable API similar to HTML elements like `<select>` and `<option>`.

---

### Q2: Why use Compound Components?

**Answer:** Benefits:

- **Flexible composition** - Users control structure
- **Intuitive API** - Reads like HTML
- **Separation of concerns** - Each component has one job
- **Extensible** - Easy to add features
- **Better DX** - Less prop drilling

---

### Q3: How do Compound Components share state?

**Answer:** Through **Context API**. The parent component creates a Context Provider with shared state, and child components consume it using `useContext`.

---

### Q4: What's the difference between Compound Components and regular components?

**Answer:**

**Regular:**

- Single component
- All logic in one place
- Props for configuration
- Rigid structure

**Compound:**

- Multiple cooperating components
- Distributed logic
- Context for state sharing
- Flexible composition

---

### Q5: When should you use Compound Components?

**Answer:** Use when building:

- UI libraries (tabs, accordions, menus, modals)
- Components with multiple related parts
- Flexible, composable APIs
- Components where users need layout control

**Don't use for:**

- Simple, single-purpose components
- Components with fixed structure

---

### Q6: What are the drawbacks of Compound Components?

**Answer:**

- More complex implementation
- Requires understanding of Context
- Can be misused (wrong children)
- Harder to enforce structure
- More components to document

---

### Q7: How do you prevent misuse of compound components?

**Answer:**

1. Custom hook with error checking:

```jsx
function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Must be used within <Tabs>");
  }
  return context;
}
```

2. TypeScript for type safety
3. Clear documentation

---

### Q8: What's the difference between Compound Components and Render Props?

**Answer:**

**Compound Components:**

- Declarative composition
- Multiple named components
- Context for state
- More intuitive API

**Render Props:**

- Functional composition
- Single component with function prop
- Explicit data flow
- More explicit

---

### Q9: How do libraries like Radix UI use Compound Components?

**Answer:** Libraries like Radix UI, Headless UI use compound components for:

- Flexible composition
- Accessibility built-in
- Unstyled components
- Full user control over structure and styling

---

### Q10: Can you use Compound Components with TypeScript?

**Answer:** Yes! TypeScript enhances compound components with:

- Type-safe props
- Better autocomplete
- Error checking at compile time
- Self-documenting API

---

## Summary: Compound Components Checklist

When building compound components:

- ✅ Use Context API for state sharing
- ✅ Provide custom hook for consuming context
- ✅ Attach child components to parent (namespace)
- ✅ Make composition order flexible
- ✅ Add error checking for misuse
- ✅ Document the component API clearly
- ✅ Consider controlled vs uncontrolled variants
- ✅ Use TypeScript for type safety

Your compound components knowledge is interview-ready when you can explain:

1. What they are (cooperating components with shared state)
2. Why they're useful (flexible, composable API)
3. How they work (Context API for state sharing)
4. When to use them (UI libraries, flexible APIs)
5. Comparison with other patterns (HOCs, Render Props)
6. Real-world examples (Tabs, Accordion, Menu, Modal)
7. Best practices and common pitfalls
