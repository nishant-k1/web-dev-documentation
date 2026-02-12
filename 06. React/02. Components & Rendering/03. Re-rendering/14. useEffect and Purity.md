# ⚛️ Is a React Component Still Pure if it Uses `useEffect`?

---

## 🧩 Scenario

You said your React component:

- ❌ No mutations
- ❌ No side effects _during render_
- ✅ Output depends only on props
- ✅ But uses `useEffect` internally (which does have side effects)

So…  
Is it **pure or impure**?

Let’s explore carefully 👇

---

## 🧠 Short Answer

> ✅ **It’s still considered a _pure component_ (in React’s philosophy)**  
> ❌ But it contains a _controlled side effect_ — executed **after** rendering, not _during_ rendering.

---

## ⚙️ Why React Allows `useEffect`

React’s **rendering phase** and **commit phase** are separate:

- **Render phase:** React calls your component like a _pure function_ — it must not have side effects here.
- **Commit phase:** React applies changes to the DOM and runs `useEffect` callbacks — this is _outside_ the render cycle.

### 🧭 So in essence

> The **component function itself** remains _pure_,  
> while the **`useEffect` hook** is the _designated area_ for side effects.

---

## ✅ Example: Still a Pure Component

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // side effect — allowed here
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  }, [userId]);

  return user ? <h1>{user.name}</h1> : <p>Loading...</p>;
}
```

### Explanation

- Rendering depends **only** on `props` and `state`.
- `useEffect` triggers **after render**, not _during_.
- Hence, the **rendering logic** remains _pure_.

🟢 **Conclusion:** The component’s **rendering is pure**,  
but the **component as a whole performs side effects safely**.

---

## 🚫 When It Becomes Impure

A component becomes _impure_ when:

- Side effects occur **inside the render body**, not `useEffect`.
- Rendering logic depends on **external mutable data** (like global variables, random values, or DOM queries).
- You mutate props or shared state during render.

Example:

```jsx
function ImpureUserProfile({ userId }) {
  fetch(`/api/users/${userId}`); // ❌ runs during render
  return <p>Fetching...</p>;
}
```

➡️ This is **impure** because React’s render phase now performs a side effect directly.

---

## ⚖️ Philosophical Summary

| Aspect                                     | Pure Function | Pure Component | Component with `useEffect`     |
| ------------------------------------------ | ------------- | -------------- | ------------------------------ |
| Executes side effects during function call | ❌            | ❌             | ❌ (render) ✅ (after render)  |
| Deterministic output                       | ✅            | ✅             | ✅ (render output)             |
| Allowed to perform side effects            | ❌            | ❌             | ✅ (via `useEffect`)           |
| Considered pure by React                   | —             | ✅             | ✅ (as long as render is pure) |

---

## 🧭 Final Verdict

> ✅ **If side effects are isolated inside `useEffect`, the component remains pure in React’s sense.**

React’s entire hooks model is **built around this principle**:

> Keep the **rendering phase pure**,  
> move **side effects into controlled phases** (`useEffect`, `useLayoutEffect`).

---

### 💬 Key Takeaway

> Think of purity in React as:
> “**Render pure, effect later.**”

Or simply:

> 🧠 _Purity is about how you render, not what happens after you render._

---

Would you like me to create a **visual flow diagram (React lifecycle purity map)** showing how React separates _pure rendering_ and _side effect execution_ phases?  
It’s an excellent mental model for mastering React’s architecture.
