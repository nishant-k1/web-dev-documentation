# Object Oriented Programming using Object.create(prototype)

```javascript
// Object.create: code is dry, also for each elf same memory location will get assigned for the attack method

const elfFunctions = {
  attack() {
    return "attack with " + this.weapon;
  },
};

function createElf(name, weapon) {
  let newElf = Object.create(elfFunctions);
  newElf.name = name;
  newElf.weapon = weapon;
  return newElf;
}

const peter = createElf("Peter", "Stones");
method;
peter.attack();

const sam = create("sam", "fire");
sam.attack();
```

## 🔥 `Object.create()` vs `new` in JavaScript

| Feature               | `Object.create(proto)`                     | `new Constructor()`                              |
| --------------------- | ------------------------------------------ | ------------------------------------------------ |
| Purpose               | Create an object with a specific prototype | Create an instance from a constructor function   |
| Prototype link        | Sets prototype explicitly                  | Links prototype via `Constructor.prototype`      |
| Constructor called    | ❌ No constructor called                   | ✅ Constructor function is automatically called  |
| Custom initialization | ❌ Manual initialization required          | ✅ Initialization can be done inside constructor |
| Use case              | Simple prototype inheritance / delegation  | Object instantiation with setup logic            |

---

### 🔍 `Object.create(proto)`

**What it does:**

- Creates a **new object** and sets its prototype to the passed object.

```js
const animal = {
  eats: true,
  walk() {
    console.log("Animal walks");
  },
};

const dog = Object.create(animal);
dog.barks = true;

console.log(dog.eats); // true (inherited from prototype)
```

**Key Points:**

- Does **not call any constructor**.
- You manually assign properties.
- Great for **object delegation / prototype inheritance**.
- Often used for **pure prototypal inheritance**.

---

### 🔧 `new Constructor()`

**What it does:**

- Creates a new object.
- Links it to `Constructor.prototype`.
- Calls the constructor with `this` bound to the new object.
- Returns the created object.

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.eats = true;

const dog = new Animal("Tommy");
console.log(dog.name); // Tommy
console.log(dog.eats); // true (inherited)
```

**Key Points:**

- Uses a **constructor function** for setup logic.
- Automatic `this` binding.
- Preferred for **blueprint-style object creation** (OOP).
- Uses prototype under the hood.

---

### 👨‍🏫 Use Case Comparison

| Scenario                                          | Prefer              |
| ------------------------------------------------- | ------------------- |
| When you want pure prototypal delegation          | `Object.create()`   |
| When you want to initialize properties with logic | `new Constructor()` |
| Reusable object templates without classes         | `Object.create()`   |
| OOP-style instantiation with method sharing       | `new`               |

---

### 🧠 Under the Hood Example

```js
function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function () {
  console.log(this.name + " barks!");
};

const dog1 = new Dog("Bruno");

// Equivalent to:
const dog2 = Object.create(Dog.prototype);
Dog.call(dog2, "Bruno");
```

---

### ✅ Interview Takeaway

> Both are ways to set an object's prototype, but:
>
> - `new` is syntactic sugar for constructor + prototype + init.
> - `Object.create` is direct, explicit, and cleaner for prototype delegation.

### Object.create() vs new

```js
function Constructor() {}
o = new Constructor();

// Is equivalent to:
o = Object.create(Constructor.prototype);
```
