# Performance Optimization

1. Memoization:
   Use React.memo, useMemo, and useCallback to prevent unnecessary renders.

2. Code Splitting:
   Implement route-based and component-based code splitting using tools like Webpack or Vite.

3. Avoid Prop Drilling:
   Use Context API or global state management to pass data across deeply nested components.

4. Debouncing and Throttling:
   Use lodash or custom hooks to optimize high-frequency events like search or scroll.

5. Batching Updates:
   Leverage React’s automatic batching in concurrent mode.
