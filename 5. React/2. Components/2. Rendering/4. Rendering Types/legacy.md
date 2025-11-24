# Rendering Types

## CSR

- In CSR, the conversion (rendering) of components to HTML happens in the browser — after the JS bundle is downloaded and executed.
- LifeCycle:

  1. Initial Page Load:

     - Browser downloads a minimal index.html file (just a <div id="root"></div> and some script tags).
     - No content is shown immediately because there’s no actual HTML for the page yet — just a loading screen or spinner.

  2. JavaScript Bundle Execution:

     - The browser loads your JS bundle (main.js), which contains your React components and rendering logic.

  3. React Takes Over:

     - React runs ReactDOM.createRoot().render(<App />).
     - At this moment, React:
       - Creates the virtual DOM tree.
       - Converts virtual DOM to real DOM nodes.
       - Injects the HTML elements into the real DOM (<div id="root">).

1. The browser initially receives **minimal HTML**:

   ```html
   <div id="root"></div>
   <script src="bundle.js"></script>
   ```

2. Once JavaScript loads:

   - React runs in the **browser**
   - JSX components are **converted to HTML** via React’s **Virtual DOM**
   - React updates the **real DOM** using `ReactDOM.createRoot().render(<App />)`

3. Then, the browser displays the generated HTML UI.

---

### 📦 Key Difference from SSR/SSG

| Step                 | **CSR**                       | **SSR / SSG**                |
| -------------------- | ----------------------------- | ---------------------------- |
| Where React runs     | 🧠 In **browser (client)**    | 🖥️ In **server (Node.js)**   |
| When HTML is created | After JS loads and runs       | Before browser sees the page |
| Initial HTML sent    | Just a `<div>` and `<script>` | Fully rendered HTML          |

---

### 🧠 Summary

> ✅ **Yes, components are always converted to HTML.**  
> ❗ In **CSR**, this happens **on the client side**, after JavaScript is executed.

---

### 🔁 Example CSR Flow

```jsx
function App() {
  return <h1>Hello, CSR!</h1>;
}

// In client-side entry file
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

- JSX → Virtual DOM → Real DOM → Browser displays UI

## SSG (Static Site Generation)

- Like SSR, React runs at build time, and generates static HTML files.
- On the client, React still hydrates the page, and sets up the virtual DOM and event listeners.

## SSG vs SSR vs CSR (Static Site Generation)

| Feature                  | **SSR (Server-Side Rendering)**                    | **SSG (Static Site Generation)**                   | **CSR (Client-Side Rendering)**                    | **ISR (Incremental Static Regeneration)**                         |
| ------------------------ | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| HTML generation timing   | ⏱️ On every **request**                            | 🏗️ At **build time**                               | ❌ Not generated — only JS is sent                 | 🏗️ At build time + ⏱️ re-generated **on demand in background**    |
| Data fetched             | 🟠 On request (always fresh)                       | 🟢 At build (can go stale)                         | 🔄 On client (after page loads)                    | 🟢 Initially at build, then 🟠 re-fetched in background           |
| Speed of first page load | ⚠️ Slower (needs server render each time)          | ⚡ Super fast (static HTML from CDN)               | 🐌 Slowest (waits for JS to load, then fetch data) | ⚡ Fast (static served), 🧠 background update for fresh data      |
| SEO-friendly             | ✅ Yes                                             | ✅ Yes                                             | ❌ Not ideal (content loads after JS execution)    | ✅ Yes (HTML is served statically)                                |
| Interactivity            | ✅ After hydration                                 | ✅ After hydration                                 | ✅ Full interactivity                              | ✅ After hydration                                                |
| Hosting needs            | Node.js server or SSR-supporting platform          | Static hosting (CDN-friendly: Netlify, Vercel, S3) | Static hosting (but heavier JS bundle)             | Static hosting with ISR support (Vercel, Netlify, etc.)           |
| Ideal for                | Personalized pages, dashboards, auth-based content | Blogs, docs, landing pages, marketing sites        | SPAs, dashboards where SEO isn't critical          | Blogs, catalogs, docs needing fresh content without full rebuilds |

---

## React Rendering Models Lifecycle (CSR vs SSR vs SSG)

### CSR (Client-Side Rendering) LifeCycle

1. The browser receives a minimal `index.html` (usually with just a `<div id="root"></div>` and a `<script src="main.js">` tag).
2. The script (`main.js`) is downloaded and executed.
3. React runs in the browser:
   - Creates the **virtual DOM**
   - Renders the UI into the `#root` div
   - Attaches all event listeners
   - Fetches data **if needed**, usually via effects like `useEffect`

