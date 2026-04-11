# Bistrot De La Cour

Restaurant website for **Bistrot De La Cour** in Charleroi, Belgium, with a full **Strapi CMS** admin dashboard for managing all content, reservations, and site settings.

## 🏗️ Architecture

```
┌─────────────────────┐     REST/GraphQL     ┌──────────────────┐
│   React Frontend    │ ◄──────────────────► │   Strapi CMS     │
│   (Vite + React 19) │                      │   (Node.js)      │
│   Port: 5173        │                      │   Port: 1337     │
└─────────────────────┘                      └──────────────────┘
         │                                            │
         ▼                                            ▼
┌─────────────────────┐                      ┌──────────────────┐
│   Vercel / Netlify  │                      │   SQLite / PG    │
│   (Static hosting)  │                      │   + S3 uploads   │
└─────────────────────┘                      └──────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| CMS | Strapi v5 (Headless CMS) |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Icons | Lucide React |
| CI/CD | GitHub Actions |

## 📁 Project Structure

```
bistrot-delacour/
├── src/                          # React frontend
│   ├── api/
│   │   ├── client.ts             # API client with fetch wrapper
│   │   └── services.ts           # Typed API service functions
│   ├── components/
│   │   ├── CookieConsent.tsx     # GDPR cookie consent banner
│   │   ├── ErrorBoundary.tsx     # React error boundary
│   │   ├── Navigation.tsx        # Top navigation bar
│   │   ├── Footer.tsx            # Site footer
│   │   └── TestimonialsCarousel.tsx
│   ├── pages/
│   │   ├── Home.tsx              # Landing page
│   │   ├── About.tsx             # Restaurant history & team
│   │   ├── Menu.tsx              # Dynamic menu from Strapi
│   │   ├── Reservation.tsx       # Booking form (Zod validated)
│   │   ├── Gallery.tsx           # Photo gallery from Strapi
│   │   ├── Reviews.tsx           # Customer reviews from Strapi
│   │   ├── Contact.tsx           # Contact form (Zod validated)
│   │   └── PrivacyPolicy.tsx     # GDPR privacy policy page
│   ├── types/
│   │   └── strapi.ts             # TypeScript type definitions
│   ├── lib/
│   │   └── schemas.ts            # Zod validation schemas
│   ├── App.tsx                   # Root component with code splitting
│   └── main.tsx                  # Entry point
├── strapi/                       # Strapi CMS backend
│   ├── src/
│   │   ├── api/                  # 10 content type APIs
│   │   ├── components/           # Reusable components (SEO)
│   │   └── index.js              # Bootstrap + permissions
│   ├── config/                   # Server, API, plugins config
│   └── package.json
├── .github/workflows/ci.yml      # CI/CD pipeline
├── public/
│   ├── robots.txt                # SEO robots file
│   └── images/                   # Static images
└── package.json
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (Node 20 recommended)
- npm or pnpm

### 1. Install Dependencies

```bash
# Frontend
npm install

# Strapi CMS
cd strapi && npm install && cd ..
```

### 2. Start Development Servers

**Start Strapi first:**
```bash
cd strapi
npm run develop
```
Strapi admin will be available at `http://localhost:1337/admin`

**Start Frontend (in another terminal):**
```bash
npm run dev
```
Frontend will be available at `http://localhost:5173`

### 3. First-Time Strapi Setup

1. Open `http://localhost:1337/admin`
2. Create your admin user (first registration becomes super admin)
3. Go to **Settings → API Tokens** and create a **Public Read** token if needed
4. Start adding content:
   - **Site Settings** → Fill in restaurant info
   - **Menu Categories** → Create categories (Entrées, Plats, Desserts, Boissons)
   - **Menu Items** → Add dishes with images, prices, allergens
   - **Gallery Images** → Upload photos
   - **Reviews** → Add customer reviews
   - **Team Members** → Add staff profiles
   - **FAQ** → Add common questions
   - **Testimonials** → Add carousel testimonials

### 4. Content Types Available in Strapi

| Content Type | Type | Description |
|---|---|---|
| **Site Settings** | Single | Restaurant name, address, hours, social links |
| **SEO Settings** | Single | Global meta tags, OG images, per-page SEO |
| **Menu Category** | Collection | Category name, slug, icon, order |
| **Menu Item** | Collection | Dish name, description, price, allergens, image |
| **Reservation** | Collection | Booking requests with status tracking |
| **Contact Message** | Collection | Contact form submissions |
| **Gallery Image** | Collection | Photos with categories and featured flag |
| **Review** | Collection | Customer ratings and reviews |
| **Team Member** | Collection | Staff profiles with photos |
| **FAQ** | Collection | Frequently asked questions |
| **Testimonial** | Collection | Carousel testimonials |

