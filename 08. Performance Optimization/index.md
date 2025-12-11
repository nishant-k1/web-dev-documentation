# Performance Optimization

## Cross-cutting concern: spans DOM, events, rendering, loading, etc. — not confined to ES or Web API

JavaScript
├─ Performance & Optimization (JS-specific)
├─ Event loop & concurrency
├─ Memory management
├─ Debouncing & throttling
├─ Web Workers
├─ Code-level optimizations

Performance & Optimization (Web Platform / Cross-cutting)
├─ Browser rendering optimizations
├─ Network optimizations
├─ Build tools & code bundling
├─ Monitoring & metrics
├─ Web APIs (Service Workers, IndexedDB)
├─ Cross-device performance

TL;DR:
Not all Performance & Optimization topics are purely JavaScript; many involve the entire web platform.

Splitting helps maintain clarity and focus when studying or organizing materials.

It’s perfectly fine to have JS-specific performance topics under JS, and general web performance topics separately.

---

## 🧩 1. Event Optimization

Focuses on reducing the overhead of handling browser/user events (e.g., scroll, input, click).

**Examples:**

- Passive event listeners
- Debouncing/throttling
- Conditional event binding
- Removing unused listeners

---

## 🎨 2. Render (Paint/Layout) Optimization

Improves how efficiently the browser renders the page: layout calculation, painting, and compositing.

**Examples:**

- Batching DOM reads/writes
- Using `requestAnimationFrame`
- Avoiding forced reflows/layout thrashing
- CSS containment (`contain: layout;`)
- Reducing repaint/reflow triggers

---

## 🧠 3. Computation & Thread Optimization

Keeps the main thread free for UI responsiveness by offloading heavy work.

**Examples:**

- Web Workers
- OffscreenCanvas
- Breaking large computations with `setTimeout`, `requestIdleCallback`

---

## 🚚 4. Resource Loading Optimization

Improves how assets (scripts, images, components) are fetched and parsed.

**Examples:**

- Lazy loading images/components
- Code splitting (e.g., Webpack, React.lazy)
- Preloading/preconnecting resources
- Using efficient formats (e.g., WebP)

---

## 🗃️ 5. Memory Optimization

Focuses on preventing memory leaks or bloats, especially in long-lived SPAs.

**Examples:**

- Dereferencing DOM nodes on unmount
- Removing event listeners
- Avoiding accidental closures
- Avoiding large retained object graphs

---

## 🌐 6. Network Optimization

Speeds up delivery and response over the network.

**Examples:**

- Compression (gzip, brotli)
- Caching strategies (Service Workers, Cache-Control)
- HTTP/2 multiplexing
- Reducing requests (bundling, sprites)

---

## 🚀 Summary Table

| Category                      | Primary Goal                  |
| ----------------------------- | ----------------------------- |
| Event Optimization            | Efficient event handling      |
| Render/Layout Optimization    | Smooth visual updates         |
| Thread Optimization           | Prevent UI blocking           |
| Resource Loading Optimization | Reduce load/startup time      |
| Memory Optimization           | Prevent leaks and GC pressure |
| Network Optimization          | Faster data/resource transfer |
