# How JavaScript works in the browser

![ref:js-event-loop-explained.png](images/js-event-loop-explained.png)

- javascript engine (call stack, heap, Garbage collector, jit (Profiler, Interpreter, compiler), AST, parser) Web APIs, the microstack queue, macrostack queue, and the event loop are all features that the browser provides. These aren't part of the JavaScript language itself.

- A representation of NodeJS would look similar ![ref:js-event-loop-explained.png](images/js-event-loop-explained.png)

## Browser Runtime Environment: BRE

- **JavaScript Engine**: This consists of the Call Stack, Heap, Garbage Collector, and Just-In-Time (JIT) Compiler. These components handle the execution of JavaScript code and memory management within the browser environment. It can execute only synchronous tasks as it has only 1 stack.

- **Web APIs**: These are interfaces provided by the browser to interact with web functionalities, such as DOM manipulation, AJAX requests, and timers (e.g., setTimeout, setInterval).

- **Microtask Queue and Macrotask Queue**: These are queues for managing asynchronous tasks. Microtasks have higher priority and are executed before macrotasks. Examples of microtasks include Promise callbacks, while macrotasks include setTimeout and XMLHttpRequest.

- **Event Loop**: The event loop is responsible for managing the execution of tasks in the browser environment. It continuously checks the call stack and task queues, ensuring tasks are executed in the correct order and without blocking the main thread.

---

Javascript is a single threaded programming language, it has only one stack and one heap. Hence, if any other program wants to execute something, it has to wait until the previous program is completely executed. If we do something that takes a really, really long time then it will make javascript very slow. This problem is solved by javascript runtime.

Javascript Browser runtime has the following components:

1. Javascript Engine
   a. Call Stack (Which holds Execution Contexts)
   b. Memory Heap
   c. Parser
   d. Interpreter
   e. Just-In-Time Compiler (JIT)
   f. Garbage Collector
2. Rendering Engine
3. Web APIs / Web browser APIs
4. Event Loop
5. Microtask Queue
6. Callback Queue/Task Queue/Macrotask Queue
7. User Interface (UI) Thread
8. Networking Layer
9. Storage Layer
10. Browser Plugins and Extensions (additional features provided by the browser, not core runtime components.)

## NodeJs: NRE

- It's a javascript runtime built on V8 engine. It has been build using C++.
- Nodejs runtime is quite similar to browser based runtime.
- It is actually a c++ program. We can think of it as node.exe. It's executable program built using C++.
- It has libuv (a library) to do asynchronous operations with V8 engine.
- It can do little bit more than the browser runtime environment like accessing file system on the computer.
- Like browser Nodejs doesn't have "window" object to access the web APIs, it has "global" object instead to access the nodejs APIs.
- Node is said to be server side platform based on asynchronous I/O that is non blocking. It means that it uses javascript but outside of the browser but it creates the entire environment, this runtime that runs outside of the browser and it allows us to have the same model of Single Threaded Model but any Asynchronous tasks can be non-blocking i.e they can be passed on to what we call worker threads in the background to do the work for us and get sent back to callback queue, event loop on to the stack.

## **js Engine**

## Heap

- The memory heap is a region of memory where the runtime environment (like a browser or Node.js) allocates memory for objects, arrays, and other data structures created during the execution of a program.
- It's a dynamic storage area used for managing memory. The memory heap is where data is stored, and it's separate from the call stack.

## Call Stack / Execution Stack

- The Call Stack is a data structure used by the JavaScript engine to keep track of function calls and their execution order.

- It works on the principle of Last In, First Out (LIFO).

- When a function is called, it is added (pushed) to the stack. When the function execution is complete, it is removed (popped) from the stack.

- The Call Stack, also known as the Execution Stack, is the structure that JavaScript uses to keep track of function calls. It is central to the JavaScript engine's execution model.

- It operates on a Last In, First Out (LIFO) principle. When a function is called, it is placed (pushed) onto the stack, and when the function execution is completed, it is removed (popped) from the stack.

- The Call Stack is the place where the JavaScript engine tracks the execution order of synchronous code. It ensures that the current function is executed to completion before the next function is initiated.

