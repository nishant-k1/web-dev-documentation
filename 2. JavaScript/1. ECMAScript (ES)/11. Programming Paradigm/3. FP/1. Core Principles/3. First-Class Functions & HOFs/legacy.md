# Higher order functions and closures

- In javascript functions are first class citizens which means we can have higher order functions and we can also have closures.

## Higher Order functions

- Higher order functions in both mathematics and computer science simply means it does one of two things, either takes one of more functions as arguments or returns a function as a result, often called a callback.

```javascript
// HOF 1
const hof = () => () => 5;
hof()(); // returns 5

// HOF 2
const hof = (fn) => fn(5);
hof(function callback(x) {
  return x;
}); // returns 5
```

## Higher Order Functions vs Callback Functions

Higher-Order Functions:

- A higher-order function is a function that can take one or more functions as arguments or can return a function as its result. In other words, it treats functions as first-class citizens.

```JavaScript
function higherOrderFunction(callback) {
  console.log("This is the higher-order function");
  callback(); // This is where the callback function is called
}

function callbackFunction() {
  console.log("This is the callback function");
}

higherOrderFunction(callbackFunction);

```

Callback Functions:

- A callback function is a function that is passed as an argument to another function and is executed inside the body of that another function after some operation is completed. It's a way to ensure that certain code doesn't execute until a particular task is finished.

```JavaScript
function doSomethingAsync(callback) {
  setTimeout(function() {
    console.log("Async operation done");
    callback();
  }, 2000);
}

function onComplete() {
  console.log("Callback called");
}

doSomethingAsync(onComplete);
```

## Closures

- Closures in javascript are a mechanism for containing some sort of state, and in javascript we create a closure whenever a function accesses a variable defined outside of the immediate function scope.
- A closure is a function that has access to its own scope, the outer function's scope, and the global scope, even after the outer function has finished execution.
- A function along with its lexical scope is called closure.
- A closure is a fundamental concept in JavaScript that allows a function to remember and access its lexical scope (the variables in its outer scope) even after the function has finished executing and has been returned.

```JavaScript
function outerFunction(outerVariable) {
  // Inner function has access to outerVariable due to closure
  function innerFunction(innerVariable) {
    console.log(outerVariable + innerVariable);
  }
  return innerFunction;
}

const closureExample = outerFunction(3); // outerVariable is now 3

closureExample(2); // Output: 5   // innerFunction uses outerVariable, even after outerFunction has finished executing.
```
