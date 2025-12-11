# useOptimistic Hook (React 19)

## TL;DR
- **`useOptimistic`** = Show optimistic UI updates before server confirms
- **Optimistic UI** = Update UI immediately, rollback if server fails
- Returns `[optimisticState, addOptimistic]`
- **`optimisticState`**: Current state (real or optimistic)
- **`addOptimistic(value)`**: Add optimistic update
- Automatically **reverts** to actual state when async action completes
- **Use case:** Instant feedback for slow operations (likes, comments, saves)
- Works with **Server Actions** and async operations
- **React 19** feature for better UX

---

## 1. What is useOptimistic?

**`useOptimistic`** lets you show a different state while an async action is in progress. When the action completes, React automatically shows the actual state.

### The Problem (Without Optimistic UI)

```jsx
function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    try {
      const newLikes = await likePost(postId); // 2 seconds delay
      setLikes(newLikes); // ❌ User waits 2 seconds to see update!
    } catch (error) {
      alert("Failed to like post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={loading}>
      {loading ? "Liking..." : `❤️ ${likes}`}
    </button>
  );
}
```

**Problem:** User waits for server response before seeing UI update. Feels slow!

---

### The Solution (With useOptimistic)

```jsx
import { useOptimistic } from "react";

function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (currentLikes, amount) => currentLikes + amount
  );

  const handleLike = async () => {
    // ✅ Show optimistic update immediately
    addOptimisticLike(1);

    try {
      const newLikes = await likePost(postId); // 2 seconds
      setLikes(newLikes); // Sync with server
    } catch (error) {
      // Optimistic update automatically reverts!
      alert("Failed to like post");
    }
  };

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}
```

**Result:** UI updates instantly! If server fails, automatically reverts.

---

## 2. Syntax

```jsx
const [optimisticState, addOptimistic] = useOptimistic(
  state,
  updateFn
);
```

### Parameters

1. **`state`**: The actual state value
2. **`updateFn(currentState, optimisticValue)`**: Function that returns the optimistic state
   - `currentState`: Current state (might be optimistic or actual)
   - `optimisticValue`: Value passed to `addOptimistic()`
   - Returns: New optimistic state

### Returns

1. **`optimisticState`**: The state to display (actual or optimistic)
2. **`addOptimistic(value)`**: Function to add an optimistic update

---

## 3. How useOptimistic Works

