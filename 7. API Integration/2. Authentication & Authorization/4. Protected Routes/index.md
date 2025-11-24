# Protected Routes

Understanding `protected routes`, `public routes`, and `private routes` - how authentication and authorization control route access.

---

## Core Concept

**Protected Routes** are routes that require authentication (and sometimes authorization) before access is granted.

**Route Types:**

- **Public Routes** - Anyone can access (no authentication)
- **Protected Routes** - Requires authentication
- **Private Routes** - Requires authentication + specific permissions

---

## What Are Protected Routes?

### Definition

**Protected Routes** are routes (pages/endpoints) that:

- Require user to be authenticated
- May require specific permissions/roles
- Block access if user is not authenticated/authorized

**Examples:**

- Dashboard (requires login)
- User profile (requires login)
- Admin panel (requires admin role)
- Settings (requires login)

---

## Public vs Protected vs Private

### Public Routes

**Anyone can access** - No authentication required.

**Examples:**

- Homepage
- Login page
- Signup page
- About page
- Public blog posts

**Implementation:**

```javascript
// No authentication check needed
app.get("/home", (req, res) => {
  res.render("home");
});
```

---

### Protected Routes

**Requires authentication** - User must be logged in.

**Examples:**

- Dashboard
- User profile
- Settings
- My orders

**Implementation:**

```javascript
// Requires authentication
app.get("/dashboard", requireAuth, (req, res) => {
  res.render("dashboard", { user: req.user });
});
```

---

### Private Routes

**Requires authentication + authorization** - User must be logged in AND have specific permissions.

**Examples:**

- Admin panel (admin role only)
- Delete user (admin only)
- Edit post (author only)
- View salary (HR only)

**Implementation:**

```javascript
// Requires authentication + admin role
app.get("/admin", requireAuth, requireAdmin, (req, res) => {
  res.render("admin");
});
```

---

## How Routes Are Protected

### Server-Side Protection

**Backend controls access** - Server checks authentication before sending data.

**How it works:**

1. User requests protected route
2. Server checks authentication token/session
3. If valid → Send data
4. If invalid → Return 401/403 error

**Example:**

```javascript
// Protected API endpoint
app.get('/api/users', authenticateToken, (req, res) => {
  // Only executes if token is valid
  res.json({ users: [...] });
});

// If token invalid → 401 Unauthorized
```

---

### Client-Side Protection

**Frontend controls navigation** - Prevents user from accessing route in UI.

**How it works:**

1. User tries to navigate to protected route
2. Frontend checks if user is authenticated
3. If authenticated → Allow navigation
4. If not → Redirect to login

**Example:**

```javascript
// React Router protection
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

// Usage
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>;
```

---

## Complete Protection Flow

### Frontend + Backend Protection

**Both sides protect routes:**

```
1. User navigates to /dashboard
   ↓
2. Frontend checks: Is user logged in?
   ├─ No → Redirect to /login
   └─ Yes → Continue
   ↓
3. Frontend renders dashboard
   ↓
4. Dashboard makes API request to /api/dashboard
   ↓
5. Backend checks: Is token valid?
   ├─ No → Return 401 → Frontend redirects to login
   └─ Yes → Return data → Dashboard displays
```

---

## Server-Side Protection Examples

### Express.js with JWT

```javascript
// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
}

// Protected route
app.get("/api/dashboard", authenticateToken, (req, res) => {
  res.json({ data: "Protected data" });
});
```

---

### Express.js with Session

```javascript
// Middleware to check session
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}

// Protected route
app.get("/api/dashboard", requireAuth, (req, res) => {
  res.json({ data: "Protected data" });
});
```

---

## Client-Side Protection Examples

### React Router

```javascript
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Usage
<Routes>
  <Route path="/login" element={<Login />} />
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
</Routes>;
```

---

### React Hook for Protection

```javascript
function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Verify token with server
      fetch("/api/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, loading };
}

// Usage
function Dashboard() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;

  return <div>Dashboard</div>;
}
```

