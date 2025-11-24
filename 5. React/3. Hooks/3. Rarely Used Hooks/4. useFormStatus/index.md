# useFormStatus Hook (React 19)

## TL;DR
- **`useFormStatus`** = Get the status of a parent `<form>` during submission
- Returns `{ pending, data, method, action }`
- **`pending`**: Boolean indicating if form is submitting
- **`data`**: FormData being submitted
- **Must be used in a component rendered inside `<form>`** (not the form component itself)
- Works with **Server Actions** and form actions
- **Use case:** Show loading states, disable buttons, show progress
- **React 19** feature for better form UX

---

## 1. What is useFormStatus?

**`useFormStatus`** is a React 19 Hook that gives you information about the last form submission, primarily whether the form is currently pending (submitting).

### The Problem (Without useFormStatus)

```jsx
function LoginForm() {
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    try {
      await loginUser(formData);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      <input name="password" type="password" />
      <button disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

**Problem:** Manual state management, repetitive code for every form.

---

### The Solution (With useFormStatus)

```jsx
import { useFormStatus } from "react-dom";

// Submit button as separate component
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

function LoginForm() {
  async function loginAction(formData) {
    "use server"; // Server Action
    await loginUser(formData);
  }

  return (
    <form action={loginAction}>
      <input name="email" />
      <input name="password" type="password" />
      <SubmitButton />
    </form>
  );
}
```

**Result:** Automatic pending state, cleaner code!

---

## 2. Syntax

```jsx
const { pending, data, method, action } = useFormStatus();
```

### Returns

An object with four properties:

1. **`pending`**: Boolean
   - `true` if form is submitting
   - `false` otherwise
   - **Most commonly used**

2. **`data`**: FormData | null
   - FormData being submitted
   - `null` if not submitting

3. **`method`**: "get" | "post" | "dialog" | undefined
   - HTTP method of the form
   - `undefined` if not submitting

4. **`action`**: string | function | null
   - The `action` prop value from `<form>`
   - URL string or function reference

---

## 3. Key Rule: Must Be Inside Form

**CRITICAL:** `useFormStatus` must be called in a component **rendered inside** the `<form>`, not in the form component itself.

### ❌ WRONG: In Form Component

```jsx
function LoginForm() {
  const { pending } = useFormStatus(); // ❌ WON'T WORK!

  return (
    <form action={loginAction}>
      <button disabled={pending}>Login</button>
    </form>
  );
}
```

**Why it fails:** The Hook reads context from parent `<form>`, but it's called inside the form component itself.

---

### ✅ CORRECT: In Child Component

```jsx
function SubmitButton() {
  const { pending } = useFormStatus(); // ✅ WORKS!

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}

function LoginForm() {
  return (
    <form action={loginAction}>
      <input name="email" />
      <SubmitButton /> {/* Child of form */}
    </form>
  );
}
```

---

## 4. Common Use Cases

### Use Case 1: Submit Button with Loading State

```jsx
function SubmitButton({ children, loadingText }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? loadingText : children}
    </button>
  );
}

// Usage
<form action={saveAction}>
  <input name="title" />
  <SubmitButton loadingText="Saving...">
    Save Post
  </SubmitButton>
</form>
```

---

### Use Case 2: Disable All Form Inputs During Submission

```jsx
function FormInput({ name, label, ...props }) {
  const { pending } = useFormStatus();

  return (
    <div>
      <label>{label}</label>
      <input
        name={name}
        disabled={pending}
        {...props}
      />
    </div>
  );
}

function ContactForm() {
  return (
    <form action={sendMessageAction}>
      <FormInput name="name" label="Name" />
      <FormInput name="email" label="Email" type="email" />
      <FormInput name="message" label="Message" />
      <SubmitButton>Send</SubmitButton>
    </form>
  );
}
```

---

### Use Case 3: Show Progress Indicator

```jsx
function FormProgress() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="progress-bar">
      <div className="progress-indicator">
        <Spinner /> Submitting form...
      </div>
    </div>
  );
}

