# call, apply and bind

- Since every function is an object and object can have methods and properties, all functions have these 3 special methods namely `call()`, `apply()` and `bind()` available to them.
- Technically arrow functions also have call, apply and bind methods — because every function in JavaScript (including arrow functions) inherits from Function.prototype.
- But we do not use .call(), .apply(), or .bind() with arrow functions — because they don’t have their own this, and those methods are meant to control `this`.
- No other objects ( except functions ) have these methods available i.e. `call, apply and bind are exclusive to functions only`.
- With the help of call, apply, or bind we can use the methods of one object in another object.
- It helps in keeping code dry.
- The first argument while invoking any of the three `call(obj, arg1,arg2...)`, `apply(obj, [arg1,arg2...])`, `bind(obj, arg1,arg2...)` is the object to which method has to be shared.
- first argument in call, apply and bind methods is always the reference to the object to which the method has to be shared with.

## call(obj, arg1, arg2...) and apply(obj, [arg1, arg2...])

- **obj.regularFn() → regularFn.call(obj)** it is done under the hood by javascript.

- Important example below: greetFn is detached from user, so this is undefined.

```js
const user = {
  name: "Nishant",
  greet: function () {
    return `Hello, ${this.name}`;
  },
};

const greetFn = user.greet;
console.log(greetFn());
```

- Underneath the hood all the functions use call() by default when invoking a function.
- Only difference that `apply()` has wrt `call()` is `apply()` takes method parameters in an array.
- To choose between `call()` and `apply()` just decide whether it's easier to pass an array of parameters or comma separated list of arguments.

  ```javascript
  function a() {
    console.log("hi");
  }

  a.call(); //returns hi

  a(); // returns hi; so a() is just a shorthand for a.call();

  a.apply(); // returns hi; call and apply do the same thing

  a.bind(); // returns function `a`
  ```

- Example 1: Sharing methods (no parameters) using call()

```javascript
const wizard = {
  name: "Merlin",
  health: 100,
  heal() {
    return (this.health = 100);
  },
};
const archer = {
  name: "Robin Hood",
  health: 30,
};

wizard.heal(); // returns 100

/* Now to borrow the heal method into the archer we can use call() or apply() */
wizard.heal.call(); // returns 100

// to what object heal method should be bound to; can be passed as a parameter
wizard.heal.call(archer); // returns 30
```

- Example 2: Sharing methods (with parameters) using call() / apply()

```javascript
const wizard = {
  name: "Merlin",
  health: 100,
  heal(num1, num2) {
    return (this.health += num1 + num2);
  },
};
const archer = {
  name: "Robin Hood",
  health: 30,
};

wizard.heal(30, 40); // returns 170

/* Now to borrow the heal method into the archer we can use call() or apply() */
wizard.heal.call(30, 40); // returns 170

`to what object heal method should be bound to; can be passed as first argument`;
wizard.heal.call(archer, 30, 40); // returns 100

`only difference that `apply` has wrt call is apply takes method arguments in an array`
wizard.heal.apply(archer, [30, 40]); // returns 100
```

## bind(obj, arg1, arg2...)

- unlike call apply that immediately runs a function, bind returns a new function (with a certain context and parameters).

- it's usually used when we want a function to be called later on (with a certain type of context or a certain type of this keyword).

- bind allows us to store this keyword or the function borrowing for the later use

- call and apply are useful for borrowing methods from an object while bind is useful for borrowing methods with a certain context or certain this keyword.

- Example 1: Sharing methods (with parameters)

```javascript
const wizard = {
  name: "Merlin",
  health: 100,
  heal(num1, num2) {
    return (this.health += num1 + num2);
  },
};

const archer = {
  name: "Robin Hood",
  health: 30,
};

// bind allows us to store this keyword or the function borrowing for the later use
const healArcher = wizard.heal.bind(archer, 30, 40);
healArcher(); // returns 100
```
