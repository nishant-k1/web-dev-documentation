# Array Methods: Mutate vs Non-Mutate

| Method                                 | Mutates Original Array? | Description & Example                                  |
| -------------------------------------- | ----------------------- | ------------------------------------------------------ |
| **Mutates**                            |                         |                                                        |
| `push(...items)`                       | ✅ Yes                  | Adds items at the **end**                              |
| `pop()`                                | ✅ Yes                  | Removes item from the **end**                          |
| `shift()`                              | ✅ Yes                  | Removes item from the **start**                        |
| `unshift(...items)`                    | ✅ Yes                  | Adds items at the **start**                            |
| `splice(start, deleteCount, ...items)` | ✅ Yes                  | Adds/removes at any position                           |
| `sort(compareFn?)`                     | ✅ Yes                  | Sorts array **in place**                               |
| `reverse()`                            | ✅ Yes                  | Reverses array **in place**                            |
| `fill(value, start?, end?)`            | ✅ Yes                  | Fills array with value                                 |
| `copyWithin(target, start?, end?)`     | ✅ Yes                  | Copies part of array within itself                     |
| **Does NOT Mutate**                    |                         |                                                        |
| `map(cb)`                              | ❌ No                   | Returns new array                                      |
| `filter(cb)`                           | ❌ No                   | Returns new filtered array                             |
| `reduce(cb, init?)`                    | ❌ No                   | Returns a single value                                 |
| `reduceRight(cb, init?)`               | ❌ No                   | Same as reduce, but from right to left                 |
| `flat(depth?)`                         | ❌ No                   | Returns new flattened array                            |
| `flatMap(cb)`                          | ❌ No                   | Map + flatten one level, returns new array             |
| `slice(start?, end?)`                  | ❌ No                   | Returns shallow copy portion                           |
| `concat(...arrays)`                    | ❌ No                   | Returns new concatenated array                         |
| `some(cb)`                             | ❌ No                   | Returns boolean                                        |
| `every(cb)`                            | ❌ No                   | Returns boolean                                        |
| `find(cb)`                             | ❌ No                   | Returns first matched element or `undefined`           |
| `findIndex(cb)`                        | ❌ No                   | Returns index or `-1`                                  |
| `includes(value)`                      | ❌ No                   | Returns boolean                                        |
| `indexOf(value)`                       | ❌ No                   | Returns index or `-1`                                  |
| `lastIndexOf(value)`                   | ❌ No                   | Returns index or `-1`                                  |
| `forEach(cb)`                          | ❌ No                   | Returns `undefined` (but callback can mutate elements) |
