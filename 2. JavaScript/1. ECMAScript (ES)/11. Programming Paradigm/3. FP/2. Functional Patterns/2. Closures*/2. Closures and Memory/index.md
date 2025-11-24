# Closures and Memory

## Memory efficient

- Closures are more memory efficient

```javascript
function heavyDuty(index) {
  const bigArray = new Array(7000).fill("smile");
  return bigArray[index];
}
heavyDuty(688);
// if we need to acess the same index element again and again then it's not memory efficient as we can see below
heavyDuty(688);
heavyDuty(688);
heavyDuty(688);
heavyDuty(688);

// using closures we can make it memory efficient
function heavyDutyEffcient() {
  const bigArray = new Array(7000).fill("smile");
  return function (index) {
    return bigArray[index];
  };
}
heavyDutyEffcient()(688);
```
