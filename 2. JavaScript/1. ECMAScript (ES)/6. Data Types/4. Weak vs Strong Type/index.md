# Weak Typing vs Strong Typing

| Feature              | **Strongly Typed**                               | **Weakly Typed**                               |
| -------------------- | ------------------------------------------------ | ---------------------------------------------- |
| **Definition**       | Enforces strict rules on how values can be used  | Looser rules; automatic conversions allowed    |
| **Type Enforcement** | Strict – no implicit coercion                    | Lenient – allows implicit type coercion        |
| **Examples**         | TypeScript, Java, C#, Python                     | JavaScript, PHP, Perl                          |
| **Type Conversion**  | You must do it manually                          | Happens automatically (even behind the scenes) |
| **Errors**           | More likely to catch type errors at compile time | Errors may surface at runtime due to coercion  |

## Weak Typing

- Lenient – allows implicit type coercion
- Javascript is a dynamically typed and weakly typed.
- Eg: JavaScript, PHP, Perl

```javascript
var str = "Ryan";
var num = 3;
var sum = str + num; // return Ryan3 (Type coercion takes place)
```

## Strong Typing

- Strict – no implicit coercion
- Python is a dynamically typed and strongly typed
- Eg: TypeScript, Java, C#, Python

```python
var str = "Ryan";
var num = 3;
var sum = str + num; // returns error (because python is strongly typed i.e no type coercion takes place)
```
