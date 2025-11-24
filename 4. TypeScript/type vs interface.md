# Interface vs Type in TypeScript

## ✅ Can an interface be used for primitives?

No. **Interface is only for describing object shapes**, not primitives.

Interfaces can describe:

- Object structures
- Function signatures
- Class contracts
- Index signatures

Example:

```ts
interface User {
  name: string;
  age: number;
}
```

Interfaces cannot describe:

- Primitives (`string`, `number`, `boolean`, etc.)
- Union types
- Literal types
- Type compositions

Invalid examples:

```ts
interface Age = number;               // ❌ not allowed
interface ID = string | number;       // ❌ not allowed
```

## ✅ What to use instead?

Use `type` when you need:

- Primitives
- Unions
- Literals
- Tuples
- Complex compositions

Examples:

```ts
type Age = number;
type ID = string | number;
type Status = "success" | "fail";
```

## ✅ Rule of Thumb

- Use **interface** for object shapes and class structures.
- Use **type** for primitives, unions, intersections, and advanced compositions.

```md

```

---

# Differences Between `interface` and `type` in TypeScript

Here is a clear and complete comparison of how `interface` and `type` differ.

---

## ✅ 1. Extension / Inheritance

### **Interfaces can extend interfaces**

```ts
interface A {
  x: number;
}

interface B extends A {
  y: string;
}
```

### **Interfaces can extend types**

```ts
type A = { x: number };

interface B extends A {
  y: string;
}
```

### **Types cannot extend interfaces directly**

Types use **intersection** instead:

```ts
type A = { x: number };
type B = A & { y: string };
```

---

## ✅ 2. Declaration Merging (Interface can merge, Type cannot)

### **Interface merging**

```ts
interface User {
  name: string;
}

interface User {
  age: number;
}

const u: User = {
  name: "Nishant",
  age: 30,
};
```

The two interfaces merge into one.

### **Type alias cannot merge**

This will throw an error:

```ts
type User = { name: string };
type User = { age: number }; // ❌ Error
```

---

## ✅ 3. Use Case Differences

### **Interface is for describing shapes** (mostly objects):

- Objects
- Classes
- Function signatures
- Index signatures

### **Type is more powerful**:

- Primitives (`string`, `number`, etc.)
- Unions
- Intersections
- Utility types
- Tuples
- Literal types
- Complex compositions

```ts
type Status = "success" | "fail"; // ✅ Only type can do this
```

---

## ✅ 4. Syntax Differences

### Interfaces use `extends`

```ts
interface A {
  x: number;
}
interface B extends A {
  y: string;
}
```

### Types use intersection `&`

```ts
type B = A & { y: string };
```

---

## ✅ 5. Implementing classes

Both `type` and `interface` can describe class shapes, but **interface is more common**.

```ts
interface Person {
  name: string;
}

class User implements Person {
  name = "Nishant";
}
```

---

## ✅ 6. Preferred usage in real-world projects

### Use `interface` when:

- You are describing object shapes
- You want declaration merging
- You want intuitive inheritance for objects/classes

### Use `type` when:

- You need unions
- You need primitives
- You need tuples
- You need complex compositions

---

## ✅ Quick Summary Table

| Feature                   | Interface | Type             |
| ------------------------- | --------- | ---------------- |
| Extends other interfaces  | ✅ Yes    | ➖ Not directly  |
| Extends types             | ✅ Yes    | ➖ Not directly  |
| Types can merge           | ❌ No     | ✅ With `&` only |
| Declaration merging       | ✅ Yes    | ❌ No            |
| Works with primitives     | ❌ No     | ✅ Yes           |
| Supports unions           | ❌ No     | ✅ Yes           |
| Better for object shapes  | ✅ Yes    | ✅ Yes           |
| Better for advanced types | ❌ No     | ✅ Yes           |

---

If you want, I can prepare a cheat sheet comparing all syntax patterns with examples.
