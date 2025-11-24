# Ways of Copying primitives

1. **Copy by Value**

   - Assigning a primitive value to another variable creates a completely independent copy.
   - Changing the copied value does not affect the original value, as primitives are immutable.

   ```Javascript
      let a = 42;
      let b = a; // Copy by value
      b = 50;
      console.log(a); // Output: 42 (independent copy)
      console.log(b); // Output: 50
   ```

2. **Copy Using Explicit Methods**

   1. Using `Assignment` Operator

      ```Javascript
      let str1 = "Hello";
      let str2 = str1; // Independent copy
      str2 = "World";
      console.log(str1); // Output: "Hello" (unchanged)
      console.log(str2); // Output: "World"
      ```

   2. Using `String.prototype.slice()` (for Strings)

      ```Javascript
      let str1 = "JavaScript";
      let str2 = str1.slice();
      console.log(str2); // Output: "JavaScript"
      ```

   3. Using Template Literals

      ```Javascript
      let str1 = "Learn";
      let str2 = `${str1}`;
      console.log(str2); // Output: "Learn"
      ```

   4. Using Math Operations (for Numbers)

      ```Javascript
      let num1 = 10;
      let num2 = num1 + 0; // Copy by calculation
      console.log(num2); // Output: 10
      ```

   5. Using Conversions (for Primitives that Support It)

      ```Javascript
      let num1 = 42;
      let num2 = Number(num1); // Copy by type conversion
      console.log(num2); // Output: 42

      ```
