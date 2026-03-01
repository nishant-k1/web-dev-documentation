# React Server Components-RSC

React Server Components (RSC) allow you to render React components on the server without sending their JavaScript to the client.

| Feature                    | Explanation                                                           |
| -------------------------- | --------------------------------------------------------------------- |
| 🧠 **Runs on**             | Server only                                                           |
| 📦 **Sent to browser?**    | No — only the **HTML** is sent, not the JS                            |
| ⚡ **Performance benefit** | Less JavaScript = faster page loads and better user experience        |
| 🌐 **Used in**             | Next.js App Router, Remix, Shopify Hydrogen, etc.                     |
| 🔄 **Can access**          | Server-only code: databases, file system, secrets, etc.               |
| 🚫 **Cannot do**           | Event handling, state, `useEffect` — that’s for **Client Components** |

No, you cannot use React Server Components (RSC) out of the box in a normal React (CRA/Vite) project.
RSC currently needs a special framework setup like Next.js App Router.

React Server Components require:

- A custom server (to render and stream components)
- Special build tooling to separate server and client bundles
- A routing and rendering pipeline that can mix server + client components
- Streaming + serialization logic under the hood
- This is all not supported in Create React App (CRA), Vite, or standard React setups — unless you do a lot of manual setup (experimental and complex).

Where Can You Use RSC Today:

| Framework                | RSC Support              | Notes                                   |
| ------------------------ | ------------------------ | --------------------------------------- |
| **Next.js (App Router)** | ✅ Yes                   | Official, stable, production-ready      |
| Remix                    | 🔜 Partial / in progress | Experimental in some cases              |
| Shopify Hydrogen         | ✅ Yes                   | Custom framework for commerce using RSC |
| CRA / Vite               | ❌ No                    | No support for RSC                      |

What to Do Instead in CRA/Vite?

If you're not using Next.js App Router and want:
Server-side rendering → Use something like ReactDOMServer.renderToString() + Express
Data fetching on server → Use REST/GraphQL API calls in backend, and call them from client
Optimized performance → Use code splitting, lazy loading, memoization, etc.

“React Server Components require special server-side infrastructure and aren’t available in traditional React apps like CRA or Vite. They're fully supported in frameworks like Next.js App Router which handles the server-client split, routing, and streaming.”
