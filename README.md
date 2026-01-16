Inventory Dashboard

Next.js 16 · React 19 · Tailwind CSS

A modern, responsive Product Inventory Dashboard built with the latest Next.js App Router and React 19 features.
This project demonstrates server-side data fetching, URL-based state management, and optimistic UI updates in a real-world admin dashboard layout.

🚀 Tech Stack

Framework: Next.js 16 (App Router)

Library: React 19

Styling: Tailwind CSS

State Management: nuqs (type-safe URL search params)

Data Source: DummyJSON API

Language: TypeScript

✨ Features
🧭 Persistent Admin Layout

Fixed sidebar on desktop

Responsive navigation for mobile & tablet

Category list fetched server-side

Active category highlighting

🔍 URL-Based State (nuqs)

Search query stored in the URL (?q=laptop)

Category filter stored in the URL (?category=smartphones)

Page refresh preserves filters & search

Fully type-safe search params

🧩 Product Dashboard

Responsive grid layout

Desktop: 4 columns

Tablet: 2 columns

Mobile: 1 column

Skeleton loaders during data updates

Clean, minimal UI

⚡ React 19 Optimistic UI

Instant product removal using useOptimistic

Server Action simulates delete request

UI updates immediately while the server responds

🧠 Server-First Architecture

Initial data fetched in Server Components

Mutations handled via Next.js Server Actions

No unnecessary client-side data fetching

🗂️ Project Structure
src/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main dashboard page (server component)
│   └── actions.ts        # Server actions (delete simulation)
│
├── components/
│   ├── Sidebar.tsx
│   ├── TopBar.tsx
│   ├── ProductsGrid.tsx
│   ├── ProductCard.tsx
│   └── SkeletonGrid.tsx
│
├── lib/
│   ├── api.ts            # API fetch helpers
│   └── types.ts          # TypeScript types
│
└── styles/
    └── globals.css

🌐 API Used

All data is fetched from DummyJSON (no authentication required):

Get Products
https://dummyjson.com/products

Search Products
https://dummyjson.com/products/search?q=phone

Get Categories
https://dummyjson.com/products/categories

Delete Product (Simulated)
https://dummyjson.com/products/{id}

⚠️ Note: Delete requests are simulated. Products reappear on refresh.

🛠️ Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/inventory-dashboard.git
cd inventory-dashboard

2️⃣ Install dependencies
npm install

3️⃣ Run the development server
npm run dev

4️⃣ Open in browser
http://localhost:3000

🧪 Key Concepts Demonstrated

Next.js App Router & Server Components

React 19 useOptimistic

Server Actions for mutations

Type-safe URL state with nuqs

Responsive admin dashboard UI

Clean architecture (no prop-drilling)
