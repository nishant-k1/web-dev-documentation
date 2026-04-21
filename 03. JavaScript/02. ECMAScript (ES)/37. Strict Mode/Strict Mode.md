# Strict Mode

| Feature                        | Non-Strict Mode          | Strict Mode (✅ Recommended) |
| ------------------------------ | ------------------------ | ---------------------------- |
| Undeclared variables           | Allowed (becomes global) | ❌ Error                     |
| Duplicate function parameters  | Allowed                  | ❌ Error                     |
| Use of `with` statement        | Allowed                  | ❌ Error                     |
| `this` in functions            | Global object            | `undefined`                  |
| Octal literals                 | Allowed (ES5)            | ❌ Error                     |
| Reserved keywords as variables | Allowed (some)           | ❌ Error                     |

- **Enabling Strict Mode**:

  - Using `"use strict"` and its benefits.

- **Common Pitfalls Resolved by Strict Mode**:
  - Silent errors, accidental globals, and restricted keywords.

## Strict Mode FAQs

1. What is Strict Mode in JS?
   "use strict" is a directive introduced in ES5 to enforce stricter parsing and error handling in your code.

2. Why Use It? (Interview-Friendly Reasons)
   Avoids accidental global variables
   Catches silent bugs early (e.g., typos, duplicates)
   Makes this behavior safer
   Disallows deprecated or error-prone features
   Prepares code for future ECMAScript versions

3. What problem does it solve?
   It forces the developer to write cleaner and more predictable JavaScript by catching bad syntax or unsafe actions.

4. Where Do You Use It?
   Top of a script or inside a function.

   ```js
   "use strict"; // whole script is strict

   function test() {
     "use strict"; // only this function is strict
   }
   ```

5. Are modules implicitly in strict mode?
   Yes, ES6 modules are always in strict mode by default — implicitly, even if you don't write "use strict".
