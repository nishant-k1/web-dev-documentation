# 🔁 Prototype Pattern in JavaScript (Interview Perspective)

The **Prototype Pattern** is a design pattern in JavaScript where **objects inherit directly from other objects** using the `[[Prototype]]` (or `__proto__`) chain.

It is the **core inheritance model** in JavaScript and forms the foundation for other patterns like constructor and class.

---

## ✅ What is the Prototype Pattern?

> It’s a pattern where an object is created using another object as its prototype, allowing for **shared behavior** and memory-efficient inheritance.

---

## 🔧 Syntax

```js
const personPrototype = {
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  },
};

const user1 = Object.create(personPrototype);
user1.name = "Nishant";
user1.greet(); // Hi, I'm Nishant
```

---

## 🧠 What Happens Here?

- `Object.create(personPrototype)` creates a new object
- The new object’s `__proto__` (i.e., `[[Prototype]]`) is set to `personPrototype`
- When `greet()` is called, JS looks up the prototype chain if it's not on the object itself

---

## 🔍 Key Characteristics

- Uses **object-to-object inheritance**
- Memory efficient: shared methods live in one place
- Avoids duplication (unlike factory functions)
- Enables a dynamic prototype chain

---

## 🧪 Equivalent with Constructor Function

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const user1 = new Person("Nishant");
user1.greet(); // Hi, I'm Nishant
```

➡️ Under the hood:

```js
Object.getPrototypeOf(user1) === Person.prototype; // true
```

---

## 🧬 Prototype Chain Lookup

```js
const A = { a: 1 };
const B = Object.create(A);
const C = Object.create(B);

console.log(C.a); // 1 — JS goes: C → B → A → finds 'a'
```

---

## 📦 Real-World Use Case

- Sharing methods across objects (e.g., utility methods)
- Inheritance in JS engines (like `Array.prototype`, `Function.prototype`)
- Custom object models in Vanilla JS apps or libraries

---

## 🧪 Comparison: Prototype vs Class vs Factory

| Feature      | Prototype Pattern   | Class Pattern            | Factory Pattern    |
| ------------ | ------------------- | ------------------------ | ------------------ |
| Inheritance  | Object-to-object    | Class-based (`extends`)  | None by default    |
| Uses `new`?  | ❌ No               | ✅ Yes                   | ❌ No              |
| Memory usage | ✅ Efficient        | ✅ Efficient (prototype) | ⚠️ More per object |
| Private data | ❌ Not built-in     | ✅ With `#` or TS        | ✅ Via closures    |
| Syntax       | Low-level, flexible | High-level, structured   | Simple, flexible   |

---

## 🔥 Interview Talking Points

- "JavaScript is a prototype-based language — objects inherit directly from other objects."
- "The prototype pattern is more flexible than classical inheritance and supports dynamic behavior."
- "It's used under the hood by constructor functions and class syntax."
- "Using `Object.create()` gives precise control over an object’s prototype."

---

## ⚠️ Pitfall

Prototype chains can be **hard to debug** if too deep:

```js
const a = {};
const b = Object.create(a);
const c = Object.create(b);
const d = Object.create(c);

console.log(d.someProp); // Very far up the chain — slower, harder to trace
```

---

## 🧵 Summary (1-liner)

> The Prototype Pattern uses one object as the blueprint for another, enabling inheritance via the prototype chain without classes or constructors.
