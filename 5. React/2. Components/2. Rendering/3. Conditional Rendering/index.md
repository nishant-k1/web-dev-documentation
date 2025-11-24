# Conditional Rendering in React

## TL;DR

- **Conditional rendering** = Show different UI based on conditions
- Use **if/else** for complex logic (outside JSX)
- Use **ternary** (`condition ? A : B`) for simple either/or in JSX
- Use **logical AND** (`condition && <Component />`) to show/hide single element
- Use **logical OR** (`value || <Default />`) for fallback values
- Use **nullish coalescing** (`value ?? <Default />`) for null/undefined only
- Use **early return** to simplify component logic
- `null`, `undefined`, `true`, `false` **don't render** (safe to use)

---

## 1. What is Conditional Rendering?

**Conditional rendering** means showing different UI elements based on certain conditions - just like if/else in regular JavaScript.

### Basic Example

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in</h1>;
  }
}
```

**Think of it like:**

```javascript
// Regular JavaScript
function getMessage(isLoggedIn) {
  if (isLoggedIn) {
    return "Welcome back!";
  } else {
    return "Please log in";
  }
}

// React (same logic!)
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in</h1>;
  }
}
```

---

## 2. if/else Statements

Use **if/else** for complex conditional logic outside JSX.

### Pattern 1: if/else Before Return

```jsx
function UserStatus({ user }) {
  let message;

  if (user.isAdmin) {
    message = <div>Admin Dashboard</div>;
  } else if (user.isPremium) {
    message = <div>Premium Features</div>;
  } else {
    message = <div>Basic Features</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {message}
    </div>
  );
}
```

### Pattern 2: Early Return (Best for Simplicity)

```jsx
function UserProfile({ user }) {
  // Guard clauses at the top
  if (!user) {
    return <div>Loading...</div>;
  }

  if (!user.isActive) {
    return <div>Account deactivated</div>;
  }

  // Main render for happy path
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

**Benefits of early return:**

- ✅ Simpler logic (handle edge cases first)
- ✅ Reduces nesting
- ✅ More readable ("guard clause" pattern)

---

## 3. Ternary Operator (? :)

Use **ternary** for simple **either/or** conditions **inside JSX**.

### Syntax

```
condition ? expressionIfTrue : expressionIfFalse
```

### Basic Example

```jsx
function Greeting({ isLoggedIn }) {
  return (
    <div>{isLoggedIn ? <h1>Welcome back!</h1> : <h1>Please log in</h1>}</div>
  );
}
```

### Inline with Text

```jsx
function Status({ isOnline }) {
  return <div>User is {isOnline ? "online" : "offline"}</div>;
}
```

### With Components

```jsx
function Page({ isLoggedIn }) {
  return <div>{isLoggedIn ? <Dashboard /> : <LoginForm />}</div>;
}
```

### Nested Ternaries (Use Sparingly!)

```jsx
// ⚠️ Readable (barely)
function Badge({ status }) {
  return (
    <span
      className={
        status === "success" ? "green" : status === "error" ? "red" : "gray"
      }
    >
      {status}
    </span>
  );
}

// ✅ Better: Use function or object
function Badge({ status }) {
  const colorMap = {
    success: "green",
    error: "red",
    default: "gray",
  };

  return <span className={colorMap[status] || colorMap.default}>{status}</span>;
}
```

---

## 4. Logical AND (&&) Operator

Use **&&** to **conditionally show** a single element (not for either/or).

### How it Works

```javascript
// JavaScript behavior
true && "Hello"; // → "Hello"
false && "Hello"; // → false (doesn't render in React)
```

### Basic Example

```jsx
function Notification({ hasUnread, count }) {
  return (
    <div>
      <h1>Messages</h1>
      {hasUnread && <span>You have {count} unread messages</span>}
    </div>
  );
}
```

### Multiple Conditions

```jsx
function Profile({ user, isAdmin }) {
  return (
    <div>
      <h1>{user.name}</h1>
      {user.isVerified && <span>✓ Verified</span>}
      {isAdmin && <button>Admin Panel</button>}
      {user.isPremium && <span>⭐ Premium Member</span>}
    </div>
  );
}
```

### ⚠️ Common Pitfall: Falsy Values

```jsx
function Items({ count }) {
  return (
    <div>
      {/* ❌ BAD: Shows "0" when count is 0 */}
      {count && <p>You have {count} items</p>}

      {/* ✅ GOOD: Explicitly check > 0 */}
      {count > 0 && <p>You have {count} items</p>}

      {/* ✅ GOOD: Convert to boolean */}
      {Boolean(count) && <p>You have {count} items</p>}
    </div>
  );
}
```

**Why the bug?**

- `0 && <p>...</p>` → evaluates to `0`
- React renders `0` to the screen!
- Fix: Use explicit boolean check

---

## 5. Logical OR (||) Operator

Use **||** for **fallback values**.

### Basic Example

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name || "Guest"}!</h1>;
}

