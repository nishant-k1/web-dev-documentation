# 🏗️ Constructor Pattern in JavaScript (Interview Perspective)

The **Constructor Pattern** in JavaScript is used to create multiple similar objects using the `new` keyword. It’s based on functions that act as blueprints.

---

## ✅ What is the Constructor Pattern?

> It uses a **constructor function** to initialize and return objects, and it relies on the `this` keyword and the `new` operator.

---

## 🔧 Syntax

```js
function User(name, role) {
  this.name = name;
  this.role = role;
  this.greet = function () {
    console.log(`Hi, I'm ${this.name}, a ${this.role}.`);
  };
}

const user1 = new User("Nishant", "Engineer");
user1.greet(); // Hi, I'm Nishant, a Engineer.
```

---

## 🔍 Key Characteristics

- Defined using a regular function (capitalized by convention, like `User`)
- Uses `this` to set properties
- Must be called with `new` to work correctly
- Returns a new object automatically
- `this` refers to the new object being created

---

## 💡 What Happens Internally with `new`?

When you call `new User("Nishant", "Engineer")`, JavaScript does the following:

1. Creates a new empty object: `{}`
2. Sets the new object’s prototype: `__proto__ → User.prototype`
3. Binds `this` inside the function to that object
4. Executes the function body
5. Returns the new object

---

## 🧠 Prototype Usage (Memory Optimization)

To avoid recreating methods for every instance:

```js
function User(name, role) {
  this.name = name;
  this.role = role;
}

User.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name}, a ${this.role}.`);
};

const user1 = new User("Nishant", "Engineer");
user1.greet(); // Hi, I'm Nishant, a Engineer.
```

✅ Now `greet` is shared between all instances.

---

## 🧪 Comparison: Constructor vs Factory

| Feature           | Constructor Pattern             | Factory Pattern               |
| ----------------- | ------------------------------- | ----------------------------- |
| Uses `new`?       | ✅ Yes                          | ❌ No                         |
| Uses `this`?      | ✅ Yes                          | ❌ No                         |
| Return value?     | Implicit (`this`)               | Explicit (`return {}`)        |
| Prototypes used?  | ✅ Can use `Function.prototype` | ❌ Usually not                |
| Memory efficient? | ✅ Yes (if using prototype)     | ❌ Creates methods per object |

---

## 🔥 Interview Talking Points

- "Constructor functions allow us to define templates for object creation before `class` syntax was introduced in ES6."
- "They rely on the `new` keyword, and each call to the constructor creates a new object with its own scope."
- "To optimize memory, we attach shared methods to the constructor’s prototype."
- "Using `new` without understanding how `this` and `prototype` work can lead to bugs or incorrect behavior."

---

## ⚠️ Pitfall to Know

What if you forget to use `new`?

```js
const brokenUser = User("Aditi", "Designer");
console.log(brokenUser); // undefined
console.log(window.name); // "Aditi" (pollutes global object in non-strict mode)
```

🔴 Always use `new`, or use `use strict` to prevent this kind of error.

---

## 🧵 Summary (1-liner):

> The Constructor Pattern in JS uses `function + new + this` to create similar objects, optionally using `.prototype` to optimize memory.
