# HTML FAQs

## 1. Are there different categories of attributes?

- Yes, in HTML, attributes are categorized into different types based on their purpose, behavior, and how they relate to the DOM.
- Understanding these categories helps in knowing how to access, use, or reflect them in JavaScript.

1.  ✅ **Standard Attributes**
    These are defined by the HTML specification and are common across many elements.

    Examples: `id, value, type, class, disabled, checked,` etc

    ```html
    <input type="text" value="hello" id="nameInput" />;
    ```

    Access in js

    ```js
    input.id; // "nameInput"
    input.value; // "hello"
    input.type; // "text"
    input.disabled; // false
    ```

    Many are reflected as DOM properties.

2.  📦 **Global Attributes**
    These can be used on any HTML element, regardless of tag.

    Examples: `id, class, style, title, hidden, lang, dir, tabindex, data-*`

    ```html
    <div id="box" class="container" title="Tooltip" hidden></div>
    ```

    Access in js

    ```js
    box.id; // "box"
    box.className; // "container"
    box.title; // "Tooltip"
    box.hidden; // true
    ```

    Mostly available as DOM properties or via .getAttribute()

3.  🧠 **Boolean Attributes**
    Presence = true; absence = false. These don’t need a value.

    Examples: `disabled, checked, readonly, required, autofocus, hidden`

    ```html
    <input type="checkbox" checked /> <button disabled>Click</button>
    ```

    In JS:

    ```js
    checkbox.checked; // true
    checkbox.hasAttribute("checked"); // true
    button.disabled; // true
    ```

4.  🏷️ **Enumerated Attributes**
    Accept only specific values from a list.

    Example:

    ```html
    <track kind="subtitles" />
    <iframe sandbox="allow-scripts">...</iframe>
    ```

    In JS:

    ```js
    track.getAttribute("kind"); // "subtitles"
    iframe.getAttribute("sandbox"); // "allow-scripts"
    ```

    You should stick to valid values; browsers may fallback if invalid.

5.  🎛️ **Event Handler Attributes**
    Attributes that define inline JS event handlers.

    Example: `onclick, onmouseover, onchange, oninput`, etc.

    ```html
    <button onclick="alert('Clicked')">Click Me</button>
    ```

    In JS:

    ```js
    btn.onclick = () => alert("Clicked");

    btn.addEventListener("click", () => console.log("Clicked"));
    ```

6.  📊 **Data Attributes (`data-*`)**
    Custom attributes for embedding extra data in elements.

    Example:

    ```html
    <div data-user-id="123" data-role="admin"></div>
    ```

    Access In JS:

    ```js
    el.dataset.userId; // "123"
    el.dataset.role; // "admin"
    ```

    Set In JS:

    ```js
    el.dataset.status = "active"; // adds data-status="active"
    ```

7.  📐 Aria
    Attributes (Accessibility) Used to improve accessibility (for screen
    readers, etc.).

    Always start with aria- Used
    with assistive tech Access with .getAttribute("aria-label")

    Example:

    ```html
    <button aria-label="Close">×</button>
    ```

    Access In JS:

    ```js
    button.getAttribute("aria-label"); // "Close"
    ```

✅ Summary Table
Category Examples JS Access
`Standard Attributes` id, value, type, href .prop or getAttribute()
`Global Attributes` class, title, hidden, style .prop or getAttribute()
`Boolean Attributes` checked, disabled, readonly .prop === true/false
`Enumerated Attributes` kind, sandbox, contenteditable .prop or getAttribute()
`Event Attributes` onclick, oninput .onclick = fn or addEventListener
`Data Attributes` data-\* .dataset.camelCaseName
`ARIA Attributes` aria-label, aria-hidden .getAttribute()

## Are Data Attributes Unique in That You Can Add Them Dynamically?

Data Attributes `data-*` are special because:

- You can add new `data-*` attributes dynamically on any element via JavaScript, even if they didn’t exist in the original HTML.
- You add them by assigning values to element.dataset, and the attribute automatically appears in the DOM.
- Using `element.setAttribute('some-random-attr', 'value')` will add that attribute to the element, but since it’s not recognized by HTML or browsers, it won’t have any special meaning or behavior.
- The only “official” extensible and recognized custom attributes are the `data-*` attributes, which you can freely create and manipulate.
- When you set a data-\* attribute in HTML or via JavaScript, the value is always a string.
- data type of this attribute can only be string
