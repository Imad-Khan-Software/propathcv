# ProPathCV 🚀
> A sleek, responsive, and secure client-side CV/Resume builder built with pure Vanilla JavaScript and CSS3.

ProPathCV allows users to create, customize, and export professional, ATS-friendly resumes instantly. Featuring isolated template sandboxing and secure local data persistence, users can seamlessly toggle styles and download high-quality PDFs without their data leaving their browser.

Live Demo: [View Live Project](https://ecattest.netlify.app) 

---

## ✨ Features
* **Secure Authentication:** High-performance registration and login system backed by local environment caching (`localStorage`).
* **Multi-Step Guided Form:** Intuitive workspace flow broken into structural sections (Personal Info, Experience, Education, Skills) with conditional validation metrics.
* **Iframe Sandboxing Engine:** Encapsulated template rendering using sandboxed `<iframe>` windows with isolated document styling contexts to prevent global CSS collisions.
* **Dynamic UI Elements:** Real-time generation of repeating input sequences for fluid tracking of career history and academic profiles.
* **Premium Template Library:** Multiple distinct, fully responsive layouts ranging from *Modern Blue* to *Minimal Clean* and *Executive Dark*.
* **One-Click PDF Vector Export:** Flawless client-side structural print compiles driven by `html2pdf.js`, extracting complete nested layout style rules natively.

---

## 🛠️ Built With
* **Frontend Structure:** HTML5
* **Design & Layout:** CSS3 Custom Variables (Custom Themes, Glassmorphism, Responsive Grid System)
* **Core Engine Logic:** Vanilla JavaScript (ES6 Modules/Architecture)
* **Third-Party Engines:** `html2pdf.js` (PDF compiling), `FontAwesome` (Vector Icon Packs), `Google Fonts` (Syne & DM Sans)

---

## 📂 Project Architecture
```text
propathcv/
│
├── css/
│   ├── style.css         # Core global styles, layout mechanics, resets & landing page
│   ├── auth.css          # Login/Register split-screen UI rules
│   ├── form.css          # Multi-step creation panel & workspace guides
│   ├── templates.css     # Grid layout selector system card arrays
│   └── preview.css       # Isolated individual theme rendering blocks
│
├── js/
│   ├── app.js            # Base system router & view state controller
│   ├── auth.js           # Account creation handlers & login sequence models
│   ├── form.js           # Dynamic layout generators & input parser metrics
│   └── templates.js      # Sandbox engine core & pdf document download rules
│
├── index.html            # Main SPA container window
└── README.md             # Repository documentation