## 📋 Available Scripts

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |

### Strapi

| Command | Description |
|---|---|
| `npm run develop` | Start Strapi in development mode (auto-reload) |
| `npm run start` | Start Strapi in production mode |
| `npm run build` | Build Strapi admin panel |
| `npm run strapi` | Run Strapi CLI commands |

## 🔒 Environment Variables

### Frontend (`.env`)

```env
VITE_STRAPI_URL=http://localhost:1337
```

### Strapi (`strapi/.env`)

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-key-1,your-key-2
ADMIN_JWT_SECRET=your-secret
API_TOKEN_SALT=your-salt
JWT_SECRET=your-jwt-secret
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=./data/data.sqlite
```

See `strapi/.env.example` for production values (PostgreSQL, S3, etc.)

## 🌐 Deployment

### Frontend → Vercel

1. Push code to GitHub
2. Connect repo to Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Add environment variable: `VITE_STRAPI_URL=https://your-strapi-host.com`
6. Deploy

### Strapi → Render / Railway

**Render:**
1. Create new Web Service
2. Connect your GitHub repo
3. Root directory: `strapi`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Add all environment variables from `.env.example`
7. Attach a PostgreSQL database

**Railway:**
1. Create new project from GitHub
2. Set root directory to `strapi`
3. Add PostgreSQL service
4. Configure environment variables
5. Deploy

### Production Checklist

- [ ] Change all default secrets in `strapi/.env`
- [ ] Set up PostgreSQL for Strapi
- [ ] Configure S3/Cloudinary for media uploads
- [ ] Set up custom domain + HTTPS
- [ ] Configure CORS in Strapi for your frontend domain
- [ ] Create Strapi admin user (not the default)
- [ ] Set up email notifications for reservations
- [ ] Configure Strapi webhooks for rebuild triggers
- [ ] Set up monitoring (Sentry, UptimeRobot)
- [ ] Run `npm audit` on both projects

## 📊 API Endpoints

All Strapi endpoints follow the standard REST pattern:

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/menu-categories?populate=*` | Public | List menu categories |
| `GET` | `/api/menu-items?populate=*` | Public | List all menu items |
| `GET` | `/api/site-setting` | Public | Get site settings |
| `GET` | `/api/gallery-images?populate=*` | Public | List gallery images |
| `GET` | `/api/reviews` | Public | List reviews |
| `POST` | `/api/reservations` | Public | Create reservation |
| `POST` | `/api/contact-messages` | Public | Send contact message |
| `GET` | `/api/testimonials` | Public | List testimonials |
| `GET` | `/api/faqs` | Public | List FAQs |
| `GET` | `/api/team-members?populate=*` | Public | List team members |
| `GET` | `/api/seo-setting` | Public | Get SEO settings |

Admin endpoints (requires auth) for CRUD operations on all content types.

## ✅ Production Features

### SEO
- ✅ Dynamic meta tags per page
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ `robots.txt`
- ✅ Sitemap (via Strapi plugin)
- ✅ Semantic HTML
- ✅ `lang="fr"` set correctly

### GDPR Compliance
- ✅ Cookie consent banner with granular controls
- ✅ Privacy Policy page (RGPD compliant)
- ✅ Form consent checkboxes
- ✅ Arena tracking scripts removed
- ✅ Data retention policy documented
- ✅ User rights documentation

### Forms
- ✅ Client-side validation with Zod
- ✅ Accessible error messages
- ✅ ARIA attributes
- ✅ Real submissions to Strapi
- ✅ Loading and error states

### Performance
- ✅ Route-level code splitting (React.lazy)
- ✅ Lazy-loaded images
- ✅ Optimized bundle size
- ✅ Tree-shaking for unused code

### Accessibility
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Screen reader announcements
- ✅ Semantic HTML structure

### Error Handling
- ✅ Global Error Boundary
- ✅ Per-page loading states
- ✅ Form error handling
- ✅ API error handling

## 📝 Next Steps / Future Enhancements

1. **Email Notifications**: Set up Strapi email plugin for reservation confirmations
2. **Online Payments**: Integrate Stripe for deposits/pre-orders
3. **Multi-language**: Add English/Dutch support via Strapi i18n plugin
4. **Real-time Updates**: Use Strapi webhooks to trigger frontend rebuilds
5. **Analytics**: Add Plausible/Fathom with cookie consent integration
6. **Image Optimization**: Migrate to Cloudinary or AWS S3 + CloudFront
7. **SSR/SSG**: Migrate to Next.js for better SEO (optional)
8. **PWA**: Add service worker for offline support

## 📄 License

MIT
