# Literal Types in TypeScript

Literal types allow you to specify **exact** values a variable can hold, instead of broad types like `string`, `number`, or `boolean`.

These include:

- String literals
- Number literals
- Boolean literals

Literal types are useful for creating **precise**, **strict**, and **safe** APIs.

---

# ✅ 1. String Literal Types

You can restrict a value to a specific string.

```ts
let direction: "left" | "right" | "up" | "down";

direction = "left"; // ✅
direction = "forward"; // ❌ Error
```

Used heavily in union types, discriminated unions, and state machines.

---

# ✅ 2. Number Literal Types

You can restrict a variable to an exact number value.

```ts
let statusCode: 200 | 404 | 500;

statusCode = 200; // ✅
statusCode = 201; // ❌ Error
```

Useful for APIs where only specific numbers are valid.

---

# ✅ 3. Boolean Literal Types

A variable can be restricted to only `true` or only `false`.

```ts
let isEnabled: true;

isEnabled = true; // ✅
isEnabled = false; // ❌ Error
```

This is often used for complex conditional types.

---

# ✅ 4. Literal Types with `const`

Using `const` creates literal types automatically.

```ts
const x = "hello";
```

Here, the type of `x` is `"hello"` (not `string`).

But with `let`:

```ts
let y = "hello";
```

Type of `y` becomes `string`, not literal `"hello"`.

---

# ✅ 5. Literal Types + Union Types

Literal types become powerful when grouped.

```ts
type Theme = "light" | "dark" | "auto";

function setTheme(t: Theme) {
  console.log(t);
}
```

You cannot pass anything outside the allowed literal values.

---

# ✅ 6. Literal Types in Objects (`as const`)

`as const` preserves literal values inside objects.

```ts
const config = {
  mode: "dark",
  version: 1,
} as const;
```

Types inferred:

- `mode: "dark"`
- `version: 1`

Without `as const`, they would be:

- `mode: string`
- `version: number`

---

# ✅ 7. Literal Types for Discriminated Unions

Literal types are the foundation for tagged union patterns.

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };
```

`kind` is a **string literal type**, used for safe narrowing.

---

# ✅ 8. Summary Table

| Literal Type | Example                  | Meaning                        |
| ------------ | ------------------------ | ------------------------------ | -------------------------- |
| String       | `"success"`              | Only this exact string allowed |
| Number       | `404`                    | Only this exact number allowed |
| Boolean      | `true`                   | Only `true` allowed            |
| Union        | `"left"                  | "right"`                       | Only these specific values |
| `as const`   | `const obj = … as const` | Locks values to literals       |

---

Literal types give you _precision_ in your typings and help prevent invalid values at compile time.

If you want, I can also explain how literal types work with **Enums**, **const assertions**, or **template literal types**.
