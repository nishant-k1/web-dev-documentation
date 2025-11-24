# Asynchronous Javascript

- JavaScript is primarily single-threaded, meaning it can only execute one operation at a time. However, JavaScript often needs to perform tasks that take time, such as fetching data from a server, reading a file, or waiting for a user interaction.

- Asynchronous programming allows JavaScript to execute multiple operations concurrently without blocking the main thread, thus keeping the application responsive.

- Asynchronous, in the context of programming, refers to operations that can be initiated, executed, and completed independently of the main program flow.

- In simpler terms, asynchronous operations allow a program to continue running while waiting for some task to finish, rather than blocking execution until the task is complete.

- Here are a few key points to understand about asynchronous operations:

  - Non-blocking: Asynchronous operations do not block the execution of other code. Instead of waiting for a task to complete before moving on to the next line of code, the program can continue running while the asynchronous task is being processed.

- - Concurrency: Asynchronous programming enables concurrency, meaning multiple tasks can be performed simultaneously or interleaved. This can improve the efficiency and responsiveness of programs, especially in applications that involve I/O operations (e.g., fetching data from a server, reading from a file).

  - Callbacks or Promises: Asynchronous operations are typically managed using callbacks or promises. Callbacks are functions passed as arguments to other functions and executed later when the asynchronous operation completes. Promises provide a more structured and readable way to handle asynchronous code, allowing better error handling and chaining of multiple asynchronous operations.

  - Event-driven: Asynchronous programming often relies on event-driven architecture, where actions or events trigger the execution of certain code. Event handlers are registered to respond to these events, allowing the program to react dynamically to user input, network events, or other asynchronous actions.

  - Examples: Common examples of asynchronous operations include fetching data from a web server, reading from or writing to a file, making database queries, or waiting for user input in graphical user interfaces.

- Asynchronous means we don't have it right now.
- Asynchronous functions are functions that we can execute later.
- Asynchronous, in the context of programming, refers to operations that can be initiated, executed, and completed independently of the main program flow.
- In simpler terms, asynchronous operations allow a program to continue running while waiting for some task to finish, rather than blocking execution until the task is complete.

- Ways to manage Asynchronous Operations:
  1. Callbacks
  2. Promises

## How any programming language works

- What is a program:
  - A program allocates memory
  - parse and execute scripts (reads and write commands).
