# Form Submissions

Understanding how HTML forms send data to servers.

---

## `<form>` Tag - The Special Case

`<form>` is the **only HTML element** that can send real data requests to your backend (not just static file requests).

---

## Supported HTTP Methods

| Method     | Supported? | Example                                |
| ---------- | ---------- | -------------------------------------- |
| **GET**    | ✅ Yes     | `<form method="GET" action="/search">` |
| **POST**   | ✅ Yes     | `<form method="POST" action="/login">` |
| **PUT**    | ❌ No      | Not supported natively                 |
| **PATCH**  | ❌ No      | Not supported natively                 |
| **DELETE** | ❌ No      | Not supported natively                 |

---

## Why Only GET and POST?

`<form>` was created before JavaScript existed. Originally, the web had only:

- **GET** → Fetch a page
- **POST** → Submit data

Browsers still follow this rule for backward compatibility.

---

## Workarounds for PUT/PATCH/DELETE

### Method 1: Server-Side Method Override

Some backends (Laravel, Ruby on Rails, Express middlewares) allow:

```html
<form method="POST" action="/user/update">
  <input type="hidden" name="_method" value="PUT" />
</form>
```

Server interprets: `POST + _method=PUT` → treat as PUT

### Method 2: JavaScript (fetch/axios)

```javascript
fetch("/update", {
  method: "PUT",
  body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" },
});
```

Only JavaScript can send real PUT/PATCH/DELETE requests.

---

## Form Encoding Types

Forms support different `enctype` attributes:

- `application/x-www-form-urlencoded` (default)
- `multipart/form-data` (for file uploads)
- `text/plain` (rarely used)

See [POST Request Content Types](./6.%20POST%20Request%20Content%20Types.md) for detailed explanation of each.

---

## Form Behavior in React/SPA Apps

In React apps, forms never submit traditionally. We prevent browser submission:

```javascript
<form onSubmit={(e) => e.preventDefault()}>
```

Then use `fetch()` or `axios` because SPA apps don't want a full page refresh.

---

## Related Topics

- [POST Request Content Types](./5.%20POST%20Request%20Content%20Types.md) - Understanding form encoding types
- [Basic File Uploads](./3.%20Basic%20File%20Uploads.md) - How files are uploaded via forms
- [HTML Tags and HTTP Requests](./2.%20HTML%20Tags%20and%20HTTP%20Requests.md) - How forms differ from other tags

