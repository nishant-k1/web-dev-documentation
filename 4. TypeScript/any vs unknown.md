# `any` vs `unknown` in TypeScript

Understanding the difference between `any` and `unknown` is important because both represent “any type,” but they behave very differently.

---

## ✅ `any`: The Escape Hatch

`any` disables type checking.  
It tells TypeScript: **“Trust me. I know what I’m doing.”**

### Effects:

- You can assign anything to it.
- You can use it as anything.
- No compile-time checks.
- Easily introduces bugs.

Example:

```ts
let value: any = "hello";
value.toFixed(); // ✅ No error (but will crash at runtime)
```

### When to use:

Only when migrating old JS code or you truly do not care about type safety.

---

## ✅ `unknown`: The Safe Alternative to `any`

`unknown` means “this value can be anything,” but **you must check it before using it**.

### Effects:

- You can assign anything to `unknown`.
- You cannot use it without narrowing.
- Forces safe handling.

Example:

```ts
let value: unknown = "hello";

value.toFixed(); // ❌ Error: You must check it first

if (typeof value === "string") {
  value.toUpperCase(); // ✅ Safe
}
```

### When to use:

When you accept any type as input but want type safety before using it.

Perfect for:

- API responses
- Generic utilities
- User input
- Validation systems

---

## ✅ Key Differences

| Feature                     | any         | unknown             |
| --------------------------- | ----------- | ------------------- |
| Accepts any value           | ✅ Yes      | ✅ Yes              |
| Can be assigned to any type | ✅ Yes      | ❌ No               |
| Requires type checking      | ❌ No       | ✅ Yes              |
| Safe to use                 | ❌ No       | ✅ Yes              |
| Allows property access      | ✅ Yes      | ❌ No               |
| Best for                    | Quick hacks | Safe general values |

---

## ✅ Quick Example Comparison

### Using `any`

```ts
let a: any = 10;
a = "hello";
a.trim(); // ✅ Compiles but may explode at runtime
```

### Using `unknown`

```ts
let b: unknown = "hello";

if (typeof b === "string") {
  b.trim(); // ✅ Safe after narrowing
}
```

---

## ✅ Rule of Thumb

- Use **`unknown`** when you want flexibility with safety.
- Avoid **`any`** unless absolutely necessary.
- Replace `any` with `unknown` in most modern, strict TypeScript codebases.

---

If you want, I can also show real-world examples where `unknown` prevents serious bugs.
