# Closures

- Closure is a mechanism not a function but when we say closure we generally have accepted that we're referring to a closure function.
- A closure is when a function remembers the variables from its outer (lexical) scope, even after that outer function has finished executing.
- In simpler terms:

  - A function "closes over" the variables it uses from its outer environment.
  - Even if the outer function is done running, the inner function still has access to its variables.

- the inner function (closure) has access to everything in its full lexical scope, which includes:

  - Variables inside its own function
  - Variables in the outer function
  - Variables in the outer scope of the outer function (like global variables or any scope above)

- We have closures in javascript because of two things: 1. function 2. Lexical Scope
- A closure is simply a combination of function and the lexical environment from which it was declared.
- Closures allow a function to access variables from an enclosing scope or environment even after it leaves the scope in which it was declared
- closures are also called lexical scoping. Lexical means where it is written and Scoping means what variable we have access to.

```js
const globalVar = "🌍";

function outer() {
  const outerVar = "🚪";

  function inner() {
    const innerVar = "🧠";
    console.log(globalVar); // 🌍
    console.log(outerVar); // 🚪
    console.log(innerVar); // 🧠
  }

  return inner;
}

const fn = outer();
fn();

// 📌 What’s happening in the above example?
// The function inner() has closure over:

// innerVar → its own variable

// outerVar → from the outer() function

// globalVar → from the outer scope of outer()

// So yes — inner functions have access to the entire chain of outer scopes, not just their direct parent function.
```

```javascript
// Eg: 1
function a() {
  let grandpa = "grandpa"; // this variale won't get garbage collectd as it is part of the function "c" closure (function c is using/ referencing it so it's going to keep it in the closure)
  let randomData = 4524545; // this variable gets garbage collected as it is not part of the function "c" closure (function c is not using/ referencing it)
  return function b() {
    let father = "father";
    return function c() {
      let son = "son";
      return `${grandpa} > ${father} > ${son}`;
    };
  };
}
a()()();
```

```javascript
// Eg: 2

const boo = (string) => (name) => (name2) =>
  console.log(`${string} ${name} ${name2}`);
boo("hi")("tim")("becca");
```

```javascript
// Eg: 3

function callMeMaybe() {
  setTimeout(function () {
    console.log(callme); // because of closure callme is rembebred by the webAPI call back function;
  }, 4000); // result is on hold in callback queque, once the stack is empty after the whole file runs, it gets pushed to the stack.

  const callMe = "Hi! i am now her!"; // we have const here so it won't get hoisted
}
callMeMaybe(); // returns  Hi! i am now her!
```

## FAQs

1. `Why does a closure happen?`

   Closures happen because of how JavaScript is designed:
   Functions remember the scope in which they were defined, not the scope in which they are executed.
   This is called lexical scoping.

   JavaScript’s engine keeps the environment alive as long as there’s a function (like inner) that still references it.
   Closures happen due to lexical scoping.
