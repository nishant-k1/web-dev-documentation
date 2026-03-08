# React.js Learning Roadmap

## JavaScript Fundamentals (Prerequisite)

- **Basic Concepts:**
  - Variables (let, const)
  - Data Types (Number, String, Boolean, Array, Object)
  - Operators (Arithmetic, Comparison, Logical)
  - Control Flow (if/else, switch, loops - for, while, do-while)
  - Functions (declaration, expression, arrow functions)
- **ES6+ Features:**
  - Template Literals
  - Arrow Functions
  - Destructuring Assignment
  - Spread/Rest Operator
  - Default Parameters
  - Classes
  - Modules (import/export)
- **DOM Manipulation:**
  - `querySelector`, `querySelectorAll`
  - `addEventListener`
  - Event Delegation
- **Closures & Lexical Environment:**
  - Scope (global, local, block)
  - Closures
  - Hoisting
- **Prototype & Inheritance**
  - prototype
  - prototypal inheritance
- **Asynchronous JavaScript:**
  - Promises
  - `async`/`await`
  - Fetch API
  - Error handling: try/catch
- **Array Methods:**
  - `map()`, `filter()`, `reduce()`, `forEach()`, `find()`, `some()`, `every()`
- **Error Handling:**
  - `try`/`catch`
  - `finally`
  - Custom Error Classes
- **Module System:**
  - `import`, `export`
  - Dynamic Imports

## React Basics: Only CSR

- **Core Concepts:**
  - JSX
- **Event Handling:**

  - Event binding
  - Synthetic Events

- **Hooks:**

  1. Frequently Used Hooks:

     - `useState`
     - `useEffect`
     - `useContext`
     - `useRef`
     - `useMemo`
     - `useCallback`

  2. Occasionally Used Hooks:

     - `useReducer`
     - `useLayoutEffect`
     - `useTransition`
     - `useDeferredValue`
     - `useId`
     - `useSyncExternalStore` / `useMutableSource`
     - `useOptimistic`
     - `useEvent`

  3. Rarely Used Hooks:

     - `useImperativeHandle`
     - `useInsertionEffect`
     - `useDebugValue`
     - `useFormStatus`
     - `useActionState`

- **Refs & DOM Manipulation (useImperativeHandle)**

  - `useImperativeHandle`

- **Component Lifecycle(Class Components)**
  - `constructor()`
  - `componentDidMount()`
  - `componentWillUnmount()`
  - (Note: Class components and their lifecycle methods are gradually being phased out in favor of Hooks)
  - `useEffect` for functional components

## React Basics: Only SSR

- None: No specific React basics topics are exclusive to SSR.

## React Basics: Both CSR & SSR

- **Core Concepts:**
  - Components (Functional and Class)
  - Props
  - State
  - React DevTools profiler
- **Conditional Rendering:**
  - `if/else` statements
  - Ternary operator
  - Short-circuit evaluation (&&, ||)
- **Lists and Keys:**

  - Rendering Lists
  - Importance of unique keys

- **Higher-Order Components (HOCs):**
  - Concept and Use Cases
- **Context API:**
  - State Management with Context
- **Portals:**
  - Creating Modals and Overlays
- **Error Boundaries:**
  - Handling Errors in UI
- **Virtual DOM and Reconciliation:**
  - How React's Diff Algorithm works
  - React Fiber
- **Concurrent Rendering**
  - Non-blocking rendering
  - useTransition Hook
  - Integration with Suspense
  - Optimizing Rendering with Automatic Batching
- **React Suspense**
  - Handling Async Operations
  - Lazy Loading & Code Splitting
  - Streaming with Suspense
- **Offscreen Rendering**
  - Rendering Components Not Visible: Render components that are offscreen in advance to prepare them for when they are needed (e.g., using requestIdleCallback).
  - Reducing Jank: Helps reduce the initial render time and prevent janky, delayed UI updates.

## Advanced React: Only SSR

- **Server-Side Rendering (SSR)**
- **Hydration:**
  - What is Hydration?: The process of attaching event listeners and reusing the server-rendered HTML on the client.
  - Why is Hydration Important?: It’s essential for SSR/SSG to work seamlessly on the client, ensuring no flash of unstyled content.
- **New React Features**
  - useId Hook for Hydration
  - Streaming HTML Content from Server
  - JSX Transform
- **React Server Components (RSC)**
  - Overview and Basics
  - Streaming & Suspense
  - Server-Side Data Fetching
  - Integrating with Next.js
- **Next.js and SSR**
  - What is SSG?: A variant of SSR where pages are pre-rendered at build time. It generates static HTML files for each page, which can be served quickly to the client.
  - When to Use SSG vs SSR: Use SSG when the content doesn’t change often and doesn’t require real-time data, while SSR is suitable for pages that require dynamic, frequently updated data.
- **Data Fetching in SSR**
  - How Data Fetching Works in SSR: The data needed to render a page is fetched on the server, and then the page is sent to the client with the pre-fetched data already in place.
  - SSR Data Fetching with Suspense: Using React Suspense for data fetching in SSR allows React to pause the server-side rendering until the data is ready, improving user experience and performance.
