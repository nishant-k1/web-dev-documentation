# Shallow Equal vs Deep Equal

| Concept           | shallowEqual                    | deepEqual                       |
| ----------------- | ------------------------------- | ------------------------------- |
| Depth checked     | Only first level                | All nested levels (recursive)   |
| Object comparison | By reference (`===`)            | By structure and values         |
| Expensive?        | Very cheap                      | Expensive (can be slow)         |
| Used by React?    | Yes (React.memo, PureComponent) | No (too slow)                   |
| Typical result    | Often false                     | Often true for identical shapes |

❌ Shallow equal fails, deepEqual succeeds

const a = { x: { y: 1 } };
const b = { x: { y: 1 } };

**One simple rule to remember**

`Shallow equality = reference check`
`Deep equality = value check`

References matter only in shallow comparisons.

## Relationship Between ShallowEqual and DeepEqual

✅ **If two objects are shallowEqual → They are automatically deepEqual**

**Why?**

- If `shallowEqual(a, b) === true`, it means nested objects/arrays share the **same references**
- Same references = same structure and values
- Therefore, `deepEqual(a, b) === true` as well

```javascript
const inner = { y: 1 };
const a = { x: inner };
const b = { x: inner };

shallowEqual(a, b); // ✅ true
deepEqual(a, b); // ✅ true (automatically)
```

❌ **The reverse is NOT true**

- If `deepEqual(a, b) === true`, `shallowEqual(a, b)` might still be `false`

- This happens when objects have the same values but different references

```javascript
const a = { x: { y: 1 } };
const b = { x: { y: 1 } };

shallowEqual(a, b); // ❌ false (different references)
deepEqual(a, b); // ✅ true (same values)
```

**Key insight:** `shallowEqual` is a stricter condition than `deepEqual` when it comes to reference equality.

## If two objects doesn't have same reference but the first level properties are exactly same but again doesn't have same reference, will both object be considered as shallow equal, according to react's shallowEquality logic?

No.
If two objects do not share the same reference, and their first-level properties also do not share the same references, then React’s shallow equality will return false, even if the values look identical.

React uses a version of the classic shallow comparison:

```js
function shallowEqual(objA, objB) {
  if (objA === objB) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (objA[key] !== objB[key]) return false; // shallow compare
  }

  return true;
}
```

If objA[key] is a primitive, it compares by value.
If objA[key] is an object or array, it compares by reference, not by contents.

## If given objects are shallowEqual then then both automatically becomes deep equal?

Yes, if two objects are shallowEqual, they are also deepEqual
Why?
shallowEqual returns true in two scenarios:

1. Same reference: Both objects point to the same memory location → also deepEqual.
2. Different top-level reference, but first-level properties share references: Nested objects/arrays use the same references → also deepEqual.

Why the implication holds:

- If shallowEqual(a, b) === true, nested objects/arrays share the same references.
- Same references imply the same structure and values.
- Therefore, deepEqual(a, b) === true as well.

Note: The reverse is not true. Objects can be deepEqual but not shallowEqual if they have the same values but different references.
