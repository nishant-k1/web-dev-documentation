# Web APIs in JavaScript

1. In javascript runtime, the web browser is working in the background while the synchronous javascript code is running, and it's using something called Web API or the web browser API to communicate and let the JS engine know, hey, I'm back with some data, some work that you told me to do in the background.

2. The Web API comes with the browser. All the browsers have their javascript engine implementation and all of them have a javascript runtime that provides a web API.

3. Our applications use web API to do a variety of things like send HTTP requests, listen to DOM events, delay execution using something like setTimeout, setTimeinterval. WebAPIs can even be used for caching or database storage on the browser.

4. All the web APIs are provided by the browser, they are not native to the javascript.

5. The browsers are helping us to create rich web applications so that users aren't just sitting around for out javascript to execute anything that can be offloaded, they'll take care of that for us in the background becuase you can imagine if the browser had to use the same javascript thread for execution of these features, that is going to take a really, really long time.

6. Browsers actually underneath the hood use low level programming languages like C++ to perform these operations in the background. And these APIs are called Web APIs because they API is provided by the browser.

7. These web APIs are called asynchrounous, that means you can instruct these APIs to do something in the background and return data once it's done. Meanwhile, we can just continue working on our javascript call stack and execute functions.

## 1. Introduction to Web APIs

- What are Web APIs?
- Role of Web APIs in the browser.
- Differences between Web APIs and JavaScript.

## 2. Timing Functions

- `setTimeout`
- `setInterval`
- `clearTimeout` and `clearInterval`
- Use cases of timing functions.

## 3. Events

- Overview of browser events.
- Common events (`click`, `scroll`, `input`, etc.).
- Event propagation (capturing, bubbling, and delegation).

## 4. Event Listeners

- `addEventListener` and `removeEventListener`.
- One-time event listeners (`once` option).
- Event handling best practices.

## 5. Event Optimization

- High-frequency events (`scroll`, `resize`, etc.).
- **Debouncing**:
  - Definition and use cases.
  - Implementing debouncing.
- **Throttling**:
  - Definition and use cases.
  - Implementing throttling.
- Comparison of debouncing and throttling.

![alt text](image.png)
