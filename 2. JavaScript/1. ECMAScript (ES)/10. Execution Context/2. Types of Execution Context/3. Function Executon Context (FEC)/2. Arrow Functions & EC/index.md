# Arrow Function

## Arrow Functions and Execution Context

- Arrow functions do not create their own execution context in the same way traditional functions do.
- Arrow functions lexically bind the this keyword, meaning they inherit this from the surrounding execution context (the context in which the arrow function was defined).
- Because of this, when you invoke an arrow function, it doesn't create its own execution context. Instead, it inherits the execution context from where it was created.
- Whenever a normal function is invoked EC is created but not in case of Arrow Functions.
- When an arrow function is invoked, no Ec is created; rather the the arrow funciton uses the exection context of the function inside which the arrow function has been declared.

## Arrow Functions contrast with Regular Functions

- Regular functions create a new execution context each time they are invoked. This includes:
  - Creating a new this binding.
  - Allocating memory for local variables and parameters.

## Arrow Function and `this`

- In JavaScript, the `this` keyword refers to the object that the function is a property of.
- However, the value of `this` depends on how a function is called.
- To ensure that a function's `this` refers to the desired context, we can bind it explicitly using the `.bind()` method
