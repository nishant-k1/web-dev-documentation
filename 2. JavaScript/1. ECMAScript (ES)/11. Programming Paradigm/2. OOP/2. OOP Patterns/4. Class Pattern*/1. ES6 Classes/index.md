# Object Oriented Programming using ES6 Classes

```javascript
// class: code is dry, also for each elf same memory location will get assigned for the attack method

class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return "attack with " + this.weapon;
  }
}

const peter = new elf("Peter", "Stones");
peter.attack();

const sam = new elf("sam", "fire");
sam.attack();
```
