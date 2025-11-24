# React Router Basics (v6)

## TL;DR
- Client-side routing for SPAs
- `BrowserRouter` wraps app
- `Routes` and `Route` define paths
- `Link` and `Navigate` for navigation
- `useNavigate`, `useParams`, `useLocation` hooks

## Setup

```bash
npm install react-router-dom
```

## Basic Setup

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Navigation

### Link Component

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}
```

### NavLink (with active state)

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => ({ color: isActive ? 'red' : 'black' })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

## Dynamic Routes

### URL Parameters

```jsx
// Define route with parameter
<Route path="/users/:userId" element={<UserProfile />} />

// Access parameter in component
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { userId } = useParams();
  
  return <div>User ID: {userId}</div>;
}

// Navigate to dynamic route
<Link to="/users/123">User 123</Link>
```

### Query Parameters

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q');
  const page = searchParams.get('page') || 1;
  
  return (
    <div>
      <p>Search: {query}</p>
      <p>Page: {page}</p>
      <button onClick={() => setSearchParams({ q: 'react', page: 2 })}>
        Update Search
      </button>
    </div>
  );
}

// URL: /search?q=react&page=1
```

## Nested Routes

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="stats" element={<Stats />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Layout component with Outlet
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav>{/* navigation */}</nav>
      <main>
        <Outlet /> {/* Child routes render here */}
      </main>
      <footer>{/* footer */}</footer>
    </div>
  );
}
```

## Programmatic Navigation

### useNavigate Hook

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
    navigate('/dashboard'); // Navigate after login
  };
  
  // Navigate with state
  const goToProfile = () => {
    navigate('/profile', { state: { from: 'login' } });
  };
  
  // Go back
  const goBack = () => {
    navigate(-1);
  };
  
  return <form onSubmit={handleSubmit}>{/* form */}</form>;
}
```

### Navigate Component

```jsx
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const isAuthenticated = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}
```

## Protected Routes

```jsx
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

// Usage
<Routes>
  <Route path="/dashboard" element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  } />
</Routes>
```

## Advanced Patterns

### 1. Role-Based Access

```jsx
function RequireRole({ children, allowedRoles }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
}

// Usage
<Route path="/admin" element={
  <RequireRole allowedRoles={['admin']}>
    <AdminPanel />
  </RequireRole>
} />
```

### 2. Lazy Loading with Routes

```jsx
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

### 3. 404 Not Found

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />
</Routes>

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}
```

### 4. Breadcrumbs

```jsx
import { useMatches } from 'react-router-dom';

function Breadcrumbs() {
  const matches = useMatches();
  
  return (
    <nav>
      {matches.map((match, index) => (
        <span key={match.pathname}>
          <Link to={match.pathname}>{match.handle?.crumb}</Link>
          {index < matches.length - 1 && ' > '}
        </span>
      ))}
    </nav>
  );
}

// Define breadcrumbs in routes
<Route path="/dashboard" element={<Dashboard />} handle={{ crumb: 'Dashboard' }} />
```

## Common Hooks

### useLocation

```jsx
import { useLocation } from 'react-router-dom';

function Component() {
  const location = useLocation();
  
  console.log(location.pathname); // '/about'
  console.log(location.search);   // '?page=1'
  console.log(location.state);    // passed state
  console.log(location.hash);     // '#section'
  
  return <div>Current path: {location.pathname}</div>;
}
```

### useParams

```jsx
import { useParams } from 'react-router-dom';

// Route: /users/:userId/posts/:postId
function Post() {
  const { userId, postId } = useParams();
  
  return <div>User {userId}, Post {postId}</div>;
}
```

### useSearchParams

```jsx
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get('q');
  const filter = searchParams.get('filter') || 'all';
  
  const updateFilter = (newFilter) => {
    setSearchParams({ q: query, filter: newFilter });
  };
  
  return (
    <div>
      <p>Searching for: {query}</p>
      <button onClick={() => updateFilter('recent')}>Recent</button>
    </div>
  );
}
```

## Common Interview Questions

### Q1: BrowserRouter vs HashRouter?

**Answer:**
- **BrowserRouter**: Clean URLs (`/about`), needs server config
- **HashRouter**: Hash URLs (`/#/about`), works without server config

### Q2: Link vs Navigate vs useNavigate?

**Answer:**
- **Link**: Declarative, for user clicks
- **Navigate**: Declarative redirect component
- **useNavigate**: Imperative, for programmatic navigation

### Q3: How to preserve state during navigation?

**Answer:** Use `state` option:

```jsx
navigate('/profile', { state: { from: 'dashboard' } });

// In target component
const location = useLocation();
console.log(location.state.from); // 'dashboard'
```

### Q4: How to implement breadcrumbs?

**Answer:** Use `useMatches` to get matched routes and build breadcrumb trail.

## Best Practices

1. **Use nested routes** for shared layouts
2. **Lazy load route components** for better performance
3. **Protect routes** with auth wrappers
4. **Use NavLink** for active states
5. **Handle 404s** with catch-all route
6. **Preserve state** during navigation when needed
7. **Use TypeScript** for route param types

## Common Pitfalls

### 1. Forgetting BrowserRouter

```jsx
// ❌ BAD
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

// ✅ GOOD
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 2. Using <a> Instead of <Link>

```jsx
// ❌ BAD - full page reload
<a href="/about">About</a>

// ✅ GOOD - SPA navigation
<Link to="/about">About</Link>
```

### 3. Not Using Outlet in Layout

```jsx
// ❌ BAD - nested routes won't render
function Layout() {
  return (
    <div>
      <nav>{/* nav */}</nav>
      {/* Missing Outlet! */}
    </div>
  );
}

// ✅ GOOD
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav>{/* nav */}</nav>
      <Outlet /> {/* Child routes render here */}
    </div>
  );
}
```

## Related Concepts

- **SPA**: Single Page Application
- **Client-side routing**: No server requests
- **Code splitting**: Lazy load routes
- **History API**: Browser history management

