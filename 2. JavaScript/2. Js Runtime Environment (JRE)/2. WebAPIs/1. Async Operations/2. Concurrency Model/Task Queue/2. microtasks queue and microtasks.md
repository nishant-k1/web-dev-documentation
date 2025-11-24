# Microtasks Queue and Microtasks

## Microtask Queue

- It is part of the Javascript Runtime Environment (both browser and nodejs)
- The Microtask Queue contains microtasks like promises
- It works on FIFO basis
- Callback returned by the webAPIs that returns promises gets pushed to the Microtask Queue and passed to the callstack by the event loop.
- Microtaks have higher priority than macrotask, so all the tasks inside microtask are pushed to call stack, one by one on FIFO basis untill the Microtask Queue gets empty. Once The queue is emptied then tasks from Macrotask Queue starts getting pushed to the call Stack.

---

- Microtasks are tasks that are usually related to JavaScript execution, and they have higher priority than tasks in the regular callback/event queue, also known as the macrotask queue.

- When the call stack is empty, the JavaScript runtime first checks the microtask queue. If there are any tasks in the microtask queue, they are executed one by one until the microtask queue is empty.

- Only after the microtask queue is empty, the event loop move to the macrotask queue .

- This behavior is important because it ensures that microtasks are processed before any rendering or painting occurs.

- Macrotask Queue & Microtask Queue both are similar except for the fact the Microtask Queue has higher priority.

- Functions inside the Microtask Queue gets executed first and inside the Macrotask Queue gets executed later.

## List of all microtasks in the Browser Environment

- Promise callbacks (`.then()`, `.catch()`, `.finally()`)
- MutationObserver callbacks
- IntersectionObserver callbacks
- ResizeObserver callbacks
- `queueMicrotask()` function callbacks
- Async/Await (executed upon resolving an awaited promise)

## List of all microtasks in the Node.js Environment

- Process.nextTick callbacks
- Promise callbacks (`.then()`, `.catch()`, `.finally()`)
- Async/Await (executed upon resolving an awaited promise)
- `queueMicrotask()` function callbacks (available in newer versions of Node.js)

## List of all microtasks common between browser and nodejs

- Promise callbacks (`.then()`, `.catch()`, `.finally()`)
- Async/Await (executed upon resolving an awaited promise)
- `queueMicrotask()` function callbacks
