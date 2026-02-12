# React.lazy() & Suspense

## TL;DR

- **React.lazy()** = Dynamically import components (code splitting)
- **Suspense** = Show fallback UI while loading async components/data
- **Use case:** Reduce initial bundle size, lazy load routes/features
- **Syntax:** `const Component = lazy(() => import('./Component'))`
- **Requires:** Suspense boundary to catch loading state
- **React 18+:** Suspense also works for data fetching
- **React 19:** Enhanced Suspense with streaming and server components
- **Common pattern:** Route-based code splitting

---

## 1. What is React.lazy()?

**`React.lazy()`** lets you render a dynamic import as a regular component. It enables **code splitting** - breaking your app into smaller chunks that load on demand.

### Without lazy()

```jsx
import HeavyComponent from "./HeavyComponent";

function App() {
  return <HeavyComponent />; // ❌ Loaded immediately in bundle
}
```

**Problem:** `HeavyComponent` is included in the initial bundle, increasing load time.

---

### With lazy()

```jsx
import { lazy } from "react";

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return <HeavyComponent />; // ✅ Loaded only when rendered
}
```

**Result:** `HeavyComponent` is in a separate chunk, loaded only when needed!

---

## 2. What is Suspense?

**`Suspense`** lets you display a fallback UI while waiting for lazy components (or data) to load.

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

**Flow:**

1. React starts loading `HeavyComponent`
2. Shows `<div>Loading...</div>` fallback
3. Once loaded, renders `HeavyComponent`

---

## 3. Basic Patterns

### Pattern 1: Single Lazy Component

```jsx
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div>
      <button onClick={() => setShowDashboard(true)}>Load Dashboard</button>

      {showDashboard && (
        <Suspense fallback={<LoadingSpinner />}>
          <Dashboard />
        </Suspense>
      )}
    </div>
  );
}
```

---

### Pattern 2: Multiple Lazy Components

```jsx
const Profile = lazy(() => import("./Profile"));
const Settings = lazy(() => import("./Settings"));
const Help = lazy(() => import("./Help"));

function App() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab("profile")}>Profile</button>
        <button onClick={() => setActiveTab("settings")}>Settings</button>
        <button onClick={() => setActiveTab("help")}>Help</button>
      </nav>

      <Suspense fallback={<LoadingSpinner />}>
        {activeTab === "profile" && <Profile />}
        {activeTab === "settings" && <Settings />}
        {activeTab === "help" && <Help />}
      </Suspense>
    </div>
  );
}
```

---

### Pattern 3: Named Exports (Workaround)

`lazy()` only works with **default exports**. For named exports:

```jsx
// UserProfile.js
export function UserProfile() {
  return <div>User Profile</div>;
}

// App.js - Workaround for named export
const UserProfile = lazy(() =>
  import("./UserProfile").then((module) => ({
    default: module.UserProfile,
  }))
);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
    </Suspense>
  );
}
```

---

## 4. Route-Based Code Splitting

**Most common use case:** Split code by routes to reduce initial bundle.

```jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function PageLoader() {
  return (
    <div className="page-loader">
      <Spinner />
      <p>Loading page...</p>
    </div>
  );
}
```

---

## 5. Nested Suspense Boundaries

You can nest Suspense boundaries for granular loading states:

```jsx
const UserProfile = lazy(() => import("./UserProfile"));
const UserPosts = lazy(() => import("./UserPosts"));
const UserComments = lazy(() => import("./UserComments"));

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Separate loading state for profile */}
      <Suspense fallback={<div>Loading profile...</div>}>
        <UserProfile />
      </Suspense>

      {/* Separate loading state for posts and comments */}
      <Suspense fallback={<div>Loading content...</div>}>
        <UserPosts />
        <UserComments />
      </Suspense>
    </div>
  );
}
```

**Benefit:** Each section loads independently with its own loading indicator.

---

## 6. Error Boundaries with Suspense

Combine Error Boundaries with Suspense to handle loading failures:

```jsx
import { lazy, Suspense } from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error loading component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          Failed to load component.{" "}
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      );
    }

    return this.props.children;
  }
}

const HeavyComponent = lazy(() => import("./HeavyComponent"));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

## 7. Preloading Lazy Components

Manually preload components before they're needed:

```jsx
const Dashboard = lazy(() => import("./Dashboard"));

// Preload function
const preloadDashboard = () => {
  import("./Dashboard");
};

function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      {/* Preload on hover */}
      <Link to="/dashboard" onMouseEnter={preloadDashboard}>
        Go to Dashboard
      </Link>
    </div>
  );
}
```

---

### Better Preloading Pattern

```jsx
// utils/lazyWithPreload.js
export function lazyWithPreload(importFn) {
  const LazyComponent = lazy(importFn);

  LazyComponent.preload = importFn;

  return LazyComponent;
}

