```md
# 📘 WCAG (Web Content Accessibility Guidelines) – Interview Q&A

---

## 🔍 Conceptual Understanding

### 1. What is WCAG and why is it important?

WCAG is a set of international standards by W3C to ensure that web content is accessible to users with disabilities. It promotes inclusivity and enhances usability, SEO, and compliance with legal requirements.

---

### 2. What are the four core principles of WCAG?

**P.O.U.R.**

- **Perceivable** – Information must be presented in ways users can perceive.
- **Operable** – UI components must be operable via multiple means (e.g., keyboard).
- **Understandable** – Content and interface must be easy to understand.
- **Robust** – Content must be interpretable by a wide range of user agents (including assistive tech).

---

### 3. What are the levels of WCAG conformance?

- **Level A** – Minimum accessibility (e.g., alt text).
- **Level AA** – Industry standard, required by most laws (e.g., color contrast, keyboard navigation).
- **Level AAA** – Maximum accessibility (e.g., sign language for video).

---

### 4. What are common accessibility challenges?

- Missing alternative text
- Poor color contrast
- Inaccessible custom components
- Improper focus management
- Lack of keyboard support
- No semantic HTML

---

## 👨‍💻 Practical Implementation

### 5. How do you make a component screen-reader accessible?

- Use semantic HTML elements (`<button>`, `<nav>`, etc.)
- Associate labels with inputs via `for` + `id`
- Use `aria-*` attributes only when necessary
- Use `aria-label`, `aria-labelledby`, `aria-describedby` appropriately

---

### 6. How do you make a modal accessible?

- Use `role="dialog"` and `aria-modal="true"`
- Trap focus inside the modal
- Return focus to trigger on close
- Use `aria-labelledby` and `aria-describedby` for title and description

---

### 7. How do you ensure form accessibility?

- Use `<label>` elements with `for`
- Add `aria-describedby` for instructions/errors
- Ensure focus order is logical
- Use semantic grouping (`<fieldset>` and `<legend>`)

---

### 8. What are ARIA roles, and when do you use them?

ARIA roles and properties make dynamic components accessible to assistive tech. Use them **only when semantic HTML cannot achieve the goal**.

Examples:

- `role="button"` for a div acting as a button
- `aria-live="polite"` for updates
- `aria-expanded`, `aria-controls` for dropdowns

---

### 9. How do you make a custom dropdown accessible?

- Use `role="combobox"` and appropriate `aria-*` attributes
- Manage `aria-expanded`, `aria-controls`, and focus
- Enable keyboard interaction (Arrow keys, ESC, Enter)
- Use `aria-activedescendant` for list navigation

---

### 10. What tools do you use to test accessibility?

- **axe DevTools**
- **Lighthouse (Chrome DevTools)**
- **WAVE (WebAIM)**
- **NVDA, JAWS, or VoiceOver**
- Manual keyboard-only navigation

---

## ⚠️ Common Mistakes

### 11. What are common accessibility mistakes?

- Missing alt text
- Incorrect heading hierarchy
- Improper use of ARIA
- Lack of keyboard support
- No visible focus indicators

---

### 12. How do you ensure keyboard accessibility?

- Use native focusable elements
- Ensure all functionality is reachable via keyboard
- Use `tabindex` where needed
- Maintain logical tab order

---

### 13. What if a button is implemented using a `<div>`?

- Add `role="button"` and `tabindex="0"`
- Add key event listeners for `Enter` and `Space`
- Prefer using a native `<button>` whenever possible
- Include `aria-label` if needed for screen readers

---

## 📈 SEO & Accessibility

### 14. How does accessibility impact SEO?

- Semantic HTML improves crawlability
- Alt text helps with image indexing
- Proper headings improve page structure
- Accessible SPAs load more reliably for search engines

---

### 15. What are some tradeoffs between performance and accessibility?

- Lazy loading may delay screen reader content
- Prefer `prefers-reduced-motion` for animations
- Ensure performance enhancements don’t break keyboard or screen reader support

---

## 🧪 Testing & Debugging

### 16. How do you check WCAG 2.1 AA compliance?

- Automated tools: Axe, Lighthouse, WAVE
- Manual keyboard & screen reader testing
- Color contrast testing
- ARIA validation

---

### 17. Which screen readers have you used?

- **NVDA** (Windows)
- **VoiceOver** (macOS, iOS)
- Familiar with **JAWS** for enterprise testing

---

### 18. What does the Lighthouse accessibility score check?

- Alt text
- Color contrast
- Semantic HTML
- ARIA usage
- Keyboard accessibility

Note: Doesn’t guarantee full WCAG compliance

---

### 19. How do you integrate accessibility testing into your workflow?

- Axe in DevTools
- Lighthouse in CI
- Include accessibility checks in PR review
- Use `@testing-library/jest-dom` for unit tests
- Screen reader tests before release

---

## 💡 Scenario-Based

### 20. What’s the impact of missing alt text on an image?

- Screen readers skip it → information loss
- Fix: Add meaningful `alt`, or use `alt=""` if decorative

---

### 21. What if your design fails color contrast?

- Use contrast checker (e.g. WebAIM)
- Suggest accessible alternatives to design team
- Adjust using Tailwind or CSS variables

---

### 22. What if a custom component is not keyboard accessible?

- Add `tabindex`, key event handlers
- Use semantic roles (`role="button"`, etc.)
- Reconsider using native HTML elements

---

## 🌟 Senior-Level/Mentorship

### 23. How do you guide juniors on accessibility?

- Emphasize semantic HTML
- Share WCAG cheat sheets
- Review their PRs for a11y issues
- Pair programming and show testing tools

---

### 24. Have you ever advocated for accessibility at work?

Yes.  
Example:

> I introduced Axe DevTools in the CI pipeline and led a form accessibility workshop. It led to higher Lighthouse scores and better feedback from screen reader users.

---
```
