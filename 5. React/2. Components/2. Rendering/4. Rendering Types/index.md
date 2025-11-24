# Rendering Types in React: CSR

## 1. **Client-Side Rendering (CSR)**

### 🧠 What is it?

- Entire app is rendered on the **client (browser)**.
- Initial HTML sent from server is mostly empty with just a `<div id="root">` and JavaScript scripts.
- React takes over after loading JS, builds Virtual DOM and renders the app.

### ✅ Use When:

- You need dynamic, interactive UIs.
- SEO is not critical or handled separately.

---

## 2. **Server-Side Rendering (SSR)**

### 🧠 What is it?

- Component is rendered to HTML on the **server** during each request.
- HTML is sent to the browser → fast first paint.
- Then **hydration** happens to attach event listeners.

### ✅ Use When:

- SEO is important.
- Fast First Contentful Paint is critical.
- You want fresh data on each request.

---

## 3. **Static Site Generation (SSG)**

### 🧠 What is it?

- HTML is generated at **build time**, not at runtime.
- Served as static files from CDN → extremely fast.
- Good for pages with **unchanging or rarely-changing** data.

### ✅ Use When:

- Content doesn't change often (docs, blog).
- You need fast performance + good SEO.

---

## 4. **Incremental Static Regeneration (ISR)** 🧠 _(Next.js only)_

### 🧠 What is it?

- A hybrid of SSG and SSR.
- Allows regeneration of **specific pages** in the background after deployment.

### ✅ Use When:

- You want the speed of SSG with dynamic data update capabilities.
- Large dynamic sites like e-commerce product pages.

---

## 5. **Streaming / React Server Components (RSC)** 🧠 _(Advanced)_

### 🧠 What is it?

- Introduced in React 18 and Next.js 13+
- Allows part of the UI to be rendered **on the server**, streamed in chunks.
- Some components are marked as **server components** (do not go to client).

### ✅ Use When:

- You want fine-grained control over SSR.
- Need to offload rendering cost from client.

---

## 6. **Hybrid Rendering (Mixed)**

### 🧠 What is it?

- You can mix CSR, SSR, SSG, ISR, and RSC on a **per-page or per-component basis** (especially in Next.js).

### ✅ Use When:

- Complex app with diverse needs (static pages, live feeds, etc.)

---

## Comparison Table

| Type | Where it Renders | When it Renders        | SEO Friendly | Speed | Use Case Example |
| ---- | ---------------- | ---------------------- | ------------ | ----- | ---------------- |
| CSR  | Browser (client) | After JS loads         | ❌           | 🟡    | SPA dashboards   |
| SSR  | Server           | On every request       | ✅           | 🟡    | News site        |
| SSG  | Build time       | Once at build          | ✅           | ✅    | Blog             |
| ISR  | Build + runtime  | Stale-while-revalidate | ✅           | ✅    | Product catalog  |
| RSC  | Server (chunks)  | On demand (streamed)   | ✅           | ✅    | Personalization  |
