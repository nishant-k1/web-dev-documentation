# Cleanup

- A cleanup is a function returned from the useEffect hook.
- React runs this function:
  1. Before the component unmounts (equivalent to componentWillUnmount).
  2. Before running the effect again if the dependencies of the effect have changed.

## When Are Cleanups Needed?

Cleanups are needed whenever your effect creates a resource or subscription that needs to be explicitly released. Examples include:

- Setting up intervals or timeouts.
- Adding event listeners to the DOM or external libraries.
- Subscribing to APIs or data streams (like WebSocket or Redux store).
- Fetching data with a cancellable promise or AbortController.

## How to Use Cleanup in useEffect

1. Basic Cleanup Example:

   ![alt text](image.png)

2. Cleanup When Dependencies Change:

   ![alt text](image-1.png)

## Key Points About Cleanups

1. When Does the Cleanup Run?

   - Before the component is removed from the DOM.
   - Before the useEffect callback is executed again (if dependencies have changed).

2. Why Use Cleanup

   - Prevent memory leaks (e.g., unsubscribing from events or clearing timers).
   - Avoid race conditions when updating state asynchronously.

3. Rules for Cleanups:
   - You must return a function from the useEffect callback for cleanup.
   - Do not call the cleanup function manually; React handles it automatically.

## Real-Life Use Cases of Cleaups

1. Event Listeners:
   ![alt text](image-2.png)

2. WebSocket Connections:
   ![alt text](image-3.png)

3. Aborting Fetch Requests:
   ![alt text](image-4.png)

## Common Cleanup Mistakes

1. Not Returning a Function:
   ![alt text](image-5.png)

2. Forgetting to Unsubscribe or Clear Resources:
   ![alt text](image-6.png)

## Cleanup Timing Recap

1. `Unmounting`:
   Cleanup runs just before the component is removed from the DOM.

2. `Re-execution`:
   Cleanup runs just before the effect re-runs due to dependency changes.
