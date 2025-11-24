# The syntax for defining `interface` and `type` in TypeScript has some key differences

1. **Interface**:

   - Used to define the shape of an object.
   - Can be extended (inherited) and merged (re-opened).

   ```JavaScript
    // Extending interface example
    interface Person {
      name: string;
    }
    interface Employee extends Person {
      employeeId: number;
    }

    // Merging interface example
    interface User {
      name: string;
    }
    interface User {
      age: number;
    }

   ```

   - Primarily focused on modeling object-oriented programming patterns.
   - Syntax example:

     ```typescript
     interface User {
       name: string;
       age: number;
     }
     ```

2. **Type**:

   - More versatile than interfaces.
   - Can represent a wider range of types, including primitives, unions, and intersections.
   - Cannot be extended (inherited) or merged (re-opened), but can use intersections.
   - Syntax example:

     ```typescriptss
     type User = {
       name: string;
       age: number;
     } | string;
     ```

In this example, `type User` could be an object with `name` and `age` properties or just a `string`, showcasing the flexibility of `type`. In contrast, the `interface User` strictly defines an object structure.

---

## Syntax Differences between `interface` and `type` in TypeScript

1. **Interface Syntax:**

   - **Purpose**: Defining the structure of an object.
   - **Keyword**: `interface`
   - **Features**: Supports extension and merging.
   - **Example**:

     ```typescript
     interface User {
       name: string;
       age: number;
     }
     ```

2. **Type Syntax:**

   - **Purpose**: Flexible type definitions, including unions.
   - **Keyword**: `type`
   - **Features**: Allows intersections but not extension.
   - **Example**:

     ```typescript
     type User =
       | {
           name: string;
           age: number;
         }
       | string;
     ```
