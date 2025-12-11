# Lifecycle in Function Components

- In functional components, React Hooks like useEffect are used to manage side effects and replace lifecycle methods.
- In functional components, lifecycle methods from class components are replaced with React Hooks, primarily the useEffect hook.
- Functional components don’t have explicitly defined phases like "Mounting," "Updating," or "Unmounting," you can achieve equivalent behavior by leveraging hooks.

  1. `Mounting` and `Updating` (combined):
     ![alt text](image.png)

  2. `Mounting` only:
     ![alt text](image-1.png)

  3. `Unmounting`
     ![alt text](image-2.png)

![alt text](image-3.png)

## Lifecycle methods in Functional Components with Hooks equivalent to class components

1. Mounting Phase
   ![alt text](image-4.png)

   - constructor()

     1. Initialize state using useState or useReducer in functional components.
        ![alt text](image-8.png)
     2. Bind event handlers (unnecessary in functional components as they use closures).

   - static getDerivedStateFromProps()

     1. Sync state with props if needed by deriving it manually.
     2. This pattern is rare and generally discouraged.
        ![alt text](image-9.png)

   - componentDidMount()
     1. Perform side effects like fetching data or setting up subscriptions with useEffect.
     2. The empty dependency array [] ensures the effect runs only once after the component mounts.
        ![alt text](image-10.png)

2. Updating Phase
   ![alt text](image-5.png)

   - shouldComponentUpdate()

     1. Use React.memo to prevent unnecessary re-renders for pure functional components.
     2. For more control, implement comparison logic manually.
        ![alt text](image-11.png)

   - getSnapshotBeforeUpdate()

     1. Capture data like scroll position or DOM state just before the DOM is updated.
     2. Achieve this within useEffect with cleanup or prior states.
        ![alt text](image-12.png)

   - componentDidUpdate()
     1. Use useEffect with dependencies to respond to updates.
     2. Example: Fetch new data when props.id changes.
        ![alt text](image-13.png)

3. Unmounting Phase
   ![alt text](image-6.png)
   - componentWillUnmount()
     1. Perform cleanup (like canceling timers or unsubscribing from listeners) in the cleanup function of useEffect.
        ![alt text](image-14.png)

## Summary Mapping Table for lifecycle methods (Class to Functional Components)

![alt text](image-15.png)

## Example: Full Lifecycle in Functional Component

![alt text](image-7.png)
