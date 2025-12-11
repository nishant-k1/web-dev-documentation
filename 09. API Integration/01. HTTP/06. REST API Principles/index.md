# REST API Principles

Understanding RESTful API design principles and best practices.

---

## Core Concept

**REST (Representational State Transfer)** is an architectural style for designing web APIs.

**Key Principles:**
- ✅ **Stateless** - Each request contains all information
- ✅ **Resource-based** - URLs represent resources
- ✅ **HTTP methods** - Use HTTP methods correctly
- ✅ **Standard status codes** - Use appropriate status codes
- ✅ **JSON/XML** - Standard data formats

---

## What is REST?

**REST** is a set of principles for designing APIs, not a protocol or standard.

**RESTful API** = API that follows REST principles

**Key Idea:** Treat everything as a resource that can be accessed via URLs and manipulated with HTTP methods.

---

## REST Principles

### 1. Stateless

**Each request must contain all information needed to process it.**

**Example:**

```javascript
// ✅ Good - Stateless
fetch('/api/users/123', {
  headers: {
    'Authorization': 'Bearer token123' // Included in every request
  }
});

// ❌ Bad - Stateful (server remembers previous requests)
// First request: Login
// Second request: Get users (server remembers you're logged in)
```

**Benefits:**
- Scalable (any server can handle any request)
- Simple (no session management)
- Cacheable (responses can be cached)

---

### 2. Resource-Based URLs

**URLs represent resources, not actions.**

**Example:**

```javascript
// ✅ Good - Resource-based
GET    /api/users          → Get all users
GET    /api/users/123      → Get user 123
POST   /api/users          → Create user
PUT    /api/users/123      → Update user 123
DELETE /api/users/123      → Delete user 123

// ❌ Bad - Action-based
GET    /api/getUsers
POST   /api/createUser
POST   /api/updateUser
POST   /api/deleteUser
```

**Resource Naming:**
- Use nouns (users, posts, comments)
- Use plural nouns (users, not user)
- Use lowercase with hyphens (user-profiles, not userProfiles)

---

### 3. HTTP Methods for Actions

**Use HTTP methods to indicate actions, not URLs.**

**Example:**

```javascript
// ✅ Good - Method indicates action
GET    /api/users/123      → Retrieve
POST   /api/users          → Create
PUT    /api/users/123      → Update
DELETE /api/users/123      → Delete

// ❌ Bad - Action in URL
GET    /api/users/123/get
POST   /api/users/create
POST   /api/users/123/update
POST   /api/users/123/delete
```

---

### 4. Standard Status Codes

**Use appropriate HTTP status codes.**

**Example:**

```javascript
// ✅ Good - Appropriate status codes
POST   /api/users → 201 Created
GET    /api/users/123 → 200 OK
PUT    /api/users/123 → 200 OK
DELETE /api/users/123 → 204 No Content
GET    /api/users/999 → 404 Not Found

// ❌ Bad - Always 200
// All responses return 200 OK, even errors
```

---

### 5. JSON/XML Responses

**Use standard data formats.**

**Example:**

```json
// ✅ Good - JSON format
{
  "id": 123,
  "name": "John",
  "email": "john@example.com"
}

// ✅ Good - XML format
<user>
  <id>123</id>
  <name>John</name>
  <email>john@example.com</email>
</user>
```

---

## RESTful URL Design

### Resource Hierarchy

```
/api/users                    → Collection of users
/api/users/123               → Specific user
/api/users/123/posts         → Posts by user 123
/api/users/123/posts/456     → Specific post by user 123
```

### Query Parameters

```
/api/users?page=1&limit=10        → Pagination
/api/users?name=John&age=30       → Filtering
/api/users?sort=name&order=asc    → Sorting
```

**Use query parameters for:**
- Filtering
- Pagination
- Sorting
- Searching

---

## HTTP Methods for CRUD

### CRUD Operations

| Operation | HTTP Method | URL | Example |
|-----------|-------------|-----|---------|
| **Create** | POST | `/api/users` | Create new user |
| **Read** | GET | `/api/users/123` | Get user 123 |
| **Update** | PUT/PATCH | `/api/users/123` | Update user 123 |
| **Delete** | DELETE | `/api/users/123` | Delete user 123 |

---

### RESTful CRUD Examples

**Create (POST):**

```javascript
POST /api/users
Body: { "name": "John", "email": "john@example.com" }
Response: 201 Created
Location: /api/users/123
```

**Read (GET):**

```javascript
GET /api/users          → Get all users
GET /api/users/123      → Get user 123
GET /api/users/123/posts → Get posts by user 123
```

**Update (PUT/PATCH):**

```javascript
PUT /api/users/123
Body: { "id": 123, "name": "John Updated", "email": "new@example.com" }
Response: 200 OK

PATCH /api/users/123
Body: { "email": "new@example.com" }
Response: 200 OK
```

**Delete (DELETE):**

```javascript
DELETE /api/users/123
Response: 204 No Content
```

---

## RESTful Best Practices

### 1. Use Plural Nouns

```javascript
// ✅ Good
/api/users
/api/posts
/api/comments

// ❌ Bad
/api/user
/api/post
/api/comment
```

---

### 2. Use Nested Resources

