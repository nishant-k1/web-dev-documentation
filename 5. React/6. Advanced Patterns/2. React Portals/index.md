# React Portals

## TL;DR

- **Portal** = Render children into a DOM node **outside** the parent component's DOM hierarchy
- **API:** `ReactDOM.createPortal(child, container)`
- **Use case:** Modals, tooltips, dropdowns, popovers that need to break out of parent
- **Event bubbling:** Events bubble through React tree, not DOM tree
- **Common problem solved:** Parent with `overflow: hidden` or `z-index` stacking issues
- **Import from:** `react-dom` (not `react`)
- **React 19 Update:** Now also available from `react-dom/client`

---

## 1. What are React Portals?

**React Portals** provide a way to render children into a DOM node that exists **outside the DOM hierarchy of the parent component**.

```jsx
ReactDOM.createPortal(child, container);
```

### The Problem Portals Solve

Without Portals:

```jsx
function App() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <h1>My App</h1>
      <Modal /> {/* ❌ Clipped by parent's overflow: hidden */}
    </div>
  );
}
```

**Problems:**

- Modal is clipped by parent's `overflow: hidden`
- `z-index` stacking context issues
- CSS positioning constraints
- Can't break out of parent container

---

### The Solution

```jsx
import ReactDOM from "react-dom";

function Modal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.body // ✅ Renders directly into <body>
  );
}

function App() {
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <h1>My App</h1>
      <Modal>This renders outside the parent div!</Modal>
    </div>
  );
}
```

**DOM Structure:**

```html
<body>
  <div id="root">
    <div style="position: relative; overflow: hidden;">
      <h1>My App</h1>
    </div>
  </div>

  <!-- Modal rendered here via Portal -->
  <div class="modal">This renders outside the parent div!</div>
</body>
```

---

## 2. Basic Portal Pattern

### Simple Example

```jsx
import { useState } from "react";
import ReactDOM from "react-dom";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

// Usage
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2>Modal Content</h2>
        <p>This is rendered via a Portal!</p>
      </Modal>
    </div>
  );
}
```

---

## 3. Creating a Dedicated Portal Container

### Best Practice: Portal Root Element

```html
<!-- public/index.html -->
<body>
  <div id="root"></div>
  <div id="portal-root"></div>
  <!-- Dedicated portal container -->
</body>
```

```jsx
// Portal component
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Portal({ children }) {
  const [portalRoot, setPortalRoot] = useState(null);

  useEffect(() => {
    // Get or create portal root
    let root = document.getElementById("portal-root");

    if (!root) {
      root = document.createElement("div");
      root.id = "portal-root";
      document.body.appendChild(root);
    }

    setPortalRoot(root);
  }, []);

  if (!portalRoot) return null;

  return ReactDOM.createPortal(children, portalRoot);
}

// Usage
function App() {
  return (
    <div>
      <h1>App Content</h1>
      <Portal>
        <div>This renders in #portal-root</div>
      </Portal>
    </div>
  );
}
```

---

## 4. Common Use Cases

### Use Case 1: Modal Dialog

```jsx
import ReactDOM from "react-dom";
import { useEffect } from "react";

function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body
  );
}

// CSS
/*
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
}
*/

// Usage
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
      >
        <p>Are you sure you want to proceed?</p>
        <button onClick={() => setIsOpen(false)}>Confirm</button>
      </Modal>
    </div>
  );
}
```

---

### Use Case 2: Tooltip

```jsx
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

function Tooltip({ children, content }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
  }, [isVisible]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>

      {isVisible &&
        ReactDOM.createPortal(
          <div
            className="tooltip"
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              transform: "translateX(-50%)",
              background: "#333",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "14px",
              zIndex: 9999,
            }}
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
}

// Usage
<Tooltip content="This is helpful information">
  <button>Hover me</button>
</Tooltip>;
```

---

### Use Case 3: Dropdown Menu