🧠 Everything happens **in the browser** after page load.

---

### SSR (Server-Side Rendering) LifeCycle

1. The browser sends a request to the server for the page.
2. The server runs the React code and renders it into a complete HTML string (with preloaded data).
3. The server sends this full HTML page to the browser.
4. The browser displays the static HTML content immediately.
5. Then the browser downloads and runs `main.js`.
6. **Hydration** kicks in:
   - React re-creates the **virtual DOM** in memory
   - It **binds event listeners** to the already-rendered HTML
   - React becomes fully interactive

🧠 Initial HTML is ready fast, but React still needs to hydrate it on the client.

---

### SSG (Static Site Generation) LifeCycle

1. At **build time**, React runs and generates HTML files for every page.
2. These HTML files are deployed to a static server or CDN.
3. When the browser loads the page:
   - It receives the prebuilt HTML instantly.
   - Then downloads and runs `main.js`.
   - React hydrates the HTML (same as SSR):
     - Re-creates the **virtual DOM**
     - Binds event listeners

🧠 Static HTML is generated once and reused. Hydration still happens client-side.

### ISR (Incremental Site Rendering) — Next.js Feature

## ✅ What is ISR?

**Incremental Static Regeneration (ISR)** allows you to use **Static Site Generation (SSG)** with the **flexibility of updating pages** **after deployment** — without rebuilding the whole app.

- Pages are **statically generated at build time**, just like in SSG.
- But, they can be **incrementally re-generated on-demand** when a new request comes in.
- Works **per page** — you choose which pages use ISR.

---

## ✅ Why Use ISR?

- ⚡ **Performance**: Pages are pre-rendered like SSG → super fast load times.
- 🔄 **Freshness**: Pages can be updated in the background without full redeploys.
- 🌐 **Scalability**: Works well for large apps with many dynamic pages (e.g., blogs, e-commerce).

---

## ✅ How It Works (Under the Hood)

1. **First request**:

   - Page does not exist in cache.
   - Server generates the static HTML using data and stores it in cache/CDN.
   - Page is served to the user.

2. **Subsequent requests (within revalidation period)**:

   - Served instantly from the cache (no regeneration).

3. **After `revalidate` time passes**:
   - Next request **triggers background regeneration**.
   - The user gets the stale page.
   - Once regeneration finishes, the cache is updated.
   - New requests get the updated version.

## ✅ Key Terms

| Term             | Meaning                                                             |
| ---------------- | ------------------------------------------------------------------- |
| `getStaticProps` | Function to fetch data at build time or for ISR                     |
| `revalidate`     | Time (in seconds) after which the page is regenerated in background |
| `fallback`       | Behavior for pages not generated at build time                      |

## ✅ Summary

- ISR gives the **best of SSG and SSR**:
  - Speed of static pages
  - Freshness and dynamic capability of server-rendered pages
- You **don’t need to rebuild the whole site** for every small change.

### 🧠 Summary Table

| Feature           | CSR                     | SSR                                | SSG                                | ISR                                                    |
| ----------------- | ----------------------- | ---------------------------------- | ---------------------------------- | ------------------------------------------------------ |
| HTML Generated    | On client (browser)     | On server per request              | On server at build time            | On server at build time + updated after deployment     |
| Interactivity     | Done by React on client | Done by React (via hydration)      | Done by React (via hydration)      | Done by React (via hydration)                          |
| Data Availability | Fetched on client       | Server fetches before rendering    | Fetched at build time              | Initially fetched at build time, updated in background |
| Performance       | Slower first load       | Faster first load, better SEO      | Fastest load, great SEO            | Fast load + fresh data without rebuild                 |
| Needs Hydration   | ✅ No pre-rendered HTML | ✅ Yes (for React to take control) | ✅ Yes (for React to take control) | ✅ Yes (for React to take control)                     |
