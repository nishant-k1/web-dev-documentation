# React 19 New Features

## TL;DR

- **React 19** = Latest major version (Released 2024)
- **Key Features:** React Compiler, `ref` as prop, `use()` hook, Server Actions, improved Suspense
- **Breaking Changes:** `forwardRef` legacy, string refs removed, `defaultProps` deprecated
- **Performance:** Automatic memoization via React Compiler
- **DX Improvements:** Better error messages, ref cleanup, document metadata
- **Server:** Enhanced Server Components, streaming, form actions
- **Full React 19.2 features included**

---

## 1. React Compiler (Biggest Change)

### What is React Compiler?

The **React Compiler** (formerly "React Forget") automatically optimizes your components by adding `useMemo`, `useCallback`, and `React.memo` where needed.

### Before React 19 (Manual Optimization)

```jsx
// ❌ Need manual memoization
function ExpensiveList({ items, filter }) {
  // Manually memoize filtered items
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.category === filter);
  }, [items, filter]);

  // Manually memoize callback
  const handleClick = useCallback((id) => {
    console.log("Clicked:", id);
  }, []);

  return (
    <div>
      {filteredItems.map((item) => (
        <ExpensiveItem key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
}

// Manually wrap with React.memo
const ExpensiveItem = React.memo(function ExpensiveItem({ item, onClick }) {
  return <div onClick={() => onClick(item.id)}>{item.name}</div>;
});
```

---

### React 19 (Automatic Optimization)

```jsx
// ✅ React Compiler handles everything automatically
function ExpensiveList({ items, filter }) {
  // Compiler automatically memoizes
  const filteredItems = items.filter((item) => item.category === filter);

  // Compiler automatically memoizes callback
  const handleClick = (id) => {
    console.log("Clicked:", id);
  };

  return (
    <div>
      {filteredItems.map((item) => (
        <ExpensiveItem key={item.id} item={item} onClick={handleClick} />
      ))}
    </div>
  );
}

// No React.memo needed - compiler optimizes
function ExpensiveItem({ item, onClick }) {
  return <div onClick={() => onClick(item.id)}>{item.name}</div>;
}
```

**Compiler automatically:**

- Memoizes expensive computations
- Memoizes callbacks
- Prevents unnecessary re-renders
- Optimizes component rendering

---

### Enabling React Compiler

```bash
# Install compiler
npm install babel-plugin-react-compiler

# Or with experimental flag
npm install react@experimental react-dom@experimental
```

**Babel Config:**

```javascript
// babel.config.js
module.exports = {
  plugins: [
    [
      "babel-plugin-react-compiler",
      {
        runtimeModule: "react-compiler-runtime",
      },
    ],
  ],
};
```

---

## 2. ref as a Prop (No More forwardRef!)

### React 18 (forwardRef Required)

```jsx
import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Usage
const inputRef = useRef();
<Input ref={inputRef} />;
```

---

### React 19 (ref is a Regular Prop)

```jsx
// ✅ No forwardRef needed!
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// Usage (same)
const inputRef = useRef();
<Input ref={inputRef} />;
```

**Benefits:**

- Simpler code
- No forwardRef wrapper
- Consistent with other props
- TypeScript: `ref` is just another prop

**Note:** `forwardRef` still works but is considered legacy.

---

## 3. use() Hook

The **`use()`** hook reads Promises or Context with **conditional** support.

### Reading Promises

```jsx
import { use, Suspense } from "react";

async function fetchUser(id) {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
}

function UserProfile({ userPromise }) {
  const user = use(userPromise); // Suspends until resolved

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  const userPromise = fetchUser(123);

  return (
    <Suspense fallback={<Loading />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

---

### Reading Context

```jsx
import { use, createContext } from "react";

const ThemeContext = createContext();

function Button() {
  const theme = use(ThemeContext); // ✅ Works!
  return <button className={theme}>Click</button>;
}
```

---

### Conditional use() (New!)

```jsx
function Component({ showUser }) {
  // ✅ Conditional use() is allowed!
  const user = showUser ? use(userPromise) : null;

  if (!showUser) return <div>User hidden</div>;
  return <div>{user.name}</div>;
}

