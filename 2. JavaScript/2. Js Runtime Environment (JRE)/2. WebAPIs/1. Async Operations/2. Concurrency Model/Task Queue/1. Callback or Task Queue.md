# Task Queue (Callback Queue)

- The task queue is where asynchronous callbacks (such as event handlers, setTimeout(), fetch() responses) are placed when they are ready to be executed.

- Tasks are pushed to the task queue after their associated asynchronous operation is complete.

- The event loop picks tasks from the task queue and pushes them onto the call stack for execution, but only when the stack is empty (i.e., all synchronous code has been executed).
