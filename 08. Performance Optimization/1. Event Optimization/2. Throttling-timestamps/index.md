# **Throttling**

- Once event occurs, callback executes immediately and then waits for a certain time duration.
- The callback executes immediately, then suppresses further calls until a fixed delay has passed.
- Ignores extra calls during the cooldown.

## **Definition**

`Behavior`: Limits the execution of the callback to once per certain time duration, no matter how many times the event fires.
`Callback execution`: Executes immediately (or based on config) and then ignores the rest until that certain time duration ends.
`Use case`: Ideal for limiting event handler calls like scrolling, resizing, or mouse movement.
`Summary`: Executes the first event, then blocks further calls for the duration.

Throttle allows a burst of events to be sampled, executing at most once per certain time duration.

Throttling is a technique that limits the rate at which a function can be called. It ensures that the function is executed at most once within a specified time duration, regardless of how frequently the event is triggered. Throttling is useful for performance optimization in scenarios where events are fired at high frequency.

- Event triggers only for the first event occurred.

---

## **Use Cases**

1. **Scroll**

   - Prevents excessive processing of scroll events, especially on long pages.
   - Enhances performance and smooth scrolling experiences.
   - Update a sticky header or parallax effect at a controlled rate.

2. **Window Resize**

   - Update layout calculations only every 200ms instead of on every pixel change.

3. **Mouse movement**

   - Limits the number of `mousemove` events that are processed.
   - Improves performance by reducing the frequency of event handling.

4. **Real-Time Updates**

   - Controls the frequency of updates, preventing system overload.
   - Ideal for real-time data visualizations and API calls.

---

## **Implementing Throttling Using `timestamps`**

```javascript
function withThrottle(eventHandler, delay) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      eventHandler.apply(this, args);
    }
  };
}

const scrollEventHandler = () => {
  console.log("Scrolled!");
};

window.addEventListener("scroll", withThrottle(scrollEventHandler, 3000));
```

## **Implementing Throttling Using `setTimeout()`**

```javascript
function withThrottle(eventHandler, delay) {
  let throttled = false;
  return function (...args) {
    if (!throttled) {
      eventHandler.apply(this, args);
      throttled = true;
      setTimeout(() => {
        throttled = false;
      }, delay);
    }
  };
}

const scrollEventHandler = () => {
  console.log("Scrolled!");
};

window.addEventListener("scroll", withThrottle(scrollEventHandler, 3000));
```