// ❌ Can't do this with useEffect or other hooks
function Component({ showUser }) {
  if (showUser) {
    useEffect(() => {
      /* ... */
    }); // ❌ Error: Conditional hook
  }
}
```

---

## 4. Server Actions

**Server Actions** let you call server functions directly from client components.

### Defining Server Actions

```javascript
// actions.js
"use server";

export async function createPost(formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  // Server-side database operation
  await db.posts.create({ title, content });

  // Revalidate cache
  revalidatePath("/posts");
}
```

---

### Using in Client Components

```jsx
"use client";

import { createPost } from "./actions";

function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />
      <button type="submit">Create Post</button>
    </form>
  );
}
```

**Benefits:**

- No API routes needed
- Type-safe
- Progressive enhancement (works without JS)
- Automatic loading states

---

### With useActionState

```jsx
"use client";

import { useActionState } from "react";
import { createPost } from "./actions";

function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createPost, {
    success: false,
    error: null,
  });

  return (
    <form action={formAction}>
      {state.error && <div className="error">{state.error}</div>}
      {state.success && <div className="success">Post created!</div>}

      <input name="title" />
      <textarea name="content" />

      <button disabled={isPending}>
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
```

---

## 5. Document Metadata

**React 19** lets you render `<title>`, `<meta>`, and `<link>` tags directly in components!

### Before React 19

```jsx
import { Helmet } from "react-helmet";

function Page() {
  return (
    <>
      <Helmet>
        <title>My Page</title>
        <meta name="description" content="Page description" />
      </Helmet>
      <div>Content</div>
    </>
  );
}
```

---

### React 19 (Native Support)

```jsx
function Page() {
  return (
    <>
      <title>My Page</title>
      <meta name="description" content="Page description" />
      <link rel="canonical" href="https://example.com/page" />

      <div>Content</div>
    </>
  );
}
```

**React automatically:**

- Hoists metadata to `<head>`
- Deduplicates tags
- Handles updates
- Works with SSR

---

## 6. Stylesheet Precedence

Control CSS loading order with `precedence` prop:

```jsx
function App() {
  return (
    <>
      {/* High precedence - loads first */}
      <link rel="stylesheet" href="/reset.css" precedence="high" />

      {/* Default precedence */}
      <link rel="stylesheet" href="/theme.css" precedence="default" />

      {/* Low precedence - loads last */}
      <link rel="stylesheet" href="/overrides.css" precedence="low" />

      <div>Content</div>
    </>
  );
}
```

**Ensures:** Correct CSS cascade order even with code-splitting.

---

## 7. Async Scripts

Scripts with `async` now work correctly with Suspense:

```jsx
function Analytics() {
  return <script async src="https://analytics.example.com/script.js" />;
}

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Analytics />
      <Content />
    </Suspense>
  );
}
```

**React ensures:** Script loads once, even if component renders multiple times.

---

## 8. Resource Preloading APIs

New APIs for preloading resources:

```jsx
import { preload, prefetchDNS, preconnect, preinit } from "react-dom";

function Component() {
  // Preload image
  preload("/hero.jpg", { as: "image" });

  // Prefetch DNS
  prefetchDNS("https://api.example.com");

  // Preconnect to origin
  preconnect("https://cdn.example.com");

  // Preinitialize script
  preinit("/analytics.js", { as: "script" });

  return <div>Content</div>;
}
```

---

## 9. Enhanced useOptimistic

```jsx
import { useOptimistic } from "react";

