# 🧠 The "Sticky Brain" Strategy: How to Stop Forgetting

The reason you forget is likely because you are **consuming** information (reading/watching) instead of **retrieving** it.

To crack interviews, you need **Active Recall**, not passive review.

---

## 🛑 The Mistake: "The Illusion of Competence"

- **Reading a tutorial**: "Yeah, I get this." (Your brain recognizes it, but hasn't built the neural path to retrieve it).
- **Interview**: "Explain closures." -> _Blank mind._

---

## ✅ The Solution: The 3-Step Retention System

### 1. The "Flashcard" Code Method (Spaced Repetition)

Don't just read notes. Test yourself.

**Create a `RECALL-SHEET.md` (I can make this for you).**
It should look like this:

| Question (The Trigger)                                   | Answer (Hidden/Collapsed) | Date Last Reviewed | Status  |
| :------------------------------------------------------- | :------------------------ | :----------------- | :------ |
| How does the Event Loop handle Microtasks vs Macrotasks? | [Click to Reveal]         | Oct 24             | 🔴 Hard |
| Write a custom `Promise.all` polyfill.                   | [Link to Solution]        | Oct 20             | 🟢 Easy |

**The Rule**:

- If you get it right: Review in **1 week**.
- If you get it wrong: Review **tomorrow**.

### 2. The "Feynman Technique" (Teaching)

- **After you learn a concept (e.g., React Fiber), record a 2-minute video explaining it to a 5-year-old.**
- If you stumble, you don't know it yet.
- _Alternative_: Write a blog post (even if you don't publish it).

### 3. "Build to Remember" (Implementation)

- Don't just memorize "Debouncing".
- **Build a Search Bar** that uses debouncing from scratch.
- _Memory Hook_: "Oh yeah, debouncing is that thing I used to stop the API from firing 100 times when typing 'Apple'."

---

## 🗓️ The "Review Routine" (Add this to your Daily Plan)

**Every Morning (First 15 mins):**

1.  Open your `RECALL-SHEET.md`.
2.  Look at the "Questions" column ONLY.
3.  Say the answer out loud.
4.  Check the answer.
    - Correct? ✅ Mark green.
    - Wrong? ❌ Mark red.

**Every Sunday (1 Hour):**

1.  Review all "Red" items from the week.
2.  Re-build one small code snippet from memory (e.g., "Write a Deep Clone function").

---

## 🛠️ Action Item

**Shall I create the `RECALL-SHEET.md` for you right now?**
I will pre-fill it with the most common "forgettable" concepts (Closures, Prototypal Inheritance, `this` keyword, React Lifecycle).
