
# Cape May Web Design - Landing Page

This repository contains the source code for the official landing page of Cape May Web Design, a modern, responsive, and performance-optimized single-page application designed to attract and engage potential clients.

The project is built with a focus on exceptional user experience, advanced SEO, and a clean, maintainable codebase.

---

## ✨ Key Features

- **Fully Responsive Design:** A mobile-first approach ensures a seamless experience across all devices, from desktops to smartphones.
- **Smooth Scrolling & Animations:** Subtle, performance-conscious animations and custom smooth-scrolling hooks provide a polished, professional feel.
- **Advanced SEO Implementation:** Comprehensive SEO strategy including dynamic meta tags, JSON-LD structured data for rich snippets, and Open Graph/Twitter Card integration for optimal social sharing.
- **Interactive Contact Form:** A client-side validated contact form with clear user feedback for idle, submitting, success, and error states.
- **Component-Based Architecture:** Built with React, the UI is organized into reusable, self-contained components for easy maintenance and scalability.
- **Custom Hooks:** Reusable logic is abstracted into custom hooks (`useIntersectionObserver`, `useSeo`, `useSmoothScroll`) to keep components clean and DRY.
- **Accessibility (A11y):** ARIA attributes and semantic HTML are used to ensure the site is accessible to all users.

---

## 💻 Tech Stack

- **[React](https://reactjs.org/):** A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/):** A typed superset of JavaScript that compiles to plain JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/):** A utility-first CSS framework for rapid UI development, used via a CDN script in this project.
- **No Build Tools:** This project is configured to run directly in the browser using ES Modules and an `importmap`, requiring no complex build setup for development.

---

## 🚀 Getting Started

This project is set up to be run with a simple static server.

### Prerequisites

You will need a local web server to handle module resolution correctly. The popular `live-server` extension in VS Code or any other static file server will work.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/cape-may-web-design.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd cape-may-web-design
    ```

3.  **Start a local server:**
    If you have `live-server` installed via npm (`npm install -g live-server`), you can simply run:
    ```bash
    live-server
    ```
    Alternatively, open the project folder in VS Code and use the "Go Live" button from the Live Server extension.

4.  **Open in your browser:**
    The server will automatically open a new tab in your default browser at `http://127.0.0.1:5500` (or a similar address).

---

## 📂 Project Structure

```
/
├── components/         # Reusable React components (Header, Hero, Services, etc.)
├── hooks/              # Custom React hooks for shared logic
├── App.tsx             # Main application component with routing logic
├── index.html          # The single HTML entry point for the application
├── index.tsx           # The root of the React application
├── README.md           # You are here!
```

---

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## Search-friendly static pages

`npm run build` builds the client assets, then prerenders the existing React components for every sitemap route into HTML. Vercel serves those files with clean URLs; unknown paths receive the custom `404.html` and a 404 status rather than the homepage. Do not restore a catch-all homepage rewrite.

Page metadata comes from the same `useSeo` calls used by the browser. The build-time collector is scoped to each render. React hydrates the generated content, and no-JavaScript visitors can read content otherwise concealed by reveal animations.

After changing routes or page metadata, run:

```sh
npm run build
npm run test:seo
npm run lint
```

Add new public routes to `scripts/render.tsx` and the sitemap generator in `vite.config.ts`. The SEO checks verify that every sitemap URL has rendered content and its own canonical. The browser preview should also be checked for hydration errors after changes to render-time component state.
