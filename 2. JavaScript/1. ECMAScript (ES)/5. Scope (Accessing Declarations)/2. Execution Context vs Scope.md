# Execution Context vs Scope

## Execution Context

- context is more about object based.
- context is about the value of `this` and is determined by how a function is called
- context says what's the value of the `this` keyword, which is a reference to the object that owns that current execution code.
- context is most often determined by how a function is invoked with the value of `this` keyword.

## Scope

- Scope refers to the accessibility or visibility of variables, functions, and objects in some particular part of your code during runtime.

- Eg:

```JavaScript
function myFunction() {
  let x = 10; // Variable x has function scope
  console.log(x);
}
console.log(x); // Error: x is not defined (outside of the function's scope)
```
