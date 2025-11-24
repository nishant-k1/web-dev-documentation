# Currying

- Function currying is a technique in which a function with multiple arguments is transformed into a sequence of functions, each taking a single argument.
- Currying is the technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with single argument.
- By the use of currying we can create multiple utility function out of this.
- Currying expects one argument at a time.

```javascript
const multiply = (a, b) => a * b;
const curriedMultiply = (a) => (b) => a * b;
curriedMultiplyBy(5)(3);
```

```javascript
// EG: use currying to create a utility function
const multiply = (a, b) => a * b;
const curriedMultiply = (a) => (b) => a * b;

// creating utlity function using currying
curriedMultiplyBy5 = curriedMultiply(5);
```

## function currying using bind()

currying refers to supplyig partial arugements to function parameters.

```javascript
function multiply(a, b) {
  return a * b;
}

const multiplyByTwo = multiply.bind(this, 2); // supplying 1st parameter
const multiplyByTen = multiply.bind(this, 10); // supplying 1st parameter
multiplyByTwo(4); // supplying 2nd parameter
multiplyByTen(4); // supplying 2nd parameter
```

## Advantages of Currying

- Partial Application: You can create specialized versions of a function by providing some of the arguments in advance, which can be very useful in situations where you want to reuse a function with varying parameters.

- Modularity and Reusability: Curried functions can be used to create smaller, more focused functions that can be combined to form more complex functions. This promotes code modularity and reusability.

- Better Function Composition: Currying can make it easier to compose functions together, which is a fundamental concept in functional programming.

- Higher-Order Functions: Currying is often used in conjunction with higher-order functions, allowing for powerful abstractions and code that is easier to reason about.

## Drawbacks of Currying

- Complexity for Simple Cases: In some cases, function currying can introduce unnecessary complexity, especially for functions that don't benefit from partial application.

- Readability: Curried functions can be harder to read and understand for those unfamiliar with this programming paradigm.
