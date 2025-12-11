# React Testing Library Basics

## TL;DR
- Test components like users interact with them
- Query by accessibility roles, labels, text
- Don't test implementation details
- Focus on behavior, not internals
- Encourages accessible components

## Core Principles

1. **Test behavior, not implementation**
2. **Query by what users see**
3. **Avoid testing internals** (state, props directly)
4. **Write accessible components** (byRole, byLabelText)

## Setup

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

```js
// setupTests.js
import '@testing-library/jest-dom';
```

## Basic Test Structure

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('renders and handles click', async () => {
  // 1. Render
  render(<Button onClick={handleClick}>Click me</Button>);
  
  // 2. Query
  const button = screen.getByRole('button', { name: /click me/i });
  
  // 3. Interact
  await userEvent.click(button);
  
  // 4. Assert
  expect(handleClick).toHaveBeenCalled();
});
```

## Queries

### Priority Order

1. **getByRole** - Most accessible
2. **getByLabelText** - Forms
3. **getByPlaceholderText** - Forms
4. **getByText** - Non-interactive
5. **getByTestId** - Last resort

### Query Variants

```jsx
// getBy - throws if not found
const button = screen.getByRole('button');

// queryBy - returns null if not found
const button = screen.queryByRole('button');

// findBy - async, waits for element
const button = await screen.findByRole('button');

// getAllBy - multiple elements
const buttons = screen.getAllByRole('button');
```

## Real-World Examples

### 1. Testing Button Click

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('increments count on button click', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  
  const count = screen.getByText(/count: 0/i);
  const button = screen.getByRole('button', { name: /increment/i });
  
  await user.click(button);
  
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```

### 2. Testing Form Input

```jsx
test('updates input value', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  
  const emailInput = screen.getByLabelText(/email/i);
  
  await user.type(emailInput, 'test@example.com');
  
  expect(emailInput).toHaveValue('test@example.com');
});
```

### 3. Testing Form Submission

```jsx
test('submits form with correct data', async () => {
  const handleSubmit = jest.fn();
  const user = userEvent.setup();
  
  render(<LoginForm onSubmit={handleSubmit} />);
  
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
```

### 4. Testing Async Data Fetching

```jsx
test('displays user data after fetch', async () => {
  render(<UserProfile userId={1} />);
  
  // Initially shows loading
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  
  // Wait for data to load
  const userName = await screen.findByText(/john doe/i);
  expect(userName).toBeInTheDocument();
  
  // Loading should be gone
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
```

### 5. Testing Conditional Rendering

```jsx
test('shows error message on failure', async () => {
  const user = userEvent.setup();
  
  render(<SearchBox />);
  
  const input = screen.getByRole('textbox');
  const button = screen.getByRole('button', { name: /search/i });
  
  await user.type(input, 'invalid');
  await user.click(button);
  
  const error = await screen.findByRole('alert');
  expect(error).toHaveTextContent(/no results found/i);
});
```

## Mocking

### Mock API Calls

```jsx
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ name: 'John Doe' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('fetches and displays user', async () => {
  render(<User />);
  
  expect(await screen.findByText('John Doe')).toBeInTheDocument();
});
```

### Mock Functions

```jsx
test('calls callback on click', async () => {
  const handleClick = jest.fn();
  const user = userEvent.setup();
  
  render(<Button onClick={handleClick}>Click</Button>);
  
  await user.click(screen.getByRole('button'));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Mock Modules

```jsx
jest.mock('./api', () => ({
  fetchUser: jest.fn(() => Promise.resolve({ name: 'John' }))
}));

test('displays user from mocked API', async () => {
  render(<UserProfile />);
  
  expect(await screen.findByText('John')).toBeInTheDocument();
});
```

## Common Patterns

### Testing Lists

```jsx
test('renders list of items', () => {
  const items = ['Apple', 'Banana', 'Orange'];
  render(<ItemList items={items} />);
  
  items.forEach(item => {
    expect(screen.getByText(item)).toBeInTheDocument();
  });
});
```

### Testing Toggles

```jsx
test('toggles visibility', async () => {
  const user = userEvent.setup();
  render(<Dropdown />);
  
  const button = screen.getByRole('button');
  
  // Initially hidden
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  
  // Click to show
  await user.click(button);
  expect(screen.getByRole('menu')).toBeInTheDocument();
  
  // Click to hide
  await user.click(button);
  expect(screen.queryByRole('menu')).not.toBeInTheDocument();
});
```

### Testing Modals

```jsx
test('opens and closes modal', async () => {
  const user = userEvent.setup();
  render(<ModalExample />);
  
  await user.click(screen.getByRole('button', { name: /open modal/i }));
  
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  
  await user.click(screen.getByRole('button', { name: /close/i }));
  
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```

## Common Interview Questions

### Q1: getBy vs queryBy vs findBy?

**Answer:**
- **getBy**: Throws if not found (element should be there)
- **queryBy**: Returns null (checking absence)
- **findBy**: Async, waits for element (loading states)

### Q2: Why not test implementation details?

**Answer:** Implementation can change without breaking functionality. Test what users experience, not how it works internally.

```jsx
// ❌ BAD - testing implementation
expect(component.state.count).toBe(1);

// ✅ GOOD - testing behavior
expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
```

### Q3: How to test custom hooks?

**Answer:** Use `renderHook` from @testing-library/react:

```jsx
import { renderHook, act } from '@testing-library/react';

test('useCounter increments', () => {
  const { result } = renderHook(() => useCounter());
  
  act(() => {
    result.current.increment();
  });
  
  expect(result.current.count).toBe(1);
});
```

### Q4: How to wait for elements?

**Answer:** Use `findBy` queries or `waitFor`:

```jsx
// Option 1: findBy
const element = await screen.findByText(/loaded/i);

// Option 2: waitFor
await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument();
});
```

## Best Practices

1. **Query by role/label** - most accessible
2. **Use userEvent over fireEvent** - simulates real interactions
3. **Don't use test IDs** unless necessary
4. **Test user flows** not individual functions
5. **Keep tests isolated** - each test independent
6. **Use MSW for API mocking** - realistic HTTP mocking

## Common Pitfalls

### 1. Testing Implementation Details

```jsx
// ❌ BAD
expect(component.find('.button')).toHaveLength(1);

// ✅ GOOD
expect(screen.getByRole('button')).toBeInTheDocument();
```

### 2. Not Awaiting Async Operations

```jsx
// ❌ BAD
userEvent.click(button);
expect(screen.getByText('Success')).toBeInTheDocument();

// ✅ GOOD
await user.click(button);
expect(await screen.findByText('Success')).toBeInTheDocument();
```

### 3. Using getBy for Conditional Elements

```jsx
// ❌ BAD - throws if not found
expect(screen.getByText('Error')).not.toBeInTheDocument();

// ✅ GOOD - returns null
expect(screen.queryByText('Error')).not.toBeInTheDocument();
```

## Related Concepts

- **Jest**: Testing framework
- **userEvent**: Simulate user interactions
- **MSW**: Mock Service Worker for API mocking
- **jest-dom**: Custom matchers

