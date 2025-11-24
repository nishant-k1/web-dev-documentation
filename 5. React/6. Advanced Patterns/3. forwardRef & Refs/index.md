# forwardRef & Refs in React

## TL;DR
- **forwardRef** = Forward refs from parent to child components
- **React 18 and earlier:** Need `forwardRef` to pass refs to functional components
- **React 19:** `ref` is now a regular prop! No `forwardRef` needed
- **Use case:** Access child component's DOM node or imperative methods
- **Works with:** `useImperativeHandle` for exposing custom methods
- **Common use:** Form inputs, focus management, DOM measurements
- **Breaking change in React 19:** `forwardRef` still works but deprecated

---

## 1. What is forwardRef?

**`forwardRef`** is a React API that lets a component forward a `ref` to a child component. It's needed because refs are not automatically passed like regular props.

### The Problem (React 18 and Earlier)

```jsx
// ❌ DOESN'T WORK: ref is not passed to function components
function FancyButton({ children }) {
  return <button>{children}</button>;
}

function App() {
  const buttonRef = useRef();
  
  // ref won't work!
  return <FancyButton ref={buttonRef}>Click Me</FancyButton>;
}
```

**Error:** "Function components cannot be given refs. Attempts to access this ref will fail."

---

### The Solution (React 18)

```jsx
import { forwardRef, useRef } from 'react';

// ✅ Wrap component with forwardRef
const FancyButton = forwardRef((props, ref) => {
  return <button ref={ref} {...props} />;
});

function App() {
  const buttonRef = useRef();

  useEffect(() => {
    buttonRef.current.focus(); // ✅ Works!
  }, []);

  return <FancyButton ref={buttonRef}>Click Me</FancyButton>;
}
```

---

## 2. React 19: ref as a Prop (No forwardRef Needed!)

**React 19 makes refs regular props!** You no longer need `forwardRef` for most cases.

### React 19 Syntax

```jsx
// ✅ React 19: ref is just a prop!
function FancyButton({ ref, children }) {
  return <button ref={ref}>{children}</button>;
}

function App() {
  const buttonRef = useRef();

  useEffect(() => {
    buttonRef.current.focus(); // ✅ Works!
  }, []);

  return <FancyButton ref={buttonRef}>Click Me</FancyButton>;
}
```

**No `forwardRef` wrapper needed!**

---

### Migration Guide: React 18 → React 19

```jsx
// React 18 (old way)
const FancyButton = forwardRef((props, ref) => {
  return <button ref={ref} {...props} />;
});

// React 19 (new way)
function FancyButton({ ref, ...props }) {
  return <button ref={ref} {...props} />;
}
```

**Note:** `forwardRef` still works in React 19 for backward compatibility but is considered legacy.

---

## 3. Basic forwardRef Patterns (React 18)

### Pattern 1: Simple Input Component

```jsx
import { forwardRef } from 'react';

const Input = forwardRef(({ label, type = 'text', ...props }, ref) => {
  return (
    <div className="input-wrapper">
      <label>{label}</label>
      <input ref={ref} type={type} {...props} />
    </div>
  );
});

// Usage
function LoginForm() {
  const emailRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);
  };

  useEffect(() => {
    emailRef.current.focus(); // Auto-focus on mount
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Input ref={emailRef} label="Email" type="email" />
      <button>Submit</button>
    </form>
  );
}
```

---

### Pattern 2: Custom Button with Multiple Props

```jsx
const Button = forwardRef(({ 
  children, 
  variant = 'primary',
  size = 'medium',
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={`btn btn-${variant} btn-${size}`}
      {...props}
    >
      {children}
    </button>
  );
});

// Usage
function App() {
  const buttonRef = useRef();

  const handleClick = () => {
    buttonRef.current.classList.add('clicked');
  };

  return (
    <Button ref={buttonRef} variant="success" onClick={handleClick}>
      Click Me
    </Button>
  );
}
```

