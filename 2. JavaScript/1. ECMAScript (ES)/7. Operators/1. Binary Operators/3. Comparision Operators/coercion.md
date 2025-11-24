# Comparison Operators Coercion

1. **Number Coercion**

   The loose equality operator (==) compares two values for equality, performing type coercion if the operands have different types. Coercion converts one or both operands to a common Number type before comparison.

   `Example: '123' == 123 → true (string '123' becomes number 123).`

   `Example: true == 1 → true.`
   `Example: true == '0' → false.`

---

**Object and Primitive**: Objects (e.g., arrays) are converted to primitives via toString() or valueOf() similar to arithmetic + operator coercion.

`Example: [] == '' → true (array [] becomes '' via toString()).`

**Special Case for null and undefined**: `null == undefined is true`. `This is not coercion but a defined behavior in the Abstract Equality Comparison algorithm`.

**NaN: If either operand is NaN**: return false (even NaN == NaN is false).
Example: NaN == NaN → false.

**Order of Operands**: The order doesn't affect coercion (e.g., 5 == '5' is the same as '5' == 5).
