# Comparison in React

In React, `shallow comparison` is explicitly used only in `React.memo` (for functional components) and `React.PureComponent` (for class components) to compare props (and state in case of PureComponent). Everywhere else — such as `state updates` or dependency checks in hooks like `useEffect, useMemo, useCallback` etc — React performs a `reference equality check` using the `Object.is()` method, not a shallow or deep comparison.

🔹 1. React.memo

- Used for functional components.
- Performs a shallow comparison of props between renders.
- If props are shallowly equal → component re-render is skipped.

🔹 2. React.PureComponent

- Used for class components.
- Performs a shallow comparison of both props and state.
- Helps in avoiding unnecessary re-renders if neither props nor state changed shallowly.

🔹 3. Everywhere Else (Hooks, State, Context)

- React uses reference equality (Object.is):
- useState compares new and old values with Object.is().
- useEffect, useMemo, useCallback dependency arrays use reference equality, not shallow or deep equality.
- So, even if two objects have identical values but different references, React considers them different.

## Many a times in hooks like useEffect, useMemo and useCallbacks, we're forced to pass object properties, like user.name in dependencies, why not the object itself work, if object's properties changes, does that not mean the object reference has changed and simply only using the object like user as a dependency will help re re-run the the callbacks in hooks, as if user.name changed means definitely user reference has also changed?

1. You want fine-grained control → rerun only when name changes
2. You want to avoid unnecessary re-renders if unrelated fields change
3. You are not 100% sure user object will be recreated on update
4. The source of the object might mutate internally
5. An external state manager may give you an unchanged reference

Sometimes you intentionally want:

- effect to run only when name changes
- not when email, phone, id, etc. change

It’s a deliberate dependency refinement to avoid re-running on unrelated changes.
You want maximal performance
Avoid re-running effects for every tiny object change.
