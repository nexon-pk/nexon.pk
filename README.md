# NEXON — Digital Solutions & Talent Network

Official production-ready website for **NEXON**, an emerging digital solutions company and managed talent network.

> **“Ideas. Talent. Delivered.”**  
> *“Your Digital Vision. Our Network. One Powerful Delivery.”*

---

## Overview & Business Model

NEXON operates as a managed digital-services company:

```text
CLIENT → NEXON → VETTED DIGITAL TALENT → QUALITY CONTROL → FINAL DELIVERY
```

1. **Client Request**: Clients bring project requirements and digital vision.
2. **NEXON Hub**: Requirements are analyzed, architecture planned, and milestones established.
3. **Vetted Talent**: Matched with verified specialists from our curated talent network.
4. **Quality Control**: NEXON manages day-to-day execution, communication, code standards, and testing.
5. **Delivery**: Fully reviewed, production-grade deliverable is launched and handed over to the client.

---

## Founding Leadership

* **Muhammad Ali** — Chief Executive Officer (CEO) | *Software Engineering — SE ’29*  
  [LinkedIn Profile](https://www.linkedin.com/in/muhammad-ali-24445b378)
* **Abdul Moiz** — Chief Technology Officer (CTO) | *Software Engineering — SE ’29*  
  [LinkedIn Profile](https://www.linkedin.com/in/abdul-moiz-828014394/)
* **Ahmed Sarwar** — Chief Operating Officer (COO) | *Software Engineering — SE ’29*  
  [LinkedIn Profile](https://www.linkedin.com/in/ahmed-sarwar-40b334326/)

---

## Official Company Links

* **GitHub Organization**: [https://github.com/nexon-pk](https://github.com/nexon-pk)
* **Email**: [nexon.solutions3@gmail.com](mailto:nexon.solutions3@gmail.com)
* **WhatsApp**: [+92 347 9254500](https://wa.me/923479254500)

---

## Project Structure

```text
nexon/
│
├── index.html                  # Semantic, SEO-optimized, accessible landing page
│
├── css/
│   └── style.css               # Modern dark-mode styling & responsive design tokens
│
├── js/
│   ├── main.js                 # Smooth navigation, modals, scroll reveal & filters
│   └── network.js              # Vector HTML5 canvas network visualization
│
├── assets/
│   └── images/
│       ├── logo.png            # Official NEXON Logo
│       ├── muhammad_ali_ceo.jpg# CEO Portrait
│       ├── abdul_moiz_cto.jpg  # CTO Portrait
│       ├── ahmed_sarwar_coo.jpg# COO Portrait
│       ├── why_*.jpg           # Why Choose NEXON visuals
│       ├── v_stage_*.jpg       # 5 Talent Verification visuals
│       ├── service_*.jpg       # 12 Service card visuals
│       └── serve_*.jpg         # 8 Client segment visuals
│
├── .gitignore
└── README.md
```

---

## Deploying to GitHub Pages

This project is built using 100% static, standards-compliant HTML5, CSS3, and JavaScript with **zero build steps** and **zero machine-specific paths**.

### Steps to Deploy:
1. Initialize git in this directory (if not already):
   ```bash
   git init
   git add .
   git commit -m "feat: initial NEXON production website"
   ```
2. Create a repository on GitHub (e.g. `nexon`) and push your code:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/nexon.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Source**, select `Deploy from a branch`.
   - Choose branch `main` and folder `/ (root)`.
   - Click **Save**.
4. Your website will be live in seconds at `https://YOUR_USERNAME.github.io/nexon/`.

---

## Connecting Contact Form to an Email Service (Optional)

To receive form submissions directly in your inbox without backend servers, connect the `<form id="pageContactForm">` in `index.html` to any free static form provider:

* **Formspree**: Add `action="https://formspree.io/f/YOUR_FORM_ID"` and `method="POST"` to the form.
* **Web3Forms**: Add your access key hidden input.
* **EmailJS**: Call `emailjs.sendForm(...)` inside `js/main.js`.
