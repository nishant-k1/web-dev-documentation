# Edge Cases in Comparisons

## Special Values in Object.is() vs ===

React uses `Object.is()` for comparisons, which handles edge cases differently than `===`.

## NaN Comparison

### Object.is() Behavior

```js
Object.is(NaN, NaN); // ✅ true
Object.is(NaN, Number("invalid")); // ✅ true
```

### === Behavior

```js
NaN === NaN; // ❌ false
Number("invalid") === NaN; // ❌ false
```

### In React

```js
const [value, setValue] = useState(NaN);

// React's check: Object.is(prevValue, newValue)
setValue(NaN); // Object.is(NaN, NaN) → true → NO re-render ✅
setValue(Number("invalid")); // Object.is(NaN, NaN) → true → NO re-render ✅
```

**Key Point:** `NaN` values are considered equal in React, so setting `NaN` to `NaN` won't trigger a re-render.

## +0 vs -0 Comparison

### Object.is() Behavior

```js
Object.is(+0, -0); // ❌ false (different!)
Object.is(+0, 0); // ✅ true
Object.is(-0, 0); // ✅ true
```

### === Behavior

```js
+0 === -0; // ✅ true (same!)
0 === +0; // ✅ true
0 === -0; // ✅ true
```

### In React

```js
const [value, setValue] = useState(+0);

// React's check: Object.is(prevValue, newValue)
setValue(-0); // Object.is(+0, -0) → false → RE-RENDERS ✅
setValue(0); // Object.is(+0, 0) → true → NO re-render ✅
```

**Key Point:** `+0` and `-0` are considered **different** in React, so changing from `+0` to `-0` will trigger a re-render.

## undefined Comparison

```js
Object.is(undefined, undefined); // ✅ true
undefined === undefined; // ✅ true

const [value, setValue] = useState(undefined);

setValue(undefined); // Object.is(undefined, undefined) → true → NO re-render ✅
```

**Behavior:** `undefined` values are always equal.

## null Comparison

```js
Object.is(null, null); // ✅ true
null === null; // ✅ true

const [value, setValue] = useState(null);

setValue(null); // Object.is(null, null) → true → NO re-render ✅
```

**Behavior:** `null` values are always equal.

## undefined vs null

```js
Object.is(undefined, null); // ❌ false
undefined === null; // ❌ false (but == is true!)

const [value, setValue] = useState(undefined);

setValue(null); // Object.is(undefined, null) → false → RE-RENDERS ✅
```

**Behavior:** `undefined` and `null` are considered different.

## Object Comparison Edge Cases

### Same Object Reference

```js
const obj = { name: "John" };
const [value, setValue] = useState(obj);

setValue(obj); // Same reference → Object.is(obj, obj) → true → NO re-render ✅
```

### Different Objects, Same Values

```js
const [value, setValue] = useState({ name: "John" });

setValue({ name: "John" }); // Different reference → Object.is(old, new) → false → RE-RENDERS ✅
```

### Mutated Object

```js
const [value, setValue] = useState({ name: "John" });

value.name = "Jane"; // Mutation
setValue(value); // Same reference → Object.is(value, value) → true → NO re-render ❌
// But value.name changed! This is why mutations are problematic.
```

## Array Comparison Edge Cases

### Empty Arrays

```js
const [value, setValue] = useState([]);

setValue([]); // Different reference → RE-RENDERS ✅
setValue(value); // Same reference → NO re-render ✅
```

### Arrays with Same Values

```js
const [value, setValue] = useState([1, 2, 3]);

setValue([1, 2, 3]); // Different reference → RE-RENDERS ✅
```

## Function Comparison Edge Cases

### Same Function Reference

```js
const fn = () => console.log("hello");
const [value, setValue] = useState(fn);

setValue(fn); // Same reference → NO re-render ✅
```

### Different Functions, Same Code

```js
const [value, setValue] = useState(() => console.log("hello"));

setValue(() => console.log("hello")); // Different reference → RE-RENDERS ✅
```

## ShallowEqual Edge Cases

### NaN in Objects

```js
const a = { value: NaN };
const b = { value: NaN };

shallowEqual(a, b); // ❌ false (different object references)
// But: Object.is(a.value, b.value) → true (NaN === NaN)
```

**Key Point:** `shallowEqual` compares object references first, so even if properties have same `NaN` values, different object references make them unequal.

