# this keyword

`Regular functions:` **In JavaScript, the value of `this` depends on how a function is invoked — not where that function is defined.**

## `Arrow functions:` **In JavaScript, the value of `this` depends on where an arrow function is defined — not how that arrow function is invoked.**

---

🔄 `For regular functions`: this depends on how it's invoked
⚡️ `For arrow functions`: this depends on where it's defined

---

1. new binding this (in constructor functions)

   ```javascript
   function Person(name, age) {
     this.name = name; // here "this" refers to the object which is getting instantiated. Here, this refers to the person1
     this.age = age;
   }

   const person1 = new Person("Xavier", 55); // the new keyword helps bind the constructor function to  the new initiated object and thus here this refers to person1;
   ```

2. implicit binding

   ```javascript
   const person2 = {
     name: "Karen",
     age: 40,
     hi() {
       console.log("hi" + this.name); // here this refers to the person object
     },
   };
   ```

3. explicit binding (using "call, bind, or apply" explicitly to tell this is what I want "this" to be)

   ```javascript
   const person3 = {
       name: 'Karen',
       age: 40,
       hi: function () {
       console.log('hi', this.setTimeout) // here, this refers to the window object because we bind hi function to the window object.
   }.bind(window);

   const person3 = new Person ('Xavier', 55);
   ```

4. arrow functions: with arrow functions "this gets lexically scoped"

   ```javascript
   function Person4 = {
       name: 'Karen',
       age: 40,
       hi: function (){
           var inner = () => {
               console.log('hi' + this.name); // this is lexically scoped due to arrow function. if it had not been the arrow function then here, this would have been the window object (dynamic scoping).
           }
           return inner();
       }

   }

   const Person4 = new Person ('Xavier', 55);
   ```
