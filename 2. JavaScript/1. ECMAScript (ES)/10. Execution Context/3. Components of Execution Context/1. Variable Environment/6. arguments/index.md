# arguments keyword

- When a global execution context is created we get "this" keyword but unlike the global execution context that gave us a global object that equals to this instead, with a function invocation, we get something called arguments, and that's another keyword.
- arguments is only available to us when we create a new execution context.

```javascript
//example 1
function marry(person1, person2) {
  console.log("arguments", arguments); // gives {0: 'Tim', 1: 'Tina'}
  return `${person1} is now married to ${person2}`; // gives: Tim is now married to Tina
}

marry("Tim", "Tina");

arguments; // gives error because arguments is available to us only we have a new execution context i.e. arguments is not available in global execution context.

// example 2
function marry() {
  console.log("arguments", arguments); // gives {}
}

marry();
```

- With modern javascript you most likely want to avoid arguments. If you really want to use then we can use Array.from(arguments) to convert it into an array
