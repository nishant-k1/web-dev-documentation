# `useRef` in React

Hooks like `useRef` are tied to the lifecycle of a specific functional component execution.

## Combining `useRef` and Callback Ref?

The combination of `useRef` and a callback ref is common for managing multiple dynamic refs, such as in the case of handling multiple input elements. Here’s why:

- `useRef` provides a single container (e.g., `inputRefs.current`) to hold references.
- The callback ref (`ref={(el) => { ... }}`) ensures that the correct element is stored dynamically in the current array or object.

### Key Takeaway: Two Forms of `ref` in React

1. **Object Ref (via `useRef`)**

   - Automatically managed by React.
   - Persists across renders without causing re-renders.

2. **Callback Ref (`ref={(el) => { ... }}`)**
   - Manually managed by the developer.
   - Useful for handling dynamic refs when working with multiple elements.

#### Example: Combining `useRef` with Callback Ref

```jsx
const inputRefs = useRef([]);

return (
  {inputs.map((_, index) => (
    <input
      key={index}
      ref={(el) => { inputRefs.current[index] = el; }}
    />
  ))}
);
```

## `useRef` in HOCs

Each wrapped component gets its own `useRef` because each call to `withHorizontalScrollContainer` HOC produces a unique `EnhancedComponent` component function, and React separately executes that function for each component.

1. **`useRef` is instance-specific**:

   - Every time `withHorizontalScrollContainer` is applied to a new component, a new instance of the `EnhancedComponent` function is created.
   - Inside that new function instance, a new `useRef` hook is called, which creates a unique ref object for that specific instance.

   ![alt text](image.png)

   When you use `<ComponentA />` and `<ComponentB />`, they each have their own instance of `EnhancedComponent`.
   As a result, `horizontalScrollRef` is unique to `<ComponentA />` and `<ComponentB />`.

2. **Why the refs don’t overlap**:

   - The `horizontalScrollRef` object is scoped locally to each `EnhancedComponent` function.
   - Even though the same `withHorizontalScrollContainer` higher-order component is reused, the `ref` created by `useRef` inside it belongs only to that specific instance.

   `React.useRef` ensures that:

   - A unique reference object (`horizontalScrollRef`) is created for each invocation of the component.
   - The `horizontalScrollRef` object persists for the lifecycle of that specific component instance (i.e., as long as it remains in the React tree).
   - This behavior is what allows each wrapped component (e.g., `<EnhancedComponentA />` and `<EnhancedComponentB />`) to have its own unique ref.

   Each invocation of a functional component is a new execution context.
   Hooks like `useRef` or `useState` are scoped to that execution context.
   These hooks rely on React's internal mechanisms to "remember" their values for subsequent renders of that specific component.

## initializing a normal variable vs initializing useRef.current in a React component

Take an example of a normal variable like const count = 1, and countRef, countRef.current = 1 now Inside useEffect mutate both count += 1 and countRef.current += 1, since I'm not re-setting the state using useState in both cases, component is not going to render, but in both case mutation will happen when the dependency changes in the useEffect. Now let say component re-renders now, what will happen, I see count getting re-assigned the same previous value 1 again (mutated Value gone in the subsequent render), but the countRef.current, I will see value 2, the render did 't cause re-assignment to the countRef?

```js
const count = 1;
const countRef = useRef(1);

useEffect(() => {
  count += 1; // Mutates the variable
  countRef.current += 1; // Mutates the ref

  console.log("Inside useEffect:", count, countRef.current);
}, [dependency]); // Runs when `dependency` changes
```

Key Observations:

1. Component Doesn't Re-Render Automatically:

   - Since we're not using useState, mutating `count` or `countRef.current` does not trigger a re-render.

2. Behavior on Dependency Change (Inside useEffect):

   - `count` is mutated (count += 1), but since it's a normal variable, its value is lost on the next render.
   - `countRef.current` is also mutated (countRef.current += 1), but since refs persist across renders, the updated value remains.

3. What Happens on Re-Render?

![alt text](image-1.png)

- `count` gets reinitialized to 1 (its initial value), losing any mutations made in useEffect.
- `countRef.current` retains its mutated value because useRef persists across renders and is not reinitialized.

Thus, after a re-render:

- `count` resets to 1, discarding any previous mutations.
- `countRef.current` retains its mutated value (e.g., 2 if it was incremented once).

This demonstrates why refs are useful for preserving values across renders without causing re-renders, whereas normal variables reset on each render cycle.