function SignupForm() {
  return (
    <form action={signupAction}>
      <FormProgress />
      
      <input name="username" />
      <input name="email" />
      <input name="password" type="password" />
      
      <SubmitButton>Sign Up</SubmitButton>
    </form>
  );
}
```

---

### Use Case 4: Show Submitted Data

```jsx
function FormDebug() {
  const { pending, data, method } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="debug-panel">
      <p>Method: {method}</p>
      <p>Submitting data:</p>
      <pre>
        {JSON.stringify(
          Object.fromEntries(data?.entries() || []),
          null,
          2
        )}
      </pre>
    </div>
  );
}
```

---

## 5. With Server Actions

`useFormStatus` is designed to work seamlessly with React 19 Server Actions:

```jsx
// app/actions.js
"use server";

export async function createPost(formData) {
  const title = formData.get("title");
  const content = formData.get("content");
  
  await db.posts.create({ title, content });
  revalidatePath("/posts");
}

// app/components/CreatePostForm.jsx
"use client";

import { createPost } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create Post"}
    </button>
  );
}

export function CreatePostForm() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Post title" required />
      <textarea name="content" placeholder="Content" required />
      <SubmitButton />
    </form>
  );
}
```

---

## 6. Styling Pending State

### Example: Dim Form During Submission

```jsx
function FormContainer({ children }) {
  const { pending } = useFormStatus();

  return (
    <div className={pending ? "opacity-50 pointer-events-none" : ""}>
      {children}
    </div>
  );
}

function MyForm() {
  return (
    <form action={submitAction}>
      <FormContainer>
        <input name="email" />
        <input name="password" type="password" />
      </FormContainer>
      <SubmitButton>Login</SubmitButton>
    </form>
  );
}
```

---

### Example: Loading Spinner Overlay

```jsx
function FormOverlay() {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return (
    <div className="form-overlay">
      <Spinner size="large" />
      <p>Processing...</p>
    </div>
  );
}

function PaymentForm() {
  return (
    <form action={processPaymentAction} className="relative">
      <FormOverlay />
      
      <input name="cardNumber" />
      <input name="expiry" />
      <input name="cvv" />
      
      <SubmitButton>Pay Now</SubmitButton>
    </form>
  );
}
```

---

## 7. Combining with useOptimistic

Use together for optimistic updates with loading states:

```jsx
import { useOptimistic } from "react";
import { useFormStatus } from "react-dom";

function CommentForm({ postId, comments }) {
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );

  async function addCommentAction(formData) {
    const text = formData.get("text");
    
    addOptimistic({
      id: Date.now(),
      text,
      pending: true,
    });

    await saveComment(postId, text);
  }

  return (
    <>
      <CommentList comments={optimisticComments} />
      
      <form action={addCommentAction}>
        <textarea name="text" />
        <SubmitButton />
      </form>
    </>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Posting..." : "Post Comment"}
    </button>
  );
}
```

---

## 8. Multiple Submit Buttons

Handle forms with multiple submit buttons:

```jsx
function SaveButton() {
  const { pending, data } = useFormStatus();
  const action = data?.get("action");

  return (
    <button
      type="submit"
      name="action"
      value="save"
      disabled={pending}
    >
      {pending && action === "save" ? "Saving..." : "Save Draft"}
    </button>
  );
}

function PublishButton() {
  const { pending, data } = useFormStatus();
  const action = data?.get("action");

  return (
    <button
      type="submit"
      name="action"
      value="publish"
      disabled={pending}
    >
      {pending && action === "publish" ? "Publishing..." : "Publish"}
    </button>
  );
}

function PostEditor() {
  async function handleSubmit(formData) {
    const action = formData.get("action");
    const title = formData.get("title");
    const content = formData.get("content");

    if (action === "save") {
      await saveDraft({ title, content });
    } else if (action === "publish") {
      await publishPost({ title, content });
    }
  }

  return (
    <form action={handleSubmit}>
      <input name="title" />
      <textarea name="content" />
      
      <SaveButton />
      <PublishButton />
    </form>
  );
}
```

---

## 9. Real-World Examples

### Example 1: Search Form with Live Results

```jsx
function SearchButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Spinner size="sm" /> Searching...
        </>
      ) : (
        <>
          🔍 Search
        </>
      )}
    </button>
  );
}

