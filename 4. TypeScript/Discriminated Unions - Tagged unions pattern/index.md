# Discriminated Unions (Tagged Union Pattern) in TypeScript

Discriminated Unions (also called **Tagged Unions**) are one of the most powerful typing techniques in TypeScript.  
They allow you to model multiple possible shapes of data with **perfect type safety** using a common **discriminant property**.

---

# ✅ 1. What Is a Discriminated Union?

It is a union of object types where **each object has one common literal property** that identifies its type.

This common property is called:

- discriminant
- tag
- kind

Example:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };
```

The property `kind` is the **tag**.

---

# ✅ 2. How Narrowing Works Automatically

TypeScript automatically narrows the type using the tag.

```ts
function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2; // ✅ radius available
  }

  if (shape.kind === "square") {
    return shape.size ** 2; // ✅ size available
  }

  return shape.width * shape.height; // ✅ inferred: rectangle
}
```

No type assertions needed.  
No mistakes possible.

---

# ✅ 3. Why Use Discriminated Unions?

### ✅ Perfect type safety

TS knows exactly which properties are available.

### ✅ No undefined checks

Thanks to literal type checking.

### ✅ Great for:

- API responses
- Redux actions
- Complex domain models
- State machines
- Event systems

---

# ✅ 4. Example: API Response Handling

```ts
type ApiResponse =
  | { status: "success"; data: string[] }
  | { status: "error"; message: string }
  | { status: "loading" };
```

Usage:

```ts
function handle(res: ApiResponse) {
  switch (res.status) {
    case "success":
      return res.data; // ✅ data available
    case "error":
      return res.message; // ✅ message available
    case "loading":
      return "Loading...";
  }
}
```

---

# ✅ 5. Exhaustive Checking with `never`

This prevents missing cases.

```ts
function check(res: ApiResponse) {
  switch (res.status) {
    case "success":
      return res.data;
    case "error":
      return res.message;
    case "loading":
      return "Loading...";
    default:
      const _exhaustive: never = res; // ❌ compile-time error if a case is missing
      return _exhaustive;
  }
}
```

This ensures at compile time that every variant is handled.

---

# ✅ 6. Real Example: Redux Action Pattern

```ts
type Action =
  | { type: "ADD_TODO"; payload: string }
  | { type: "DELETE_TODO"; id: number }
  | { type: "TOGGLE_TODO"; id: number };
```

Usage:

```ts
function reducer(action: Action) {
  switch (action.type) {
    case "ADD_TODO":
      return action.payload;
    case "DELETE_TODO":
      return action.id;
  }
}
```

---

# ✅ 7. Why Literal Types Matter Here

The discriminant must be a **literal type**, such as:

- `"circle"`
- `"success"`
- `"ADD_TODO"`
- `1` or `"1"`

Example:

```ts
kind: "circle"; // ✅ literal
size: number; // ✅ normal
```

---

# ✅ Summary

```
Discriminated Unions = Union of objects + one
```
