# SimpleTodoApp

**SimpleTodoApp** is a lightweight, vanilla‑JavaScript todo list that runs entirely in the browser. It demonstrates clean, modular code, accessibility best‑practices, and persistent storage using `localStorage`.

---

## Demo

> **[Insert demo GIF or screenshot here]**

---

## Tech Stack

- **HTML5** – Semantic markup and ARIA attributes for accessibility.
- **CSS3** – Custom properties, Flexbox/Grid, and responsive design.
- **JavaScript (ES6+)** – Vanilla JS wrapped in an IIFE for module‑like encapsulation.

---

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SimpleTodoApp.git
   cd SimpleTodoApp
   ```
2. **Open the app** – No build step or server is required. Simply open `index.html` in a modern browser.
   ```bash
   open index.html   # macOS
   # or double‑click the file in Explorer/Finder
   ```

---

## Usage

- **Add a task** – Type a description into the input field and press **Enter** or click the **Add** button.
- **Mark as completed** – Click the checkbox next to a task. Completed tasks receive a visual “line‑through” style.
- **Delete a task** – Click the ✕ button on the right side of a task.
- **Persistence** – All tasks are saved to `localStorage`. Closing or refreshing the page retains your list.

---

## File Structure

| File | Description |
|------|-------------|
| `index.html` | The main HTML page. Contains the markup for the header, input area, and the task list. Loads `styles.css` and `app.js`. |
| `styles.css` | All styling for the app – CSS variables, layout, responsive rules, and state classes (`.completed`, `.hidden`). |
| `app.js` | Core JavaScript wrapped in an IIFE. Handles DOM interactions, CRUD operations, and `localStorage` persistence. Exposes a tiny public API via `window.todoApp` for potential extensions. |
| `README.md` | This documentation – provides an overview, setup instructions, usage guide, and design rationale. |

---

## Design Decisions

1. **Vanilla JavaScript** – The project purpose is to showcase a minimal todo app without the overhead of frameworks. Using plain JS keeps the bundle size at 0 KB and highlights core DOM APIs.
2. **Modular IIFE** – The entire script is wrapped in an Immediately‑Invoked Function Expression. This creates a private scope, prevents global namespace pollution, and still offers a tiny public API (`window.todoApp`) for testing or future modules.
3. **Accessibility** –
   - Semantic HTML (`<header>`, `<section>`, `<ul>`). 
   - ARIA attributes (`aria-label`, `aria-live="polite"`) to announce dynamic changes to screen readers. 
   - Keyboard support: **Enter** adds a task; focus styles are clearly visible.
4. **Responsive Design** – Flexbox and CSS variables allow the layout to adapt gracefully from desktop to mobile widths.
5. **Persistence via `localStorage`** – Simple key/value storage is sufficient for a client‑only app and avoids a backend.

---

## Future Enhancements

- **Edit tasks** – Inline editing or a modal to change the task text.
- **Drag‑and‑drop ordering** – Reorder tasks with the HTML5 Drag‑and‑Drop API or a lightweight library.
- **Theming** – Light/dark mode toggle using CSS custom properties.
- **Filters** – Show *All*, *Active*, or *Completed* tasks.
- **Unit tests** – Add Jest or Mocha tests for the core functions.

---

## License

MIT © 2025 SimpleTodoApp contributors. See the `LICENSE` file for details.
