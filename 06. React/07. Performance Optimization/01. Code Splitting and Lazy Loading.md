# Code Splitting and Lazy Loading

## TL;DR

- Split code into smaller bundles loaded on demand
- Use `React.lazy()` for component-level code splitting
- `Suspense` handles loading states
- Reduces initial bundle size
- Improves initial load time

## What is Code Splitting?

Instead of loading entire app upfront, load only what's needed:

```
❌ Before: app.js (500KB) - loads everything
✅ After:  main.js (100KB) + route1.js (50KB) + route2.js (50KB) ...
          Load main + route on demand
```

## React.lazy()

Dynamic imports for components:

```jsx
// ❌ Regular import - bundled together
import HeavyComponent from "./HeavyComponent";

// ✅ Lazy import - separate bundle
const HeavyComponent = React.lazy(() => import("./HeavyComponent"));
```

## Suspense

Handles loading state while lazy component loads:

```jsx
import { lazy, Suspense } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

## Real-World Examples

### 1. Route-Based Code Splitting

```jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load route components
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));
const Settings = lazy(() => import("./pages/Settings"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 2. Modal/Dialog Code Splitting

```jsx
import { lazy, Suspense, useState } from "react";

const HeavyModal = lazy(() => import("./HeavyModal"));

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>

      {showModal && (
        <Suspense fallback={<div>Loading modal...</div>}>
          <HeavyModal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  );
}
```

### 3. Tab-Based Code Splitting

```jsx
import { lazy, Suspense, useState } from "react";

const TabOne = lazy(() => import("./tabs/TabOne"));
const TabTwo = lazy(() => import("./tabs/TabTwo"));
const TabThree = lazy(() => import("./tabs/TabThree"));

function TabbedInterface() {
  const [activeTab, setActiveTab] = useState("one");

  const tabs = {
    one: TabOne,
    two: TabTwo,
    three: TabThree,
  };

  const ActiveComponent = tabs[activeTab];

  return (
    <div>
      <div className="tabs">
        <button onClick={() => setActiveTab("one")}>Tab 1</button>
        <button onClick={() => setActiveTab("two")}>Tab 2</button>
        <button onClick={() => setActiveTab("three")}>Tab 3</button>
      </div>

      <Suspense fallback={<div>Loading tab...</div>}>
        <ActiveComponent />
      </Suspense>
    </div>
  );
}
```

### 4. Conditional Feature Loading

```jsx
import { lazy, Suspense } from "react";

const AdminPanel = lazy(() => import("./AdminPanel"));
const UserDashboard = lazy(() => import("./UserDashboard"));

function App({ user }) {
  return (
    <Suspense fallback={<LoadingScreen />}>
      {user.isAdmin ? <AdminPanel /> : <UserDashboard />}
    </Suspense>
  );
}
```

### 5. Library Code Splitting

```jsx
// Split heavy libraries
const Chart = lazy(() => import("./Chart")); // Loads Chart.js

const HeavyEditor = lazy(async () => {
  const [module] = await Promise.all([
    import("./Editor"),
    // Preload related chunks
    import("./EditorPlugins"),
  ]);
  return module;
});
```

## Advanced Patterns

### 1. Named Exports with lazy()

```jsx
// Component with named export
export function MyComponent() {
  return <div>My Component</div>;
}

// Lazy load named export
const MyComponent = lazy(() =>
  import("./MyComponent").then((module) => ({
    default: module.MyComponent,
  }))
);
```

### 2. Error Boundaries with Suspense

```jsx
import { ErrorBoundary } from "react-error-boundary";

function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load</div>}>
      <Suspense fallback={<Loading />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

### 3. Retry Logic

```jsx
function lazyWithRetry(importFunc, retries = 3) {
  return lazy(() =>
    importFunc().catch((error) => {
      if (retries > 0) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(lazyWithRetry(importFunc, retries - 1));
          }, 1000);
        });
      }
      throw error;
    })
  );
}

