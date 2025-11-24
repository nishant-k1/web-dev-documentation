# Function Declaration vs Function Definition

Every function declaration is also a function definition, but not every function definition is a function declaration

**1. Function Declaration**

- A function declaration is a way to define a named function in JavaScript using the `function` keyword.
- It is hoisted, meaning it can be used before it appears in the code.
- Example:

  ```JavaScript
    function functionName(parameters) {
          // Function body
    }
  ```

**2. Function Definition**

- A function definition is the creation of a function, which can be achieved through different means, such as

  1. `Function Declaration`
  2. `Function Expression`
  3. `Arrow Functions`
  4. `Anonymous Functions`

- Can be a declaration, expression, or arrow function.
- Not always hoisted (e.g., function expressions)
- Example:

  ```JavaScript
    function functionName(parameters) {
          // Function body
    }
  ```

## 1. Function Declaration

- A function defined using the `function` keyword followed by a `name`, `parameters`, and `body`, declared as a standalone statement.
- Both Function name and Function Definition gets hoisted.
- Function Declarations Don't have `TDZ`
- `Function Declarations are fully hoisted with their definitions. This means the entire function (name and body) is moved to the top of the scope during the creation phase.`

## 2. Function Expression

- A function defined as part of an expression, typically assigned to a variable or used inline, with an optional name.
- Function expressions are not hoisted

1. **Function Definitions in const and let**

   - The const and let variables are hoisted, but they stay uninitialized in the `TDZ`.
   - When you use a const or let to define a function (or any variable), the variable is hoisted, but it remains in the `TDZ` until the interpreter reaches the line where it is explicitly assigned a value.
   - When you define a function as part of a function expression (e.g., using const or let), the variable holding the function behaves like any other const or let variable.
     - The declaration is hoisted but remains in `TDZ`
     - The initialization (assigning the function value) does not occur until the code is executed.

2. **Function Definitions in var**

   - When you use a var to define a function (or any variable), the variable is hoisted, but it is initialized with `undefined` until the interpreter reaches the line where it is explicitly assigned a value.

   - This means that before the line where the function is assigned, the variable exists but holds the value undefined.

   - When you declare a variable with var, the variable is hoisted to the top of the scope, but it is initialized to undefined

   - Using var for a function expression creates a situation where the variable is accessible but not initialized with the function yet.

   - var doesn’t cause a TDZ, it still doesn’t hoist the function value

## Summary Table

| Type                            | Hoisted?                     | TDZ?              | Can Call Before Declaration? |
| ------------------------------- | ---------------------------- | ----------------- | ---------------------------- |
| Function Declaration            | ✅ Fully                     | ❌ No             | ✅ Yes                       |
| Function Expression (const/let) | ❌ Value not hoisted         | ✅ Yes            | ❌ No                        |
| Function Expression (var)       | ✅ Variable only (undefined) | ❌ No             | ❌ No                        |
| Arrow Function                  | Same as expression           | Same as let/const | ❌ No                        |
