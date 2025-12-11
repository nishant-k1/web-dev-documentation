# ✔️ Normal updates use the state value from the CURRENT render (stale closure)

✔️ Normal updates use the state value from the CURRENT render (stale closure).
✔️ Functional updates use the state value from the UPDATE QUEUE (always fresh)

Normal updates capture state from the current render and can become stale.
Functional updates receive the latest state value from React’s update queue and therefore never become stale.

**If the next state depends on the previous one, you must use an updater function.**

## 1. NORMAL UPDATE/Direct Value Update (stale closure): `setState(state + 1);`

❗ Where does state come from?
From the closure of the current render.
During a click handler, timeout, async callback, etc:

`const state inside this render is frozen.`

So if state was 0 during render #1,
it will ALWAYS be 0 inside that callback.

So:

```js
setState(state + 1);
setState(state + 1);
setState(state + 1);
```

All see state = 0.

So React receives:

```js
setState(1);
setState(1);
setState(1);
```

Final value = 1

Normal updates DO NOT chain.
They do NOT use the latest state.
They simply override each other.

```js
// Normal Update

Render #1
 state = 0

setState(state + 1) → uses 0
setState(state + 1) → uses 0
setState(state + 1) → uses 0

Final = 1

```

## 2. FUNCTIONAL UPDATE/Updater Function (fresh state every time): `setState(prev => prev + 1)`

**If the next state depends on the previous one, you must use an updater function.**

```js
setState((prev) => prev + 1);
```

Where does prev come from?
From the React update queue, NOT from the closure.

```js
setState((prev) => prev + 1); // prev = 0 → 1
setState((prev) => prev + 1); // prev = 1 → 2
setState((prev) => prev + 1); // prev = 2 → 3
```

Functional updates:

- DO NOT use stale closures
- DO NOT use old state
- DO use the latest computed state from the queue
- ALWAYS produce correct cumulative updates

Final value = 3
Functional updates NEVER produce stale state.

```js
Functional Update
Queue:
 prev = 0 → 1
 prev = 1 → 2
 prev = 2 → 3

Final = 3
```

## WHY DOES REACT NEED TWO UPDATE MODES: Functional and Normal

🔹 Normal updates → designed for simple “replace state”
🔹 Functional updates → designed for “derive next state from previous state”

React gives both because state can be:

- updated independently
- OR updated based on previous value (increment counters, toggles, etc.)

## WHERE NORMAL UPDATES/Direct Value Update FAIL (STALENESS)

- batching is active
- you're inside a timeout
- you're inside a promise
- you're inside an event handler that runs multiple times
- you call setState multiple times
- your update depends on previous state

Because state is from an old render.

## WHERE FUNCTIONAL UPDATES/ UPDATER FUNCTION ALWAYS WORK

- React is batching
- state is updated 3–10–50 times
- updates are async
- closures are stale
- you're inside timeout, promise, async/await
- you’re doing count + 1, toggles, accumulations

Functional updates ALWAYS use latest state from the update queue.

## Functional Updates/ Updater Function vs Normal Updates/Direct Value Update

| Update Type                  | What It Uses       | Stale? | Chains? | Correct for counters? |
| ---------------------------- | ------------------ | ------ | ------- | --------------------- |
| `setState(state + 1)`        | old render state   | ❌ Yes | ❌ No   | ❌ No                 |
| `setState(prev => prev + 1)` | fresh queued state | ✔️ No  | ✔️ Yes  | ✔️ Yes                |

## Stale State Example

```js
import React from "react";

export function App(props) {
  const [count, setCount] = React.useState(0);

  function handleClick() {
    setTimeout(() => {
      setCount(count + 1);
      setCount(count + 1);
      setCount((prev) => prev + 1);
      setCount((prev) => prev + 1);
      console.log("Inner Updated to:", count);
    }, 2000);
  }
  console.log("Outer Updated to:", count);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment after 2 sec</button>
    </div>
  );
}
```
