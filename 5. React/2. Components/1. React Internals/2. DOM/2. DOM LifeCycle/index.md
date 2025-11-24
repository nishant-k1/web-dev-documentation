# DOM Life Cycle

1. **Creation/Parsing/Mounting/Rendering**
   This phase involves the construction of the DOM tree from the HTML document.

   - `Parsing`:

     1. The browser parses the HTML file into a tree structure.
     2. A DOM tree and a CSSOM (CSS Object Model) tree are created.

   - `Rendering Tree`:

     1. The DOM and CSSOM trees combine to form the Render Tree, which represents the visual elements to be displayed.

2. **Modification/Updating/Mutation**
   During this phase, JavaScript can manipulate the DOM structure dynamically.

   - `DOM Manipulation`:

     1. Using methods like document.createElement, appendChild, and removeChild.
     2. Attributes and styles can also be updated via JavaScript.

   - `Event Binding`:

     1. Event listeners can be attached to DOM elements to respond to user interactions.

   - `Reflow and Repaint`:

     1. Modifying the DOM or CSSOM triggers a Reflow (layout recalculation) or a Repaint (visual update).

3. **Interaction**

   The DOM remains in memory, waiting for user interactions or updates.

   - `Event Handling`:

     1. User interactions like clicks, inputs, and scrolls trigger event handlers.

   - `Dynamic Updates`:

     1. Data updates or user interactions can modify the DOM, re-triggering the modification phase.

4. **Destruction/Unloading**
   The DOM is destroyed when the page is unloaded or when certain elements are explicitly removed.

   - `Page Unload`:

     1. When the user navigates away or refreshes the page, the browser cleans up the DOM tree.

   - `Manual Cleanup`:

     1. JavaScript code can explicitly remove elements using removeChild or remove.
     2. Event listeners and associated resources must be unbound to avoid memory leaks.

## Key JavaScript Events in the DOM Lifecycle

1. **DOMContentLoaded**:

   Fired when the DOM is fully built but before images and external resources are loaded.

2. **load**:

   Fired when the entire page, including images and other resources, has been loaded.

3. **beforeunload**:

   Fired when the user is about to leave the page. It can be used to prompt the user to confirm leaving the page.

4. **unload**:

   Fired when the document or a resource is being unloaded.

## Best Practices

1. **Minimize DOM Manipulations**:

   Batch updates to reduce reflows and repaints.

2. **Use Event Delegation**:

   Attach listeners to a parent element instead of individual child elements for better performance.

3. **Detach Unused Elements**:

   Remove unused DOM elements and event listeners to prevent memory leaks.

4. **Lazy Load Resources**:

   Load images and other heavy resources only when needed.
