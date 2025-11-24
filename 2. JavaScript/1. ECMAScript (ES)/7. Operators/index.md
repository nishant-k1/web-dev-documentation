# JavaScript Operators - Categorized & Explained

| Type    | Arity      | Examples          |
| ------- | ---------- | ----------------- |
| Unary   | 1 operand  | `!x`, `typeof x`  |
| Binary  | 2 operands | `a + b`, `a && b` |
| Ternary | 3 parts    | `cond ? x : y`    |

## 1. Arithmetic Operators

Perform mathematical calculations.

- `+` (Addition)
- `-` (Subtraction)
- `*` (Multiplication)
- `/` (Division)
- `%` (Modulus)
- `**` (Exponentiation)
- `++` (Increment)
- `--` (Decrement)

**Type Coercion:**

- Converts **strings to numbers** when possible.
- `2 + "3"` → `"23"` (concatenation)
- `"5" - 1` → `4` (subtraction forces numeric conversion).

---

## 2. Assignment Operators

Assign values to variables.

- `=` (Assign)
- `+=` (Add & Assign)
- `-=` (Subtract & Assign)
- `*=` (Multiply & Assign)
- `/=` (Divide & Assign)
- `%=` (Modulus & Assign)
- `**=` (Exponentiation & Assign)

**Type Coercion:**

- `+=` **concatenates** if one operand is a string.
  - `let x = "Hello"; x += " World"; // "Hello World"`
- Other operators convert operands to numbers.

---

## 3. Comparison Operators

Compare values and return `true` or `false`.

- `==` (Equal)
- `!=` (Not Equal)
- `===` (Strict Equal)
- `!==` (Strict Not Equal)
- `>` (Greater Than)
- `<` (Less Than)
- `>=` (Greater or Equal)
- `<=` (Less or Equal)

**Type Coercion:**

- `==` and `!=` **convert types** before comparing.
  - `"5" == 5` → `true` (string is converted to number).
- `===` and `!==` **do not convert types**.
  - `"5" === 5` → `false` (different types).

---

## 4. Logical Operators

Used in conditions to combine boolean values.

- `&&` (AND)
- `||` (OR)
- `!` (NOT)

**Type Coercion:**

- Converts values to **boolean**.
  - `0 && "Hello"` → `0` (0 is falsy).
  - `"Hello" || 0` → `"Hello"` (truthy value is returned).
  - `!""` → `true` (empty string is falsy).

---

## 5. Bitwise Operators

Operate on numbers at the **binary level**.

- `&` (AND)
- `|` (OR)
- `^` (XOR)
- `~` (NOT)
- `<<` (Left Shift)
- `>>` (Right Shift)
- `>>>` (Zero-fill Right Shift)

**Type Coercion:**

- Converts operands to **32-bit signed integers**.

---

## 6. String Operator

- `+` (Concatenation)

**Type Coercion:**

- If one operand is a string, the other is **converted to a string**.
  - `"Hello" + 5` → `"Hello5"`

---

## 7. Ternary (Conditional) Operator

Shorthand for `if-else`.

- `condition ? true_value : false_value`

**Type Coercion:**

- Converts the condition to **boolean**.
  - `0 ? "Yes" : "No"` → `"No"` (`0` is falsy).
  - `5 ? "Yes" : "No"` → `"Yes"` (`5` is truthy).

---

## 8. Type Operators

Check or manipulate data types.

- `typeof` (Returns the type of a variable)
- `instanceof` (Checks if an object is an instance of a class)

**Type Coercion:**

- `typeof null` → `"object"` (historical bug in JavaScript).
- `typeof NaN` → `"number"`.

---

## 9. Spread & Rest Operators

Used for working with arrays and objects.

- `...` (Spread & Rest)

🔹 Spread: for spreading things out
🔸 Rest: for collecting things in

**Type Coercion:**

- Expands or gathers elements in **iterable** values.

```js
let arr = [1, 2, 3];
console.log(...arr); // 1 2 3
```

## 10. Nullish Coalescing Operator

Handles only `null` and `undefined` values.

```js
console.log(null ?? "Default"); // "Default"
console.log(0 ?? "Default"); // 0 (0 is not null or undefined)
```

- `??`

**Type Coercion:**

- Returns the **right-hand value only if the left-hand value is `null` or `undefined`**.
  - `null ?? "Default"` → `"Default"`
  - `0 ?? "Default"` → `0` (`0` is not `null` or `undefined`)

---

## **Key Takeaways on Type Coercion in JavaScript**

1. **Arithmetic Operators** (except `+` for strings) convert operands to numbers.
2. **`+` with a string** converts the other operand to a string.
3. **`==` compares values after coercion**, but **`===` does not**.
4. **Logical operators return values** instead of just `true`/`false`.
5. **Bitwise operators** convert operands to **32-bit integers**.
6. **Nullish coalescing (`??`) only checks `null` and `undefined`.**
