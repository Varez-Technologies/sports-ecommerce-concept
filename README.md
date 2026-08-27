# Sports E-Commerce Store — Full-Stack Concept 🏆

A modern full-stack sports e-commerce concept application built with **React 19**, **Tailwind CSS v4**, and an **Express + SQLite** backend API.

Developed by **Varez Technologies**.

---

## 📖 About the Project

**Sports E-Commerce Store** is a full-featured online sporting goods concept platform offering athletic gear and sports apparel across **six major brands** (CA Sports, Adidas, Spalding, Nike, Reebok, Puma) featuring **54 products** in total.

The application features a responsive React single-page frontend powered by a Node.js Express backend API, with automatic local data fallbacks for seamless static hosting deployments.

---

## ✨ Key Features

- 🛍️ **Multi-Brand Product Catalog** — Browse 50+ athletic products categorized across 6 top sporting brands.
- 🔎 **Real-Time Search & Filtering** — Filter products by brand, category, price range, or instant keyword search.
- ⚖️ **Side-by-Side Product Comparison** — Compare specifications and prices of any two products.
- 🛒 **Persistent Shopping Cart** — Add items, adjust quantities, and manage orders with persistent browser storage.
- ❤️ **Wishlist System** — Save favorite products for easy access later.
- 🌗 **Dark / Light Mode Theme** — Smooth theme switcher with automatic preference persistence.
- 📱 **Fully Responsive Layout** — Tailored UI experience across mobile, tablet, and desktop viewports.
- 🔌 **RESTful API Backend** — Node.js & Express API serving product and brand data with built-in fallback resilience.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite 6, React Router v7, Tailwind CSS v4 |
| **Backend** | Node.js, Express 5, SQLite (`node:sqlite`) |
| **State & Persistence** | React Context API, LocalStorage |
| **Deployment** | Vercel (Frontend), Node.js Server (Backend API) |

---

## 📂 Project Structure

```
sports-ecommerce-concept/
├── public/                # Public static assets & images
│   └── img/               # Product images, brand logos, banners
├── src/                   # React frontend source code
│   ├── components/        # UI Components (Navbar, Header, Footer, CartDrawer, ProductCard, etc.)
│   ├── context/           # React Context state (Cart, Wishlist, Theme)
│   ├── data/              # Static product catalog & brand metadata
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page views (Home, Shop, BrandPage, Comparison, Cart, Wishlist)
│   ├── services/          # API service layer with fallback handling
│   └── styles/            # Global Tailwind CSS styles
├── server/                # Node.js Express + SQLite backend API
│   ├── routes/            # REST API endpoints
│   ├── db.js              # Database connection & schema initialization
│   ├── seed.js            # Database seeding script
│   └── index.js           # Server entry point
├── package.json           # Frontend dependencies & scripts
└── vite.config.js         # Vite configuration & API proxy
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** (v9+ recommended)

### Step 1 — Clone Repository

```bash
git clone https://github.com/Varez-Technologies/sports-ecommerce-concept.git
cd sports-ecommerce-concept
```

### Step 2 — Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies (optional for local API)
cd server
npm install
cd ..
```

### Step 3 — Run Development Server

```bash
# Run frontend only (uses built-in catalog fallback)
npm run dev

# Run Express backend server (in a separate terminal)
npm run server
```

Open your browser and navigate to `http://localhost:5173`.

---

## 📦 Build & Deployment

### Production Build

To compile the production build:

```bash
npm run build
```

The output will be placed in the `dist/` directory, ready for deployment on platforms like Vercel, Netlify, or GitHub Pages.

---

## 📄 License & Attribution

Developed by **Varez Technologies** for portfolio showcase purposes. All product names, logos, and brands are property of their respective owners.
