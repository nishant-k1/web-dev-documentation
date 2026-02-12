# Understanding Documents and CSSOM

## 1. What is a "Document"?

A document typically refers to structured content that can be parsed into a tree-like structure. HTML and XML fit this definition because:

- They are hierarchical.
- They define elements and attributes in a way that forms a **DOM (Document Object Model)** when parsed by the browser.

## 2. CSS: Not a "Document" in the Traditional Sense

CSS (Cascading Style Sheets) is not a document like HTML or XML because:

- It’s not inherently hierarchical in the same way.
- It doesn’t represent structured content or have a tree-like nature natively.

## 3. Why CSS Gets Parsed into CSSOM?

While CSS itself isn’t a document, it still needs to be processed and understood by the browser to style HTML elements. For this:

- The browser parses CSS into the **CSSOM (CSS Object Model)**.
- The CSSOM is a structured representation of the styles, making it easier for the browser to apply styles to the DOM during rendering.

## 4. CSS vs. HTML in Parsing

- **HTML**: Parsed into a **DOM** because it is structured content.
- **CSS**: Parsed into a **CSSOM**, which is a processed version of the style rules in CSS, even though CSS itself isn’t traditionally considered a document.

## 5. Key Takeaway

- CSS can loosely be called a "document" because it is parsed into something (the CSSOM), but this is not precise. It’s better to say that CSS **rules** are parsed and transformed into the CSSOM.
- The term "document" is more appropriately applied to HTML and XML.

In essence, CSS plays a supporting role, where it gets processed into a useful model (CSSOM) for the browser to handle styling, but it’s not structured like a document in the traditional sense.
