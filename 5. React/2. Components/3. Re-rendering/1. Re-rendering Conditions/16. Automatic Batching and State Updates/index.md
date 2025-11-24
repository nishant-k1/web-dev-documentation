# Stale State, Automatic Batching and State Updates

## What is Batching?

Batch literal meaning is: `arrange (things) in sets or groups`.

**Batching** is React's optimization technique where multiple state updates are grouped together and processed in a single re-render, instead of triggering separate re-renders for each update.
React bundles multiple state updates into a single render to reduce unnecessary work.
Batching is simply: “React waits to render until all state updates finish.”

1. React batches updates inside event handlers.
2. State does NOT update immediately.
3. All updates read the same stale state unless you use prev.
4. After batching ends, all updates are applied once, then one render happens.

```sql
When you call:

`setState(state + 1)`

React does NOT do:

❌ update the state now
❌ trigger a render now

React does this:

✔️ pushes an update into a queue
✔️ marks the component as "needs re-render"
✔️ waits until your event handler finishes

This is why you still see the old state inside the same render cycle.
```

React does not update state immediately because that would break the render purity, destroy performance, and make logic unpredictable.
Instead, React queues updates and applies them after the render cycle finishes.

This is how batching works,
`**This is why state is stale inside the event handler,**`
This is why prev => prev + 1 solves it,
This is why React behaves consistently.

Batching = combining multiple updates into one render
🔹 It does NOT change update order
🔹 It does NOT affect correctness
🔹 It ONLY improves performance
🔹 It became unified + consistent in React 18
🔹 You NEVER need to disable it in normal apps

If you understand this, you understand batching completely.

## How React's Update Queue Works

Understanding the update queue is crucial for understanding batching and state updates.

### Update Queue Mechanism

When you call `setState()`, React doesn't immediately update state. Instead:

1. **React queues the update** in an internal update queue
2. **React marks the component** as needing a re-render
3. **React waits** until the current synchronous code finishes
4. **React processes all queued updates** in order
5. **React performs one re-render** with the final state

```sql
setState(value) → Add to queue → Mark dirty → Wait → Process queue → Re-render
```

### Normal Updates in the Queue

```jsx
const [count, setCount] = useState(0);

// In an event handler:
setCount(count + 1); // Queue: [1]
setCount(count + 1); // Queue: [1, 1] (both use stale count = 0)
setCount(count + 1); // Queue: [1, 1, 1] (all use stale count = 0)

// After handler finishes:
// Process queue: last value wins → count = 1
// Re-render: 1 time
```

**Key point:** Normal updates store **computed values** in the queue, and all computations use the same stale state from the current render.

### Functional Updates in the Queue

```jsx
const [count, setCount] = useState(0);

// In an event handler:
setCount((prev) => prev + 1); // Queue: [(prev) => prev + 1]
setCount((prev) => prev + 1); // Queue: [(prev) => prev + 1, (prev) => prev + 1]
setCount((prev) => prev + 1); // Queue: [fn, fn, fn]

// After handler finishes:
// Process queue sequentially:
//   fn(0) → 1
//   fn(1) → 2
//   fn(2) → 3
// Final: count = 3
// Re-render: 1 time
```

**Key point:** Functional updates store **functions** in the queue. When processed, React passes the result of the previous update as `prev` to the next function.

### Queue Processing vs Batching

These are separate but related concepts:

- **Update Queue**: Where React stores pending state updates
- **Batching**: The optimization that groups multiple queue processing cycles into one render

```sql
Without Batching (React 17, outside event handlers):
Update → Process queue → Render
Update → Process queue → Render
Update → Process queue → Render

With Batching (React 18, everywhere):
Update → Queue
Update → Queue
Update → Queue
→ Process all queues → Single render
```

### Visual Representation

```jsx
function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setCount(count + 1); // Queue update #1
    setCount(count + 1); // Queue update #2
    setFlag(true); // Queue update #3
    console.log(count); // Still 0 (not processed yet)
    // Handler ends → React processes queue → Single render
  };
}
```

**Timeline:**

```text
t0: handleClick starts
t1: setCount(count + 1) → queue [1]
t2: setCount(count + 1) → queue [1, 1]
t3: setFlag(true) → queue [1, 1, true]
t4: handleClick ends
t5: React processes queue → count = 1, flag = true
t6: React re-renders once
```

