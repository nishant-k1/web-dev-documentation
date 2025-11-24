# Pass by Value and Pass by Reference in JavaScript

The terms "`pass by value`" and "`pass by reference`" are primarily used in the context of `function invocation` to describe how arguments are passed to a function's parameters.

1. **Pass by Value**: When you pass a variable to a function
   **`When you pass a variable to a function`**:

   - A copy of the value is passed to the function's parameter.
   - Any changes made to the parameter inside the function do not affect the original variable outside the function.
   - **Definition**: A copy of the value is passed to the function. Changes made inside the function do not affect the original variable.
   - **Applies to**: Primitive data types (number, string, boolean, undefined, null, symbol, bigint).

   ```JavaScript
    function modifyValue(x) {
      x = 42; // Change is local to the function
    }

    let num = 10;
    modifyValue(num);
    console.log(num); // Output: 10 (original remains unchanged)
   ```

2. **Pass by Reference**:
   **`When you pass a variable to a function`**:

   - A reference to the memory location of the object or array is passed to the function's parameter.
   - Any changes made to the object/array through the parameter will affect the original object/array outside the function.
   - **Definition**: The memory reference of the object is passed to the function. Changes made inside the function affect the original object.
   - **Applies to**: Non-primitive data types (objects, arrays, functions).

   ```JavaScript
     function modifyObject(obj) {
       obj.a = 42; // Modifies the original object
       }

     let myObj = { a: 10 };
     modifyObject(myObj);
     console.log(myObj.a); // Output: 42 (original object is modified)
   ```

3. **Exceptions or Common Misunderstandings**
   In true pass by reference (as in some other languages), the reference itself is passed to the function, meaning:

   - Reassigning the parameter inside the function would also affect the original object.

   However, `JavaScript does not implement true pass by reference`. Instead:

   - JavaScript passes a copy of the reference (pass by value of the reference).
   - This means the parameter inside the function holds a reference to the original object, allowing you to modify the object’s properties.
   - Reassigning the parameter breaks the link to the original object because you're changing the local copy of the reference, not the reference held by the original variable.

4. `Reassigning a Reference`
   If you reassign the parameter inside a function, it breaks the reference and does not affect the original object.

   ```JavaScript
     function reassign(obj) {
       obj = { a: 100 }; // Reassignment creates a new object
     }

     let myObj = { a: 10 };
     reassign(myObj);
     console.log(myObj.a); // Output: 10 (original is unaffected)
   ```

5. `Nested Objects or Arrays`
   Even with shallow copies, nested objects/arrays retain their references.

   ```JavaScript
     function modifyNested(obj) {
       obj.nested.b = 42;
     }

     let myObj = { nested: { b: 10 } };
     modifyNested(myObj);
     console.log(myObj.nested.b); // Output: 42 (nested reference modified)
   ```

![alt text](image.png)
![alt text](image-1.png)
