# TypeScript with React

## TL;DR
- **TypeScript** = JavaScript with static typing
- **Benefits:** Type safety, better IDE support, catch errors early, self-documenting code
- **Common types:** `React.FC`, `React.ReactNode`, `React.CSSProperties`, event types
- **Props typing:** Interface or Type for component props
- **Hooks typing:** `useState<T>`, `useRef<T>`, etc.
- **Events:** `React.MouseEvent`, `React.ChangeEvent`, `React.FormEvent`
- **Generic components:** Components that work with any type
- **Install:** `@types/react @types/react-dom`

---

## 1. Setup

### Installation

```bash
# Create new TypeScript React app
npx create-react-app my-app --template typescript

# Or add to existing project
npm install --save-dev typescript @types/react @types/react-dom

# Create tsconfig.json
npx tsc --init
```

---

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

---

## 2. Component Types

### Function Component

```tsx
// Method 1: Function declaration with explicit return type
function Welcome({ name }: { name: string }): JSX.Element {
  return <h1>Hello, {name}!</h1>;
}

// Method 2: Arrow function with inline props type
const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}!</h1>;
};

// Method 3: With interface
interface WelcomeProps {
  name: string;
}

const Welcome = ({ name }: WelcomeProps) => {
  return <h1>Hello, {name}!</h1>;
};
```

---

### React.FC (Avoid in Modern React)

```tsx
// ❌ OLD: React.FC (not recommended anymore)
const Welcome: React.FC<{ name: string }> = ({ name }) => {
  return <h1>Hello, {name}!</h1>;
};

// ✅ MODERN: Regular function
const Welcome = ({ name }: { name: string }) => {
  return <h1>Hello, {name}!</h1>;
};
```

**Why avoid `React.FC`:**
- Implicitly includes `children` (confusing)
- Doesn't work with generics well
- Modern React doesn't need it

---

## 3. Props Typing

### Interface vs Type

```tsx
// Interface (preferred for objects)
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Type (more flexible, can use unions)
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};
```

**When to use:**
- **Interface:** Object shapes, extendable
- **Type:** Unions, intersections, primitives

---

### Optional Props

```tsx
interface CardProps {
  title: string;
  subtitle?: string; // Optional
  footer?: React.ReactNode;
}

const Card = ({ title, subtitle, footer }: CardProps) => {
  return (
    <div>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      {footer}
    </div>
  );
};
```

---

### Default Props

```tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const Button = ({
  label,
  variant = 'primary',
  size = 'medium',
}: ButtonProps) => {
  return (
    <button className={`btn-${variant} btn-${size}`}>
      {label}
    </button>
  );
};
```

---

### Children Prop

```tsx
import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode; // Any valid React child
}

const Container = ({ children }: ContainerProps) => {
  return <div className="container">{children}</div>;
};

// Or more specific
interface ListProps {
  children: React.ReactElement<ItemProps> | React.ReactElement<ItemProps>[];
}
```

---

### Extending Props

```tsx
// Extend HTML button props
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

const Button = ({ variant, ...props }: ButtonProps) => {
  return <button className={`btn-${variant}`} {...props} />;
};

// Usage
<Button variant="primary" onClick={handleClick} disabled>
  Click Me
</Button>
```

---

## 4. Event Types

### Common Event Types

```tsx
import { MouseEvent, ChangeEvent, FormEvent, KeyboardEvent } from 'react';

function EventExamples() {
  // Mouse events
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget); // HTMLButtonElement
  };

  // Input events
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value); // string
  };

  // Form events
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // Keyboard events
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('Enter pressed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
```

---

### Generic Event Handler

```tsx
type EventHandler<T = HTMLElement> = (e: MouseEvent<T>) => void;

interface ButtonProps {
  onClick: EventHandler<HTMLButtonElement>;
}

const Button = ({ onClick }: ButtonProps) => {
  return <button onClick={onClick}>Click</button>;
};
```

---

## 5. Hooks Typing

### useState

