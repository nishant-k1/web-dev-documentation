# Module Execution Context

Introduced with ES Modules (ES6 and later).

- Created when a module (e.g., a file with import/export) is evaluated, typically when it’s first imported.
- Each module gets its own execution context, which handles the module’s top-level declarations and exports.
- Unlike the GEC, a module execution context is specific to the module and doesn’t pollute the global scope.
- A module is evaluated once per program, and its exports are cached for subsequent imports.
- Example: In utils.js with export { A }, a module execution context is created when utils.js is imported.
