# use() Hook (React 19)

## TL;DR

- **`use()`** = React 19's revolutionary hook for reading Promises and Context
- **Can be used conditionally** (unlike other hooks!)
- **Reads Promises**: Unwraps Promise values directly in render
- **Reads Context**: Alternative to `useContext()`
- **Suspense integration**: Automatically suspends component while Promise pending
- **Error handling**: Throws errors for Error Boundaries to catch
- Replaces many `useEffect` patterns for data fetching
- **Game-changer** for async data in React

---

## 1. What is use()?

**`use()`** is a new React Hook (React 19+) that lets you **read values from Promises and Context** directly in your component's render function.

### The Revolutionary Feature: Conditional Usage

Unlike ALL other hooks, **`use()` can be called conditionally**:

```jsx
// ❌ Other hooks: MUST be at top level
function Component({ shouldFetch }) {
  if (shouldFetch) {
    const data = useState(null); // ❌ ERROR: Breaks Rules of Hooks
  }
}

// ✅ use(): CAN be conditional!
function Component({ shouldFetch, dataPromise }) {
  if (shouldFetch) {
    const data = use(dataPromise); // ✅ WORKS!
  }
}
```

---

## 2. use() with Promises (Data Fetching)

### Basic Example

```jsx
import { use } from "react";

// Promise that fetches user data
const userPromise = fetch("/api/user/123").then((res) => res.json());

function UserProfile() {
  // ✅ use() unwraps the Promise
  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Wrap with Suspense
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
    </Suspense>
  );
}
```

**What happens:**

1. `use(userPromise)` suspends component while Promise is pending
2. Suspense shows fallback UI
3. When Promise resolves, component re-renders with data
4. If Promise rejects, Error Boundary catches it

---

### Old Way (React 18) vs New Way (React 19)

#### ❌ Old Way: useEffect + useState

