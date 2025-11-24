# Apollo Client

Complete guide to Apollo Client - setup, queries, mutations, caching, error policies, and React integration.

---

## Core Concept

**Apollo Client** is a comprehensive GraphQL client for React with built-in caching, state management, and error handling.

---

## Setup

```javascript
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <YourApp />
    </ApolloProvider>
  );
}
```

---

## Queries

```javascript
import { useQuery, gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

function Users() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {data.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## Mutations

```javascript
import { useMutation, gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(input: { name: $name, email: $email }) {
      id
      name
    }
  }
`;

function CreateUser() {
  const [createUser, { loading, error }] = useMutation(CREATE_USER);

  const handleSubmit = async (name, email) => {
    try {
      const { data } = await createUser({
        variables: { name, email },
        refetchQueries: [{ query: GET_USERS }],
      });
      console.log('Created:', data.createUser);
    } catch (err) {
      console.error(err);
    }
  };

  return <button onClick={() => handleSubmit('John', 'john@example.com')}>Create</button>;
}
```

---

## Caching

```javascript
const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        fields: {
          posts: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
});
```

---

## Error Policies

```javascript
const { data, error } = useQuery(GET_USERS, {
  errorPolicy: 'all', // Return partial data even if errors
});
```

---

## Summary

**Apollo Client:**
- Comprehensive GraphQL client
- Built-in caching
- Error handling
- React hooks

**Key Takeaway:** Apollo Client provides complete GraphQL solution with caching, error handling, and React integration.

