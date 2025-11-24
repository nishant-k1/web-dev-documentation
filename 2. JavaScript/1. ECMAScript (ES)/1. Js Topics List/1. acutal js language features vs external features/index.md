# Core JavaScript Language Topics (Built-in) vs External Features (Not Part of Core JavaScript Language)

## Core JavaScript/ECMAscript Language Topics (Built-in)

- **Variables**: `var`, `let`, `const`
- **Data Types**: `String`, `Number`, `Boolean`, `Object`, `Null`, `Undefined`, `Symbol`, `BigInt`
- **Operators**: Arithmetic, Comparison, Logical, Assignment, etc.
- **Control Flow**: `if`, `else`, `switch`, `for`, `while`, `do-while`, `try-catch`
- **Functions**: Function declarations, expressions, arrow functions, function scope, closures
- **Objects**: Object literals, constructors, `this` keyword, prototypes
- **Arrays**: Array literals, methods like `map()`, `filter()`, `reduce()`, etc.
- **Classes**: ES6 class syntax, inheritance, static methods
- **Modules**: `import`, `export`, `export default`
- **Asynchronous Operations Handling Tools**: `Promises`, `async/await`
- **Error Handling**: `try-catch`, `throw`
- **JSON**: `JSON.parse()`, `JSON.stringify()`
- **Destructuring**: Object and array destructuring
- **Prototype-based Inheritance**: Prototype chain and `Object.create()`
- **Closures**: Lexical scoping, closures, and their role in maintaining state
- **Higher-order Functions**: Functions that accept other functions as arguments or return them
- **Iterators and Generators**: `for...of`, `Symbol.iterator`, and `function*`
- **Map and Set**: `Map`, `Set`, `WeakMap`, `WeakSet`
- **Reflection**: `Reflect` API for meta-programming
- **Type Coercion and Conversion**: Implicit and explicit type conversion

ECMAScript provides the tools to handle async behavior: Promise, async/await, etc.

But it does not provide the sources of async events like timers or network requests — that's the job of the host environment (browser, Node.js, etc.).

## External Features (Not Part of Core JavaScript Language)

- **Web APIs/DOM APIs**: DOM manipulation, AJAX, Fetch, Event listeners, document, addEventListener() etc.
- **Event Loop** and Task Queues (Microtask Queue, Macrotask Queue)
- **JavaScript Engines**: Call Stack, Heap, Garbage Collector, JIT Compiler
- **Browser/Node.js Environment**: Networking, file I/O, etc.
- **Event Handling** (Basic): Event listeners, `addEventListener()`
- **Asynchronous Operations**: `setTimeout`, `setInterval`,`fetch`
- fs, http, etc. – from Node.js
- event loop and microtask/macrotask queues

Below are not part of ECMAScript, but they are what you usually await on:

setTimeout, setInterval

fetch

XMLHttpRequest

addEventListener

requestAnimationFrame

Node.js: fs.readFile, http, etc.
