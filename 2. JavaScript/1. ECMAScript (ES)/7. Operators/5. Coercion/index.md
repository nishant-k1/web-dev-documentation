# Coercion

1. Coercion typically converts operands to one of the following types:

   1. string
   2. number
   3. boolean

2. In JavaScript, the `==`, `-`, `*`, and `/` operators coerce operands to numbers (even if the operands are of any primitive type).

3. The `+` operator also coerces operands to numbers only if neither operand is a string; otherwise, it prefers string concatenation if either operand is a string.

4. If either or both operands are objects, their `ToPrimitive` conversion is triggered (via `Symbol.toPrimitive`, `valueOf()`, or `toString()`), before coercion by all these operators.

5. `undefined`, `null`, and `symbol` will behave specially but do not automatically coerce into the other types during normal coercion.

Note: null is a primitive, not an object, so this rule doesn’t apply to it.

## null == undefined but null !== undefined

**Special Case for null and undefined**: null == undefined is true. This is `not` coercion but a defined behavior in the Abstract Equality Comparison algorithm. Both are loosely equal.

## Either or both operand is NaN

returns false

NaN === NaN is false, because NaN is the only value in JavaScript that is not equal to itself.

```js
NaN == NaN; // false
NaN == {}; // false
```

## Order of Operands

The order doesn't affect coercion (e.g., 5 == '5' is the same as '5' == 5).
