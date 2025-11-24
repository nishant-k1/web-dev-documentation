# Creation Phase

The execution context is created, and the JavaScript engine performs preparatory tasks to set up the environment.

Key Steps:

1. **Memory Allocation (Hoisting)**:

   - Variables and function declarations are added to the Memory/Variable Environment.
   - Variables are initialized to undefined.
   - Function declarations are stored in their entirety.

2. **Lexical Environment Setup**:

   - The blueprint of the Lexical Environment is determined at compile time.
     The actual instantiation of the Lexical Environment happens during the creation phase of the Execution Context at runtime.
   - The current Lexical Environment is created with:
     - An Environment Record (to store variables and functions).
     - A reference to the Outer Lexical Environment.

3. **this Binding Determination**:

   - The value of this is set based on the execution context type:
     - Global Context: this refers to the global object (e.g., window in browsers, global in Node.js).
     - Function Context: this is determined by how the function is invoked.

4. **Example During Creation Phase**

   ```JavaScript
    function foo() {
      console.log(a); // undefined
      var a = 10;
      console.log(bar()); // 'Function Declaration'
      function bar() {
        return 'Function Declaration';
      }
    }
    foo();
   ```

   Explanation:

   a is hoisted and initialized to undefined.
   bar is hoisted with its full function definition.
