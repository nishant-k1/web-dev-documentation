# Avoiding Over-fetching and Under-fetching

Optimizing data fetching - GraphQL benefits, REST optimization, and field selection strategies.

---

## Core Concept

**Over-fetching** - Getting more data than needed.
**Under-fetching** - Getting less data than needed (requires multiple requests).

---

## GraphQL Solution

```graphql
# Fetch only needed fields
query {
  user(id: "123") {
    name
    email
    # Only fetch name and email
  }
}
```

---

## REST Optimization

```javascript
// Include query params for field selection
GET /api/users?fields=name,email
```

---

## Summary

**Over/Under-fetching:**
- Over-fetching: Get only needed fields
- Under-fetching: Use field selection or GraphQL
- GraphQL solves both problems

**Key Takeaway:** Fetch only needed data. Use GraphQL field selection or REST query parameters to avoid over/under-fetching.