```tsx
import { useState } from 'react';

function Component() {
  // Type inferred
  const [count, setCount] = useState(0); // number

  // Explicit type
  const [name, setName] = useState<string>('');

  // Union type
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Object type
  interface User {
    name: string;
    age: number;
  }
  const [user, setUser] = useState<User | null>(null);

  // Array type
  const [items, setItems] = useState<string[]>([]);

  return <div>{count}</div>;
}
```

---

### useRef

```tsx
import { useRef, useEffect } from 'react';

function Component() {
  // DOM element ref
  const inputRef = useRef<HTMLInputElement>(null);

  // Mutable value ref
  const countRef = useRef<number>(0);

  // Callback ref
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if current exists
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div>
      <input ref={inputRef} />
      <div ref={divRef} />
    </div>
  );
}
```

---

### useEffect

```tsx
import { useEffect } from 'react';

function Component() {
  useEffect(() => {
    // Effect function
    const timer = setInterval(() => {
      console.log('Tick');
    }, 1000);

    // Cleanup function (return type: void | (() => void))
    return () => {
      clearInterval(timer);
    };
  }, []); // Dependency array

  return <div>Component</div>;
}
```

---

### useReducer

```tsx
import { useReducer } from 'react';

// State type
interface State {
  count: number;
  error: string | null;
}

// Action types
type Action =
  | { type: 'increment' }
  | { type: 'decrement' }
  | { type: 'reset' }
  | { type: 'error'; payload: string };

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'reset':
      return { count: 0, error: null };
    case 'error':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0, error: null });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
}
```

---

### useContext

```tsx
import { createContext, useContext, ReactNode } from 'react';

// Context type
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Create context with default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component
interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

---

### Custom Hooks

```tsx
import { useState, useEffect } from 'react';