// name = "John" → "Hello, John!"
// name = ""      → "Hello, Guest!"
// name = null    → "Hello, Guest!"
```

### With Components

```jsx
function Avatar({ user }) {
  return <div>{user.avatar || <DefaultAvatar />}</div>;
}
```

### Default Props (Alternative)

```jsx
// Using ||
function Button({ label, color }) {
  return (
    <button style={{ backgroundColor: color || "blue" }}>
      {label || "Click me"}
    </button>
  );
}

// Better: Default parameters
function Button({ label = "Click me", color = "blue" }) {
  return <button style={{ backgroundColor: color }}>{label}</button>;
}
```

---

## 6. Nullish Coalescing (??) Operator

Use **??** for fallbacks **only when null/undefined** (not other falsy values like `0` or `""`).

### Difference: || vs ??

```jsx
function Counter({ count }) {
  // With || (treats 0 as falsy)
  const value1 = count || "No items";
  console.log(value1); // count=0 → "No items" ❌

  // With ?? (only null/undefined are falsy)
  const value2 = count ?? "No items";
  console.log(value2); // count=0 → 0 ✅

  return <div>Count: {value2}</div>;
}
```

### When to Use ??

```jsx
function UserAge({ age }) {
  // ✅ Use ?? when 0 is a valid value
  return <div>Age: {age ?? "Not specified"}</div>;
}

// age = 0     → "Age: 0" ✅
// age = null  → "Age: Not specified" ✅
// age = ""    → "Age: " (empty string is NOT null/undefined)
```

---

## 7. Switch Statements

Use **switch** for **multiple specific values** (not ranges or complex conditions).

### Example: Status Badges

```jsx
function StatusBadge({ status }) {
  let badge;

  switch (status) {
    case "pending":
      badge = <span className="yellow">⏳ Pending</span>;
      break;
    case "approved":
      badge = <span className="green">✓ Approved</span>;
      break;
    case "rejected":
      badge = <span className="red">✗ Rejected</span>;
      break;
    default:
      badge = <span className="gray">Unknown</span>;
  }

  return <div>{badge}</div>;
}
```

### Better: Object Mapping

```jsx
function StatusBadge({ status }) {
  const badges = {
    pending: <span className="yellow">⏳ Pending</span>,
    approved: <span className="green">✓ Approved</span>,
    rejected: <span className="red">✗ Rejected</span>,
  };

  return <div>{badges[status] || <span className="gray">Unknown</span>}</div>;
}
```

---

## 8. Conditional Props

### Pattern 1: Conditional className

```jsx
function Button({ isPrimary, isDisabled }) {
  return (
    <button
      className={`btn ${isPrimary ? "btn-primary" : "btn-secondary"} ${
        isDisabled ? "disabled" : ""
      }`}
      disabled={isDisabled}
    >
      Click
    </button>
  );
}