- **Server-Side Caching**
  - Why Caching Matters in SSR: Server-side rendering can be slow if every request needs to be freshly rendered. Caching the HTML on the server can greatly improve performance.
  - Caching Strategies for SSR: Caching rendered HTML and API responses for common or highly requested pages to reduce server load.
- **SEO Optimization with SSR**
  - SEO Benefits of SSR: Server-rendered content is fully indexed by search engines, providing better SEO performance compared to client-side rendering where content is hidden until the client renders it.
  - Meta Tags and Open Graph Tags: Setting meta tags (like title, description) on the server helps improve the SEO and social media sharing experience.
- **Error Boundaries in SSR**
  - Handling Errors on the Server: Handling runtime errors in SSR is crucial since they can break the entire rendering process. Error boundaries need to be implemented on both client and server sides to handle such errors gracefully.
  - Logging and Monitoring Errors in SSR: Monitoring server-side errors is critical for troubleshooting performance and rendering issues. Tools like Sentry can be used to log server-side errors.
- **Progressive Hydration**
  - What is Progressive Hydration?: Progressive hydration involves incrementally making the server-rendered page interactive, instead of hydrating the entire page at once. This can help improve the perceived performance of the application.
- **Streaming in SSR**
  - React 18's Streaming SSR: With React 18, there’s a new feature called "streaming" that allows the server to stream HTML chunks to the client progressively. This helps improve the perceived load time and allows quicker rendering of parts of the page.
- **SSR with Authenticated Pages**
  - SSR and Authentication: Implementing authenticated SSR can be tricky, as you need to ensure the server checks for user authentication before rendering private content. Server-side session management and JWT tokens are common approaches to handle authentication in SSR.

## Accessibility (a11y)

- Keyboard navigation, screen reader compatibility, color contrast, etc.
- Testing accessibility:
- Using tools like axe-core or the @testing-library/jest-dom package.

## React Optimization: Only CSR

- **Memoization:**
  - `React.memo`: Prevents re-renders of components when props haven't changed
  - `useMemo`: Memorizes the result of a function to avoid recalculating it on every render.
  - `useCallback`: Returns a memoized version of a callback function, preventing unnecessary re-creations on each render.
- **Lazy Loading & Code Splitting**
  - Code Splitting with `React.lazy` and `Suspense`: Dynamically load components to reduce the initial bundle size
  - Dynamic Imports (for more granular control): Allows for more granular control over code splitting (e.g., for specific conditions or pages).
  - Impact on initial load time and user experience: Reduces initial load time by loading code only when needed, improving the perceived performance.
- **Virtualization**
  - Windowing: Rendering only the visible portion of a long list
  - Libraries like `react-window` or `react-virtualized`
  - Techniques like windowing or virtualization for rendering only the visible parts of large lists
  - Other Virtualization Techniques: For example, virtualizing grids or trees.
- **Efficient Data Fetching**
  - Fetching data efficiently using `useEffect` and `useSWR` or `React Query`.
  - Avoiding unnecessary data fetches.
- **Render Optimization**
  - Preventing Unnecessary Renders
  - Understanding how React determines when to re-render components (state changes, props changes).
  - Optimizing state updates to minimize unnecessary re-renders.
  - Optimizing State Updates: Batched state updates and managing complex state with useReducer can help minimize unnecessary re-renders. Avoid setting state in multiple steps if it’s not necessary.
- **Efficient State Management**
  - Use useReducer, Redux, or other state management tools to minimize unnecessary state updates and avoid frequent re-renders.
  - Consider batching state updates when possible.
- **Progressive Image Loading**
  - Use techniques like loading="lazy" for images to defer image loading until they are visible in the viewport.
    Consider webp format for faster loading.
- **Performance Tools**
  - Use React DevTools Profiler and Lighthouse for profiling, debugging, and analyzing performance.

## React Optimization: Only SSR

- **Lazy Loading / Code Splitting:**
  - Just like CSR, `React.lazy` and `Suspense` can be used in SSR to load only the necessary parts of the app after the initial HTML is loaded.
- **Hydration:**
  - The process of making static content interactive by running React code on the client side.
  - Optimizing hydration is critical for improving initial load time and reducing jank.
  - Minimizing the gap between SSR and client-side React rehydration can improve performance.
- **Server-Side Caching:**
  - Cache the server-rendered pages or static HTML output to reduce server load.
  - Use tools like Varnish, Redis, or HTTP caching strategies to cache the response from the server.
  - Dynamic imports are crucial for breaking down the app into smaller bundles to minimize the initial payload.
- **Efficient Data Fetching:**
  - In SSR, data fetching should happen on the server before rendering, to ensure the page is fully populated before being sent to the client.
  - Techniques like `getServerSideProps` (in Next.js) help fetch data server-side.
- **Optimize Server Response Time:**
  - Server-side performance is crucial for SSR. Optimizing server response time can make a big difference in SSR app performance.
  - Use efficient routing, reduce the complexity of server-side logic, and ensure the server can handle concurrent requests.
