# Rendering Approaches in React

## 1. Client-Side Rendering (CSR)

**Where:** Browser  
**How:** Server sends bare HTML + JS. React loads, fetches data, and renders on the client.

**Pros:**

- Great interactivity
- Simple architecture
- Ideal for dashboards and apps after login

**Cons:**

- Slow initial load
- Weak SEO
- Heavy JS execution

**Best for:** Authenticated pages, dashboards, highly interactive UI.

---

## 2. Server-Side Rendering (SSR)

**Where:** Server  
**How:** React generates HTML on each request. Browser hydrates it later.

**Pros:**

- Faster first paint
- Strong SEO
- Good for e-commerce and public pages

**Cons:**

- Server load increases
- Hydration still needed on client

**Best for:** SEO pages, landing pages, product pages.

---

## 3. Static Site Generation (SSG)

**Where:** Build time  
**How:** HTML is pre-rendered during build.

**Pros:**

- Very fast
- Cheap hosting
- Excellent SEO

**Cons:**

- Data becomes stale unless rebuilt
- Not for fast-changing content

**Best for:** Blogs, documentation, marketing sites.

---

## 4. Incremental Static Regeneration (ISR)

**Where:** Build time + On-demand regeneration  
**How:** Pages regenerate on a schedule (example: every 60 seconds).

**Pros:**

- SSG speed with dynamic updates
- No full rebuilds required

**Cons:**

- Slight chance of stale content

**Best for:** News apps, catalogs, blogs with frequent updates.

---

## 5. Partial Hydration / Islands Architecture

**Where:** Server + Client (selective hydration)  
**How:** Only specific interactive components hydrate.

**Pros:**

- Lower JS cost
- Faster interactivity

**Cons:**

- More complex architecture

**Best for:** High-performance sites using modern frameworks.

---

## 6. React Server Components (RSC)

**Where:** Server only  
**How:** Components execute on server and never ship JS to client.

**Pros:**

- Very low client JS
- Optimal for data-heavy UI

**Cons:**

- New pattern
- Framework-dependent

**Best for:** Modern apps using Next.js App Router.

---

## 7. Streaming SSR

**Where:** Server → streamed to client  
**How:** HTML is streamed in chunks before the page fully renders.

**Pros:**

- Faster time-to-first-byte
- Works well with Suspense

**Cons:**

- Complex to implement

**Best for:** Large pages with progressive loading.

---

## 8. CSR with Code Splitting / Lazy Loading

**Where:** Browser  
**How:** Split bundles and load heavy components later.

**Pros:**

- Faster initial load
- Efficient for large apps

**Cons:**

- JS-heavy

**Best for:** Dashboards, apps with large components.

---

## 9. Hybrid Rendering

**Where:** Mixed (CSR + SSR + SSG + RSC)  
**How:** Combine best strategies.

**Example:**

- Marketing pages → SSG
- Product pages → SSR
- Dashboard → CSR
- Review section → RSC

---

# Quick Summary Table

| Approach          | Render Location       | Strength                           |
| ----------------- | --------------------- | ---------------------------------- |
| CSR               | Browser               | Interactivity                      |
| SSR               | Server                | SEO + faster first load            |
| SSG               | Build time            | Speed + cost efficiency            |
| ISR               | Build + timed rebuild | Fresh content without full rebuild |
| RSC               | Server                | Minimal client JS                  |
| Streaming SSR     | Server → stream       | Fast TTFB                          |
| Partial Hydration | Client selective      | Performance                        |
| Hybrid            | Mixed                 | Modern real-world apps             |
