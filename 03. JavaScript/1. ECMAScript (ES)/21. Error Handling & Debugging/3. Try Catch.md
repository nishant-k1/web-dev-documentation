# Try and Catch

- there are two ways to handle errors/execptions in the javascript
  1. Try{} and catch(){} blocks
  2. catch() methods

```javascript
function fail() {
  try {
    console.log("this works");
    throw new Error("oopsie!!");
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
  }
}
fail();
```

- we can also have a finally block after a try catch block
- no matter what happesn in a try catch block, the code insde the finally block will definitely execute.

```javascript
function fail() {
  try {
    console.log("this works");
    throw new Error("oopsie!!");
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
  } finally {
    console.log("will run definitely");
    return "returning fail";
  }
  console.log("!!!!!!!!!!!!!");
}
fail();
```

- any statement outside the try catch block won't get executed because we're running the try block which throws and then goes to the catch block and then finally gets run which reutrns our function

```javascript
function fail() {
  try {
    console.log("this works");
    throw new Error("oopsie!!");
  } catch (error) {
    console.log(error);
    console.log(error.message);
    console.log(error.stack);
  } finally {
    console.log("will run definitely");
    return "returning fail";
  }
  console.log("won't get executed");
}
fail();
```

- We don't usually see try catch block often in real code.
- Try catch block is the simplest way to handle errors.
- This type of try catch block can be used to catch any type of synchronous code/errors.
- try catch won't work for asynchronous code or promises

  ```javascript
  try {
    setTimeout(function () {
      fakevariable;
    }, 1000);
  } catch (e) {
    console.log("got it", e);
  }
  ```

- The try catch block can be used in different ways. We can nest try catch blocks

  ```javascript
  try {
    try {
      something();
    } catch (e) {
      throw new Error(e);
    }
  } catch (e) {
    console.log("got it", e);
  }
  ```
