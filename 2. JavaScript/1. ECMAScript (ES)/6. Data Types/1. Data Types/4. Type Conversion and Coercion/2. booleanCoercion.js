// 1. if Statements & Conditional Expressions
if (value) {
} // `value` is coerced to `true` or `false`
while (value) {} // same for `while` loops

// Example:
if ("") console.log("Truthy"); // Won't execute ("" is falsy)
if ("Hello") console.log("Truthy"); // Will execute ("Hello" is truthy)

// 2. Logical Operators (`&&`, `||`, `!`)
console.log(true && "Hello"); // "Hello" (truthy value)
console.log(false || "Hello"); // "Hello" (first truthy value)
console.log(!"Hello"); // false (since "Hello" is truthy)

// 3. Ternary Operator (`? :`)
console.log("" ? "Truthy" : "Falsy"); // "Falsy" ("" is falsy)
console.log(42 ? "Truthy" : "Falsy"); // "Truthy" (42 is truthy)

// 4. Boolean Constructor (`Boolean(value)`)
console.log(Boolean("")); // false ("" is falsy)
console.log(Boolean(123)); // true (123 is truthy)

// 5. `||` (Default Value Assignment)
let name = "" || "Guest";
console.log(name); // "Guest" ("" is falsy, so "Guest" is used)

// 6. `&&` (Short-Circuit Execution)
let isLoggedIn = true && "Welcome!";
console.log(isLoggedIn); // "Welcome!" (true is truthy, so next value is returned)

// 7. `??` (Nullish Coalescing - only checks `null` & `undefined`)
console.log(null ?? "Default"); // "Default" (null is falsy)
console.log(0 ?? "Default"); // 0 (not `null` or `undefined`, so no conversion)

// 8. Loose Equality (`==`) with `null` or `undefined`
console.log(null == false); // false (null only equals undefined)
console.log(undefined == false); // false (same reason)

// 9. Implicit Conversion in Array `filter()`
let numbers = [0, 1, false, 2, "", 3];
console.log(numbers.filter(Boolean)); // [1, 2, 3] (Falsy values are removed)

// 10. DOM Properties (e.g., `hidden`, `checked`, `disabled`)
document.querySelector("input").checked = ""; // Coerced to `false`
document.querySelector("input").checked = "any string"; // Coerced to `true`
