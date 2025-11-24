# Compiler (JIT - Just-In-Time Compiler) and Transpiler

## Compiler

- `Compilation Process`: A compiler translates the entire source code into machine code or an intermediate representation (such as bytecode) in one go, without executing it. The resulting executable file can be run directly by the computer's hardware.

- `Pre-Optimization`: Compilers have more time for optimization since they analyze the entire code before generating the executable. This can lead to faster and more efficient code execution compared to interpreted code.

- `Delayed Error Feedback`: Compilers analyze the entire code before reporting errors. So, if there are errors in the code, the programmer might not get feedback until after the compilation process is complete.

- `Platform-Dependent`: Compiled code is often platform-dependent, meaning it needs to be compiled separately for different operating systems or hardware architectures.

- `Examples`:

  1. C, C++.
  2. Java (compiles to bytecode, then executed by the JVM).
  3. Rust, Go.

- Initially it is slower but when running a same type of code like a loop it gets faster.

Eg: while running a loop like below compiler is smart enough to instead of calling add function everytime inside the loop, it replaces the function call with its result (which is 9 ) and performs the loop over it. This results into higher performance.
This edit by compiler is also called code optimization.

    ```Javascript
    const add = (a, b) => a + b;

    for (var i = 0; i < 1000; i++ ){
        add(4, 5); // compiler uses 9 directly instead of calling add everytime
    }

    ```

## Transpiler

A transpiler is a specific kind of compiler that translates source code from one language (or version) to another.

1. **Characteristics**

   1. Execution: Converts code from a high-level language to another high-level language or a different version of the same language.
   2. Speed: Depends on the languages being transpiled.
   3. Output: Produces new source code that needs further execution or compilation.
   4. Error Handling: Errors in transpilation are shown, but runtime errors depend on the target language.
   5. Examples:
      1.TypeScript to JavaScript. 2. Babel (ES6+ to ES5 for older browsers). 3. SASS/LESS to CSS.

2. **Advantages**:

   1. Enables the use of newer or more expressive language features (e.g., ES6+ in browsers that support only ES5).
   2. Allows cross-platform compatibility or target-specific optimizations.
   3. Often integrates with modern development workflows (e.g., `Webpack` or `Rollup`).

3. **Disadvantages**:
   1. Can introduce complexity in the build process.
   2. Debugging may be harder if the transpiled code is significantly different 3. from the source code.

## JIT: Just in Time Compiler

- Just In Time Compilation: It gives the best of the both worlds, Interpreter and the Compiler.

- The AST code is fed to the Interpreter which keeps executing and produces machine code that could be read by the computer while Profiler in the js egnine keeps monitoring the interpreter to check for the code that would need optimization. Once found profiler sends that code to the compiler and the compiler then compiles and produces optimized code which is then read by the computer

## Real-World Examples

1. **Interpreter**:

   - Running JavaScript code in the browser.
   - Debugging Python scripts interactively.

2. **Compiler**:

   - Compiling a C++ program to a .exe file.
   - Java code being compiled into bytecode (.class files) for the JVM.

3. **Transpiler**:

   - Transpiling TypeScript to JavaScript for browser compatibility.
   - Using Babel to convert ES6+ JavaScript into ES5 for older environments.

## Key Points to Remember

1. Interpreter is about real-time execution.
2. Compiler is about pre-translating code for faster execution.
3. Transpiler is about converting code between high-level formats.
