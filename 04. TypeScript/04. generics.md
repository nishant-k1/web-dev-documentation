# Generics in TypeScript

Generics allow you to write **reusable**, **flexible**, and **type-safe** code by providing a **placeholder type** that gets filled in later.

Think of generics as **variables for types**.

Example:

```ts
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");
identity<number>(10);
```

---

# ✅ 1. Why Generics?

Without generics, you lose type safety:

```ts
function identity(value: any) {
  return value; // no type safety
}
```

With generics, TypeScript remembers the exact type:

```ts
identity<string>("Nishant"); // returns string
identity<number>(123); // returns number
```

Generics let you **preserve types**, not erase them.

---

# ✅ 2. Generic Functions

```ts
function wrap<T>(value: T): { item: T } {
  return { item: value };
}

const result = wrap("hello");
// type: { item: string }
```

TypeScript infers T automatically:

```ts
wrap(10); // T = number
```

---

# ✅ 3. Generic Interfaces

```ts
interface ApiResponse<T> {
  status: number;
  data: T;
}

const userResponse: ApiResponse<{ name: string }> = {
  status: 200,
  data: { name: "Nishant" },
};
```

---

# ✅ 4. Generic Type Aliases

```ts
type Box<T> = {
  value: T;
};
```

Usage:

```ts
const numBox: Box<number> = { value: 100 };
const strBox: Box<string> = { value: "Hello" };
```

---

# ✅ 5. Generic Classes

```ts
class Container<T> {
  constructor(private value: T) {}
  get() {
    return this.value;
  }
}

const c = new Container<string>("hello");
```

---

# ✅ 6. Default Generic Types

You can give generics default values.

```ts
interface Request<T = string> {
  body: T;
}

const r: Request = { body: "hello" }; // T = string by default
```

---

# ✅ 7. Constraining Generics (`extends`)

You can restrict what kinds of types T can be.

```ts
function getLength<T extends { length: number }>(value: T) {
  return value.length;
}

getLength("hello"); // ✅ string has length
getLength([1, 2, 3]); // ✅ array has length
// getLength(10); ❌ Error
```

---

# ✅ 8. Multiple Type Parameters

```ts
function pair<A, B>(a: A, b: B) {
  return { a, b };
}

const p = pair<string, number>("age", 30);
```

---

# ✅ 9. Generic Utility Functions

Generic functions allow strong type inference:

```ts
function merge<A, B>(a: A, b: B) {
  return { ...a, ...b };
}

const obj = merge({ name: "Nishant" }, { age: 30 });
// type: { name: string; age: number }
```

---

# ✅ 10. Generic keyof / Mapped Types

Generics combined with `keyof` produce very strict functions:

```ts
function getProp<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

getProp({ name: "Nishant", age: 30 }, "name"); // ✅
// getProp(obj, "height"); ❌ Error: height not in T
```

This pattern is used inside all major utility types.

---

# ✅ 11. Generics with Arrays — `Array<T>`

```ts
let numbers: Array<number> = [1, 2, 3];
```

`Array<T>` is already generic, so you pass a concrete type instead of writing `Array<T>` directly.

---

# ✅ 12. Generics with Promises — `Promise<T>`

```ts
const p: Promise<string> = new Promise((resolve) => {
  resolve("done");
});
```

`Promise<T>` means a promise that resolves to T.

---

# ✅ Summary

```
Generics = type variables that preserve types and make code reusable.

Use them when:
- You want to create flexible functions, interfaces, or classes
- You need to preserve the type of inputs
- You work with collections, APIs, utilities, or reusable components
```

---

If you want, I can create a **Generics Cheat Sheet** with real interview-level patterns (generic constraints, conditional generics, infer keyword, mapped types, etc.).
