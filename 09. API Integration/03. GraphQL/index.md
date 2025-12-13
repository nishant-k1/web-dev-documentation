# GraphQL

Understanding GraphQL - queries, mutations, subscriptions, Apollo Client, caching, and best practices.

---

## Topics

### 1. [Apollo Client](./1.%20Apollo%20Client.md)

### 2. [Strap+GraphQL](./Strap+GraphQL.md)

Complete guide to Apollo Client - setup, queries, mutations, caching, error policies, and React integration.

---

## GraphQL Basics

---

## 🔍 Basics

### 1. What is GraphQL?

GraphQL is a **query language for APIs** and a **runtime** for executing queries. It lets clients specify exactly what data they need, avoiding over-fetching or under-fetching.

---

### 2. REST vs GraphQL – Key Differences?

| Feature             | REST                   | GraphQL                          |
| ------------------- | ---------------------- | -------------------------------- |
| Data fetching       | Fixed endpoints        | Flexible, client-defined queries |
| Over/under-fetching | Common                 | Avoided                          |
| Versioning          | Requires new endpoints | Evolved via schema               |
| Tooling             | Manual docs            | Auto-docs with GraphiQL          |

---

## 🛠️ Core Components

### 3. Key Terms in GraphQL

- **Query**: Read data
- **Mutation**: Write/update/delete data
- **Subscription**: Real-time data over WebSockets
- **Schema**: Type definitions of data
- **Resolver**: Function that returns the actual data
- **Type System**: Defines `types`, `input`, `enum`, etc.

---

### 4. Example Query

```graphql
query GetUser {
  user(id: "123") {
    name
    email
  }
}
```

````

### 5. Example Mutation

```graphql
mutation AddUser {
  createUser(input: { name: "Nishant", email: "nishant@mail.com" }) {
    id
  }
}
```

---

## ⚛️ Using GraphQL with React/Next.js

### 6. How do you use GraphQL in React?

- Use Apollo Client or urql
- Example with Apollo:

```tsx
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

const Users = () => {
  const { data, loading, error } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  return (
    <div>
      {data.users.map((u) => (
        <p>{u.name}</p>
      ))}
    </div>
  );
};
```

---

### 7. What is Apollo Client?

A fully-featured GraphQL client for managing data and state in React. Features:

- Caching
- Query deduplication
- Error handling
- Devtools

---

### 8. How do you handle mutations in Apollo?

```tsx
import { useMutation, gql } from "@apollo/client";

const ADD_USER = gql`
  mutation ($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      id
    }
  }
`;

const [addUser] = useMutation(ADD_USER);
addUser({ variables: { name: "Nishant", email: "n@mail.com" } });
```

---

## 📦 Schema & Types

### 9. How is a GraphQL schema defined?

```graphql
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  user(id: ID!): User
}
```

---

### 10. What are GraphQL scalar types?

- `Int`, `Float`, `String`, `Boolean`, `ID`
- You can also create **custom scalars** (e.g., Date, JSON)

---

## 💡 Advanced Concepts

### 11. What is a resolver?

Resolver is a function that maps a query/mutation to actual data fetching logic.

```js
const resolvers = {
  Query: {
    user: (parent, args, context) => getUserById(args.id),
  },
};
```

---

### 12. How does caching work in Apollo?

Apollo uses **normalized caching**:

- Stores query results by type and ID
- Helps reduce refetching and enables optimistic UI updates

---

### 13. What is optimistic UI?

A way to **update the UI immediately** after mutation, assuming it will succeed.
Useful for creating a snappy experience.

---

### 14. What are GraphQL fragments?

Reusable chunks of a query:

```graphql
fragment UserInfo on User {
  id
  name
}

query {
  user(id: "1") {
    ...UserInfo
  }
}
```

---

## 🧪 Testing & Tools

### 15. How do you test GraphQL APIs?

- Use tools like **Apollo MockedProvider**
- Use **MSW** to mock network requests
- Use GraphiQL/Altair/Insomnia for manual testing

---

## 🔐 Security & Performance

### 16. Security Best Practices

- Query depth limiting
- Rate limiting
- Whitelisting allowed queries
- Input validation (especially in mutations)

---

### 17. Common pitfalls in GraphQL

- Overusing nesting = performance bottlenecks
- Not handling errors from nested fields
- Over-fetching without using fragments properly
- Uncontrolled query complexity

---

## 🎯 Real-World Scenario Qs

### 18. How do you fetch CMS data from a GraphQL API in Next.js?

- Use `getStaticProps()` with `graphql-request` or Apollo
- Use fragments for modular queries
- Apply ISR/SSG for performance

---

### 19. How would you debug slow GraphQL queries?

- Use Apollo DevTools to analyze resolver time
- Check N+1 query patterns in resolvers
- Use query complexity analysis tools

---

### 20. What if part of a GraphQL query fails?

- GraphQL returns partial data with `errors[]`
- Must handle `data` and `errors` in frontend gracefully

---


````
