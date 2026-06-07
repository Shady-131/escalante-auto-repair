# Escalante Auto Repair

A modern, responsive marketing site and customer/admin portal for **Escalante Auto Repair**, a Utah-based auto repair shop. The app presents the business (services, reviews, contact/location) and includes a demo portal where customers can book and track repairs and an admin can manage the shop.

> ⚠️ **Demo project.** This is a **frontend-only** application. There is **no backend or database** yet — all accounts, bookings, and uploaded data are mock data persisted in the browser's `localStorage`. See [Demo limitations](#demo-limitations).

## Tech stack

- **React 18** — UI library
- **Vite 5** — dev server & build tooling
- **Tailwind CSS 4** (`@tailwindcss/vite`) — styling
- **lucide-react** — icons
- **localStorage** — client-side persistence for the demo auth & data (no server)

## Features

**Public site**
- Hero, services overview, customer reviews, and shop location/contact sections
- Responsive layout (mobile, tablet, desktop) with a dark-themed brand identity
- Floating WhatsApp & call shortcuts
- Click-to-call and Google Maps directions

**Customer portal**
- Email/password sign up & login (demo accounts in the browser)
- Overview dashboard, book an appointment, service history, repair tracking, image uploads, and payment views

**Admin dashboard**
- Overview, spare-parts inventory, before/after photos, technician notes, service prices, and shop settings
- Custom logo upload (persisted in `localStorage`)
- **Admin-only** "View as Customer / View as Admin" role preview to check how the portal looks for each role

## Demo limitations

- **No backend / no database.** Authentication, bookings, inventory, and uploads are mock data stored in `localStorage` and are **not** shared between devices or browsers.
- Data resets if you clear your browser storage. Seed demo accounts are always re-created.
- Passwords are stored in plain text in the browser for demo convenience — **not** production-safe.
- Uploaded images/logos are kept as data URLs in `localStorage` and are subject to its size limits.
- No real payments, email, or SMS are sent.

## Demo credentials

| Role     | Email                  | Password      |
| -------- | ---------------------- | ------------- |
| Admin    | `admin@escalante.com`  | `admin123`    |
| Customer | `john@demo.com`        | `customer123` |

The portal also has **"Customer Demo"** and **"Admin Demo"** quick-login buttons.

To register a new **admin** account, the staff invite code is `ESC-ADMIN-2026`.

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+ (Node 20+ recommended)
- npm (ships with Node)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the local URL Vite prints (default <http://localhost:5173>).

### Build for production

```bash
npm run build
```

The optimized static site is output to `dist/`. Preview the production build locally with:

```bash
npm run preview
```

## Deploy to Vercel

This is a static Vite SPA and deploys to Vercel with zero configuration.

**Option A — Dashboard**
1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Vercel, click **Add New → Project** and import the repo.
3. Vercel auto-detects Vite. Confirm the defaults:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

**Option B — Vercel CLI**

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

No environment variables are required for the demo (there is no backend).

## Project structure

```
src/
  assets/        # images (logo, hero car)
  components/    # layout, floating buttons, UI primitives
  context/       # AuthContext (localStorage-backed mock auth)
  hooks/         # useAuth, useServices, useBookings, useToast
  pages/         # public pages + dashboard (admin/customer)
  index.css      # Tailwind entry + brand theme tokens
```

## Roadmap / not yet implemented

- Real backend API and database
- Server-side authentication & password hashing
- Persistent, multi-device data for bookings, inventory, and uploads
- Real payment, email, and SMS integrations
