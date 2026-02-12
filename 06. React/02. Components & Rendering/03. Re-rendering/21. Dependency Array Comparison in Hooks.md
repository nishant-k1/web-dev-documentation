# Dependency Array Comparison in Hooks

## How React Compares Dependencies

React uses **`Object.is()`** (reference equality) to compare each dependency in the dependency array of `useEffect`, `useMemo`, and `useCallback`.

## Basic Behavior

```js
useEffect(() => {
  // Effect code
}, [dependency1, dependency2, dependency3]);
```

React compares each dependency individually:

```js
// React's internal check (simplified):
for (let i = 0; i < dependencies.length; i++) {
  if (!Object.is(previousDeps[i], currentDeps[i])) {
    // At least one dependency changed → Run effect
    runEffect();
    return;
  }
}
// All dependencies are same → Skip effect
```

## useEffect Dependency Comparison

### Primitive Dependencies

```js
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  
  useEffect(() => {
    console.log('Effect ran');
  }, [count, name]);
  
  // count changes from 0 to 1 → Effect runs ✅
  // name changes from 'John' to 'Jane' → Effect runs ✅
  // count stays 0, name stays 'John' → Effect doesn't run ✅
}
```

**Behavior:**
- Primitives are compared by value using `Object.is()`
- If any primitive value changes → effect runs
- If all primitive values stay same → effect doesn't run

### Object/Array Dependencies

```js
function Component() {
  const [user, setUser] = useState({ name: 'John', age: 30 });
  
  useEffect(() => {
    console.log('Effect ran');
  }, [user]);
  
  // ❌ PROBLEM: New object every render
  setUser({ name: 'John', age: 30 }); // Different reference → Effect runs!
}
```

**Problem:**
- Even with same values, new object = different reference
- `Object.is(oldUser, newUser)` → `false`
- **Effect runs on every render!** ❌

### ✅ Solution: Memoize Dependencies

```js
function Component() {
  const [user, setUser] = useState({ name: 'John', age: 30 });
  
  // ✅ GOOD: Memoize user object
  const memoizedUser = useMemo(() => user, [user.name, user.age]);
  
  useEffect(() => {
    console.log('Effect ran');
  }, [memoizedUser]);
  
  // Only runs when user.name or user.age actually changes ✅
}
```

**Or use specific properties:**

```js
useEffect(() => {
  console.log('Effect ran');
}, [user.name, user.age]); // Compare primitives, not object
```

## useMemo Dependency Comparison

```js
const memoizedValue = useMemo(
  () => {
    // Expensive calculation
    return expensiveFunction(a, b);
  },
  [a, b] // Dependencies
);
```

**Behavior:**
- React compares `a` and `b` using `Object.is()`
- If `a` or `b` changes → recalculate
- If both stay same → return cached value

### Example: Object Dependency

```js
function Component() {
  const [config, setConfig] = useState({ theme: 'light', lang: 'en' });
  
  // ❌ BAD: New object every render
  const processed = useMemo(
    () => processConfig(config),
    [config] // config is new object every render → always recalculates!
  );
  
  // ✅ GOOD: Use specific properties
  const processed = useMemo(
    () => processConfig(config),
    [config.theme, config.lang] // Compare primitives
  );
  
  // ✅ ALSO GOOD: Memoize config
  const memoizedConfig = useMemo(() => config, [config.theme, config.lang]);
  const processed = useMemo(
    () => processConfig(memoizedConfig),
    [memoizedConfig]
  );
}
```

## useCallback Dependency Comparison

```js
const memoizedCallback = useCallback(
  () => {
    // Callback code
  },
  [dependency1, dependency2]
);
```

**Behavior:**
- React compares each dependency using `Object.is()`
- If any dependency changes → create new function
- If all dependencies stay same → return cached function

### Example: Function Dependencies

```js
function Component() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'John' });
  
  // ❌ BAD: New function every render
  const handleClick = useCallback(() => {
    console.log(user.name);
  }, [user]); // user is new object → new function every render!
  
  // ✅ GOOD: Use specific property
  const handleClick = useCallback(() => {
    console.log(user.name);
  }, [user.name]); // Compare primitive
  
  // ✅ ALSO GOOD: Memoize user
  const memoizedUser = useMemo(() => user, [user.name]);
  const handleClick = useCallback(() => {
    console.log(memoizedUser.name);
  }, [memoizedUser]);
}
```

