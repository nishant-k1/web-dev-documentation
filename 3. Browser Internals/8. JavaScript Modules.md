# JavaScript Modules

Understanding JavaScript modules vs regular files and how they work.

---

## What Makes a JS File a Module?

A `.js` file becomes a module **not by its file extension**, but by **how it is loaded**:

1. It's loaded in HTML using:

   ```html
   <script type="module" src="file.js"></script>
   ```

   OR

2. It's imported by another module:
   ```javascript
   import "./file.js";
   ```

**That's it.**

---

## Module vs Regular Script

| Feature                | Regular JS File          | Module                                 |
| ---------------------- | ------------------------ | -------------------------------------- |
| **How to include**     | `<script src="file.js">` | `<script type="module" src="file.js">` |
| **Scope**              | Global                   | Module (private)                       |
| **Variable pollution** | ✅ Yes                   | ❌ No                                  |
| **Strict mode**        | Optional                 | ✅ Default                             |
| **import/export**      | ❌ Not supported         | ✅ Supported                           |
| **Execution**          | Immediately (in order)   | Deferred                               |
| **Top-level await**    | ❌                       | ✅                                     |
| **Top-level `this`**   | `window`                 | `undefined`                            |
| **Adds to `window`**   | ✅ Yes                   | ❌ No                                  |

---

## Module Scope

- Variables declared in a module are **NOT** added to the global scope
- Even exported variables are **module-scoped**, not global-scoped
- Modules are always in **strict mode**
- Top-level `this` is `undefined` (not `window`)

**Example:**

```javascript
// module1.js
export const moduleVar = "I am module-scoped";
let internalVar = "I stay inside module1";

console.log(this); // undefined (not window)

// module2.js
import { moduleVar } from "./module1.js";

console.log(moduleVar); // ✅ Accessible via import
console.log(internalVar); // ❌ ReferenceError (not defined)
```

---

## Using import/export Without type="module"

If you load a JS file without `type="module"`:

```html
<script src="./bad.js"></script>
```

And the file contains:

```javascript
export const test = 10;
```

**Result:**

```
Uncaught SyntaxError: Unexpected token 'export'
```

Because this file is loaded as a regular script, the browser doesn't recognize `export`/`import` syntax.

---

## React and Modules

In React (Vite, Webpack, Next.js):

- All files are ES modules internally
- Build tools handle `type="module"` automatically
- You never manually add `type="module"` in React apps
- Bundlers inject it during build

**In Vite projects:**

```html
<!-- index.html -->
<script type="module" src="/src/main.jsx"></script>
```

**In Create React App (Webpack):**

- Bundler handles it automatically
- You never see `type="module"` in your code

---

## Bundling, Linking, and Dynamic Imports

These three concepts are related but **not the same**. Understanding the difference is crucial.

### Bundling

**What it is:** Multiple JS files are **combined** into one or few optimized files.

**When:** Happens at **build time** (Webpack/Vite)

**Why:** Reduces HTTP requests, improves performance

**Example:**

```
Source: main.js, App.js, Button.js (3 files)
↓ Bundler
Output: bundle.js (1 file)
```

**Analogy:** Building the entire city into one big megastructure before opening it.

---

### Linking

**What it is:** How modules are **connected** using `import`/`export` — the logical relationship between files.

**When:** Happens both in dev and prod

**Why:** How modules know about each other

**Example:**

```javascript
// utils.js
export function greet() { console.log("Hello"); }

// main.js
import { greet } from './utils.js';
greet();
```

Here, `main.js` is **linked** to `utils.js` through the static import statement.

**Key point:** Whether the bundler combines them or not, the logical relationship remains the same.

**Analogy:** Roads between buildings (connections between modules).

---

### Dynamic Import

**What it is:** A module loaded **on-demand** using `import()` (a function), not at startup.

**When:** Happens at **runtime** (only when needed)

**Why:** Code splitting, lazy loading, performance

**Example:**

