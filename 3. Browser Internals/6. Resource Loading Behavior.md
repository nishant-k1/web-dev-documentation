# Resource Loading Behavior

Understanding synchronous vs asynchronous resource loading and its impact on performance.

---

## Why This Matters

Understanding how HTML elements load affects **performance** significantly. This knowledge helps you:
- Speed up websites
- Prevent render blocking
- Improve Lighthouse scores
- Optimize bundle loading
- Avoid layout shifts

---

## Synchronous (Blocking) Elements

These elements **stop HTML parsing** until they finish loading or processing.

### `<script>` (Without async or defer)

```html
<script src="main.js"></script>
```

**Behavior:**

- HTML parsing **pauses**
- Browser downloads the JS
- Executes it immediately
- Continues parsing HTML only after JS is done

**Why does browser stop?**

Because JS can modify the DOM (`document.write`, etc.), so browser must wait.

---

## Asynchronous (Non-blocking) Elements

These elements load in the **background** while HTML continues parsing.

### Fully Async Elements

- `<img src="...">`
- `<video>`, `<audio>`
- `<iframe>` (content loads async, but insertion is synchronous)
- `<link rel="preload">`
- `<source>`, `<track>`
- `<object>`, `<embed>`

**Behavior:**

- Browser fetches these files in **parallel**
- HTML parsing **NEVER stops** because of them
- They appear when loaded

**Example:**

```html
<img src="hero.jpg" />
<p>This text is NOT blocked by the image loading.</p>
```

---

## Hybrid Elements

### `<link rel="stylesheet">` → Asynchronous Download, Blocking Render

**Tricky behavior:**

- ✅ HTML parsing continues (async)
- ✅ CSS file downloads async in parallel
- ❌ BUT rendering is **blocked** until CSS is loaded

**Why?**

To avoid "unstyled flash" of content (FOUC - Flash of Unstyled Content).

---

### `<script>` with Attributes

#### `<script defer>`

```html
<script defer src="main.js"></script>
```

**Behavior:**

- ✅ Doesn't block HTML parsing
- ✅ Executes **after** HTML is fully parsed
- ✅ Execution order is **preserved**

**Use for:**

- Scripts that need the DOM to be ready
- Scripts that depend on each other

---

#### `<script async>`

```html
<script async src="ads.js"></script>
```

**Behavior:**

- ✅ Doesn't block HTML parsing
- ❌ Executes as soon as it finishes downloading
- ❌ Execution order is **NOT guaranteed**

**Use for:**

- Ads
- Analytics
- Third-party widgets
- Scripts that don't depend on DOM or other scripts

---

#### `<script type="module">`

```html
<script type="module" src="main.js"></script>
```

**Behavior:**

- ✅ Async (HTML doesn't block)
- ✅ Runs after HTML parsing
- ✅ Can import other modules in parallel
- ⚠️ Execution order is NOT guaranteed unless using import dependencies

**Works like `defer` implicitly.**

---

## Complete Synchronous vs Asynchronous Matrix

| Tag                       | Loads Async? | Blocks HTML Parsing? | Blocks Page Rendering? | Notes                              |
| ------------------------- | ------------ | -------------------- | ---------------------- | ---------------------------------- |
| `<img>`                   | ✅ Yes       | ❌ No                | ❌ No                  | Pure async                         |
| `<script>`                | ❌ No        | ✅ Yes               | ✅ Yes                 | Blocking JS                        |
| `<script defer>`          | ✅ Yes       | ❌ No                | ❌ No                  | Ordered execution                  |
| `<script async>`          | ✅ Yes       | ❌ No                | ❌ No                  | Unordered execution                |
| `<script type="module">`  | ✅ Yes       | ❌ No                | ❌ No                  | Like defer                         |
| `<link rel="stylesheet">` | ✅ Yes       | ❌ No                | ✅ Yes                 | Blocks render                      |
| `<link rel="preload">`    | ✅ Yes       | ❌ No                | ❌ No                  | High-priority fetch                |
| `<video>`                 | ✅ Yes       | ❌ No                | ❌ No                  |                                    |
| `<audio>`                 | ✅ Yes       | ❌ No                | ❌ No                  |                                    |
| `<iframe>`                | ✅ Yes       | ❌ No                | ❌ No                  | iframe content loads independently |
| `<form>`                  | ❌ No        | ❌ No                | ❌ No                  | Doesn't auto-load resources        |
| `<object>`                | ✅ Yes       | ❌ No                | ❌ No                  | Loads external file                |

---

## Visual Timeline Example

**HTML:**

```html
<p>Start</p>
<script src="block.js"></script>
<!-- Blocks -->
<img src="pic.jpg" />
<!-- Async -->
<script defer src="ui.js"></script>
<!-- Async -->
<script async src="ads.js"></script>
<!-- Async -->
<p>End</p>
```

**Timeline:**

1. Parse `<p>Start></p>`
2. **STOP** (script - browser must download then execute)
3. Continue parsing HTML
4. `<img>` loads async
5. `<script defer>` loads async (executes later)
6. `<script async>` loads async (executes whenever)
7. Parse `<p>End</p>`
8. Execute defer scripts
9. Page fully rendered

---

## Best Practices

1. **Use `defer` for scripts that need DOM** — They'll execute in order after HTML parsing
2. **Use `async` for independent scripts** — Ads, analytics, widgets
3. **Avoid blocking scripts** — Use `defer` or `async` instead of plain `<script>`
4. **Preload critical resources** — Use `<link rel="preload">` for important assets
5. **Optimize CSS loading** — Consider inline critical CSS, defer non-critical CSS

---

## Related Topics

- [HTML Tags and HTTP Requests](./2.%20HTML%20Tags%20and%20HTTP%20Requests.md) - Which tags trigger requests
- [JavaScript Modules](./8.%20JavaScript%20Modules.md) - How modules load (type="module")
- [Browser Request Lifecycle](./1.%20Browser%20Request%20Lifecycle.md) - Overall request flow
- [Browser Rendering Pipeline](./15.%20Browser%20Rendering%20Pipeline.md) - How resource loading affects rendering
- [Browser Layout and Rendering](./17.%20Browser%20Layout%20and%20Rendering.md) - How resources affect layout and paint

