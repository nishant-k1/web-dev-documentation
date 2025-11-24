# ✅ Must-Know `Array` Methods & Properties (JavaScript Interview Perspective)

Mastering array manipulation is a **core skill** in JavaScript interviews — especially in frontend, DSA, and problem-solving rounds.

---

## 🔷 1. Creation & Identification

| Method / Property              | Description                                  | Returns   |
| ------------------------------ | -------------------------------------------- | --------- |
| `Array.isArray(value)`         | Check if value is an array                   | `boolean` |
| `new Array(length)`            | Create empty array of fixed length           | `Array`   |
| `Array.of(...items)`           | Create array from arguments                  | `Array`   |
| `Array.from(iterable, mapFn?)` | Create array from iterable or array-like obj | `Array`   |

```js
Array.isArray([]); // true
Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']
```

---

## 🔷 2. Adding / Removing Elements

| Method                                 | Description             | Mutates | Returns                  |
| -------------------------------------- | ----------------------- | ------- | ------------------------ |
| `push(...items)`                       | Add to end              | ✅ Yes  | `number` (new length)    |
| `pop()`                                | Remove from end         | ✅ Yes  | Removed element          |
| `unshift(...items)`                    | Add to start            | ✅ Yes  | `number` (new length)    |
| `shift()`                              | Remove from start       | ✅ Yes  | Removed element          |
| `splice(start, deleteCount, ...items)` | Add/remove at any index | ✅ Yes  | `Array` (removed items)  |
| `slice(start?, end?)`                  | Shallow copy (portion)  | ❌ No   | `Array` (copied portion) |

```js
arr.splice(1, 1); // removes 1 element at index 1
arr.slice(0, 2); // returns new array with first 2 elements
```

---

## 🔷 3. Iteration & Transformation

| Method                   | Description                 | Mutates | Returns     |
| ------------------------ | --------------------------- | ------- | ----------- |
| `forEach(cb)`            | Loop over each element      | ❌ No   | `undefined` |
| `map(cb)`                | Transform each item         | ❌ No   | `Array`     |
| `filter(cb)`             | Filter by condition         | ❌ No   | `Array`     |
| `reduce(cb, init?)`      | Reduce to a single value    | ❌ No   | `any`       |
| `reduceRight(cb, init?)` | Right-to-left reduce        | ❌ No   | `any`       |
| `flat(depth?)`           | Flatten nested arrays       | ❌ No   | `Array`     |
| `flatMap(cb)`            | `map()` + flatten one level | ❌ No   | `Array`     |

```js
arr.map((x) => x * 2); // [2, 4, 6]
arr.reduce((a, b) => a + b); // sum
```

---

## 🔷 4. Search & Lookup

| Method               | Description                     | Mutates | Returns   |
| -------------------- | ------------------------------- | ------- | --------- |
| `indexOf(value)`     | First index of value            | ❌ No   | `number`  |
| `lastIndexOf(value)` | Last index of value             | ❌ No   | `number`  |
| `findIndex(cb)`      | Index of first match            | ❌ No   | `number`  |
| `find(cb)`           | First matching element          | ❌ No   | `any`     |
| `includes(value)`    | Checks if value exists          | ❌ No   | `boolean` |
| `some(cb)`           | True if **any** element matches | ❌ No   | `boolean` |
| `every(cb)`          | True if **all** elements match  | ❌ No   | `boolean` |

```js
arr.includes(3); // true
arr.find((x) => x > 2); // first match
```

---

## 🔷 5. Sorting & Reordering

| Method                      | Description                 | Mutates | Returns |
| --------------------------- | --------------------------- | ------- | ------- |
| `sort(cb?)`                 | Sorts in place              | ✅ Yes  | `Array` |
| `reverse()`                 | Reverses in place           | ✅ Yes  | `Array` |
| `copyWithin()`              | Copy part of array in-place | ✅ Yes  | `Array` |
| `fill(value, start?, end?)` | Fill with static value      | ✅ Yes  | `Array` |

```js
arr.sort((a, b) => a - b); // numeric sort
arr.fill(0); // fills with 0
```

---

## 🔷 6. String Conversion

| Method            | Description                | Mutates | Returns  |
| ----------------- | -------------------------- | ------- | -------- |
| `join(separator)` | Combine elements to string | ❌ No   | `string` |
| `toString()`      | Comma-separated string     | ❌ No   | `string` |

```js
[1, 2, 3].join("-"); // "1-2-3"
```

---

## 🔷 7. Other Useful Array Techniques

| Concept         | Example                                 |
| --------------- | --------------------------------------- |
| Destructuring   | `const [a, b] = arr;`                   |
| Spread operator | `[...arr]` to clone                     |
| Rest operator   | `function(...args)` collects into array |
| Chaining        | `arr.filter().map().reduce()`           |

---

## 🧠 Interview Patterns Using Arrays

- Flatten nested array
- Find duplicates
- Merge sorted arrays
- Rotate array
- Chunk array into groups
- Two-pointer techniques
- Sliding window on array
- Remove falsy values (`filter(Boolean)`)

---

## ✅ Quick Reference Cheat Sheet

```js
// Add / Remove
arr.push(), arr.pop(), arr.shift(), arr.unshift();
arr.splice(), arr.slice(), arr.fill();

// Search / Check
arr.includes(), arr.indexOf(), arr.find(), arr.some();

// Transform / Iterate
arr.map(), arr.filter(), arr.reduce(), arr.flat(), arr.forEach();

// Sort / Rearrange
arr.sort(), arr.reverse(), arr.copyWithin();

// Convert
arr.join(), arr.toString();

// Create
Array.isArray(), Array.from(), Array.of();
```

---

💡 **Tip:** In interviews, prefer immutability (e.g., use `slice` over `splice`, `map` over `forEach`) and always justify performance and space complexity when solving array problems.
