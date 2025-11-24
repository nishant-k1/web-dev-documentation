# Async Error handling

## Async Error handling (.then syntax)

- try catch cannot be used to handle the asynchronous code.
- When we have an asynchronous function and an error occurs inside it, our script would have continued with execution so that by the time this returns with an an error, our entire script including try catch block would have been done.
- To handle async errors we use javascript catch method.
- differnet runtimes (browser and nodejs) handles error differently
- in nested promises we shuld handle error at each level

```javascript
Promise.resolve("async fail")
  .then((response) => {
    throw new Error("#1 fail");
    return response;
  })
  .then((response) => {
    console.log(response);
  })
  .catch((err) => {
    console.log(err);
  });
```

## Async Error handling (async await syntax)

- Because async await, although asyncronous makes our code look synchronous, we can acutally use try catch blocks with them

```javascript
(async function () {
  try {
    await Promise.resolve("oopsie #1");
    await Promise.reject("oopsie #2");
  } catch (e) {
    console.log(e); // error gets caught
  }
  // gets run after the try catch block
  console.log("is this still good");
})();
```