```javascript
// ✅ Good - Nested resources
GET /api/users/123/posts        → Posts by user 123
POST /api/users/123/posts        → Create post for user 123
GET /api/users/123/posts/456     → Get post 456 by user 123

// ❌ Bad - Flat structure
GET /api/posts?userId=123
```

---

### 3. Use Query Parameters for Filtering

```javascript
// ✅ Good - Query parameters
GET /api/users?status=active&role=admin
GET /api/posts?author=123&published=true

// ❌ Bad - Path parameters
GET /api/users/status/active/role/admin
```

---

### 4. Version Your API

```javascript
// ✅ Good - Version in URL
/api/v1/users
/api/v2/users

// ✅ Good - Version in header
GET /api/users
Headers: { 'API-Version': 'v2' }
```

---

### 5. Use Consistent Response Format

```javascript
// ✅ Good - Consistent format
{
  "data": {
    "id": 123,
    "name": "John"
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z"
  }
}

// ✅ Good - Error format
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "email": "Must be valid email"
    }
  }
}
```

---

## REST vs Other API Styles

### REST vs GraphQL

| Feature | REST | GraphQL |
|---------|------|---------|
| **Data Fetching** | Multiple endpoints | Single endpoint |
| **Over-fetching** | Common | Avoided |
| **Under-fetching** | Common | Avoided |
| **Caching** | HTTP caching | Custom caching |
| **Complexity** | Simple | More complex |

---

### REST vs RPC

| Feature | REST | RPC |
|---------|------|-----|
| **URLs** | Resource-based | Action-based |
| **Methods** | HTTP methods | Function calls |
| **Example** | `GET /api/users/123` | `POST /api/getUser` |

---

## Common REST Patterns

### Pagination

```javascript
GET /api/users?page=1&limit=10

Response:
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

---

### Filtering

```javascript
GET /api/users?status=active&role=admin&age=30

Response:
{
  "data": [...],
  "filters": {
    "status": "active",
    "role": "admin",
    "age": 30
  }
}
```

---

### Searching

```javascript
GET /api/users?search=john&fields=name,email

Response:
{
  "data": [...],
  "query": "john",
  "fields": ["name", "email"]
}
```

---

## RESTful API Design Checklist

✅ **URLs:**
- Use resource-based URLs
- Use plural nouns
- Use nested resources appropriately
- Use query parameters for filtering

✅ **Methods:**
- Use GET for retrieval
- Use POST for creation
- Use PUT/PATCH for updates
- Use DELETE for deletion

✅ **Status Codes:**
- Use 200 for successful GET/PUT/PATCH
- Use 201 for successful POST
- Use 204 for successful DELETE
- Use 4xx for client errors
- Use 5xx for server errors

✅ **Response Format:**
- Use consistent JSON structure
- Include error details
- Use standard data formats

---

## Common Mistakes

### Mistake 1: Using Verbs in URLs

```javascript
// ❌ Bad
GET /api/getUsers
POST /api/createUser

// ✅ Good
GET /api/users
POST /api/users
```

### Mistake 2: Not Using HTTP Methods Correctly

```javascript
// ❌ Bad - All POST
POST /api/users/get
POST /api/users/create
POST /api/users/update
POST /api/users/delete

// ✅ Good - Use appropriate methods
GET /api/users
POST /api/users
PUT /api/users/123
DELETE /api/users/123
```

### Mistake 3: Inconsistent Response Format

```javascript
// ❌ Bad - Inconsistent
{ "user": {...} }
{ "data": {...} }
{ "result": {...} }

// ✅ Good - Consistent
{ "data": {...} }
```

---

## Common Questions

### Q: What makes an API RESTful?

**A:** Following REST principles:
- Stateless
- Resource-based URLs
- HTTP methods for actions
- Standard status codes
- Standard data formats

### Q: Can I use POST for everything?

**A:** Technically yes, but it's not RESTful. Use appropriate HTTP methods.

### Q: Should I use PUT or PATCH?

**A:** 
- **PUT** - Replace entire resource
- **PATCH** - Partial update

Use PATCH for partial updates (more common).

---

## Related Topics

- [HTTP Methods](./2.%20HTTP%20Methods.md) - HTTP methods for REST
- [HTTP Status Codes](./3.%20HTTP%20Status%20Codes.md) - Status codes for REST
- [HTTP Headers](./4.%20HTTP%20Headers.md) - Headers in REST APIs
- [Error Handling](./7.%20Error%20Handling.md) - Error handling in REST APIs
- [GraphQL](../2.%20GraphQL/index.md) - Alternative to REST
- [API Styles](../API%20Styles/Types%20of%20API%20styles.md) - REST vs other API styles

---

## Summary

**REST Principles:**
- **Stateless** - Each request is independent
- **Resource-based** - URLs represent resources
- **HTTP methods** - Use methods correctly
- **Standard codes** - Use appropriate status codes
- **Standard formats** - Use JSON/XML

**RESTful URLs:**
- Use plural nouns (`/api/users`)
- Use nested resources (`/api/users/123/posts`)
- Use query parameters for filtering (`?page=1&limit=10`)

**CRUD Operations:**
- **Create** - POST `/api/users`
- **Read** - GET `/api/users/123`
- **Update** - PUT/PATCH `/api/users/123`
- **Delete** - DELETE `/api/users/123`

**Key Takeaway:** REST is about using HTTP properly - resources as URLs, methods as actions, status codes as results.

