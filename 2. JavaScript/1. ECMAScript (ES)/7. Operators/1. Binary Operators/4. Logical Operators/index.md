# Logical Operators in JavaScript

`Short-circuiting means right-hand expressions might not run at all.`

1. **&& — Logical AND**

   - Returns the first falsy operand, or the last one if none are falsy.
   - Uses short-circuiting: stops evaluating as soon as it finds a falsy value.

   Memorize:

   - looks for the first falsy from left to right
   - && short-circuits on the first falsy
   - returns first operand: if first operand falsy
   - returns 2nd operand: if first operand truthy

   ```js
   true && "JS"; // → 'JS'
   false && "JS"; // → false
   0 && "hello"; // → 0
   "hi" && 123; // → 123
   ```

2. **|| — Logical OR**

   - looks for the first truthy from left to right
   - || short-circuits on the first truthy
   - Returns the first truthy operand, or the last one if none are truthy.
   - Also short-circuits. stops evaluating as soon as it finds a truthy value.

   Memorize:

   - returns first operand: if first operand is truthy
   - returns 2nd operand: if first operand falsy

   ```js
   false || "default"; // → 'default'
   0 || null || "JS"; // → 'JS'
   "hi" || "hello"; // → 'hi'
   ```

3. **! — Logical NOT**

   - Unary operator: negates the truthiness of a value.

   ```js
   !true; // → false
   !0; // → true
   !!"hi"; // → true
   ```

4. **?? — Nullish Coalescing**

   - Returns the right-hand operand only if the left is `null` or `undefined`.
   - Does not consider `0, false, ''` as nullish.

   ```js
   null ?? "default"; // → 'default'
   undefined ?? "fallback"; // → 'fallback'
   0 ?? 42; // → 0 (because 0 is not nullish)
   false ?? "yes"; // → false
   ```

5. **Conditional (Ternary) ?**

   - Evaluates a condition and returns one of two expressions based on whether the condition is truthy or falsy.

   - Syntax: condition ? expressionIfTrue : expressionIfFalse.

   - Does not use short-circuiting for the condition itself, but the chosen expression is evaluated only if selected

6. **Optional Chaining (?.)**

   - Syntax: obj?.prop or func?.()
   - Checks if a property or function exists before accessing or invoking it, returning `undefined` if the left-hand side is `null` or `undefined`.

   ```js
   let user = {};
   let name = user?.name ?? "unknown"; // "unknown"
   ```

## precedence of Logical Operators

- `! (Logical NOT)`
- `?. (Optional Chaining)`
- `&& (Logical AND)`
- `|| (Logical OR)`
- `?? (Nullish Coalescing)`
- `?: (Conditional/Ternary)`
