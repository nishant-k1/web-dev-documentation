"use strict";
// CLASSES
class Person {
    constructor(id, name) {
        this.id = 5;
        this.name = 'brad';
        this.register = () => `${this.name} is now registered with ${this.id}`;
        this.id = id;
        this.name = name;
        console.log(this.id, this.name);
    }
}
const Nishant = new Person(23, 'larry');
console.log(Nishant.register());
