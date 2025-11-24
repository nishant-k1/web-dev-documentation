# ✅ Must-Know `Function` Methods & Properties (JavaScript Interview Perspective)

Understanding JavaScript functions deeply is essential for mastering topics like closures, `this`, OOP, and event handling. Here’s a focused list of **high-leverage Function properties and methods** you must know for interviews.

---

## 🔷 1. Function Basics

| Property / Concept   | Description                                   |
| -------------------- | --------------------------------------------- |
| `function.name`      | The name of the function                      |
| `function.length`    | Number of declared parameters                 |
| `function.prototype` | Prototype used when function is a constructor |
| `typeof function`    | Always returns `'function'`                   |

```js
function greet(name) {
  return `Hi ${name}`;
}
greet.name; // "greet"
greet.length; // 1
```

---

## 🔷 2. `this` Control Methods

| Method                      | Description                                                      |
| --------------------------- | ---------------------------------------------------------------- |
| `call(thisArg, ...args)`    | Calls a function with a specific `this` and arguments            |
| `apply(thisArg, argsArray)` | Like `call` but takes arguments as array                         |
| `bind(thisArg, ...args)`    | Returns a new function with `this` and optionally prefilled args |

```js
function sayHi() {
  console.log(this.name);
}
const user = { name: "Alice" };
sayHi.call(user); // Alice
sayHi.apply(user); // Alice
const bound = sayHi.bind(user);
bound(); // Alice
```

---

## 🔷 3. Function Constructors

| Syntax                          | Description                                                      |
| ------------------------------- | ---------------------------------------------------------------- |
| `new Function(arg1, ..., body)` | Creates a function dynamically (not recommended for general use) |

```js
const sum = new Function("a", "b", "return a + b");
sum(2, 3); // 5
```

---

## 🔷 4. Arrow Functions Differences

| Behavior       | Arrow Function                | Regular Function                      |
| -------------- | ----------------------------- | ------------------------------------- |
| `this` binding | Lexical (`this` is inherited) | Dynamic (`this` depends on call site) |
| `arguments`    | Not available                 | Available                             |
| `new` keyword  | Cannot be used with `new`     | Can be used as constructor            |

```js
const arrow = () => console.log(this); // inherits `this`
function regular() {
  console.log(this);
} // `this` depends on call
```

---

## 🔷 5. Advanced Concepts (Interview Gold)

| Concept                 | Explanation                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| Closures                | Inner function remembers outer function's scope even after execution |
| First-Class Functions   | Functions can be passed, returned, and assigned like variables       |
| Higher-Order Functions  | Functions that take or return other functions                        |
| Currying & Partial Apps | Pre-filling arguments to create specialized functions                |
| Debounce / Throttle     | Used in performance optimization (UI events)                         |

```js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
counter(); // 1
counter(); // 2
```

---

## 🧠 Interview Highlights

### 🔸 Difference between `call`, `apply`, and `bind`

- `call`: Immediately invokes with `this` and args
- `apply`: Same as `call`, but args are in an array
- `bind`: Returns a new function without invoking it

### 🔸 Closures

> A closure is created when a function "remembers" variables from its lexical scope even when executed outside that scope.

### 🔸 Arrow function vs regular function?

- No `this`, `arguments`, `super`, `new.target` in arrow functions.
- Not suitable for methods or constructors.

---

## ✅ Quick Reference Cheat Sheet

```js
fn.call(thisArg, ...args);
fn.apply(thisArg, [args]);
fn.bind(thisArg, ...args);
fn.length; // parameter count
fn.name; // function name
fn.prototype; // used in constructor
typeof fn; // always "function"
new Function(...args); // dynamic creation
```

---

💡 **Tips for Interviews:**

- Be able to explain `this` in different contexts.
- Be ready to implement a closure-based counter or memoization.
- Know how `bind` works internally (you can be asked to polyfill it).
- Understand how arrow functions behave differently in class methods or callbacks.
