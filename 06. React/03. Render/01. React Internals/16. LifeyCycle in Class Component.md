# Lifecycle in Class Components

In class components, lifecycle methods are explicitly defined. Here's a breakdown of these phases:

1. **Mounting Phase**

   - Occurs when the component is initialized and added to the DOM. The following methods are called:
   - Methods:

     1. `constructor()`:

        - Invoked before the component is mounted.
        - Used for initializing state and binding methods.
          ![alt text](image-4.png)

     2. static getDerivedStateFromProps(props, state):

        - Invoked just before rendering.
        - Rarely used; syncs state with props.

     3. render():

        - Renders the JSX to the DOM.
        - Must be a pure function.

     4. `componentDidMount()`:
        - Called after the component is mounted.
        - Ideal for fetching data, setting up subscriptions, or DOM manipulations.
          ![alt text](image-3.png)

2. **Updating**

   - Occurs when the component's state or props change. The following methods are called:
   - Methods:

     1. static getDerivedStateFromProps(props, state):

        - Invoked on every update.
        - Used for rare cases to sync state with props.

     2. `shouldComponentUpdate(nextProps, nextState)`:

        - Determines if the component should re-render.
        - Useful for performance optimizations.
          ![alt text](image-2.png)

     3. render():

        - Re-renders the component.

     4. getSnapshotBeforeUpdate(prevProps, prevState):

        - Captures information (e.g., scroll position) before the DOM updates.

     5. `componentDidUpdate(prevProps, prevState, snapshot)`:
        - Invoked after the DOM is updated.
        - Ideal for network requests based on updated props or state.
          ![alt text](image-1.png)

3. **Unmounting Phase**

   - Occurs when the component is removed from the DOM.
   - Methods:
     1. `componentWillUnmount()`:
        - Used for cleanup tasks like canceling network requests, unsubscribing from events, or clearing timers.
          ![alt text](image.png)

4. **Error Handling Phase (Error Boundaries)**

   - Introduced in React 16, error boundaries handle JavaScript errors in child components.
   - Methods:
     1. static getDerivedStateFromError(error):
     2. `componentDidCatch(error, info)`:

## Best Practices for Lifecycle Management

1. Keep Components Pure:

   - Avoid side effects in `render()` or `constructor()`.

2. Optimize Rendering:

   - Use `shouldComponentUpdate` or `React.memo` to prevent unnecessary updates.

3. Clean Up Resources:

   - Always clean up in `componentWillUnmount` or `useEffect cleanup`.

4. Error Boundaries:
   - Use error boundaries to prevent entire app crashes.
   - Avoid Deprecated Methods: Methods like `componentWillReceiveProps` and `componentWillMount` are legacy and should not be used.
