# `useImperativeHandle` Hook

## TL;DR
- Customize the ref value exposed to parent components
- Used with `forwardRef`
- Lets you control what methods/properties parent can access
- Rarely needed - breaks encapsulation
- Useful for imperative APIs (focus, scroll, play/pause)

## What is `useImperativeHandle`?

`useImperativeHandle` customizes the instance value that is exposed when using `ref`. Most components shouldn't need this - it's for rare cases where you need to expose imperative methods to parent components.

## Syntax

```jsx
useImperativeHandle(ref, createHandle, [dependencies]);
```

## Basic Example

### Without useImperativeHandle

```jsx
const Input = forwardRef((props, ref) => {
  // Parent gets full DOM node
  return <input ref={ref} />;
});

// Parent can do ANYTHING
function Parent() {
  const ref = useRef();
  
  // Has access to ALL input methods
  ref.current.focus();
  ref.current.value = 'anything'; // Can break component state
  ref.current.style.color = 'red'; // Can mess with styles
}
```

### With useImperativeHandle

```jsx
const Input = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  // Only expose specific methods
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));
  
  return <input ref={inputRef} />;
});

// Parent only has access to exposed methods
function Parent() {
  const ref = useRef();
  
  ref.current.focus(); // ✅ Allowed
  ref.current.clear(); // ✅ Allowed
  ref.current.style.color = 'red'; // ❌ Error - not exposed
}
```

## Real-World Examples

### 1. Custom Input with Focus Method

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    getValue: () => {
      return inputRef.current.value;
    },
    setValue: (value) => {
      inputRef.current.value = value;
    }
  }));
  
  return (
    <div className="fancy-input">
      <input ref={inputRef} {...props} />
      <span className="icon">✓</span>
    </div>
  );
});

// Usage
function Form() {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    const value = inputRef.current.getValue();
    console.log('Submitted:', value);
  };
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}
```

### 2. Video Player with Controls

```jsx
const VideoPlayer = forwardRef(({ src }, ref) => {
  const videoRef = useRef();
  
  useImperativeHandle(ref, () => ({
    play: () => {
      videoRef.current.play();
    },
    pause: () => {
      videoRef.current.pause();
    },
    seek: (time) => {
      videoRef.current.currentTime = time;
    },
    getCurrentTime: () => {
      return videoRef.current.currentTime;
    }
  }));
  
  return <video ref={videoRef} src={src} />;
});

// Usage
function App() {
  const playerRef = useRef();
  
  return (
    <div>
      <VideoPlayer ref={playerRef} src="video.mp4" />
      <button onClick={() => playerRef.current.play()}>Play</button>
      <button onClick={() => playerRef.current.pause()}>Pause</button>
      <button onClick={() => playerRef.current.seek(0)}>Restart</button>
    </div>
  );
}
```

### 3. Modal with Imperative API

```jsx
const Modal = forwardRef(({ children }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev)
  }));
  
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal">
        {children}
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
});

// Usage
function App() {
  const modalRef = useRef();
  
  return (
    <div>
      <button onClick={() => modalRef.current.open()}>Open Modal</button>
      <Modal ref={modalRef}>
        <h2>Modal Content</h2>
      </Modal>
    </div>
  );
}
```

### 4. Scrollable Container

```jsx
const ScrollContainer = forwardRef(({ children }, ref) => {
  const containerRef = useRef();
  
  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      containerRef.current.scrollTop = 0;
    },
    scrollToBottom: () => {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    },
    scrollTo: (position) => {
      containerRef.current.scrollTop = position;
    }
  }));
  
  return (
    <div
      ref={containerRef}
      style={{ height: '400px', overflow: 'auto' }}
    >
      {children}
    </div>
  );
});

// Usage
function Chat() {
  const scrollRef = useRef();
  
  const addMessage = (msg) => {
    setMessages([...messages, msg]);
    scrollRef.current.scrollToBottom();
  };
  
  return (
    <div>
      <ScrollContainer ref={scrollRef}>
        {messages.map(msg => <div key={msg.id}>{msg.text}</div>)}
      </ScrollContainer>
      <button onClick={() => scrollRef.current.scrollToTop()}>
        Scroll to Top
      </button>
    </div>
  );
}
```

## Common Interview Questions

### Q1: Why use useImperativeHandle instead of just passing ref?

**Answer:** 
- **Encapsulation**: Control what parent can access
- **Abstraction**: Hide implementation details
- **Safety**: Prevent parent from breaking component internals
- **API Design**: Expose only intentional methods

### Q2: Do you need forwardRef with useImperativeHandle?

**Answer:** Yes! useImperativeHandle only works with forwardRef.

```jsx
// ❌ WRONG - no forwardRef
function Component(props, ref) {
  useImperativeHandle(ref, () => ({}));
}

// ✅ CORRECT
const Component = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({}));
});
```

### Q3: When should you actually use this?

**Answer:** Rarely! Only for:
- focus(), blur(), scroll() operations
- play(), pause() for media
- Integrating with imperative libraries
- Animation controls

Prefer props and state for most cases.

### Q4: Performance considerations?

**Answer:** The create function runs on every render unless you provide dependencies array.

```jsx
// ❌ Creates new object every render
useImperativeHandle(ref, () => ({
  method: () => {}
}));

// ✅ Only recreates when count changes
useImperativeHandle(ref, () => ({
  method: () => console.log(count)
}), [count]);
```

## Common Pitfalls

### 1. **Not Using forwardRef**

```jsx
// ❌ WRONG
function Component(props, ref) {
  useImperativeHandle(ref, () => ({}));
}

// ✅ CORRECT
const Component = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({}));
});
```

### 2. **Exposing Too Much**

```jsx
// ❌ BAD - exposes entire DOM node
useImperativeHandle(ref, () => inputRef.current);

// ✅ GOOD - only specific methods
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus()
}));
```

### 3. **Missing Dependencies**

```jsx
// ❌ WRONG - stale closure
useImperativeHandle(ref, () => ({
  getValue: () => value
}), []); // value not in deps

// ✅ CORRECT
useImperativeHandle(ref, () => ({
  getValue: () => value
}), [value]);
```

## Best Practices

1. **Use sparingly** - breaks encapsulation
2. **Prefer props/state** - more React-like
3. **Limit exposed API** - only what's necessary
4. **Document the API** - what methods are available
5. **Include dependencies** - avoid stale closures
6. **TypeScript** - type the ref handle

## TypeScript Example

```typescript
interface InputHandle {
  focus: () => void;
  clear: () => void;
}

const Input = forwardRef<InputHandle, InputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }));
  
  return <input ref={inputRef} {...props} />;
});

// Usage with type safety
function Parent() {
  const ref = useRef<InputHandle>(null);
  
  ref.current?.focus(); // ✅ Type-safe
  ref.current?.clear(); // ✅ Type-safe
}
```

## When to Use

✅ **Use for:**
- focus(), blur(), scrollIntoView()
- Media controls (play, pause, seek)
- Animation triggers
- Integration with imperative libraries
- Form methods (submit, reset)

❌ **Don't use for:**
- Passing data up (use callbacks)
- Component communication (use props/context)
- State management (use useState/Redux)
- Most standard component interactions

## Related Concepts

- **forwardRef**: Required for useImperativeHandle
- **useRef**: Access DOM elements
- **Ref forwarding**: Passing refs through components
- **Imperative vs Declarative**: Design patterns