const Component = lazyWithRetry(() => import("./Component"));
```

### 4. Preloading

```jsx
// Define lazy component
const HeavyComponent = lazy(() => import("./HeavyComponent"));

// Preload function
HeavyComponent.preload = () => import("./HeavyComponent");

// Use in component
function App() {
  return (
    <button
      onMouseEnter={() => HeavyComponent.preload()} // Preload on hover
      onClick={() => setShow(true)}
    >
      Show Component
    </button>
  );
}
```

## Webpack Magic Comments

```jsx
// Name the chunk
const Component = lazy(() =>
  import(/* webpackChunkName: "my-component" */ "./Component")
);

// Prefetch (idle time)
const Component = lazy(() => import(/* webpackPrefetch: true */ "./Component"));

// Preload (parallel with parent)
const Component = lazy(() => import(/* webpackPreload: true */ "./Component"));
```

## Performance Best Practices

### 1. Route-Based Splitting (Highest Impact)

```jsx
// ✅ GOOD - split by route
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

// ❌ BAD - splitting too granular
const Button = lazy(() => import("./Button")); // Too small!
```

### 2. Loading States

```jsx
// ✅ GOOD - meaningful loading
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>

// ❌ BAD - blank screen
<Suspense fallback={null}>
  <HeavyComponent />
</Suspense>
```

### 3. Bundle Size Monitoring

```bash
# Analyze bundle
npm run build -- --stats

# Use bundle analyzer
npm install --save-dev webpack-bundle-analyzer
```

## Common Interview Questions

### Q1: When should you use code splitting?

**Answer:**

- Routes (different pages)
- Large features (admin panel, editor)
- Heavy libraries (charts, markdown)
- Modals/dialogs
- Below-the-fold content

### Q2: What's the difference between lazy and dynamic import?

**Answer:**

- **Dynamic import**: Returns Promise of module
- **React.lazy**: Wraps dynamic import for components, works with Suspense

```jsx
// Dynamic import
const module = await import("./module");

// React.lazy
const Component = lazy(() => import("./Component"));
```

### Q3: Can you use lazy with SSR?

**Answer:** Not directly. Use libraries like Next.js with dynamic imports:

```jsx
import dynamic from "next/dynamic";

const Component = dynamic(() => import("./Component"), {
  ssr: false,
});
```

### Q4: How does Suspense know when to show fallback?

**Answer:** Lazy components "throw" a Promise while loading. Suspense catches it and shows fallback until Promise resolves.

## Common Pitfalls

### 1. Too Much Splitting

```jsx
// ❌ BAD - over-splitting
const Button = lazy(() => import("./Button"));
const Input = lazy(() => import("./Input"));
// Network overhead > benefit

// ✅ GOOD - reasonable chunks
const AdminPanel = lazy(() => import("./AdminPanel"));
```

### 2. Missing Error Boundaries

```jsx
// ❌ BAD - no error handling
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>

// ✅ GOOD - with error boundary
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

### 3. Suspense Inside Component

```jsx
// ❌ BAD - Suspense inside lazy component
const Component = lazy(() => import("./Component"));

function Component() {
  return <Suspense fallback={<Loading />}>{/* content */}</Suspense>;
}

// ✅ GOOD - Suspense outside
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>;
```

## Measuring Impact

```jsx
// Before code splitting
Initial bundle: 500KB
Time to Interactive: 3.2s

// After code splitting
Initial bundle: 150KB (-70%)
Time to Interactive: 1.1s (-66%)
Dashboard chunk: 100KB (loaded on demand)
Settings chunk: 50KB (loaded on demand)
```

## Related Concepts

- **React.lazy**: Component lazy loading
- **Suspense**: Loading boundaries
- **Dynamic imports**: ES6 feature
- **Webpack**: Bundler that enables splitting
- **Tree shaking**: Remove unused code
