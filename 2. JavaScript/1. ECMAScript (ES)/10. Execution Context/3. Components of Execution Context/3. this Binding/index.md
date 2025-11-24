# this Binding

## `this` and Execution Context

Every time a function is executed, JavaScript creates an execution context for that function. The execution context contains:

- The value of this for that function.
- The local variables and parameters of the function.
- The outer lexical scope (variables and functions that are available to the function).

So, in a sense, this is part of the execution context. It refers to the object (or global scope) that is executing the function, but the exact object this points to depends on how the function is called.

### `this` refers to the Execution Context or the object?

- The keyword this in JavaScript refers to the execution context (not directly to an object), but it can be bound to an object depending on how the function is invoked
- The **value of this** is determined by how the function is called, and it can refer to:

  1. `An object`: When a method is called on an object, this refers to that object. Here in the below code, this refers to the person object because greet is invoked as a method of person.

     ```Javascript
     const person = {
     name: 'Alice',
     greet() {
       console.log(this.name);
     }
     };
     person.greet(); // `this` refers to `person` (the object calling the method)
     ```

  2. The `global context`: In a regular function call, this refers to the global object (window in browsers or global in Node.js) unless in strict mode (where it would be undefined). Here in the below code, this refers to the `global` object (in browsers, it's window) because greet is invoked as a standalone function.

     ```Javascript
     function greet() {
       console.log(this);
     }
     greet(); // In non-strict mode, `this` refers to the global object (`window` in browsers)
     ```

  3. An `explicitly bound object`: When using .bind(), .call(), or .apply(), this can be set explicitly to any object. Here in the below code, this refers to the person object because greet was explicitly bound using .bind(person).

     ```Javascript
       function greet() {
         console.log(this.name);
       }

       const person = { name: 'Bob' };
       const boundGreet = greet.bind(person);
       boundGreet(); // `this` is explicitly bound to the `person` object
     ```

---

### What Does `this` in the Execution Context Point To?

The value of `this` is set when the function is called and depends on how the function is invoked.

1. **Global Execution Context**: In the global context, this refers to the global object (window in browsers or global in Node.js).

   ```Javascript
   console.log(this); // `this` refers to the global object
   ```

2. **Function Execution Context**

   1. For a regular function, this depends on the call site: 1. In non-strict mode, `this` refers to the `global object`. 2. In strict mode, `this` is `undefined` **if not explicitly set**.

      ```Javascript
      function showThis() {
        console.log(this);
      }
      showThis(); // Non-strict: `this`is the global object; Strict:`this`is`undefined`
      ```

3. **Method Call**: When a function is called as a method of an object, this refers to that object.

   ```Javascript
     const obj = {
     name: 'Nishant',
     greet() {
       console.log(this.name);
       }
     };
     obj.greet(); // `this` refers to `obj`
   ```

4. **Explicit Binding**: Using `.bind()`, `.call()`, or `.apply()`, you can explicitly set this.

   ```Javascript
     function greet() {
       console.log(this.name);
     }
     const obj = { name: 'Alice' };
     greet.call(obj); // `this` refers to `obj`
   ```

5. **Arrow Functions**: Arrow functions do not have their own this. Instead, they inherit this from their enclosing lexical scope.

   ```Javascript
     const obj = {
       name: 'Nishant',
       greet: () => {
         console.log(this.name);
       }
     };
     obj.greet(); // `this` is inherited from the outer scope, not `obj`.
   ```