---

## Role-Based Route Protection

### Admin-Only Routes

**Backend:**

```javascript
function requireAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  res.json({ users: [...] });
});
```

**Frontend:**

```javascript
function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  if (!token || decoded.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}
```

---

## Route Protection Patterns

### Pattern 1: Route Guard

```javascript
// Higher-order component
function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const token = localStorage.getItem("token");

    if (!token) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
```

---

### Pattern 2: Conditional Rendering

```javascript
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify and get user
      fetchUser(token).then(setUser);
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {user ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}
```

---

## Common Scenarios

### Scenario 1: User Refreshes Page

**Problem:** Token might be expired

**Solution:**

```javascript
function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsValid(false);
      return;
    }

    // Verify token with server
    fetch("/api/verify", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      if (res.ok) {
        setIsValid(true);
      } else {
        localStorage.removeItem("token");
        setIsValid(false);
      }
    });
  }, []);

  if (isValid === null) return <div>Loading...</div>;
  if (!isValid) return <Navigate to="/login" />;

  return children;
}
```

---

### Scenario 2: Token Expired During Navigation

**Problem:** Token expires while user is on page

**Solution:**

```javascript
// Intercept all API requests
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired - redirect to login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
```

---

## Best Practices

### 1. Protect Both Sides

```javascript
// ✅ Good - Protect frontend and backend
// Frontend: Prevent navigation
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>;

// Backend: Verify token
app.get("/api/dashboard", authenticateToken, handler);
```

---

### 2. Handle Token Expiration

```javascript
// ✅ Good - Check token on page load
useEffect(() => {
  verifyToken();
}, []);

// ✅ Good - Handle 401 errors
if (res.status === 401) {
  redirectToLogin();
}
```

---

### 3. Show Loading States

```javascript
// ✅ Good - Show loading while checking
if (loading) return <div>Loading...</div>;
if (!isAuthenticated) return <Navigate to="/login" />;
```

---

## Common Questions

### Q: Can user access protected route if they know the URL?

**A:**

- **Frontend:** Can navigate to URL, but won't see data (backend blocks)
- **Backend:** Cannot access data without valid token/session

**Always protect backend** - frontend protection is just UX.

---

### Q: What happens if user refreshes protected page?

**A:**

- Frontend checks token/session
- If valid → Page loads
- If invalid → Redirect to login

---

### Q: Should I protect frontend or backend?

**A:** **Both!**

- **Frontend:** Better UX (prevents navigation)
- **Backend:** Security (prevents data access)

Frontend protection is convenience, backend protection is security.

---

### Q: How does server know which route user is trying to access?

**A:** Server doesn't know about frontend routes. Server protects **API endpoints**, not frontend routes.

**Example:**

```
Frontend route: /dashboard
API endpoint: /api/dashboard-data

Server protects: /api/dashboard-data
Frontend protects: /dashboard (UI route)
```

---

## Related Topics

- [JWT Authentication](./1.%20JWT%20Authentication%20Workflow.md) - JWT for route protection
- [Session-Based Authentication](./2.%20Session-Based%20Authentication.md) - Sessions for route protection
- [HTTP Status Codes](../1.%20HTTP/3.%20HTTP%20Status%20Codes.md) - 401, 403 status codes
- [Error Handling](../1.%20HTTP/7.%20Error%20Handling.md) - Handling auth errors

---

## Summary

**Route Types:**

- **Public Routes** - No authentication required
- **Protected Routes** - Authentication required
- **Private Routes** - Authentication + authorization required

**Protection Levels:**

- **Frontend Protection** - Prevents navigation (UX)
- **Backend Protection** - Prevents data access (Security)

**Key Points:**

- Always protect backend (security)
- Protect frontend for better UX
- Handle token expiration
- Check authentication on page load/refresh
- Server protects API endpoints, not frontend routes

**Best Practice:** Protect both frontend (UX) and backend (security) for complete protection.