### Flow

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, newTodo) => [...currentTodos, newTodo]
  );

  const addTodo = async (text) => {
    const tempTodo = { id: Date.now(), text, pending: true };
    
    // 1. Add optimistic update (instant!)
    addOptimisticTodo(tempTodo);
    
    // 2. Send to server
    try {
      const savedTodo = await saveTodoToServer(text);
      
      // 3. Update actual state (optimistic update disappears)
      setTodos([...todos, savedTodo]);
    } catch (error) {
      // 4. On error, optimistic update automatically reverts
      alert("Failed to add todo");
    }
  };

  return (
    <ul>
      {optimisticTodos.map(todo => (
        <li key={todo.id} style={{ opacity: todo.pending ? 0.5 : 1 }}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

**Timeline:**

1. **User clicks "Add"**
   - `addOptimisticTodo(tempTodo)` called
   - `optimisticTodos` immediately includes new todo
   - UI updates instantly ✨

2. **While server request is in progress**
   - UI shows optimistic state (pending todo)
   - User can continue interacting

3. **Server responds successfully**
   - `setTodos([...todos, savedTodo])` called
   - `optimisticTodos` reverts to actual `todos`
   - Optimistic update replaced by real data

4. **OR server fails**
   - Optimistic update automatically disappears
   - `optimisticTodos` reverts to `todos`
   - User sees error message

---

## 4. Common Use Cases

### Use Case 1: Like Button

```jsx
function LikeButton({ postId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    likes,
    (current, increment) => current + increment
  );

  const handleLike = async () => {
    addOptimisticLike(1);

    try {
      const response = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
      });
      const data = await response.json();
      setLikes(data.likes);
    } catch (error) {
      // Optimistic update reverts automatically
      console.error("Failed to like");
    }
  };

  return (
    <button onClick={handleLike}>
      ❤️ {optimisticLikes}
    </button>
  );
}
```

---

### Use Case 2: Add Comment

```jsx
function CommentSection({ postId, initialComments }) {
  const [comments, setComments] = useState(initialComments);
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, newComment) => [...currentComments, newComment]
  );

  const handleSubmit = async (text) => {
    const tempComment = {
      id: `temp-${Date.now()}`,
      text,
      author: "You",
      pending: true,
    };

    addOptimisticComment(tempComment);

    try {
      const savedComment = await saveComment(postId, text);
      setComments([...comments, savedComment]);
    } catch (error) {
      alert("Failed to post comment");
    }
  };

  return (
    <div>
      {optimisticComments.map(comment => (
        <div
          key={comment.id}
          className={comment.pending ? "pending" : ""}
        >
          <strong>{comment.author}:</strong> {comment.text}
          {comment.pending && <Spinner />}
        </div>
      ))}
      <CommentForm onSubmit={handleSubmit} />
    </div>
  );
}
```

---

### Use Case 3: Delete Item

```jsx
function TodoItem({ todo, onDelete }) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [optimisticDeleted, addOptimisticDelete] = useOptimistic(
    isDeleted,
    () => true
  );

  const handleDelete = async () => {
    addOptimisticDelete();

    try {
      await deleteTodo(todo.id);
      setIsDeleted(true);
      onDelete(todo.id);
    } catch (error) {
      alert("Failed to delete");
    }
  };

  if (optimisticDeleted) {
    return null; // Immediately hide
  }

  return (
    <div>
      {todo.text}
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
```

---

### Use Case 4: Toggle Switch

```jsx
function ToggleSetting({ settingId, initialValue }) {
  const [enabled, setEnabled] = useState(initialValue);
  const [optimisticEnabled, setOptimisticEnabled] = useOptimistic(
    enabled,
    (_, newValue) => newValue
  );

  const handleToggle = async () => {
    const newValue = !enabled;
    setOptimisticEnabled(newValue);

    try {
      await updateSetting(settingId, newValue);
      setEnabled(newValue);
    } catch (error) {
      alert("Failed to update setting");
    }
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={optimisticEnabled}
        onChange={handleToggle}
      />
      Enable feature
    </label>
  );
}
```

---

## 5. With Server Actions (React 19)

`useOptimistic` works seamlessly with Server Actions:

```jsx
"use client";

import { useOptimistic } from "react";
import { addTodoAction } from "./actions";

function TodoList({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  const handleSubmit = async (formData) => {
    const text = formData.get("text");
    const tempTodo = {
      id: `temp-${Date.now()}`,
      text,
      pending: true,
    };

    // Add optimistic todo
    addOptimisticTodo(tempTodo);

    // Call server action
    const savedTodo = await addTodoAction(text);
    
    // Update with real data
    setTodos([...todos, savedTodo]);
  };

  return (
    <div>
      <form action={handleSubmit}>
        <input name="text" required />
        <button type="submit">Add</button>
      </form>

      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} className={todo.pending ? "pending" : ""}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 6. Indicating Pending State

Show visual feedback for optimistic updates:

### Pattern 1: Opacity/Style

```jsx
<div className={item.pending ? "opacity-50" : ""}>
  {item.text}
</div>
```

### Pattern 2: Spinner

```jsx
<div>
  {item.text}
  {item.pending && <Spinner />}
</div>
```

### Pattern 3: Strikethrough (for deletes)

```jsx
<div className={item.deleting ? "line-through" : ""}>
  {item.text}
</div>
```

### Pattern 4: Border/Background

```jsx
<div
  style={{
    border: item.pending ? "2px dashed #ccc" : "2px solid #000",
    backgroundColor: item.pending ? "#f0f0f0" : "white",
  }}
>
  {item.text}
</div>
```

---

## 7. Error Handling

When server request fails, optimistic update automatically reverts:

```jsx
function SaveButton({ data }) {
  const [saved, setSaved] = useState(false);
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(
    saved,
    () => true
  );

  const handleSave = async () => {
    setOptimisticSaved();

    try {
      await saveData(data);
      setSaved(true);
    } catch (error) {
      // Optimistic update reverts here
      
      // Show error to user
      toast.error("Failed to save");
      
      // Or retry logic
      const retry = confirm("Save failed. Retry?");
      if (retry) {
        handleSave();
      }
    }
  };

  return (
    <button onClick={handleSave} disabled={optimisticSaved}>
      {optimisticSaved ? "Saved ✓" : "Save"}
    </button>
  );
}
```

---

## 8. Multiple Optimistic Updates

Handle multiple pending updates:

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (currentTodos, newTodo) => [...currentTodos, newTodo]
  );

  const addMultiple = async (texts) => {
    // Add all optimistically
    texts.forEach(text => {
      addOptimisticTodo({
        id: `temp-${Date.now()}-${text}`,
        text,
        pending: true,
      });
    });

    // Save all to server
    try {
      const savedTodos = await Promise.all(
        texts.map(text => saveTodo(text))
      );
      setTodos([...todos, ...savedTodos]);
    } catch (error) {
      alert("Some todos failed to save");
    }
  };

  return <TodoListUI todos={optimisticTodos} />;
}
```

---

## 9. Real-World Examples

### Example 1: Social Media Post Reactions

```jsx
function PostReactions({ postId, initialReactions }) {
  const [reactions, setReactions] = useState(initialReactions);
  const [optimisticReactions, addOptimisticReaction] = useOptimistic(
    reactions,
    (current, { type, increment }) => ({
      ...current,
      [type]: (current[type] || 0) + increment,
    })
  );

  const handleReact = async (type) => {
    addOptimisticReaction({ type, increment: 1 });

    try {
      const updated = await addReaction(postId, type);
      setReactions(updated);
    } catch (error) {
      toast.error("Failed to add reaction");
    }
  };

  return (
    <div className="reactions">
      <button onClick={() => handleReact("like")}>
        👍 {optimisticReactions.like || 0}
      </button>
      <button onClick={() => handleReact("love")}>
        ❤️ {optimisticReactions.love || 0}
      </button>
      <button onClick={() => handleReact("laugh")}>
        😂 {optimisticReactions.laugh || 0}
      </button>
    </div>
  );
}
```

---

### Example 2: Shopping Cart

```jsx
function ShoppingCart({ initialCart }) {
  const [cart, setCart] = useState(initialCart);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    cart,
    (currentCart, action) => {
      switch (action.type) {
        case "ADD":
          return [...currentCart, action.item];
        case "REMOVE":
          return currentCart.filter(item => item.id !== action.itemId);
        case "UPDATE_QTY":
          return currentCart.map(item =>
            item.id === action.itemId
              ? { ...item, quantity: action.quantity }
              : item
          );
        default:
          return currentCart;
      }
    }
  );

  const addItem = async (product) => {
    updateOptimisticCart({
      type: "ADD",
      item: { ...product, id: `temp-${Date.now()}`, pending: true },
    });

    try {
      const updatedCart = await addToCart(product);
      setCart(updatedCart);
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const removeItem = async (itemId) => {
    updateOptimisticCart({ type: "REMOVE", itemId });

    try {
      const updatedCart = await removeFromCart(itemId);
      setCart(updatedCart);
    } catch (error) {
      toast.error("Failed to remove from cart");
    }
  };

  return (
    <div>
      {optimisticCart.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={() => removeItem(item.id)}
          pending={item.pending}
        />
      ))}
    </div>
  );
}
```

---

### Example 3: File Upload with Progress

```jsx
function FileUploader() {
  const [files, setFiles] = useState([]);
  const [optimisticFiles, addOptimisticFile] = useOptimistic(
    files,
    (currentFiles, newFile) => [...currentFiles, newFile]
  );

  const handleUpload = async (file) => {
    const fileObj = {
      id: `temp-${Date.now()}`,
      name: file.name,
      uploading: true,
      progress: 0,
    };

    addOptimisticFile(fileObj);

    try {
      const uploadedFile = await uploadFile(file, (progress) => {
        // Update progress (would need more complex state management)
        console.log(`Upload progress: ${progress}%`);
      });

      setFiles([...files, uploadedFile]);
    } catch (error) {
      toast.error(`Failed to upload ${file.name}`);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => handleUpload(e.target.files[0])}
      />

      <ul>
        {optimisticFiles.map(file => (
          <li key={file.id}>
            {file.name}
            {file.uploading && (
              <span> - Uploading... {file.progress}%</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 10. Interview Questions

### Q1: What is useOptimistic?

**Answer:** `useOptimistic` is a React 19 hook that lets you show optimistic UI updates while an async operation is in progress. When the operation completes, React automatically shows the actual state.

```jsx
const [optimisticState, addOptimistic] = useOptimistic(
  actualState,
  updateFn
);
```

---

### Q2: What is optimistic UI?

**Answer:** Optimistic UI is a pattern where you update the UI immediately (assuming success) before the server confirms. If the server fails, you revert the change. This provides instant feedback and better UX.

---

### Q3: How does useOptimistic handle errors?

**Answer:** When the async operation fails and you don't update the actual state, the optimistic update **automatically reverts** to the actual state. No manual rollback needed!

```jsx
const handleLike = async () => {
  addOptimisticLike(1); // Show immediately

  try {
    await likePost();
    setLikes(likes + 1); // Success: sync actual state
  } catch (error) {
    // Error: optimistic update auto-reverts
    alert("Failed");
  }
};
```

---

### Q4: When should you use useOptimistic?

**Answer:** Use for:
- Like/reaction buttons
- Adding comments
- Deleting items
- Toggling settings
- Adding to cart
- Any slow operation where instant feedback improves UX

**Don't use for:**
- Critical operations (payments, legal actions)
- Operations where rollback is confusing
- Fast operations (no benefit)

---

### Q5: What's the difference between optimistic state and actual state?

**Answer:**

**Actual state**: The real, confirmed data from the server
**Optimistic state**: The state shown to user (might be pending confirmation)

```jsx
const [likes, setLikes] = useState(10); // Actual state
const [optimisticLikes, addOptimistic] = useOptimistic(likes, ...);

// optimisticLikes might be 11 (showing optimistic update)
// while likes is still 10 (waiting for server)
```

---

### Q6: Do you need to manually revert optimistic updates?

**Answer:** No! When the async operation completes (success or failure), React automatically syncs `optimisticState` with `actualState`. You only need to update `actualState` on success.

---

### Q7: Can you have multiple pending optimistic updates?

**Answer:** Yes! Each call to `addOptimistic()` adds a new optimistic update. They all revert when actual state updates.

```jsx
// User clicks like button 3 times quickly
addOptimisticLike(1); // optimisticLikes = 11
addOptimisticLike(1); // optimisticLikes = 12
addOptimisticLike(1); // optimisticLikes = 13

// When server responds with actual count (11)
setLikes(11); // optimisticLikes reverts to 11
```

---

### Q8: How do you show loading state for optimistic updates?

**Answer:** Add a `pending` or `optimistic` flag to your data:

```jsx
addOptimisticTodo({
  id: 'temp-123',
  text: 'New todo',
  pending: true // Flag for styling
});

// In UI
<li className={todo.pending ? 'opacity-50' : ''}>
  {todo.text}
</li>
```

---

### Q9: What React version is useOptimistic available in?

**Answer:** React 19 (Canary/Experimental builds, official release expected 2024).

---

### Q10: Does useOptimistic work with Server Actions?

**Answer:** Yes! It's designed to work seamlessly with React 19's Server Actions for optimistic updates during server-side mutations.

---

## 11. Best Practices

### ✅ Always Do:

1. **Add pending indicators** (opacity, spinner, style)
2. **Handle errors gracefully** (show toast/message)
3. **Use temporary IDs** for new items
4. **Keep optimistic updates simple** (don't over-complicate)
5. **Test failure cases** (what if server fails?)

### ❌ Never Do:

1. **Use for critical operations** (payments, legal actions)
2. **Forget error handling** (user needs feedback)
3. **Make updates too complex** (hard to revert)
4. **Use without actual state sync** (must call `setState` on success)
5. **Assume optimistic updates always succeed**

### 🎯 Advanced:

- Combine with `useTransition` for complex UI updates
- Implement retry logic on failure
- Queue optimistic updates for offline mode
- Use with Server Actions for seamless integration
- Consider conflict resolution for concurrent updates

---

## Summary: useOptimistic Checklist

When using `useOptimistic`, ensure you:

- ✅ Understand optimistic UI pattern (show immediately, revert on fail)
- ✅ Add pending indicators for better UX
- ✅ Handle errors and show feedback to user
- ✅ Update actual state on success
- ✅ Use temporary IDs for new items
- ✅ Test failure scenarios
- ✅ Know when optimistic UI is appropriate

Your `useOptimistic` knowledge is interview-ready when you can explain:

1. What optimistic UI is (instant feedback pattern)
2. How `useOptimistic` works (show optimistic, auto-revert)
3. When to use it (likes, comments, deletes)
4. How error handling works (automatic revert)
5. How to show pending state
6. Why it improves UX
7. Real-world use cases



