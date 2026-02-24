You can measure DOM in useLayoutEffect

You should NOT measure DOM in render

useEffect might cause visible flicker

useLayoutEffect blocks paint

---

Why StrictMode runs effects twice

Or how concurrent rendering changes this timeline

Or how React schedules passive effects using microtasks

---

If you’d like, next we can explore:

Why React keeps render pure

Why effects must be separated

Or how concurrent rendering makes this separation critical

---

Why concurrent rendering exists

Why StrictMode double-renders

Or why useMemo is only a performance hint

---

How keys actually affect Fiber reuse

How concurrent rendering changes reconciliation

Or how StrictMode double render interacts with Fiber

---

Why keys are critical in reconciliation

How child list diffing works (O(n) heuristic)

Or how React reuses DOM nodes intelligently

---

Why StrictMode runs effects twice

Or how concurrent rendering can discard a render before commit

Or how batching works across phases

---

Why sometimes you still see flicker even with useLayoutEffect

Or how React batches multiple renders before a single paint

Or how requestAnimationFrame fits into this model

---

If you’d like, we can next explore something even deeper:

Why sometimes you see flicker

How requestAnimationFrame interacts with paint

Or how concurrent rendering affects frames
