# Mouse Wheel/TouchPad Events

Mouse wheel and touchpad events are triggered by actions such as scrolling with a mouse wheel or touchpad gesture.

## Common Mouse Wheel/TouchPad Events

- `wheel`
- `mousewheel` (deprecated, use `wheel` instead)
- `DOMMouseScroll` (for older Firefox versions)

## Properties (Common to All Mouse Wheel/TouchPad Events)

- **target**: The element that triggered the event.
- **deltaX**: The horizontal scroll amount (if applicable). Positive values indicate scrolling right, negative values indicate scrolling left.
- **deltaY**: The vertical scroll amount. Positive values indicate scrolling down, negative values indicate scrolling up.
- **deltaZ**: The depth of the scroll (if applicable, mostly for 3D scroll devices).
- **deltaMode**: Indicates the units used for `deltaX`, `deltaY`, and `deltaZ`. Possible values:
  - `0` (pixels)
  - `1` (lines)
  - `2` (pages)
- **wheelDelta**: A deprecated property used in older `mousewheel` events to indicate the scroll amount (positive for scrolling up, negative for scrolling down).
- **wheelDeltaX**: The horizontal scroll distance in older `mousewheel` events.
- **wheelDeltaY**: The vertical scroll distance in older `mousewheel` events.

## Methods (Common to All Mouse Wheel/TouchPad Events)

- **preventDefault()**: Prevents the default scroll action (e.g., preventing page scrolling).
- **stopPropagation()**: Prevents the event from propagating (bubbling) up the DOM.
- **stopImmediatePropagation()**: Prevents the event from propagating and stops other listeners on the same event from being triggered.
