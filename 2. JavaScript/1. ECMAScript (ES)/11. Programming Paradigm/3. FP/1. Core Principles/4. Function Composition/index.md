# compose and pipe

- it is an idea that any sort of composition that we do should be obvious.
- pipe is just reverse order of operation as in compose.
- we can choose whatever between compose and pipe base on our choice of readability.

```javascript
const compose = (f, g) => (data) => f(g(data));
const pipe = (f, g) => (data) => g(f(data));
const multiplyBy3 = (num) => num * 3;
const absolute = (num) => Math.abs(num);
const multiplyBy3AndAbsolute = compose(multiplyBy3, absolute);
multiplyBy3AndAbsolute(-50);
```
