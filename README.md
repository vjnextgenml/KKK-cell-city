# KKK Cell City

KKK Cell City is a responsive storefront and information website for a mobile phone, accessories, and repair shop in Perambalur. It is built with React, TypeScript/JavaScript, Vite, Tailwind CSS, and React Router.

## Run locally

Prerequisite: Node.js and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL after startup. Other available commands:

```bash
npm run build      # Type-check and create a production build in dist/
npm run preview    # Preview the production build locally
```

Run automated tests with `npm test`. No lint script is configured in `package.json`.

## Routes and features

| Route | Page | What it does |
| --- | --- | --- |
| `/` | Home | Store introduction, featured phones, and links to the shop and repairs |
| `/shop` | Shop | In-memory product catalog with text search, brand filters, and price sorting |
| `/product/:productId` | Product details | Product information, specifications when available, and a phone image gallery |
| `/categories` | Categories | Accessory categories and sample product listings |
| `/repairs` | Repairs | Repair-service information and an inquiry form that prepares a WhatsApp message |
| `/about` | About | Store information, showroom cards, contact links, and directions |
| `/admin/login` | Admin login | Frontend-only demo login form |
| `/admin` | Admin dashboard | Frontend-only product management preview; no public-site link |
| Any other path | Not found | A simple 404 page |

Navigation uses React Router. The shop search can be shared as a URL, for example `/shop?q=iphone`.

The Admin Login button opens `/admin/login`; successful demo login navigates to `/admin`. Configure `VITE_ADMIN_USER_ID` and `VITE_ADMIN_PASSWORD` in a local `.env.local` file and restart Vite to enable the demo check. Do not commit credentials. These `VITE_` values are shipped to the browser, and the React route gate is bypassable; this is not real authentication. Do not expose the dashboard publicly until a backend verifies credentials and enforces server-side authorization. The demo login state, product edits, and image previews reset on refresh.

## Project layout

```text
src/
  App.tsx                  Routes and shared top-level state
  main.tsx                 React entry point and BrowserRouter
  index.css                Tailwind directives and global/theme styles
  components/
    Navbar.tsx             Site navigation and shop search
    Footer.tsx             Contact details and footer links
    ProductCard.tsx        Reusable product card linking to product details
  data/
    products.ts            Product type, sample catalog, INR formatter
  admin/
    types.ts               Admin product and image/offer types
    productService.ts      Temporary in-memory CRUD and future API seam
    validation.ts          Product and image validation
    components/            Admin layout, product form, table, and editors
  pages/
    Home.jsx               Home page
    Shop.jsx               Catalog, search, filters, and sort
    ProductDetails.tsx     Product details and image gallery
    Repairs.jsx            Repair services and WhatsApp inquiry
    About.jsx              Store/about information
    Pages.tsx              Categories and not-found pages
    AdminDashboard.tsx     Standalone /admin dashboard
public/
  images/                  Product, repair, category, and brand imagery
```

## Editing guide for AI contributors

- Read the relevant component and its callers before changing behavior. Keep the existing React Router, Tailwind CSS, and component patterns.
- Phone entries belong in `src/data/products.ts`; the accessory-page sample records are currently in `src/pages/Pages.tsx`. The `Product` type defines the public catalog shape; image paths should refer to files under `public/images/` and use root-relative URLs such as `/images/phone-iphone-15.jpg`.
- Each mobile product has exactly three gallery slots. Use `null` for missing images rather than duplicating or substituting unrelated images. Accessory records use a one-image tuple. Only add verified specifications or availability.
- Shared routes and app-level state are in `src/App.tsx`. Keep page-specific UI and behavior in the corresponding page component.
- Preserve responsive behavior, accessible labels, and visible keyboard focus styles when editing the UI.
- After code changes, run `npm run build` and `npm test`.
- Do not add credentials or secrets to the repository. Do not invent or silently change store contact, location, hours, pricing, warranty, or availability information; confirm business facts with the project owner.

## Current scope and caveats

This repository currently implements a frontend prototype, not a complete commerce system:

- The public product catalog is sample data. There is no production API, database, authentication, payment processing, inventory, or order persistence.
- The accessories page includes temporary sample products in the existing categories. Verify all product details, pricing, availability, and specifications before treating them as business data.
- The `/admin` route is a frontend-only management preview with mobile/accessory CRUD, dynamic specifications, image previews, offer validation, search, and filters. It does not update the public catalog, call a backend, upload images, or persist edits after refresh.
- `VITE_API_BASE_URL` is reserved for future API integration; no requests are currently sent to it.
- The admin route is not secure by itself. Hiding its link from the public site is not access control; implement server-side authentication and authorization before public hosting.
- The cart count is in-memory app state; it does not represent a working cart or checkout.
- Shop search, brand filtering, and price sorting operate on the local catalog.
- Repair inquiries open WhatsApp with a prefilled message; they are not submitted to a server.
- Product detail pages are available at `/product/:productId`; purchase and checkout flows are not implemented.
- Each listed phone has one existing product image; its other two gallery slots show an explicit missing-image fallback.
- Some business information is explicitly illustrative or unverified in the UI, including the North Perambalur sample location and example operating hours. Verify it before presenting it as fact.

## Main technologies

- React 18 and TypeScript 5
- Vite 6
- React Router 7
- Tailwind CSS 3
- Lucide React icons

Dependency versions and npm scripts are maintained in `package.json` and `package-lock.json`.