---

## 4. forwardRef with TypeScript

```typescript
import { forwardRef, ForwardedRef } from 'react';

// Type 1: Using ForwardRefRenderFunction
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', ...props }, ref) => {
    return (
      <button ref={ref} className={`btn-${variant}`} {...props}>
        {children}
      </button>
    );
  }
);

// Type 2: Inline typing
const Input = forwardRef<
  HTMLInputElement,
  { label: string; type?: string }
>(({ label, type = 'text', ...props }, ref) => {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} type={type} {...props} />
    </div>
  );
});

// React 19 TypeScript (no forwardRef)
interface ButtonProps {
  ref?: React.Ref<HTMLButtonElement>;
  children: React.ReactNode;
}

function Button({ ref, children, ...props }: ButtonProps) {
  return <button ref={ref} {...props}>{children}</button>;
}
```

---

## 5. Using with useImperativeHandle

**`useImperativeHandle`** customizes the value exposed when using `ref`. Combines with `forwardRef` to expose specific methods.

### React 18 Pattern

```jsx
import { forwardRef, useImperativeHandle, useRef } from 'react';

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    // Expose custom methods
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    },
    getValue: () => {
      return inputRef.current.value;
    },
  }));

  return <input ref={inputRef} {...props} />;
});

// Usage
function App() {
  const inputRef = useRef();

  const handleClear = () => {
    inputRef.current.clear(); // Custom method!
  };

  const handleGetValue = () => {
    console.log(inputRef.current.getValue());
  };

  return (
    <div>
      <FancyInput ref={inputRef} />
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleGetValue}>Get Value</button>
    </div>
  );
}
```

---

### React 19 Pattern (with useImperativeHandle)

```jsx
function FancyInput({ ref, ...props }) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
    getValue: () => inputRef.current.value,
  }));

  return <input ref={inputRef} {...props} />;
}

// Usage (same as React 18)
const inputRef = useRef();
<FancyInput ref={inputRef} />
```

---

## 6. Common Use Cases

### Use Case 1: Focus Management

```jsx
const SearchInput = forwardRef((props, ref) => {
  return (
    <div className="search-box">
      <input ref={ref} type="search" placeholder="Search..." {...props} />
    </div>
  );
});

function SearchBar() {
  const searchRef = useRef();

  useEffect(() => {
    // Focus on mount
    searchRef.current.focus();
  }, []);

  const handleClear = () => {
    searchRef.current.value = '';
    searchRef.current.focus();
  };

  return (
    <div>
      <SearchInput ref={searchRef} />
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}
```

---

### Use Case 2: Scrolling to Element

```jsx
const Section = forwardRef(({ title, children }, ref) => {
  return (
    <section ref={ref} className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
});

function Page() {
  const section1Ref = useRef();
  const section2Ref = useRef();

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <nav>
        <button onClick={() => scrollToSection(section1Ref)}>
          Section 1
        </button>
        <button onClick={() => scrollToSection(section2Ref)}>
          Section 2
        </button>
      </nav>

      <Section ref={section1Ref} title="Section 1">
        Content 1
      </Section>
      <Section ref={section2Ref} title="Section 2">
        Content 2
      </Section>
    </div>
  );
}
```

---

### Use Case 3: Video Player Controls

```jsx
const VideoPlayer = forwardRef(({ src }, ref) => {
  const videoRef = useRef();

  useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play(),
    pause: () => videoRef.current.pause(),
    getCurrentTime: () => videoRef.current.currentTime,
    setCurrentTime: (time) => {
      videoRef.current.currentTime = time;
    },
  }));

  return (
    <video ref={videoRef} src={src} controls>
      Your browser doesn't support video.
    </video>
  );
});

function App() {
  const playerRef = useRef();

  return (
    <div>
      <VideoPlayer ref={playerRef} src="/video.mp4" />
      <button onClick={() => playerRef.current.play()}>Play</button>
      <button onClick={() => playerRef.current.pause()}>Pause</button>
      <button onClick={() => playerRef.current.setCurrentTime(0)}>
        Restart
      </button>
    </div>
  );
}
```

