# 🧠 React’s Mental Model for Comparisons (One-Page Summary)

---

## 1️⃣ React Has Only ONE Question Everywhere

Whenever state updates, props change, or dependencies are checked, React asks:

> **“Is the NEW value the SAME as the OLD value?”**

React answers this using:

### 👉 `Object.is(oldValue, newValue)`

This single rule controls:

- rerenders
- effect re-runs
- memo recalculations
- callback regenerations

---

## 2️⃣ What “Same” Means in React

### ✔️ Primitives (number, string, boolean, null, undefined)

Checked **by value**:

- `1` vs `1` → same
- `"a"` vs `"a"` → same
- `true` vs `true` → same
- `NaN` vs `NaN` → same (reason React uses Object.is)

### ✔️ Objects / Arrays / Functions

Checked **by reference**:

- same reference → same
- new reference → different  
  (even if contents are identical)

---

## 3️⃣ The Complete React Rerender Logic in One Table

| Value Type               | React Compares By | Effect                               |
| ------------------------ | ----------------- | ------------------------------------ |
| Primitives               | value             | rerender only when value changes     |
| Objects/Arrays/Functions | reference         | rerender only when reference changes |

---

## 4️⃣ Where React Uses `Object.is()`

React relies on `Object.is()` in:

- `useState`
- `useReducer`
- `useEffect` dependencies
- `useMemo` dependencies
- `useCallback` dependencies
- Context propagation
- Component rerender decisions
- Virtual DOM bailout path

Everywhere, React uses reference/value equality through `Object.is()`.

---

## 5️⃣ Visual Mental Model

```
oldValue ── Object.is() ── newValue
        │
        │ same?
        ▼
if yes → React SKIPS (no rerender / no effect)
if no  → React RUNS (rerender / effect / recompute)
```

---

## 6️⃣ Why Objects Can Break Expectations

If you mutate an object:

```js
user.name = "Nishant"; // ❌ mutation
setUser(user);
```

Then:

```
Object.is(prevUser, user) → true
```

React thinks:

> “Nothing changed.”

So:

- no rerender
- no effect re-run
- no memo recalculation

React **cannot detect** internal property changes.

---

## 7️⃣ Why You Sometimes Must List Individual Properties

Example:

```js
[user.name];
```

You do this because:

- React can reliably track primitive _value_ changes
- React cannot detect deep internal object changes if reference stays same

This is **intentional dependency refinement**, not a violation.

---

## 8️⃣ When Using Only `[user]` Is Safe

When you always update state immutably:

```js
setUser((prev) => ({ ...prev, name: newName }));
```

This guarantees:

```
Object.is(oldUser, newUser) → false
```

So React re-runs everything that depends on `user`.

---

## 9️⃣ Why `Object.is()` Is Actually Good

It makes React:

- predictable
- extremely fast
- simple to reason about
- free from deep comparison costs
- friendly to immutable patterns

---

## 🔟 Final 3-Line Summary (Ultimate Recall)

**React re-runs only when a value changes according to `Object.is()`.**  
**Objects trigger updates only when references change.**  
**If a reference stays the same, React assumes nothing changed — always.**
