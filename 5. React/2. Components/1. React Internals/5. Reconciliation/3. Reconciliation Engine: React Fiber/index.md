# Reconciliation Engine: React Fiber

- React Fiber is a reconciliation engine designed to:

  1. Optimize rendering updates.
  2. Break rendering work into smaller units.
  3. Enable rendering prioritization for better performance.

- Fiber introduces a tree data structure called the Fiber Tree, which keeps track of the component hierarchy, updates, and side effects during rendering.

## Why Fiber

- Before Fiber, React used a stack-based reconciliation algorithm.
- The problem with this approach was that rendering was synchronous:

  1. Large or complex updates could block the browser, causing noticeable lags.
  2. React couldn’t pause rendering to handle high-priority tasks (like user input or animations).
  3. Fiber’s Key Goals:

     - Interruptible Rendering: Work can be paused, split into chunks, and resumed later. This prevents freezing the UI.
     - Prioritization: High-priority updates (like user input) are handled first.
     - Better Handling of Animations: Fiber ensures animations remain smooth by giving them higher priority.
     - Concurrency: Enables React’s concurrent features, like Concurrent Mode and Suspense.

## Fiber Working Process

1. Render Phase (Reconciliation)
   - `Purpose`: Calculate what changes are needed to update the UI.
   - `Interruptible`: This phase can be paused or resumed.
   - React builds the Fiber Tree and determines which parts of the DOM need updates.
2. Commit Phase
   - `Purpose`: Apply the changes to the DOM.
   - `Non-Interruptible`: Once this phase starts, it completes without stopping.
   - Updates are made to the real DOM and any side effects (like componentDidMount) are executed.

## Fiber Tree

The Fiber Tree is a data structure that React uses to track and schedule updates.

Each element in the Fiber Tree is a Fiber Node, which represents:

    - A React component or element.
    - Its properties (props, state, etc.).
    - Work to be done for that node (e.g., rendering, effects).

The Fiber Tree mirrors the component hierarchy and allows React to work on individual "fibers" (nodes) independently.

## Key Concepts in Fiber

1. Work Units

   - Updates are broken into small units of work, which can be paused or interrupted.
   - React processes as many work units as it can within a single frame (usually 16ms).

2. Priority Levels

   - High Priority: User interactions like typing or clicking.
   - Low Priority: Data fetching or background updates.

3. Scheduling
   React uses a scheduler to decide:

   - When to pause rendering.
   - Which updates to process next.
   - How to handle deadlines (based on available time).

## Benefits of React Fiber

- `Smooth UI Updates`: High-priority tasks (like animations) are handled immediately, ensuring no lag in the user experience.
- `Concurrency Support`: Fiber is the foundation for Concurrent Mode, allowing multiple updates to be handled simultaneously.
- `Improved Rendering Performance`: Large updates are split into smaller chunks, preventing UI freezing.
- `Advanced Features`: Enables features like Suspense and Time Slicing.
  ![alt text](image-1.png)

## React Fiber vs. Legacy Reconciliation

![alt text](image.png)

## Key Takeaways

- Fiber is the backbone of React's modern architecture, enabling features like Concurrent Mode, Suspense, and better performance.
- By breaking rendering work into smaller units, Fiber makes React apps faster and more responsive.
- Fiber ensures that React can efficiently handle updates, even in complex applications.
- Fiber’s real power shines in complex applications where smooth animations, responsive user interactions, and efficient updates are critical.
