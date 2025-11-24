# Macrotasks Queue (Low Priority)

- They are sometimes referred to as "low-priority" tasks.
- Contains asynchronous operations, such as setTimeout or network requests, which are handled after the current execution context has finished.
- The callback/event queue is a data structure in the JavaScript runtime that stores a list of callback functions or events that are waiting to be executed.
- These callbacks/events are typically associated with asynchronous operations.
- When an asynchronous operation is completed, its corresponding callback function is placed in the callback/event queue.
- The event loop continuously checks if the call stack is empty.
- If it is, the event loop takes the first callback/event from the queue and pushes it onto the call stack for execution.
- This is what allows JavaScript to handle asynchronous operations in a non-blocking way.
- This is a data structure in the JavaScript runtime that holds callback functions or events associated with completed asynchronous operations.
- These are higher-level tasks that are placed in the callback queue and are processed by the event loop.
- Examples of macrotasks include setTimeout, setInterval, I/O operations (like reading a file), rendering (painting the DOM), and user-initiated events (like click events).
- Macrotasks are typically executed one at a time, and the event loop checks the callback queue after each task.
- Here's a simplified sequence of how they are processed:

  - A script is executed, which creates the initial macrotask.
  - The event loop checks if there are any macrotasks in the callback queue. If yes, it processes one.
  - If the macrotask creates microtasks, those microtasks are executed before moving on to the next macrotask.
  - The event loop continues this process until there are no more macrotasks in the callback queue.

- Examples:
  setTimeout, setInterval, setImmediate, requestAnimationFrame, I/O, UI Rendering

## List of all macrotasks in the browser environment

- setTimeout callbacks
- setInterval callbacks
- UI rendering tasks
- User interaction events (e.g., clicks, keypresses)
- MessageChannel API messages
- Web Workers messages
- Network events (e.g., fetch API, XMLHttpRequest completion)
- postMessage API messages
- Image load events
- Script loading (<script async> completion)
- IndexedDB transactions
- File API read operations
- Blob processing
- WebSocket messages
- Video playback events
- Audio processing events
- requestAnimationFrame callbacks (for visual updates)
- requestIdleCallback callbacks (for scheduling tasks during idle periods)
- Service Worker events

## List of all macrotasks in the nodejs environment

- setTimeout
- setInterval
- I/O callbacks
- setImmediate
- Close events
- TCP/UDP socket operations
- TTY operations
- Crypto operations
- Zlib operations
- DNS operations
- Child process events
- HTTP/HTTPS operations
- Stream events
- Worker Threads operations
- Dynamic module imports
- EventEmitter events
- Promise-based I/O operations
- File watching operations
- Network events
- Process events

## List of all macrotasks common between browser and nodejs

- setTimeout
- setInterval
- HTTP/HTTPS operations
- WebSocket messages
