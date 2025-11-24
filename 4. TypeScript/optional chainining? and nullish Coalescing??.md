# Optional Chaining (`?.`) and Nullish Coalescing (`??`) in TypeScript

These two operators help avoid runtime errors and make your code safer when dealing with values that may be `null` or `undefined`.

---

# ✅ Optional Chaining (`?.`)

Optional Chaining lets you **safely access properties** on values that might be `null` or `undefined`.

Instead of throwing an error, it returns `undefined`.

### Without optional chaining:

```ts
user.address.city; // ❌ crashes if address is null
```

### With optional chaining:

```ts
user.address?.city; // ✅ returns undefined if address is null/undefined
```

### Common Use Cases

#### 1. Accessing nested properties

```ts
const city = user?.address?.city;
```

#### 2. Calling a function safely

```ts
obj?.doSomething?.();
```

#### 3. Accessing arrays safely

```ts
const first = users?.[0];
```

---

# ✅ Nullish Coalescing (`??`)

`??` provides a **default value only when the left side is null or undefined**.

### Left side is `null` or `undefined` → return right side

### Otherwise → return left side

Example:

```ts
let value = user.name ?? "Guest";
```

Meaning:

- If `user.name` is `null` or `undefined` → `"Guest"`
- If `user.name` is `""` or `0` → keep the value

This is different from `||`.

---

# ✅ `??` vs `||` (Important Difference)

### `||` treats these as falsy:

- `0`
- `""` (empty string)
- `false`

Example:

```ts
0 || 5; // → 5  (wrong for numeric logic)
0 ?? 5; // → 0  (correct)
```

### Nullish Coalescing only triggers on:

- `null`
- `undefined`

---

# ✅ Using `?.` with `??` together

This is very common:

```ts
const city = user?.address?.city ?? "Unknown City";
```

Meaning:

- If user or address does not exist → `"Unknown City"`
- If city exists → use it
- If city is `""` → keep it (because `""` is not nullish)

---

# ✅ Real Example

```ts
function getUserName(user?: { profile?: { name?: string } }) {
  return user?.profile?.name ?? "Anonymous";
}
```

This avoids long `if` checks and keeps your code safe.

---

# ✅ Summary Table

| Feature            | Operator | Meaning                        |
| ------------------ | -------- | ------------------------------ | --- | --- | --- | ----------------------------------------------- |
| Optional Chaining  | `?.`     | Safely access nested values    |
| Nullish Coalescing | `??`     | Default only on null/undefined |
| `                  |          | `(OR) vs`??`                   | `   |     | `   | Default on falsy values like `0`, `""`, `false` |

---

If you want, I can also show real-world React examples where `?.` and `??` help avoid crashes in components.
