# Document Properties and Methods

---

## **Properties of Document**

### **General Information**

- **`documentURI`** – Returns the URI of the document.
- **`URL`** – The full URL of the document.
- **`title`** – Gets or sets the title of the document.
- **`domain`** – Returns the domain of the document.
- **`referrer`** – Returns the URI of the document that referred to the current one.
- **`doctype`** – Returns the document type (read-only).
- **`characterSet`** – Returns the character encoding of the document.
- **`contentType`** – MIME type of the document.

### **HTML Structure**

- **`documentElement`** – The root element (e.g., `<html>`).
- **`head`** – Returns the `<head>` element.
- **`body`** – Returns the `<body>` element.
- **`forms`** – A collection of all `<form>` elements.
- **`images`** – A collection of all `<img>` elements.
- **`links`** – A collection of all `<a>` and `<area>` elements with `href` attributes.
- **`scripts`** – A collection of all `<script>` elements.
- **`anchors`** – A collection of all `<a>` elements with `name` attributes.

### **Active Elements**

- **`activeElement`** – The element that is currently focused.
- **`fullscreenElement`** – The element currently in fullscreen mode.
- **`lastModified`** – The date and time the document was last modified.

### **Metadata**

- **`cookie`** – Gets or sets cookies for the current document.
- **`defaultView`** – Returns the `window` object associated with the document.

### **Selection**

- **`selection`** – Returns the text selection associated with the document.
- **`designMode`** – Controls whether the document is editable (`"on"` or `"off"`).

### **Readiness State**

- **`readyState`** – The loading status of the document (`loading`, `interactive`, or `complete`).

---

## **Methods of Document**

### **Finding Elements**

- **`getElementById(id)`** – Returns an element with the specified `id`.
- **`getElementsByClassName(className)`** – Returns a live HTMLCollection of elements with the specified class name(s).
- **`getElementsByTagName(tagName)`** – Returns a live HTMLCollection of elements with the specified tag name.
- **`querySelector(selector)`** – Returns the first element matching the CSS selector.
- **`querySelectorAll(selector)`** – Returns a static NodeList of elements matching the CSS selector.
- **`getElementsByName(name)`** – Returns a live NodeList of elements with the specified `name` attribute.

### **Node and Tree Manipulation**

- **`createElement(tagName)`** – Creates a new element with the specified tag name.
- **`createTextNode(text)`** – Creates a new text node with the specified text.
- **`createComment(text)`** – Creates a new comment node.
- **`importNode(node, deep)`** – Imports a node from another document.
- **`adoptNode(node)`** – Adopts a node from another document.
- **`createDocumentFragment()`** – Creates an empty DocumentFragment.

### **Event Handling**

- **`addEventListener(eventType, listener, options)`** – Attaches an event listener to the document.
- **`removeEventListener(eventType, listener, options)`** – Removes a previously attached event listener.
- **`dispatchEvent(event)`** – Dispatches a custom event on the document.

### **Content Manipulation**

- **`write(html)`** – Writes HTML content to the document.
- **`writeln(html)`** – Writes HTML content to the document, followed by a newline.
- **`open()`** – Opens the document for writing.
- **`close()`** – Closes the document for writing.

### **Focus and Selection**

- **`hasFocus()`** – Returns `true` if the document is focused.
- **`execCommand(command, showUI, value)`** – Executes a command for editing (deprecated).
- **`getSelection()`** – Returns the current text selection as a `Selection` object.

### **Full-Screen API**

- **`exitFullscreen()`** – Exits fullscreen mode.

### **CSS and Style**

- **`elementFromPoint(x, y)`** – Returns the topmost element at the specified point.
- **`elementsFromPoint(x, y)`** – Returns all elements at the specified point.

### **Custom Event Creation**

- **`createEvent(type)`** – Creates an event of the specified type (deprecated).
- **`createEventObject()`** – Creates an event object (IE-specific, deprecated).
- **`createEvent(type)`** – Modern way to create custom events.

---

## Example Usage

```javascript
// Accessing properties
console.log(document.title); // Get the title
document.title = "New Page Title"; // Set a new title

// Finding elements
const header = document.getElementById("header");
const links = document.getElementsByClassName("nav-link");
const images = document.querySelectorAll("img");

// Creating elements
const newDiv = document.createElement("div");
newDiv.textContent = "Hello, Document!";
document.body.appendChild(newDiv);

// Event handling
document.addEventListener("DOMContentLoaded", () => {
  console.log("Document is fully loaded");
});

// Working with cookies
document.cookie = "user=JohnDoe; expires=Fri, 31 Dec 2025 23:59:59 UTC; path=/";
console.log(document.cookie);
```