// Better: Use template literals
function Button({ isPrimary, isDisabled }) {
  const className = [
    "btn",
    isPrimary ? "btn-primary" : "btn-secondary",
    isDisabled && "disabled",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={className} disabled={isDisabled}>
      Click
    </button>
  );
}

// Best: Use classnames library
import classNames from "classnames";

function Button({ isPrimary, isDisabled }) {
  return (
    <button
      className={classNames("btn", {
        "btn-primary": isPrimary,
        "btn-secondary": !isPrimary,
        disabled: isDisabled,
      })}
      disabled={isDisabled}
    >
      Click
    </button>
  );
}
```

### Pattern 2: Conditional Attributes

```jsx
function Input({ isRequired, isDisabled, maxLength }) {
  return (
    <input
      required={isRequired}
      disabled={isDisabled}
      {...(maxLength && { maxLength })} // Only add if maxLength exists
    />
  );
}
```

### Pattern 3: Conditional Styles

```jsx
function Box({ isActive }) {
  return (
    <div
      style={{
        backgroundColor: isActive ? "blue" : "gray",
        border: isActive ? "2px solid blue" : "1px solid gray",
      }}
    >
      Content
    </div>
  );
}
```

---

## 9. Nothing Renders (null, undefined, true, false)

These values **don't render** anything in React - they're safe to use conditionally:

```jsx
function Component() {
  return (
    <div>
      {null} {/* Renders nothing */}
      {undefined} {/* Renders nothing */}
      {true} {/* Renders nothing */}
      {false} {/* Renders nothing */}
      {0} {/* ⚠️ Renders "0" */}
      {""} {/* ⚠️ Renders empty string */}
      {[]} {/* Renders nothing (empty array) */}
    </div>
  );
}
```

**Use this to your advantage:**

```jsx
function Notification({ show, message }) {
  return (
    <div>
      {show && <div className="notification">{message}</div>}
      {/* If show is false, React renders nothing */}
    </div>
  );
}
```

---

## 10. Immediately Invoked Function Expression (IIFE)

Use **IIFE** for **complex logic inside JSX** (rarely needed).

### Example

```jsx
function UserStatus({ user }) {
  return (
    <div>
      {(() => {
        if (user.isAdmin) {
          return <AdminPanel />;
        } else if (user.isPremium) {
          return <PremiumFeatures />;
        } else if (user.isBanned) {
          return <BannedMessage />;
        } else {
          return <BasicFeatures />;
        }
      })()}
    </div>
  );
}
```

**Better:** Move logic outside JSX:

```jsx
function UserStatus({ user }) {
  const getContent = () => {
    if (user.isAdmin) return <AdminPanel />;
    if (user.isPremium) return <PremiumFeatures />;
    if (user.isBanned) return <BannedMessage />;
    return <BasicFeatures />;
  };

  return <div>{getContent()}</div>;
}
```

**Best:** Use early returns:

```jsx
function UserStatus({ user }) {
  if (user.isAdmin) return <AdminPanel />;
  if (user.isPremium) return <PremiumFeatures />;
  if (user.isBanned) return <BannedMessage />;
  return <BasicFeatures />;
}
```

---

## 11. Common Patterns

### Pattern 1: Loading States

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  // Early returns for edge cases
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  // Main render
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

---

### Pattern 2: Authentication

```jsx
function Page() {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {user.isAdmin && <AdminPanel />}
      {user.isPremium && <PremiumFeatures />}
    </div>
  );
}
```

---

### Pattern 3: Feature Flags

```jsx
function Dashboard() {
  const { features } = useFeatureFlags();

  return (
    <div>
      <h1>Dashboard</h1>
      {features.newDesign && <NewDesignComponent />}
      {features.analytics && <AnalyticsPanel />}
      {features.beta && <BetaFeatures />}
    </div>
  );
}
```

---

### Pattern 4: Permissions

```jsx
function UserActions({ user, currentUser }) {
  const canEdit = currentUser.id === user.id || currentUser.isAdmin;
  const canDelete = currentUser.isAdmin;

  return (
    <div>
      <h1>{user.name}</h1>
      {canEdit && <button>Edit</button>}
      {canDelete && <button>Delete</button>}
    </div>
  );
}
```

---

### Pattern 5: Empty States

```jsx
function TodoList({ todos }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet!</p>
        <button>Add your first todo</button>
      </div>
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```

---

## 12. Common Mistakes & Fixes

### ❌ Mistake 1: Using 0 with &&

```jsx
// BAD: Shows "0" when count is 0
{
  count && <div>Count: {count}</div>;
}

// GOOD: Explicit boolean check
{
  count > 0 && <div>Count: {count}</div>;
}
{
  Boolean(count) && <div>Count: {count}</div>;
}
```

---

### ❌ Mistake 2: Forgetting Parentheses in Ternary

```jsx
// BAD: Syntax error
{isLoggedIn ?
  <h1>Welcome</h1>
  <p>Content</p>
: <LoginForm />}

// GOOD: Wrap in parentheses
{isLoggedIn ? (
  <>
    <h1>Welcome</h1>
    <p>Content</p>
  </>
) : (
  <LoginForm />
)}
```

---

### ❌ Mistake 3: Complex Ternaries

```jsx
// BAD: Unreadable nested ternaries
{
  status === "loading" ? (
    <Spinner />
  ) : status === "error" ? (
    <Error />
  ) : status === "empty" ? (
    <Empty />
  ) : (
    <Content />
  );
}

// GOOD: Use if/else or early return
if (status === "loading") return <Spinner />;
if (status === "error") return <Error />;
if (status === "empty") return <Empty />;
return <Content />;
```

---

### ❌ Mistake 4: Returning Wrong Type

```jsx
// BAD: Returns object, not JSX
function Component({ show }) {
  return {show && <div>Content</div>};  // ❌ Object wrapping!
}

// GOOD: Return JSX directly
function Component({ show }) {
  return show && <div>Content</div>;
}

// BETTER: Explicit null
function Component({ show }) {
  return show ? <div>Content</div> : null;
}
```

---

### ❌ Mistake 5: Conditional Hooks

```jsx
// ❌ BAD: Hooks must be at top level, not conditional!
function Component({ needsData }) {
  if (needsData) {
    const [data, setData] = useState(null); // ❌ Breaks Rules of Hooks
  }
  return <div>...</div>;
}

// ✅ GOOD: Hooks at top level, conditionally use the result
function Component({ needsData }) {
  const [data, setData] = useState(null);

  if (!needsData) {
    return <div>No data needed</div>;
  }

  return <div>Data: {data}</div>;
}
```

---

## 13. Interview Questions

### Q1: What is conditional rendering?

**Answer:** Conditional rendering means showing different UI based on conditions, just like if/else in JavaScript. React components can return different JSX based on props, state, or other conditions.

```jsx
{
  isLoggedIn ? <Dashboard /> : <LoginForm />;
}
```

---

### Q2: What are the different ways to conditionally render in React?

**Answer:**

1. **if/else** statements (outside JSX)
2. **Ternary operator** (`? :`) for either/or in JSX
3. **Logical AND** (`&&`) to show/hide elements
4. **Logical OR** (`||`) for fallback values
5. **Nullish coalescing** (`??`) for null/undefined only
6. **Early return** (guard clauses)
7. **Switch statements** for multiple values

---

### Q3: When should you use && vs ternary operator?

**Answer:**

- Use **&&** to **show/hide** a single element
  ```jsx
  {
    isAdmin && <AdminPanel />;
  }
  ```
- Use **ternary** for **either/or** (two options)
  ```jsx
  {
    isLoggedIn ? <Dashboard /> : <LoginForm />;
  }
  ```

---

### Q4: What's the problem with using 0 with &&?

**Answer:** `0 && <Component />` evaluates to `0`, and React renders `0` to the screen!

**Fix:** Use explicit boolean check:

```jsx
{
  count > 0 && <div>Count: {count}</div>;
}
```

---

### Q5: What values don't render in React?

**Answer:** These values render nothing (safe to use):

- `null`
- `undefined`
- `true`
- `false`
- `[]` (empty array)

These values **DO** render:

- `0` (renders "0")
- `""` (renders empty string)
- `NaN` (renders "NaN")

---

### Q6: What's the difference between || and ??

**Answer:**

| Operator | Falsy Values Trigger Fallback                  | Use Case                                  |
| -------- | ---------------------------------------------- | ----------------------------------------- |
| `\|\|`   | `0`, `""`, `false`, `null`, `undefined`, `NaN` | When all falsy values should use fallback |
| `??`     | Only `null` and `undefined`                    | When `0`, `""`, `false` are valid values  |

```jsx
const count = 0;
count || 10; // → 10 (treats 0 as falsy)
count ?? 10; // → 0 (0 is NOT null/undefined)
```

---

### Q7: Should you use if/else inside JSX?

**Answer:** No, if/else statements don't work inside JSX. Use them before the return statement, or use ternary/&& inside JSX.

```jsx
// ❌ BAD: Syntax error
return <div>if (show) {<p>Content</p>}</div>;

// ✅ GOOD: Use ternary or &&
return <div>{show && <p>Content</p>}</div>;
```

---

### Q8: What's the early return pattern?

**Answer:** Handle edge cases first with early returns, keeping the main logic at the end:

```jsx
function Component({ user }) {
  if (!user) return <div>Loading...</div>;
  if (user.isBanned) return <div>Banned</div>;

  // Main render for happy path
  return <div>Welcome, {user.name}</div>;
}
```

**Benefits:** Reduces nesting, more readable, handles edge cases explicitly.

---

### Q9: Can you use hooks conditionally?

**Answer:** No! Hooks must be called at the top level, not inside conditions, loops, or nested functions.

```jsx
// ❌ BAD
if (condition) {
  const [state, setState] = useState(0);
}

// ✅ GOOD
const [state, setState] = useState(0);
if (condition) {
  // Use state here
}
```

---

### Q10: How do you handle loading/error/success states?

**Answer:** Use early returns to handle loading and error states first:

```jsx
function Component() {
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!data) return <Empty />;

  return <Content data={data} />;
}
```

---

## 14. Best Practices Summary

### ✅ Always Do:

1. **Use early returns** for edge cases (loading, errors)
2. **Use &&** for show/hide single elements
3. **Use ternary** for either/or choices
4. **Use explicit boolean checks** with && (`count > 0`, not `count`)
5. **Keep ternaries simple** - avoid nesting
6. **Extract complex logic** outside JSX

### ❌ Never Do:

1. **Use if/else inside JSX** (syntax error)
2. **Nest ternaries deeply** (unreadable)
3. **Use hooks conditionally** (breaks Rules of Hooks)
4. **Use `0` with &&** without boolean check
5. **Return objects** when you mean JSX

### 🎯 Advanced:

- Use object mapping for multiple conditions (cleaner than switch)
- Consider extracting complex conditionals into separate components
- Use feature flags for A/B testing
- Prefer composition over conditional rendering when possible

---

## Summary: Conditional Rendering Checklist

When conditionally rendering, ensure you:

- ✅ Use appropriate technique (if/else, ternary, &&, ||, ??)
- ✅ Handle edge cases with early returns
- ✅ Use explicit boolean checks with && operator
- ✅ Keep JSX conditionals simple and readable
- ✅ Never use hooks conditionally
- ✅ Understand what values render vs don't render
- ✅ Extract complex logic outside JSX

Your conditional rendering knowledge is interview-ready when you can explain:

1. Different conditional rendering techniques and when to use each
2. Why `0 && <Component />` renders "0" and how to fix it
3. Difference between `||` and `??` operators
4. Early return pattern and its benefits
5. That hooks cannot be called conditionally
6. What values render nothing (`null`, `undefined`, `true`, `false`)


