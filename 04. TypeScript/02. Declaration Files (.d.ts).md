# Declaration Files (`.d.ts`) in TypeScript

Declaration files (`.d.ts`) tell TypeScript **about the types of existing JavaScript code**.  
They contain **type declarations only**, not executable code.

These files help TypeScript understand:

- JavaScript libraries without types
- External APIs
- Global variables
- Module shapes
- Overloaded functions and interfaces

They act as the “type definitions” for JavaScript.

---

# ✅ 1. What Is a Declaration File?

A declaration file **describes the shape of code**, but contains **no implementation**.

Example:

```ts
// math.d.ts
declare function add(a: number, b: number): number;
```

This tells TypeScript that an `add` function exists somewhere.

---

# ✅ 2. Why Declaration Files Exist

TypeScript needs to know type information for:

- JavaScript libraries
- Node modules
- Browser globals
- Custom JS projects without TS

Declaration files fill this gap.

---

# ✅ 3. Key Rules of `.d.ts` Files

- Contain **type declarations only**
- No executable logic
- Use `declare` keyword
- Automatically loaded by TypeScript if included in project

---

# ✅ 4. Basic Examples

### A. Declaring global functions

```ts
declare function greet(name: string): void;
```

### B. Declaring global variables

```ts
declare const VERSION: string;
```

### C. Declaring objects

```ts
declare const config: {
  port: number;
  debug: boolean;
};
```

---

# ✅ 5. Module Declarations

Used for declaring modules when no types exist.

```ts
// types/my-lib/index.d.ts
declare module "my-lib" {
  export function hello(name: string): string;
}
```

Usage:

```ts
import { hello } from "my-lib";
```

---

# ✅ 6. Adding Types for JavaScript Files in Your Project

When you write JavaScript and want TypeScript help, create a `.d.ts` file:

```
src/
  utils.js
  utils.d.ts
```

Example:

```ts
// utils.d.ts
declare function formatDate(d: Date): string;
```

TypeScript now knows the JS function types.

---

# ✅ 7. Declaration Files for npm Packages

Many packages ship with built-in `.d.ts` files:

```
node_modules/react/index.d.ts
node_modules/lodash/index.d.ts
```

If a library has **no built-in types**, install community types:

```sh
npm install --save-dev @types/lodash
```

This brings the `.d.ts` file from DefinitelyTyped.

---

# ✅ 8. `declare` Keyword

Used inside `.d.ts` to tell TS:

- This exists
- Do not output JS for it

Examples:

```ts
declare function log(x: any): void;
declare const API_URL: string;
declare class Person {
  name: string;
  constructor(name: string);
}
```

---

# ✅ 9. Ambient Declarations

`.d.ts` files are often called **ambient declarations** because they describe things that exist **elsewhere**.

Example:

```ts
declare global {
  interface Window {
    appVersion: string;
  }
}
```

After this, `window.appVersion` has type support.

---

# ✅ 10. When to Create Your Own `.d.ts`

You should create a `.d.ts` file when:

- You use a JavaScript library without types
- You have JS code in your project and want TS support
- You need to extend global types (`Window`, `Document`, etc.)
- You want to create custom module declarations

---

# ✅ 11. Summary

```
Declaration Files (.d.ts) provide type information for JavaScript.

They:
- declare functions, variables, classes, modules, interfaces
- contain no runtime code
- help TS understand code that isn’t written in TypeScript
- enable type safety when using JS libraries
```

---

If you want, I can also explain the difference between **ambient modules**, **global declarations**, and **module augmentation** with examples — those are important for advanced TypeScript.
