# Controlled vs Uncontrolled Components

## TL;DR

- **Controlled**: React controls form state (value + onChange)
- **Uncontrolled**: DOM controls state (useRef + defaultValue)
- **Controlled**: More control, validation, instant feedback
- **Uncontrolled**: Less code, better performance for simple forms
- **Prefer controlled** for most cases

## Controlled Components

React state controls the input value.

```jsx
function ControlledInput() {
  const [value, setValue] = useState("");

  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

### Complete Form Example

```jsx
function ControlledForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Uncontrolled Components

DOM controls the input value, accessed via ref.

```jsx
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Value:", inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Complete Form Example

```jsx
function UncontrolledForm() {
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    console.log("Form data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={usernameRef} defaultValue="" placeholder="Username" />
      <input ref={emailRef} type="email" defaultValue="" placeholder="Email" />
      <input
        ref={passwordRef}
        type="password"
        defaultValue=""
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Comparison

| Feature            | Controlled      | Uncontrolled              |
| ------------------ | --------------- | ------------------------- |
| State Location     | React state     | DOM                       |
| Access Value       | `value` prop    | `ref.current.value`       |
| Default Value      | `value`         | `defaultValue`            |
| Instant Validation | ✅ Easy         | ❌ Hard                   |
| Format Input       | ✅ Easy         | ❌ Hard                   |
| Conditional Logic  | ✅ Easy         | ❌ Hard                   |
| Performance        | Slightly slower | Slightly faster           |
| Code Amount        | More            | Less                      |
| Use Case           | Most forms      | Simple forms, file inputs |

## Controlled Examples

### 1. Input Formatting

```jsx
function PhoneInput() {
  const [phone, setPhone] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    const formatted = value
      .slice(0, 10)
      .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    setPhone(formatted);
  };

  return (
    <input value={phone} onChange={handleChange} placeholder="(555) 555-5555" />
  );
}
```

### 2. Instant Validation

```jsx
function EmailInput() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Instant validation
    if (value && !value.includes("@")) {
      setError("Invalid email");
    } else {
      setError("");
    }
  };

  return (
    <div>
      <input value={email} onChange={handleChange} placeholder="Email" />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

### 3. Conditional Fields

```jsx
function ConditionalForm() {
  const [userType, setUserType] = useState("personal");
  const [companyName, setCompanyName] = useState("");

  return (
    <form>
      <select value={userType} onChange={(e) => setUserType(e.target.value)}>
        <option value="personal">Personal</option>
        <option value="business">Business</option>
      </select>

      {userType === "business" && (
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Company Name"
        />
      )}
    </form>
  );
}
```

### 4. Character Counter

```jsx
function TextAreaWithCounter() {
  const [text, setText] = useState("");
  const maxLength = 280;

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxLength}
      />
      <div>
        {text.length}/{maxLength}
      </div>
    </div>
  );
}
```

## Uncontrolled Examples

### 1. File Input (Must be Uncontrolled)

```jsx
function FileUpload() {
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // Upload file
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" ref={fileInputRef} />
      <button type="submit">Upload</button>
    </form>
  );
}
```

### 2. Simple Search Form

```jsx
function SearchForm() {
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchRef.current.value;
    // Perform search
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={searchRef} defaultValue="" placeholder="Search..." />
      <button type="submit">Search</button>
    </form>
  );
}
```

## Hybrid Approach

Mix both when needed:

```jsx
function HybridForm() {
  // Controlled for fields needing validation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Uncontrolled for simple fields
  const nameRef = useRef(null);
  const fileRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current.value,
      email,
      password,
      file: fileRef.current.files[0],
    };
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} defaultValue="" placeholder="Name" />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input type="file" ref={fileRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Common Interview Questions

### Q1: When to use controlled vs uncontrolled?

**Answer:**

- **Controlled**: Default choice, instant validation, formatting
- **Uncontrolled**: Simple forms, file inputs, third-party DOM integration

### Q2: Can you have both value and defaultValue?

**Answer:** No! Choose one:

- `value` + `onChange` = Controlled
- `defaultValue` + `ref` = Uncontrolled

### Q3: Why does React warn about controlled/uncontrolled switching?

**Answer:** Changing from `value={undefined}` to `value="text"` or vice versa. Always initialize with empty string:

```jsx
// ❌ BAD - switches from uncontrolled to controlled
const [value, setValue] = useState(undefined);

// ✅ GOOD
const [value, setValue] = useState("");
```

### Q4: How to get form data without state for each field?

**Answer:** Use FormData API:

```jsx
function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  console.log(data);
}
```

## Best Practices

1. **Prefer controlled** for most cases
2. **Use uncontrolled for file inputs** (must be uncontrolled)
3. **Initialize controlled inputs** with empty string
4. **Don't mix** controlled and uncontrolled for same input
5. **Use form libraries** for complex forms (React Hook Form)
6. **Validate on change** for better UX
7. **Disable submit** during submission

## Common Pitfalls

### 1. Undefined vs Empty String

```jsx
// ❌ BAD - switches from uncontrolled to controlled
const [value, setValue] = useState();

// ✅ GOOD
const [value, setValue] = useState("");
```

### 2. Missing onChange

```jsx
// ❌ BAD - readonly input (can't type)
<input value={value} />

// ✅ GOOD
<input value={value} onChange={(e) => setValue(e.target.value)} />
```

### 3. Mutating State

```jsx
// ❌ BAD
const handleChange = (e) => {
  formData.email = e.target.value; // Mutation!
  setFormData(formData);
};

// ✅ GOOD
const handleChange = (e) => {
  setFormData({ ...formData, email: e.target.value });
};
```

## Related Concepts

- **Form Validation**: Validate user input
- **React Hook Form**: Form library
- **FormData API**: Native form data handling
- **Refs**: Access DOM elements


