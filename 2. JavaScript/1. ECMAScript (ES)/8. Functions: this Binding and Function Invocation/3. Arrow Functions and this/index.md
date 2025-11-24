# Arrow Functions and this

`Regular functions:` **In JavaScript, the value of `this` depends on how a function is called — not where that function is defined.**

`Arrow functions:` **In JavaScript, the value of `this` depends on where an arrow function is defined — not how that arrow function is called.**

---

🔄 `For regular functions`: this depends on how it's called
⚡️ `For arrow functions`: this depends on where it's defined

Arrow functions ignore the this context

## call, apply, bind and arrow function

Yes, technically arrow functions have call, apply and bind methods — because every function in JavaScript (including arrow functions) inherits from Function.prototype.

But we do not use .call(), .apply(), or .bind() with arrow functions — because they don’t have their own this, and those methods are meant to control this.

Arrow functions ignore the this context

## Example for arrow vs regular fn and value of this

Here in the below example,
`regularFn` is a regular function → this depends on how it is called → obj.regularFn() sets this = obj

`arrowFn` is defined in the global scope (not inside a method) → so this is captured as the global this

```js
const obj = {
  name: "Nishant",
  regularFn: function () {
    console.log("regular:", this.name);
  },
  arrowFn: () => {
    console.log("arrow:", this.name);
  },
};

obj.regularFn(); // ✅ "regular: Nishant" → this = obj

// You're calling the function as a method of obj using the . operator — and that sets the this to obj.
// Even though you're not passing arguments, JavaScript internally does this: obj.regularFn() → regularFn.call(obj)

obj.arrowFn(); // ❌ "arrow: undefined" → this = window/global
```

## Arrow Functions and Execution Context

- Arrow functions do not create their own execution context in the same way traditional functions do.
- Arrow functions lexically bind the this keyword, meaning they inherit this from the surrounding execution context (the context in which the arrow function was defined).
- Because of this, when you invoke an arrow function, it doesn't create its own execution context. Instead, it inherits the execution context from where it was created.
- Whenever a normal function is invoked EC is created but not in case of Arrow Functions.
- When an arrow function is invoked, no Ec is created; rather the the arrow function uses the execution context of the function inside which the arrow function has been declared.

## Arrow Functions contrast with Regular Functions

- Regular functions create a new execution context each time they are invoked. This includes:
  - Creating a new this binding.
  - Allocating memory for local variables and parameters.

## Arrow Function and `this`

- In JavaScript, the `this` keyword refers to the object that the function is a property of.
- However, the value of `this` depends on how a function is called, not where it is defined for Regular Functions.
- To ensure that a function's `this` refers to the desired context, we can bind it explicitly using the `.bind()` method
