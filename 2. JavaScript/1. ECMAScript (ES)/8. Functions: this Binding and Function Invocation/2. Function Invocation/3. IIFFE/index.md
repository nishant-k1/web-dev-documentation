# IIFE (Immediately Invoked Function Expression)

Global variables issue can be avoided by the use of IIFE or ES modules

IIFE is a function expression

We cannot call a function declaration directly but we can call a function expression

Javascript detects a function declaration when it sees function keyword but if the function keyword gets wrapped inside small brackets (). Javascript no longer can detect it as a function declaration rather it sees it as an expression.

```javascript
// IFFE
(function () {})();
```

## Benefits of IIFE

Since IIFE has anonymous function so no variable is created in the global execution context

The variables declared inside IIFE is function scoped so cannot have access in the global execution context.

This allows us to keep private data that can't be accessed in the global execution context.

We won't get so many global variables polluting the global execution context.