```jsx
function Dropdown({ trigger, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          <div
            className="dropdown-menu"
            style={{
              position: "absolute",
              top: position.top,
              left: position.left,
              background: "white",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              zIndex: 1000,
            }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => {
                  item.onClick();
                  setIsOpen(false);
                }}
                style={{
                  padding: "8px 16px",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

// Usage
<Dropdown
  trigger={<button>Menu ▼</button>}
  items={[
    { label: "Profile", onClick: () => console.log("Profile") },
    { label: "Settings", onClick: () => console.log("Settings") },
    { label: "Logout", onClick: () => console.log("Logout") },
  ]}
/>;
```

---

### Use Case 4: Toast Notifications

```jsx
// ToastContainer.jsx
import ReactDOM from "react-dom";
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {ReactDOM.createPortal(
        <div className="toast-container">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast toast-${toast.type}`}
              onClick={() => removeToast(toast.id)}
            >
              {toast.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}

// Usage
function App() {
  return (
    <ToastProvider>
      <MyComponent />
    </ToastProvider>
  );
}

function MyComponent() {
  const { addToast } = useToast();

  return (
    <button onClick={() => addToast("Action successful!", "success")}>
      Show Toast
    </button>
  );
}
```

---

## 5. Event Bubbling in Portals

**Key Feature:** Events in Portals bubble through the **React tree**, not the DOM tree!

```jsx
function Parent() {
  const handleClick = () => {
    console.log("Parent clicked!");
  };

  return (
    <div onClick={handleClick}>
      <h1>Parent Component</h1>
      <ModalPortal>
        <button>Click Me</button>
      </ModalPortal>
    </div>
  );
}

function ModalPortal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.body
  );
}
```

**Result:** Clicking the button in the modal **will trigger** the parent's `onClick` handler!

**Why?** React maintains the component tree structure for event bubbling, even though the DOM structure is different.

### Stopping Propagation

```jsx
function ModalPortal({ children }) {
  return ReactDOM.createPortal(
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>,
    document.body
  );
}
```

---

## 6. Portal with TypeScript

```typescript
import { ReactNode } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
  container?: HTMLElement;
}

function Portal({ children, container = document.body }: PortalProps) {
  return ReactDOM.createPortal(children, container);
}

// Modal with TypeScript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>,
    document.body
  );
}
```

---

## 7. Server-Side Rendering (SSR)

Portals with SSR require special handling:

```jsx
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function Portal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Don't render portal on server
  if (!mounted) return null;

  return ReactDOM.createPortal(children, document.body);
}
```

**Why?** `document.body` doesn't exist on the server, so we wait until client-side hydration.

---

## 8. Accessibility Considerations

### Focus Management

```jsx
import { useEffect, useRef } from "react";

function AccessibleModal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Save currently focused element
      previousActiveElement.current = document.activeElement;

      // Focus modal
      modalRef.current?.focus();

      // Trap focus in modal
      const handleTab = (e) => {
        if (e.key === "Tab") {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const first = focusableElements[0];
          const last = focusableElements[focusableElements.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            last.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener("keydown", handleTab);

      return () => {
        document.removeEventListener("keydown", handleTab);
        // Restore focus
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      ref={modalRef}
      className="modal"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {children}
      <button onClick={onClose}>Close</button>
    </div>,
    document.body
  );
}
```

---

## 9. Real-World Examples

### Example 1: Confirmation Dialog

```jsx
function useConfirm() {
  const [promise, setPromise] = useState(null);

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleConfirm = () => {
    promise?.resolve(true);
    setPromise(null);
  };

  const handleCancel = () => {
    promise?.resolve(false);
    setPromise(null);
  };

  const ConfirmDialog = () =>
    promise &&
    ReactDOM.createPortal(
      <div className="modal-backdrop">
        <div className="confirm-dialog">
          <p>Are you sure?</p>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>,
      document.body
    );

  return { confirm, ConfirmDialog };
}

// Usage
function DeleteButton() {
  const { confirm, ConfirmDialog } = useConfirm();

  const handleDelete = async () => {
    const confirmed = await confirm();
    if (confirmed) {
      // Delete item
      console.log("Deleted!");
    }
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      <ConfirmDialog />
    </>
  );
}
```

---

### Example 2: Full-Screen Overlay

```jsx
function FullScreenOverlay({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fullscreen-overlay"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90%",
          maxHeight: "90%",
        }}
      >
        {children}
      </div>
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          background: "white",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>,
    document.body
  );
}

