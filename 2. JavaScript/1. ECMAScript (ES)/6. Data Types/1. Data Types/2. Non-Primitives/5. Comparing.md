# Checking equality for non-primitives

1. Reference only Comparison
   If two or more objects/arrays have exactly same properties and values or elements but references are different then those objects/arrays are not equal by reference.

   This mode of comparison is used by react while comparing state wrt to the previous state in order to trigger a re-render.

   If two objects are equal by reference (obj1 === obj2), they are automatically:

   - Shallow equal
   - Deep equal

   We can say that an object’s reference has not changed if we have not assigned it a new object, and we’re still using the same memory address (i.e., we haven't done obj = {...} or similar).

   1. **Direct Equality (===)**

      - Compares references, not the actual content.
      - Two non-primitives are considered equal only if they point to the same memory location.

      ```Javascript
      let obj1 = { name: "Nishant" };
      let obj2 = { name: "Nishant" };
      console.log(obj1 === obj2); // Output: false (different references)

      let obj3 = obj1;
      console.log(obj1 === obj3); // Output: true (same reference)

      ```

   2. **Object.is()**:

      - Mostly behaves like ===, but handles some edge cases like NaN.
      - Object.is() is rarely used for object comparison.

      ```js
      Object.is(NaN, NaN); // true
      NaN === NaN; // false
      ```

2. **Shallow Comparison**

   - Top-Level Object References: The objects being compared (e.g., obj1 and obj2) can be distinct objects in memory (i.e., obj1 !== obj2).
   - First-Level Properties:

     1. For primitive values (e.g., numbers, strings, booleans), the values must be strictly equal (===).

     2. For non-primitive values (e.g., objects, arrays), the properties must point to the same reference in memory, not just have equivalent content.

   - No Deep Check: Shallow equality does not recurse into nested objects to compare their contents; it only checks if the references of nested objects are identical.

   ```js
   const obj1 = { a: 1, b: { x: 10 }, c: "hello" };
   const obj2 = { a: 1, b: { x: 10 }, c: "hello" };
   const obj3 = { a: 1, b: obj1.b, c: "hello" }; // b points to the same object as obj1.b

   // obj1 and obj2 are NOT shallowly equal because obj1.b and obj2.b are different references
   console.log(shallowEqual(obj1, obj2)); // false

   // obj1 and obj3 ARE shallowly equal because obj1.b and obj3.b point to the same object
   console.log(shallowEqual(obj1, obj3)); // true

   function shallowEqual(obj1, obj2) {
     const keys1 = Object.keys(obj1);
     const keys2 = Object.keys(obj2);
     if (keys1.length !== keys2.length) return false;
     for (const key of keys1) {
       if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
         return false;
       }
     }
     return true;
   }

   //  The objects themselves (obj1 and obj2) can be different instances (different references).
   //  Their first-level properties must either:
   // //  Have identical primitive values (1 === 1, "hello" === "hello"), or
   // //  Reference the same object for non-primitives (e.g., obj1.b === obj3.b).
   //  Nested object contents (e.g., { x: 10 } vs. { x: 10 }) are not compared; only their references matter.
   ```

   - For shallow equal the first level properties of the objects must have same reference and value. Even if the first level property reference are different while value is same then the object are not shallow equal.

   ```js
   const obj1 = { a: 1, b: { x: 10 }, c: "hello" };
   const obj2 = { a: 1, b: { x: 10 }, c: "hello" };

   obj1 !== obj2 because b has different references
   ```

   - If two or more objects/arrays have exactly the same properties and values or elements but references are different then those objects/arrays are shallow equal.
   - Compares the properties of objects at the first level (not deeply nested properties) and not by reference and not by nested properties.
   - Does not account for deep equality; two objects with the same nested structure but different references will not match.
   - Not reliable for nested objects.

   1. **Shallow Equality Using Custom Logic**

      ```js
      function shallowEqual(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) return false;

        for (let key of keys1) {
          if (obj1[key] !== obj2[key]) return false;
        }
        return true;
      }
      ```

3. **Deep Comparison**

   - Compares the properties of objects recursively, including nested objects and arrays.
   - Requires a helper function or library (like Lodash's isEqual).

   1. **Using Libraries**
      `Lodash`: Offers a reliable `_.isEqual` method for deep comparison.

      ```Javascript
      const obj1 = { x: 1, y: 2 };
      const obj2 = { x: 1, y: 2 };

      import { isEqual } from 'lodash';
      isEqual(obj1, obj2); // ✅ deep and robust
      ```

   2. **JSON Stringify Comparison**: ⚠️ Use With Caution ❌ (limited): 🔻 Keep it briefly with a strong warning. Don’t recommend it for anything beyond basic flat objects.

      - Converts objects to JSON strings and compares them.
      - Ignores data types (e.g., functions and undefined are excluded) and property order.
      - ✅ Works for simple, flat objects
      - ❌ Fails with:

        - Key order differences
        - Functions, undefined, Symbol, Dates, etc.
        - Circular references

        ```js
        const a = { x: 1, y: 2 };
        const b = { x: 1, y: 2 };

        console.log(JSON.stringify(a) === JSON.stringify(b)); // true
        ```
