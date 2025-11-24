# BOM (Browser Object Model) / window object

- The BOM provides tools to interact with the browser, such as navigation, history, and screen properties.
- BOM is browser-specific and includes APIs tied to the browser environment.
- The BOM is essentially a subset of the Web APIs that deal specifically with browser-related functionality.
- It provides foundational tools for working with the browser window, navigation, and environment, while Web APIs extend far beyond that.
- It refers specifically to the browser's programming interface for interacting with the browser window and its features (e.g., `window`, `navigator`, `location`, `history`, `screen`).

- The BOM includes APIs that allow JavaScript to:
  - Navigate between pages.
  - Interact with the browser (`alerts`, `dialogs`, `timers`, etc.).
  - Access browser and user environment details (like user agent and screen size).

## **Global Objects in BOM**

**`window`** - The global object representing the browser window

## **window Properties**

- **`window.document`** – The document object that represents the page's DOM.
- **`window.location`** – Provides information about the URL of the current page.
- **`window.navigator`** – Provides information about the browser (e.g., user agent, platform).
- **`window.history`** – Allows access to the browser's history (used for navigation).
- **`window.screen`** – Provides information about the user's screen (e.g., screen width, height).
- **`window.localStorage`** – Allows storing data in the browser’s local storage (persistent data).
- **`window.sessionStorage`** – Allows storing data for the session (temporary data).
- **`window.console`** – Provides access to the browser's console (used for logging and debugging).
- **`window.performance`** – Provides performance-related information and methods for monitoring page load times.

## **window Methods**

- **`window.alert()`** – Displays an alert dialog box.
- **`window.confirm()`** – Displays a dialog box with OK and Cancel options (returns true/false).
- **`window.prompt()`** – Displays a dialog box that allows the user to input a value.
- **`window.open()`** – Opens a new browser window or tab.
- **`window.close()`** – Closes the current browser window (if opened via `window.open()`).
- **`window.setTimeout()`** – Executes a function after a specified delay.
- **`window.setInterval()`** – Repeatedly executes a function at specified intervals.
- **`window.clearTimeout()`** – Cancels a previously set `setTimeout()`.
- **`window.clearInterval()`** – Cancels a previously set `setInterval()`.

---

## **navigator Properties**

- **`navigator.userAgent`** – A string representing the browser’s user agent.
- **`navigator.platform`** – The platform on which the browser is running (e.g., Windows, macOS).
- **`navigator.language`** – The language of the browser (e.g., `en-US`).
- **`navigator.cookieEnabled`** – Boolean indicating whether cookies are enabled in the browser.

## **navigator Methods**

- **`navigator.geolocation.getCurrentPosition()`** – Gets the current geographic location of the device (if granted by the user).
- **`navigator.geolocation.watchPosition()`** – Watches for changes to the geographic location.
- **`navigator.vibrate()`** – Triggers a vibration pattern on devices with vibration support.

## **location properties**

- **`location.href`** – The full URL of the current page.
- **`location.protocol`** – The protocol of the current URL (e.g., `http:`, `https:`).
- **`location.hostname`** – The domain name (without protocol) of the current URL.
- **`location.pathname`** – The path (after the domain) of the current URL.
- **`location.search`** – The query string part of the current URL (after `?`).
- **`location.hash`** – The fragment identifier (anchor) in the URL (after `#`).
- **`location.port`** – The port number used in the current URL.

## **location methods**

- **`location.assign()`** – Loads a new document (URL).
- **`location.reload()`** – Reloads the current page.
- **`location.replace()`** – Replaces the current URL with a new one (without adding to the history).

---

## **history Properties**

- **`history.length`** – The number of entries in the browser's history.

## **history Methods**

- **`history.back()`** – Navigates to the previous page in the history.
- **`history.forward()`** – Navigates to the next page in the history.
- **`history.go()`** – Allows moving to a specific page in the history (using an index).

## **screen Properties**

- **`screen.width`** – The width of the user's screen.
- **`screen.height`** – The height of the user's screen.
- **`screen.availWidth`** – The width of the screen excluding the operating system's taskbar.
- **`screen.availHeight`** – The height of the screen excluding the operating system's taskbar.

## **console Methods**

- **`console.log()`** – Logs general output (used for debugging).
- **`console.error()`** – Logs error messages.
- **`console.warn()`** – Logs warning messages.
- **`console.info()`** – Logs informational messages.
- **`console.debug()`** – Logs debugging messages.
- **`console.table()`** – Displays tabular data in a table format.
- **`console.time()`** – Starts a timer.
- **`console.timeEnd()`** – Stops the timer and logs the elapsed time.
- **`console.group()`** – Starts a new group for logging.
- **`console.groupEnd()`** – Ends the current group.

---

## **performance methods**

- **`performance.now()`** – Returns the current time (in milliseconds) with a high-precision timestamp.

## **performance properties**

- **`performance.timing`** – Provides the timing-related information about the page’s load.

## **localStorage Methods**

- **`localStorage.setItem()`** – Stores data with a key-value pair.
- **`localStorage.getItem()`** – Retrieves the value stored with a key.
- **`localStorage.removeItem()`** – Removes data stored with a specific key.
- **`localStorage.clear()`** – Clears all data stored in `localStorage`.

## **sessionStorage Methods**

- **`sessionStorage.setItem()`** – Stores data with a key-value pair.
- **`sessionStorage.getItem()`** – Retrieves the value stored with a key.
- **`sessionStorage.removeItem()`** – Removes data stored with a specific key.
- **`sessionStorage.clear()`** – Clears all data stored in `sessionStorage`.

---

## **`geolocation`** (via `navigator.geolocation`) - Provides methods for obtaining geographical location.

## **geolocation Methods**

- **`getCurrentPosition()`** – Retrieves the current geographic location of the device.
- **`watchPosition()`** – Watches for changes in the device’s geographic location.
- **`clearWatch()`** – Clears the watch position set by `watchPosition()`.

---

## **`alert()`** (via `window`) - Provides an alert dialog box

- **`alert(message)`** – Displays an alert dialog box with the provided message.

---

---

## Related Topics

- [Storage APIs](../5.%20Storage%20APIs/index.md) - Detailed guide to localStorage, sessionStorage, cookies, and IndexedDB
- [Browser Storage Mechanisms](../../../../../../19.%20Browser%20Internals/18.%20Browser%20Storage%20Mechanisms.md) - How browsers store data internally

---

## **Summary**

The **BOM** consists of objects like `window`, `navigator`, `location`, `console`, and others, that allow interaction with the browser and environment surrounding the web page,not directly with the page content (that's what the DOM is for). BOM provides methods for navigation, storage, geolocation, logging, and more.

**Note:** For detailed information about `localStorage` and `sessionStorage`, see the [Storage APIs](../5.%20Storage%20APIs/index.md) section.
