# Factory Functions

> A factory function is a **regular function that returns an object**.  
> It can generate multiple similar objects without using `class` or `new`.

---

## 🧪 Example:

```js
function createUser(name, role) {
  return {
    name,
    role,
    greet() {
      console.log(`Hi, I'm ${this.name} and I am a ${this.role}.`);
    },
  };
}

const user1 = createUser("Nishant", "Engineer");
const user2 = createUser("Aditi", "Designer");

user1.greet(); // Hi, I'm Nishant and I am a Engineer.
user2.greet(); // Hi, I'm Aditi and I am a Designer.
```

## Encapsulation using Factory Functions

```js
function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.getCount()); // 1
```
