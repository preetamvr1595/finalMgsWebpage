# MGS Jewellery Admin (scaffold)

This workspace contains a scaffolded Admin Dashboard for MGS Jewellery.

Frontend (client): React + Vite + Tailwind
Backend (server): Node.js + Express + MongoDB + Cloudinary

Quick start

1. Install dependencies for client and server:

```
cd client
npm install
cd ../server
npm install
```

2. Create `.env` in the project root or `server` with credentials (see `.env.example`).

3. Start server:

```
cd server
npm run dev
```

4. Start client:

```
cd client
npm run dev
```

Notes:
- The backend provides protected routes under `/api/*` and an upload endpoint using Cloudinary. Replace Cloudinary env vars to enable uploads.
- This scaffold focuses on a luxury visual style (ivory background, gold accents, serif headings). Expand components and API integration as needed.
# MGS JEWELLERY — Official Website

> **Davanagere's Legacy of Pure Gold · Est. 1999**

A full-stack, client-facing luxury jewelry website for **MGS Jewellery**, Davanagere, Karnataka. Built as a complete digital transformation platform — transitioning a 24-year goldsmith heritage into a modern, sales-accelerating digital presence.

---

## 🌐 Pages

| Page | File | Description |
|---|---|---|
| **Homepage** | `index.html` | Hero, Collections, Festive Offers, Heritage, WhatsApp List Builder, Bespoke Form, Stores |
| **Collections** | *(via index filter)* | Dynamic product grid with category filters |
| **Festival Offers** | `offers.html` | Active offer hero, countdown timer, Old Gold Exchange Calculator |
| **Gold Calculator** | `calculator.html` | Live gold value + EMI calculator with amortization table |


---

## ✨ Features

### Customer-Facing
- **Live Gold Rate Ticker** — 22K, 24K, Silver rates updated every 5 seconds
- **Interactive Product Gallery** — Filterable by category, every card has HUID/BIS hallmark badges
- **WhatsApp CTAs** — Every product links directly to WhatsApp inquiry with pre-filled message
- **VIP Offers List Builder** — Collect customer WhatsApp numbers for offer campaigns
- **Festival Offer System** — Countdown timers, specific offer details (wastage %, making charge discount)
- **Old Gold Exchange Calculator** — Estimate value including festival bonus
- **Gold Value Calculator** — Weight × purity × wastage × making charges + GST
- **EMI Calculator** — With full amortization schedule
- **Bespoke Custom Design Form** — Submits to WhatsApp

### Business Competitive Edge Highlighted
- **7.99% Wastage** — Prominently advertised as "Lowest in Davanagere"
- **100% Making Charge OFF** — On festival offers
- **Extra ₹200/g** — On Old Gold Exchange (festive periods)
- **Maker-Direct Pricing** — Messaging that eliminates big-brand markup narrative

### Admin CMS Dashboard
- KPI Dashboard (Inquiries, Products, Offers, Live Gold Rate)
- Conversion Funnel visualization
- Product Catalog — Add, Edit, Delete with hallmark & weight fields
- Festival Offer Scheduler — Full control over wastage %, making charge discount, diamond %, dates
- Festive Poster Gallery — Upload and manage promotional posters
- WhatsApp Leads Table — Source tracking + one-click WhatsApp reply
- Leads CSV Export
- Gold Rate Management — Update live rates displayed site-wide

---

## 🎨 Design System

- **Aesthetic:** Black/Gold luxury blueprint (`#050505` + `#D4AF37`)
- **Fonts:** Cormorant Garamond (serif headings) + Inter (body) + Rajdhani (monospace labels)
- **Animations:** Scroll-triggered fadeInUp, gold shimmer, pulse indicators
- **Responsive:** Mobile-first, hamburger nav, stacked layouts below 768px

---

## 📁 Project Structure

```
mgs jewelalry/
├── index.html          # Homepage
├── calculator.html     # Gold & EMI Calculator
├── offers.html         # Festival Offers
├── global.css          # Shared design system
├── global.js           # Shared JS (navbar, ticker, animations)
├── index.css           # Homepage-specific styles
├── index.js            # Homepage-specific logic + product DB
├── assets/             # All product & poster images
│   ├── kasumalai.png
│   ├── mangalsutra.png
│   ├── antique_bangles.png
│   ├── diamond_earrings.png
│   ├── temple_bangles.png
│   ├── gold_chain.png
│   ├── ring.png
│   ├── studs.png
│   ├── bangle.png
│   ├── chain.png
│   ├── hero_necklace.png
│   └── diwali_poster.png
└── .gitignore
```

---

## 🚀 Running Locally

```bash
# Using npx serve (no install needed)
npx serve .

# Or open index.html directly in your browser
```

---

## 📞 Business Info

- **Store:** MGS Jewellery, Vijayalakshmi Road, Near Clock Tower, Davanagere — 577 001
- **Established:** 1999
- **Speciality:** Senior Goldsmith & Maker — 22K BIS/HUID Hallmark Certified
- **WhatsApp:** +91 80 2500 0000

---

*© 2024 MGS Jewellery · Davanagere, Karnataka · All Rights Reserved*
