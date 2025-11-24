# variable declaration

## const and let

- When you use a `const` or `let` to define a function (or any variable), the variable is `hoisted`, but it remains in the `TDZ` until the interpreter reaches the line where it is explicitly assigned a value.
- Variable is hoisted, value isn't hoisted
- Hoisted Variable doesn't get any default initialization and is called to be in `TDZ`
- Variables declared with let/const in global scope are lexically scoped globals — available globally, but not part of the global object’s properties.

## var

- When you use a var to define a function (or any variable), the variable is `hoisted`, but it initialized with `undefined` until the interpreter reaches the line where it is explicitly assigned a value.
- Hoisted Variable gets a default initialization, undefined
- No TDZ
- Variables declared with var in global scope are lexically scoped globals — available globally, and becomes part of the global object’s properties.
