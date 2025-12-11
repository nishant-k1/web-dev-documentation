# Type Guards in TypeScript

Type Guards are **runtime checks** that let TypeScript narrow a value from a broad type to a more specific type.

They help TypeScript understand **what kind of value** you are dealing with inside a conditional block.

Example:

```ts
function print(val: string | number) {
  if (typeof val === "string") {
    val.toUpperCase(); // ✅ string
  } else {
    val.toFixed(2); // ✅ number
  }
}
```

---

# ✅ Why Type Guards Are Needed

Union types like:

```ts
string | number | boolean;
```

are too broad to access specific properties.

Type Guards safely reduce these types, so you can access the correct methods without errors.

---

# ✅ 1. `typeof` Type Guard

Works for primitives:

- `string`
- `number`
- `boolean`
- `bigint`
- `symbol`
- `undefined`
- `function`

Example:

```ts
function handle(val: string | number) {
  if (typeof val === "string") {
    val.trim(); // ✅ string
  } else {
    val.toFixed(2); // ✅ number
  }
}
```

---

# ✅ 2. `instanceof` Type Guard

Used for **class instances**.

```ts
class Car {}
class Bike {}

function check(v: Car | Bike) {
  if (v instanceof Car) {
    console.log("Car");
  } else {
    console.log("Bike");
  }
}
```

---

# ✅ 3. `in` Operator Type Guard

Checks if a property exists in an object.

```ts
function getLength(x: { length: number } | { size: number }) {
  if ("length" in x) {
    return x.length;
  }
  return x.size;
}
```

---

# ✅ 4. Truthiness Type Guard

Checks against:

- `null`
- `undefined`
- empty string
- zero
- false

Example:

```ts
function printName(name?: string) {
  if (name) {
    console.log(name.toUpperCase()); // ✅ name is string
  }
}
```

---

# ✅ 5. Equality Type Guards

Using `===`, `!==`, `==`, `!=`.

```ts
function process(x: number | null) {
  if (x !== null) {
    console.log(x + 1); // ✅ x is number
  }
}
```

---

# ✅ 6. Discriminated Union Type Guards

A powerful pattern using a **common literal property**.

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number };

function area(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
  return shape.size * shape.size;
}
```

---

# ✅ 7. Custom Type Guards (User-defined Type Predicates)

You can create your own type guards for full control.

```ts
function isString(val: unknown): val is string {
  return typeof val === "string";
}

function test(val: unknown) {
  if (isString(val)) {
    val.toUpperCase(); // ✅ narrowed to string
  }
}
```

**This is extremely useful for validating API responses.**

---

# ✅ 8. Exhaustive Checks (`never`)

Ensures all cases in a union are handled.

```ts
function handle(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return shape.radius;
    case "square":
      return shape.size;
    default:
      const _exhaustive: never = shape; // ✅ error if a case is missing
      return _exhaustive;
  }
}
```

---

# ✅ Summary Table

| Type Guard Technique | Works For                 | Example                   |
| -------------------- | ------------------------- | ------------------------- |
| `typeof`             | primitives                | `typeof val === "string"` |
| `instanceof`         | class instances           | `val instanceof Car`      |
| `in` operator        | object property detection | `"length" in obj`         |
| truthiness           | null/undefined checks     | `if (value)`              |
| equality             | exact value checks        | `if (x !== null)`         |
| discriminated union  | literal-based unions      | `shape.kind === "circle"` |
| custom guard         | user-defined predicates   | `val is string`           |

---

If you want, I can also create a cheat sheet that combines **Type Guards + Type Narrowing** in one page for quick revision.
