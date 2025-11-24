# Checking equality for primitives

In JavaScript, primitive values are compared using strict equality (===) or loose equality (==) operators. Here's how they work for comparing primitives:

1. `Strict Equality (===)`
   Compares both value and type.
   No type coercion occurs.
   Use this for precise, type-safe comparisons.

2. `Loose Equality (==)`
   Compares value only, performing type coercion if the types differ.
   May lead to unexpected results due to type conversions.

## Comparison of Specific Primitives

1. **Strings**
   Compared character by character (case-sensitive).

2. **Number**:

   1. Compared by value.
   2. Special cases:
      NaN is not equal to itself.
      Use Number.isNaN() to check for NaN.

3. **Booleans**

   1. Compared by value.

4. **null and undefined**

   1. null is only strictly equal to null
   2. undefined is only strictly equal to undefined
   3. null and undefined are loosely equal.

5. **Symbols**
   Compared by reference, not value.
   Two Symbol instances with the same description are not equal.

6. **BigInt**
   Compared by value if both are BigInt.
