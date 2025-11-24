# Browser Layout and Rendering

Understanding reflow, repaint, and composite - how browsers update the page efficiently.

---

## Core Concept

When you change CSS or DOM, the browser doesn't immediately update the screen. It goes through three stages:

1. **Layout (Reflow)** - Calculate positions and sizes
2. **Paint** - Fill in pixels
3. **Composite** - Combine layers

**Goal:** Minimize expensive operations (layout) and maximize cheap ones (composite).

---

## The Three Stages

### 1. Layout (Reflow)

**What it does:**
- Calculates **geometric properties** of elements
- Determines where each element should be positioned
- Calculates width, height, x, y coordinates

**When it happens:**
- Browser needs to calculate positions
- After DOM changes that affect layout
- After CSS changes that affect layout

**Cost:** ⚠️ **Expensive** (CPU-intensive)

**Example:**

```javascript
// Triggers layout
element.style.width = '200px';
element.style.height = '100px';
```

---

### 2. Paint

**What it does:**
- Fills in **pixels** for visual appearance
- Draws colors, backgrounds, borders, text
- Creates paint records (list of drawing operations)

**When it happens:**
- After layout (if layout changed)
- After visual-only changes (colors, backgrounds)

**Cost:** ⚠️ **Moderate** (less expensive than layout)

**Example:**

```javascript
// Triggers paint (but not layout)
element.style.color = 'red';
element.style.backgroundColor = 'blue';
```

---

### 3. Composite

**What it does:**
- Combines painted layers into **final image**
- Uses **GPU** for hardware acceleration
- Sends pixels to screen

**When it happens:**
- After paint
- For elements with `transform` or `opacity` (composite layers)

**Cost:** ✅ **Cheap** (GPU-accelerated)

**Example:**

```javascript
// Only triggers composite (cheap!)
element.style.transform = 'translateX(100px)';
element.style.opacity = '0.5';
```

---

## What Triggers Each Stage?

### Layout Triggers

**Reading layout properties:**
```javascript
// ❌ Triggers layout (forces browser to calculate)
const width = element.offsetWidth;
const height = element.offsetHeight;
const rect = element.getBoundingClientRect();
```

**Changing layout properties:**
```javascript
// ❌ Triggers layout
element.style.width = '200px';
element.style.height = '100px';
element.style.padding = '10px';
element.style.margin = '20px';
element.style.display = 'block';
element.style.position = 'absolute';
```

**DOM changes:**
```javascript
// ❌ Triggers layout
element.appendChild(newElement);
element.removeChild(oldElement);
document.body.innerHTML = '<div>New</div>';
```

**Window resize:**
```javascript
// ❌ Triggers layout
window.addEventListener('resize', () => {
  // Layout recalculated for all elements
});
```

---

### Paint Triggers

**Visual-only changes (no layout):**
```javascript
// ✅ Only triggers paint
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.border = '1px solid black';
element.style.outline = '2px solid green';
element.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
```

**Note:** Paint happens **after** layout if layout changed.

---

### Composite Triggers

**GPU-accelerated properties:**
```javascript
// ✅ Only triggers composite (cheap!)
element.style.transform = 'translateX(100px)';
element.style.transform = 'scale(1.5)';
element.style.transform = 'rotate(45deg)';
element.style.opacity = '0.5';
element.style.filter = 'blur(5px)';
```

**Note:** These properties create **composite layers** that are cached and reused.

---

## Layout Thrashing

### What is Layout Thrashing?

**Layout thrashing** happens when you repeatedly read and write layout properties, forcing browser to recalculate layout multiple times.

**Example (Bad):**

```javascript
// ❌ Layout thrashing!
for (let i = 0; i < 100; i++) {
  element.style.width = i + 'px';  // Write (triggers layout)
  const width = element.offsetWidth; // Read (triggers layout)
}
// Result: 200 layout calculations!
```

**Example (Good):**

```javascript
// ✅ Batch reads and writes
const width = element.offsetWidth; // Read once
for (let i = 0; i < 100; i++) {
  element.style.width = (width + i) + 'px'; // Write only
}
// Result: 1 layout calculation!
```

---

## Optimizing Layout and Rendering

### 1. Batch DOM Reads and Writes

**Bad:**
```javascript
// ❌ Multiple layouts
element1.style.width = '100px';
const width1 = element1.offsetWidth; // Layout 1
element2.style.height = '200px';
const width2 = element2.offsetWidth; // Layout 2
```

**Good:**
```javascript
// ✅ Single layout
// Read all first
const width1 = element1.offsetWidth;
const width2 = element2.offsetWidth;
// Write all
element1.style.width = '100px';
element2.style.height = '200px';
```

---

### 2. Use `requestAnimationFrame`

**Bad:**
```javascript
// ❌ May cause jank
setTimeout(() => {
  element.style.transform = 'translateX(100px)';
}, 100);
```

**Good:**
```javascript
// ✅ Smooth animation
requestAnimationFrame(() => {
  element.style.transform = 'translateX(100px)';
});
```

