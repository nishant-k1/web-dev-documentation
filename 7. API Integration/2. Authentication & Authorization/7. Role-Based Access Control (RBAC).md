# Role-Based Access Control (RBAC)

Understanding RBAC - roles, permissions, and implementing authorization based on user roles.

---

## Core Concept

**RBAC (Role-Based Access Control)** is an authorization model where access is controlled based on user roles.

**Key Concepts:**
- **Roles** - User categories (admin, user, moderator)
- **Permissions** - Actions users can perform (read, write, delete)
- **Resources** - What users can access (posts, users, settings)

---

## RBAC Structure

### Roles

**Roles** define user categories:

```
Admin - Full access
Moderator - Can moderate content
User - Basic access
Guest - Limited access
```

---

### Permissions

**Permissions** define what actions can be performed:

```
read:users - Can view users
write:users - Can create/edit users
delete:users - Can delete users
read:posts - Can view posts
write:posts - Can create/edit posts
delete:posts - Can delete posts
```

---

### Role-Permission Mapping

**Roles have permissions:**

```
Admin:
  - read:users ✅
  - write:users ✅
  - delete:users ✅
  - read:posts ✅
  - write:posts ✅
  - delete:posts ✅

Moderator:
  - read:users ✅
  - write:users ❌
  - delete:users ❌
  - read:posts ✅
  - write:posts ✅
  - delete:posts ✅

User:
  - read:users ✅
  - write:users ❌
  - delete:users ❌
  - read:posts ✅
  - write:posts ✅ (own posts only)
  - delete:posts ✅ (own posts only)
```

---

## Implementation

### Database Schema

**Users Table:**
```sql
users
  - id
  - email
  - password
  - role (admin, moderator, user)
```

**Roles Table (Optional - for complex systems):**
```sql
roles
  - id
  - name (admin, moderator, user)
  - permissions (JSON array)
```

---

### Backend: Role-Based Middleware

```javascript
// Middleware to check role
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
}

// Usage
app.get("/api/admin/users", authenticateToken, requireRole("admin"), (req, res) => {
  res.json({ users: [...] });
});

app.delete("/api/posts/:id", authenticateToken, requireRole("admin", "moderator"), (req, res) => {
  // Delete post
});
```

---

### Permission-Based Middleware

```javascript
// More granular - check specific permission
function requirePermission(permission) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const userPermissions = getPermissionsForRole(req.user.role);

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
}

function getPermissionsForRole(role) {
  const permissions = {
    admin: ["read:users", "write:users", "delete:users", "read:posts", "write:posts", "delete:posts"],
    moderator: ["read:users", "read:posts", "write:posts", "delete:posts"],
    user: ["read:users", "read:posts", "write:posts", "delete:posts"]
  };

  return permissions[role] || [];
}

// Usage
app.delete("/api/users/:id", authenticateToken, requirePermission("delete:users"), (req, res) => {
  // Delete user
});
```

---

## JWT with Roles

### Include Role in JWT

```javascript
// Login - include role in token
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ email });

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role, // Include role
      permissions: getPermissionsForRole(user.role) // Include permissions
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.json({ token });
});
```

---

### Extract Role from Token

```javascript
// Middleware extracts role from token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.user = {
      id: decoded.userId,
      role: decoded.role,
      permissions: decoded.permissions
    };

    next();
  });
}
```

---

## Frontend: Role-Based Rendering

### React: Conditional Rendering

```javascript
function Dashboard() {
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);
  const userRole = decoded?.role;

  return (
    <div>
      <h1>Dashboard</h1>
      
      {userRole === "admin" && (
        <button>Admin Panel</button>
      )}
      
      {(userRole === "admin" || userRole === "moderator") && (
        <button>Moderate Content</button>
      )}
      
      <button>My Profile</button>
    </div>
  );
}
```

---

### React: Protected Component

```javascript
function ProtectedComponent({ allowedRoles, children }) {
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);
  const userRole = decoded?.role;

  if (!allowedRoles.includes(userRole)) {
    return <div>Access Denied</div>;
  }

  return children;
}

// Usage
<ProtectedComponent allowedRoles={["admin", "moderator"]}>
  <AdminPanel />
</ProtectedComponent>
```

