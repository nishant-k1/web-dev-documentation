# Dynamic Scope vs Lexical Scope

## Dynamic Scope

- "dynamic scoping," where the scope of a variable is determined by the call stack at runtime.
- Remember, JavaScript does not use dynamic scoping; it uses lexical scoping.
- The place where function is called.
- Dynamic scope determines the scope of a variable based on the call stack at runtime.
- In dynamic scoping, the scope of a variable is determined by the order in which functions are called.
- When a function is called, the interpreter looks for variables in the call chain. If a variable isn't found in the local scope, it looks in the scope of the calling function, and so on, until it reaches the global scope.
- It's important to note that JavaScript uses lexical (or static) scoping, not dynamic scoping. However, dynamic scoping is used in some other programming languages, such as early versions of Lisp.
- Remember, JavaScript does not use dynamic scoping; it uses lexical scoping.

## Dynamic Scope (Not in js but in other programming languages)

- The place where function is called.
- Dynamic scope determines the scope of a variable based on the call stack at runtime.
- In dynamic scoping, the scope of a variable is determined by the order in which functions are called.
- When a function is called, the interpreter looks for variables in the call chain. If a variable isn't found in the local scope, it looks in the scope of the calling function, and so on, until it reaches the global scope.
- It's important to note that JavaScript uses lexical (or static) scoping, not dynamic scoping. However, dynamic scoping is used in some other programming languages, such as early versions of Lisp.
- Remember, JavaScript does not use dynamic scoping; it uses lexical scoping.

## Lexical vs Dynamic Scope

- In javascript our lexical scope (available data + variables where the function was defined ) determines our available variables (variables in our local environment or variable environment). Not where the function is called (dynamic scope).

```javascript
function sayMyName() {
  var a = "a";
  return function findName() {
    var b = "b";
    console.log(c); // returns: error c is not defined
    return function printName() {
      var c = "c";
      console.log(a, b, c);
      return "Andrei Neagoie";
    };
  };
}
sayMyName()()(); // returns a b c
```
