# Frontend / React Interview – Coding Question Categories

This document captures the **complete and realistic set of coding-related question categories** commonly asked in Frontend and React Developer interviews (2–6+ YOE).

---

## 1. Tricky Output-Based Questions (JavaScript + React)

**Nature**

- No coding required
- Only output prediction and explanation

**Common Topics**

- Hoisting
- Closures
- `this` binding
- Scope (var / let / const)
- Event loop (microtask vs macrotask)
- Promise resolution order
- React render cycles
- State batching
- `useEffect` dependencies
- Stale closures

**What Interviewers Evaluate**

- Mental execution model
- Runtime understanding
- Ability to explain _why_, not just _what_

---

## 2. Coding Questions on Standard Built-In Objects

**JavaScript Built-In Objects**

- `Promise`
- `Array`
- `Object`
- `String`
- `Date`
- `Math`
- `Map`
- `Set`

**Common Expectations**

- Practical usage of core methods
- Method composition (e.g. `map + filter + reduce`)
- Immutability awareness

**Examples**

- Transforming arrays
- Aggregating data
- Promise combinators
- Object cloning and updates

---

## 3. React Feature Implementation Questions

**Typical Tasks**

- Fetch data and render a list
- Pagination
- Search / filtering
- Implement React Context
- Implement HOC / custom hooks
- Conditional rendering

**What Interviewers Evaluate**

- Correct hook usage
- State and effect separation
- Clean data flow
- Avoiding infinite re-renders
- Readability and structure

---

## 4. Redux Reducer Logic Questions

**Nature**

- Pure logic questions
- Focused on reducers, not Redux setup

**Common Tasks**

- Conditional state updates
- Updating nested state
- Handling action types

**Key Concepts Tested**

- Immutability
- Pure functions
- Safe state updates using spread operators

---

## 5. Timers & Web APIs

**APIs Covered**

- `setTimeout`
- `setInterval`
- `clearTimeout`
- `clearInterval`

**Common Patterns**

- Timers inside loops
- Closures with timers
- Execution order
- Cleanup logic

**What Interviewers Evaluate**

- Event loop understanding
- Scope behavior
- Proper cleanup

---

## 6. DOM Manipulation & Event Handling

**Common Topics**

- Event delegation
- Event bubbling vs capturing
- `preventDefault` vs `stopPropagation`
- DOM node selection
- Dynamic element creation

**Purpose**

- Validate browser fundamentals
- Ensure understanding beyond React abstractions

---

## 7. Form Handling & Validation Logic (React)

**Typical Tasks**

- Controlled vs uncontrolled inputs
- Form validation
- Debounced input handling
- Error state management

**Concepts Tested**

- State control
- Input event handling
- User experience considerations

---

## 8. Data Transformation & Business Logic

**Nature**

- Real-world data manipulation
- Not traditional DSA

**Examples**

- Grouping API responses
- Normalizing nested data
- Aggregations and mappings

**Core Skills Tested**

- `reduce`
- Data modeling
- Logical thinking

---

## 9. Performance Optimization (React)

**Common Topics**

- Preventing unnecessary re-renders
- Memoization

**APIs**

- `useMemo`
- `useCallback`
- `React.memo`

**What Interviewers Evaluate**

- Render cycle understanding
- Knowing when optimization is necessary

---

## 10. State Synchronization Problems

**Examples**

- Syncing props to local state
- Derived state handling
- Avoiding infinite loops

**Key Concepts**

- `useEffect` dependency correctness
- State derivation patterns

---

## 11. Error Handling & Edge Cases

**Scenarios**

- API failures
- Empty states
- Loading states
- Cleanup logic

**What Interviewers Observe**

- Defensive coding
- Attention to failure scenarios
- Production readiness

---

## 12. TypeScript-Specific Coding

**Common Topics**

- Typing props and state
- Union and intersection types
- Optional chaining
- Generics (basic)

**Evaluation Criteria**

- Type safety mindset
- Practical TypeScript usage

---

## 13. CSS Logic & Conditional Styling

**Focus**

- Logic, not design

**Examples**

- Conditional class names
- Responsive logic using CSS
- State-based styling

**What Interviewers Check**

- Clean conditional logic
- Preference for CSS-based solutions over JS where possible

---

## Summary Mental Model

Frontend / React Interview Coding Questions Typically Cover:

- JavaScript runtime behavior
- Built-in object manipulation
- Asynchronous execution
- React feature implementation
- State management logic
- Data transformation
- Performance awareness
- Error handling
- Type safety
- UI logic correctness
