# Arithmetic Operators Coercion

1. **String Coercion**
   When an operation involves a string and another type with (+ operator), JavaScript tries to convert the non-string operand to a string.

   ```Javascript
    let num = 5;
    let str = "Hello";
    let result = str + num; // "Hello5" - number coerced to string for concatenation

    console.log(5 + '5'); // "55" (number 5 is coerced to string)
    console.log('5' + 5); // "55" (number 5 is coerced to string)
   ```

2. **Number Coercion**
   When a number is involved in arithmetic or comparison operations `(except for +)`, JavaScript tries to convert non-numeric types to numbers.

   ```Javascript
    let str = "10";
    let result = str * 2; // 20 - string coerced to number for multiplication

    console.log("5" - 2); // 3 (string "5" is coerced to number)

    console.log("5" * 2); // 10 (string "5" is coerced to number)

    console.log("5" / 2); // 2.5 (string "5" is coerced to number)

    '123' == 123 → true // string '123' becomes number 123.

    true == 1 → true. // true becomes number 1

    true == '0' → false // both gets coerced to Number, so  the comparison becomes 1 === 0, which returns false

    false == '0' → true // both gets coerced to Number, so  the comparison becomes 0 === 0, which returns false
   ```

3. **Object to Primitive Coercion**
   JavaScript can convert objects to primitive values when necessary. This happens when objects are used in operations like string concatenation, comparison, or arithmetic.
   By default, JavaScript calls the toString() or valueOf() method of objects to convert them into a primitive value.

<!-- By default, plain objects are converted using .toString(), which returns: -->

```Javascript
 let obj = { name: "John" };
 console.log(obj + ""); // "[object Object]" (object coerced to string)

 let obj = {
 valueOf() {
     return 10;
   }
 };

 console.log(obj + 5); // 15 (obj coerced to number)
```

Type coercion happens. The + operator attempts to convert both operands to primitive values.
[] converts to "" (empty string).
{} converts to "[object Object]" (the default string representation of a plain JavaScript object).

**During string coercion, the non-string operand is converted to a string, and this typically involves calling its .toString() method, unless overridden by custom behavior via Symbol.toPrimitive or valueOf().**

**When JavaScript needs to turn something into a string (like when using + with a string), it tries to call .toString() on it — unless the object has a custom way of converting itself using Symbol.toPrimitive.**

```js
console.log([] + []);
console.log({} + []);
console.log([] + {});
console.log(+[1]);
console.log({}.toString());
console.log([1, 2, 3, 4, 5].toString());
console.log(`[1, 2, 3, 4, 5, 6]`);
console.log(String([1, 2, 3, 4, 5, 6]));
console.log("TEST" + {});
console.log("TEST" + []);
console.log(++{});
console.log(++[]);

function test() {}

console.log([] + (() => {}));
console.log({} + (() => {}));

console.log([] + test);
console.log({} + test);
```
