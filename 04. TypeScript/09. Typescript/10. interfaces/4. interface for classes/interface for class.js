"use strict";
class Someperson {
    constructor(id, name) {
        this.register = () => `${this.name} is now registered.`;
        this.id = id;
        this.name = name;
    }
}
// interface for subclass 
class Employee extends Someperson {
    constructor(id, name, position) {
        // here id and name are alreay in the Someperon class that we're extending so we don't have to this again like -- this.id, this.name, we can call super instead and pass in id and name.
        super(id, name);
        this.position = position;
    }
}
const emp = new Employee(3, 'Shawn', 'Developer');
console.log(emp.register());
