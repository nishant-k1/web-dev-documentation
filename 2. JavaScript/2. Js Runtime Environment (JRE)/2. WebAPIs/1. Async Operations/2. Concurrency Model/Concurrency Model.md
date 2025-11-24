# Concurrency Model in JavaScript

The **Concurrency Model** in JavaScript refers to how the JavaScript engine manages multiple tasks or operations that seem to run simultaneously, even though JavaScript is single-threaded. This model is crucial to understanding how JavaScript handles asynchronous operations like **callbacks**, **promises**, and **async/await**.

JavaScript's concurrency model is based on the **event loop**, which controls the order in which operations are executed, and uses concepts like **macrotasks**, **microtasks**, and **the call stack** to manage multiple operations efficiently.

## Key Concepts in JavaScript Concurrency Model

### 1. Single-threaded Nature

- JavaScript runs on a single thread, meaning it can only execute one operation at a time.
- Despite being single-threaded, JavaScript is capable of performing multiple tasks "simultaneously" (asynchronously), thanks to its **event-driven** nature and the **event loop**.

### 2. Call Stack

- The **call stack** is where function calls are placed during execution. When a function is called, it is pushed onto the stack, and when it completes, it is popped off the stack.
- If the call stack is busy (i.e., there is already a function running), JavaScript uses other mechanisms (like the event loop) to manage other tasks without blocking the thread.

### 3. Event Loop

- The **event loop** is the mechanism that allows JavaScript to execute asynchronous operations by handling tasks in a non-blocking way.
- It constantly checks the call stack and, when the stack is empty, it takes tasks from the **task queue** (also called the **callback queue**) and adds them to the stack for execution.

### 4. Task Queues (Macrotasks and Microtasks)

- The **task queue** is where JavaScript places tasks that are ready to be executed. The event loop moves tasks from the queue to the call stack.

#### Macrotasks:

- **Macrotasks** are the larger, slower tasks that are added to the queue. Examples include:
  - **setTimeout()**
  - **setInterval()**
  - **I/O operations** (in Node.js)
  - **Events**

#### Microtasks:

- **Microtasks** are smaller tasks that are executed after the current running script completes but before the event loop picks up the next macrotask. They are handled with higher priority. Examples include:
  - **Promises** (with `.then()` and `.catch()`)
  - **`MutationObserver`**

### 5. Microtask Queue vs Macrotask Queue

- **Microtasks** are always processed before **macrotasks**, even if a macrotask is already in the queue.
- This means that when a microtask is added (like a resolved promise), it is executed before any other macrotask, ensuring quick handling of tasks that are time-sensitive, like promise resolutions.

### 6. Web APIs (for browser environments)

- **Web APIs** allow JavaScript to interact with the browser environment. They provide asynchronous APIs for handling tasks such as:
  - **DOM manipulation**
  - **Fetching data from servers** (via the **Fetch API**)
  - **Handling user input events**
- These operations don't block the call stack and, instead, work in the background, notifying JavaScript via the event loop when they are completed.

### 7. Concurrency vs Parallelism

- **Concurrency** in JavaScript means that multiple tasks are handled in an interleaved manner. Tasks do not necessarily run at the same time but are managed in a way that gives the illusion of simultaneous execution.
- **Parallelism** involves truly running tasks simultaneously, often across multiple cores or threads (which JavaScript does not handle natively). However, some JavaScript environments (like Node.js) can use worker threads for parallelism.

## How It Works in Practice

Here’s a basic example of how the event loop and concurrency model work together:

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 1");
});

console.log("End");
```
