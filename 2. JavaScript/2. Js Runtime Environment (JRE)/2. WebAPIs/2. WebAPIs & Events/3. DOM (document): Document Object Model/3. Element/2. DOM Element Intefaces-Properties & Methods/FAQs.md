# Element Categories FAQs

1. **I did not understand, interface, what? Until now I only knew html is a markup language. In js we have WebAPIs, BOMs and DOM, in dom, we have document and inside document we have element and and inside the element we have div, p, image, audio, video etc. Never heard of HTMLElement inside DOM, whats that and where does those actually belong int whe webAPI, dom or bom.**

   First, What Do You Mean by “Interface”?

   - When we say HTMLElement is an interface, we don’t mean a user interface (UI), and we’re not talking about TypeScript-style interfaces either.
   - In JavaScript (more precisely, in browser APIs, written in WebIDL), an interface is like a blueprint for objects. It defines:
     - What properties an object has (like innerHTML, style)
     - What methods it can call (like .click(), .focus())

2. **🌐 Where Does HTMLElement Fit? Web APIs, DOM, or BOM?**

   ```js
   📦 Web Platform APIs (a huge collection of APIs)
   │
   ├── 📁 BOM (Browser Object Model)
   │   └── window, navigator, location, etc.
   │
   ├── 📁 DOM (Document Object Model)
   │   └── document, Element, Node, HTMLElement, etc.
   │
   └── 📁 Other Web APIs
     ├── fetch API
     ├── Web Storage (localStorage, sessionStorage)
     ├── WebSockets
     └── many more...
   ```

   ✅ HTMLElement is part of the DOM,
   ✅ And the DOM is one of the many APIs in the Web API ecosystem,
   ❌ But HTMLElement is not part of the BOM.

   DOM: It's a Tree of Objects, Not Just Tags. That div is not just a string or tag. It becomes a real object in JavaScript, with a prototype chain like this:
   `div → HTMLDivElement → HTMLElement → Element → Node → EventTarget → Object`

   You can visualize it like this:

   ```js
   EventTarget
      ↑
     Node
      ↑
   Element
      ↑
   HTMLElement
      ↑
   HTMLDivElement (or HTMLParagraphElement, HTMLImageElement, etc.)
      ↑
   Your Actual <div> Element in Code
   ```

   Let’s say:

   document.createElement("div") gives you a div-shaped object.

   That object is made from a blueprint.

   That blueprint is HTMLDivElement, which uses the common blueprint HTMLElement.

   So HTMLElement is not a property but a template / constructor — like a superclass in class-based OOP.

   It holds all the methods and properties that you use on any HTML element:

   ```js
   console.log(HTMLElement.prototype.innerHTML); // undefined
   console.log("innerHTML" in HTMLElement.prototype); // true
   ```

   That’s how all elements in your page can use .style, .click(), .innerHTML, etc. — they all inherit from HTMLElement.prototype.

   | Term            | What It Is                | Where It Lives                |
   | --------------- | ------------------------- | ----------------------------- |
   | `document`      | DOM object                | Global (`window.document`)    |
   | `element.style` | Property of `HTMLElement` | Comes from `HTMLElement`      |
   | `HTMLElement`   | Constructor function      | Global (`window.HTMLElement`) |
   | `.prototype`    | Inheritance blueprint     | `HTMLElement.prototype`       |

   Yes, exactly — HTMLElement is a property of the global window object in browsers.

3. **HTMLElement is not part of BOM, and here’s why:**
   📁 BOM (Browser Object Model)
   BOM gives you tools to interact with the browser itself.
   Examples: window, navigator, location, history, alert(), setTimeout(), etc.
   These are about browser environment and control, not about the HTML structure of the page.

4. **HTMLElement belongs to the DOM, not BOM**
   The DOM (Document Object Model) represents the structure and content of the webpage.
   HTMLElement is part of the DOM because it’s the base class (interface) for all HTML elements in the page.

5. **So where does HTMLElement come from?**

   Even though it lives on window, that’s just because everything global in JS runs in the browser under window. That doesn’t mean it’s part of BOM. Think of window as a global registry, not a classifier.

   ✅ So this is true:

   `console.log(window.HTMLElement === HTMLElement); // true`
   ❌ But this does not mean HTMLElement is part of BOM.
   It's just a DOM class made globally available by the browser.

6. **Tip to Remember**
   BOM = browser tools
   (what's outside your web page: tabs, screen, URL, history)

   DOM = web page structure
   (what's inside your HTML: elements, tags, content)
