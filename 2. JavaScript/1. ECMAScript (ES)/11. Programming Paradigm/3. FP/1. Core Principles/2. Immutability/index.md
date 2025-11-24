# Immutability

- It means not changing the data/state.

```javascript
const obj = { name: "Andrei" };
function clone(obj) {
  return { ...obj }; // this is pure. no mutatation is happening to obj, instad new clone of obj has been created.
}
obj.name = "Nana"; // mutation is happeinig to obj
```
