# Base URLs and Versioning

Base URL configuration, API versioning strategies, environment-based URLs, and version management.

---

## Core Concept

**Base URL** is the common prefix for all API endpoints. **Versioning** allows API evolution without breaking clients.

---

## Base URL Configuration

### Environment-Based

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Usage
fetch(`${API_BASE_URL}/users`);
```

---

### Versioning Strategies

#### URL Versioning

```javascript
/api/v1/users
/api/v2/users
```

#### Header Versioning

```javascript
fetch('/api/users', {
  headers: {
    'API-Version': 'v2'
  }
});
```

---

## Summary

**Base URLs:**
- Configure per environment
- Use environment variables
- Version in URL or header

**Key Takeaway:** Use environment-based base URLs and version APIs to allow evolution without breaking clients.

