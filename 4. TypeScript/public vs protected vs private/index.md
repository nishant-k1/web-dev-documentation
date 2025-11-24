# Access Modifiers in TypeScript (Sorted by Accessibility)

Access level:  
**public → protected → private**

---

## ✅ 1. `public` (Most Accessible)

### Meaning:

Accessible from **anywhere**.

### Where it can be accessed:

- Inside the class ✅
- Inside subclasses ✅
- Outside the class ✅

Example:

```ts
class Person {
  public name = "Nishant";
}

const p = new Person();
console.log(p.name); // ✅ Allowed everywhere
```

---

## ✅ 2. `protected` (Moderately Accessible)

### Meaning:

Accessible inside the class **and** its subclasses,  
but **not accessible from outside**.

### Where it can be accessed:

- Inside the class ✅
- Inside subclasses ✅
- Outside the class ❌

Example:

```ts
class Animal {
  protected type = "mammal";
}

class Dog extends Animal {
  bark() {
    console.log(this.type); // ✅ Allowed
  }
}

const d = new Dog();
d.type; // ❌ Not allowed
```

---

## ✅ 3. `private` (Least Accessible)

### Meaning:

Accessible **only** inside the same class.  
Not accessible from subclasses or outside.

### Where it can be accessed:

- Inside the class ✅
- Inside subclasses ❌
- Outside the class ❌

Example:

```ts
class BankAccount {
  private balance = 1000;

  private calculateInterest() {
    return this.balance * 0.05;
  }
}

const acc = new BankAccount();
acc.balance; // ❌ Not allowed
acc.calculateInterest(); // ❌ Not allowed
```

---

## ✅ Summary Table (Sorted)

| Access Modifier | Class | Subclass | Outside |
| --------------- | ----- | -------- | ------- |
| **public**      | ✅    | ✅       | ✅      |
| **protected**   | ✅    | ✅       | ❌      |
| **private**     | ✅    | ❌       | ❌      |
