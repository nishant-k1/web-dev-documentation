# Stale State in React

- `The main and only fundamental cause of stale state in React is JavaScript closures`. Everything else (event handlers, effects, async callbacks, timers, memoized functions) is just a scenario where closures appear.

- You are reading an old/outdated value of a state variable because your function captured the value from a previous render, not the latest one.
- React state updates are asynchronous and render-based, so if you use a state value inside a callback, closure, or async operation, you might end up using the old value.

[Closures Explanation](<../../../../2.%20JavaScript/1.%20ECMAScript%20(ES)/10.%20Execution%20Context/3.%20Components%20of%20Execution%20Context/2.%20Lexical%20Environment%20(Resolving%20Variables)/2.%20Closures/index.md>)

## Main Cause of Stale State = Closures

Everything else (event handlers, effects, async callbacks, timers, memoized functions) is just a scenario where closures appear.

There is ONE root cause, and it is:

A callback “remembers” the state value from the render in which it was created.

This “remembering” = closure.

Why closures cause stale state
Because every React render creates a new snapshot of state.

```js
Render 1 → count = 0
Render 2 → count = 1
Render 3 → count = 2

```

If you create a callback during Render 1, it captures: `count = 0`

Even if renders 2 and 3 happen later, the callback still points to Render 1’s snapshot.
➡️ That outdated snapshot = stale state.

React does NOT cause stale state.
React simply re-renders and creates new snapshots.

The stale behavior happens because:

1. Closures capture variables at a moment in time
2. React re-renders and creates fresh snapshots
3. Old closures still reference old snapshots

That's it.

1. **When does state become stale, why does it become stale, and how does React make it stale?**

   `State becomes stale in ANY code that runs after the render has finished.`

   This includes:

   1. event handlers
   2. setTimeout
   3. setInterval
   4. Promise.then
   5. async/await
   6. fetch().then
   7. native DOM listeners
   8. callbacks passed to external libraries
   9. any function stored in closures

   All of these capture the state value from the render during which they were created.

   In React A closure means: Your event handler “remembers” the value of state at the time it was created.
   So:

   - If state was 0 during the render,
   - Every callback created in that render captures state = 0,
   - Even if state LATER becomes 10,
     the callback’s remembered value is still 0

   ➡️ THAT is stale state.

2. **EXACT CAUSE OF STALE STATE**

   ✔️ Reason #1 — JavaScript closures
   Functions capture variables from the moment they were defined.
   ✔️ Reason #2 — React does NOT re-create event handlers unless the component re-renders
   So handlers keep old references.
   ✔️ Reason #3 — React NEVER mutates state

   State is immutable.
   Every render gets a fresh copy of state.

   So any old closure keeps the old state snapshot.

3. **What does “stale” actually mean?**
   Let’s say:

   ```jsx
   const [count, setCount] = useState(0);

   useEffect(() => {
     setTimeout(() => {
       console.log(count);
     }, 1000);
   }, []);
   ```

   Even if the user increments count to 10 before the timeout fires
   The console.log(count) prints 0, because:

   - effect ran on mount
   - closure captured count = 0
   - timeout callback uses that old closure
   - next renders do NOT update old closures
   - therefore → stale count

   Stale state happens because the callback belongs to an old render.
   React gives each render its own frozen snapshot of props and state.
   Each render has its own snapshot of state.

   When React renders a component, it does:

   ```sql
      Render #1 snapshot
      {
        state: 0
      }

      Render #2 snapshot
      {
        state: 1
      }

      Render #3 snapshot
      {
        state: 2
      }
   ```

4. **WHEN EXACTLY DOES STATE REMAIN STALE?**

   1. Inside event handlers

      1. Eg1:

         ```jsx
         const [value, setValue] = useState(0);

         function handleClick() {
           console.log("Clicked with value:", value);
         }

         setValue(10);
         // handleClick still uses stale value from old render
         ```

      2. Eg2:

         ```jsx
         import React from "react";
         export function App(props) {
           const [state, setState] = React.useState(0);
           const handleClick = (e) => {
             e.preventDefault();
             setState(count + 1);
           };
           return (
             <div className="App">
               <h1>{state}</h1>
               <h2>Start editing to see some magic happen!</h2>
               <button
                 onClick={handleClick}
                 style={{ cursor: "pointer", marginBottom: "48px" }}
               >
                 +
               </button>
             </div>
           );
         }
         console.log("Hello console");
         ```

   2. Inside timeouts (setTimeout / setInterval)
   3. Inside promises
   4. Inside async/await (after the await)
   5. Inside refs to callbacks
   6. Inside effects with empty deps ([])
   7. Inside memoized functions (useCallback([]))
   8. Inside memoized objects (useMemo([]))

5. **🔥 THE GOLDEN RULE OF STALE STATE**

   If the code runs LATER (not during the render),
   and the variable was captured during an older render,
   the state will be stale.

6. **SO HOW TO FIX STALE STATE?**

   1. **Use functional updates:** `setState(prev => prev + 1);`

      Functional updates receive the latest state from React's update queue, not from closures.

   2. **Use refs to always access fresh values:**

      ```js
      const countRef = useRef(count);

      // Update ref on every render
      useEffect(() => {
        countRef.current = count;
      });

      // Now closures can access fresh value
      setTimeout(() => {
        console.log(countRef.current); // Always fresh!
      }, 1000);
      ```

      **Why refs work:** Refs store values in a mutable object that persists across renders. You can read the `.current` property inside closures to get the latest value.

   3. **Use proper dependency arrays:** `useEffect(() => {...}, [state]);`

      This ensures the effect callback is recreated with fresh state when dependencies change.

   4. **Re-create callbacks with useCallback([state]) when needed.**

      ```js
      const handleClick = useCallback(() => {
        console.log(count); // Fresh value if count is in deps
      }, [count]);
      ```

7. **Why does state become stale?**

   “Because React renders components as pure functions.
   Each render creates its own snapshot of props and state.
   Closures created during that render keep the old snapshot forever,
   so any code that runs later uses stale values unless we use functional updates.”

## Is stale state caused by asynchronicity

NO, Async operations only expose stale state — they don’t cause it.

```js
setTimeout(() => console.log(count), 1000);
```

The closure captures count before React updates it.
The timer doesn’t cause stale state —
the closure inside the timer does.

## Is it caused by event handlers

No
Event handlers only store closures.

The stale value still comes from closure.

## Is it caused by React batching

No
Batching only affects when renders happen — closures cause stale state.

## One-Liner Definition

Stale state happens because React re-renders with new state snapshots,
but any callback created in an older render still holds a closure pointing to the old snapshot.

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
