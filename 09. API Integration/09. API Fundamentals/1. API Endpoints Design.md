# API Endpoints Design

API endpoint structure, RESTful conventions, resource naming, and endpoint design patterns.

---

## Core Concept

**API endpoints** are URLs that represent resources and operations in a RESTful API.

**RESTful Conventions:**
- Use nouns for resources
- Use HTTP methods for actions
- Use plural nouns
- Use hierarchical structure

---

## Endpoint Patterns

### Resource-Based

```javascript
GET    /api/users           // List users
GET    /api/users/123       // Get user 123
POST   /api/users           // Create user
PUT    /api/users/123       // Update user 123
PATCH  /api/users/123       // Partial update
DELETE /api/users/123       // Delete user 123
```

---

### Nested Resources

```javascript
GET    /api/users/123/posts        // Get posts by user 123
POST   /api/users/123/posts        // Create post for user 123
GET    /api/users/123/posts/456    // Get specific post
```

---

## Best Practices

### 1. Use Plural Nouns

```javascript
// ✅ Good
/api/users
/api/posts

// ❌ Bad
/api/user
/api/post
```

---

### 2. Use HTTP Methods Correctly

```javascript
// ✅ Good
GET    /api/users      // Read
POST   /api/users      // Create
PUT    /api/users/123  // Update
DELETE /api/users/123  // Delete

// ❌ Bad
GET /api/users/create  // Should be POST
GET /api/users/delete/123  // Should be DELETE
```

---

## Summary

**Endpoint Design:**
- Use nouns for resources
- Use HTTP methods for actions
- Use plural nouns
- Follow RESTful conventions

**Key Takeaway:** Design endpoints following RESTful conventions. Use nouns for resources, HTTP methods for actions, and maintain consistency.

