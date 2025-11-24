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
