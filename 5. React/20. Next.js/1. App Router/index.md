# App Router

“The App Router in Next.js supports native async server components for data fetching. Instead of `getStaticProps` or `getServerSideProps`, we use fetch() and configure its caching behavior for SSG, SSR, or ISR. Components are Server by default and become Client Components only if we explicitly use 'use client'.”

## Data Fetching in Server Components

In the **App Router (`app/` directory)**, data fetching is **no longer limited to pages only** — any **server component** can fetch data **directly**, thanks to **React Server Components (RSC)**.

There are no `getStaticProps` or `getServerSideProps` here — instead, you can use `async` functions directly inside server components.

---

### 📁 Folder-based Routing

- Pages are defined using folders (`/app/products/page.js`)
- Layouts (`layout.js`) wrap pages and can also fetch data
- Components are **Server Components by default** unless you mark them with `"use client"`

---

### 🔁 Static vs Server vs Client — How It’s Decided

| Scenario                                   | Where rendered                            | Notes                                             |
| ------------------------------------------ | ----------------------------------------- | ------------------------------------------------- |
| Server Component with no dynamic fetch     | **SSG (Static Generation)**               | Output is cached at build                         |
| Server Component with fetch (no cache)     | **SSR (Server-Side Rendered)**            | Runs on every request                             |
| `"use client"` marked component            | **CSR (Client-Side)**                     | Cannot use server-only features (e.g., DB access) |
| `fetch(..., { cache: 'no-store' })`        | **SSR**                                   | Forces no caching (fresh data on each request)    |
| `fetch(..., { next: { revalidate: 10 } })` | **ISR (Incremental Static Regeneration)** | Page revalidates after 10 seconds                 |

---

## 🔧 Example: Static Site Generation (SSG)

```tsx
// app/products/page.js
export const dynamic = "force-static"; // Optional, static by default

async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1>Products (SSG)</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 🔄 Example: Server-Side Rendering (SSR)

```tsx
// app/dashboard/page.js
export const dynamic = "force-dynamic"; // or use fetch(..., { cache: 'no-store' })

async function getDashboardData() {
  const res = await fetch("https://api.example.com/dashboard", {
    cache: "no-store",
  });
  return res.json();
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <div>
      <h1>Dashboard (SSR)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

## Example: Incremental Static Regeneration (ISR)

```tsx
// app/news/page.js
async function getNews() {
  const res = await fetch("https://api.example.com/news", {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div>
      <h1>Latest News (ISR)</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Data Fetching in Client Components (CSR)

```tsx
// app/components/MyClientComponent.js
"use client";
import { useEffect, useState } from "react";

export default function MyClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return <div>{data ? data.name : "Loading..."}</div>;
}
```

## "use client" vs "use server" in In App Router:

- All components are Server Components by default
- You must mark a component with "use client" at the top to make it a Client Component
- Client components can’t use fetch with caching, access databases, or call other async server functions

## ⚠️ What if you try getStaticProps or getServerSideProps in App Router?

It will not work at all — these APIs are exclusive to the Pages Router.
If you try to use them in app/, you’ll get a compile-time error.