// Usage
function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="gallery">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.thumbnail}
            onClick={() => setSelectedImage(img)}
          />
        ))}
      </div>

      <FullScreenOverlay
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      >
        {selectedImage && <img src={selectedImage.full} alt="" />}
      </FullScreenOverlay>
    </>
  );
}
```

---

## 10. Interview Questions

### Q1: What are React Portals?

**Answer:** Portals provide a way to render children into a DOM node that exists outside the parent component's DOM hierarchy.

```jsx
ReactDOM.createPortal(child, container);
```

---

### Q2: When should you use Portals?

**Answer:** Use Portals when you need to:

- Break out of parent CSS constraints (`overflow: hidden`, `z-index`)
- Render modals, tooltips, dropdowns
- Render components at the document root
- Avoid CSS stacking context issues

---

### Q3: How do events work in Portals?

**Answer:** Events bubble through the **React component tree**, not the DOM tree. Even though a Portal renders outside the parent in the DOM, React events still propagate as if it's a child in the component tree.

```jsx
<div onClick={handleClick}>
  {" "}
  {/* Will catch clicks from portal */}
  <Portal>
    <button>Click</button>
  </Portal>
</div>
```

---

### Q4: What's the difference between Portals and rendering to a different root?

**Answer:**

**Portal:** Still part of the same React tree, events bubble normally
**Different Root:** Separate React tree, events don't bubble between trees

```jsx
// Portal - Same React tree
ReactDOM.createPortal(child, container);

// Different Root - Separate tree
const root = ReactDOM.createRoot(container);
root.render(child);
```

---

### Q5: How do you handle SSR with Portals?

**Answer:** Check if `document` exists before rendering:

```jsx
function Portal({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return ReactDOM.createPortal(children, document.body);
}
```

---

### Q6: Can you nest Portals?

**Answer:** Yes! Portals can be nested, and events still bubble through the React tree:

```jsx
<Parent>
  <Portal container={document.body}>
    <Portal container={document.getElementById("nested")}>
      <Child />
    </Portal>
  </Portal>
</Parent>
```

---

### Q7: What's the performance impact of Portals?

**Answer:** Minimal. Portals don't add significant overhead:

- Same reconciliation as normal components
- No extra re-renders
- Just changes where content is rendered in DOM

---

### Q8: How do you manage focus with Portals?

**Answer:** Manually manage focus using refs and `useEffect`:

```jsx
const modalRef = useRef();

useEffect(() => {
  if (isOpen) {
    const previousElement = document.activeElement;
    modalRef.current?.focus();

    return () => previousElement?.focus();
  }
}, [isOpen]);
```

---

### Q9: Can Portals use Context?

**Answer:** Yes! Portals maintain the React tree, so Context works normally:

```jsx
<ThemeContext.Provider value="dark">
  <Portal>
    <Component /> {/* Can use ThemeContext */}
  </Portal>
</ThemeContext.Provider>
```

---

### Q10: What are alternatives to Portals?

**Answer:**

1. **Position: fixed** with high z-index (doesn't solve overflow issues)
2. **Separate React root** (loses React tree connection)
3. **Third-party libraries** (Radix UI, Headless UI with built-in portal support)

---

## Summary: Portal Checklist

When using Portals, ensure you:

- ✅ Understand they break DOM hierarchy but maintain React tree
- ✅ Use for modals, tooltips, dropdowns
- ✅ Handle SSR with mounted state check
- ✅ Manage focus and accessibility
- ✅ Remember events bubble through React tree
- ✅ Clean up portal elements if created dynamically
- ✅ Consider keyboard navigation (Escape to close, Tab trapping)

Your Portal knowledge is interview-ready when you can explain:

1. What Portals are (render outside parent DOM)
2. When to use them (modals, tooltips, breaking out of CSS)
3. Event bubbling behavior (React tree, not DOM tree)
4. SSR considerations (check for document)
5. Accessibility best practices (focus management)
6. Real-world use cases (modals, notifications, dropdowns)
