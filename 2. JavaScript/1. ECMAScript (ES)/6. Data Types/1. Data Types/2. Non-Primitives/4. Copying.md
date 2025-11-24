# Ways of copying/cloning non-primitives

1. **Reference Copy**

   - only reference gets copied not the actual value
   - The default behavior when assigning one object to another.
   - Both variables point to the same memory reference, so changes in one affect the other.
   - In shallow copy for the nested plain objects or arrays only their references gets copied. The key points to the same previous object/array.

   ```Javascript
   let obj1 = { a: 1 };
   let obj2 = obj1; // Reference copy
   obj2.a = 2;
   console.log(obj1.a); // Output: 2 (both point to the same object)
   ```

2. **Shallow Copy**

   - Only the top-level properties or elements are copied.
   - Nested objects or arrays are still references.
   - Creates a new object/array but only copies the top-level properties. (Nested objects/array value of properties doesn't get copied only their references gets copied)
   - If the property values are objects or arrays, the reference is copied instead of duplicating the nested structures.

   1. Shallow Copy for Plain Objects:

      1. Using **`Spread Operator { ... }`**

         ```Javascript
         let obj1 = { a: 1, b: { c: 2 } };
         let obj2 = { ...obj1 };
         ```

      2. Using **`Object.assign()`**

         ```Javascript
         let obj1 = { a: 1, b: { c: 2 } };
         let obj2 = Object.assign({}, obj1);
         ```

   2. Shallow Copy – Arrays

      1. Using **`Spread Operator { ... }`**

         ```Javascript
         const arr1 = [1, 2, 3];
         const arr2 = [...arr1];
         ```

      2. Using **`Array.prototype.slice()`**

         ```Javascript
         const arr1 = [1, 2, 3];
         const arr2 = arr1.slice();
         ```

      3. Using **`Array.prototype.from()`**

         ```Javascript
         const arr1 = [1, 2, 3];
         const arr2 = Array.from(arr1);
         ```

3. **Deep Copy**

   1. Using **`window.structuredClone()`**
      limitations: available only in modern browsers

      ```js
      const original = { a: 1, b: { c: 2 } };
      const copy = structuredClone(original);

      copy.b.c = 42;
      console.log(original.b.c); // 2 ✅
      ```

   2. third party libraries like, Lodash `_.cloneDeep()`, deepdash, clone
      limitations: ❌ Requires a dependency (lodash)

      ```js
      import cloneDeep from "lodash/cloneDeep";

      const original = { a: 1, b: { c: 2 } };
      const copy = cloneDeep(original);
      ```

   3. ✅ JSON Method (Quick & Dirty)
      limitations:

      ❌ Loses functions, Dates, undefined, NaN, RegExp, Map, Set, etc.
      ❌ Throws on circular references

      ```js
      const original = { a: 1, b: { c: 2 } };
      const copy = JSON.parse(JSON.stringify(original));
      ```
