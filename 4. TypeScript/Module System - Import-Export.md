# Module System in TypeScript — Import / Export

TypeScript follows the **ES Module (ESM)** system, which uses `import` and `export` to share code between files.  
A file becomes a **module** when it either exports something or imports something.

---

# ✅ 1. Named Exports

You can export multiple things from a file.

```ts
// utils.ts
export const add = (a: number, b: number) => a + b;
export function greet(name: string) {
  return `Hello ${name}`;
}
export const PI = 3.14;
```

### Importing named exports:

```ts
import { add, greet, PI } from "./utils";
```

### Rename while importing:

```ts
import { add as sum } from "./utils";
```

---

# ✅ 2. Default Export

A module can have **only one** default export.

```ts
// logger.ts
export default function log(msg: string) {
  console.log(msg);
}
```

### Importing default export:

```ts
import log from "./logger";
```

### You can rename it freely:

```ts
import myLogger from "./logger";
```

---

# ✅ 3. Default + Named Exports Together

```ts
// math.ts
export default function multiply(a: number, b: number) {
  return a * b;
}

export const PI = 3.14;
```

### Importing:

```ts
import multiply, { PI } from "./math";
```

---

# ✅ 4. Re-exporting (Barrel Files)

Useful to create a single entry point.

```ts
// index.ts
export * from "./user";
export * from "./auth";
```

Or export selective items:

```ts
export { login, logout } from "./auth";
```

---

# ✅ 5. Importing Everything as a Namespace

```ts
import * as MathUtils from "./math";

MathUtils.PI;
MathUtils.add(2, 3);
```

---

# ✅ 6. Side-effect Imports

Used when a module runs code without exporting anything (e.g., polyfills).

```ts
import "./globals";
```

---

# ✅ 7. Exporting Types (Type-only Export)

TypeScript supports type-only exports to avoid emitting JS.

```ts
export type User = {
  name: string;
  age: number;
};
```

### Importing type-only:

```ts
import type { User } from "./types";
```

---

# ✅ 8. `export =` and `import = require()` (CommonJS Legacy)

These are older Node-style patterns.

### CommonJS export:

```ts
// oldLib.ts
export = { x: 10, y: 20 };
```

### CommonJS import:

```ts
import oldLib = require("./oldLib");
```

Use only when interacting with legacy JS code.

---

# ✅ 9. Module Resolution

TypeScript resolves modules based on:

- File extension (`.ts`, `.js`, `.tsx`, `.json`)
- `paths` in `tsconfig.json`
- `baseUrl` for absolute imports

Example tsconfig:

```json
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@utils/*": ["utils/*"]
    }
  }
}
```

Usage:

```ts
import { add } from "@utils/math";
```

---

# ✅ 10. Summary Table

| Concept          | Syntax Example                       |
| ---------------- | ------------------------------------ |
| Named export     | `export const x = 10`                |
| Named import     | `import { x } from "./file"`         |
| Default export   | `export default fn`                  |
| Default import   | `import fn from "./file"`            |
| Namespace import | `import * as Utils from "./file"`    |
| Re-export        | `export * from "./file"`             |
| Type-only export | `export type User = …`               |
| Type-only import | `import type { User } from "./file"` |
| CommonJS export  | `export = {}`                        |
| CommonJS import  | `import lib = require("lib")`        |

---

If you want, I can also explain **ESM vs CommonJS**, which is an important topic for interviews and Node.js projects.
