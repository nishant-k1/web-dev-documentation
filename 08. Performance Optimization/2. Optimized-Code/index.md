# To help javascript engine be careful with using these

eval()
arguments
for in
with
delete

## Inline Caching

```javascript
 const findUser () => `found ${user.firsName} $ {user.lastName}`
 const userData = {
    firstName: 'Johnson',
    lastName: 'Junior'
 }

findUser(userData) // due to inline caching (optimization techinque of compiler) it gets replaced by "Johnson Junior" instead of callilng find User function from next time
```

## Hidden Classes

```javascript

    const animal(x,y) => {
        this.x = x;
        this.y = y;
    }

   const obj1 = new Animal(1,2);
   const obj2 = new Animal(3,4);

   obj1.a = 30;
   obj1.b = 100;
   obj2.b = 30;
   obj2.a = 100;
```

Conslusion:

- We should write code which is predictable not just for humans for machines as well.
- Our code should follow dry principle.
