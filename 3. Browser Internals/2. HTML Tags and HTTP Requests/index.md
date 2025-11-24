# HTML Tags and HTTP Requests

Understanding which HTML elements trigger automatic HTTP requests and which don't.

---

## Tags That Trigger Automatic HTTP Requests

These HTML elements **automatically** make HTTP GET requests for external resources.

### Resource-Loading Tags

| Tag        | What It Loads      | Example                                    |
| ---------- | ------------------ | ------------------------------------------ |
| `<img>`    | Image file         | `<img src="logo.png">`                     |
| `<script>` | JavaScript file    | `<script src="main.js"></script>`          |
| `<link>`   | CSS, icons, fonts  | `<link rel="stylesheet" href="style.css">` |
| `<iframe>` | Entire webpage     | `<iframe src="page.html"></iframe>`        |
| `<video>`  | Video file         | `<video src="movie.mp4"></video>`          |
| `<audio>`  | Audio file         | `<audio src="song.mp3"></audio>`           |
| `<source>` | Media source       | `<source src="track.mp3">`                 |
| `<track>`  | Captions/subtitles | `<track src="subtitles.vtt">`              |
| `<embed>`  | Embedded files     | `<embed src="file.pdf">`                   |
| `<object>` | External resources | `<object data="file.pdf"></object>`        |

### CSS That Triggers Requests

CSS can also trigger HTTP requests:

```css
/* Background images */
background: url("bg.jpg");

/* Imported stylesheets */
@import url("theme.css");

/* Font files */
@font-face {
  src: url("Roboto.woff2");
}
```

### Important Notes

- These tags make **automatic GET requests** (no JavaScript needed)
- They **cannot send POST data** or JSON
- They **cannot call API endpoints** (they expect files, not JSON responses)
- The target server depends on the URL (localhost, production, CDN, external)

---

## Tags That Do NOT Trigger Requests

These HTML elements do **NOT** trigger any HTTP requests:

- `<div>`, `<span>`, `<p>`, `<section>`, `<header>`, `<footer>`
- `<h1>` through `<h6>`
- `<strong>`, `<em>`, `<b>`, `<i>`
- `<button>`, `<input>` (except `type="file"` - see [Basic File Uploads](./3.%20Basic%20File%20Uploads.md))
- `<select>`, `<option>`, `<textarea>`
- `<table>`, `<ul>`, `<li>`, `<ol>`
- `<form>` inputs (they don't request anything by themselves)

These are purely structural or interactive elements.

---

## Special Case: `<form>` Tag

`<form>` is the **only HTML element** that can send real data requests to your backend (not just static file requests).

See [Form Submissions](./5.%20Form%20Submissions.md) for details.

---

## Related Topics

- [Browser Request Lifecycle](./1.%20Browser%20Request%20Lifecycle.md) - How browsers initiate requests
- [HTTP Request Destinations](./7.%20HTTP%20Request%20Destinations.md) - Where these requests go
- [Resource Loading Behavior](./6.%20Resource%20Loading%20Behavior.md) - How these resources load
- [Form Submissions](./4.%20Form%20Submissions.md) - Special case of forms

