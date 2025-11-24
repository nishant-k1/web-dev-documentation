# Life Cycle of an Execution Context

1. **Creation Phase/Hoisting**:

   - Sets up the memory for variables and functions `(Hoisting occurs here)`. **Hoisting** occurs for both `GEC` and `FEC`.
   - Initializes the `this` value.

2. **Execution Phase**:

   - Executes the code line by line.
   - Assigns values to variables and executes functions.

3. **Execution Phase**:

   - Executes the code line by line.
   - Assigns values to variables and executes functions.

## Visualization of Lifecycle

```JavaScript
function outer() {
  var x = 10;
  function inner() {
    console.log(x);
  }
  inner();
}
outer();

```

**Call Stack Lifecycle**:

1. Global Execution Context (GEC) is created and pushed to the call stack.
2. When outer is called:
   A new Execution Context (EC for outer) is created and pushed to the stack.
3. Inside outer, when inner is called:
   A new Execution Context (EC for inner) is created and pushed to the stack.
4. After inner completes:
   EC for inner is popped off the stack.
5. After outer completes:
   EC for outer is popped off the stack.
6. The program ends, and GEC is removed.