- **Optimized HTML Response:**
  - Minimize the HTML size sent to the client by stripping out unnecessary metadata, white spaces, and optimizing HTML structure.
  - Enable gzip compression or Brotli for better payload reduction.
- **SEO Optimization:**
  - Since SSR sends fully rendered HTML, SSR is ideal for SEO, but ensure that the initial HTML is correctly optimized for SEO.
  - Use techniques like meta tags for improving SEO and improving page discoverability.
- **Component-level Caching:**
  - Cache certain server-side rendered components that don't change often to reduce server-side load and increase performance.
  - Example: Cache a header or footer if they are constant across requests.
- **Performance Tools:**
  - Tools like React Profiler, Lighthouse, and server-side tools like New Relic or Datadog can help you monitor and optimize the performance of SSR applications.

## State Management

- **Local State:**
  - `useState`
  - `useReducer`
- **Global State:**
  - Context API
  - Redux
  - Redux Toolkit
- **Redux Basics:**
  - Actions
  - Reducers
  - Store
- **Middleware:**
  - Thunk
  - Saga
- **Alternatives:**
  - Recoil
  - Zustand

## React Routing: CSR

- **React Router Basics:**

  - Setting up routes with `BrowserRouter` and `Route`.
  - Navigating between pages using `Link` and `NavLink`.
  - Dynamic routes with parameters using `useParams`.
  - Nested routes using `Outlet`.
  - Handling 404 pages with a fallback route.
  - Programmatic navigation using `useNavigate`.

- **Advanced Routing:**
  - Protected routes for authentication.
  - Lazy loading routes with `React.lazy` and `Suspense`.
  - Custom route components for advanced use cases.

## React Routing: SSR

- `StaticRouter`

## Routing: Both CSR and SSR

- **React Router Basics:**

- Defining routes (e.g., `Route` component)
- Matching URLs to components
- Navigating between routes (e.g., `Link`, `NavLink` `components`)
- Route parameters (dynamic segments in URLs)
- Nested routes (Outlet component)
- Custom route components (creating your own route handlers)
- Protected routes (implementing authorization logic)

- **Dynamic Routes:**
  - Route Parameters
- **Custom Routes**
- **Nested Routes:**
  - `Outlet` Component
- **Protected Routes:**
  - Role-Based Authorization

## Accessibility (a11y)

- **ARIA roles**
- **WCAG compliance tools**

## Testing

- **Unit Testing:**
  - Jest
  - React Testing Library (RTL)
- **Integration Testing:**
  - Testing Components with Redux or Context
- **End-to-End Testing:**
  - Playwright
  - Cypress
- **Mocking:**
  - Fetch API
  - Mock Service Workers (MSW)

## API Integration

- **Fetch Data:**
  - Axios
  - Fetch API
- **REST API:**
  - GET, POST, PUT, DELETE
- **GraphQL:**
  - Apollo Client Basics
- **Error Handling and Loading States**

## Deployment

- **Hosting:**
  - Vercel
  - Netlify
  - AWS S3
- **CI/CD Pipelines:**
  - GitHub Actions
- **Environment Variables:**
  - `.env` Files
  - Best Practices

## Advanced Concepts

- **Server-Side Rendering (SSR):**
  - Next.js
  - Benefits of SSR over CSR (Client-Side Rendering)
  - Incremental Static Regeneration (ISR) in Next.js
- **Static Site Generation (SSG):**
  - Next.js
- **WebSockets:**
  - Real-Time Communication
- **Progressive Web Apps (PWA):**
  - Service Workers
  - Offline Caching
- **Microfrontends:**
  - Concept and Implementation

## Soft Skills and Behavioral Questions

- **Problem Solving:**
  - How to approach and explain solutions
- **Team Collaboration:**
  - Handling Conflicts
  - Code Reviews
- **Project Discussion:**
  - Explaining past experiences and roles

## Ecosystem and Integrations

- **Styling**
  - CSS-in-JS (Styled-Components, Emotion.js)
  - Utility-first CSS (Tailwind CSS)
- **Data Fetching**
  - REST API integration with Axios or fetch
  - GraphQL with Apollo Client or Relay
  - React Query (or TanStack Query) for data synchronization
- **Forms**
  - Advanced form handling with Formik or React Hook Form
  - Validation using Yup or Zod
- **Charts and Data Visualization**
  - Highcharts, D3.js, React Chart.js

## Building Production-Ready Applications

- **Code Quality**
  - ESLint, Prettier for consistent formatting
  - TypeScript for type safety
- **Authentication**
  - JWT Authentication
  - OAuth with libraries like Auth0 or Firebase
- **Deployment**
  - Vercel for Next.js
  - AWS Amplify, Netlify, or Docker
- **CI/CD**
  - GitHub Actions
  - Unit tests in CI pipeline

## Beyond React

- **Frameworks and Meta-Frameworks**
  - Next.js for full-stack applications
  - Remix for server-side capabilities
- **Micro-Frontends**
  - Module Federation with Webpack
- **Web Performance**
  - Lighthouse Audits
  - Optimizing Core Web Vitals
