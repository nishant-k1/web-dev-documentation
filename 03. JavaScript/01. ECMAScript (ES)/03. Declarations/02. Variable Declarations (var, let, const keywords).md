# variable declaration

## const and let

- When you use a `const` or `let` to define a function (or any variable), the variable is `hoisted` to block scope, but it remains in the `TDZ` until the interpreter reaches the line where it is explicitly assigned a value.
- Variable is hoisted, value isn't hoisted
- Hoisted Variable doesn't get any default initialization and is called to be in `TDZ`
- Variables declared with let/const in global scope are lexically scoped globals — available globally, but not part of the global object’s properties.

## var

- When you use a var to define a function (or any variable), the variable is `hoisted` to function or global scope, but it initialized with `undefined` until the interpreter reaches the line where it is explicitly assigned a value.
- Hoisted Variable gets a default initialization, undefined
- No TDZ
- Variables declared with var in global scope are lexically scoped globals — available globally, and becomes part of the global object’s properties.

## let vs const vs var in loops

const means the variable cannot be reassigned.
But in a normal for loop, i++ tries to reassign i, which is not allowed.

So you must use let here.

In a for loop, let does NOT behave like a normal block-scoped variable.

JavaScript does something special for let inside for loops.

✅ KEY FACT: Each loop iteration gets its OWN separate let i variable

This is specified in the ECMAScript standard.

Meaning:

```js
for (let i = 0; i < 3; i++) {
  arr.push(() => console.log(i));
}
```

Is treated as if JavaScript rewrote it into this:

```js
{
  let i = 0; // iteration 1 binding
  arr.push(() => console.log(i));
}
{
  let i = 1; // iteration 2 binding
  arr.push(() => console.log(i));
}
{
  let i = 2; // iteration 3 binding
  arr.push(() => console.log(i));
}
```

→ These are three different variables, all named i, but each lives only in its own loop iteration environment.

Not one shared variable.

**With let in a for loop, each iteration creates a new binding.**

**The `let` keyword in a for loop creates a new binding for each iteration, so each arrow function captures its own value of i.**

This would only be a problem if you used var instead of let.

| Loop Type                       | Can use `const`? | Why                            |
| ------------------------------- | ---------------- | ------------------------------ |
| `for (let i = 0; i < n; i++)`   | ❌ No            | `i` must change each iteration |
| `for (const i = 0; i < n; i++)` | ❌ No            | Cannot reassign `i`            |
| `for (const x of array)`        | ✅ Yes           | New variable each iteration    |
| `for (const key in obj)`        | ✅ Yes           | New variable each iteration    |

**"With var, the loop variable is shared; with let, each iteration gets its own copy."**
