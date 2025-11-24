# Variable Environment

- The variable environment is a component of an execution context where variables and functions live.
- However, it's important to note that not all variables live there. For example, variables declared with let and const are stored in a different part of memory called the Lexical Environment.

```javascript
function two() {
  var isValid; //undefined
}

function one() {
  var isValid = true; // local variable environment
  two();
}
var isValid = false; // gets hoisted and gets assigned undefined
one();
```
