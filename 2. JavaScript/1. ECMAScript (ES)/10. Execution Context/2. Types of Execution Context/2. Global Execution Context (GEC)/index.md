# Global Execution Context (GEC)

- The global execution context refers to the environment where the JavaScript code starts executing when the program begins.
- This is the first context created when a JavaScript program runs.
- It is pushed onto the call stack when execution begins (Javascript engine runs).
- It's not a "function" in itself, but rather the environment where all top-level code (outside of functions) is executed.
- It includes `global variables`, `function definitions`, `this`, in the global scope.
- Global context is stored in memory, but when the JavaScript engine runs the code, the global execution context is pushed onto the call stack.
- Once the code finishes executing, the global execution context is popped off the stack.