function SearchForm({ onResults }) {
  async function searchAction(formData) {
    const query = formData.get("query");
    const results = await searchAPI(query);
    onResults(results);
  }

  return (
    <form action={searchAction} className="search-form">
      <input
        name="query"
        placeholder="Search..."
        autoComplete="off"
        required
      />
      <SearchButton />
    </form>
  );
}
```

---

### Example 2: Newsletter Signup

```jsx
function SignupButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={pending ? "btn-loading" : "btn-primary"}
    >
      {pending ? "Subscribing..." : "Subscribe"}
    </button>
  );
}

function NewsletterForm() {
  async function subscribeAction(formData) {
    "use server";
    const email = formData.get("email");
    await subscribeToNewsletter(email);
  }

  return (
    <form action={subscribeAction} className="newsletter-form">
      <input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
      />
      <SignupButton />
    </form>
  );
}
```

---

### Example 3: File Upload Form

```jsx
function UploadProgress() {
  const { pending, data } = useFormStatus();

  if (!pending) return null;

  const fileName = data?.get("file")?.name;

  return (
    <div className="upload-progress">
      <ProgressBar />
      <p>Uploading {fileName}...</p>
    </div>
  );
}

function UploadButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Uploading..." : "Upload File"}
    </button>
  );
}

function FileUploadForm() {
  async function uploadAction(formData) {
    "use server";
    const file = formData.get("file");
    await uploadToStorage(file);
  }

  return (
    <form action={uploadAction}>
      <input type="file" name="file" required />
      <UploadProgress />
      <UploadButton />
    </form>
  );
}
```

---

### Example 4: Multi-Step Form

```jsx
function NextStepButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Validating..." : "Next Step →"}
    </button>
  );
}

function StepIndicator() {
  const { pending } = useFormStatus();
  
  return (
    <div className="step-indicator">
      <span className="current-step">Step 1 of 3</span>
      {pending && <Spinner size="sm" />}
    </div>
  );
}

function MultiStepForm() {
  const [step, setStep] = useState(1);

  async function handleStep1(formData) {
    const isValid = await validateStep1(formData);
    if (isValid) setStep(2);
  }

  return (
    <form action={handleStep1}>
      <StepIndicator />
      
      {/* Step 1 fields */}
      <input name="firstName" required />
      <input name="lastName" required />
      
      <NextStepButton />
    </form>
  );
}
```

---

## 10. Limitations & Gotchas

### 1. Must Be Inside Form

```jsx
// ❌ BAD: Not inside form
function MyButton() {
  const { pending } = useFormStatus(); // Returns initial state always
  return <button disabled={pending}>Submit</button>;
}

<MyButton /> // Not inside <form>

// ✅ GOOD: Inside form
<form action={submitAction}>
  <MyButton /> {/* Now it works */}
</form>
```

---

### 2. Only Works with Form Actions

```jsx
// ❌ BAD: Won't work with onSubmit
<form onSubmit={handleSubmit}>
  <SubmitButton /> {/* pending always false */}
</form>

// ✅ GOOD: Works with action prop
<form action={submitAction}>
  <SubmitButton /> {/* pending works */}
</form>
```

---

### 3. Parent Form Only

```jsx
// ❌ BAD: Doesn't read from nested forms
<form action={outerAction}>
  <form action={innerAction}>
    <SubmitButton /> {/* Reads innerAction status only */}
  </form>
</form>
```

---

## 11. Interview Questions

### Q1: What is useFormStatus?

**Answer:** `useFormStatus` is a React 19 Hook that provides information about the last form submission, primarily whether the form is currently pending (submitting).

```jsx
const { pending, data, method, action } = useFormStatus();
```

---

### Q2: Where can you use useFormStatus?

**Answer:** `useFormStatus` must be called in a component rendered **inside** a `<form>`, not in the form component itself. It reads status from the parent form.

```jsx
// ❌ WRONG
function Form() {
  const { pending } = useFormStatus();
  return <form>...</form>;
}

