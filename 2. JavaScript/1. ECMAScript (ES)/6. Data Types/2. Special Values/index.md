# Special Values

1. **NaN**

   - Type: Special number value
   - Description: Represents a value that is not a valid number, typically resulting from an invalid mathematical operation.
   - `NaN` is a special value that is considered unequal to any other value in JavaScript, including `NaN` itself. To compare if a value is NaN, you should use `isNaN()` or `Number.isNaN()`.
   - NaN stands for "Not a Number"
   - typeof NaN is Number
   - You can check if a value is NaN using the `isNaN(someValue)` function
   - isNaN() can also return true for non-numeric strings that can be coerced into valid numbers (like "42")
   - If you want to specifically check if a value is NaN (and not any other non-numeric value), you can use `Number.isNaN()`
   - Both `NaN === NaN` or `NaN == NaN` return `false` in JavaScript, because:
     - While NaN signifies a numerical value that doesn't exist, it doesn't have a single, consistent representation within a computer's memory. There are multiple bit patterns that can represent NaN.
     - The === operator performs strict equality checks, comparing both value and type. Since NaN can have different internal representations, comparing two NaN values doesn't always yield true
     - It has various internal representations, making it inconsistent in comparisons

2. **Infinity**

   - Type: Special number value
   - Description: Represents an infinitely large number. It results from operations that exceed the largest possible number.

   ```Javascript
      let result = 1 / 0;
      console.log(result); // Output: Infinity
   ```

3. **-Infinity**

   - Type: Special number value
   - Description: Represents negative infinity, which is the result of negative values divided by zero.

   ```Javascript
      let result = -1 / 0;
      console.log(result); // Output: -Infinity
   ```

4. **undefined**

   - Type: Primitive value
   - Description: Indicates that a variable has been declared but has not been assigned a value explicitly.
   - undefined is implicitly assigned
   - `typeof undefined` returns undefined

5. **null**

   - Type: Primitive value
   - Description: Represents the intentional absence of any object value. It is often used to indicate the absence of a value.
   - null is explicitly assigned
   - `typeof null` returns object

6. **Symbol()**

   - Type: Primitive value
   - Description: Represents a unique and immutable value often used for object property keys to avoid name collisions.

   ```Javascript
      let sym = Symbol("description");
      console.log(sym); // Output: Symbol(description)
   ```

7. **BigInt**

   - Type: Primitive value
   - Description: Represents large integers beyond the limits of Number type. It can handle integers of arbitrary precision.

   ```Javascript
      let bigNum = 1234567890123456789012345678901234567890n;
      console.log(bigNum); // Output: 1234567890123456789012345678901234567890n
   ```

8. **arguments (in functions)**

   - Type: Special object (within function scope)
   - Description: Represents the passed arguments to a function, allowing access to all arguments even if they aren't explicitly named.

   ```Javascript
      function myFunc() {
      console.log(arguments); // Output: [Arguments] { '0': 1, '1': 2 }
      }
      myFunc(1, 2);
   ```

9. **document.all**

   - Type: Special object (Browser-specific)
   - Description: A legacy feature used for document traversal. Although it's an object, it behaves like undefined in certain contexts (e.g., in logical operations).

   ```Javascript
      console.log(document.all); // Output: [object HTMLAllCollection]
      console.log(document.all === undefined); // Output: true
   ```
