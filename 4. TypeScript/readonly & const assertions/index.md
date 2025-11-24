# `readonly` and `const` Assertions in TypeScript

Both `readonly` and `as const` help make your data **immutable**, but they work in different ways and at different levels.

---

# ✅ 1. `readonly` (Property-level immutability)

`readonly` makes a property **non-modifiable** after initialization.

### Example:

```ts
interface User {
  readonly id: number;
  name: string;
}

const u: User = {
  id: 101,
  name: "Nishant",
};

u.id = 200; // ❌ Error: cannot assign to readonly property
u.name = "Amit"; // ✅ Allowed
```

### Usage:

- Interfaces
- Classes
- Types
- Arrays (`readonly number[]`)

---

# ✅ 2. `readonly` with Arrays

Using `readonly` on arrays makes them **non-mutable**.

```ts
const arr: readonly number[] = [1, 2, 3];

arr.push(4); // ❌ Error
arr[0] = 10; // ❌ Error
```

You can read values, but cannot modify the array.

---

# ✅ 3. `Readonly<T>` Utility Type

Makes **all properties** of an object readonly.

```ts
type Config = {
  port: number;
  url: string;
};

const config: Readonly<Config> = {
  port: 3000,
  url: "localhost",
};

config.port = 5000; // ❌ Error
```

---

# ✅ 4. `as const` (Deep immutability + literal narrowing)

`as const` does **three things at once**:

### ✅ A. Makes all properties deeply `readonly`

### ✅ B. Converts values to literal types

### ✅ C. Prevents any mutation

Example:

```ts
const settings = {
  theme: "dark",
  version: 1,
} as const;
```

Type becomes:

```ts
{
  readonly theme: "dark";
  readonly version: 1;
}
```

Notice:

- `"dark"` is now a **string literal**
- `1` is now a **number literal**
- Both are **readonly**

---

# ✅ 5. `as const` for Arrays

```ts
const nums = [1, 2, 3] as const;
```

Becomes:

```ts
readonly[(1, 2, 3)];
```

- Values are literal
- Array is readonly
- Tuple-like structure

---

# ✅ 6. `readonly` vs `as const` (Important Differences)

| Feature                 | `readonly`                         | `as const`                            |
| ----------------------- | ---------------------------------- | ------------------------------------- |
| Where used              | Types, interfaces, classes, arrays | Values directly                       |
| Readonly level          | Shallow                            | Deep (all nested properties)          |
| Literal type conversion | ❌ No                              | ✅ Yes                                |
| Prevents mutation       | ✅ Yes (shallow)                   | ✅ Yes (deep)                         |
| Useful for              | APIs, class fields, props          | Configs, discriminated unions, tuples |

---

# ✅ 7. Real Use Cases

### A. Discriminated unions often need `as const`

```ts
const shape = {
  kind: "circle",
  radius: 10,
} as const;

type Shape = typeof shape;
```

### B. Redux action creators

```ts
const setTheme = () =>
  ({
    type: "SET_THEME",
  } as const);
```

### C. Prevent accidental mutation

```ts
const config = {
  api: "v1",
  retry: 3,
} as const;
```

---

# ✅ Summary

```
readonly → Prevents modification (shallow)
as const → Prevents modification + makes literal types + deep readonly
```

---

If you want, I can also explain how `readonly` works with **classes**, **constructors**, and **parameter properties** next.