// ✅ CORRECT
function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}

function Form() {
  return <form><SubmitButton /></form>;
}
```

---

### Q3: What does useFormStatus return?

**Answer:** Returns an object with:
- `pending`: Boolean (is form submitting?)
- `data`: FormData being submitted
- `method`: HTTP method ("get" | "post" | "dialog")
- `action`: The form's action (URL or function)

---

### Q4: Does useFormStatus work with onSubmit?

**Answer:** No, `useFormStatus` only works with the `action` prop, not `onSubmit`. It's designed for React 19's form actions and Server Actions.

```jsx
// ❌ Won't work
<form onSubmit={handler}>
  <SubmitButton /> {/* pending always false */}
</form>

// ✅ Works
<form action={handler}>
  <SubmitButton /> {/* pending reflects actual state */}
</form>
```

---

### Q5: How do you disable all inputs during form submission?

**Answer:** Create a wrapper component that uses `useFormStatus` to disable inputs:

```jsx
function FormInput({ name, ...props }) {
  const { pending } = useFormStatus();
  return <input name={name} disabled={pending} {...props} />;
}
```

---

### Q6: Can you use useFormStatus with multiple submit buttons?

**Answer:** Yes! Check the `data` to see which button was clicked:

```jsx
function SaveButton() {
  const { pending, data } = useFormStatus();
  const isSaving = pending && data?.get("action") === "save";
  
  return (
    <button name="action" value="save" disabled={pending}>
      {isSaving ? "Saving..." : "Save"}
    </button>
  );
}
```

---

### Q7: What React version is useFormStatus available in?

**Answer:** React 19 (available in Canary/Experimental builds, official release coming).

---

### Q8: Where is useFormStatus imported from?

**Answer:** From `"react-dom"`, not `"react"`:

```jsx
import { useFormStatus } from "react-dom";
```

---

### Q9: Can you use useFormStatus with useOptimistic?

**Answer:** Yes! They work great together - `useOptimistic` for instant UI updates, `useFormStatus` for loading states:

```jsx
function CommentForm() {
  const [comments, addComment] = useOptimistic(...);
  
  return (
    <form action={async (data) => {
      addComment(data.get("text"));
      await saveComment(data);
    }}>
      <CommentInput />
      <SubmitButton /> {/* Uses useFormStatus */}
    </form>
  );
}
```

---

### Q10: Why can't you use useFormStatus in the form component itself?

**Answer:** `useFormStatus` reads context from the **parent** form. If called in the form component itself, there's no parent form to read from, so it always returns the initial state.

---

## 12. Best Practices

### ✅ Always Do:

1. **Use in child components** (not form component itself)
2. **Disable submit buttons** during pending
3. **Show loading indicators** for better UX
4. **Use with form actions** (not onSubmit)
5. **Create reusable form components** (SubmitButton, FormInput)

### ❌ Never Do:

1. **Use in form component itself** (won't work)
2. **Use with onSubmit** (only works with action)
3. **Forget to disable buttons** (allows multiple submissions)
4. **Make pending state manual** (defeats the purpose)
5. **Forget error handling** (forms can fail)

### 🎯 Advanced:

- Combine with `useOptimistic` for instant feedback
- Create reusable form component library
- Handle multiple submit buttons intelligently
- Add progress indicators for long operations
- Implement proper error boundaries

---

## Summary: useFormStatus Checklist

When using `useFormStatus`, ensure you:

- ✅ Import from `"react-dom"` (not "react")
- ✅ Use in components **inside** the form
- ✅ Use with `action` prop (not `onSubmit`)
- ✅ Disable buttons during pending
- ✅ Show loading indicators
- ✅ Handle multiple submit buttons if needed
- ✅ Combine with useOptimistic for instant feedback

Your `useFormStatus` knowledge is interview-ready when you can explain:

1. What it does (provides form submission status)
2. Where it must be used (inside form, not on form)
3. Why it needs `action` prop (not onSubmit)
4. What it returns (pending, data, method, action)
5. Common use cases (submit buttons, loading states)
6. How to handle multiple submit buttons
7. Integration with Server Actions



