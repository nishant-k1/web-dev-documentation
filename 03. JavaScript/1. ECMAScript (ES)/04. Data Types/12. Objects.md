# ✅ Must-Know `Object` Methods & Properties (JavaScript Interview Perspective)

A list of high-impact, frequently asked `Object` methods and properties every JavaScript developer should know.

---

## 🔷 1. Object Creation & Prototypes

| Method / Property                   | Purpose                                               |
| ----------------------------------- | ----------------------------------------------------- |
| `Object.create(proto, props?)`      | Creates a new object with the given prototype         |
| `Object.assign(target, ...srcs)`    | Copies enumerable own props (shallow copy)            |
| `Object.setPrototypeOf(obj, proto)` | Sets the prototype of an object (rarely used, slower) |
| `Object.getPrototypeOf(obj)`        | Gets the prototype (same as `__proto__`)              |

```js
const base = {
  greet() {
    console.log("hi");
  },
};
const obj = Object.create(base);
```

---

## 🔷 2. Object Inspection

**enumerable**: A property is enumerable if it can be listed or looped over using for...in or similar operations.

| Method / Property          | Purpose                                                  |
| -------------------------- | -------------------------------------------------------- |
| `Object.keys(obj)`         | Returns array of enumerable own property names (strings) |
| `Object.values(obj)`       | Returns array of enumerable own property values          |
| `Object.entries(obj)`      | Returns array of `[key, value]` pairs                    |
| `Object.hasOwn(obj, prop)` | Safer modern version of `hasOwnProperty`                 |
| `obj.hasOwnProperty(prop)` | Returns true if prop is direct (not inherited)           |

```js
Object.keys({ a: 1, b: 2 }); // ['a', 'b']
```

---

## 🔷 3. Property Descriptors

| Method                                        | Purpose                                                |
| --------------------------------------------- | ------------------------------------------------------ |
| `Object.defineProperty(obj, key, descriptor)` | Defines a single property with full descriptor control |
| `Object.defineProperties(obj, descriptors)`   | Defines multiple properties                            |
| `Object.getOwnPropertyDescriptor(obj, prop)`  | Gets property descriptor                               |
| `Object.getOwnPropertyDescriptors(obj)`       | Gets all descriptors (used for deep copy sometimes)    |

```js
Object.defineProperty(obj, "age", {
  value: 30,
  writable: false,
  enumerable: true,
});
```

---

## 🔷 4. Immutability & Control

| Method                          | Purpose                                                     |
| ------------------------------- | ----------------------------------------------------------- |
| `Object.freeze(obj)`            | Makes object fully immutable (shallow)                      |
| `Object.seal(obj)`              | Prevents adding/removing props, but values can still change |
| `Object.preventExtensions(obj)` | Prevents new properties from being added                    |
| `Object.isFrozen(obj)`          | Checks if object is frozen                                  |
| `Object.isSealed(obj)`          | Checks if object is sealed                                  |
| `Object.isExtensible(obj)`      | Checks if object can be extended                            |

---

## 🔷 5. Utilities & Meta

| Method                        | Purpose                                              |
| ----------------------------- | ---------------------------------------------------- |
| `Object.fromEntries(entries)` | Converts `[key, value]` array into object            |
| `Object.is(val1, val2)`       | Like `===` but correctly handles `NaN`, `+0` vs `-0` |
| `Object.toString.call(value)` | Gets accurate type info (like `[object Array]`)      |

```js
Object.is(NaN, NaN); // true
Object.is(+0, -0); // false
Object.is(42, 42); // true
Object.is("foo", "foo"); // true
Object.is([], []); // false (different references)
Object.is(null, null); // true
```

---

## 🧠 Interview Highlights

### 🔸 How to clone an object?

```js
Object.assign({}, obj);
{ ...obj };
structuredClone(obj); // ✅ deep copy
```

### 🔸 Non-enumerable property

```js
Object.defineProperty(obj, "hidden", {
  value: 123,
  enumerable: false,
});
```

### 🔸 `in` vs `hasOwnProperty()`

- `in`: checks in prototype chain
- `hasOwnProperty`: checks only own props

### 🔸 `for...in` vs `Object.keys()`

- `for...in`: includes inherited enumerable props
- `Object.keys()`: own enumerable props only

---

## ✅ Quick Reference Cheat Sheet

```js
Object.create(proto);
Object.assign(target, source);
Object.defineProperty(obj, key, descriptor);
Object.getOwnPropertyDescriptor(obj, key);
Object.freeze(obj);
Object.seal(obj);
Object.keys(obj);
Object.values(obj);
Object.entries(obj);
Object.fromEntries(arr);
Object.getPrototypeOf(obj);
Object.setPrototypeOf(obj, proto);
obj.hasOwnProperty("key");
Object.hasOwn(obj, "key"); // ✅ safer and newer
```

---

💡 **Tip:** In interviews, show deep understanding by explaining how these methods relate to **enumerability, descriptors, prototype chaining, immutability**, and **cloning**.
