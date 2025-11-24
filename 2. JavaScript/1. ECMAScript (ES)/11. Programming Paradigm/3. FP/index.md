# Functional Programming

| Concept              | Example                |
| -------------------- | ---------------------- |
| Pure Function        | `(x) => x * 2`         |
| First-Class Function | `fn => fn()`           |
| HOF                  | `arr.map(fn)`          |
| Immutability         | `newArr = [...arr, 4]` |
| Closure              | `() => { return x; }`  |
| Currying             | `a => b => a + b`      |
| Compose              | `f(g(x))`              |
| Recursion            | `f(n) = n * f(n-1)`    |

## Key Concepts

- **Separation of Data and Functions**

  - Functional programming (FP) separates data from functions to avoid hidden side effects, leading to more predictable and bug-free code.

- **First-Class Functions**

  - Functions in FP are first-class citizens, meaning they can be passed as arguments, returned from other functions, and assigned to variables.

- **Pure Functions**

  - Pure functions produce the same output for the same input and do not cause side effects, enhancing predictability.

- **Higher-Order Functions**

  - Functions that take other functions as arguments or return functions. They help abstract common patterns of computation.

- **Referential Transparency**

  - An expression can be replaced with its value without changing the program's behavior, which is facilitated by pure functions.

- **Immutability**

  - Data is immutable; once created, it cannot be changed. Instead, new data structures are created from existing ones.

- **Function Composition**

  - Combining simple functions to build more complex ones, promoting modular and reusable code.

- **No Shared State**
  - Avoiding shared mutable state to reduce bugs related to state changes.

## FP vs OOP

- **Object-Oriented Programming (OOP)**

  - Combines data and behavior into objects, emphasizing encapsulation, abstraction, polymorphism, and inheritance.

- **Functional Programming (FP)**
  - Separates data from behavior, focusing on functions as the primary means of computation.

## Characteristics of FP

- **Predictable**

  - Pure functions and immutable data lead to more predictable programs.

- **Composability**

  - Functions can be composed to build complex operations.

- **Memory Efficiency**

  - Immutable data structures can optimize memory usage.

- **DRY Principle**
  - "Don't Repeat Yourself" by creating reusable and modular functions.

## Example in JavaScript

### Imperative Approach

```javascript
const user = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: [],
};

user.cart.push("item1");
```

### Functional Approach

```javascript
const addItemToCart = (user, item) => ({
  ...user,
  cart: [...user.cart, item],
});

const user = {
  name: "Kim",
  active: true,
  cart: [],
  purchases: [],
};

const updatedUser = addItemToCart(user, "item1");
console.log(updatedUser);
```

- In the functional approach, addItemToCart is a pure function that returns a new user object with the updated cart, adhering to FP principles by avoiding mutation and maintaining immutability.