### +0 vs -0 in Objects

```js
const a = { value: +0 };
const b = { value: -0 };

shallowEqual(a, b); // ❌ false (different object references)
// But: Object.is(a.value, b.value) → false (+0 !== -0)
```

### undefined vs Missing Property

```js
const a = { name: "John" };
const b = { name: "John", age: undefined };

shallowEqual(a, b); // ❌ false (different keys: 'age' missing in a)
```

### null vs undefined in Objects

```js
const a = { value: null };
const b = { value: undefined };

shallowEqual(a, b); // ❌ false (Object.is(null, undefined) → false)
```

## Dependency Array Edge Cases

### NaN in Dependencies

```js
const [value, setValue] = useState(NaN);

useEffect(() => {
  console.log("Effect ran");
}, [value]);

setValue(NaN); // Object.is(NaN, NaN) → true → Effect doesn't run ✅
```

### +0 vs -0 in Dependencies

```js
const [value, setValue] = useState(+0);

useEffect(() => {
  console.log("Effect ran");
}, [value]);

setValue(-0); // Object.is(+0, -0) → false → Effect runs ✅
```

### undefined in Dependencies

```js
const [value, setValue] = useState(undefined);

useEffect(() => {
  console.log("Effect ran");
}, [value]);

setValue(undefined); // Object.is(undefined, undefined) → true → Effect doesn't run ✅
```

## Common Pitfalls

### ❌ Pitfall 1: Assuming NaN is Different

```js
const [value, setValue] = useState(NaN);

// ❌ WRONG assumption:
setValue(NaN); // You might think this triggers re-render, but it doesn't!
```

### ❌ Pitfall 2: Assuming +0 and -0 are Same

```js
const [value, setValue] = useState(+0);

// ❌ WRONG assumption:
setValue(-0); // You might think this doesn't trigger re-render, but it does!
```

### ❌ Pitfall 3: Mutating and Re-setting

```js
const [user, setUser] = useState({ name: "John" });

// ❌ WRONG: Mutation
user.name = "Jane";
setUser(user); // Same reference → NO re-render (but value changed!)
```

## Comparison Summary Table

| Value A     | Value B     | `Object.is(A, B)` | `===`      | React Re-render? |
| ----------- | ----------- | ----------------- | ---------- | ---------------- |
| `NaN`       | `NaN`       | ✅ `true`         | ❌ `false` | ❌ No            |
| `+0`        | `-0`        | ❌ `false`        | ✅ `true`  | ✅ Yes           |
| `undefined` | `undefined` | ✅ `true`         | ✅ `true`  | ❌ No            |
| `null`      | `null`      | ✅ `true`         | ✅ `true`  | ❌ No            |
| `undefined` | `null`      | ❌ `false`        | ❌ `false` | ✅ Yes           |
| `{}`        | `{}`        | ❌ `false`        | ❌ `false` | ✅ Yes           |
| `[]`        | `[]`        | ❌ `false`        | ❌ `false` | ✅ Yes           |
| `() => {}`  | `() => {}`  | ❌ `false`        | ❌ `false` | ✅ Yes           |

## Best Practices

### ✅ Handle NaN Explicitly

```js
const [value, setValue] = useState(0);

const handleNaN = () => {
  const result = calculateValue(); // Might return NaN
  if (isNaN(result)) {
    setValue(NaN); // Explicitly set NaN
  } else {
    setValue(result);
  }
};
```

### ✅ Be Aware of +0/-0

```js
// Usually not an issue in practice, but be aware:
const [value, setValue] = useState(0);

// If you need to distinguish +0 and -0:
if (Object.is(value, -0)) {
  // Handle -0 case
}
```

### ✅ Always Create New Objects/Arrays

```js
// ✅ CORRECT:
setUser({ ...user, name: "Jane" });
setItems([...items, newItem]);

// ❌ WRONG:
user.name = "Jane";
setUser(user); // Same reference → no re-render
```

## Summary

- **`NaN` values are equal** in React (`Object.is(NaN, NaN) === true`)
- **`+0` and `-0` are different** in React (`Object.is(+0, -0) === false`)
- **`undefined` and `null` are always equal to themselves**
- **`undefined` and `null` are different from each other**
- **Objects/arrays/functions are always compared by reference**
- **Always create new objects/arrays** when updating state
- **Be aware of edge cases** when working with special values
