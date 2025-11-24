# What is a Prototype

Every JavaScript object has an internal link to another object called its prototype, accessible via **proto** or Object.getPrototypeOf(obj).

```js
const person = { name: "Nishant" };
console.log(person.__proto__ === Object.prototype); // true
```

let us assume prototype of object A is B, then B is called prototype of object A. It means A inherits properties and methods from B.

When we say “B is the prototype of A” we mean:

```js
Object.getPrototypeOf(A) === B; // true
```

A is a “child” (or inheriting object) of B,
but JavaScript does not have a special name for A from B’s perspective.

But A is just an object that inherits from B — we can casually call it a child, inheritor, or instance.

| Relationship | Description                                                                         |
| ------------ | ----------------------------------------------------------------------------------- |
| B → A        | B is the **prototype** of A                                                         |
| A → B        | A is a **"descendant"**, "child", or "instance-like" object — but **not prototype** |

## What that implies

1. Property / method lookup:
   When you do `A.someProp`, the engine looks for someProp on A itself.

   If it’s not there, it climbs to B.

   If B doesn’t have it, it climbs to B’s prototype, and so on, until it hits null.
   This climb/mechanism is the prototype chain, and that’s how inheritance happens.

2. Shared, not copied:
   Nothing gets duplicated or cloned from B into A; the properties live on B.

   If B.count = 0, every object that prototypes from B “sees” that same count slot unless they shadow it with their own own-property.

3. Dynamic:
   Because the reference is live, if you later add B.newMethod = …, all objects inheriting from B immediately “inherit” it too.

## `Prototype` vs. `__proto__` vs. `.prototype`

| Term                         | Meaning                                                              |
| ---------------------------- | -------------------------------------------------------------------- |
| `obj.__proto__`              | Refers to the prototype of the object                                |
| `Function.prototype`         | Property of constructor functions — used when creating new instances |
| `Class.prototype`            | Where instance methods live                                          |
| `Object.getPrototypeOf(obj)` | Preferred over `__proto__` (standard)                                |

## What is the Prototype Chain?

If a property/method is not found on an object, JavaScript looks up the prototype chain until it finds it — or reaches null.

```js
const obj = {};
obj.toString(); // Found on Object.prototype

// Chain: obj → Object.prototype → null
```

## Quick sanity checklist for interviews

1. Define prototype vs. prototype chain in a sentence each.
2. Explain look-up order (own props → prototype chain → undefined).
3. Mutating the prototype affects all descendants (unless they shadow).
4. Distinguish **proto** / [[Prototype]] from Function.prototype.
5. Know the common creation patterns (Object.create, constructor functions, class / extends).
6. Be able to diagram a small chain and predict where a property is found.

---

## JavaScript Has Two Kinds of “Prototypes”

1. regular `prototype` and `Function.prototype`
2. When you define a function, it gets a .prototype property (NOT the same as [[Prototype]]).
3. This is used only when you create objects using new (you're using a function as a constructor with new).
4. The `.prototype` property exists only on functions.

| #     | Context                          | What “prototype” refers to                                                                                          |
| ----- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **1** | When we say `A inherits from B`  | B is the **prototype** of A → i.e., `Object.getPrototypeOf(A) === B`                                                |
| **2** | When dealing with a **function** | `Function.prototype` is an object that will become the prototype of any object created by that function using `new` |
