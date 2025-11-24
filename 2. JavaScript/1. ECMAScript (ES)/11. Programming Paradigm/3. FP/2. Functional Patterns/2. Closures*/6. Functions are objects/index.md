# Functions are objects

- functions in javascript are also objects (Not very common in other programmng languages.)
- When we invoke a function we get two parameters automatically:

  1. this
  2. arguments:
     it is an array like object that has some weired behaviours for looping and iteration so we want to avoid using it and instead use something like spread operator.

     because of the arguments object, we can technically not have any parameters defined for a function and when we call that function, if we add parameters to it, we can still grab them using the arguments keyword.

- when we define our functions and the compiler looks at our code lexically, it determines what variables are avaialbe for us in our variable environment and it also add our scope chains

- we have a few ways of invoking and creating functions. ( call(), apply() )

- We can also create a function using Function constructor

  ```javascript
  const someFun = new Functon(param1, param2);
  ```

- we can add properties to functions (since functions are simply objects)

```javascript
function someFn() {
  console.log("Hi");
}

someFn.sayMyName "Andrei"

// Now an special object gets created implicitly, something like below (not exactly)
 const specialOjb = {
    sayMyName: 'Andrei',
    name: 'someFun', // name of the function
    (): console.log(Hi) // action to be performed
 }

```

- we also get some properties and methods implictly to our specialOjb which is created during our function declaration

  ```javascript
  function someFn() {
  console.log("Hi");
  }

  someFn.sayMyName "Andrei"

  // Now an special object gets created implicitly, something like below (not exactly). functions are called special object because it has some special methods like (), call, apply, bind, and and special properties like arguments, name. Normal objects don't have call, apply, bind, arugements.
  const specialOjb = {
    sayMyName: 'Andrei',
    name: 'someFun', // name of the function
    (): console.log(Hi), // action to be performed
    call, // method
    apply, // method
    bind, // method
    arguments, // property
    caller, // property
    length, // property
    name, // property
    prototype, // property
    toString, // method
    console, // method
    log // method
  }

  ```

- functions are called special objects because it is callable object which has some special methods like (), call, apply, bind, and and special properties like arguments, name. Normal objects don't have call, apply, bind, arugements.

  ```javascript
  const specialOjb = {
  sayMyName: 'Andrei',
  name: 'someFun', // name of the function
  (): console.log(Hi), // action to be performed
  call, // method
  apply, // method
  bind, // method
  arguments, // property
  caller, // property
  length, // property
  name, // property
  prototype, // property
  toString, // method
  console, // method
  log // method
  }

  ```
