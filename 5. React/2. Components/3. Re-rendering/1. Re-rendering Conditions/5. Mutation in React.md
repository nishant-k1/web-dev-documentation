# Mutation in React

## In React, mutation never takes place according to its philosophy right?

- Short answer: Yes — React’s core philosophy is immutability, meaning React itself never mutates your state.
- But you can accidentally mutate objects in JavaScript if you write code that mutates them. React simply does not detect such mutations.

## ✅ Does React Ever Mutate?

- No. React itself does not mutate your state.
- React always works by:
  - Creating new virtual DOM nodes
  - Re-rendering based on new references
  - Comparing old vs new values using Object.is() or shallow comparison (memo/pure)

👉 React’s internal mechanism is immutable.
But JavaScript Can Mutate — React Cannot Stop You
If you mutate objects or arrays like this:

```js
state.user.name = "Nishant";
setState(state);
```

React cannot detect it, because:

- The object reference is the same
- React doesn’t know anything changed
- React does not perform deep equality checks

So the UI will not update because React thinks "nothing changed".

This is why React developers follow immutable updates:

```js
setState((prev) => ({
  ...prev,
  user: { ...prev.user, name: "Nishant" },
}));
```

## React’s Philosophy (Important Points)

1. **React expects your data to be immutable**

   You must always produce:

   - new objects
   - new arrays
   - new references

2. **React never mutates your previous state internally**

   Every update produces new structures in the virtual DOM.

3. **React relies 100% on reference changes**

   No shallow/deep equality except memo/pure.

4. If you mutate an object and reuse the same reference, React cannot detect it Because:

   ```js
   Object.is(prevObj, sameObjReference) → true
   ```

   So no re-render happens.
