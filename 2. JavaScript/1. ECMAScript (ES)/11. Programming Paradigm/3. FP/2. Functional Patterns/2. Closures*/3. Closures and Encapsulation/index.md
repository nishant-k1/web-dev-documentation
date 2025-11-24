# Closures and Encapsulation

## Encapsulation

```javascript
const makeNuclearButton = () => {
  let timeWithoutDestruction = 0;
  const passTime = () => timeWithoutDestruction++;
  const totalPeaceTime = () => timeWithoutDestruction;
  const launch = () => {
    timeWithoutDestruction = -1;
    return "*";
  };
  setInterval(passTime, 1000);
  return {
    // launch: launch, // hidding of information
    totalPeaceTime: totalPeaceTime,
  };
};
const ohno = makeNuclearButton();
ohno.totalPeaceTime();
// ohno.passTime();
```
