# First Class Citizens

- JavaScript functions are first-class citizens. This means that you can store functions in variables, pass them to other functions as arguments, and return them from other functions as values.

- If any programming language has the ability to treat functions as values, to pass them as arguments and to return a function from another function then it is said that programming language has First Class Functions and the functions are called as First Class Citizens in that programming language.

- functions can be passed around like a data and this idea of functions of being passed around beside of just performing some actions and because of this functions are a first class citizens in javascript

- Antything that we can do with other data types, we can do the same with function types.

## Three properties that make functions First Class Citizens in javascript

1. We can assign functions to variables and properties of objects.

   ```javascript
   var suff = function () {};
   ```

2. We can also pass functions as arguments (callback functions)

   ```javascript
   function a(fn) {
     fn();
   }
   a(function b() {});
   ```

3. We can return functions as values from other functions

   ```javascript
   function a() {
     return function c() {
       console.log("Hi");
     };
   }
   a(); // returns function c() { console.log('Hi again') }
   a()(); // returns Hi

   const b = a();
   b(); // returns Hi
   ```