- Only synchronous operations are performed in the Call Stack, providing a straightforward flow of execution.

- Asynchronous tasks, on the other hand, are not executed on the Call Stack immediately. They are placed in task queues (either a macrotask queue or a microtask queue) and are only moved to the Call Stack by the event loop when the Call Stack is empty and the JavaScript runtime is ready to process them.

- This mechanism allows JavaScript to handle asynchronous code without blocking the main thread, enabling a non-blocking behavior which is essential for tasks like I/O operations, timers, or fetching resources over the network.

## **JRE**

## Web API

## Microtasks (High Priority) and Microtasks Queue

- Microtasks are asynchronous operation tasks that are usually related to JavaScript execution, and they have higher priority than tasks in the regular callback/event queue, also known as the macrotask queue.

- Microtasks, while also resulting from asynchronous operations, are processed immediately after the current script has finished and before the next macrotask. They include promise resolutions and DOM mutation observations, and are designed to handle tasks that should occur without yielding control back to the event loop, thus appearing to be processed synchronously.

- It's crucial to distinguish between macrotasks and microtasks because they have different priorities and impacts on the performance of an application. The event loop handles these two queues differently, ensuring that microtasks are processed before the next macrotask.

## Macrotasks and Macrotask Queue (Low Priority)/ Callback Queue / Event Queue / Task Queue / Message Queue / Job Queue

- Contains asynchronous operations, such as setTimeout or network requests, which are handled after the current execution context has finished.

- The term "task queue" is commonly used to refer collectively to both the macrotask queue and the microtask queue.
- Macrotasks involve asynchronous operations such as events, `setTimeout`, `setInterval`, and I/O operations, `onClick` event listeners which are queued for execution after the currently executing script and any pending microtasks.

## Event Loop

- The event loop is a mechanism that continuously checks the call stack and the message queue (which includes both the macro-task queue and micro-task queue). Its job is to ensure that tasks are executed in the correct order.

- The event loop is a mechanism that allows JavaScript to perform non-blocking I/O operations. It continuously checks the call stack and the message queue, ensuring that tasks are executed in the correct order.

- An Event Loop in JavaScript is said to be a constantly running process that keeps an eye on the call stack.

- Its main function is to check whether the call stack is empty or not.

- If the call stack turns out to be empty, the event loop proceeds to execute all the callbacks waiting in the task queue.

- Inside the task queue, the tasks are broadly classified into two categories, namely micro-tasks and macro-tasks.

- Event loops are a central part of many asynchronous programming models. They allow programs to respond to events in a timely manner, even when the events occur at unexpected times.

- The event loop is a mechanism that allows JavaScript to perform non-blocking I/O operations, such as making network requests or reading files, by offloading operations to the browser or underlying environment.

- In a web browser, the event loop is part of the browser's JavaScript runtime. It works in conjunction with the call stack, heap, and other components of the JavaScript engine to handle asynchronous operations and ensure the responsiveness of the main thread.

- The event loop is responsible for continuously monitoring the call stack and the callback/event queue. When the call stack is empty, it takes callbacks/events from the queue and adds them to the call stack for execution.

- Event loop has only one job to continuously monitor both call stack, event/callback queue & Microtask Queue.

- Event loop looks for if the call stack is empty and also looks for if there is a callback function waiting inside event/callback queue & Microtask Queue to be executed.

- Once it finds event/callback queue / Microtask Queue with a function and call stack empty it pushes that callback function to the call stack to get that executed.

## JRE Process explained

- The event loop continuously checks if the call stack is empty.

- If the call stack is empty, it first checks the microtask queue.

- If there are tasks in the microtask queue, it takes the first task and pushes it onto the call stack for execution.

- After executing a microtask, it checks the microtask queue again. If there are more tasks, it continues this process until the microtask queue is empty.

- If the microtask queue is empty, it then checks the macrotask queue.

- If there are tasks in the macrotask queue, it takes the first task and pushes it onto the call stack for execution.

- This process continues, alternating between microtasks and tasks in the macrotask queue, as long as there are tasks to be processed.

---

