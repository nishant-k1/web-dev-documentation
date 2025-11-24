<!-- prototype: A first, typical or preliminary model of something, especially a machine, from which other forms are developed or copied. -->

# Prototypal Inheritance

- Prototypal inheritance is a way in which JavaScript objects can inherit properties and methods from their prototypes.
- Prototypal Inheritance is object getting access to the properties and methods of another object.
- Array gets access to the methods and properties of Object.
- Function gets access to the methods and properties of Object.
- There is no class in javascript. It's just a syntactic sugar.
- prototypal inheritance is unique to the javascript and is not found in other programming languages.
- javascript uses prototypal inheritance while other programming languages uses classical inheritance.

## Prototype

- In JavaScript, every object has a prototype.
- A prototype is an object from which the current object inherits properties and methods.
- It allows objects to share behavior and reduce memory consumption.

```javascript
const array = [];
array.__proto__; // returns base Array
array.__proto__.__proto__; // returns base Object
```

```javascript
function a() {}
a.__proto__.__; // returns base Function
a.__proto__.__proto__; // returns base Object
```

```javascript
const obj = {};
obj.__proto__; // returns base Object
```

- If we had no prototypal feature then we'd need to borrow methods to keep our code dry

```javascript
let dragon = {
  name: "Tanya",
  fire: true,
  fight() {
    return 5;
  },
  sing() {
    return `I am ${this.name}, the breather of fire`;
  },
};

let lizard = {
  name: "kiki",
  fight() {
    return 1;
  },
};

const singLizard = dragon.sing.bind(lizard); // method borrowing
singLizard.sing(); // returns I am Kiki, the breather of fire
```

- prototypal feature makes it easy to use the methods and properties of another object (without the need of borrowing)

```javascript
let dragon = {
  name: "Tanya",
  fire: true,
  fight() {
    return 5;
  },
  sing() {
    return `I am ${this.name}, the breather of fire`;
  },
};

let lizard = {
  name: "kiki",
  fight() {
    return 1;
  },
};

lizard.__proto__ = dragon; // We shouldn't really use it. It's bad for performance. Actually we should never use it.
lizard.sing(); // we can use sing method of dragon for lizard now.
```

- here, dragon is prototype of lizard; means lizard inherit from dragon
- the first created tank is called prototype, the next tanks are created from the prototype inheriting all its features.
- We should not use `__proto__` for prototypal inheritance. Never manually assign prototype chain and create that chaining ourselves. It can mess up javascript compiler badly.
- `.__proto__`: We shouldn't really use it. It's bad for performance. Actually we should never use it. There are different other ways to inherit when it comes to prototypal inheritance.
- prototypes are useful because we can have objects with properties that point to the same place in the memory thus being more efficient.
- hasOwnProperty method of object gives us the list of properties of that object which does not get inherited from prototypal chain.
- Whenever javascript doesn't find anything up the prototypal chain, we get errors or undefined.

```javascript
// Eg:1
const obj = {
  name: "Sally",
};

obj.hasOwnProperty("name"); // returns true
obj.hasOwnProperty("hasOwnProperty"); // returns false because obj has this property inherited from up the prototypal chain.

// Eg:2
function a() {}
a.hasOwnProperty("call"); // returns false because a function object has this property inherited from up the prototypal chain.
a.hasOwnProperty("apply"); // returns false because a function object has this property inherited from up the prototypal chain.
a.hasOwnPropertY("bind"); // returns false because a function object has this property inherited from up the prototypal chain.
```

- the object whose properties/methods are inherited is called a `prototype`
- every object has `.__proto__` property and every object can be a `prototype`. In other words every `prototype` has `.__proto__` property.
- `prototype` is up the prototypal chain wrt to the object who is inheriting its properties.
- `.__proto__` property of an object links to the properties of the object up the prototypal chain.
- `.__proto__` is simply a reference or a pointer to up the chain prototypal object.
- `.__proto__` points to the prototype up the chain.
- In other words `.__proto__` links to the properties of the object's prototype. `.__proto__` ----> `prototype`

```javascript
const obj = {
  name: "Sally",
};
obj.__proto__; // returns Object.prototype which is one step up the prototypal chain here it is `Object` i.e. {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
obj.prototype; // returns undefined; every object is kind of a prototype for the object one step down the prototypal chain.
Object.prototype; // returns {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}

Object.prototype.__proto__; // returns null
```

## Create our own prototypes

```javascript
const human = {
  mortal: true;
}

const socrates = Object.create(human);
socrates.age = 45;
console.log(socrates.mortal) // returns true because using Object.create, we created a prototypal chain.
```

## prototype as property (Not Objects)

- only functions have the `prototype` property
- The thing that contains the `prototype` object is always a function
- in the code below if we do `someObj.prototype` then it will return undefined because only functions (special objects) contain literally a `prototype` property

```javascript
const someObj = {
  name: "nishant",
};
someObj.prototype; // returns undefined
```

- only functions (special objects) and every function (special objects) contain prototype property

```javascript
function someFun() {}

someFun.prototype; // returns {constructor: ƒ}
someFun.__proto__; // returns ƒ () { [native code] }
someFun.prototype.__proto__; // returns base Object
```

- `prototype` is all though a property on all functions but we never use it.
- only time we use `prototype` when we use what we call constructor functions.
- constructor functions usually start with a capital letter and they contain the actual blueprint or prototype what we use.

- when we do `const obj = {}`, underneath the hood javascript has to create that object and in order to create that object javascript uses object constructor.
- every function has a prototype property and it refrences to an object used to attach properties that will be inherited by objects further down the prototypal chain. The last/top object in the chain is the built in `Object.prototype`
- `Ojbect` is a function because it has the prototype.
- `Object.prototype` is the base object which is the last ojbect up the prototypal chain.

## conclusion

- Everything in javascript is an object.
- Array and Functions in javascipt are speacial objects and they inherit their properties through the prototypal chain from the base object.
- The `prototype` property has the `__proto__` property insdie of it that links higher up to the next prototypal chain
- `__proto__` always points to the `prototype`
- only functions have the `prototype` property
- With the help of protoypes we avoid repeating ourselves. Code is dry and thus memory efficient.

## Exercise

```javascript
// Extend the functionality of a built in object.
// usging 'this'
new Date("1900-10-10").__proto__;
Date.prototype.lastYear = function () {
  return this.getFullYear() - 1;
};

new Date("1900-10-10").lastYear(); // return s1899

// using arrow functions

new Date("1900-10-10").__proto__;
Date.prototype.lastYear = () => {
  return new Date("1900-10-10").getFullYear() - 1; // in arrow function this is lexically scoped
};

new Date("1900-10-10").lastYear(); // returns 1899

// Modify .map() to print 🗺️ at the end of each item.
console.log([1, 2, 3].map());

Array.map() = function () {
 const arr = []
 for (let i = 0; i < this.length; i++){
    arr.push(this[i]+'🗺️');
 }
 return arr
}
```

## `__proto__` vs `prototype`

- `__proto__` is a property that every object in JavaScript has. It points to the object's prototype.
- `prototype` is a property that functions have. It's used when creating objects using the new keyword. The prototype is the object that will become the prototype for instances created using that function as a constructor.
