# Interpreter

An interpreter directly executes the code line by line, translating it into machine code on the fly.

1. **Characteristics**:
   - `Execution`: Happens immediately (line-by-line or statement-by-statement).
   - `Speed`: Slower overall since it translates the code every time it's run.
   - `Output`: Doesn’t produce a separate output file; instead, it executes the code directly.
   - `Error Handling`: Stops at the first error it encounters, making it easy to debug but slower to run.
   - `Examples`:
     1. JavaScript (in browsers via engines like V8 or SpiderMonkey).
     2. Python.
     3. Ruby.
2. **Advantages**:
   - No need for a separate compilation step.
   - Easier debugging since it stops at the first error.
3. **Disadvantages**:
   - Slower than compiled code due to real-time translation.
   - Needs the interpreter installed to run the program.
