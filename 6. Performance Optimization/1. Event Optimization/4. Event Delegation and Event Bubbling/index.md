# Event Delegation

Event delegation is a pattern in JavaScript where instead of attaching event listeners to multiple child elements, you attach a single event listener to a common ancestor (like a parent).

The event “bubbles up” from the target element to its ancestors, allowing the parent to handle it.

## Why Use Event Delegation

| Benefit                  | Explanation                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| 🧠 **Performance**       | Fewer event listeners → better memory usage and performance                               |
| 🧱 **Dynamic content**   | Automatically works for elements added later (e.g., with `.innerHTML` or React rendering) |
| 🛠 **Easier maintenance** | Centralized event handling logic                                                          |

## Event Bubbling (The Backbone of Delegation)

When you click a child element, the event travels:

- From the root to the element (capturing phase)
- Triggers on the element (target phase)
- Bubbles back up to ancestors (bubbling phase)

## When to use it

- Lists, menus, tables, dynamic UIs (e.g., add/remove buttons)
- Real-world: React apps with dynamic components, or infinite scroll lists

## When NOT to use i

- If you need exact control over a specific child’s event
- If bubbling is disabled (`event.stopPropagation()`): Stop bubbling this event up the DOM tree any further.
- If you're handling non-bubbling events like `blur`, `focus`, `mouseenter`, `mouseleave`

## Propagation Control

1. event.stopPropagation()

   **Sometimes you want to**:

   - Handle an event on a specific element
   - Prevent parent event listeners from being triggered

   **Use stopPropagation() if**:

   - You want to prevent parent handlers from firing
   - You're handling nested clicks (e.g., a modal inside a backdrop)
   - You want to control event flow precisely

2. event.stopImmediatePropagation()

   - Even stronger than stopPropagation() — it not only stops bubbling, but also:
   - Cancels any other handlers on the same element that haven't run yet.

3. event.preventDefault()

   - Prevents default browser behavior (e.g., form submit, link click)
