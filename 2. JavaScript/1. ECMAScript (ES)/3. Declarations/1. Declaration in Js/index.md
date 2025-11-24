# Declaration

- In JavaScript, declaration refers to the process of defining an identifier (a name) that can be used to refer a value, function, or object in your program. When you declare something, you introduce it to the JavaScript engine so it can be used later in the code.
- In JavaScript the interpreter or Just in Time Compiler(JIT) assigns variables a type at runtime based on the variable's value at the time.

## Global Variable

A global variable is a variable that is accessible everywhere (globally) and is a property of the global object (window in browsers, global in Node.js).
If the first condition is not true then the variable doesn't qualify to be called as the global variable.

“`Global variable`” traditionally = `globally accessible` + `property of the global object`.
**Variables accessible globally but not properties of the global object are not called global variables in the classic sense, even if accessible everywhere.**

In JavaScript, a global variable in the classic sense means:

A variable that is:

- Accessible everywhere, and
- Attached as a property of the global object (window in browsers, global in Node).

However:

```js
let x = 10;
const y = 20;

console.log(window.x); // undefined
console.log(window.y); // undefined
```

In the above example let and const declared in the global scope are not added to window, but they are still accessible globally. These are sometimes called global-scope variables, but not global object properties.

`**Not all variables that are accessible everywhere are properties of the global object.**`

## Declaration Types

### 1. Variable Declarations

- `Variable Declaration`: Creating a variable in JavaScript is called "declaring" a variable.
- To declare a variable as primitive we assign primitive value to it and to declare a variable as non-primitive we assign non-primitive value to it.
- In JavaScript, there are `three` main ways to declare variable 1. `var`, 2. `let` or 3. `const` keyword.

  1. **`var`**

     - **Scope**: Function Scoped
     - **Behavior in GEC**: if declared in the global context, it becomes a property of the window object (in browsers) or the global scope in other environments and is globally accessible(only when declared in global context other wise function scoped). That's why it is also called global variable.
     - **Behavior in FEC**:

       - When `var` is declared inside a function, its scope is limited to that function and doesn't become globally accessible.
       - Variables declared with var are function-scoped, not global scoped or block-scoped. So, even declared inside a block within a function, it gets accessible outside that block and inside that function. ❌ It is **not limited to the if block**
       - If var is declared inside a function, it is scoped to that function and cannot be accessed outside of it.

     - **Re-declaration**: Re-declarable within the `same scope`
     - **Re-assignment**: Re-assignable
     - **Mutability**: `Reference type mutable` (can modify object properties)
     - **Hoisting**: `Hoisted` and automatically initialized with `undefined` value
     - **Access Before Declaration**: Returns `undefined` if accessed before the declaration (because of hoisting and undefined value initialization)
     - **Use Cases**: Generally avoided in modern JavaScript due to its function-scoping and hoisting behavior; prefer `let` and `const` for clearer scope management

  2. **`let`**

     - **Scope**: Block scoped (if, while)
     - **Behavior in GEC**: If declared in the global context, like `var` it does not becomes a property of the window object (in browsers) or the global scope in other environments but can be accessed globally. So, in traditional sense not a global variable even if declared with in the global scope as it doesnt become property of the window or the global object, only gets global accessibility.
     - **Behavior in FEC**: When declared inside a function, its scope is limited to that function and doesn't become globally accessible.
     - **Re-declaration**: Not re-declarable within the `same block scope`
     - **Re-assignment**: Re-assignable
     - **Mutability**: `Reference type mutable` (can modify object properties)
     - **Hoisting**: `Hoisted` but not initialized (`Temporal Dead Zone`); accessing before initialization results in a `ReferenceError`,
     - **Access Before Declaration**: Throws a `ReferenceError` if accessed before the declaration
     - **Use Cases**: Preferred for variables that need to be reassigned, offering better block-level scoping than `var`

  3. **`const`**

     - **Scope**: Block scope
     - **Behavior in GEC**: If declared in the global context, like `var` it does not becomes a property of the window object (in browsers) or the global scope in other environments but can be accessed globally.
     - **Behavior in FEC**: When declared inside a function, its scope is limited to that function and doesn't become globally accessible.
     - **Re-declaration**: Not re-declarable within the `same block scope`
     - **Re-assignment**: Not re-assignable (variable binding is immutable). Error you will get: `TypeError: Assignment to constant variable`
     - **Mutability**: `Reference type mutable` (can modify object properties, but not the binding itself)
     - **Hoisting**: `Hoisted` but not initialized (`Temporal Dead Zon`e); accessing before initialization results in a `ReferenceError`
     - **Access Before Declaration**: Throws a `ReferenceError` if accessed before the declaration
     - **Use Cases**: Ideal for variables that should not be reassigned, ensuring immutability of the binding

- Other Ways to Declare Variables (Less Common)

  1. **Global scope without a declaration**: If you assign a value to an undeclared variable (without var, let, or const), it implicitly becomes a global variable, which is generally discouraged due to potential side effect

     ```Javascript
       myVar = 10; // Implicitly a global variable (not recommended)
     ```

  2. **Destructuring assignment**: Allows you to unpack values from arrays or properties from objects into distinct variables.

     ```Javascript
       const { name, age } = { name: "John", age: 30 };
       console.log(name); // John
       console.log(age);  // 30
     ```

  3. **for...of / for...in loops**: When declaring variables in loop constructs, you can use let or const for block-scoping.

     ```JavaScript
       for (let i = 0; i < 5; i++) {
         console.log(i); // 0, 1, 2, 3, 4
       }
     ```

### 2. Function Declarations

- **Function Declaration** – Named, hoisted. Fully accessible. No `undefined` or `TDZ`
- **Function Expression** – Assigned to a variable, the variable is hoisted not the function body. So, reference error for let & const and for var undefined
- **Arrow Function** – Short syntax, does not bind `this`.

### 3. Class Declarations

- **Class Declaration** –

  1. JavaScript treats class declarations in a way similar to let and const, only name gets hoisted not the class body, accessing the class name before declaration gives reference error

- **Class Expression** – Anonymous/named class, assigned to a variable. Hoisted similarly like function expression.

### 4. Module Declarations (Whole file is called module once found below keywords in the file)

- **`import`** – Imports modules.
- **`export`** – Exports from modules.

### 5. Async Declarations

- **`async`/`await`** – Asynchronous function declaration.

---

## Re-declaration within the same scope/execution context

1. var:
   can be re-declared within the same scope,
   If you re-declare a variable with var in the same scope, it will overwrite the previous declaration.
   If a `var variable` and a `function` are declared with the same identifier within the same scope, the function declaration will take precedence.

2. let:
   can't be re-declared within the same scope,
   Re-declaring a variable with let in the same scope will result in a SyntaxError

3. const:
   can't be re-declared within the same scope,
   Similar to let, re-declaring a variable with const in the same scope will cause a SyntaxError.

## Re-declaration in inner scopes

1. `var`:
   can be re-declared
   If you re-declare a var variable in an inner scope, it will shadow the outer variable within that inner scope.
   If the var variable and the function declaration are in different scopes, there won't be any conflicts.

2. `let`:
   can be re-declared
   If you re-declare a let variable in an inner scope, it will shadow the outer variable within that inner scope.

3. `const`:
   can be re-declared
   If you re-declare a let variable in an inner scope, it will shadow the outer variable within that inner scope.
