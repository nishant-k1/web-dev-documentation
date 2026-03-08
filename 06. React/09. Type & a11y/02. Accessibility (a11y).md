# Accessibility (a11y) in React

## TL;DR
- **a11y** = Accessibility (11 letters between 'a' and 'y')
- **Goal:** Make apps usable by everyone, including people with disabilities
- **Key areas:** Keyboard navigation, screen readers, ARIA attributes, focus management
- **WCAG:** Web Content Accessibility Guidelines (A, AA, AAA levels)
- **Tools:** axe DevTools, Lighthouse, React Testing Library
- **Benefits:** Legal compliance, better UX for all, SEO, larger audience
- **React-specific:** Semantic HTML, fragments, focus management, live regions

---

## 1. Why Accessibility Matters

### Legal Requirements

- **ADA** (Americans with Disabilities Act) - US law
- **Section 508** - US federal agencies
- **EN 301 549** - European standard
- **Lawsuits:** Companies sued for inaccessible websites

---

### Benefits

1. **Larger audience:** 15% of world population has disabilities
2. **Better UX for all:** Keyboard navigation helps power users
3. **SEO improvement:** Semantic HTML helps search engines
4. **Legal protection:** Compliance avoids lawsuits
5. **Brand reputation:** Shows you care about all users

---

## 2. WCAG Guidelines

**WCAG** (Web Content Accessibility Guidelines) has 3 levels:

- **Level A:** Minimum (must have)
- **Level AA:** Acceptable (should have) - **Most common target**
- **Level AAA:** Optimal (nice to have)

### Four Principles (POUR)

1. **Perceivable:** Information must be presentable to users
2. **Operable:** UI components must be operable
3. **Understandable:** Information and operation must be understandable
4. **Robust:** Content must work with assistive technologies

---

## 3. Semantic HTML

### Use Correct HTML Elements

```jsx
// ❌ BAD: Divs for everything
<div onClick={handleSubmit}>Submit</div>
<div onClick={handleClick}>Click Me</div>

// ✅ GOOD: Semantic elements
<button type="submit" onClick={handleSubmit}>Submit</button>
<button onClick={handleClick}>Click Me</button>

// ❌ BAD: Div for link
<div onClick={() => navigate('/about')}>About</div>

// ✅ GOOD: Actual link
<a href="/about">About</a>
```

**Why?**
- Screen readers announce element types
- Keyboard navigation works automatically
- Better semantics for assistive tech

---

### Semantic Structure

```jsx
// ✅ GOOD: Proper document structure
function Page() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <article>
          <h1>Page Title</h1>
          <section>
            <h2>Section 1</h2>
            <p>Content...</p>
          </section>
        </article>
      </main>

      <footer>
        <p>&copy; 2024 Company</p>
      </footer>
    </>
  );
}
```

---

## 4. ARIA Attributes

**ARIA** (Accessible Rich Internet Applications) adds accessibility information to HTML.

### Common ARIA Attributes

```jsx
function Examples() {
  return (
    <>
      {/* aria-label: Accessible name */}
      <button aria-label="Close modal">×</button>

      {/* aria-labelledby: Reference another element */}
      <div role="dialog" aria-labelledby="modal-title">
        <h2 id="modal-title">Confirm Delete</h2>
      </div>

      {/* aria-describedby: Additional description */}
      <input
        type="email"
        aria-describedby="email-hint"
      />
      <span id="email-hint">We'll never share your email</span>

      {/* aria-hidden: Hide from screen readers */}
      <span aria-hidden="true">★</span>

      {/* aria-live: Announce updates */}
      <div aria-live="polite" aria-atomic="true">
        {message}
      </div>

      {/* aria-expanded: Toggle state */}
      <button aria-expanded={isOpen} onClick={toggle}>
        Menu
      </button>

      {/* aria-disabled: Disabled but focusable */}
      <button aria-disabled="true" onClick={handleClick}>
        Disabled Button
      </button>
    </>
  );
}
```

---

### ARIA Roles

```jsx
// Navigation
<nav role="navigation">...</nav>

// Search
<form role="search">...</form>

// Alert
<div role="alert">Error: Invalid input</div>

// Dialog/Modal
<div role="dialog" aria-modal="true">...</div>

// Tablist
<div role="tablist">
  <button role="tab" aria-selected="true">Tab 1</button>
  <button role="tab" aria-selected="false">Tab 2</button>
</div>
<div role="tabpanel">Content</div>
```

---

## 5. Keyboard Navigation

### Tab Order

```jsx
// ✅ GOOD: Natural tab order
<form>
  <input type="text" /> {/* Tab 1 */}
  <input type="email" /> {/* Tab 2 */}
  <button type="submit">Submit</button> {/* Tab 3 */}
</form>

// ❌ BAD: Using positive tabindex
<input tabIndex={3} />
<input tabIndex={1} />
<input tabIndex={2} />

// ✅ GOOD: Remove from tab order if needed
<div tabIndex={-1}>Not keyboard accessible</div>

// ✅ GOOD: Make custom element focusable
<div tabIndex={0} role="button" onClick={handleClick}>
  Custom Button
</div>
```

