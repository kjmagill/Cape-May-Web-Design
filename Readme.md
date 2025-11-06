# Cape May Web Design - Company Landing Page

This repository contains the source code for the official company landing page for Cape May Web Design. The website is a modern, responsive, and performance-optimized single-page application built with React and TypeScript, designed to showcase the company's services, portfolio, and expertise in web development for local businesses.

**Live Demo:** [**www.capemaywebdesign.com**](https://www.capemaywebdesign.com/)

---

## Key Features

-   **Fully Responsive Design:** Optimized for a seamless experience on all devices, from mobile phones to widescreen desktops.
-   **Dynamic & Interactive Sections:** Smooth-scrolling sections for Services, Portfolio, Testimonials, and more, with subtle animations triggered on view.
-   **Client-Side Validated Contact Form:** An interactive contact form that provides real-time feedback and submits data to a Google Apps Script backend.
-   **Advanced SEO & Structured Data:** Comprehensive on-page SEO, including dynamic meta tags and detailed JSON-LD structured data (Schema.org) for optimal search engine visibility.
-   **Performance-Focused Architecture:** Built for speed with lazy-loaded images, efficient component rendering, and minimal dependencies.
-   **Blog Integration:** Features a curated collection of articles on a dedicated blog listing page.
-   **Accessible UI:** Developed with accessibility best practices, including semantic HTML, ARIA attributes, and keyboard navigation support.

---

## Technology Stack

-   **Framework/Library:** React.js, TypeScript
-   **Styling:** Tailwind CSS
-   **Backend (Contact Form):** Google Apps Script
-   **Module System:** Native ES Modules with Import Maps (No build step required for development)

---

## Development Setup

This project is configured to run directly in the browser using modern web standards, eliminating the need for a complex build process during development.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Cape-May-Web-Design/landing-page.git
    cd landing-page
    ```

2.  **Serve the project directory:**
    You can use any local web server. A simple option is the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension for VS Code.

    Alternatively, you can use Python's built-in HTTP server:
    ```bash
    # For Python 3
    python -m http.server
    ```

3.  **View in browser:**
    Open your web browser and navigate to the local server address (e.g., `http://localhost:8000` or the address provided by Live Server).

---

## Project Structure

The codebase is organized into logical directories for maintainability and scalability.

```
/
├── components/         # Reusable React components for each section
│   ├── Header.tsx
│   ├── Hero.tsx
│   └── ...
├── hooks/              # Custom React hooks for shared logic
│   ├── useIntersectionObserver.tsx
│   ├── useSeo.tsx
│   └── ...
├── index.html          # Main HTML entry point with meta tags and structured data
├── index.tsx           # Root React component and initialization logic
├── App.tsx             # Main application component with routing
└── Readme.md           # This file
```

---

## SEO & Performance

This project places a strong emphasis on search engine optimization and user experience.

-   **Structured Data:** Comprehensive JSON-LD schemas are embedded in `index.html` for Local Business, Professional Service, WebSite, and more to provide rich context to search engines.
-   **Meta Tags:** The `useSeo` hook dynamically generates and updates title, description, canonical, and Open Graph meta tags for each page, ensuring optimal social sharing and search indexing.
-   **Image Optimization:** All portfolio and blog images are lazy-loaded to improve initial page load speed.
-   **Accessibility:** Semantic HTML, ARIA roles, and proper focus management are implemented to ensure the site is usable by as many people as possible.

---

## License

This project is licensed under the MIT License.