// Usage
const Dashboard = lazyWithPreload(() => import("./Dashboard"));

function HomePage() {
  return (
    <div>
      <Link to="/dashboard" onMouseEnter={() => Dashboard.preload()}>
        Dashboard
      </Link>
    </div>
  );
}
```

---

## 8. Suspense with Data Fetching (React 18+)

React 18+ Suspense can handle data fetching, not just components:

```jsx
import { Suspense } from "react";

// Suspend-aware data fetching library (e.g., React Query with suspense)
function UserProfile({ userId }) {
  const user = useSuspenseQuery(["user", userId], fetchUser);

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userId={123} />
    </Suspense>
  );
}
```

---

### Custom Suspense-Compatible Data Hook

```jsx
function wrapPromise(promise) {
  let status = "pending";
  let result;

  const suspender = promise.then(
    (data) => {
      status = "success";
      result = data;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
}

// Usage
const userResource = wrapPromise(fetch("/api/user").then((r) => r.json()));

function UserProfile() {
  const user = userResource.read(); // Suspends if not ready
  return <div>{user.name}</div>;
}

<Suspense fallback={<div>Loading...</div>}>
  <UserProfile />
</Suspense>;
```

---

## 9. React 19: Enhanced Suspense Features

### Streaming with Suspense (SSR)

```jsx
// React 19: Server Component with Suspense
import { Suspense } from "react";

async function ServerDataComponent() {
  const data = await fetchData(); // Server-side fetch
  return <div>{data.content}</div>;
}

export default function Page() {
  return (
    <div>
      <h1>Immediately Available Content</h1>

      <Suspense fallback={<Skeleton />}>
        <ServerDataComponent /> {/* Streams when ready */}
      </Suspense>
    </div>
  );
}
```

**Benefit:** HTML streams to client progressively. Fast content shows immediately, slow content streams when ready.

---

### use() Hook with Suspense (React 19)

```jsx
import { use, Suspense } from "react";

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
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
```

---

## 10. Real-World Examples

### Example 1: Admin Panel with Lazy Routes

```jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Eagerly loaded (small, always needed)
import Layout from "./Layout";
import Login from "./Login";

// Lazy loaded (large, conditionally needed)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Users = lazy(() => import("./pages/Users"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Settings = lazy(() => import("./pages/Settings"));
const Reports = lazy(() => import("./pages/Reports"));

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<PageLoader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="users"
          element={
            <Suspense fallback={<PageLoader />}>
              <Users />
            </Suspense>
          }
        />
        <Route
          path="analytics"
          element={
            <Suspense fallback={<PageLoader />}>
              <Analytics />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <Settings />
            </Suspense>
          }
        />
        <Route
          path="reports"
          element={
            <Suspense fallback={<PageLoader />}>
              <Reports />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
```

---

### Example 2: Modal with Lazy Content

```jsx
import { lazy, Suspense, useState } from "react";

const HeavyModalContent = lazy(() => import("./HeavyModalContent"));

function Modal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>

        <Suspense fallback={<ModalSkeleton />}>
          <HeavyModalContent />
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
```

---

### Example 3: Conditional Feature Loading

```jsx
const AdminPanel = lazy(() => import("./AdminPanel"));
const ModeratorPanel = lazy(() => import("./ModeratorPanel"));
const UserPanel = lazy(() => import("./UserPanel"));

function Dashboard({ user }) {
  let PanelComponent;

  if (user.role === "admin") {
    PanelComponent = AdminPanel;
  } else if (user.role === "moderator") {
    PanelComponent = ModeratorPanel;
  } else {
    PanelComponent = UserPanel;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading panel...</div>}>
        <PanelComponent user={user} />
      </Suspense>
    </div>
  );
}
```

---

### Example 4: Library Code Splitting

```jsx
// Split heavy libraries
const Chart = lazy(() =>
  import("react-chartjs-2").then((module) => ({
    default: module.Line,
  }))
);

const Editor = lazy(() =>
  import("react-quill").then((module) => ({
    default: module.default,
  }))
);

function Dashboard() {
  const [showChart, setShowChart] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      <button onClick={() => setShowEditor(true)}>Show Editor</button>

      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <Chart data={chartData} />
        </Suspense>
      )}

      {showEditor && (
        <Suspense fallback={<div>Loading editor...</div>}>
          <Editor value={content} onChange={setContent} />
        </Suspense>
      )}
    </div>
  );
}
```

---

## 11. Best Practices

### ✅ DO: Use Route-Based Splitting

```jsx
// ✅ Split by routes (most effective)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
```

### ✅ DO: Wrap in Suspense

```jsx
// ✅ Always wrap lazy components in Suspense
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### ✅ DO: Use Meaningful Fallbacks

