# Destructuring in Js

In object destructuring: The key of values matters.
In array destructuring: The position of values matters.

## Destructuring Assignment

This is the official name of the JavaScript syntax feature. It refers to using destructuring within an assignment expression — assigning values to variables by unpacking from objects or arrays.

```js
const { name } = { name: "Nishant" }; // ← Destructuring Assignment
```

## Destructuring

This is just the informal, shorthand term for the same concept. In JavaScript discussions, people often say “destructuring” when they mean “destructuring assignment.”

```js
const { name } = { name: "Nishant" }; // ← Destructuring Assignment
```

## Contexts in which Destructuring can happen

1. **Variable Assignment (Destructuring Assignment)**

   ```js
   const { name } = user;
   const [a, b] = [1, 2];
   ```

2. **Function Parameters**

   ```js
   function greet({ name }) {
     console.log(`Hello, ${name}`);
   }
   greet({ name: "Nishant" }); // ← Destructuring in parameters
   ```

3. **Default Parameters with Destructuring**

   ```js
   function logUser({ name = "Guest", age = 18 } = {}) {
     console.log(name, age);
   }

   logUser(); // Guest 18
   ```

4. **Loop Statements**

   ```js
   const arr = [{ x: 1 }, { x: 2 }];
   for (const { x } of arr) {
     console.log(x); // ← Destructuring inside `for...of`
   }
   ```

5. **In catch Clauses**

   ```js
   try {
     throw { message: "Oops!", code: 404 };
   } catch ({ message, code }) {
     console.log(message, code); // Oops! 404
   }
   ```

6. Combined with import Statements: Technically not "destructuring" per the ECMAScript spec, but conceptually similar:
   ✅ Is not runtime destructuring.
   ✅ It’s compile-time binding of names exported from a module.

   ```js
   import { useState, useEffect } from "react";
   ```

7. Inside for...in Loops (rare but possible)

```js
const obj = { a: 1, b: 2 };
for (const key in obj) {
  const { [key]: value } = obj;
  console.log(key, value);
}
```

## 🧠 Final Summary (Cheat Sheet)

| Context                  | Example Syntax                                          |
| ------------------------ | ------------------------------------------------------- |
| Assignment               | `const { a } = obj`                                     |
| Function Parameters      | `function fn({ a }) {}`                                 |
| Default Param + Destruct | `function fn({ a = 1 } = {}) {}`                        |
| `for...of` Loop          | `for (const { a } of arr) {}`                           |
| `for...in` Loop          | `for (const key in obj) { const { [key]: val } = obj }` |
| `catch` Clause           | `catch ({ message }) {}`                                |
| `import` Statement       | `import { x } from 'module'`                            |

## Default Values

Default values are fallback values automatically assigned when a variable or parameter is undefined.
They are not used for null, false, '' (empty string), 0, etc.
Only undefined.

### Valid use cases of default values

1. **Function Parameters**: Default values are most commonly used in function arguments.

   ```js
   function greet(name = "Guest") {
     console.log(`Hello, ${name}`);
   }

   greet(); // Hello, Guest
   greet("Nishant"); // Hello, Nishant

   // Only used if the argument is undefined.

   greet(undefined); // uses default
   greet(null); // prints: Hello, null
   ```

2. **Destructuring (Object & Array)**

   1. Object Destructuring

      ```js
      const user = { name: "Nishant" };
      const { name, age = 25 } = user;

      console.log(age); // 25
      ```

   2. Array Destructuring

      ```js
      const arr = [1];
      const [a = 10, b = 20] = arr;

      console.log(a); // 1
      console.log(b); // 20
      ```

3. **Function Parameter + Destructuring + Defaults: All three combined**: This avoids errors if you don’t pass an object at all.

   ```js
   function showProfile({ name = "Guest", age = 20 } = {}) {
     console.log(name, age);
   }

   showProfile(); // Guest 20
   showProfile({ name: "Nishant" }); // Nishant 20
   ```

4. **Rest Parameters + Defaults**: Not directly used with rest, but you can still provide a fallback for a missing argument:

   ```js
   function sum(a = 0, b = 0, ...rest) {
     return a + b + rest.reduce((acc, val) => acc + val, 0);
   }

   sum(); // 0
   ```

5. **Optional Chaining With Nullish Coalescing (??)**: Not a “default parameter,” but it acts like a default value substitute for null or undefined.

   ```js
   const user = null;
   console.log(user?.name ?? "Guest"); // "Guest"
   ```

   🔸 ?? uses default for null and undefined
   🔸 || uses default for falsy values (0, '', false, etc.)

### Here' We can't use Default Values

1. You can't use default values in object literals directly like this:

   ```js
   const obj = { name: name || "Guest" }; // ok
   const obj2 = { name = "Guest" }; // ❌ syntax error
   ```

## Array Destructuring

In object destructuring: The key of values matters.
In array destructuring: The position of values matters.

### Common Use Cases for Array Destructuring

| Use Case                        | Example                                |
| ------------------------------- | -------------------------------------- |
| Swapping variables              | `[a, b] = [b, a]`                      |
| Accessing first few elements    | `const [first, second] = arr;`         |
| Ignoring elements               | `const [,, third] = arr;`              |
| Handling function return values | `const [err, result] = await fn();`    |
| Setting default values          | `const [a = 10] = [];`                 |
| Looping with `Object.entries()` | `for ([key, val] of Object.entries())` |

### When array destructuring is NOT ideal

When the array is very large and you need items from random or end positions (e.g. 999th item)
When the array size is dynamic or unknown
When you want clarity and maintainability in code with lots of element skipping