**Why:** `requestAnimationFrame` runs before next paint, ensuring smooth animations.

---

### 3. Use Transform and Opacity for Animations

**Bad:**
```javascript
// ❌ Triggers layout + paint
element.style.left = x + 'px';
element.style.top = y + 'px';
```

**Good:**
```javascript
// ✅ Only triggers composite (GPU-accelerated)
element.style.transform = `translate(${x}px, ${y}px)`;
```

**Why:** `transform` and `opacity` create composite layers, avoiding layout and paint.

---

### 4. Use CSS Containment

**CSS Containment** tells browser that element's layout/style is isolated.

```css
.container {
  contain: layout style paint;
}
```

**Benefits:**
- Limits layout calculations to container
- Prevents layout changes from affecting outside elements
- Improves performance

---

### 5. Use `will-change` Property

**`will-change`** hints to browser that element will change.

```css
.animated {
  will-change: transform;
}
```

**Benefits:**
- Browser creates composite layer in advance
- Smoother animations

**Warning:** Don't overuse - creates memory overhead.

---

## Performance Comparison

### Expensive Operations

| Operation | Cost | Triggers |
|-----------|------|----------|
| `offsetWidth` | ⚠️ High | Layout |
| `getBoundingClientRect()` | ⚠️ High | Layout |
| `style.width = '100px'` | ⚠️ High | Layout |
| `style.color = 'red'` | ⚠️ Medium | Paint |
| `style.transform = 'translateX(100px)'` | ✅ Low | Composite |

---

## Common Patterns

### Pattern 1: Reading Layout Properties

**Bad:**
```javascript
// ❌ Forces layout calculation
const width = element.offsetWidth;
element.style.width = width + 10 + 'px';
```

**Good:**
```javascript
// ✅ Use CSS variables or classes
element.classList.add('wider');
```

---

### Pattern 2: Animations

**Bad:**
```javascript
// ❌ Triggers layout + paint
function animate() {
  element.style.left = x + 'px';
  element.style.top = y + 'px';
  requestAnimationFrame(animate);
}
```

**Good:**
```javascript
// ✅ Only triggers composite
function animate() {
  element.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(animate);
}
```

---

### Pattern 3: Measuring Elements

**Bad:**
```javascript
// ❌ Multiple layouts
const width1 = element1.offsetWidth;
const width2 = element2.offsetWidth;
const width3 = element3.offsetWidth;
```

**Good:**
```javascript
// ✅ Single layout (batch reads)
const widths = [
  element1.offsetWidth,
  element2.offsetWidth,
  element3.offsetWidth
];
```

---

## Browser DevTools

### Performance Tab

**How to use:**
1. Open DevTools → Performance tab
2. Click Record
3. Interact with page
4. Stop recording
5. Analyze timeline

**What to look for:**
- **Purple bars** = Layout (reflow)
- **Green bars** = Paint
- **Yellow bars** = Composite

**Goal:** Minimize purple bars (layout).

---

### Rendering Tab

**Features:**
- **Paint flashing:** Highlights repainted areas
- **Layout shift regions:** Shows layout shifts
- **Layer borders:** Shows composite layers

---

## Common Questions

### Q: What's the difference between reflow and repaint?

**A:**
- **Reflow (Layout):** Calculates positions and sizes (expensive)
- **Repaint (Paint):** Fills in pixels (less expensive)

### Q: Why is layout expensive?

**A:** Layout recalculates positions of all affected elements. If one element changes, browser may need to recalculate many others (cascade effect).

### Q: What properties trigger composite?

**A:** `transform`, `opacity`, `filter`, `will-change`. These create composite layers.

### Q: Should I always use `transform` instead of `left`/`top`?

**A:** Yes, for animations. `transform` is GPU-accelerated and doesn't trigger layout.

### Q: What is layout thrashing?

**A:** Repeatedly reading and writing layout properties, forcing multiple layout calculations.

---

## Related Topics

- [Browser Rendering Pipeline](./15.%20Browser%20Rendering%20Pipeline.md) - Complete rendering pipeline
- [Resource Loading Behavior](./6.%20Resource%20Loading%20Behavior.md) - How resources affect rendering
- [Browser Caching Mechanisms](./16.%20Browser%20Caching%20Mechanisms.md) - How caching affects performance
- [Performance Optimization](../../3.%20Performance%20Optimization/index.md) - Performance optimization techniques

---

## Summary

**The Three Stages:**
1. **Layout (Reflow)** - Calculate positions (expensive)
2. **Paint** - Fill pixels (moderate)
3. **Composite** - Combine layers (cheap)

**Optimization Rules:**
- ✅ Batch DOM reads and writes
- ✅ Use `transform` and `opacity` for animations
- ✅ Use `requestAnimationFrame` for smooth animations
- ✅ Avoid reading layout properties in loops
- ✅ Use CSS containment for isolated components

**Key Takeaways:**
- Layout is expensive - minimize it
- Composite is cheap - use GPU-accelerated properties
- Batch operations to avoid layout thrashing
- Use DevTools to identify performance bottlenecks

