# Side Effects && Pure Functions

## Side Effects

- A function is said to have a side effect if it modifies or interacts with anything outside its own local scope (Function Scope).
- Side effects aren't just about modifying variables — they can also include interacting with the outside world.
- A side effect is anything a function does that affects the outside world or is affected by it.
- A side effect is when a function reads from or writes to anything outside its local scope, such as: Global/Window variables, DOM, browser APIs, I/O operations, or time/random-based utilities.
- When a function has side effects then it is no more a pure function.

**Examples of side effects**:

- Modifying variables outside the function (including global or closure scope)
- Modifies a declaration outside its Function Scope
- Changing a global/window variable
- Modifying a DOM element (part of the window object)
- Writing to a file or logging to the console (console is part of the window object)
- Making API calls (Part of the fetch which is again a method of window)
- Using random values or current time (Math.random(), Date.now()) (Math object and Date object are certainly outside the Function Scope of our function)
- If a function modifies its parameters, especially if they are objects or arrays passed by reference, it is considered a side effect — and the function is NOT pure. Even though the parameter is local to the function, modifying it affects the original object outside, because objects and arrays in JavaScript are passed by reference.

**A side effect occurs when a function**:

- Modifies state outside its local scope (e.g., a global variable).
- Interacts with the external environment (e.g., console output, DOM manipulation, - file system, network requests). `Here external environment refers to the Web APIs in the BRE.`
- The act of logging changes the state of the console (it adds output to the console’s history), which is observable outside the function.
- Depends on external state that may change (e.g., reading a global variable that - could be modified elsewhere).
- Produces non-deterministic results (e.g., using Math.random()).

Eg1:

```javascript
const array = [1, 2, 3];
// below function has side effect. mutateArray is modifying the array that lives outside of this function
function mutateArray(arr) {
  arr.pop();
}
mutateArray(array);
console.log(array);
```

Eg2:

```javascript
function someFun(arr) {
  console.log("hi"); // login in the browser console is a side effect.
}
someFun();
```

## No Side Effects

Eg1:

```javascript
const array = [1, 2, 3];
// below function has no side effect. removeLastItem is not modifying anything that lives outside of this function. It is modifying newArray that lives inside of this function.
function removeLastItem(arr) {
  const newArray = [].concat(arr); // creating new copy of the array instead of pointing to the same memory location.
  newArray.pop();
  return newArray;
}
removeLastItem(array);
console.log(array);
```

Eg2:

```javascript
const array = [1, 2, 3];
// below function has no side effect. removeLastItem is not modifying anything that lives outside of this function. It is modifying newArray that lives inside of this function.
function removeLastItem(arr) {
  const newArray = [].concat(arr); // creating new copy of the array instead of pointing to the same memory location.
  newArray.pop();
  return newArray;
}

function multiplyBy2(arr) {
  return arr.map((item) => item * 2);
}
console.log(removeLastItem(array));
console.log(multiplyBy2(array));
console.log(array);
```

## Pure Functions

A function is pure if it satisfies two conditions:

1. `Deterministic`: It always produces the same output for the same input.
2. `No side effects`: It does not modify or depend on state outside its scope, nor does it interact with the external environment in a way that affects or is affected by external state.

- A pure function can modify variables declared within its local scope.
- A pure function can NOT modify variables declared outside its local scope.
- A function is a pure function if

  1. It doesn't depend on or alter external state.
     A pure function's output is determined solely by its input arguments.
     It does not rely on:

     - Variables outside the function's local scope.
     - Any global or external state

  2. A pure function always produces the same output given the same input.

## Pure Functions in Redux

- Reducers are pure function in redux.
- We use the spread operator to create a shallow copy of the state object, and then make changes to that copy — instead of modifying the original — to keep the reducer pure.
- Instead of modifying the actual state object we create a shallow clone of it using spread operator and then modify it to keep the reducer function pure.
- Why Not Deep Copy in Reducers?

  - Performance: Deep copying is slow, especially for large or deeply nested state trees.
  - Redux is designed to be fast and predictable, so deep copying every time would introduce unnecessary overhead.
  - Shallow copy is enough to detect changes. In the redux state, only create clone of those nested objects which are supposed to be mutated. Keep the other references as it is. For each nested object clone can be created using the spread operator.

  ```js
  const newState = { ...state, user: { ...state.user, name: "Nishant" } };
  // Only user and state references are changed.
  // No need to deep copy everything else (like settings, posts, etc.).
  ```

## First-Class Functions

In javascript functions are first class citizens and function parameters are local variables

```javascript
function someFun1(num1, num2) {
  return num1 + num2;
}

function someFun2(num) {
  return num * 2;
}
someFun1();
someFun2();
```

## can everything be Pure?

- console.log is side effect
- input/output is a side effect (communicating with the outside world in any way which what input/output is)

- program cannot exist outside side effect.
- without side effect we cannot interact with the browser.
- We can't have websites with just pure functions.
- browsers have to make fetch calls, http calls, we have to manipulate DOM which is not possible with pure functions.

- The Goal of FP is not make everything pure functions but the goal is to minimize side effects.
- The idea behind FP is to organize your code in such a way that there is a specific part that has side effects so that when you have a bug you know right away to go to that spot because that's where the side effects are happening while rest of the code are pure functions and because they are pure we don't have to worry about them as much.
- purity is more of a confidence level, it cannot be 100%.

- side effects and impuriy are not necessarily bad but the goal is to organize your code in a way that you isolate these side effects, these database calls, API calls, input, output to a certain location in your program, in your code so that your code becomes predicatable and easier to debug.
- At the end of the day, we do have to have some sort of a gloabal state to describe our application.
- In FP we want to build programs that are build with a bunch of very small, very reusable, predictable pure functions.

## Perfect function in FP

- Should do 1 task
- Should have return statement
- Should be
- Should have no shared state
- Immutable state
- Composable
- Predictable
