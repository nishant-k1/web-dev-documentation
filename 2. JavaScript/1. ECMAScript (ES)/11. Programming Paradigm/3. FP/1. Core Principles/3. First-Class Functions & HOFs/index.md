# HOFs

A Higher-Order Function (HOF) in JavaScript (or any programming language that supports first-class functions) is a function that does at least one or both of the following:

- Takes one or more functions as arguments (callbacks).
- Returns a new function (often newly created or a modified version of an input function).

Additional clarifications:

- The callback function does not need to be executed inside the HOF. Simply receiving a function as an argument qualifies it as a HOF.
- Even if a function does not take a function as an argument but returns another function, it is still considered a HOF.
- If a function receives a callback and returns a modified version of that callback (e.g., by wrapping or enhancing it), it is also a HOF.

## Callback function

A function only acts as a callback if it is passed as an argument and is meant to be invoked by the function it’s passed into.

Additional clarifications

- A function is considered a callback only when the receiving function (the HOF) is expected to call it—either immediately or eventually.
- If the passed function doesn't get invoked inside the body of the HOF, then it would not be called as callback function. It’s simply a function being passed and returned—but not being used as a callback.
- A function is considered a callback only when the receiving function (the HOF) is expected to call it—either immediately or eventually.
