# Event Loop

- The event loop is the mechanism that constantly checks the call stack and the task queue. It ensures that JavaScript executes tasks in the correct order without blocking the main thread.

- The event loop works by checking if the call stack is empty. If it is, it takes the first task from the task queue and pushes it onto the call stack for execution.