---

### Use Case 4: Form Field with Validation

```jsx
const ValidatedInput = forwardRef(({ 
  label, 
  validate,
  ...props 
}, ref) => {
  const inputRef = useRef();
  const [error, setError] = useState('');

  useImperativeHandle(ref, () => ({
    validate: () => {
      const value = inputRef.current.value;
      const errorMsg = validate(value);
      setError(errorMsg);
      return !errorMsg;
    },
    getValue: () => inputRef.current.value,
    focus: () => inputRef.current.focus(),
  }));

  return (
    <div>
      <label>{label}</label>
      <input ref={inputRef} {...props} />
      {error && <span className="error">{error}</span>}
    </div>
  );
});

// Usage
function Form() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const emailValid = emailRef.current.validate();
    const passwordValid = passwordRef.current.validate();

    if (emailValid && passwordValid) {
      console.log('Form is valid!');
    } else {
      // Focus first invalid field
      if (!emailValid) emailRef.current.focus();
      else if (!passwordValid) passwordRef.current.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ValidatedInput
        ref={emailRef}
        label="Email"
        type="email"
        validate={(val) => !val.includes('@') ? 'Invalid email' : ''}
      />
      <ValidatedInput
        ref={passwordRef}
        label="Password"
        type="password"
        validate={(val) => val.length < 6 ? 'Password too short' : ''}
      />
      <button>Submit</button>
    </form>
  );
}
```

---

## 7. HOCs with forwardRef

When creating HOCs, you must use `forwardRef` to pass refs through:

```jsx
// React 18: HOC with forwardRef
function withLogging(Component) {
  const WithLogging = forwardRef((props, ref) => {
    useEffect(() => {
      console.log('Component mounted');
    }, []);

    return <Component ref={ref} {...props} />;
  });

  WithLogging.displayName = `WithLogging(${Component.name})`;
  return WithLogging;
}

// Usage
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

const LoggedInput = withLogging(Input);

// Can now use ref
const inputRef = useRef();
<LoggedInput ref={inputRef} />
```

---

### React 19: HOCs Simplified

```jsx
// React 19: HOC without forwardRef wrapper
function withLogging(Component) {
  return function WithLogging({ ref, ...props }) {
    useEffect(() => {
      console.log('Component mounted');
    }, []);

    return <Component ref={ref} {...props} />;
  };
}

// Usage (same)
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

const LoggedInput = withLogging(Input);
<LoggedInput ref={inputRef} />
```

---

## 8. Class Components with Refs

Class components don't need `forwardRef` - refs work automatically:

```jsx
class FancyButton extends React.Component {
  focus() {
    this.buttonRef.focus();
  }

  render() {
    return (
      <button ref={el => this.buttonRef = el}>
        {this.props.children}
      </button>
    );
  }
}

// Usage
class App extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = React.createRef();
  }

  componentDidMount() {
    this.buttonRef.current.focus(); // Call custom method
  }

  render() {
    return <FancyButton ref={this.buttonRef}>Click Me</FancyButton>;
  }
}
```

---

## 9. Common Pitfalls

### ❌ Pitfall 1: Forgetting forwardRef (React 18)

```jsx
// ❌ Doesn't work
function Input(props) {
  return <input {...props} />; // ref not forwarded
}

// ✅ Works
const Input = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});
```

---

### ❌ Pitfall 2: Not Passing Ref to DOM Element

```jsx
// ❌ Wrong: ref not passed to DOM
const Button = forwardRef((props, ref) => {
  return (
    <div>
      <button {...props} /> {/* Missing ref! */}
    </div>
  );
});

// ✅ Correct
const Button = forwardRef((props, ref) => {
  return (
    <div>
      <button ref={ref} {...props} />
    </div>
  );
});
```

