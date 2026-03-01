# post increment vs pre-increment in React

## post increment vs pre-increment in React functional updates

`setState(prev => prev + 1)` vs `setState(prev => ++prev)` vs `setState(prev => prev++)`

| Expression | Works? | Returns Correct Value?   | Mutates?                | Should You Use It?         |
| ---------- | ------ | ------------------------ | ----------------------- | -------------------------- |
| `prev + 1` | ✅     | ✅                       | ❌ no mutation          | ⭐ **YES (Best practice)** |
| `++prev`   | ⚠️     | ❌ returns mutated value | ⚠️ mutates function arg | ❌ NO                      |
| `prev++`   | ❌     | ❌ returns old value     | ⚠️ mutates function arg | ❌ NEVER                   |

React state updater functions must be pure and non-mutating:

1. `setState(prev => prev + 1)`

   This is pure:

   - It does not mutate prev
   - It returns a new value
   - It works every time

2. `setState(prev => ++prev)`

   Why it's wrong

   - ++prev mutates the prev variable
   - Mutating React state args breaks rules.
   - Even though it returns prev + 1, it's still illegal mutation.
   - Confuses batching behavior.
   - You are mutating what React gives you — never do this.

3. `setState(prev => prev++)`

   Why prev++ NEVER works in React state updates
   prev++ does two things:

   - Returns the OLD value, so state remains same
   - Mutates the variable prev (local variable only), Mutation happens ONLY to local variable prev, not the state
   - State does NOT increase
   - doesn't cause any re-render

```sql
prev + 1 // correct, pure, no mutation
++prev // mutates, impure, unsafe
prev++ // mutates + returns wrong value (old value) → broken
```
