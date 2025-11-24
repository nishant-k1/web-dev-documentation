# Utility Types in TypeScript

### (Partial, Required, Pick, Omit, Record, Readonly)

These utility types help transform existing types without rewriting them.  
They are essential for clean, flexible, and maintainable TypeScript code.

---

# ✅ 1. `Partial<T>`

Makes **all properties optional**.

### Before:

```ts
interface User {
  name: string;
  age: number;
}
```

### After:

```ts
type UserUpdate = Partial<User>;
```

Type becomes:

```ts
{
  name?: string;
  age?: number;
}
```

Use when updating objects partially (like PATCH requests).

---

# ✅ 2. `Required<T>`

Makes **all optional properties mandatory**.

### Before:

```ts
interface User {
  name?: string;
  age?: number;
}
```

### After:

```ts
type FullUser = Required<User>;
```

Type becomes:

```ts
{
  name: string;
  age: number;
}
```

Useful when you want complete, fully-defined data.

---

# ✅ 3. `Pick<T, K>`

Selects **specific properties** from a type.

```ts
interface User {
  name: string;
  age: number;
  email: string;
}
```

### Example:

```ts
type UserPreview = Pick<User, "name" | "email">;
```

Result:

```ts
{
  name: string;
  email: string;
}
```

Useful for making lightweight or context-specific versions of types.

---

# ✅ 4. `Omit<T, K>`

Opposite of Pick.  
Removes specific properties.

```ts
type UserWithoutEmail = Omit<User, "email">;
```

Result:

```ts
{
  name: string;
  age: number;
}
```

Use when you want a type excluding sensitive or unnecessary fields.

---

# ✅ 5. `Record<K, T>`

Creates an object type with keys of type `K` and values of type `T`.

### Example:

```ts
type ScoreBoard = Record<string, number>;
```

Usage:

```ts
const scores: ScoreBoard = {
  math: 95,
  english: 88,
};
```

Useful for maps, dictionaries, dynamic objects.

---

# ✅ 6. `Readonly<T>`

Makes **all properties immutable**.

```ts
interface Config {
  port: number;
  url: string;
}
```

### Example:

```ts
const cfg: Readonly<Config> = {
  port: 3000,
  url: "localhost",
};

cfg.port = 4000; // ❌ Error
```

Use for constants, environment configs, safe immutable structures.

---

# ✅ Summary Table

| Utility Type    | What It Does                       | Use Case                     |
| --------------- | ---------------------------------- | ---------------------------- |
| **Partial<T>**  | Makes all properties optional      | Updates, PATCH APIs          |
| **Required<T>** | Makes all properties required      | Validation, complete objects |
| **Pick<T,K>**   | Select specific properties         | Lightweight views, previews  |
| **Omit<T,K>**   | Remove specific properties         | Hide sensitive data          |
| **Record<K,T>** | Object type with key-value mapping | Dictionaries, maps           |
| **Readonly<T>** | Makes all props immutable          | Configs, constants           |

---

If you want, I can extend this list to include the advanced utility types like  
`Exclude`, `Extract`, `NonNullable`, `ReturnType`, `Parameters`, and `Awaited`.
