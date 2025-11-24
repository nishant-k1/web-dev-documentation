# 📚 JavaScript Array Methods – Interview Cheat Sheet

---

## 🥇 Tier 1: Must-Know (Frequently Asked)

| Method        | Returns                       | Description                       | Use Case                           |
| ------------- | ----------------------------- | --------------------------------- | ---------------------------------- |
| `.map()`      | New array                     | Transforms each element           | Modify/transform values            |
| `.filter()`   | New array (subset)            | Returns elements that pass a test | Remove/filter items                |
| `.reduce()`   | Any value                     | Reduces array to a single value   | Sum, group, flatten, calculate     |
| `.sort()`     | The same array (mutated)      | Sorts in-place                    | Ascending/descending sort          |
| `.find()`     | Single element or `undefined` | First matching element            | Get first match (object/value)     |
| `.some()`     | Boolean                       | `true` if **any** element matches | Check if at least one match exists |
| `.every()`    | Boolean                       | `true` if **all** elements match  | Validate all conditions            |
| `.includes()` | Boolean                       | Checks if array contains a value  | Membership test                    |

---

## 🥈 Tier 2: Nice-to-Know (Sometimes Asked)

| Method         | Returns                | Description                       | Use Case                              |
| -------------- | ---------------------- | --------------------------------- | ------------------------------------- |
| `.forEach()`   | `undefined`            | Executes a function for each item | Side-effects (e.g. logging, mutation) |
| `.slice()`     | New array              | Returns a portion of the array    | Non-mutating subarray                 |
| `.flat()`      | New array              | Flattens nested arrays            | Convert 2D/3D into flat array         |
| `.flatMap()`   | New array              | `map()` + `flat()`                | One-pass transform & flatten          |
| `.splice()`    | Array of removed items | Adds/removes elements (mutates)   | Insert/delete in-place                |
| `.findIndex()` | Index or `-1`          | Index of first match              | Like `.find()`, but returns index     |

---

## 🥉 Tier 3: Low Priority (Rarely Asked)

| Method           | Returns                      | Description                              | Notes                                     |
| ---------------- | ---------------------------- | ---------------------------------------- | ----------------------------------------- |
| `.fill()`        | The same array (mutated)     | Fills array with static value            | Use to initialize or overwrite            |
| `.copyWithin()`  | The same array (mutated)     | Copies part of array to another position | Very rare                                 |
| `.indexOf()`     | Index or `-1`                | Finds index of first occurrence          | Often replaced by `.includes()`           |
| `.lastIndexOf()` | Index or `-1`                | Finds index of last occurrence           | Rare                                      |
| `.at()`          | Element at index             | Allows negative indexing                 | Cleaner syntax than `arr[arr.length - 1]` |
| `.entries()`     | Iterator of `[index, value]` | Iterable used in loops                   | Works with `for...of`                     |
| `.keys()`        | Iterator of indexes          | Array iterator object                    | Loop utility                              |
| `.values()`      | Iterator of values           | Iterable object                          | Like direct array                         |
| `.join()`        | String                       | Joins array into string                  | Convert array to CSV, sentence, etc.      |
| `.reverse()`     | The same array (mutated)     | Reverses array order                     | Changes original array                    |
| `.push()`        | New length                   | Adds element(s) at the end (mutates)     | Basic stack operation                     |
| `.pop()`         | Removed element              | Removes last element (mutates)           | Basic stack operation                     |
| `.shift()`       | Removed first element        | Removes first element (mutates)          | Queue-like usage                          |
| `.unshift()`     | New length                   | Adds elements at the start (mutates)     | Queue-like usage                          |

---

## 🧠 Interview Tips

- Learn to chain `.filter().map().reduce()` — interviewers love these.
- Know if a method is **mutating** (e.g. `.sort()`, `.splice()`, `.reverse()`) or **non-mutating**.
- Compare similar methods:  
  `.find()` vs `.some()`  
  `.map()` vs `.forEach()`  
  `.filter()` vs `.reduce()` for filtering

---

## ✅ Practice Checklist

- [ ] Implement `.map()` manually
- [ ] Remove duplicates using `.filter()`
- [ ] Group by category using `.reduce()`
- [ ] Use `.some()` and `.every()` for validation
- [ ] Sort array of objects using `.sort((a, b) => a.age - b.age)`
