# Next.js

The Pages Router does not use React Server Components (RSC), but the App Router is built on top of RSC.

“The Pages Router uses traditional SSR/SSG and doesn’t support React Server Components. The App Router is designed around RSC and provides granular control over what runs on the server or client — enabling better performance, streaming, and less JavaScript on the client.”

| Feature                                     | **Pages Router (`/pages`)** | **App Router (`/app`)**                 |
| ------------------------------------------- | --------------------------- | --------------------------------------- |
| **React Server Components (RSC)**           | ❌ Not supported            | ✅ Fully supported                      |
| **Server ↔ Client component split**         | ❌ No per-component control | ✅ "use client" for CSR components      |
| **`getStaticProps` / `getServerSideProps`** | ✅ Used for data fetching   | ❌ Not used — replaced by async/`fetch` |
| **Streaming / Suspense Support**            | ❌ Not out of the box       | ✅ Supported                            |
| **Granular data fetching per component**    | ❌ Only at page level       | ✅ At any server component              |

## Data Fetching

| **Router Type**             | **Where to Fetch Data?**                                       | **Can Page Component Be `async`?** | **Why Not in Normal Components?**                                                     |
| --------------------------- | -------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------- |
| **App Router** (`app/`)     | Directly inside `page.tsx`, `layout.tsx`, or server components | ✅ Yes                             | Non-page components are usually reused and meant to be lightweight or client-rendered |
| **Pages Router** (`pages/`) | In `getStaticProps` / `getServerSideProps` / `getInitialProps` | ❌ No                              | Page component must be sync; Next.js handles data injection at render time            |

## Pages Router

- Uses traditional SSR or SSG — entire page is rendered on server or at build time.
- There is no concept of server vs client components.
- No built-in way to stream partial results (like Suspense support).
- Data fetching is restricted to page-level functions.

## App Router

- Uses React Server Components:

  1. You can define async components.
  2. You can fetch data directly inside those components.
  3. Only components with "use client" run in the browser.

- Fine-grained control: render some parts on server, some on client.
- Streaming and partial hydration are supported.
