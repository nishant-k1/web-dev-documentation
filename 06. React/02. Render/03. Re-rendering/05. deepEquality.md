# deep Equal

- While shallow equality only compares first-level values.
- deep equality recursively compares every nested value until the deepest leaf.
- Two values are considered equal if all their nested properties match, even if the references are different.
- It is a value-based comparison, not a reference-based one.
- Typical deepEqual logic

```js
function deepEqual(a, b) {
  if (a === b) return true; // handles primitives

  if (typeof a !== "object" || typeof b !== "object" || !a || !b) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!deepEqual(a[key], b[key])) return false; // recursive check
  }

  return true;
}
```

## Why React does NOT use deepEqual

🔹 React uses shallow comparison for performance
Deep equality is slow (O(n) or worse) because it must traverse the entire object tree.

React’s philosophy → use references for speed.

## For deep comparison even if the nested properties have different reference but same values (object or arrays) then still it would be deep equal, reference has nothing to do with deep equality?

**Deep comparison does NOT care about references**
Deep equality checks values, not references.
So even if the nested objects/arrays are different references, deepEqual still returns true as long as the contents match.

```js
const a = { x: { y: [1, 2, 3] } };
const b = { x: { y: [1, 2, 3] } };

// Both x and y are NEW objects/arrays with new references
deepEqual(a, b); // ✅ true
shallowEqual(a, b); // ❌ false
```

In deep comparison, nested objects and arrays can have different references but still be considered equal if their nested values match. Reference has nothing to do with deep equality.

If all nested properties have the same reference, deepEqual will definitely return true (as long as the values also match).

But deepEqual does NOT require same references —
it only requires same values.
So deeper reference equality is irrelevant; it just passes quickly.

👉 If values match → deepEqual = true
👉 Reference equality is simply a shortcut in deepEqual, not a requirement.