## Multiple Dependencies

React compares **all dependencies** - if **any** dependency changes, the effect/callback runs:

```js
useEffect(() => {
  console.log('Effect ran');
}, [a, b, c]);

// React checks:
// Object.is(prevA, currA) && Object.is(prevB, currB) && Object.is(prevC, currC)
// If ALL are true → Skip effect
// If ANY is false → Run effect
```

### Example

```js
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('John');
  const [user, setUser] = useState({ age: 30 });
  
  useEffect(() => {
    console.log('Effect ran');
  }, [count, name, user]);
  
  // count changes → Effect runs ✅
  // name changes → Effect runs ✅
  // user changes (new reference) → Effect runs ✅
  // Only count changes, name and user stay same → Effect runs ✅ (because count changed)
  // All stay same → Effect doesn't run ✅
}
```

## Empty Dependency Array

```js
useEffect(() => {
  console.log('Effect ran');
}, []); // Empty array
```

**Behavior:**
- No dependencies to compare
- Effect runs **only once** on mount
- Never runs again (unless component unmounts/remounts)

## Missing Dependency Array

```js
useEffect(() => {
  console.log(count); // Uses count
}); // No dependency array
```

**Behavior:**
- Effect runs **on every render**
- React doesn't track dependencies
- **Warning:** React will warn about missing dependencies

## Common Mistakes

### ❌ Mistake 1: Object in Dependencies

```js
const [user, setUser] = useState({ name: 'John' });

useEffect(() => {
  console.log(user.name);
}, [user]); // ❌ New object every render → effect runs every render
```

### ❌ Mistake 2: Function in Dependencies

```js
const handleClick = () => {
  console.log('clicked');
};

useEffect(() => {
  handleClick();
}, [handleClick]); // ❌ New function every render → effect runs every render
```

### ❌ Mistake 3: Array in Dependencies

```js
const items = [1, 2, 3];

useEffect(() => {
  console.log(items.length);
}, [items]); // ❌ New array every render → effect runs every render
```

### ✅ Correct Patterns

```js
// Use specific properties
useEffect(() => {
  console.log(user.name);
}, [user.name]); // ✅ Compare primitive

// Memoize objects/arrays
const memoizedUser = useMemo(() => user, [user.name, user.age]);
useEffect(() => {
  console.log(memoizedUser);
}, [memoizedUser]); // ✅ Stable reference

// Use useCallback for functions
const handleClick = useCallback(() => {
  console.log('clicked');
}, []); // ✅ Stable reference
useEffect(() => {
  handleClick();
}, [handleClick]); // ✅ Same function reference
```

## Dependency Comparison Rules

| Dependency Type | Comparison Method | Changes When |
|----------------|-------------------|--------------|
| Primitive (string, number, boolean) | Value (`Object.is()`) | Value changes |
| Object | Reference (`Object.is()`) | Reference changes |
| Array | Reference (`Object.is()`) | Reference changes |
| Function | Reference (`Object.is()`) | Reference changes |
| `undefined` | Value (`Object.is()`) | Always same |
| `null` | Value (`Object.is()`) | Always same |

## Edge Cases

### NaN in Dependencies

```js
const [value, setValue] = useState(NaN);

useEffect(() => {
  console.log('Effect ran');
}, [value]);

setValue(NaN); // Same NaN → Effect doesn't run ✅ (Object.is(NaN, NaN) === true)
setValue(Number('invalid')); // Different NaN → Effect runs ❌ (Actually, Object.is handles NaN correctly)
```

### +0 vs -0

```js
const [value, setValue] = useState(+0);

useEffect(() => {
  console.log('Effect ran');
}, [value]);

setValue(-0); // Different from +0 → Effect runs ✅ (Object.is(+0, -0) === false)
```

## Summary

- **React uses `Object.is()`** to compare each dependency individually
- **All dependencies must be same** for effect/callback to skip
- **Any dependency change** triggers effect/callback
- **Primitives** are compared by value
- **Objects/arrays/functions** are compared by reference
- **Always use specific properties** or **memoize** object/array dependencies
- **Empty array `[]`** means "run once on mount"
- **Missing array** means "run on every render"