// Generic hook with type parameter
function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: Error | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then((data: T) => {
        setData(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

// Usage
interface User {
  id: number;
  name: string;
}

function UserProfile() {
  const { data, loading, error } = useFetch<User>('/api/user');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return <div>{data.name}</div>;
}
```

---

## 6. Generic Components

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

<List
  items={users}
  renderItem={(user) => <div>{user.name}</div>}
/>
```

---

## 7. Common Types

### React.ReactNode

```tsx
import { ReactNode } from 'react';

interface Props {
  children: ReactNode; // Most permissive: JSX, string, number, null, etc.
}
```

---

### React.ReactElement

```tsx
import { ReactElement } from 'react';

interface Props {
  children: ReactElement; // Only JSX elements
}
```

---

### React.CSSProperties

```tsx
import { CSSProperties } from 'react';

interface BoxProps {
  style?: CSSProperties;
}

const Box = ({ style }: BoxProps) => {
  return <div style={{ padding: '20px', ...style }}>Box</div>;
};
```

---

### Component Props Type

```tsx
import { ComponentProps } from 'react';

// Get props type from existing component
type ButtonProps = ComponentProps<'button'>;
type DivProps = ComponentProps<'div'>;

// Custom component props
type MyButtonProps = ComponentProps<typeof MyButton>;
```

---

## 8. Forms

### Controlled Input

```tsx
import { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

---

## 9. Advanced Patterns

### Discriminated Unions

```tsx
type LoadingState = { status: 'loading' };
type SuccessState = { status: 'success'; data: string };
type ErrorState = { status: 'error'; error: Error };

type State = LoadingState | SuccessState | ErrorState;

function Component({ state }: { state: State }) {
  switch (state.status) {
    case 'loading':
      return <div>Loading...</div>;
    case 'success':
      return <div>Data: {state.data}</div>; // TypeScript knows data exists
    case 'error':
      return <div>Error: {state.error.message}</div>;
  }
}
```

---

### Utility Types

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Pick: Select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit: Exclude specific properties
type UserWithoutId = Omit<User, 'id'>;

// Partial: Make all properties optional
type PartialUser = Partial<User>;

// Required: Make all properties required
type RequiredUser = Required<Partial<User>>;

// Readonly: Make all properties readonly
type ReadonlyUser = Readonly<User>;

// Record: Create object type with specific keys
type UserMap = Record<number, User>;
```

---

### Conditional Types

```tsx
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

---

## 10. Real-World Examples

### Example 1: Data Table

```tsx
interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(col => (
            <th key={String(col.key)}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(col => (
              <td key={String(col.key)}>
                {col.render
                  ? col.render(row[col.key])
                  : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
];

<Table
  data={users}
  columns={[
    { key: 'id', header: 'ID' },
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
  ]}
/>
```

---

### Example 2: API Hook

```tsx
interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

function useApi<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Fetch failed');
      const json = await response.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
```

---

## 11. Common Mistakes

### Mistake 1: Using `any`

```tsx
// ❌ BAD
function Component({ data }: { data: any }) {
  return <div>{data.name}</div>; // No type safety
}

// ✅ GOOD
interface Data {
  name: string;
}

function Component({ data }: { data: Data }) {
  return <div>{data.name}</div>;
}
```

---

### Mistake 2: Not Typing Event Handlers

```tsx
// ❌ BAD
const handleClick = (e) => { // 'e' is implicitly 'any'
  console.log(e.target);
};

// ✅ GOOD
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget);
};
```

---

### Mistake 3: Forgetting Null Checks

```tsx
// ❌ BAD
function Component() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    ref.current.focus(); // Error: Object is possibly 'null'
  }, []);
}

// ✅ GOOD
function Component() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
}
```

---

## 12. Interview Questions

### Q1: How do you type component props?

**Answer:** Use interface or type:

```tsx
interface Props {
  name: string;
  age?: number;
}

const Component = ({ name, age }: Props) => {
  return <div>{name}</div>;
};
```

---

### Q2: What's the difference between Interface and Type?

**Answer:**

**Interface:**
- Can be extended
- Can be merged
- Better for object shapes

**Type:**
- Can use unions and intersections
- Can represent primitives
- More flexible

**Best practice:** Use Interface for props, Type for unions/complex types.

---

### Q3: How do you type useState with objects?

**Answer:**

```tsx
interface User {
  name: string;
  age: number;
}

const [user, setUser] = useState<User | null>(null);
```

---

### Q4: How do you type event handlers?

**Answer:**

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log(e.currentTarget);
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};
```

---

### Q5: Should you use React.FC?

**Answer:** **No**, it's not recommended in modern React:
- Implicitly includes children
- Doesn't work well with generics
- Modern React doesn't need it

Use regular functions instead.

---

### Q6: How do you type children prop?

**Answer:**

```tsx
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
```

`ReactNode` includes everything: JSX, strings, numbers, arrays, null, etc.

---

### Q7: How do you create generic components?

**Answer:**

```tsx
interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: Props<T>) {
  return <ul>{items.map((item, i) => (
    <li key={i}>{renderItem(item)}</li>
  ))}</ul>;
}
```

---

### Q8: How do you extend HTML element props?

**Answer:**

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

const Button = ({ variant, ...props }: ButtonProps) => {
  return <button className={`btn-${variant}`} {...props} />;
};
```

---

### Q9: How do you type useRef for DOM elements?

**Answer:**

```tsx
const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
}, []);

return <input ref={inputRef} />;
```

Always initialize with `null` and check before using.

---

### Q10: What are utility types in TypeScript?

**Answer:** Built-in types that transform other types:
- `Pick<T, K>` - Select properties
- `Omit<T, K>` - Exclude properties
- `Partial<T>` - Make optional
- `Required<T>` - Make required
- `Readonly<T>` - Make readonly
- `Record<K, T>` - Create object type

---

## Summary: TypeScript with React Checklist

- ✅ Use interfaces for props
- ✅ Type event handlers properly
- ✅ Use `ReactNode` for children
- ✅ Avoid `any` type
- ✅ Type hooks explicitly when needed
- ✅ Check for null in refs
- ✅ Use generic components for reusability
- ✅ Extend HTML attributes when wrapping elements
- ✅ Use utility types (Pick, Omit, Partial)
- ✅ Avoid `React.FC` in modern code

Your TypeScript + React knowledge is interview-ready when you can:

1. Type props, state, and events correctly
2. Use hooks with proper types
3. Create generic components
4. Handle null/undefined safely
5. Use utility types effectively
6. Explain Interface vs Type
7. Type complex patterns (forms, API hooks)



