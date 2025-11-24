// Arithmetic Operators: Mathematical Operators (-, *, /, %, **) Convert Strings to Numbers except '+' operator
console.log(1 + "2"); // "12": Coerces number to string
console.log(2 + true); // 3: Coerces boolean to number
console.log([] + {}); // "[object Object]"  (Array converts to "", Object converts to "[object Object]")
console.log({} + []); //  0 (Treated as an empty block + array, which converts to 0)
console.log("5" - 3); // 2: Coerces string to number
console.log("5" * 3); // 15: Coerces string to number
console.log("6" / 3); // 2: Coerces string to number

// Comparison Operators: Loose Comparison (==) Converts Types Automatically
console.log(null == 0); // false
console.log([] == 0); // true
console.log([] == false); // true  (empty array converts to "", then to 0 → 0 == false)
console.log(false == []); // true  (same conversion applies)
console.log(null > 0); // false (null converts to 0, and 0 is not greater than 0)
console.log(null < 0); // false (null converts to 0, and 0 is not less than 0)
console.log(null >= 0); // true
console.log(null >= 0); // true  (null converts to 0, and 0 >= 0)
console.log(null <= 0); // true  (null converts to 0, and 0 <= 0)

// Logical Operators: Logical Operators (&&, ||, !) Convert Values to Booleans (Falsy/Truthy Rules Apply).
console.log(true && "Hello"); // "Hello" (truthy value)
console.log(false || "Hello"); // "Hello" (first truthy value)
console.log(!"Hello"); // false (since "Hello" is truthy)

//  Nullish Coalescing Operator (??)
console.log(null ?? "Default"); // "Default" (null is falsy)
console.log(0 ?? "Default"); // 0 (not `null` or `undefined`, so no conversion)

// Spread and Rest Operators: Converts string to array.
console.log([..."hello"]); // ['h', 'e', 'l', 'l', 'o']
