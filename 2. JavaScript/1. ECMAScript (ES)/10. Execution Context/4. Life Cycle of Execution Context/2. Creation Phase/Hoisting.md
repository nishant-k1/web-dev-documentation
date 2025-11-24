# Hoisting

- `When hoisting occurs, the declaration of a variable or function is moved to the top of its scope, allowing you to use it before it is initialized. Only declarations are hoisted, not their initialization.`

- When we talk about hoisting, we’re referring to the behavior of moving variable and function declarations to the top of scope of the execution context (during the creation phase of an execution context) not their initialization.

- Variables and function declarations are moved to the top of their respective contexts during the execution context creation phase.

- Hoisting is JavaScript's default behavior of moving declarations (variables and functions) to the top of their respective scopes/execution context (global or functional) during the creation phase of the Execution Context.

- `Hoisting happens during the creation phase of an execution context`, which could be either:

  - Global Execution Context (for global scope).
  - Function Execution Context (for function scope).

- Hoisting moves declarations (variables and functions) to the top of the scope of the execution context they belong to:

  - In the Global Execution Context (GEC), declarations are hoisted to the top of the global scope.
  - In a Function Execution Context (FEC), declarations are hoisted to the top of the function's scope.
  - Initialization does not happen during hoisting; it's done when the execution reaches the variable's or function's definition in the code.

- This allows you to use variables and functions before they are declared in the code.

## Hoisting Lifecycle

1. **Creation Phase**:

   - Memory is allocated for variables and functions.
   - Function declarations are fully hoisted, meaning their entire definition is available at the top of the scope.
   - Variables declared with `var are hoisted` but initialized with undefined.
   - Variables declared with `let and const are hoisted` but remain uninitialized (in the `Temporal Dead Zone`).

2. **Execution Phase**:

   - Code is executed line-by-line.
   - Accessing variables before their declaration can lead to undefined (for var) or a ReferenceError (for let and const).

## Hoisting Types

1. **Function Hoisting**

   - `Functions declared using the function keyword are fully hoisted`. This means you can invoke the function before its declaration.

2. **Variable Hoisting**

   - **var hoisting**: Variables declared with var are hoisted but initialized to `undefined`.
   - **let and const hoisting**:
     - Variables declared with `let and const are hoisted` but remain uninitialized (in the `Temporal Dead Zone`).
     - Variables declared with `let` and `const` are also `hoisted` but remain uninitialized until the code executes their declaration.
     - Accessing them before their declaration results in a `ReferenceError`.
     - `let` and `const` are hoisted to the top of their scope but are in a `Temporal Dead Zone (TDZ)` until the code execution reaches their declaration.
   - **Function Expression Hoisting**
     - Function expressions (both regular and arrow functions) are treated like variables.
     - Only the variable is hoisted, not the function definition.
     - Invoking the function before its definition results in a `TypeError`
   - **Class Hoisting**
     - Classes are also hoisted but remain uninitialized (in the `Temporal Dead Zone`), similar to let and const.
     - Accessing a class before its declaration results in a `ReferenceError`.
