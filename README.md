# ShopMate AI-Powered E-commerce Store Frontend

**Live Site:** [https://shopmate-ai-shop.netlify.app/](https://shopmate-ai-shop.netlify.app/)

## Overview

This is the frontend of ShopMate, an AI-powered e-commerce platform. Built with React, Vite, Redux, and Tailwind CSS, it provides a responsive and modern user interface for browsing products, managing carts, and completing secure payments via Stripe. The frontend communicates seamlessly with the ShopMate backend API to deliver a full-featured shopping experience.

**GitHub Repository Description:**
A modern, responsive React frontend for an AI-powered e-commerce store featuring Redux for state management, Stripe payments, Tailwind CSS for styling, and integration with the ShopMate backend API.

---

## Features

- **Product Browsing & Search**
  - View products with categories and details
  - Search and filter products
- **Shopping Cart & Checkout**
  - Add/remove items from cart
  - Secure checkout with Stripe integration
- **User Authentication**
  - Sign up, login, and profile management
  - JWT-based authentication (via backend)
- **Notifications**
  - Toast notifications for user actions
- **Responsive Design**
  - Mobile-first layout using Tailwind CSS
  - Smooth animations with tailwindcss-animate

---

## Technology Stack

- **Frontend:** React, Vite  
- **State Management:** Redux Toolkit, React-Redux  
- **Routing:** React Router DOM  
- **Styling:** Tailwind CSS, tailwindcss-animate  
- **Payments:** Stripe (React Stripe JS)  
- **HTTP Requests:** Axios  
- **Notifications:** React Toastify  
- **Linting:** ESLint, eslint-plugin-react-hooks  

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/lukmanxpert/shopmate-ai-powered-ecommerce-store-frontend.git
cd shopmate-ai-powered-ecommerce-store-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** (if needed) for API URLs and Stripe keys:

```env
VITE_BACKEND_URL=https://shopmate-server.onrender.com/
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

4. **Start development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

6. **Preview production build**

```bash
npm run preview
```

---

## Folder Structure

```
frontend/
│
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page components
│   ├── redux/           # Redux slices and store
│   ├── routes/          # React Router routes
│   ├── utils/           # Helper functions (API requests, etc.)
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Contribution

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/your-feature`)  
3. Make your changes and commit (`git commit -m 'Add new feature'`)  
4. Push to the branch (`git push origin feature/your-feature`)  
5. Create a Pull Request

---

## License

This project is licensed under the **ISC License**.

---

## Contact

**Author:** Sheikh Lukman  
**GitHub:** [https://github.com/lukmanxpert](https://github.com/lukmanxpert)