---

## Resource Ownership

### Own Resource Check

**Users can only modify their own resources:**

```javascript
// Middleware to check ownership
function requireOwnershipOrRole(resourceModel, ...allowedRoles) {
  return async (req, res, next) => {
    const resource = await resourceModel.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    // Check if user owns resource OR has required role
    const isOwner = resource.userId.toString() === req.user.id;
    const hasRole = allowedRoles.includes(req.user.role);

    if (!isOwner && !hasRole) {
      return res.status(403).json({ error: "Access denied" });
    }

    req.resource = resource;
    next();
  };
}

// Usage
app.delete("/api/posts/:id",
  authenticateToken,
  requireOwnershipOrRole(Post, "admin", "moderator"),
  async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  }
);
```

---

## Complete Example

### Backend: Full RBAC Implementation

```javascript
// Role definitions
const ROLES = {
  ADMIN: "admin",
  MODERATOR: "moderator",
  USER: "user"
};

const PERMISSIONS = {
  READ_USERS: "read:users",
  WRITE_USERS: "write:users",
  DELETE_USERS: "delete:users",
  READ_POSTS: "read:posts",
  WRITE_POSTS: "write:posts",
  DELETE_POSTS: "delete:posts"
};

const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.READ_USERS,
    PERMISSIONS.WRITE_USERS,
    PERMISSIONS.DELETE_USERS,
    PERMISSIONS.READ_POSTS,
    PERMISSIONS.WRITE_POSTS,
    PERMISSIONS.DELETE_POSTS
  ],
  [ROLES.MODERATOR]: [
    PERMISSIONS.READ_USERS,
    PERMISSIONS.READ_POSTS,
    PERMISSIONS.WRITE_POSTS,
    PERMISSIONS.DELETE_POSTS
  ],
  [ROLES.USER]: [
    PERMISSIONS.READ_USERS,
    PERMISSIONS.READ_POSTS,
    PERMISSIONS.WRITE_POSTS,
    PERMISSIONS.DELETE_POSTS
  ]
};

// Middleware
function requirePermission(permission) {
  return (req, res, next) => {
    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
}

// Routes
app.get("/api/users",
  authenticateToken,
  requirePermission(PERMISSIONS.READ_USERS),
  async (req, res) => {
    const users = await User.find();
    res.json({ users });
  }
);

app.delete("/api/users/:id",
  authenticateToken,
  requirePermission(PERMISSIONS.DELETE_USERS),
  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  }
);
```

---

## Common Questions

### Q: What's the difference between role and permission?

**A:**
- **Role** - User category (admin, user)
- **Permission** - Specific action (read:users, delete:posts)
- Roles have permissions

### Q: Should I check roles or permissions?

**A:** Permissions are more flexible. Roles are simpler. Use permissions for complex systems.

### Q: Can a user have multiple roles?

**A:** Yes, but it's complex. Usually one role per user is simpler.

### Q: How do I handle resource ownership?

**A:** Check if user owns resource OR has required role/permission.

---

## Related Topics

- [JWT Authentication Workflow](./1.%20JWT%20Authentication%20Workflow.md) - Including roles in JWT
- [Protected Routes](./4.%20Protected%20Routes.md) - Route-level authorization
- [Security Best Practices](./8.%20Security%20Best%20Practices.md) - Authorization security

---

## Summary

**RBAC Concepts:**
- **Roles** - User categories (admin, user, moderator)
- **Permissions** - Actions (read:users, delete:posts)
- **Role-Permission Mapping** - Which roles have which permissions

**Implementation:**
- Include role in JWT token
- Create middleware to check roles/permissions
- Check ownership for user resources
- Use permissions for granular control

**Key Points:**
- Roles are user categories
- Permissions are specific actions
- Check permissions for flexibility
- Check ownership for user resources

**Key Takeaway:** RBAC controls access based on roles and permissions. Include role in JWT, create middleware to check permissions, and handle resource ownership.

