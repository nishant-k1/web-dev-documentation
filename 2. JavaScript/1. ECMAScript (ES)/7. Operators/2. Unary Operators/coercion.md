# Unary operator coercion

1. Number coercion
   Internally, it calls the ToNumber() function

   1. Unary Plus (+)
      Purpose: Converts the operand to a number.
      Rules for +array and +plain object: It will try to coerce array to a string → then to a number.

      ```j
         +true        // 1
         +false       // 0
         +null        // 0
         +undefined   // NaN
         +"123"       // 123
         +""          // 0
         +[]          // 0
         +[1, 2]      // NaN
         +{}          // NaN

      ```

   2. Unary Negation (-)

      ```j
         -"5"         // -5
         -false       // 0
         -true        // -1
         -null        // -0
         -undefined   // NaN
      ```

2. Boolean coercion

   1. Logical NOT (!)

   ```js
   !true; // false
   !false; // true
   !0; // true
   !1; // false
   !""; // true
   !"hello"; // false
   !null; // true
   !undefined; // true
   !{}; // false
   ![]; // false
   ```
