# Web API Concepts

## 1. **Asynchronous JavaScript**

- **Callbacks**: Functions passed as arguments to other functions.
- **Promises**: `new Promise()`, `.then()`, `.catch()`, `.finally()`
- **Async/Await**: Syntactic sugar over promises for more readable async code.
- **Generators**: `function*`, `yield`, `next()`

## 2. **DOM and Event Handling**

- **Event Handling**: `addEventListener()`, `removeEventListener()`
- **Event Propagation**: Event capturing, bubbling, and delegation.
- **Custom Events**: `new Event()`, `CustomEvent`

## 3. **Timers and Asynchronous Behavior**

- **Timers**: `setTimeout()`, `setInterval()`, `requestAnimationFrame()`
- **Microtasks vs Macrotasks**: Promises vs `setTimeout()`

## 4. **Web Storage**

- **localStorage**: Storing data in the browser that persists across sessions.
- **sessionStorage**: Storing data that persists for the duration of the page session.
- **IndexedDB**: A low-level API for client-side storage of large amounts of structured data.

## 5. **Fetch API and HTTP Requests**

- **Fetch API**: `fetch()`, `Response`, `Request`, and `Headers`
- **AJAX**: `XMLHttpRequest()`

## 6. **Web Workers and Service Workers**

- **Web Workers**: Multi-threading for JavaScript using background workers.
- **Service Workers**: Background scripts for offline capabilities and caching.

## 7. **WebSockets**

- **WebSocket API**: Real-time communication between client and server via `WebSocket` objects.

## 8. **Geolocation API**

- **Geolocation**: `navigator.geolocation` for retrieving the user's geographic location.

## 9. **Browser-Specific APIs**

- **Clipboard API**: Interacting with the clipboard.
- **Notification API**: Displaying browser notifications.
- **Fullscreen API**: Requesting fullscreen display for certain elements.

## 10. **Shadow DOM**

- **Shadow DOM**: Encapsulation of DOM and styles in Web Components.

## 11. **Audio and Video APIs**

- **Web Audio API**: Creating and processing sounds in web applications.
- **Media Devices API**: Accessing and manipulating media devices like cameras and microphones.

## 12. **Polyfills and Transpilers**

- **Polyfills**: JavaScript code that implements modern features for older environments.
- **Transpilers**: Tools like Babel that allow you to write modern JavaScript that works in older browsers.
