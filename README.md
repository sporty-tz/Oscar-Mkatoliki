# Oscar Mkatoliki — Official Web Store

The official e-commerce website for **Oscar Mkatoliki**, Tanzania's leading Catholic music minister and spiritual content creator. Shop Catholic music albums, books, rosaries, statues, candles, jewelry, and sacramentals — all delivered to your door.

---

## Tech Stack

| Layer      | Technology                                |
| ---------- | ----------------------------------------- |
| Framework  | React 19 + TypeScript                     |
| Build tool | Vite 8                                    |
| Styling    | Inline `React.CSSProperties` + scoped CSS |
| Routing    | React Router v7                           |
| Backend    | Supabase (Auth + Database + Storage)      |
| Payments   | M-Pesa & Card (integrated at checkout)    |
| Deployment | Vercel                                    |

---

## Features

- **Homepage** — Hero slider, category navigation, featured products grid, promo banners, testimonials, newsletter signup, trust badges
- **Shop / Search** — Category-filtered product listings with search
- **Product Details** — Full product page with image gallery, add-to-cart, related products
- **Cart Sidebar** — Slide-in cart with quantity controls, shipping summary
- **3-Step Checkout** — Cart review → Delivery details → M-Pesa / Card payment
- **Order Confirmation** — Order number, scripture quote, delivery info
- **User Auth** — Register, Login, Reset Password, Change Password (Supabase Auth)
- **User Profile** — Account settings, order history, wallet, wishlist
- **Blog** — Blog grid, blog details, author pages
- **Static Pages** — About, Contact, FAQ, Privacy Policy, Coming Soon, Donations

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` by default.

---

## Project Structure

```
src/
├── App.tsx                 # Root router
├── main.tsx                # Entry point
├── context/
│   ├── CartContext.tsx      # Global cart state (add, remove, clear)
│   ├── ShopContext.tsx      # Shop/product state
│   └── AppSettingsContext.tsx
├── components/
│   └── layout/
│       ├── AppLayout.tsx   # Header, CategoryNav, CartSidebar, Footer
│       └── AuthLayout.tsx
├── pages/
│   ├── Home.tsx            # Homepage with all sections
│   ├── Shop.tsx
│   ├── ProductSingle.tsx
│   ├── Checkout.tsx        # 3-step checkout flow
│   ├── OrderConfirmation.tsx
│   ├── Login.tsx / Register.tsx / ...
│   └── ...
├── lib/
│   ├── products.ts         # Product data & interface
│   └── supabase.ts         # Supabase client
└── styles/                 # Per-page CSS files
public/
├── Products/               # Product images (Prod-1.png … prod-8.png)
├── images/                 # Site images (home, blog, team, etc.)
└── fonts/                  # Icon fonts (FontAwesome, IcoFont, Flaticon)
```

---

## Brand

| Token        | Value                                |
| ------------ | ------------------------------------ |
| Primary navy | `#1a1a2e`                            |
| Gold accent  | `#D4AF37` / `#C9A84C`                |
| Background   | `#ffffff` / `#fafafa`                |
| Font         | System UI (Plus Jakarta Sans target) |

---

## Environment Variables

Create a `.env.local` file at the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## License

© Oscar Mkatoliki. All rights reserved.

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
````
