# Optimistic Updates

Optimistic update patterns - updating UI immediately, rollback strategies, when to use optimistic updates, and handling failures.

---

## Core Concept

**Optimistic updates** update UI immediately before API call completes, assuming it will succeed. If it fails, rollback the change.

**Benefits:**

- ✅ Instant feedback
- ✅ Better perceived performance
- ✅ Smoother UX

**Use Cases:**

- Toggle buttons (like/unlike)
- Adding items to list
- Marking items as complete
- Simple updates

---

## Basic Optimistic Update

### Toggle Like Button

```javascript
function LikeButton({ postId, initialLiked }) {
  const [liked, setLiked] = useState(initialLiked);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    // Optimistic update
    const previousLiked = liked;
    setLiked(!liked);
    setLoading(true);

    try {
      await fetch(`/api/posts/${postId}/like`, {
        method: liked ? "DELETE" : "POST",
      });
    } catch (error) {
      // Rollback on error
      setLiked(previousLiked);
      alert("Failed to update like");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={loading}>
      {liked ? "Unlike" : "Like"}
    </button>
  );
}
```

---

## Optimistic Update with List

### Add Item to List

```javascript
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = async (text) => {
    // Create optimistic todo
    const optimisticTodo = {
      id: `temp-${Date.now()}`,
      text,
      completed: false,
    };

    // Add immediately
    setTodos((prev) => [...prev, optimisticTodo]);

    try {
      // API call
      const res = await fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      const newTodo = await res.json();

      // Replace optimistic with real
      setTodos((prev) =>
        prev.map((t) => (t.id === optimisticTodo.id ? newTodo : t))
      );
    } catch (error) {
      // Rollback on error
      setTodos((prev) => prev.filter((t) => t.id !== optimisticTodo.id));
      alert("Failed to add todo");
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.text}</div>
      ))}
      <button onClick={() => addTodo("New Todo")}>Add</button>
    </div>
  );
}
```

---

## When to Use Optimistic Updates

### ✅ Good Use Cases

- Toggle actions (like, follow, bookmark)
- Adding items to lists
- Simple updates (mark complete, delete)
- Actions with high success rate

### ❌ Bad Use Cases

- Financial transactions
- Critical operations
- Actions that can't be rolled back
- Complex operations with validation

---

## Common Interview Questions

### Q: What are optimistic updates?

**A:** Update UI immediately before API completes, then update with real data or rollback on error. Provides instant feedback.

### Q: When should you use optimistic updates?

**A:** For simple, reversible actions with high success rate (likes, toggles, adding items). Not for critical operations.

### Q: How do you handle failures in optimistic updates?

**A:** Rollback the optimistic change, show error message, and restore previous state.

---

## Related Topics

- [Loading States Management](./2.%20Loading%20States%20Management.md) - Loading patterns
- [Error Handling Patterns](./1.%20Error%20Handling%20Patterns%20in%20React.md) - Error handling

---

## Summary

**Optimistic Updates:**

- Update UI immediately
- Rollback on error
- Use for simple, reversible actions
- Provide instant feedback

**Best Practices:**

- Use for high-success-rate actions
- Always provide rollback
- Show error on failure
- Don't use for critical operations

**Key Takeaway:** Optimistic updates provide instant feedback by updating UI immediately. Always implement rollback for error cases. Use for simple, reversible actions only.
