# Mouse Events

Mouse events are triggered by actions involving the mouse, such as clicks, movements, or hovering.

## Common Mouse Events

- `click`
- `dblclick`
- `mousedown`
- `mouseup`
- `mousemove`
- `mouseenter`
- `mouseleave`
- `mouseover`
- `mouseout`

## Properties (Common to All Mouse Events)

- **target**: The element that triggered the event.
- **clientX, clientY**: The horizontal and vertical coordinates of the mouse pointer relative to the viewport.
- **offsetX, offsetY**: The horizontal and vertical coordinates of the mouse pointer relative to the target element.
- **screenX, screenY**: The horizontal and vertical coordinates of the mouse pointer relative to the screen.
- **button**: The mouse button that was pressed (e.g., `0` for left button, `1` for middle, `2` for right).
- **buttons**: A bitmask that indicates which mouse buttons are currently pressed.
- **movementX, movementY**: The difference in the mouse pointer's position between the current and previous event.

## Methods (Common to All Mouse Events)

- **preventDefault()**: Prevents the default behavior of the event (e.g., preventing text selection on a `mousedown` event).
- **stopPropagation()**: Prevents the event from bubbling up the DOM.
- **stopImmediatePropagation()**: Prevents the event from bubbling and stops other listeners on the same event from being triggered.
