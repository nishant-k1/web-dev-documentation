# Errors in javascript

- Error and exception is same.
- Error handling means catcing the error
- In javascript we have a native "Error" constructor function.
- We can careate new instances of these errors by doing `new Erorr('some_message')`
- in javascript we have `throw` keyword and when we throw something then script which is currently running stops executing unless we hanble that error.
- When we use throw keyword, the execution of the current function will stop and control will be passed to next part of the callstack.
- throw statement is used to define our errors.
- we can throw anything in javascript

```javascript
new Error("oopsie");
```

```javascript
throw "string";
return 4 + 3; //  it won't get executed because previous line is throwing error which stops the execution of the program.
```

- error has two properties
  1. message
  2. stack

```javascript
const myError = newError("oopsie");
// error message
myError.message; // returns oopsie

// where the error happend
myError.stack; // returns 'Error: oopsie\n    at snippet:///Script%20snippet%20%231:1:18'
```

- When error is thrown then the current execution stops. Sometimes we need to catch the error in order to not to stop the current exection.
- As soon as an error happens in the callstack we go to the execution context underneath us and keep looking for a catch. It keeps asking if there is something hangling the error.
- runtime handles the error if all the way through callstack nothing in program catches the error/ handles the error.
- runtime catch calls `onerror()` function that runs inside of the browser, that gives us that red text that we see.
- in node.js instead of the onerror() we have `process.on('uncaughtException')`
