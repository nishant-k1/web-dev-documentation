# Avoiding Memory Leaks

Always remove event listeners when they are no longer needed (e.g., `component unmount`, `DOM removal`).

```js
function setup() {
  function onResize() {
    console.log("resized");
  }
  window.addEventListener("resize", onResize);

  return () => window.removeEventListener("resize", onResize);
}
```
