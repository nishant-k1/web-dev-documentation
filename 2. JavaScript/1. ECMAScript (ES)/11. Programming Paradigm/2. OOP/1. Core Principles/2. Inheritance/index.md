# Inheritance

- JavaScript uses prototypal inheritance rather than classical class-based inheritance, but ES6 introduced class syntax which is syntactic sugar over the prototype chain."
- One class (child) inherits methods/properties from another (parent).
- The core aspect of the Object Oriented Programming is inheritance
- Inheritance means passing knowledge down
- constructor function inside the class gets run every time we instantiate the class or use the new keyword
- when doing object oriented programming using Class and instance of class is created every time we use class to create a new Object using new keyword. The Object is called the instance of that class.
- class with the new keyword is called its instance and the process is called instantiation.
- every time we instantiate a class, its constructor runs.
- class keyword is just a prototypal inheritance.

```javascript
// problem if we don't use class inheritance.
class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return "attack with " + this.weapon;
  }
}

const fiona = new Elf("Fiona", "Stones");
const ogre = { ...fiona }; // fiona and ogre points to different memory locations in javascript engine. We also lost the prototypal inheritance, because ogre isn't in the same prototypal chain.
console.log(ogre === fiona); // returns false
ogre.attack(); // returns error
```

```javascript
// class inheritance.
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return "attack with " + this.weapon;
  }
}

class Elf extends Character {
  // Elf has now prototype chain upto to the Character
  constructor(name, weapon, type) {
    super(name, weapon); // calls the constructor of the parent calls
    console.log(this);
    this.type = type;
  }
}

const fiona = new Elf("Fiona", "Stones", "house");
fiona.attack();

class Ogre extends Character {
  // Elf has now prototype chain upto to the Character
  constructor(name, weapon, color) {
    super(name, weapon); // calls the constructor of the parent calls
    console.log(this);
    this.color = color;
  }
  makeFort() {
    // it is similar to Ogre.prototype.makeFort
    return this.name + " make fort";
  }
}

const shrek = new Ogre("Shrek", "sticks", "black");
shrek.makeFort();

console.log(fiona instanceof shrek); // returns false

console.log(fiona instanceof Character); // returns true
```

- in javascript objects inherit from objects, there's no actual class while in languages like java classes are a thing and class inherits from the class
- languages like java and c++ copy objects when extend a class while javascript link is created between objects and objects gets referenced to the same memory when a class extends another class so javascript provides some efficiency in terms of memory over other languages that uses class like java and c++.