```javascript
// main.js
document.getElementById("loadBtn").addEventListener("click", async () => {
  const module = await import('./analytics.js');
  module.trackUser();
});
```

Here:
- `analytics.js` will **NOT** be loaded when the app first runs
- It will be fetched **only when the button is clicked**
- The bundler sees this and automatically creates a separate chunk (lazy-loaded file)

**In production you'll get:**

```
dist/
 ┣ main.bundle.js
 ┗ analytics.chunk.js
```

**Analogy:** Constructing a new building only when someone visits that area.

---

## Comparison Table

| Concept         | When        | What It Does                          | Example                          |
| --------------- | ----------- | -------------------------------------- | -------------------------------- |
| **Linking**     | Always      | Connects files logically               | `import { X } from './file.js'`  |
| **Bundling**    | Build time  | Combines many files into few           | Webpack/Vite build output         |
| **Dynamic Import** | Runtime   | Loads code only when needed           | `import('./module.js')` or `React.lazy()` |

---

## How They Work Together in React

In React (with Vite or Webpack):

1. **You link components together** using `import`/`export`
   → React + bundler builds a dependency graph

2. **When you run `npm run build`**, all modules get bundled into optimized files
   → Usually 1 main JS file + few chunks for lazy-loaded routes

3. **If you use dynamic imports** (like `React.lazy()` or `import()`), those parts are split into separate chunks
   → They'll be dynamically imported when the user navigates to that part of the app

**Example:**

```javascript
// App.jsx
import React, { Suspense } from "react";
const AdminPage = React.lazy(() => import("./AdminPage"));

export default function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AdminPage />
    </Suspense>
  );
}
```

This will make Webpack/Vite create a separate chunk:

- `main.js` (main bundle)
- `AdminPage.chunk.js` (lazy-loaded)

When user navigates to `/admin`, it's dynamically imported on demand.

---

## TL;DR

- **Linking** = "Hey, I depend on that file."
- **Bundling** = "Let's merge everything into one optimized file."
- **Dynamic Import** = "I'll fetch this part later when I need it."

---

## How Bundlers Handle Modules

### Development Mode (Vite Example)

**What happens:**

1. Browser requests `/src/main.jsx` (loaded as `type="module"`)
2. Inside `main.jsx`, browser sees `import App from './App.jsx'`
3. Browser asks Vite dev server for `/src/App.jsx`
4. That file is also served as a valid ES module (Vite automatically sends proper headers)
5. Continues recursively for all imports

**Key points:**

- Each module remains a **separate file** in development (for fast rebuilds)
- Vite handles module delivery, not you manually adding `<script type="module">`
- Each file is served as a valid ES module with proper headers

### Production Mode

Bundler (Vite/Webpack) creates optimized bundles:

```
/dist/
 ┣ index.html
 ┣ assets/
   ┣ index-abc123.js   ← contains all your modules together
   ┗ style-def456.css
```

**Only one script tag is used.** The 1000 modules are combined intelligently.

---

## How Bundlers Decide What to Bundle

### Not Always One File

❌ **Not always** all modules are merged into a single file.

✅ They're bundled **intelligently** — meaning:

- Many modules are combined into a few optimized files (bundles)
- But some modules are kept separate (as chunks) for lazy loading or code splitting

### Default Behavior (Without Lazy Loading)

If your app imports everything statically:

```javascript
// main.jsx
import App from './App.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
```

Then the bundler will see that all these files are always needed at startup.

✅ **So it merges all of them into one optimized bundle** — often named something like:

```
/dist/assets/index-abc123.js
```

That single file includes:
- Your React code
- Your components
- Your imports
- And even React library itself (if not externalized)

### When It Creates Multiple Bundles (Chunks)

Bundlers use **code splitting** when:

- You dynamically import something
- You use `React.lazy()` or route-based splitting
- Bundler decides a module is big and shared enough to separate it (like `node_modules`)

**Example: Dynamic Import**