```jsx
// React 18: Manual state management
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

#### ✅ New Way: use()

```jsx
// React 19: Simple and declarative
function UserProfile({ userId }) {
  const userPromise = fetchUser(userId);
  const user = use(userPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}

// Wrap with Suspense (handles loading) and ErrorBoundary (handles errors)
function App() {
  return (
    <ErrorBoundary fallback={<div>Error loading user</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile userId={123} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

**Benefits:**

- ✅ No manual state management
- ✅ No loading/error states
- ✅ Cleaner code
- ✅ Suspense handles loading
- ✅ Error Boundaries handle errors

---

## 3. use() in Conditional Rendering

The **killer feature**: `use()` can be called conditionally!

### Example: Conditional Data Fetching

```jsx
function UserProfile({ userId, showDetails }) {
  const userPromise = fetchUser(userId);
  const user = use(userPromise);

  // ✅ use() can be called conditionally
  let details = null;
  if (showDetails) {
    const detailsPromise = fetchUserDetails(userId);
    details = use(detailsPromise); // ✅ WORKS!
  }

  return (
    <div>
      <h1>{user.name}</h1>
      {details && <p>Details: {details.bio}</p>}
    </div>
  );
}
```

### Example: Conditional in Loop

```jsx
function ProductList({ products, loadReviews }) {
  return (
    <ul>
      {products.map((product) => {
        // ✅ use() in a loop
        const reviewsPromise = loadReviews
          ? fetchReviews(product.id)
          : Promise.resolve([]);

        const reviews = use(reviewsPromise);

        return (
          <li key={product.id}>
            <h3>{product.name}</h3>
            {reviews.length > 0 && <p>Reviews: {reviews.length}</p>}
          </li>
        );
      })}
    </ul>
  );
}
```

---

## 4. use() with Context

`use()` can also read Context (alternative to `useContext()`).

### Basic Example

```jsx
import { createContext, use } from "react";

const ThemeContext = createContext("light");

function ThemedButton() {
  // ✅ Both work the same
  const theme = use(ThemeContext);
  // const theme = useContext(ThemeContext);

  return <button className={theme}>Click me</button>;
}
```

### Why use() over useContext()?

**Advantage:** `use()` can be conditional!

```jsx
function Component({ useTheme }) {
  // ✅ use() can be conditional
  const theme = useTheme ? use(ThemeContext) : "default";

  // ❌ useContext() cannot be conditional
  // const theme = useTheme ? useContext(ThemeContext) : "default"; // ERROR!

  return <button className={theme}>Click</button>;
}
```

---

## 5. How use() Works with Suspense

When `use()` encounters a pending Promise, it **suspends** the component.

### Flow

```jsx
function UserProfile() {
  const user = use(fetchUser(123));
  return <div>{user.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserProfile />
    </Suspense>
  );
}
```

**What happens:**

1. **First render:**

   - `use(fetchUser(123))` encounters pending Promise
   - Component **suspends** (throws Promise)
   - Suspense catches it and shows `<Spinner />`

2. **When Promise resolves:**

   - React retries the component
   - `use()` returns the resolved value
   - Component renders with data

3. **If Promise rejects:**
   - `use()` throws the error
   - Error Boundary catches it
   - Shows error fallback

---

## 6. Error Handling with use()

When a Promise rejects, `use()` throws the error for Error Boundaries to catch.

### Example

```jsx
function UserProfile({ userId }) {
  const userPromise = fetchUser(userId); // Might reject
  const user = use(userPromise); // Throws error if Promise rejects

  return <div>{user.name}</div>;
}

function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load user</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile userId={123} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

**Flow if Promise rejects:**

1. `use()` throws error
2. Error Boundary catches it
3. Shows error fallback UI

---

## 7. Caching Promises (Important!)

**Key concept:** Pass the **same Promise instance** to avoid re-fetching.

### ❌ Problem: Creating New Promises

```jsx
// ❌ BAD: Creates new Promise on every render
function UserProfile({ userId }) {
  const user = use(fetch(`/api/user/${userId}`)); // New Promise every time!
  return <div>{user.name}</div>;
}
```

**Problem:** Creates new Promise → infinite re-renders!

### ✅ Solution 1: Cache Promise in Module Scope

```jsx
// ✅ Create Promise once (module scope)
const userPromise = fetch("/api/user/123").then((res) => res.json());

function UserProfile() {
  const user = use(userPromise); // Same Promise every time
  return <div>{user.name}</div>;
}
```

### ✅ Solution 2: Use React Cache (React 19)

```jsx
import { cache } from "react";

// ✅ Cache function results
const fetchUser = cache(async (userId) => {
  const res = await fetch(`/api/user/${userId}`);
  return res.json();
});

function UserProfile({ userId }) {
  const user = use(fetchUser(userId)); // Cached per userId
  return <div>{user.name}</div>;
}
```

### ✅ Solution 3: Use State Management Library

```jsx
// With React Query
import { useSuspenseQuery } from "@tanstack/react-query";

function UserProfile({ userId }) {
  const { data: user } = useSuspenseQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  return <div>{user.name}</div>;
}
```

---

## 8. Common Patterns

### Pattern 1: Parallel Data Fetching

```jsx
function Dashboard() {
  const userPromise = fetchUser();
  const statsPromise = fetchStats();
  const notificationsPromise = fetchNotifications();

  // ✅ Fetch all in parallel, wait for all
  const user = use(userPromise);
  const stats = use(statsPromise);
  const notifications = use(notificationsPromise);

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      <Stats data={stats} />
      <Notifications items={notifications} />
    </div>
  );
}
```

**Note:** All Promises start fetching immediately (parallel), but component suspends until ALL are resolved.

---

### Pattern 2: Sequential Data Fetching

```jsx
function UserProfile({ userId }) {
  const userPromise = fetchUser(userId);
  const user = use(userPromise);

  // Only fetch posts after user is loaded
  const postsPromise = fetchUserPosts(user.id);
  const posts = use(postsPromise);

  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Pattern 3: Conditional Data Fetching

```jsx
function ProductPage({ productId, showReviews }) {
  const productPromise = fetchProduct(productId);
  const product = use(productPromise);

  // ✅ Only fetch reviews if showReviews is true
  let reviews = [];
  if (showReviews) {
    const reviewsPromise = fetchReviews(productId);
    reviews = use(reviewsPromise);
  }

  return (
    <div>
      <h1>{product.name}</h1>
      {showReviews && <Reviews data={reviews} />}
    </div>
  );
}
```

---

### Pattern 4: use() with Context for Auth

```jsx
const AuthContext = createContext(null);

function ProtectedPage() {
  const auth = use(AuthContext);

  if (!auth.isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return <div>Welcome, {auth.user.name}</div>;
}
```

---

### Pattern 5: Streaming Data (Server Components)

```jsx
// Server Component (Next.js App Router)
async function ProductList() {
  const productsPromise = fetchProducts();

  return (
    <Suspense fallback={<Skeleton />}>
      <Products promise={productsPromise} />
    </Suspense>
  );
}

// Client Component
("use client");
function Products({ promise }) {
  const products = use(promise); // ✅ Unwraps streamed data

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}
```

---

## 9. use() vs useEffect

### When to Use use()

✅ Use `use()` for:

- Data fetching that blocks rendering
- Data needed for initial render
- Data that should suspend component
- Synchronous-looking async code

### When to Use useEffect()

✅ Use `useEffect()` for:

- Side effects (logging, analytics)
- Event listeners
- Subscriptions
- DOM manipulation
- Non-blocking background tasks

### Example Comparison

```jsx
// ✅ use() for data fetching
function UserProfile({ userId }) {
  const user = use(fetchUser(userId)); // Blocks render until data loads
  return <div>{user.name}</div>;
}

// ✅ useEffect for analytics
function Page() {
  useEffect(() => {
    trackPageView(); // Non-blocking side effect
  }, []);

  return <div>Page content</div>;
}
```

---

## 10. Limitations & Gotchas

### 1. Promise Must Be Stable

```jsx
// ❌ BAD: Creates new Promise every render
function Component() {
  const data = use(fetch("/api/data")); // Infinite loop!
  return <div>{data}</div>;
}

// ✅ GOOD: Promise created outside or cached
const dataPromise = fetch("/api/data").then((r) => r.json());

function Component() {
  const data = use(dataPromise);
  return <div>{data}</div>;
}
```

---

### 2. Requires Suspense Boundary

```jsx
// ❌ BAD: No Suspense boundary
function App() {
  return <UserProfile />; // ❌ Error: Suspense boundary required!
}

// ✅ GOOD: Wrapped in Suspense
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile />
    </Suspense>
  );
}
```

---

### 3. Requires Error Boundary for Errors

```jsx
// ❌ BAD: No Error Boundary
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserProfile /> {/* If Promise rejects, app crashes */}
    </Suspense>
  );
}

// ✅ GOOD: Wrapped in Error Boundary
function App() {
  return (
    <ErrorBoundary fallback={<div>Error</div>}>
      <Suspense fallback={<div>Loading...</div>}>
        <UserProfile />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

### 4. Cannot Use with useEffect Dependencies

```jsx
// ❌ BAD: use() in useEffect
useEffect(() => {
  const data = use(dataPromise); // ❌ ERROR!
  console.log(data);
}, []);

// ✅ GOOD: use() in render
function Component() {
  const data = use(dataPromise);

  useEffect(() => {
    console.log(data); // ✅ Use the data
  }, [data]);

  return <div>{data}</div>;
}
```

---

## 11. Real-World Examples

### Example 1: Blog Post with Comments

```jsx
import { cache } from "react";

const fetchPost = cache(async (id) => {
  const res = await fetch(`/api/posts/${id}`);
  return res.json();
});

const fetchComments = cache(async (postId) => {
  const res = await fetch(`/api/posts/${postId}/comments`);
  return res.json();
});

function BlogPost({ postId }) {
  const postPromise = fetchPost(postId);
  const commentsPromise = fetchComments(postId);

  // Fetch in parallel
  const post = use(postPromise);
  const comments = use(commentsPromise);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>

      <section>
        <h2>Comments ({comments.length})</h2>
        {comments.map((comment) => (
          <div key={comment.id}>
            <strong>{comment.author}:</strong> {comment.text}
          </div>
        ))}
      </section>
    </article>
  );
}

// Usage
function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load post</div>}>
      <Suspense fallback={<BlogPostSkeleton />}>
        <BlogPost postId={123} />
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

### Example 2: User Dashboard with Conditional Widgets

```jsx
function Dashboard({ userId, showAnalytics, showNotifications }) {
  const userPromise = fetchUser(userId);
  const user = use(userPromise);

  // Conditional data fetching
  let analytics = null;
  if (showAnalytics) {
    const analyticsPromise = fetchAnalytics(userId);
    analytics = use(analyticsPromise);
  }

  let notifications = [];
  if (showNotifications) {
    const notificationsPromise = fetchNotifications(userId);
    notifications = use(notificationsPromise);
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>

      {showAnalytics && <AnalyticsWidget data={analytics} />}

      {showNotifications && (
        <NotificationsWidget notifications={notifications} />
      )}
    </div>
  );
}
```

---

### Example 3: Shopping Cart with Auth Check

```jsx
const AuthContext = createContext(null);

function ShoppingCart() {
  const auth = use(AuthContext);

  // Only fetch cart if logged in
  let cart = { items: [] };
  if (auth.isLoggedIn) {
    const cartPromise = fetchCart(auth.user.id);
    cart = use(cartPromise);
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <ul>
          {cart.items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

---

## 12. Interview Questions

### Q1: What is use() and what's special about it?

**Answer:** `use()` is a React 19 hook that reads values from Promises and Context. Unlike all other hooks, it can be called **conditionally** (in if statements, loops, etc.).

```jsx
if (shouldLoad) {
  const data = use(promise); // ✅ WORKS! (other hooks can't do this)
}
```

---

### Q2: What can use() read?

**Answer:** `use()` can read two things:

1. **Promises** - Unwraps resolved Promise values
2. **Context** - Alternative to `useContext()`

```jsx
const data = use(fetchData()); // Promise
const theme = use(ThemeContext); // Context
```

---

### Q3: How does use() handle pending Promises?

**Answer:** When `use()` encounters a pending Promise, it **suspends** the component. The nearest Suspense boundary shows fallback UI until the Promise resolves.

```jsx
<Suspense fallback={<Spinner />}>
  <Component /> {/* use() suspends here */}
</Suspense>
```

---

### Q4: How does use() handle rejected Promises?

**Answer:** When a Promise rejects, `use()` **throws the error**. The nearest Error Boundary catches it and shows error UI.

```jsx
<ErrorBoundary fallback={<Error />}>
  <Suspense fallback={<Loading />}>
    <Component /> {/* use() throws error if Promise rejects */}
  </Suspense>
</ErrorBoundary>
```

---

### Q5: Why is it important that use() can be conditional?

**Answer:** It enables:

- Conditional data fetching (only fetch if needed)
- Data fetching in loops (fetch for each item)
- Dynamic data dependencies
- Cleaner conditional logic without violating Rules of Hooks

```jsx
if (showDetails) {
  const details = use(fetchDetails()); // ✅ Can't do this with other hooks
}
```

---

### Q6: What's the difference between use() and useEffect() for data fetching?

**Answer:**

| use()                           | useEffect()                           |
| ------------------------------- | ------------------------------------- |
| Blocks render until data loads  | Non-blocking, data loads after render |
| Integrates with Suspense        | Manual loading state                  |
| Throws errors to Error Boundary | Manual error handling                 |
| Cleaner, declarative            | More boilerplate                      |
| For initial render data         | For side effects                      |

---

### Q7: Can you use use() in useEffect()?

**Answer:** No! `use()` must be called during render, not in effects, callbacks, or event handlers.

```jsx
// ❌ BAD
useEffect(() => {
  const data = use(promise); // ERROR!
}, []);

// ✅ GOOD
const data = use(promise); // In render
useEffect(() => {
  console.log(data); // Use the data
}, [data]);
```

---

### Q8: How do you prevent infinite re-renders with use()?

**Answer:** Ensure the Promise is **stable** (same instance across renders). Use:

- Module-level Promises
- `cache()` function (React 19)
- State management libraries (React Query, SWR)

```jsx
// ❌ BAD: New Promise every render
const data = use(fetch("/api/data"));

// ✅ GOOD: Cached Promise
const fetchData = cache(() => fetch("/api/data").then((r) => r.json()));
const data = use(fetchData());
```

---

### Q9: Do you need Suspense to use use()?

**Answer:** Yes, if `use()` is reading a Promise. The component will suspend, so you need a Suspense boundary to show fallback UI.

```jsx
// ❌ Missing Suspense
<UserProfile /> // ERROR if use() suspends

// ✅ With Suspense
<Suspense fallback={<Loading />}>
  <UserProfile />
</Suspense>
```

---

### Q10: How is use() different from useContext()?

**Answer:** Both can read Context, but:

- `useContext()` must be at top level (Rules of Hooks)
- `use()` can be conditional

```jsx
// ❌ useContext: Can't be conditional
if (condition) {
  const value = useContext(MyContext); // ERROR
}

// ✅ use: Can be conditional
if (condition) {
  const value = use(MyContext); // WORKS
}
```

---

## 13. Best Practices

### ✅ Always Do:

1. **Wrap use() with Suspense** (for Promises)
2. **Wrap use() with Error Boundary** (handle errors)
3. **Cache Promises** to avoid re-fetching
4. **Use for initial render data** (not side effects)
5. **Leverage conditional capability** when needed

### ❌ Never Do:

1. **Create new Promises in render** without caching
2. **Use in useEffect, callbacks, or event handlers**
3. **Forget Suspense boundary** (will error)
4. **Forget Error Boundary** (unhandled errors crash app)
5. **Mix use() and manual loading states** (redundant)

### 🎯 Advanced:

- Combine with Server Components for streaming
- Use `cache()` for request deduplication
- Implement parallel and sequential fetching patterns
- Use with React Query for advanced caching
- Leverage conditional fetching for performance

---

## Summary: use() Checklist

When using `use()`, ensure you:

- ✅ Understand it reads Promises and Context
- ✅ Know it can be used conditionally (unique!)
- ✅ Wrap Promise usage with Suspense
- ✅ Wrap Promise usage with Error Boundary
- ✅ Cache Promises to avoid infinite loops
- ✅ Use for blocking data fetching (not side effects)
- ✅ Understand difference from useEffect and useContext

Your `use()` knowledge is interview-ready when you can explain:

1. What `use()` reads (Promises, Context)
2. Why conditional usage is revolutionary
3. How it integrates with Suspense and Error Boundaries
4. Difference from `useEffect()` for data fetching
5. Difference from `useContext()` for Context
6. Why Promise stability matters
7. When to use `use()` vs other patterns
