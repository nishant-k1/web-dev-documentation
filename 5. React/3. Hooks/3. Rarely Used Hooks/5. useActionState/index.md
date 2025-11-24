# useActionState Hook (React 19)

## TL;DR
- **`useActionState`** = Manage state updates from async form actions
- Returns `[state, formAction, isPending]`
- **`state`**: Current state (updated after action completes)
- **`formAction`**: Function to pass to form's `action` prop
- **`isPending`**: Boolean indicating if action is in progress
- Automatically handles **pending states** and **error handling**
- Works with **Server Actions** and async functions
- **Use case:** Forms that update state based on server response
- **React 19** feature (replaces useFormState from React 18 Canary)

---

## 1. What is useActionState?

**`useActionState`** is a React 19 Hook that lets you update state based on the result of a form action. It handles async actions, provides pending state, and manages errors automatically.

### The Problem (Without useActionState)

```jsx
function CommentForm({ postId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const formData = new FormData(e.target);
      const newComment = await addComment(postId, formData);
      setComments([...comments, newComment]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <textarea name="text" required />
      <button disabled={isPending}>
        {isPending ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
```

**Problem:** Lots of boilerplate for state, loading, and error handling.

---

### The Solution (With useActionState)

```jsx
import { useActionState } from "react";

function CommentForm({ postId }) {
  async function addCommentAction(prevState, formData) {
    try {
      const text = formData.get("text");
      const newComment = await addComment(postId, text);
      
      return {
        comments: [...prevState.comments, newComment],
        error: null,
      };
    } catch (error) {
      return {
        comments: prevState.comments,
        error: error.message,
      };
    }
  }

  const [state, formAction, isPending] = useActionState(
    addCommentAction,
    { comments: [], error: null }
  );

  return (
    <form action={formAction}>
      {state.error && <div className="error">{state.error}</div>}
      
      <CommentsDisplay comments={state.comments} />
      
      <textarea name="text" required />
      <button disabled={isPending}>
        {isPending ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
```

**Result:** Cleaner code, automatic state management!

---

## 2. Syntax

```jsx
const [state, formAction, isPending] = useActionState(action, initialState, permalink);
```

### Parameters

1. **`action(previousState, formData)`**: Function called when form is submitted
   - `previousState`: The previous state (initially `initialState`)
   - `formData`: The FormData from the form submission
   - Returns: New state (can be async)

2. **`initialState`**: Initial state value

3. **`permalink`** (optional): URL for progressive enhancement
   - If form is submitted before JavaScript loads, browser navigates to this URL

### Returns

1. **`state`**: Current state (updated after action completes)
2. **`formAction`**: Function to pass to `<form action={...}>`
3. **`isPending`**: Boolean indicating if action is in progress

---

## 3. How useActionState Works

### Flow

