# Function Execution Context (FEC)

- Each time a function is called, a new FEC is created. The FEC includes the function’s local variables, parameters, and where the function was called from (the call site)

- When a function is invoked, a new execution context is created for that function. This includes the function's arguments, local variables, and the function's scope chain.

- However, the function definition itself is not stored in the FEC. Instead, the FEC contains the execution details for the function's invocation (local variables, scope, etc.).

- The function definition (the code block) is still stored in memory in the scope where the function was defined, which could be:

  1. Global scope if defined globally
  2. Enclosing function scope if defined inside another function.

- If you have multiple nested functions (for example, a function defined inside another function), the function definitions are still stored in the outer (enclosing) scope (the FEC of outer).

- In this case:

  ```JavaScript
  function outer() {
    function inner() {
      console.log("Inside inner function");
    }
    inner();  // Call to inner function
  }

  outer();  // Call to outer function

  ```

  - The inner function definition is stored in the memory of the outer function's scope (the FEC of outer).

  - When outer is called, its FEC is pushed to the call stack, and when inner is called inside outer, the FEC of inner is created and pushed to the call stack.

  - However, the function definition of inner (i.e., function inner() { console.log("Inside inner function"); }) still resides in the scope of the outer function, not in the FEC of inner.
