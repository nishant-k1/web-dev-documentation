# Page Router

## Data Fetching in SSR

- Data fetching like `getStaticProps` and `getServerSideProps` can only happen in page SSR components — not in normal (non-page) components.
- Next.js executes getStaticProps / getServerSideProps on the server, during build or per request.
- These functions run only for files inside /pages/ and only export values back to that page component as props.

### getStaticProps — For Static Site Generation (SSG)

Use this when your data doesn't change often.
Data is fetched only at build time.

Use Case:

- Blogs
- Marketing pages
- Product listings

```jsx
// pages/products.js

export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
    // Optional: regenerate the page every 10 seconds, // passing this props make the component from SSG, ISR
    revalidate: 10,
  };
}

export default function ProductsPage({ products }) {
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

### for ISR, pass revalidate prop

- Page is generated once at build time
- After the revalidate time has passed (e.g., 60 seconds), the next request triggers a background regeneration
- Once regeneration is complete, new version replaces the old version
- All this is invisible to the user — seamless updates!

### getServerSideProps — For Server-Side Rendering (SSR)

Use this when your data must be fresh on every request.

Use Case:

- Authenticated dashboards
- Live stock prices
- Personalized content

```jsx
// pages/dashboard.js

export async function getServerSideProps(context) {
  const res = await fetch("https://api.example.com/dashboard");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function DashboardPage({ data }) {
  return (
    <div>
      <h1>Dashboard (SSR)</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

## Data Fetching in CSR

Data fetching can happen in non-page components but the component must be CSR

```jsx
// components/MyComponent.js
import { useEffect, useState } from "react";

export default function MyComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/something")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return <div>{data ? data.title : "Loading..."}</div>;
}
```

### In page router we don't mark a component as 'use client' or 'use server', then how we nextjs decides a component is ssr or csr?

In the Pages Router, there is no "use client" or "use server" directive like in the App Router.

In the Pages Router, the entire page component is treated as a server-rendered (SSR) or statically rendered (SSG) HTML document, and hydrated on the client.

Components inside the page components are not automatically treated as SSR or CSR individually. They’re just React components — whether they run on the server or client depends on how they’re used.

It looks at the page-level data fetching functions:

- If the page uses getStaticProps, it does SSG (HTML built at build time).
- If the page uses getServerSideProps, it does SSR (render everything server-side first).
- If neither, it falls back to CSR (client fetches everything).

There is no "per-component" SSR/CSR logic in Pages Router. It's always decided at the page level.

| Scenario                                    | Who runs the component first? | How it's decided                                |
| ------------------------------------------- | ----------------------------- | ----------------------------------------------- |
| `getServerSideProps` used                   | Server                        | Page + all child components rendered on server  |
| `getStaticProps` used                       | Server (at build time)        | Page + all child components rendered statically |
| No data fetching used                       | Client by default (CSR)       | Unless pre-rendered with SSG                    |
| `useEffect` inside a component              | Runs only on **client**       | Because `useEffect` is client-only              |
| Component uses browser APIs (like `window`) | Client                        | Only works after hydration                      |

## What if in the non page component I use getStaticProps or getServerSideProps

In the Pages Router, if you try to use getStaticProps or getServerSideProps inside a non-page component, Next.js will completely ignore it — it won’t run, and you’ll get no error, but it won’t work.

Example:

```jsx
// components/ProductList.js
export async function getStaticProps() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function ProductList() {
  return <div>...</div>;
}
```

This `getStaticProps` function will never be called.
You’ll get no error, but no data either.
Why? Because Next.js only looks for getStaticProps or getServerSideProps in page-level files in /pages folder.
