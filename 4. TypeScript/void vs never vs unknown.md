# `void` vs `never` vs `unknown` in TypeScript

These three types look similar but represent completely different ideas in TypeScript. Here is a precise and easy breakdown.

---

# ✅ `void`

### Meaning:

Represents a function that **does not return a meaningful value**.

### Typical use:

Used as the return type of functions that return nothing.

Example:

```ts
function logMessage(msg: string): void {
  console.log(msg); // No return value
}
```

### Key points:

- You can return `undefined` or nothing.
- Cannot be assigned to other types except `any` or `unknown`.

---

# ✅ `never`

### Meaning:

Represents a value that **should never happen**.  
A function that never finishes normally.

### When does a function return `never`?

1. **Throws an error**

   ```ts
   function fail(): never {
     throw new Error("Error occurred");
   }
   ```

2. **Infinite loop**
   ```ts
   function loopForever(): never {
     while (true) {}
   }
   ```

### Key points:

- `never` is a subtype of all types.
- No value can ever be assigned to `never`.
- Often appears in exhaustive checks.

Example:

```ts
type Shape = "circle" | "square";

function handleShape(shape: Shape) {
  if (shape === "circle") return;
  if (shape === "square") return;

  const unreachable: never = shape; // ✅ Compile-time safety
}
```

---

# ✅ `unknown`

### Meaning:

Represents a value that can be **anything**, but you must check it before using it.

### Safe alternative to `any`:

```ts
let value: unknown = "hello";

value.trim(); // ❌ Error (must check type first)

if (typeof value === "string") {
  value.trim(); // ✅ Safe
}
```

### Key points:

- Accepts any value.
- You cannot use it without narrowing.
- Prevents unsafe operations.

---

# ✅ Summary Table

| Type      | Meaning                         | When to Use                                   |
| --------- | ------------------------------- | --------------------------------------------- |
| `void`    | Function returns nothing        | Logging, side-effect functions                |
| `never`   | Impossible value, never returns | Errors, infinite loops, exhaustiveness checks |
| `unknown` | Value could be anything         | Safe inputs, API responses, user input        |

---

# ✅ Quick Visual Summary

```
unknown  → “I accept everything, but you must check me.”

void     → “I return nothing.”

never    → “I never return at all.”
```

---

If you want, I can also add real-world React examples where these three types show up.
