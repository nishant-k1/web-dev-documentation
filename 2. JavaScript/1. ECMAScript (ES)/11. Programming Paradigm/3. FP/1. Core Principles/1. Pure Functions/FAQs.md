# Side Effects and pure functions faqs

## How console log makes a function impure?

- console is a global object (window.console in browsers), and console.log writes to the console, which is an I/O operation outside the function’s control.
- The act of logging changes the state of the console (it adds output to the console’s history), which is observable outside the function.

## What’s Safe Inside a Pure Function (like a Reducer)?

| Safe to Use? | Example                        | Why                              |
| ------------ | ------------------------------ | -------------------------------- |
| ✅ Yes       | `Object.assign()`              | Deterministic, no side effects   |
| ✅ Yes       | Spread operator (`...`)        | Pure copying                     |
| ✅ Yes       | `.map()`, `.filter()`          | No mutation, no side effects     |
| ✅ Yes       | Functions passed via arguments | Under control of calling context |

Array.prototype.filter() and Array.prototype.map() does not mutate the original array — it returns a new array. So we can use those in reducers because it won't mutate the state or any nested state properties, instead it will return a new one. So purity of reducers remains intact.
