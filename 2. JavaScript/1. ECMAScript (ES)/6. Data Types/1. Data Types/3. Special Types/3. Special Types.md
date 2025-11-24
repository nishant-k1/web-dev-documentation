# Special Types (All belongs to the non-primitive data types category)

- **Map**:

  - A collection of keyed data items, similar to an object
  - Each key is unique while values can be same.
  - `Keys and values can be of any data type`.

- **Set**:

  - A collection of unique values, meaning no duplicates are allowed.
  - A Set in JavaScript is a collection of unique values (not keys).
  - `Values can be of any data type`.

- **WeakMap**:

  - A collection of key-value pairs where `keys must be objects` and `values can be of any types`.
  - These are weakly referenced. This means the garbage collector can remove the entries if there are no other references to the objects they hold, preventing memory leaks in certain situations.
  - The keys in a WeakMap are held weakly, meaning if there is no other reference to the key object, it can be garbage collected.
  - The values in a WeakMap are held strongly, meaning they can still exist even if the key object is garbage collected.
  - It’s useful for scenarios like caching where you don’t want to prevent garbage collection of the keys
  - It doesn’t support iteration (no .forEach, .keys(), or .values() methods).
  - The garbage collection of keys happens automatically when there are no other references to the key object.

- **WeakSet**:

  - A collection of unique elements where, `elements must be object`.
  - A collection of unique objects where the objects are weakly referenced.
  - Like WeakMap, objects in a WeakSet are eligible for garbage collection if there are no other references to them.
  - It doesn’t store key-value pairs; it just stores the objects themselves.
  - You can only add objects to a WeakSet (not primitives).
  - It doesn’t support iteration (no .forEach, .values(), or .keys() methods).
  - Objects are automatically garbage collected if there are no other references to them.

  ![alt text](image.png)
