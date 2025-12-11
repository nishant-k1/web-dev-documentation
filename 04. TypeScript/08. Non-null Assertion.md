# Non-null Assertion (`!`) in TypeScript

The **non-null assertion operator** (`!`) tells TypeScript that a value **is not null or undefined**, even if TypeScript cannot guarantee it.

It lets you override TypeScript’s strict null-checking when **you know** the value is safe.

---

# ✅ 1. Basic Usage

```ts
let btn = document.querySelector("button")!;
btn.click(); // ✅ TypeScript now trusts that btn is not null
```

Meaning:  
“Trust me TypeScript, this is never null or undefined.”

---

# ✅ 2. Why It's Needed

TypeScript does this:

```ts
document.querySelector("button");
// type: HTMLButtonElement | null
```

To avoid errors, TS forces a null check.

Using `!` removes `null` and `undefined` from the type.

---

# ✅ 3. Without Non-null Assertion

```ts
const input = document.getElementById("name");
input.value; // ❌ Error: input might be null
```

---

# ✅ 4. With Non-null Assertion

```ts
const input = document.getElementById("name")!;
input.value; // ✅ Safe according to TypeScript
```

---

# ✅ 5. When to Use It

Use only when **you are absolutely sure** the value will exist:

- DOM elements guaranteed to be present
- Variables initialized later but always defined
- N
