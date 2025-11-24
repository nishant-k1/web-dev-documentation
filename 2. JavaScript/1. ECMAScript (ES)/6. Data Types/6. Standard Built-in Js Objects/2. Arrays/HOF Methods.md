# Array Methods that are HOFs

| Method                   | Description                                  | Returns                 | Mutates? |
| ------------------------ | -------------------------------------------- | ----------------------- | -------- |
| `forEach(cb)`            | Executes `cb` on each element                | `undefined`             | No       |
| `map(cb)`                | Creates new array by transforming            | New array               | No       |
| `filter(cb)`             | Creates new array of filtered items          | New array               | No       |
| `reduce(cb, init?)`      | Accumulates to single value                  | Single value (any type) | No       |
| `reduceRight(cb, init?)` | Same as reduce, right to left                | Single value (any type) | No       |
| `some(cb)`               | Checks if any element satisfies `cb`         | Boolean                 | No       |
| `every(cb)`              | Checks if all elements satisfy `cb`          | Boolean                 | No       |
| `find(cb)`               | Finds first element satisfying `cb`          | Element or `undefined`  | No       |
| `findIndex(cb)`          | Finds index of first element satisfying `cb` | Index or -1             | No       |
| `flatMap(cb)`            | Map + flatten one level                      | New array               | No       |