```javascript
// main.jsx
import App from './App.jsx';
const Dashboard = React.lazy(() => import('./Dashboard.jsx'));
```

Now, bundler output might look like this:

```
/dist/
 ┣ assets/index-abc123.js          ← main bundle
 ┣ assets/Dashboard-xyz456.js      ← separate chunk (lazy loaded)
 ┗ assets/vendor-react-def789.js   ← vendor chunk (React libs)
```

✅ Only the main bundle is downloaded on first load.

✅ The Dashboard bundle is fetched later, when that route or component is used.

✅ The vendor chunk is cached across pages.

### How Bundlers Decide Split Points

Every bundler builds a **dependency graph**, then applies heuristics:

| Condition                              | Action                        |
| -------------------------------------- | ----------------------------- |
| File imported statically everywhere    | Merged into main bundle       |
| File imported dynamically              | Split into its own chunk      |
| Shared dependency (e.g. React, lodash)  | May be separated into "vendor" chunk |
| Big file that's rarely used            | Split for lazy loading        |
| Third-party library                    | Often cached separately       |

**So:**

- Bundlers aim for **fewer HTTP requests**
- But also **smaller initial load sizes**
- They find an **optimal balance**, not "one big file always"

### Vite vs Webpack — Slightly Different Philosophies

| Tool   | Default Output                    | Strategy                                                                 |
| ------ | --------------------------------- | ------------------------------------------------------------------------ |
| Vite   | Few optimized ES module chunks    | Leverages native ES module system; faster rebuilds                       |
| Webpack | One or few bundles (customizable) | Classic bundling + code splitting via configs                            |

But both ultimately aim for:

- One main bundle (entry point)
- Optional lazy-loaded chunks
- Optional vendor (shared) chunks

---

## Example Visualization

**Source Code:**

```
📁 Source Code
 ┣ main.jsx
 ┣ App.jsx
 ┣ Dashboard.jsx
 ┗ utils.js
```

**↓ (Bundler builds dependency graph)**

**Bundled Output (Optimized):**

```
📦 Bundled Output
 ┣ index-abc123.js       ← main app code
 ┣ dashboard-xyz456.js   ← loaded only when needed
 ┗ vendor-def789.js      ← common libraries
```

**At runtime:**

1. Browser first loads `index-abc123.js`
2. When user goes to Dashboard → loads `dashboard-xyz456.js`

So your app feels fast even with 1000+ modules.

---

## Summary — "Merged into 1 or Few Bundles" Depends On

| Situation                          | Bundler Output                      |
| ---------------------------------- | ----------------------------------- |
| Small app, no lazy imports         | 1 big bundle                        |
| Large app with lazy routes/components | Multiple chunks                  |
| Library shared across routes       | Separate vendor chunk               |
| Dev mode (Vite)                    | No bundling — loads each module separately |
| Prod build (Vite/Webpack)          | Bundled intelligently               |

---

## TL;DR

- **"Bundled"** = merged into optimized files before deployment
- **Usually** → 1 main bundle, plus a few lazy chunks or vendor bundles
- **Bundler decides intelligently** based on import patterns
- **Goal:** fast startup + efficient caching, not "just one file"

---

## Key Takeaways

1. **Modules are determined by loading method** — Not file extension
2. **Modules have private scope** — Variables don't leak to global
3. **Modules are always strict** — `this` is `undefined` at top level
4. **Bundlers handle modules automatically** — In React, you never manually add `type="module"`
5. **Dynamic imports enable code splitting** — Load modules on-demand

---

## Related Topics

- [Resource Loading Behavior](./6.%20Resource%20Loading%20Behavior.md) - How modules load (defer behavior)
- [Browser Request Lifecycle](./1.%20Browser%20Request%20Lifecycle.md) - How module requests work
- [HTML Tags and HTTP Requests](./2.%20HTML%20Tags%20and%20HTTP%20Requests.md) - `<script>` tag behavior
- [Static File Serving](./11.%20Static%20File%20Serving.md) - How modules are served in dev vs prod

