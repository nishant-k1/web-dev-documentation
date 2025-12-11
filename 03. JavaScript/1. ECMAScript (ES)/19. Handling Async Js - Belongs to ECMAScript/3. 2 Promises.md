# promise

- Promises in JavaScript are used to handle asynchronous operations.
- Asynchronous operations are tasks that don't necessarily execute immediately or in a predictable order, like fetching data from a server or reading a file.
- Promises provide a cleaner and more manageable way to work with asynchronous code compared to traditional callback functions.

## What is a Promise?

A Promise is an object that represents the eventual completion or failure of an asynchronous operation and its resulting value. It has three states:

Pending: Initial state, neither fulfilled nor rejected.
Fulfilled: The operation completed successfully.
Rejected: The operation failed.

## How to Use a Promise

1. **Creating a Promise**
   You create a new Promise using the `new Promise()` constructor. It takes a function as an argument with two parameters: `resolve` and `reject`.

   ```Javascript
      const myPromise = new Promise((resolve, reject) => {
        // Perform an asynchronous operation
        // If successful, call resolve(value)
        // If an error occurs, call reject(error)
      });
   ```

   Eg:

   ```Javascript
    function fetchData() {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve("Data received");
          }, 1000);
      });
    }
   ```

   <!-- now fetchData function when called will return a promise -->

2. **Handling a Promise**

   1. Using .then and .catch

      - Once a Promise is created, you can handle its result using .then() and .catch() methods
      - .then() takes a function as an argument with one parameter: result
      - .catch() takes a function as an argument with one parameter: error

      ```Javascript
          <!-- Creating fetchData promise -->

          function fetchData() {
              return new Promise((resolve, reject) => {
                  setTimeout(() => {
                      resolve("Data received");
                  }, 1000);
              });
          }

        <!-- Handling fetchData promise -->
          fetchData()
              .then(result => {
                  console.log(result); // Output: Data received
              })
              .catch(error => {
                  console.error(error);
              });
      ```

   2. Using async and await
      In the below code the function getData will remain blocked until await fetchData resoves and gives some value. i.e. await keyword pauses the execution of getData function until the fetchData promise gets resolved.

      Once fetchData promise gets resolved and returns a value only then the next line of code which is `console.log(result);` will get executed until then execution of getData function remains blocked but any function our tasks outside this getData function will continue executing.

      ```Javascript
          <!-- Creating fetchData promise -->
            function fetchData() {
              return new Promise((resolve, reject) => {
                  setTimeout(() => {
                        resolve("Data received");
                    }, 1000);
                });
              }

          <!-- Handling fetchData promise -->
            async function getData() {
              try {
                  const result = await fetchData();
                  console.log(result); // Output: Data received
              } catch (error) {
                  console.error(error);
              }
            }
      ```

   Differences and Best Practices:

   - Callbacks are prone to callback hell (nested callbacks), making code harder to read and maintain.
   - Promises alleviate callback hell and provide better error handling with .catch().
   - Async/await further improves code readability and maintainability, especially for complex asynchronous flows.
   - Prefer async/await over callbacks and promises when possible for cleaner asynchronous code.
