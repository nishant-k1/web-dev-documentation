# Reconciliation

- Reconciliation is the process where React compares the previous Virtual DOM with the new Virtual DOM (after state, prop, or context changes) to figure out the minimal set of changes required to update the real DOM.

- Reconciliation only comes into play during subsequent renders when React needs to compare the old and new Virtual DOMs to optimize updates.

- Reconciliation does not takes place in the first render.

- Reconciliation occurs only after the initial render when React has an old Virtual DOM to compare with the new one.

1. First Render (No Previous Virtual DOM)

   - When you first load a React app, the root component (usually the one rendered inside ReactDOM.render() or createRoot()) is the starting point.
   - React processes the entire component tree starting from this root component.
   - On the first render, React has no prior Virtual DOM to compare with because this is the initial render.
   - React simply creates the initial Virtual DOM from the JSX you provided, then converts it to real DOM and attaches it to the browser's DOM tree.
   - No need to compare or find changes, because there was no previous render.
   - Subsequent Renders (Reconciliation Happens)

2. On subsequent renders, React has an existing Virtual DOM that was generated in the previous render.

   - React compares the new Virtual DOM with the old Virtual DOM using the reconciliation process.
   - This process helps React determine the minimal set of updates required for the real DOM, which optimizes performance.

3. Key Takeaway
   - `First render`: React doesn't need to perform reconciliation because there’s no old Virtual DOM to compare.
   - `Subsequent renders`: Reconciliation happens to efficiently update only the parts of the DOM that have changed.

## First Render: Virtual DOM to Real DOM (When Reconciliation doesn't take place, how Real DOM gets created)

1. `Initialization`: When the application starts, React initializes and begins processing the component tree. React creates the Virtual DOM based on the JSX components in your code.

2. `Virtual DOM Creation`: The JSX code you write gets converted into a Virtual DOM — which is a lightweight JavaScript object representation of the UI. It contains all the elements, their attributes, and structure, but it's not yet part of the browser's DOM.

3. `Rendering the Virtual DOM`: In the first render, React doesn't need to compare the Virtual DOM with any previous state. It simply takes the newly created Virtual DOM and generates the corresponding real DOM.

4. `ReactDOM’s Role`: React uses **ReactDOM.render()** (or in the case of React 18, **createRoot**) to take the Virtual DOM and convert it into real DOM nodes. It does this by:

   - Walking through the Virtual DOM tree.
   - Creating actual HTML elements (real DOM) for each element in the Virtual DOM.
   - Appending these real DOM nodes to the root of the application (e.g., #root).

5. Browser Rendering: The browser then takes the real DOM created by React, styles it using CSS, and paints it onto the screen.

## We don't have independent vDOMS vs each component?

In React, there is one shared Virtual DOM for the entire app, not independent Virtual DOMs for each component. However, each component can have its own part of the Virtual DOM tree, but it ultimately all merges into a single, unified Virtual DOM for the entire React application.

1. **Single Virtual DOM**: While components can have their own internal structure, they all share a single Virtual DOM tree that represents the entire UI. The components themselves return JavaScript objects (React elements) which are processed into a Virtual DOM, but they are all part of one overall Virtual DOM.

2. **Component-specific Representation**: When a component renders, React creates a Virtual DOM representation of that component's output. But, these individual "component-level" Virtual DOMs are merged together to form one large tree-like structure, representing the entire UI.

3. **Reconciliation and Virtual DOM**: When state or props change in any component, React performs a reconciliation process where it compares the new Virtual DOM tree to the previous version. This happens for the whole tree, but it updates only the parts of the real DOM that changed. The reconciliation process doesn't happen independently for each component — it happens across the entire tree, optimizing where the changes need to be applied.

Breakdown:

- `Component Render`: Each component returns JSX, which gets converted into React elements.
- `React Elements`: These elements form nodes in the Virtual DOM.
- `Virtual DOM Tree`: All of these nodes, whether they are part of one component or another, form a unified Virtual DOM tree.
- `Reconciliation`: React compares the new Virtual DOM tree with the previous one and updates only the parts of the real DOM that need to change.

![alt text](image.png)

## Diffing Algorithm

1. React utilizes a highly optimized diffing algorithm to determine the minimal set of changes required to update the actual DOM.
2. This algorithm compares the two vDOM trees, identifying:
   - `Added nodes`: New nodes that were not present in the previous vDOM.
   - `Removed nodes`: Nodes that were present in the previous vDOM but are no longer needed.
   - `Updated nodes`: Nodes with changed properties.
   - `Reordered nodes`: Nodes that have changed their position within the parent.
