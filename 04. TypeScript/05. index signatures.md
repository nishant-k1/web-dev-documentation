# Index Signatures in TypeScript

Index signatures allow you to define **dynamic object keys** when you don’t know the exact property names in advance.  
They are useful when the shape of an object is flexible, but you still want type safety for the values.

---

# ✅ 1. Basic Index Signature

```ts
interface Scores {
  [key: string]: number;
}
```

Meaning:  
Any property with a **string** key inside this object must have a **number** value.

Example:

```ts
const marks: Scores = {
  math: 95,
  english: 88,
  science: 92,
};
```

Adding any string key with a non-number value will cause an error.

---

# ✅ 2. Using Index Signature with Known Properties

You can combine known properties and dynamic properties:

```ts
interface User {
  id: number;
  name: string;
  [key: string]: string | number;
}
```

Here:

- `id` must be a number
- `name` must be a string
- Any additional string key must be `string | number`

---

# ✅ 3. Index Signature Types

### A. String Index Signature

```ts
[key: string]: Type;
```

Used when keys are strings.

### B. Number Index Signature

```ts
[key: number]: Type;
```

Example:

```ts
interface NumberIndexed {
  [index: number]: string;
}
```

This is common for array-like objects.

---

# ✅ 4. Important Rule: Number Index Must Be Subtype of String Index

JavaScript automatically converts numeric keys into strings.

Example:

```ts
interface Example {
  [x: number]: string;
  [x: string]: string | number;
}
```

Here:

- The **string index signature** must accept all values from the **number index signature**.

---

# ✅ 5. Index Signatures with Unions

You can restrict possible value types:

```ts
interface Config {
  [key: string]: string | number | boolean;
}
```

---

# ✅ 6. Using `Record` (Cleaner Alternative)

`Record` is a built-in utility that behaves like index signatures.

```ts
type Scores = Record<string, number>;
```

Same as:

```ts
interface Scores {
  [key: string]: number;
}
```

Sometimes `Record` is cleaner and preferred.

---

# ✅ 7. Example: Mapping IDs to Users

```ts
interface UserMap {
  [id: string]: {
    name: string;
    age: number;
  };
}

const users: UserMap = {
  "101": { name: "Nishant", age: 32 },
  "102": { name: "Amit", age: 28 },
};
```

---

# ✅ 8. Summary Table

| Feature                   | Description                                   |
| ------------------------- | --------------------------------------------- |
| Dynamic keys              | `[key: string]: T`                            |
| Dynamic numeric keys      | `[index: number]: T`                          |
| Known + dynamic props     | Allowed                                       |
| Must allow key conversion | number → string conversion must be compatible |
| `Record` alternative      | Cleaner way to express index signatures       |

---

Index signatures are great when dealing with flexible objects, maps, dictionaries, and configs.  
If you want, I can also explain **difference between Index Signatures and Mapped Types** next.
