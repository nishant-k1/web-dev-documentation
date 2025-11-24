# Statement in JavaScript

In JavaScript, a statement is a complete instruction for the JavaScript engine to perform an action. It is the smallest standalone unit of execution.

```js
let x = 10; // declaration statement
x = x + 5; // assignment statement
console.log(x); // expression statement
if (x > 10) {
  // control flow statement
  console.log("Big");
}
```

## Types of JavaScript Statements

1. **Variable Declaration Statements**

   - `var x`
   - `let x`
   - `const x = 5`

2. **Expression Statements**

   - Assignments: `x = 5;`
   - Function calls: `alert('Hello World');`

3. **Control Flow Statements**

   - Conditional Statements:
     - `if`
     - `else if`
     - `else`
     - `switch`
   - Loops:
     - `for`
     - `while`
     - `do...while`
   - Loop Control:
     - `break`
     - `continue`

4. **Jump Statements**

   - return
   - break
   - continue
   - throw

5. **Exception Handling Statements**

   - `try`
   - `catch`
   - `finally`
   - `throw`

6. **Block Statements**

   - `{ ... }` - Used to group multiple statements together

7. **Return Statement**

   - `return` - Exits a function and optionally returns a value

8. **Label Statements**

   - `label:` - Used with `break` and `continue` to specify which loop to break or continue

9. **Empty Statement**

   - `;` - A statement with no operation

10. **Debugger Statement**

    - `debugger;` - Invokes any available debugging functionality
