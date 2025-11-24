# Higher Order Functions

- A function that can take a function as an argument or a function that returns another function.

- It helps in keeping the code dry, more general and lot more flexible.

- Efficiency order of keeping the code dry: function() < function with parameters < HOF

  ```javascript
  // Company User Authentication System.
  // Example for higher order function (that takes another function as argument)
  function authenticate(verify) {
    let array = [];
    for (let i = 0; i < verify; i++) {
      array.push(i);
    }
    return true;
  }

  function giveAccessToUser(person) {
    return "Access granted to " + person.name;
  }

  function letPerson(person, fn) {
    // our higher order function
    if (person.level === "admin") {
      fn(500000);
      return giveAccessToUser(person);
    }
    if (person.level === "user") {
      fn(300000);
      return giveAccessToUser(person);
    }
  }

  letPerson({ level: "user", name: "Tim" }, authenticate);
  ```

  ```javascript
  // Another example for higher order function (that returns another function.)

  function muliplyBy(num1) {
    // Our higher order function
    return function (num2) {
      return num1 * num2;
    };
  }
  const mulitplyByTwo = muliplyBy(2);
  const mulitplyByThree = muliplyBy(3);
  mulitplyByTwo(343);
  mulitplyByThree(343);

  // above example using arrow functions
  const muliplyBy = (num1) => (num2) => num1 * num2;
  muliplyBy(2)(4); //returns 8
  ```