## Automatic Batching and State Updates (before and after React 18)

React 18 only changed the number of renders (batched vs not batched),
NOT the stale-state logic.

🔥 If you want to actually get “3”, you MUST use:

```jsx
setState(prev => prev + 1);
setState(prev => prev + 1);
setState(prev => prev + 1);

That gives:

0 → 1 → 2 → 3
```

## React 18: Automatic Batching

In **React 18**, React automatically batches state updates in **all** event handlers, promises, timeouts, and native event handlers.

```sql
You call multiple setState()
↓
React collects them
↓
React runs ONE render at the end
↓
UI updates once

```

React applies state updates sequentially, even inside a batch.

```js
setCount((c) => c + 1);
setCount((c) => c + 1);
setCount((c) => c + 1);

<!-- count increases by 3 (NOT 1) -->
```

### Before React 18 (No Automatic Batching)

```js
function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setCount((c) => c + 1); // Re-render 1
    setFlag((f) => !f); // Re-render 2
    // Total: 2 re-renders ❌
  };

  return (
    <button onClick={handleClick}>
      Count: {count}, Flag: {flag}
    </button>
  );
}
```

**Behavior:**

- Each `setState` call triggered a separate re-render
- Total: **2 re-renders** for 2 state updates

### React 18 (Automatic Batching)

```js
function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    setCount((c) => c + 1); // Batched
    setFlag((f) => !f); // Batched
    // Total: 1 re-render ✅
  };

  return (
    <button onClick={handleClick}>
      Count: {count}, Flag: {flag}
    </button>
  );
}
```

**Behavior:**

- Both state updates are **automatically batched**
- Total: **1 re-render** for 2 state updates ✅

## Where Batching Happens

### ✅ Automatically Batched (React 18+)

1. **Event Handlers**

   ```js
   function Component() {
     const [count, setCount] = useState(0);
     const [name, setName] = useState("John");

     const handleClick = () => {
       setCount((c) => c + 1); // Batched
       setName("Jane"); // Batched
       // Single re-render ✅
     };
   }
   ```

2. **Promises**

   ```js
   function Component() {
     const [count, setCount] = useState(0);
     const [flag, setFlag] = useState(false);

     const handleAsync = async () => {
       await fetch("/api/data");
       setCount((c) => c + 1); // Batched
       setFlag((f) => !f); // Batched
       // Single re-render ✅
     };
   }
   ```

3. **Timeouts**

   ```js
   function Component() {
     const [count, setCount] = useState(0);
     const [flag, setFlag] = useState(false);

     const handleTimeout = () => {
       setTimeout(() => {
         setCount((c) => c + 1); // Batched
         setFlag((f) => !f); // Batched
         // Single re-render ✅
       }, 1000);
     };
   }
   ```

4. **Native Event Handlers**

   ```js
   function Component() {
     const [count, setCount] = useState(0);
     const [flag, setFlag] = useState(false);

     useEffect(() => {
       const handleResize = () => {
         setCount((c) => c + 1); // Batched
         setFlag((f) => !f); // Batched
         // Single re-render ✅
       };
       window.addEventListener("resize", handleResize);
       return () => window.removeEventListener("resize", handleResize);
     }, []);
   }
   ```

## Multiple State Updates in Same Function

```js
function Component() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  const handleClick = () => {
    setA(1); // Batched
    setB(2); // Batched
    setC(3); // Batched
    // All 3 updates → Single re-render ✅
  };
}
```

## Functional Updates and Batching

Functional updates work correctly with batching and **DO chain sequentially**:

```js
function Component() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((c) => c + 1); // c = 0 → returns 1
    setCount((c) => c + 1); // c = 1 → returns 2
    setCount((c) => c + 1); // c = 2 → returns 3
    // Result: count = 3 ✅ (all batched into single render)
  };
}
```

**How it works:**

1. React queues all functional updates
2. Processes them **sequentially** (even within a batch)
3. Each functional update receives the result of the previous one
4. After processing all updates, React performs **one re-render**

```sql
Update Queue Processing:
setCount((c) => c + 1) → prev = 0, result = 1
setCount((c) => c + 1) → prev = 1, result = 2
setCount((c) => c + 1) → prev = 2, result = 3
Final state: 3
Re-renders: 1 (batched)
```

**Key point:** Batching groups multiple updates into one render, but functional updates still process sequentially within that batch, using the result of the previous update as input.

