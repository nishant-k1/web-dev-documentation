# Form Validation in React

## TL;DR
- Validate on change for instant feedback
- Validate on blur for less intrusive UX
- Validate on submit as final check
- Show errors clearly near inputs
- Disable submit button during validation

## Validation Strategies

### 1. Client-Side Validation
- Instant feedback
- Better UX
- Reduce server load
- Not sufficient alone (also validate server-side)

### 2. Server-Side Validation
- Security requirement
- Validate business logic
- Check uniqueness (email, username)
- Final authority

## Basic Validation Example

```jsx
function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    return newErrors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      // Submit form
      console.log('Valid!', formData);
    } else {
      setErrors(newErrors);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      
      <div>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>
      
      <button type="submit">Login</button>
    </form>
  );
}
```

## Validation Patterns

### 1. Validate on Change (Instant Feedback)

```jsx
function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return 'Email is invalid';
    }
    return '';
  };
  
  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError(validateEmail(value));
  };
  
  return (
    <div>
      <input
        value={email}
        onChange={handleChange}
        className={error ? 'invalid' : ''}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

### 2. Validate on Blur (Less Intrusive)

```jsx
function PasswordInput() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  
  const validatePassword = (value) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Min 8 characters';
    if (!/[A-Z]/.test(value)) return 'Must contain uppercase';
    if (!/[0-9]/.test(value)) return 'Must contain number';
    return '';
  };
  
  const handleBlur = () => {
    setTouched(true);
    setError(validatePassword(password));
  };
  
  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={handleBlur}
      />
      {touched && error && <span className="error">{error}</span>}
    </div>
  );
}
```

### 3. Async Validation

```jsx
function UsernameInput() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  
  // Debounce check
  useEffect(() => {
    if (!username) return;
    
    setChecking(true);
    const timer = setTimeout(async () => {
      try {
        const available = await checkUsername(username);
        setError(available ? '' : 'Username taken');
      } finally {
        setChecking(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [username]);
  
  return (
    <div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {checking && <span>Checking...</span>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}
```

## Custom Validation Hook

```jsx
function useFormValidation(initialState, validateFn) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate on blur
    const fieldErrors = validateFn(values);
    if (fieldErrors[name]) {
      setErrors(prev => ({ ...prev, [name]: fieldErrors[name] }));
    }
  };
  
  const handleSubmit = async (onSubmit) => {
    const validationErrors = validateFn(values);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  };
}

// Usage
function RegistrationForm() {
  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Required';
    if (!values.password) errors.password = 'Required';
    return errors;
  };
  
  const { values, errors, handleChange, handleBlur, handleSubmit } = 
    useFormValidation({ email: '', password: '' }, validate);
  
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(async (data) => {
        await register(data);
      });
    }}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.email && <span>{errors.email}</span>}
      {/* ... */}
    </form>
  );
}
```

## Using React Hook Form

```jsx
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();
  
  const onSubmit = async (data) => {
    await register(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Invalid email'
          }
        })}
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Min 8 characters'
          }
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

## Best Practices

1. **Validate on blur** for better UX (less annoying)
2. **Clear errors on change** - don't keep showing old errors
3. **Disable submit during validation** - prevent double submission
4. **Show specific error messages** - "Email is invalid" not "Error"
5. **Mark required fields** visually (asterisk, label)
6. **Validate on submit** as final check
7. **Always validate server-side** too (security)

## Common Pitfalls

### 1. Validating Before User Interaction

```jsx
// ❌ BAD - shows errors immediately
const [error, setError] = useState(validateEmail(''));

// ✅ GOOD - show errors after touch
const [touched, setTouched] = useState(false);
{touched && error && <span>{error}</span>}
```

### 2. Not Handling Async Errors

```jsx
// ❌ BAD - no error handling
const handleSubmit = async (data) => {
  await api.register(data);
};

// ✅ GOOD - catch server errors
const handleSubmit = async (data) => {
  try {
    await api.register(data);
  } catch (error) {
    setErrors({ form: error.message });
  }
};
```

## Related Concepts

- **Form Libraries**: React Hook Form, Formik
- **Validation Libraries**: Yup, Zod
- **HTML5 Validation**: Built-in browser validation
- **Server-Side Validation**: Backend validation