function TodoList({ todos }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  const addTodo = async (text) => {
    addOptimisticTodo({ id: Date.now(), text, pending: true });

    try {
      const saved = await saveTodo(text);
      // Optimistic update automatically removed
      // Real data shown
    } catch (error) {
      // Optimistic update automatically reverted
    }
  };

  return (
    <ul>
      {optimisticTodos.map((todo) => (
        <li key={todo.id} className={todo.pending ? "pending" : ""}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

---

## 10. Improved Suspense

### Siblings Don't Block

```jsx
// React 19: Siblings render independently
<Suspense fallback={<Loading />}>
  <SlowComponent /> {/* Takes 5 seconds */}
  <FastComponent /> {/* Takes 0.5 seconds */}
</Suspense>

// FastComponent shows after 0.5s
// SlowComponent shows after 5s
```

---

### Multiple Suspense Boundaries

```jsx
function Page() {
  return (
    <div>
      <h1>My Page</h1>

      {/* Header loads fast */}
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>

      {/* Content loads independently */}
      <Suspense fallback={<ContentSkeleton />}>
        <Content />
      </Suspense>

      {/* Sidebar loads independently */}
      <Suspense fallback={<SidebarSkeleton />}>
        <Sidebar />
      </Suspense>
    </div>
  );
}
```

---

## 11. Ref Cleanup Function

```jsx
function Component() {
  const ref = useRef();

  return (
    <input
      ref={(node) => {
        ref.current = node;

        // ✅ NEW: Cleanup function
        return () => {
          console.log("Ref cleanup");
          ref.current = null;
        };
      }}
    />
  );
}
```

---

## 12. Context as Provider (Simplified)

### React 18

```jsx
const ThemeContext = createContext();

<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>;
```

---

### React 19 (Simplified)

```jsx
const ThemeContext = createContext();

// ✅ Can use Context directly as provider
<ThemeContext value="dark">
  <App />
</ThemeContext>;
```

---

## 13. Breaking Changes

### 1. String Refs Removed

```jsx
// ❌ REMOVED: String refs
class Component extends React.Component {
  componentDidMount() {
    this.refs.input.focus(); // ❌ Error
  }

  render() {
    return <input ref="input" />; // ❌ Not supported
  }
}

// ✅ Use callback refs or createRef
class Component extends React.Component {
  inputRef = React.createRef();

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return <input ref={this.inputRef} />;
  }
}
```

---

### 2. defaultProps Deprecated (Function Components)

```jsx
// ⚠️ DEPRECATED
function Button({ color }) {
  return <button style={{ color }}>{children}</button>;
}

Button.defaultProps = {
  color: "blue",
};

// ✅ Use default parameters
function Button({ color = "blue", children }) {
  return <button style={{ color }}>{children}</button>;
}
```

---

### 3. Legacy Context Removed

```jsx
// ❌ REMOVED: Legacy context
class Parent extends React.Component {
  getChildContext() {
    return { theme: "dark" };
  }
}

// ✅ Use modern Context API
const ThemeContext = createContext();

<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>;
```

---

### 4. Module Pattern Components Unsupported

```jsx
// ❌ REMOVED: Module pattern
function createComponent() {
  return {
    render() {
      return <div>Hello</div>;
    },
  };
}

// ✅ Use standard function components
function Component() {
  return <div>Hello</div>;
}
```

---

## 14. Performance Improvements

### 1. Faster Reconciliation

- 30-50% faster reconciliation
- Better memory usage
- Optimized Fiber tree traversal

---

### 2. Better Hydration

- Faster SSR hydration
- Selective hydration improvements
- Better error recovery

---

### 3. Smaller Bundle Size

- 15% smaller production builds
- Better tree-shaking
- Removed unused code

---

## 15. Developer Experience

### 1. Better Error Messages

```jsx
// Before: "Maximum update depth exceeded"
// After: "Too many re-renders. React limits the number of renders to prevent an infinite loop.
//        This usually happens when you call setState inside render without conditions."
```

---

### 2. Improved DevTools

- Better component tree visualization
- Enhanced profiler
- Server Components debugging

---

### 3. TypeScript Improvements

- Better type inference
- Improved JSX types
- ref as prop types

---

## 16. Migration Guide

### Upgrading to React 19

```bash
# Update React
npm install react@19 react-dom@19

# Update types (if using TypeScript)
npm install @types/react@19 @types/react-dom@19
```

---

### Update Root API

```jsx
// Old
import ReactDOM from "react-dom";
ReactDOM.render(<App />, root);

// New
import { createRoot } from "react-dom/client";
createRoot(root).render(<App />);
```

---

### Replace forwardRef

```jsx
// Old
const Component = forwardRef((props, ref) => {
  return <div ref={ref} {...props} />;
});

// New
function Component({ ref, ...props }) {
  return <div ref={ref} {...props} />;
}
```

---

### Remove defaultProps

```jsx
// Old
function Button({ color, children }) {
  return <button style={{ color }}>{children}</button>;
}
Button.defaultProps = { color: "blue" };

// New
function Button({ color = "blue", children }) {
  return <button style={{ color }}>{children}</button>;
}
```

---

## 17. Interview Questions

### Q1: What's the biggest change in React 19?

**Answer:** The **React Compiler** (React Forget). It automatically optimizes components by memoizing values and callbacks, eliminating the need for manual `useMemo`, `useCallback`, and `React.memo` in most cases.

---

### Q2: How is ref different in React 19?

**Answer:** In React 19, `ref` is a regular prop! No need for `forwardRef` anymore:

```jsx
// React 19
function Component({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

---

### Q3: What is the use() hook?

**Answer:** `use()` reads Promises or Context and can be used **conditionally** (unlike other hooks):

```jsx
const user = use(userPromise); // Suspends until ready
const theme = use(ThemeContext); // Reads context

// Can be conditional!
const data = condition ? use(promise) : null;
```

---

### Q4: What are Server Actions?

**Answer:** Server Actions let you call server functions directly from client components without creating API routes:

```jsx
'use server';
export async function createPost(formData) {
  await db.posts.create({ ... });
}

// Client
<form action={createPost}>
  <button>Submit</button>
</form>
```

---

### Q5: Can you use <title> in React 19?

**Answer:** Yes! React 19 natively supports document metadata:

```jsx
function Page() {
  return (
    <>
      <title>My Page</title>
      <meta name="description" content="..." />
      <div>Content</div>
    </>
  );
}
```

React automatically hoists to `<head>`.

---

### Q6: What breaking changes should you know about?

**Answer:**

1. String refs removed (`ref="name"`)
2. `defaultProps` deprecated for function components
3. Legacy Context API removed
4. Module pattern components unsupported

---

### Q7: How do you enable React Compiler?

**Answer:** Install and configure the Babel plugin:

```bash
npm install babel-plugin-react-compiler
```

```javascript
// babel.config.js
plugins: [["babel-plugin-react-compiler"]];
```

---

### Q8: What's new with Suspense in React 19?

**Answer:**

- Siblings render independently
- Better streaming
- Works with `use()` hook
- Improved error recovery
- Multiple boundaries coordinate better

---

### Q9: Is forwardRef deprecated?

**Answer:** Not officially deprecated but considered **legacy**. React 19 makes `ref` a regular prop, so `forwardRef` is no longer needed in new code. It still works for backward compatibility.

---

### Q10: What are the resource preloading APIs?

**Answer:** New APIs for optimizing resource loading:

- `preload()` - Preload resources
- `prefetchDNS()` - DNS prefetch
- `preconnect()` - Preconnect to origins
- `preinit()` - Preinitialize scripts

---

## Summary: React 19 Checklist

Key React 19 features to know:

- ✅ React Compiler (automatic optimization)
- ✅ `ref` as regular prop (no `forwardRef`)
- ✅ `use()` hook (read Promises/Context conditionally)
- ✅ Server Actions (server functions in forms)
- ✅ Document metadata (native `<title>`, `<meta>`)
- ✅ Breaking changes (string refs, defaultProps)
- ✅ Enhanced Suspense
- ✅ Resource preloading APIs

Your React 19 knowledge is interview-ready when you can explain:

1. React Compiler and automatic memoization
2. ref as a prop (replaces forwardRef)
3. use() hook capabilities
4. Server Actions workflow
5. Document metadata support
6. Breaking changes and migration
7. Performance improvements
8. When to upgrade and how
