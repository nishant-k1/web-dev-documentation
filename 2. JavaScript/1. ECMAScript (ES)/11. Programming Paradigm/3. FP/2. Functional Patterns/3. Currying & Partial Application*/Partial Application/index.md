# Partial Application

- It is a way to partially apply a function.
- It's a process of producing a function with a smaller number fo parameters.
- It means taking a function, applying some of its arguments into the function. So it remembers those parameters and then it uses closures to later on be called with all the rest of the arguments.
- In partial application the second call expects all the arguments.

```javascript
const multiply = (a, b, c) => a * b * c;
const curriedMultiplyBy5 = multiply.bind(null, 5);
curriedMultiplyBy(4, 10);
```
