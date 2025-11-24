# React's shallowEqual Implementation

If two objects share the same reference, then both are shallow equal.
If two objects do not share the same reference, and their first-level properties also do share the same references, then React’s shallow equality will return true.
If two objects do not share the same reference, and their first-level properties also do not share the same references, then React’s shallow equality will return false, even if the values look identical.

```jsx
const a = { x: { y: 1 } }; // nested object
const b = { x: { y: 1 } }; // same shape/values but new reference

shallowEqual(a, b); // ❌ false

---

const inner = { y: 1 };

const a = { x: inner };
const b = { x: inner };

shallowEqual(a, b); // ✅ true

```

React uses a version of the classic shallow comparison:
It does shallow comparison of references, not value comparison.

So:

If objA[key] is a primitive, it compares by value.
If objA[key] is an object or array, it compares by reference, not by contents.

```js
function shallowEqual(objA, objB) {
  // Step 1: Check if both are the same reference
  if (Object.is(objA, objB)) {
    return true;
  }

  // Step 2: Check if either is not an object or is null
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // Step 3: Get all keys from both objects
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // Step 4: Check if they have the same number of keys
  if (keysA.length !== keysB.length) {
    return false;
  }

  // Step 5: Check if all keys and values match
  for (let i = 0; i < keysA.length; i++) {
    const currentKey = keysA[i];

    if (
      !Object.prototype.hasOwnProperty.call(objB, currentKey) ||
      !Object.is(objA[currentKey], objB[currentKey])
    ) {
      return false;
    }
  }

  return true;
}
```

## Key Points

- Two objects are shallow equal only if:

  - They have the same set of first-level keys
  - Each corresponding value is strictly equal (===)
  - For objects/arrays: this means same reference
  - For primitives: same value

- Uses Object.is() for comparison (not ===)
- Object.is(NaN, NaN) → true (unlike ===)
- Object.is(+0, -0) → false (unlike ===)
- Compares key counts - Both objects must have the same number of properties
- Only checks own properties - Uses hasOwnProperty check
- Shallow only - Nested objects are compared by reference, not contents

## Where React Uses shallowEqual (Only in two cases: React.pureComponent and React.memo)

1. React.PureComponent

   ```js
   class MyComponent extends React.PureComponent {
     // Automatically uses shallowEqual for props and state
   }
   ```

2. React.memo

   ```js
   const MyComponent = React.memo(function MyComponent(props) {
     // Uses shallowEqual by default for props
   });
   ```

## ⚠️ Important: useState & useReducer uses reference equality check, Object.is() (not shallow or deep comparison)

**Critical:** `useState` and `useReducer` do **NOT** use `shallowEqual`. They use **`Object.is()`** (simple reference check only).

```js
// useState/useReducer internal check:
if (Object.is(prevState, newState)) {
  // Same reference → Skip re-render
  return;
}
// Different reference → Re-render
```

### Examples of useState/useReducer Behavior

```js
const [user, setUser] = useState({ name: "John", age: 30 });

// ❌ Different reference → WILL re-render (even with same values)
setUser({ name: "John", age: 30 });
// Object.is() returns false → RE-RENDERS

// ✅ Same reference → NO re-render
const userObj = { name: "John", age: 30 };
setUser(userObj);
setUser(userObj); // Same reference → NO RE-RENDER
```

**Key Difference:**

- **shallowEqual**: Compares first-level properties (primitives by value, objects by reference)
- **Object.is()**: Only checks if references are the same (no property comparison)

This is why you need to create new objects when updating state:

```js
// ✅ Correct - creates new reference
setUser({ ...user, age: 31 });

// ❌ Wrong - same reference, won't trigger re-render
user.age = 31;
setUser(user); // Same reference → NO RE-RENDER
```

---

## Correct Definitions

### Reference Equality (Simple)

```js
obj1 === obj2; // or Object.is(obj1, obj2)
```

### Shallow Equality (More Complex)

```js
shallowEqual(obj1, obj2);
```

✅ True if:
EITHER they are the same reference
OR they have the same keys AND each first-level property value is equal (using Object.is())
⚠️ Nested objects/arrays are compared by reference only, not contents

`The key insight: Shallow equality checks first-level properties, not just the object reference itself.`

### Deep Equality (Most Complex)

```js
deepEqual(obj1, obj2); // e.g., lodash \_.isEqual
```

✅ True if they have the same structure and all nested values are equal (recursively)

### Summary of Your Statements

![alt text](image.png)

### Visual Summary

```js
const obj1 = { a: 1, b: { nested: "value" } };

// Scenario 1: Same reference
const obj2 = obj1;
obj1 === obj2; // true (reference equality)
shallowEqual(obj1, obj2); // true (shallow equality)
deepEqual(obj1, obj2); // true (deep equality)

// Scenario 2: Different reference, same first-level values
const nested = { nested: "value" };
const obj3 = { a: 1, b: nested };
const obj4 = { a: 1, b: nested }; // Same nested reference
obj3 === obj4; // false (different references)
shallowEqual(obj3, obj4); // true ✅ (same first-level values)
deepEqual(obj3, obj4); // true (deep equality)

// Scenario 3: Different reference, different nested references
const obj5 = { a: 1, b: { nested: "value" } };
const obj6 = { a: 1, b: { nested: "value" } };
obj5 === obj6; // false (different references)
shallowEqual(obj5, obj6); // false ❌ (nested objects differ)
deepEqual(obj5, obj6); // true (deep equality)
```

### If two objects have the same reference, then

✅ Shallow equal MUST be true
✅ Deep equal MUST be true

---

### Example of objects with different reference, first level properties same value but different reference

```js
// ❌ Same CONTENT, different REFERENCES
const obj1 = {
  name: "John",
  address: { city: "NYC" }, // New object instance
};

const obj2 = {
  name: "John",
  address: { city: "NYC" }, // Another new object instance
};

// Even though address looks the same, it's a different object
obj1.address === obj2.address; // false (different references)

// Therefore:
shallowEqual(obj1, obj2); // false ❌
```

### if the objects reference is same but first level properties reference is not same then? is this case even possible?

❌ NO, this case is IMPOSSIBLE!
If the object reference is the same, then ALL its properties (including their references) MUST be the same.
Why It's Impossible
When you have the same object reference, you're pointing to the exact same location in memory. Everything about that object is identical because it's literally the same object.

It is only possible if we MUTATE the object. But in that case both objects will again have the same value.

```js
const obj = { name: "John", address: { city: "NYC" } };
const sameRef = obj;

// BEFORE mutation:
obj.address === sameRef.address; // true (both point to same nested object)

// Mutate the property (assign new nested object):
obj.address = { city: "LA" }; // NEW object!

// AFTER mutation:
obj === sameRef; // TRUE ✅ (still same parent object)
obj.address === sameRef.address; // TRUE ✅ (both see the mutation!)

// Why? Because obj and sameRef are the SAME object,
// so when you mutate obj.address, sameRef.address also changes!
```

The Only Way to Have Different Property References is: You need DIFFERENT parent object references:

```js
const address1 = { city: "NYC" };
const address2 = { city: "NYC" };

const obj1 = { name: "John", address: address1 };
const obj2 = { name: "John", address: address2 };

// Different parent objects:
obj1 === obj2; // false ✅

// Different nested references:
obj1.address === obj2.address; // false ✅

// This is the case you described earlier!
```
