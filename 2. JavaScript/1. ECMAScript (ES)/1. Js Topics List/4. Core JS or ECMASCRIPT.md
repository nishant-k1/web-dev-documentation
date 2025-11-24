# Core JavaScript Concepts

## 1. **Basics**

- **Syntax**: Structure and rules of JavaScript code.
- **Comments**: `// single line`, `/* multi-line */`
- **Variables**: `let`, `const`, `var`
- **Data Types**: `Number`, `String`, `Boolean`, `Object`, `Array`, `Undefined`, `Null`, `Symbol`, `BigInt`

## 2. **Operators**

- **Arithmetic**: `+`, `-`, `*`, `/`, `%`, `++`, `--`
- **Assignment**: `=`, `+=`, `-=`, `*=`, `/=`
- **Comparison**: `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
- **Logical**: `&&`, `||`, `!`
- **Ternary**: `condition ? true : false`

## 3. **Control Flow**

- **Conditional Statements**: `if`, `else if`, `else`, `switch`
- **Loops**: `for`, `while`, `do...while`
- **Break/Continue**: `break`, `continue`

## 4. **Functions**

- **Function Declaration**: `function name() { }`
- **Function Expression**: `const name = function() { }`
- **Arrow Functions**: `const name = () => { }`
- **Parameters and Arguments**

## 5. **Objects**

- **Creating Objects**: `{ key: value }`
- **Accessing Properties**: `obj.key`, `obj['key']`
- **Methods**: Functions inside objects

## 6. **Arrays**

- **Creating Arrays**: `[]`
- **Accessing Elements**: `arr[index]`
- **Array Methods**: `.push()`, `.pop()`, `.shift()`, `.unshift()`, `.forEach()`, `.map()`, `.filter()`, `.reduce()`

## 7. **ES6+ Features**

- **Template Literals**: `` `string ${expression}` ``
- **Destructuring**: `const { key } = obj`, `const [first, second] = arr`
- **Default Parameters**: `function(name = 'default') { }`
- **Rest/Spread Operators**: `...rest`, `...spread`
- **Classes**: `class Name { constructor() { } }`
- **Modules**: `import`, `export`
- **Computed Property Names**: `Dynamic keys in object literals.`

## 8. **Error Handling**

- **Try/Catch**: `try { } catch (e) { }`
- **Throwing Errors**: `throw new Error('message')`

## 9. **Execution Context, Scope, and Closures**

- **Execution Context**: Creation and execution phases.
- **Scope**: Lexical scoping and function scope.
- **Closures**: Functions retaining access to their lexical scope.

## 10. **Asynchronous Operations Handling Tools**: `Promises`, `async/await`

ECMAScript provides the tools to handle async behavior: Promise, async/await, etc.

But it does not provide the sources of async events like timers or network requests — that's the job of the host environment (browser, Node.js, etc.).
