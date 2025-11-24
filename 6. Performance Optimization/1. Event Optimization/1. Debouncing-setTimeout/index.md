# **Debouncing (setTimeout)**

- Once event occurs, callback waits for a certain time duration and then executes after a certain time duration.
- After the event stops firing, the callback executes once after a delay
- Every time the event fires, the timer resets.

- `Behavior`: Waits for a pause in the event calls.
  `Callback` execution: Only after the event stops firing for a specified time.
  `Use case`: Ideal when you want to delay execution until a user finishes doing something (e.g., typing in a search box).
  `Summary`: Executes the last event after the delay.

- Debounce groups a burst of events and executes only once after inactivity.

- Debouncing is a technique used to delay the execution of a function until a certain period of inactivity has passed after the last event trigger.
- This is particularly useful for events that fire frequently, such as keystrokes or scroll events.
- By reducing the number of function calls, debouncing improves performance and prevents unnecessary computations.
- Debounce" का अर्थ हिंदी में है "डिबाउंसिंग" या "दबाव-विहीन"। यह एक तकनीक है जो किसी फंक्शन के निष्पादन को तब तक विलंबित करती है जब तक कि अंतिम घटना के घटित होने के बाद एक निश्चित समय बीत न जाए.
- डिबाउंसिंग का उपयोग अक्सर यूजर इनपुट को फ़िल्टर करने के लिए किया जाता है, जैसे कि बटन प्रेस या टाइपिंग, ताकि बार-बार इनपुट को एक बार में ही प्रोसेस किया जा सके.
- When the event occurs, the function which is supposed to be executed will only execute after a certain time duration with respect to only the last event trigger, all the previous events will get ignored, if the next event occurs before the time duration which was set for debouncing.
  Eg: User keeps entering letters in the search input box and at each input, keyboard key event is triggering. Noq if the time duration is set 1min for debouncing it means if the time duration after the last even trigger crosses the 1min time duration then the function tied to that event will get executed if even at 59 secs the user presses another key then the time duration will be reset to start from this last event trigger instead of executing the function tied to that event.

- Event triggers only for the last event occurred.

---

## **Use Cases**

1. **Search Input**

   - Prevents making API calls for every keystroke.
   - Reduces server load and enhances user experience.

2. **Form Validation**

   - Delays validation until the user pauses typing.
   - Improves responsiveness and avoids distraction.

3. **Button Click**

---

## **Implementing Debouncing**

### Search Input

```js
<input
  type="text"
  name="search"
  placeholder="Type Something..."
  class="search-input"
/>

<script>
  const inputHandler = (event) => {
    console.log(event.target.value);
  };

  // HOF
  const withDebounce = (eventHandler, delay) => {
    let timeOutId;
    return (event) => {
      clearTimeout(timeOutId);
      timeOutId = setTimeout(() => {
        eventHandler(event);
      }, delay);
    };
  };

  const element = document.querySelector(".search-input");
  element.addEventListener("input", withDebounce(inputHandler, 3000));
</script>

```

### Window Resize Input

```javascript
// HOF
function withDebounce(eventHandler, delay) {
  let timeoutId;
  return function (event) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      eventHandler(event);
    }, delay);
  };
}

const ResizeHandler = () => {
  console.log("Window resized!");
};

const debouncedResizeHandler = withDebounce(ResizeHandler, 500);

window.addEventListener("resize", debouncedResizeHandler);
```

![alt text](image.png)

| Concept  | Key Steps                    | Code Reminder (1 line)                        |
| -------- | ---------------------------- | --------------------------------------------- |
| Debounce | `clearTimeout`, `setTimeout` | `let t; clearTimeout(t); t = setTimeout(...)` |
| Throttle | `Date.now()`, check delay    | `if (now - last >= delay) { last = now }`     |
