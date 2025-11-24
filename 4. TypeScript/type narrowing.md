# Type Narrowing in TypeScript

Type narrowing means **reducing a broad type into a more specific type** based on checks.  
This helps TypeScript understand which exact type is being used at a given point.

Example:

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    value.toUpperCase(); // ✅ narrowed to string
  } else {
    value.toFixed(2); // ✅ narrowed to number
  }
}
```

---

# ✅ Why Type Narrowing Is Needed

Because union types like:

```ts
string | number | boolean;
```

are too broad to access specific properties.

Narrowing helps TypeScript safely identify the actual type.

---

# ✅ 1. `typeof` Narrowing

Used for primitive types:  
`string`, `number`, `boolean`, `bigint`, `symbol`, `undefined`, `function`

Example:

```ts
function log(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

---

# ✅ 2. `instanceof` Narrowing

Used for class-based objects.

```ts
class Dog {}
class Cat {}

function handleAnimal(a: Dog | Cat) {
  if (a instanceof Dog) {
    console.log("Dog found");
  } else {
    console.log("Cat found");
  }
}
```

---

# ✅ 3. Truthiness Narrowing

Works for values that may be `null` or `undefined`.

```ts
function process(value?: string) {
  if (value) {
    console.log(value.toUpperCase()); // ✅ value is string
  }
}
```

---

# ✅ 4. Equality Narrowing

Checks using `===`, `!==`, `==`, `!=`.

```ts
function compare(x: number | null) {
  if (x !== null) {
    console.log(x + 1); // ✅ x is a number
  }
}
```

---

# ✅ 5. Discriminated Union Narrowing

Union types with a **common discriminant property**.

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

# ✅ 6. `in` Operator Narrowing

Used when checking if a property exists in an object.

```ts
function getLength(a: { length: number } | { size: number }) {
  if ("length" in a) {
    return a.length;
  }
  return a.size;
}
```

---

# ✅ 7. Custom Type Predicates

You can create your own narrowing functions.

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function test(value: unknown) {
  if (isString(value)) {
    value.trim(); // ✅ narrowed to string
  }
}
```

---

# ✅ 8. Exhaustive Checking with `never`

Ensures all cases in a union are handled.

```ts
function handleShape(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return shape.radius;
    case "square":
      return shape.size;
    default:
      const _exhaustive: never = shape; // ✅ compile-time safety
      return _exhaustive;
  }
}
```

---

# ✅ Summary Table

| Narrowing Technique | Works With                |
| ------------------- | ------------------------- |
| `typeof`            | primitives                |
| `instanceof`        | class instances           |
| truthiness          | null/undefined checks     |
| equality            | equality comparisons      |
| discriminant        | tagged union types        |
| `in` operator       | object property existence |
| custom predicates   | user-defined type guards  |

---

If you want, I can also create a cheat sheet for _all narrowing techniques with examples_ you can use for revision.
