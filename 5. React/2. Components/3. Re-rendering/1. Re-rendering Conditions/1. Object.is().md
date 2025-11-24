# Object.is() Is Just a Fancy ===

- React does NOT do deep equality
- React does NOT introspect object properties
- React does NOT do shallow comparison except in memo/pure

React only does: `Object.is(oldValue, newValue)` Which is basically: `oldValue === newValue` With two small differences:

1. NaN equals NaN
2. -0 is not equal to +0

React simply uses `Object.is()` because:

- it's the correct conceptual definition of "same value"
- it handles edge cases of JS better than ===
- it's ultra fast and predictable

**React re-renders when a value in state or dependency array receives a new reference (according to Object.is).**
