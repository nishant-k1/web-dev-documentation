# Programming Paradigms

- It allows us to make complex codes more organized
- Rules of Programming Paradigms
  1. Clear + Understandable
  2. Easy to Extend
  3. Easy to Maintain
  4. Memory Efficient
  5. DRY

---

## OOP vs FP

## Overview

- Both are programming paradigms to write code that is:
  1. Clear and understandable
  2. Easy to extend
  3. Easy to maintain
  4. Memory efficient
  5. DRY (Don't Repeat Yourself)
- A programming paradigm is a way of writing code following a specific set of rules.
- Both paradigms have existed since the 1970s.
- Neither is inherently better than the other.
- JavaScript allows the use of both paradigms.
- All programming languages have two primary components:
  1. Data
  2. Behaviour
- OOP and FP are complementary. JavaScript is a multiparadigm language, enabling us to use both styles. You can choose either based on the problem.

---

## OOP (Object-Oriented Programming)

- Organizes code into units called objects.
- An object is a container for related data and operations.
- The data is known as **attributes** or **state**, and the operations are called **methods**.
- `Objects are first-class citizens in OOP`.
- OOP is based on 4 pillars:
  1. Encapsulation
  2. Abstraction
  3. Inheritance
  4. Polymorphism
- Few operations on common data.
- Stateful — objects hold state that can be changed.
- Encourages **imperative programming**: describes **what to do and how to do it**.
- Best when you have **many entities (e.g., characters in a game)** with shared behaviors.
- Brings **data and behavior together** in one place.

---

## FP (Functional Programming)

- Focuses on avoiding side effects and writing **pure functions**.
- Code is a composition of functions; **data is immutable**.
- Functions do not change the outside world — output depends only on the input.
- Functions are first-class citizens.
- FP is based on:
  1. Higher-order functions
  2. Pure functions
  3. Referential transparency
- Only one core principle: **pure functions**, and composing them to transform data.
- Functions manipulate structures like arrays, trees, and objects.
- Many operations on fixed data.
- Stateless — no shared mutable state.
- Encourages **declarative programming**: describes **what to do**, not how.
- Ideal for processing large volumes of data.
- Keeps **data and behavior separate** for clarity.

---

## Inheritance

- Inheritance is a superclass that is extended to smaller pieces that add or overwrite things.
- The structure of a code is around a class.
- Drawbacks: These drawbacks can be solved using composition
  - We have tight coupling problem which leads to the fragile base class problem. Change in base class leads to change in all the sub-classes.
  - We have Hierarchy problem. lest assume we don't want the subclass to have all the methods and properites of the parent class, but hey we can't avoid it in inheritance.

## Composition

- Composition is smaller pieces combined to create something bigger. We can use compose to combine two or more functions to create another function.
- The structure of a code is around what it does to data.
- Composition is going to help us create code or software that is more stable as well as easier to change in the future.

---

## Summary Comparison

| Aspect            | OOP                           | FP                       |
| ----------------- | ----------------------------- | ------------------------ |
| Core Unit         | Object                        | Function                 |
| State             | Mutable                       | Immutable                |
| Style             | Imperative                    | Declarative              |
| Side Effects      | Allowed                       | Avoided                  |
| Reusability       | Inheritance/Polymorphism      | Composition              |
| Ideal For         | Modeling complex entities     | Data transformation      |
| Language Examples | Java, C++, Python, JavaScript | Haskell, Elm, JavaScript |

---

> In real-world JavaScript projects, developers often combine both OOP and FP techniques to get the best of both worlds.
