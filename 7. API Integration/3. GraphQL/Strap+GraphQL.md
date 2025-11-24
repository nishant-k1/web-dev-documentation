# 📘 GraphQL with Strapi CMS – Interview Q&A Cheat Sheet

---

## 🔍 Basics

### 1. How does Strapi support GraphQL?

Strapi offers a **GraphQL plugin** that automatically exposes your content-types via a powerful GraphQL API. Once installed, you get:

- Auto-generated schema based on content types
- Queries, mutations, filters, pagination
- GraphiQL UI for testing

---

## 🔧 Setup

### 2. How do you enable GraphQL in Strapi?

- Install plugin:

```bash
npm install @strapi/plugin-graphql
```

- Enable in `config/plugins.js`:

```js
module.exports = {
  graphql: {
    enabled: true,
    config: {
      endpoint: "/graphql",
    },
  },
};
```

- Restart the Strapi server

---

## 📥 Querying Data

### 3. How do you query a collection type in Strapi?

```graphql
query {
  blogs {
    data {
      id
      attributes {
        title
        content
      }
    }
  }
}
```

---

### 4. How do you query a single type?

```graphql
query {
  homepage {
    data {
      attributes {
        heroTitle
        seo {
          metaTitle
        }
      }
    }
  }
}
```

---

### 5. How do you apply filters and pagination?

```graphql
query {
  blogs(
    filters: { title: { contains: "React" } }
    pagination: { page: 1, pageSize: 5 }
  ) {
    data {
      attributes {
        title
      }
    }
  }
}
```

---

## ✍️ Mutations

### 6. Can you perform mutations via GraphQL in Strapi?

✅ Yes, but you must enable it via permissions in the admin panel (Roles & Permissions).

Example:

```graphql
mutation {
  createBlog(data: { title: "GraphQL + Strapi", content: "Awesome combo!" }) {
    data {
      id
    }
  }
}
```

---

## ⚛️ Frontend Integration (React/Next.js)

### 7. How do you fetch data from Strapi GraphQL in Next.js?

- Use `graphql-request` or `Apollo Client`:

```ts
import { request, gql } from "graphql-request";

const query = gql`
  query {
    blogs {
      data {
        attributes {
          title
        }
      }
    }
  }
`;

export async function getStaticProps() {
  const data = await request("https://cms.example.com/graphql", query);
  return { props: { blogs: data.blogs } };
}
```

---

## 🧱 Custom Types & Components

### 8. How are dynamic zones and components handled in GraphQL?

Strapi exposes components inline inside `attributes`. For dynamic zones:

```graphql
{
  page {
    data {
      attributes {
        sections {
          __typename
          ... on ComponentHero {
            title
            subtitle
          }
          ... on ComponentGallery {
            images {
              url
            }
          }
        }
      }
    }
  }
}
```

---

## 🔐 Auth & Roles

### 9. How do you manage access to GraphQL APIs in Strapi?

- Go to Admin → Settings → Roles & Permissions
- Select Public or Authenticated
- Enable GraphQL actions like `find`, `findOne`, `create`, etc.
- You can also protect routes with JWT and use `Authorization` header

---

## 🧠 Best Practices

### 10. What are some GraphQL + Strapi best practices?

- Use `__typename` in dynamic zones for type safety
- Structure components logically for consistent schema
- Don’t expose sensitive fields (passwords, tokens)
- Use `populate: "*"`, or selectively populate relations

---

### 11. How do you handle SEO in Strapi via GraphQL?

- Add an SEO component to your content types
- Query the nested fields:

```graphql
query {
  page {
    data {
      attributes {
        seo {
          metaTitle
          metaDescription
        }
      }
    }
  }
}
```

---

## 🧪 Testing

### 12. How do you test Strapi GraphQL endpoints?

- Use tools like:
  - GraphiQL (built into Strapi)
  - Postman or Altair
  - Jest + Apollo MockedProvider
- Use MSW to mock GraphQL endpoints during testing

---

## 🎯 Scenario-Based

### 13. Your blog list page is loading slowly. What could be optimized?

- Use pagination (`page`, `pageSize`)
- Avoid `populate: "*"`, instead fetch only needed fields
- Cache GraphQL responses (e.g., SWR, Apollo)

---

### 14. A client needs a custom query not supported by default. What do you do?

- Create a **custom GraphQL resolver** in Strapi:
  - Create a service or controller
  - Extend GraphQL schema via `src/extensions/graphql`
  - Register custom query

---

### 15. How do you fetch draft content in Next.js from Strapi?

- Send the `Authorization` header with a **preview API token**
- Ensure you're querying with `publicationState: PREVIEW`

```ts
fetch("https://cms.example.com/graphql", {
  headers: { Authorization: `Bearer ${token}` },
});
```

---

## 🔗 Related Tools

| Tool            | Use Case                     |
| --------------- | ---------------------------- |
| Apollo Client   | Frontend GraphQL integration |
| graphql-request | Lightweight querying tool    |
| GraphiQL        | Test queries in Strapi UI    |
| MSW             | Mock GraphQL APIs in tests   |

---
