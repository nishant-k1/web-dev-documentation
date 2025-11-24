# API Testing Strategies

Testing API calls in React - mocking API responses, MSW (Mock Service Worker), testing error scenarios, testing loading states, and integration testing.

---

## Core Concept

**API testing** ensures API integration works correctly. Mock API responses to test without real backend.

**Testing Approaches:**

- Mock Service Worker (MSW)
- Jest mocks
- Manual mocks
- Integration testing

---

## Strategy 1: Mock Service Worker (MSW)

### Setup MSW

```javascript
// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.get("/api/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
      ])
    );
  }),

  rest.post("/api/users", (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: 3, name: "New User" }));
  }),

  rest.get("/api/users/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({ id: parseInt(id), name: "User " + id })
    );
  }),
];
```

---

### Test with MSW

```javascript
import { render, screen, waitFor } from "@testing-library/react";
import { server } from "../mocks/server";
import { rest } from "msw";
import UserList from "./UserList";

test("displays users", async () => {
  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});

test("handles error", async () => {
  server.use(
    rest.get("/api/users", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText("Error loading users")).toBeInTheDocument();
  });
});
```

---

## Strategy 2: Jest Mocks

### Mock Fetch

```javascript
global.fetch = jest.fn();

test("fetches users", async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => [{ id: 1, name: "John" }],
  });

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText("John")).toBeInTheDocument();
  });

  expect(fetch).toHaveBeenCalledWith("/api/users");
});
```

---

## Strategy 3: Testing Error Scenarios

### Test Different Error Types

```javascript
test("handles network error", async () => {
  fetch.mockRejectedValueOnce(new Error("Network error"));

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });
});

test("handles 404 error", async () => {
  fetch.mockResolvedValueOnce({
    ok: false,
    status: 404,
    json: async () => ({ error: "Not found" }),
  });

  render(<UserList />);

  await waitFor(() => {
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
```

---

## Strategy 4: Testing Loading States

### Test Loading Indicators

```javascript
test("shows loading state", () => {
  fetch.mockImplementation(() => new Promise(() => {})); // Never resolves

  render(<UserList />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});
```

---

## Common Interview Questions

### Q: How do you test API calls in React?

**A:** Use MSW to mock API responses, test loading/error states, test different response scenarios, and use Jest to mock fetch.

### Q: What's MSW?

**A:** Mock Service Worker - intercepts network requests in tests and browser, allowing realistic API mocking.

### Q: How do you test error handling?

**A:** Mock error responses (network errors, 4xx, 5xx), verify error messages are displayed, and test error recovery.

---

## Related Topics

- [Error Handling Patterns](./1.%20Error%20Handling%20Patterns%20in%20React.md) - Error handling
- [Loading States Management](./2.%20Loading%20States%20Management.md) - Loading states

---

## Summary

**API Testing Strategies:**

- MSW (Mock Service Worker) - Best for realistic mocking
- Jest mocks - Simple fetch mocking
- Test error scenarios
- Test loading states

**Best Practices:**

- Use MSW for realistic API mocking
- Test all error scenarios
- Test loading states
- Test success scenarios

**Key Takeaway:** Test API calls using MSW for realistic mocking. Test error scenarios, loading states, and success cases. MSW intercepts network requests for better testing.