---

### Keyboard Event Handlers

```jsx
function AccessibleButton({ onClick, children }) {
  const handleKeyDown = (e) => {
    // Activate on Enter or Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
```

---

### Skip Links

```jsx
function App() {
  return (
    <>
      {/* Skip to main content */}
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <header>
        <nav>
          {/* ... many links ... */}
        </nav>
      </header>

      <main id="main">
        <h1>Main Content</h1>
      </main>
    </>
  );
}

/* CSS */
/*
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
*/
```

---

## 6. Focus Management

### Auto-focus on Mount

```jsx
import { useRef, useEffect } from 'react';

function Modal({ isOpen, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      <h2>Modal Title</h2>
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </div>
  );
}
```

---

### Focus Trap

```jsx
import { useEffect, useRef } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => {
      modal.removeEventListener('keydown', handleTab);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      {children}
    </div>
  );
}
```

---

### Restore Focus

```jsx
function Modal({ isOpen, onClose }) {
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Save currently focused element
      previousFocusRef.current = document.activeElement;
    } else {
      // Restore focus when modal closes
      previousFocusRef.current?.focus();
    }
  }, [isOpen]);

  // ...
}
```

---

## 7. Forms

### Labels

```jsx
// ✅ GOOD: Label associated with input
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ GOOD: Wrapped label
<label>
  Email
  <input type="email" />
</label>

// ❌ BAD: No label
<input type="email" placeholder="Email" />

// ✅ GOOD: Visually hidden label
<label htmlFor="search" className="sr-only">Search</label>
<input id="search" type="search" placeholder="Search..." />
```

---

### Error Messages

```jsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? 'email-error' : undefined}
      />
      {error && (
        <div id="email-error" role="alert">
          {error}
        </div>
      )}
      <button type="submit">Login</button>
    </form>
  );
}
```

---

### Required Fields

```jsx
<label htmlFor="name">
  Name <span aria-label="required">*</span>
</label>
<input
  id="name"
  type="text"
  required
  aria-required="true"
/>
```

---

## 8. Images and Icons

### Alt Text

```jsx
// ✅ GOOD: Descriptive alt text
<img src="/logo.png" alt="Company Logo" />

// ✅ GOOD: Empty alt for decorative images
<img src="/decoration.png" alt="" />

// ❌ BAD: Missing alt
<img src="/photo.png" />

// ❌ BAD: Redundant alt
<img src="/photo.png" alt="Image of a photo" />
```

---

### Icon Buttons

```jsx
// ✅ GOOD: Icon with label
<button aria-label="Delete item">
  <TrashIcon aria-hidden="true" />
</button>

// ✅ GOOD: Icon with visible text
<button>
  <TrashIcon aria-hidden="true" />
  <span>Delete</span>
</button>

// ❌ BAD: Icon without label
<button>
  <TrashIcon />
</button>
```

---

## 9. Live Regions

### Announcements

```jsx
function Notifications() {
  const [message, setMessage] = useState('');

  const showNotification = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <>
      <button onClick={() => showNotification('Item added to cart')}>
        Add to Cart
      </button>

      {/* Screen reader announcement */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {message}
      </div>

      {/* Visual notification */}
      {message && (
        <div className="notification">
          {message}
        </div>
      )}
    </>
  );
}
```

---

### aria-live Values

```jsx
// Polite: Announce when user is idle
<div aria-live="polite">Updates available</div>

// Assertive: Announce immediately
<div aria-live="assertive" role="alert">
  Error: Form submission failed
</div>

// Off: Don't announce
<div aria-live="off">Loading...</div>
```

---

## 10. Color and Contrast

### Contrast Ratios

**WCAG AA Requirements:**
- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

```jsx
// ❌ BAD: Low contrast
<button style={{ background: '#ccc', color: '#ddd' }}>
  Click Me
</button>

// ✅ GOOD: High contrast
<button style={{ background: '#000', color: '#fff' }}>
  Click Me
</button>
```

---

### Don't Rely on Color Alone

```jsx
// ❌ BAD: Color only
<div style={{ color: 'red' }}>Error occurred</div>
<div style={{ color: 'green' }}>Success!</div>

// ✅ GOOD: Color + icon + text
<div style={{ color: 'red' }}>
  <ErrorIcon aria-hidden="true" />
  Error: Invalid input
</div>
<div style={{ color: 'green' }}>
  <SuccessIcon aria-hidden="true" />
  Success! Data saved
</div>
```

---

## 11. Testing Accessibility

### Manual Testing

```jsx
// Keyboard testing checklist:
// 1. Tab through all interactive elements
// 2. Use Enter/Space to activate buttons
// 3. Use arrow keys in custom components
// 4. Use Escape to close modals
// 5. Check focus is always visible
```

