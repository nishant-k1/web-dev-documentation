# Types of Execution Contexts

1. **Global Execution Context** (GEC)

   - It gets Created when the JavaScript engine starts executing code.
   - Created when the JavaScript engine starts executing a script.
   - It creates a global scope, attaches the global object (like window in browsers or global in Node.js), and initializes variables declared outside any function.
   - `this` in GEC:

     - In browsers, `this` refers to the `window` object.
     - In nodejs `this` refers to the `global` object.
     - In `strict mode` ('use strict'),`this` is `undefined`.

   - Phases of Global Execution Context
     - **Creation Phase**:
       - The global object is created (`window` or `global`).
       - `this` is assigned to the global object.
       - Global variables and functions are stored in memory.
     - **Execution Phase**:
       - Code is executed line by line.
       - Variables are assigned their values, and functions are invoked.

2. **Function Execution Context** (FEC)

   - Created whenever a function (except arrow function) is invoked.
   - No FEC is created if the invoked function is an arrow function. FEC uses the Execution Context of the function inside which it has been declared.
   - Each function call has its own execution context.
   - FEC Consists of:
     - A local scope for variables defined within the function.
     - The arguments object for accessing passed arguments.
     - The this keyword (depends on how the function is invoked).
     - Phases of Function Execution Context
       - **Creation Phase**:
         - The function's arguments are stored.
         - Local variables are initialized (they are stored in memory but not yet assigned).
         - The `scope chain` and `this` keyword are set.
       - **Execution Phase**:
         - The function's code is executed.
         - Variables are assigned their values, and the function's logic is executed.

3. **Eval Execution Context** (though rarely used)

- Created when the eval() function is executed.
- Executes code within a string.