---

### ❌ Pitfall 3: Overwriting ref in Props Spreading

```jsx
// ❌ Wrong: ref gets overwritten
const Button = forwardRef((props, ref) => {
  return <button {...props} ref={ref} />; // props might have ref!
});

// ✅ Correct
const Button = forwardRef(({ children, ...props }, ref) => {
  return <button ref={ref} {...props}>{children}</button>;
});
```

---

## 10. Interview Questions

### Q1: What is forwardRef?

**Answer:** `forwardRef` is a React API that allows a component to forward a ref to a child component. Needed in React 18 and earlier because refs aren't passed like regular props.

```jsx
const Button = forwardRef((props, ref) => {
  return <button ref={ref} {...props} />;
});
```

---

### Q2: Why do we need forwardRef?

**Answer:** In React, `ref` is not a regular prop - it's handled specially by React. Function components can't receive refs directly. `forwardRef` explicitly tells React to pass the ref to the component.

---

### Q3: What changed with refs in React 19?

**Answer:** React 19 made `ref` a regular prop! You no longer need `forwardRef` in most cases:

```jsx
// React 18
const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);

// React 19
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

---

### Q4: When should you use useImperativeHandle with forwardRef?

**Answer:** Use `useImperativeHandle` when you want to customize what value is exposed when a parent uses a ref, instead of exposing the entire DOM node:

```jsx
const Input = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; },
  }));

  return <input ref={inputRef} {...props} />;
});
```

---

### Q5: Can you use forwardRef with class components?

**Answer:** No, `forwardRef` is only for function components. Class components receive refs automatically without `forwardRef`.

---

### Q6: How do you forward refs through HOCs?

**Answer:** Wrap the HOC return with `forwardRef`:

```jsx
function withLogging(Component) {
  const WithLogging = forwardRef((props, ref) => {
    // logging logic
    return <Component ref={ref} {...props} />;
  });
  return WithLogging;
}
```

---

### Q7: What's the second parameter in forwardRef?

**Answer:** The `ref` being forwarded from the parent:

```jsx
const Component = forwardRef((props, ref) => {
  // props: regular props
  // ref: the ref from parent
});
```

---

### Q8: Can you forward multiple refs?

**Answer:** No, React only supports one ref. If you need multiple refs, pass additional ones as regular props:

```jsx
const Component = forwardRef((props, ref) => {
  const { innerRef, ...rest } = props;
  return (
    <div ref={ref}>
      <input ref={innerRef} {...rest} />
    </div>
  );
});

<Component ref={outerRef} innerRef={inputRef} />
```

---

### Q9: Is forwardRef deprecated in React 19?

**Answer:** Not officially deprecated but considered "legacy". React 19 allows refs as props, making `forwardRef` unnecessary in most cases. It still works for backward compatibility.

---

### Q10: What's the displayName convention for forwardRef?

**Answer:** Set `displayName` for better debugging:

```jsx
const Button = forwardRef((props, ref) => {
  return <button ref={ref} {...props} />;
});

Button.displayName = 'Button';
```

---

## Summary: forwardRef Checklist

When working with refs and forwardRef:

- ✅ Understand refs don't pass like regular props (React 18)
- ✅ Use `forwardRef` to pass refs to function components (React 18)
- ✅ Know React 19 makes `ref` a regular prop
- ✅ Use `useImperativeHandle` to expose custom methods
- ✅ Set `displayName` for debugging
- ✅ Forward refs through HOCs when needed
- ✅ Remember class components don't need forwardRef

Your forwardRef knowledge is interview-ready when you can explain:

1. What forwardRef is (passes refs to function components)
2. Why it's needed (refs aren't regular props in React 18)
3. React 19 changes (refs are now regular props)
4. When to use useImperativeHandle
5. How to forward refs through HOCs
6. Common use cases (focus, scroll, custom methods)
7. Differences between React 18 and React 19 patterns