```jsx
// ✅ Good: Informative fallback
<Suspense
  fallback={
    <div className="loading">
      <Spinner />
      <p>Loading dashboard...</p>
    </div>
  }
>
  <Dashboard />
</Suspense>
```

### ❌ DON'T: Lazy Load Small Components

```jsx
// ❌ BAD: Overhead > benefit for tiny components
const Button = lazy(() => import("./Button")); // Too small!

// ✅ GOOD: Import normally
import Button from "./Button";
```

### ❌ DON'T: Forget Error Boundaries

```jsx
// ❌ BAD: No error handling
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>

// ✅ GOOD: With error boundary
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

### ❌ DON'T: Lazy Load Inside Render

```jsx
// ❌ BAD: Creates new component every render
function App() {
  const LazyComponent = lazy(() => import("./Component"));
  return <LazyComponent />;
}

// ✅ GOOD: Define outside
const LazyComponent = lazy(() => import("./Component"));

function App() {
  return <LazyComponent />;
}
```

---

## 12. Performance Considerations

### Bundle Analysis

```bash
# Analyze bundle with webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

# Vite
npm install --save-dev rollup-plugin-visualizer
```

### Prefetching

```jsx
// Webpack magic comments for prefetching
const Dashboard = lazy(() =>
  import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "dashboard" */
    "./Dashboard"
  )
);
```

---

## 13. Interview Questions

### Q1: What is React.lazy()?

**Answer:** `React.lazy()` is a function that lets you render a dynamically imported component as a regular component. It enables code splitting by loading components only when needed.

```jsx
const Component = lazy(() => import("./Component"));
```

---

### Q2: What is Suspense?

**Answer:** `Suspense` is a React component that displays a fallback UI while waiting for lazy components (or data) to load.

```jsx
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

---

### Q3: Why do lazy components need Suspense?

**Answer:** Lazy components are loaded asynchronously. Suspense provides a way to show a fallback while the component is loading. Without Suspense, React doesn't know what to render during loading.

---

### Q4: Can lazy() work with named exports?

**Answer:** No, `lazy()` only works with **default exports**. Workaround:

```jsx
const Component = lazy(() =>
  import("./Module").then((module) => ({ default: module.NamedExport }))
);
```

---

### Q5: What's the difference between lazy loading and code splitting?

**Answer:**

**Code Splitting:** Breaking your bundle into smaller chunks
**Lazy Loading:** Loading those chunks only when needed

`React.lazy()` does both - it creates separate chunks AND loads them on demand.

---

### Q6: Can you nest Suspense boundaries?

**Answer:** Yes! Nested Suspense boundaries allow granular loading states:

```jsx
<Suspense fallback={<PageLoader />}>
  <Header />
  <Suspense fallback={<ContentLoader />}>
    <Content />
  </Suspense>
</Suspense>
```

---

### Q7: Does Suspense work with data fetching?

**Answer:** Yes, in React 18+! Suspense can handle data fetching with Suspense-aware libraries (React Query, SWR) or the `use()` hook (React 19).

---

### Q8: How do you handle errors with lazy components?

**Answer:** Use Error Boundaries:

```jsx
<ErrorBoundary>
  <Suspense fallback={<Loading />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

---

### Q9: What's the performance benefit of lazy()?

**Answer:**

- **Smaller initial bundle** → faster initial load
- **Faster Time to Interactive (TTI)**
- **Better user experience** for code that's not immediately needed
- **Reduced bandwidth** for users who don't visit all routes

---

### Q10: Can you preload lazy components?

**Answer:** Yes, by calling the import directly:

```jsx
const Dashboard = lazy(() => import("./Dashboard"));

// Preload
function preload() {
  import("./Dashboard");
}

<Link to="/dashboard" onMouseEnter={preload}>
  Dashboard
</Link>;
```

---

## Summary: lazy() & Suspense Checklist

When using lazy() and Suspense:

- ✅ Use for route-based code splitting
- ✅ Wrap lazy components in Suspense
- ✅ Provide meaningful fallback UI
- ✅ Add Error Boundaries for failed loads
- ✅ Consider preloading for better UX
- ✅ Analyze bundle to find splitting opportunities
- ✅ Don't lazy load tiny components (overhead > benefit)
- ✅ Use nested Suspense for granular loading states

Your lazy() & Suspense knowledge is interview-ready when you can explain:

1. What lazy() does (dynamic imports, code splitting)
2. Why Suspense is needed (fallback while loading)
3. Route-based code splitting pattern
4. Named export workaround
5. Error handling with Error Boundaries
6. React 18+ data fetching with Suspense
7. React 19 enhancements (`use()` hook, streaming)
8. Performance benefits and best practices
