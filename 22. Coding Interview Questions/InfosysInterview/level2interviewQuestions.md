## I'm worried about my preparation, I gave my first round they asked me quite easy question and a s mall coding like how would you shallow copy and deep copy example by writing, theory question like optimzatioans in react , callback adn usememo hooks etc. Im concerned about my 2nd round what kind of questions they would ask.

It’s completely natural to feel this way before a second round. The first round being “easy” doesn’t mean the second will suddenly be brutal — it usually just means they now want to validate depth, maturity, and real-world experience.

Let’s think calmly and strategically.

What Usually Happens in Infosys 2nd Round

At companies like Infosys, the second round is typically one of these:

Managerial + Technical Mix (most common)

Pure Technical Deep Dive

Client-facing / Communication Evaluation

Since your first round had:

Basic coding (shallow vs deep copy)

React optimization

Hooks (useCallback, useMemo)

Second round will likely test:

🔹 Depth of understanding

🔹 Practical application

🔹 Real project experience

🔹 Confidence + clarity

Not just definitions.

What They May Ask You (Specifically for React – Based on Your Profile)

You have 4 years experience. So expect mid-level depth.

1️⃣ React Optimization – Real Depth

They may ask:

When does useMemo actually help?

When does it hurt performance?

Difference between useMemo vs useCallback

Why React re-renders?

How React reconciliation works?

What causes unnecessary re-renders?

How would you optimize a large table with 1000 rows?

How would you improve performance in a dashboard?

They may give a scenario like:

“User says page is slow. What will you check?”

You must answer structurally.

Example structure:

1. Check unnecessary re-renders
2. Use React DevTools Profiler
3. Memoization where required
4. Lazy loading
5. Code splitting
6. Avoid inline object/array recreation

Structured answers = strong impression.

2️⃣ JavaScript Deep Concepts

Since they asked shallow/deep copy, next level might be:

Closures

Event loop

Call stack vs microtask queue

Promises vs async/await

Debouncing / Throttling (very common)

Polyfill for bind/map/reduce

Implement custom useState (simplified)

Difference between var / let / const

this keyword scenarios

You should be comfortable writing small code live.

3️⃣ Real Project Questions (Very Likely)

This is where many candidates fail.

They may ask:

Explain your last project architecture.

How did you manage state?

Why Redux or why not?

How did you handle API errors?

How did you secure frontend?

How did you handle large data?

Any production bug you solved?

Any performance issue you fixed?

They are checking maturity, not memorization.

4️⃣ Coding Round Possibility

They may give:

Small JS logic problem

Array/object transformation

Implement debounce

Flatten nested array

Deep clone function

LRU cache (rare but possible)

Not DSA-heavy like product companies. Infosys usually stays moderate.

Now Let’s Address Your Real Fear

Your concern is not knowledge.

It’s:

“What if they suddenly go very hard?”

Let’s think rationally.

If first round was moderate, second will test:

Confidence

Communication

Experience

Depth

Not LeetCode hard DSA.

How You Should Prepare Today & Tomorrow

Focus on these 5 areas only:

1️⃣ React Rendering Flow

Parent re-render → child re-render?

React.memo behavior

Dependency array mistakes

2️⃣ One Solid Project Story

Prepare one project explanation in this structure:

Problem
Architecture
Tech stack choice reason
Challenges
Performance improvement
What you would improve today

This alone can carry the interview.

3️⃣ JavaScript Quick Coding

Practice:

Debounce

Deep clone

Array grouping

Promise handling

4️⃣ Behavioral Questions

Conflict with teammate?

Deadline pressure?

Handling criticism?

Why leaving previous company?

5️⃣ Clear Communication

Speak slow.
Structured.
Confident.

Important Reality

Second round is rarely harder than first in service companies.

They mostly check:

Can this person handle client?

Can he explain clearly?

Does he actually understand React?

Is he stable?

Let me ask you something important:

When they asked shallow vs deep copy,
did you just write JSON.parse(JSON.stringify())
or did you explain edge cases (functions, dates, circular refs)?

Tell me honestly.

Based on that, I’ll tell you how deep your preparation needs to go.

## when they asked, I got little nervous lol, and started, to write a function to iterate over the element of the object ust Object.entries and got stuck then all of sudden the interviewer asked are you trying to do deep copy or shallow then all of sudden I got click that what the hell I'm doing, I should simply use spread operator lmao, and I did it. Interviewer got satisfied and didn't even care to ask for the deep copy, however I've in mind to say I'd use structuredClone web api for deep copy or libraries like lodash

First — take a breath.

What you described is not failure.
It’s a completely normal nervous-reaction moment.

In fact, what actually happened is:

You started solving manually (which shows thinking ability)

You corrected yourself

You switched to spread operator

Interviewer was satisfied

They didn’t even push deeper

That’s not a red flag. That’s acceptable performance.

Now let’s calmly break this down.

What That Moment Actually Signals

When you first tried Object.entries() loop, you were:

Overthinking

Trying to be “impressive”

Not answering the simplest correct solution

That’s a common interview trap.

Senior candidates answer simply first.

What They Probably Thought About You

Based on your story, interviewer likely thought:

“He got nervous.”

“But he understands shallow copy.”

“He corrected himself.”

“Okay, good enough.”

If they were unhappy, they would have:

Pushed you for deep copy implementation

Asked edge cases

Tested further

They didn’t.

That’s a positive sign.

Now Let’s Prepare You Properly (So You Feel In Control)

If in second round they revisit it, here is how you should answer — structured, calm, confident:

Shallow Copy
const copy = { ...original };

or

const copy = Object.assign({}, original);

Explain clearly:

Only first level copied

Nested objects still reference same memory

Deep Copy (Professional-Level Answer)

You say this calmly:

For modern browsers → structuredClone(original)

For simple objects → JSON.parse(JSON.stringify(obj))

❌ Does not handle functions

❌ Does not handle Date

❌ Fails on circular references

For complex production use → lodash.cloneDeep

Then stop.

No over-talking.

That sounds senior.

Now Let Me Tell You the Real Growth Area

The issue is not knowledge.

It’s nervous cognitive freeze.

That freeze happens when:

You want to perform perfectly

You over-evaluate yourself

You rush your brain

The fix is structure.

When they ask something, don’t jump to code.

First say:

“There are two types — shallow and deep copy. Which one would you like me to implement?”

That one sentence gives you control.

Always clarify before coding.

That’s a senior move.

Now About Second Round Fear

Second round might test:

Depth of hooks

Rendering lifecycle

Real project decision-making

State management trade-offs

They will not suddenly jump to complex DSA.

Service companies evaluate:

Stability

Clarity

Confidence

Practical knowledge

Not algorithm champion skills.