```jsx
function LoginForm() {
  async function loginAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const user = await login(email, password);
      return { user, error: null };
    } catch (error) {
      return { user: null, error: error.message };
    }
  }

  const [state, formAction, isPending] = useActionState(
    loginAction,
    { user: null, error: null }
  );

  return (
    <form action={formAction}>
      {state.error && <div className="error">{state.error}</div>}
      {state.user && <div>Welcome, {state.user.name}!</div>}

      <input name="email" required />
      <input name="password" type="password" required />
      
      <button disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

**Timeline:**

1. **Initial render:**
   - `state = { user: null, error: null }` (initialState)
   - `isPending = false`

2. **User submits form:**
   - `isPending` becomes `true`
   - `loginAction` is called with prevState and formData
   - Form stays enabled for accessibility

3. **While action is running:**
   - `isPending = true`
   - State unchanged (still shows previous state)
   - User can see loading indicator

4. **Action completes (success):**
   - `state` updates to returned value
   - `isPending` becomes `false`
   - Form re-renders with new state

5. **OR Action completes (error):**
   - `state` updates with error
   - `isPending` becomes `false`
   - Error message displays

---

## 4. Common Use Cases

### Use Case 1: Form with Success/Error Messages

```jsx
function ContactForm() {
  async function submitAction(prevState, formData) {
    try {
      await sendContactEmail({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      });

      return {
        success: true,
        error: null,
        message: "Message sent successfully!",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: null,
      };
    }
  }

  const [state, formAction, isPending] = useActionState(submitAction, {
    success: false,
    error: null,
    message: null,
  });

  return (
    <form action={formAction}>
      {state.error && (
        <div className="error">❌ {state.error}</div>
      )}
      {state.success && (
        <div className="success">✅ {state.message}</div>
      )}

      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />

      <button disabled={isPending}>
        {isPending ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
```

---

### Use Case 2: Todo List

```jsx
function TodoApp() {
  async function addTodoAction(prevState, formData) {
    const text = formData.get("text");

    try {
      const newTodo = await saveTodo(text);
      
      return {
        todos: [...prevState.todos, newTodo],
        error: null,
      };
    } catch (error) {
      return {
        todos: prevState.todos,
        error: "Failed to add todo",
      };
    }
  }

  const [state, formAction, isPending] = useActionState(addTodoAction, {
    todos: [],
    error: null,
  });

  return (
    <div>
      {state.error && <div className="error">{state.error}</div>}

      <ul>
        {state.todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>

      <form action={formAction}>
        <input name="text" placeholder="New todo" required />
        <button disabled={isPending}>
          {isPending ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
}
```

---

### Use Case 3: Multi-Step Form

```jsx
function SignupWizard() {
  async function handleStepAction(prevState, formData) {
    const { step } = prevState;

    if (step === 1) {
      // Validate step 1
      const email = formData.get("email");
      const isValid = await validateEmail(email);
      
      if (!isValid) {
        return {
          ...prevState,
          error: "Invalid email",
        };
      }

      return {
        step: 2,
        email,
        error: null,
      };
    }

    if (step === 2) {
      // Validate step 2 and submit
      const password = formData.get("password");
      
      try {
        await createAccount(prevState.email, password);
        return {
          step: 3,
          error: null,
          success: true,
        };
      } catch (error) {
        return {
          ...prevState,
          error: error.message,
        };
      }
    }

    return prevState;
  }

  const [state, formAction, isPending] = useActionState(handleStepAction, {
    step: 1,
    email: "",
    error: null,
    success: false,
  });

  return (
    <form action={formAction}>
      {state.error && <div className="error">{state.error}</div>}

      {state.step === 1 && (
        <>
          <h2>Step 1: Email</h2>
          <input name="email" type="email" required />
        </>
      )}

      {state.step === 2 && (
        <>
          <h2>Step 2: Password</h2>
          <p>Email: {state.email}</p>
          <input name="password" type="password" required />
        </>
      )}

      {state.step === 3 && (
        <div>✅ Account created successfully!</div>
      )}

      {state.step < 3 && (
        <button disabled={isPending}>
          {isPending ? "Processing..." : "Next"}
        </button>
      )}
    </form>
  );
}
```

---

### Use Case 4: Form with Validation

```jsx
function ProductForm() {
  async function saveProductAction(prevState, formData) {
    const name = formData.get("name");
    const price = formData.get("price");

    // Validation
    const errors = {};
    if (!name || name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }
    if (!price || isNaN(price) || price <= 0) {
      errors.price = "Price must be a positive number";
    }

    if (Object.keys(errors).length > 0) {
      return {
        ...prevState,
        errors,
        success: false,
      };
    }

    // Save
    try {
      const product = await saveProduct({ name, price });
      return {
        product,
        errors: {},
        success: true,
      };
    } catch (error) {
      return {
        ...prevState,
        errors: { general: error.message },
        success: false,
      };
    }
  }

  const [state, formAction, isPending] = useActionState(saveProductAction, {
    product: null,
    errors: {},
    success: false,
  });

  return (
    <form action={formAction}>
      {state.errors.general && (
        <div className="error">{state.errors.general}</div>
      )}
      {state.success && (
        <div className="success">Product saved!</div>
      )}

      <div>
        <input name="name" placeholder="Product name" required />
        {state.errors.name && (
          <span className="field-error">{state.errors.name}</span>
        )}
      </div>

      <div>
        <input name="price" type="number" step="0.01" required />
        {state.errors.price && (
          <span className="field-error">{state.errors.price}</span>
        )}
      </div>

      <button disabled={isPending}>
        {isPending ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}
```

---

## 5. With Server Actions

`useActionState` works seamlessly with React 19 Server Actions:

```jsx
// app/actions.js
"use server";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const content = formData.get("content");

  try {
    const post = await db.posts.create({ title, content });
    revalidatePath("/posts");
    
    return {
      post,
      error: null,
      success: true,
    };
  } catch (error) {
    return {
      post: null,
      error: "Failed to create post",
      success: false,
    };
  }
}

// app/components/CreatePostForm.jsx
"use client";

import { useActionState } from "react";
import { createPost } from "../actions";

export function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createPost, {
    post: null,
    error: null,
    success: false,
  });

  return (
    <form action={formAction}>
      {state.error && <div className="error">{state.error}</div>}
      {state.success && <div className="success">Post created!</div>}

      <input name="title" placeholder="Title" required />
      <textarea name="content" placeholder="Content" required />

      <button disabled={isPending}>
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
```

---

## 6. Progressive Enhancement with Permalink

The third parameter enables progressive enhancement (form works without JavaScript):

```jsx
function NewsletterForm() {
  async function subscribeAction(prevState, formData) {
    const email = formData.get("email");
    
    try {
      await subscribe(email);
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  const [state, formAction, isPending] = useActionState(
    subscribeAction,
    { success: false, error: null },
    "/subscribe" // ← Permalink: Falls back to this URL if no JS
  );

  return (
    <form action={formAction}>
      {state.error && <div>{state.error}</div>}
      {state.success && <div>Subscribed!</div>}

      <input name="email" type="email" required />
      <button>{isPending ? "Subscribing..." : "Subscribe"}</button>
    </form>
  );
}
```

**How it works:**
- **With JavaScript:** Form submits via `useActionState`
- **Without JavaScript:** Form submits to `/subscribe` URL

---

## 7. Resetting Form After Success

```jsx
function CommentForm({ postId }) {
  const formRef = useRef(null);

  async function addCommentAction(prevState, formData) {
    try {
      const comment = await addComment(postId, formData.get("text"));
      
      // Reset form on success
      formRef.current?.reset();
      
      return {
        comments: [...prevState.comments, comment],
        error: null,
      };
    } catch (error) {
      return {
        comments: prevState.comments,
        error: error.message,
      };
    }
  }

  const [state, formAction, isPending] = useActionState(addCommentAction, {
    comments: [],
    error: null,
  });

  return (
    <form ref={formRef} action={formAction}>
      {state.error && <div>{state.error}</div>}

      <CommentList comments={state.comments} />

      <textarea name="text" required />
      <button disabled={isPending}>
        {isPending ? "Posting..." : "Post"}
      </button>
    </form>
  );
}
```

---

## 8. Combining with useOptimistic

Use together for instant feedback + server sync:

```jsx
import { useActionState, useOptimistic } from "react";

function LikeButton({ postId, initialLikes }) {
  async function likeAction(prevState, formData) {
    try {
      const newLikes = await likePost(postId);
      return { likes: newLikes, error: null };
    } catch (error) {
      return { likes: prevState.likes, error: error.message };
    }
  }

  const [state, formAction, isPending] = useActionState(likeAction, {
    likes: initialLikes,
    error: null,
  });

  const [optimisticLikes, addOptimistic] = useOptimistic(
    state.likes,
    (current) => current + 1
  );

  return (
    <form
      action={async (formData) => {
        addOptimistic(); // Instant update
        await formAction(formData); // Server update
      }}
    >
      <button type="submit">
        ❤️ {optimisticLikes}
      </button>
      {state.error && <div>{state.error}</div>}
    </form>
  );
}
```

---

## 9. Real-World Examples

### Example 1: User Settings Form

```jsx
function SettingsForm({ currentSettings }) {
  async function saveSettingsAction(prevState, formData) {
    const settings = {
      notifications: formData.get("notifications") === "on",
      theme: formData.get("theme"),
      language: formData.get("language"),
    };

    try {
      await updateSettings(settings);
      
      return {
        settings,
        saved: true,
        error: null,
      };
    } catch (error) {
      return {
        settings: prevState.settings,
        saved: false,
        error: "Failed to save settings",
      };
    }
  }

  const [state, formAction, isPending] = useActionState(saveSettingsAction, {
    settings: currentSettings,
    saved: false,
    error: null,
  });

  return (
    <form action={formAction}>
      {state.error && <div className="error">{state.error}</div>}
      {state.saved && <div className="success">Settings saved!</div>}

      <label>
        <input
          type="checkbox"
          name="notifications"
          defaultChecked={state.settings.notifications}
        />
        Enable notifications
      </label>

      <select name="theme" defaultValue={state.settings.theme}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <select name="language" defaultValue={state.settings.language}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>

      <button disabled={isPending}>
        {isPending ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
```

---

### Example 2: Search Form with History

```jsx
function SearchForm() {
  async function searchAction(prevState, formData) {
    const query = formData.get("query");

    try {
      const results = await searchAPI(query);
      
      return {
        results,
        history: [...prevState.history, query],
        error: null,
      };
    } catch (error) {
      return {
        ...prevState,
        error: "Search failed",
      };
    }
  }

  const [state, formAction, isPending] = useActionState(searchAction, {
    results: [],
    history: [],
    error: null,
  });

  return (
    <div>
      <form action={formAction}>
        <input
          name="query"
          placeholder="Search..."
          list="history"
          required
        />
        <datalist id="history">
          {state.history.map((term, i) => (
            <option key={i} value={term} />
          ))}
        </datalist>

        <button disabled={isPending}>
          {isPending ? "Searching..." : "Search"}
        </button>
      </form>

      {state.error && <div>{state.error}</div>}

      <SearchResults results={state.results} />
    </div>
  );
}
```

---

## 10. Interview Questions

### Q1: What is useActionState?

**Answer:** `useActionState` is a React 19 Hook that manages state updates from form actions. It handles async operations, provides pending state, and automatically updates state based on action results.

```jsx
const [state, formAction, isPending] = useActionState(action, initialState);
```

---

### Q2: What does useActionState return?

**Answer:** Returns a tuple with:
1. **`state`**: Current state value
2. **`formAction`**: Function to pass to form's `action` prop
3. **`isPending`**: Boolean indicating if action is running

---

### Q3: What parameters does the action function receive?

**Answer:** The action receives two parameters:
1. **`previousState`**: The previous/current state
2. **`formData`**: FormData from the form submission

```jsx
async function myAction(prevState, formData) {
  const value = formData.get("fieldName");
  // Process and return new state
  return { ...prevState, newField: value };
}
```

---

### Q4: How is useActionState different from useState?

**Answer:**

| useState | useActionState |
|----------|---------------|
| Synchronous updates | Async action support |
| Manual pending state | Auto `isPending` flag |
| No FormData handling | Integrated with forms |
| Generic state | Form-specific state |

---

### Q5: Can you use useActionState without a form?

**Answer:** Not directly. It's designed for forms. If you need async state updates outside forms, use `useState` with async functions or `useTransition`.

---

### Q6: What's the permalink parameter for?

**Answer:** The third parameter enables progressive enhancement. If JavaScript hasn't loaded, the form falls back to submitting to this URL.

```jsx
useActionState(action, initialState, "/fallback-url");
```

---

### Q7: How do you handle errors with useActionState?

**Answer:** Return error information in the state:

```jsx
async function action(prevState, formData) {
  try {
    const result = await saveData(formData);
    return { data: result, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}
```

---

### Q8: Can you combine useActionState with useOptimistic?

**Answer:** Yes! Use `useOptimistic` for instant UI updates and `useActionState` for server sync:

```jsx
const [state, formAction] = useActionState(...);
const [optimisticState, addOptimistic] = useOptimistic(state.data, ...);
```

---

### Q9: What React version is useActionState available in?

**Answer:** React 19 (replaces `useFormState` from React 18 Canary).

---

### Q10: Where is useActionState imported from?

**Answer:** From `"react"` (unlike `useFormStatus` which is from `"react-dom"`):

```jsx
import { useActionState } from "react";
```

---

## 11. Best Practices

### ✅ Always Do:

1. **Return consistent state shape** from action
2. **Handle errors in action** (don't let them throw unhandled)
3. **Show loading state** using `isPending`
4. **Reset form after success** if appropriate
5. **Validate data in action** before processing

### ❌ Never Do:

1. **Change state shape** between success/error
2. **Forget error handling** (always try/catch)
3. **Use without forms** (not designed for it)
4. **Mutate prevState** (return new state)
5. **Forget to show pending feedback**

### 🎯 Advanced:

- Combine with `useOptimistic` for instant feedback
- Use permalink for progressive enhancement
- Implement retry logic on errors
- Add field-level validation
- Track submission history in state

---

## Summary: useActionState Checklist

When using `useActionState`, ensure you:

- ✅ Import from `"react"` (not "react-dom")
- ✅ Pass action and initialState
- ✅ Use `formAction` in form's action prop
- ✅ Handle errors in action function
- ✅ Show loading state with `isPending`
- ✅ Return consistent state shape
- ✅ Consider permalink for progressive enhancement

Your `useActionState` knowledge is interview-ready when you can explain:

1. What it does (manages state from form actions)
2. What it returns (state, formAction, isPending)
3. What action receives (prevState, formData)
4. How to handle errors (return error in state)
5. Difference from useState
6. Use cases (forms with async operations)
7. Integration with Server Actions



