# Drag and Drop Events

Drag and drop events are triggered when a user drags an element and drops it onto another element in the document.

## Common Drag and Drop Events

- `dragstart`
- `drag`
- `dragend`
- `dragenter`
- `dragover`
- `dragleave`
- `drop`
- `dragenter`
- `dragover`

## Properties (Common to All Drag and Drop Events)

- **target**: The element that triggered the event.
- **dataTransfer**: An object that holds the data being dragged. It contains methods for setting and getting data (e.g., `setData()`, `getData()`).
- **clientX, clientY**: The coordinates of the mouse pointer relative to the viewport during the event.
- **screenX, screenY**: The coordinates of the mouse pointer relative to the screen.
- **offsetX, offsetY**: The coordinates of the mouse pointer relative to the target element.

## Methods (Common to All Drag and Drop Events)

- **preventDefault()**: Prevents the default action associated with the event (e.g., allowing a drop by preventing default browser behavior like opening a file).
- **stopPropagation()**: Prevents the event from propagating (bubbling) up the DOM.
- **stopImmediatePropagation()**: Prevents the event from propagating and stops other listeners on the same event from being triggered.

## Drag and Drop-Specific Methods

- **setData(format, data)**: Sets the data in the `dataTransfer` object. The `format` specifies the type of data (e.g., `'text/plain'`), and `data` is the value being dragged.
- **getData(format)**: Gets the data stored in the `dataTransfer` object.
- **clearData()**: Clears the data stored in the `dataTransfer` object.
- **dropEffect**: Specifies the visual feedback for a drop operation (e.g., `copy`, `move`, or `link`).

## Example

- `dragstart` is fired when the user starts dragging an element.
- `dragover` is fired continuously while an element is being dragged over a valid drop target.
- `drop` is fired when the element is dropped onto the target.
