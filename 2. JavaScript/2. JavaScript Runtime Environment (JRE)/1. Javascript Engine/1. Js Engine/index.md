# Javascript / ECMAScript Engines

## A JavaScript engine

- Javascript engines are written/built using low level languages like C++. v8 engine is written with c++

- It is a software component that executes JavaScript code. It reads javascript code and runs javascript code. Javascript engine makes computer understand javascript. (In simple language, acts as a translator).

- The first JavaScript engines were mere interpreters, but all relevant modern engines use just-in-time compilation for improved performance

- JavaScript engines are typically developed by web browser vendors, and every major browser has one. In a browser, the JavaScript engine runs in concert with the rendering engine via the Document Object Model.

- The use of JavaScript engines is not limited to browsers. For example, the V8 engine is a core component of the Node.js and Deno runtime systems.

- Since ECMAScript is the standardized specification of JavaScript, ECMAScript engine is another name for these engines.

- We can create our own javascript engine by following the standard and norms of ECMAScript

- We will consider the V8 engine to study the internals of javascript/ECMAScript engine

## Just-in-time compilation engines

1. Spider Monkey (First Javascript Engine developed by Brenden Eich) - Mozilla, GNOME Shell - Firefox
2. V8 - Google, Nodejs, Deno runtime systems
3. Chakra - Edge (Internet Explorer) (now edge uses V8)
4. Javascript Core Webkit - Safari

## Runtime interpreter engines

1. Continuum
2. Futhark
3. InScript
4. JScript
5. Jint
6. Boa

## V8 engine components / ECMASscript engine components

Javascript Source Code
|
Parser
|
AST (Abstract Syntax Tree)
|
|
|
Interpreter ---> Bytecode ---> "machine reads it" ---> Heap - Callstack - Garbage Collector
|
Profiler
|
Compiler
|
|
|
Optimized Code ---> "machine reads it" ---> Heap - Callstack - Garbage Collector

## Things present inside ECMASscript engine

1. Parser
   It parses the javascript code into AST which is easier to understand by the Interpreter

2. AST
   Abstract Syntax Tree: It is a tree like structure which is easier for the engine to understand the code

3. Interpreter
   It converts the code line by line into Bytecode (Not as low level as machine code)

4. Profiler
   It monitors the interpreter and looks for the code which requires optimization and sends it to the compiler

5. Compiler
   It modifies the code that needs optimization in one go into Optimized Code

6. Heap

   - It is simply a free store. A large memory space that javascript engine provides for us.
   - The V8 engine has a heap where it stores objects and data created during the execution of JavaScript code.
   - The garbage collector works in conjunction with the heap to manage memory efficiently.
   - `Garbage Collector`
     - arbage Collection primarily works for the heap memory and not directly for the stack memory.
     - It is responsible for managing memory allocation and deallocation
     - The garbage collector identifies and frees up memory that is no longer in use, which helps prevent memory leaks and ensures efficient memory usage.
     - Garbage Collection is designed to manage memory in the heap.
     - The stack memory is managed automatically by the JavaScript engine's execution context mechanism and doesn’t need garbage collection.

7. Call Stack

   - It is used keep track of where we are in the code during its execution.
   - The call stack is a data structure within the V8 engine that keeps track of the execution of functions and their respective contexts.
   - It manages the fl ow of control when functions are called and returns.
