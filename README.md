# BuyOne

BuyOne is a full-stack e-commerce platform consisting of two main apps:

- **admin-panel**: Admin dashboard for managing products, categories, and users.
- **frontend**: Customer-facing storefront for browsing and purchasing products.

## Tech Stack

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **MongoDB** (via Mongoose)
- **NextAuth.js** (authentication)
- **AWS S3** (image/file uploads)
- **UI Libraries**: MUI, NextUI, HeadlessUI, Radix UI, Lucide, FontAwesome

## Project Structure

```
admin-panel/
  src/
    app/
      api/           # REST API routes (auth, aws, categories, products)
      categories/    # Admin category management pages
      products/      # Admin product management pages
      profile/       # Admin profile page
    components/      # Reusable UI components
    lib/             # Utility libraries (auth, aws, db, etc)
frontend/
  src/
    app/             # Storefront pages (home, details, etc)
    components/      # Storefront UI components
    lib/             # Utility functions
```

## Features

### Admin Panel

- Authentication (NextAuth.js, MongoDB adapter)
- Manage products & categories (CRUD)
- AWS S3 integration for image uploads
- Responsive dashboard UI

### Frontend

- Product listing & details
- Featured products, hero section, footer, etc
- Modern, responsive design

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB instance
- AWS S3 credentials (for image uploads)

### Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/sirajahmedx/buyone.git
   cd buyone
   ```
2. Install dependencies for both apps:
   ```bash
   cd admin-panel && npm install
   cd ../frontend && npm install
   ```
3. Configure environment variables:
   - Create `.env.local` files in both `admin-panel` and `frontend` with MongoDB, AWS, and Auth settings.
4. Run development servers:
   ```bash
   cd admin-panel && npm run dev
   cd ../frontend && npm run dev
   ```

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Lint code

## Deployment

- Both apps can be deployed separately (e.g., Vercel, Netlify)
- See Next.js [deployment docs](https://nextjs.org/docs/deployment)

## License

MIT

---

For more details, see the individual `README.md` files in `admin-panel` and `frontend`.