---

### Automated Testing

```bash
# Install testing libraries
npm install --save-dev jest-axe @testing-library/react
```

```jsx
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Component should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

### React Testing Library

```jsx
import { render, screen } from '@testing-library/react';

test('Button should be accessible', () => {
  render(<button>Click Me</button>);
  
  // Find by role
  const button = screen.getByRole('button', { name: 'Click Me' });
  expect(button).toBeInTheDocument();
});

test('Input should have accessible label', () => {
  render(
    <>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
    </>
  );
  
  // Find by label text
  const input = screen.getByLabelText('Email');
  expect(input).toBeInTheDocument();
});
```

---

## 12. Tools

### Browser DevTools

1. **Chrome DevTools:**
   - Lighthouse (Accessibility audit)
   - Accessibility tree
   - Color picker with contrast ratio

2. **Firefox DevTools:**
   - Accessibility inspector
   - Check for keyboard accessibility

---

### Extensions

1. **axe DevTools** - Free accessibility checker
2. **WAVE** - Web accessibility evaluation tool
3. **Lighthouse** - Built into Chrome DevTools

---

### Screen Readers

- **NVDA** (Windows) - Free
- **JAWS** (Windows) - Paid
- **VoiceOver** (macOS/iOS) - Built-in
- **TalkBack** (Android) - Built-in

---

## 13. Common Patterns

### Accessible Modal

```jsx
function Modal({ isOpen, onClose, title, children }) {
  const titleId = useId();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <h2 id={titleId}>{title}</h2>
      {children}
      <button onClick={onClose} aria-label="Close modal">
        ×
      </button>
    </div>
  );
}
```

---

### Accessible Tabs

```jsx
function Tabs({ tabs }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`panel-${index}`}
            id={`tab-${index}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`panel-${index}`}
          aria-labelledby={`tab-${index}`}
          hidden={activeTab !== index}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

---

## 14. Interview Questions

### Q1: What is accessibility (a11y)?

**Answer:** Accessibility means making web applications usable by everyone, including people with disabilities. This includes visual, auditory, motor, and cognitive impairments.

---

### Q2: What is WCAG?

**Answer:** Web Content Accessibility Guidelines - international standards for web accessibility with 3 levels (A, AA, AAA). Level AA is the most common target for compliance.

---

### Q3: What is ARIA?

**Answer:** Accessible Rich Internet Applications - a set of attributes that add accessibility information to HTML elements when semantic HTML isn't sufficient.

```jsx
<button aria-label="Close" aria-expanded="false">
  ×
</button>
```

---

### Q4: How do you make a custom button accessible?

**Answer:**

```jsx
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click Me
</div>
```

But better: **Use actual `<button>` element!**

---

### Q5: What is a focus trap and when do you need it?

**Answer:** A focus trap keeps keyboard focus within a specific element (usually a modal). Users can't Tab outside until they close it. Needed for modals, dialogs, and popovers.

---

### Q6: How do you handle form errors accessibly?

**Answer:**

```jsx
<input
  aria-invalid={hasError}
  aria-describedby={hasError ? 'error-message' : undefined}
/>
{hasError && (
  <div id="error-message" role="alert">
    Error message
  </div>
)}
```

---

### Q7: What is semantic HTML and why does it matter?

**Answer:** Using the correct HTML element for its intended purpose (`<button>` for buttons, `<nav>` for navigation). It provides:
- Automatic keyboard support
- Screen reader context
- Better SEO
- Cleaner code

---

### Q8: How do you announce dynamic content to screen readers?

**Answer:** Use live regions:

```jsx
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

---

### Q9: What tools can you use to test accessibility?

**Answer:**
- **Automated:** axe DevTools, Lighthouse, WAVE
- **Manual:** Keyboard testing, screen readers (NVDA, VoiceOver)
- **Code:** jest-axe, React Testing Library

---

### Q10: What's the difference between aria-label and aria-labelledby?

**Answer:**

**`aria-label`:** Direct string label
```jsx
<button aria-label="Close">×</button>
```

**`aria-labelledby`:** References another element's ID
```jsx
<h2 id="modal-title">Confirm Delete</h2>
<div aria-labelledby="modal-title">...</div>
```

---

## Summary: Accessibility Checklist

- ✅ Use semantic HTML
- ✅ Provide text alternatives (alt, aria-label)
- ✅ Ensure keyboard navigation works
- ✅ Manage focus properly
- ✅ Use sufficient color contrast
- ✅ Label all form inputs
- ✅ Announce dynamic content
- ✅ Test with keyboard and screen readers
- ✅ Use automated testing tools

Your a11y knowledge is interview-ready when you can explain:

1. Why accessibility matters (legal, UX, audience)
2. WCAG guidelines and levels
3. Semantic HTML importance
4. ARIA attributes and when to use them
5. Keyboard navigation requirements
6. Focus management patterns
7. Form accessibility best practices
8. Testing strategies



