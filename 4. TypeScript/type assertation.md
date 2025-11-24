# Type Assertions in TypeScript

Type assertions tell TypeScript:  
**“Trust me. I know the actual type of this value.”**

You are not converting the value.  
You are just instructing TypeScript to treat it as a different type.

---

# ✅ 1. `as` Syntax (Preferred)

```ts
let value: unknown = "Hello";

let str = value as string;
```

This tells TypeScript:  
Value is a `string`, so treat it like one.

---

# ✅ 2. Angle Bracket Syntax `< >`

Works the same as `as`, but not allowed in React JSX.

```ts
let value: unknown = "Hello";
let str = <string>value;
```

Use this only outside JSX.

---

# ✅ 3. Common Use Cases

### ✅ A. Narrowing `unknown` or `any`

```ts
let input: unknown = "Nishant";
let len = (input as string).length;
```

### ✅ B. Working with DOM elements

```ts
const el = document.getElementById("myDiv") as HTMLDivElement;
el.innerText = "Hello";
```

### ✅ C. Telling TS the more specific type

```ts
interface Person {
  name: string;
}

let data = {} as Person; // data will be treated as Person
data.name = "Nishant";
```

---

# ✅ 4. Why Type Assertions Are Not Type Conversions

This does not convert number to string:

```ts
let num = 10 as unknown as string; // ❌ still a number at runtime
```

TypeScript only changes its understanding, not the actual value.

---

# ✅ 5. Non-null Assertion (`!`)

Tells TypeScript “this value will NOT be null or undefined.”

```ts
const btn = document.querySelector("button")!;
btn.click(); // ✅ No null checks needed
```

Use only when you are absolutely sure.

---

# ✅ 6. Forced Casting (Double Assertion)

Sometimes TS won’t let you assert directly to an incompatible type.

Example:

```ts
let val = "hello";

// ERROR: string cannot be cast to number
// let x = val as number;

let x = val as unknown as number; // ✅ Forces it, but unsafe
```

Use rarely, and carefully.

---

# ✅ 7. When to Use Type Assertions

Use when:

- TypeScript cannot infer the correct type.
- Working with DOM or external APIs.
- You KNOW the type is correct.
- Narrowing `unknown` or `any`.

Avoid when:

- You are bypassing actual type safety.
- You are using double assertions without reason.

---

# ✅ Summary

| Feature                  | Description                       |
| ------------------------ | --------------------------------- |
| `as`                     | Preferred way of asserting types  |
| `<T>`                    | Alternative syntax (not for JSX)  |
| `!`                      | Non-null assertion                |
| Assertions ≠ Conversions | They do not change runtime values |

---

If you want, I can also explain **type casting vs type assertion**, so you never confuse the two.
