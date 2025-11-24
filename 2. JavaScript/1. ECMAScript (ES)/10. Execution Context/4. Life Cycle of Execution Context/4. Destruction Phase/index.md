# Destruction Phase

Once the execution of the context is complete, it is destroyed.

Key Steps:

1. `Context Removal from Call Stack`:
   The execution context is popped off the call stack.

2. `Memory Cleanup`:
   The JavaScript engine cleans up memory for variables and functions declared in the execution context (unless they are referenced by closures).

Example During Destruction Phase:
After the function foo has executed completely, its execution context is removed from the call stack.