## useReducer and Batching

```js
function Component() {
  const [state, dispatch] = useReducer(reducer, { count: 0, flag: false });

  const handleClick = () => {
    dispatch({ type: "increment" }); // Batched
    dispatch({ type: "toggle" }); // Batched
    // Single re-render ✅
  };
}
```

## When Batching Doesn't Happen

### ❌ Outside Event Handlers (React 17 and earlier)

In React 17, batching only happened in React event handlers:

```js
// React 17: NOT batched
setTimeout(() => {
  setCount((c) => c + 1); // Re-render 1
  setFlag((f) => !f); // Re-render 2
}, 1000);

// React 18: Batched ✅
setTimeout(() => {
  setCount((c) => c + 1); // Batched
  setFlag((f) => !f); // Batched
}, 1000);
```

### ❌ FlushSync (Opting Out of Batching)

You can opt out of batching using `flushSync`:

```js
import { flushSync } from "react-dom";

function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const handleClick = () => {
    flushSync(() => {
      setCount((c) => c + 1); // Re-render 1 (immediate)
    });
    setFlag((f) => !f); // Re-render 2 (separate)
    // Total: 2 re-renders
  };
}
```

**Use case:** When you need DOM updates to be synchronous (e.g., measuring DOM after update).

## Benefits of Batching

### 1. Performance

- **Fewer re-renders** = Better performance
- **Less DOM manipulation** = Faster UI updates
- **Reduced computation** = Smoother animations

### 2. Consistency

- All state updates in a batch see the **same previous state**
- Prevents intermediate inconsistent states
- Ensures UI reflects final state

### 3. Predictability

- State updates are grouped logically
- Easier to reason about component behavior
- Fewer race conditions

## Example: Multiple Updates

```js
function Component() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("John");
  const [age, setAge] = useState(30);

  const handleUpdate = () => {
    setCount(1); // Batched
    setName("Jane"); // Batched
    setAge(31); // Batched
    // All 3 updates → Single re-render ✅
  };

  console.log("Render"); // Logs once per click ✅
}
```

## Batching with useEffect

```js
function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setCount((c) => c + 1); // Batched
    setFlag((f) => !f); // Batched
    // Single re-render ✅
  }, []);
}
```

## Summary

- **React 18 automatically batches** state updates in event handlers, promises, timeouts, and native event handlers
- **Multiple state updates** in the same function → **Single re-render**
- **Functional updates** see the previous value in the batch
- **Use `flushSync`** to opt out of batching when needed
- **Batching improves performance** by reducing re-renders
- **Batching ensures consistency** by grouping related updates

## FAQs

1. **In the below example**

   ```jsx
   const [state, setState] = useState(0);

   setState(state + 1);
   setState(state + 1);
   setState(state + 1);
   ```

   - Does state become 1 after the first call?
   - Does React update state three times?
   - Why does the final state not become 3?
   - Does the component re-render in between?
   - What does batching actually do?

   setState does NOT update the state immediately. It queues an update.
   So, on the first setState call `setState(state + 1);` state does NOT become 1 yet.

   ```sql
   Update #1: set state to 1
   Update #2: set state to 1
   Update #3: set state to 1
   ```

2. **Does batching prevent state from updating until the end?**

   Yes. That is the entire point of batching:

   - collect updates
   - compute once
   - render once

3. **WHY Functional Updates Work (prev → prev + 1)?**

   Because now React doesn’t use the stale value. It uses the queue, like this:

   - prev = 0 → 1
   - prev = 1 → 2
   - prev = 2 → 3

   That's why this becomes 3:

## React was NOT "impure" or "inconsistent" before React 18

Before React 18

In places outside React event handlers, like:

1. `setTimeout`
2. `setInterval`
3. `Promise.then`
4. `async/await`
5. `fetch().then`

React did NOT batch updates.

Before React 18, React batched state updates only inside its own event handlers.
Outside them—like in setTimeout or promises—updates caused multiple re-renders.
React 18 unified batching everywhere, making the behavior consistent.
But React has never applied state updates immediately; it always queued them.

React was ALWAYS consistent in the way it designed batching…
but batching rules were different before React 18.

✔️ Before React 18

React batched only inside React event handlers, not in:

setTimeout

setInterval

Promises

async/await

fetch callbacks

native DOM events

✔️ After React 18

React batches everything, everywhere.