- We have items on the call stack and as soon as something comes up, like console or setTimeout, that's not part of javascript, it's part of the web API, the call stack is going to say, oh, I have something that's not for me here. It's for the web browser, for the web API. So it's going to say, hey, web API, here it is. I don't know what to do with this. You take care of it.

- The web API is going to say, I know what console and setTimeout is. Let me take care of that and do that in the background. Once the web API is done working on it, maybe it's fetching some data from a server. It's going to say, all right, I'm done with this work. Here's the data and here's perhaps a callback of what I want you to do with that data.

- That callback waits in Callback Queue /Event Queue/ Macrotask Queue.

- And then then the event loop is going to say as soon as the call stack is free, hey, I have something for you here. Would you like to add it onto the stack. And if the stack is empty, it's going to push this callback onto the stack.

- using this method, we're able to have this power of asynchronous code i.e. instead of being limited to one call stack and one memory heap, whenever we get tasks that can be asynchronous that takes a long time, possibly like modifying DOM or making HTTP requests, in that case we can just send that off to the browser. The browser can just run that in the background, and whenever we're ready, it can just use its callback queue and event loop to notify us.

  ```Javascript
     // Eg: 1

     console.log('1');
     setTimeout(() => {console.log('2')}, 1000); // this gets moved away from the call stack and is sent to the web api. Inside the setTimeout web api timer runs and after 1 sec is over callback function runs to console log '2'. This console log goes to the Callback Queue and says I'm the first person done, can you console log '2'. Event loop is a loop i.e. constantly running monitoring if the call stack is empty. And the event loop runs once the call stack is empty and the entire javaascript file has been read. The call stack won't start putting anything back into the call stack untill the call stack is empty and we've run through the entire file at least once. So, in our case console log three gets printed and popped off the call stack. The event loop is going to tick and say, all right can you console log 2.
     console.log('3');

     //<!-- Eg: 2 -->
     console.log('1');
     setTimeout(() => {console.log('2')}, 0); // result will be same as in the previous case
     console.log('3');

   // <!-- Eg: 3 -->
     setTimeout(() => {console.log('1')}, 0);
     setTimeout(() => {console.log('2')}, 10);
     console.log('3'); // 3, 1, 2 is answer

   // <!-- Eg: 4 -->
     setTimeout(() => {console.log('1')}, 1000);
     setTimeout(() => {console.log('2')}, 10);
     console.log('3'); // 3, 2, 1 is answer


   // <!-- Eg: 5 -->
     setTimeout(() => {console.log('1')}, 0); // Macrotask Queue
     Promise.resolve('hi').then(() => {console.log('2')}); // Microtask Queue
     console.log('3'); // 3, 2, 1 is answer
  ```

```Javascript
setTimeout(() => {
  console.log('This is a macrotask');
}, 0);

Promise.resolve().then(() => {
  console.log('This is a microtask');
});

```

```Javascript
console.log('Start');

setTimeout(() => {
    console.log('Inside setTimeout 1');
}, 0);

Promise.resolve().then(() => {
    console.log('Inside Promise 1');
}).then(() => {
    console.log('Inside Promise 2');
});

setTimeout(() => {
    console.log('Inside setTimeout 2');
}, 0);

console.log('End');

```

The log will be in the follow order: `Start, End, Inside Promise 1, Inside Promise 2, Inside setTimeout 1, Inside setTimeout 2`, the normal console logs are in call stack so they get executed on the basis of LIFO basis, then promise belongs to the microtask queue which has higher priority than macrotask that's it gets pushed to the call stack for execution once the call stack gets empty. Inside promise until the first .then gets resolved then code remains blocked inside the promise so when the firs promise gets resolved then the then 2nd promise execution takes place. Once all the promise which are inside the microtask queue gets executed then comes the macrotask queue, here setTimeout task are inside macrotask queue, since both the setTimeout has same setTimeout 0 so the code executes in the LIFO manner and Inside setTimeout 1' gets logged before Inside setTimeout 2. In call stack code gets executed in LIFO manner. But inside a execution context it doesn't follow any LIFO or FIFO rule and since we have a single execution context here which is the global execution context so, tasks inside the call stack gets executed in the order that they appear except for the macro and microtasks.
