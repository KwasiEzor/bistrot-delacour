# Bistrot De La Cour

Restaurant website for **Bistrot De La Cour** in Charleroi, Belgium. A high-performance, offline-capable PWA built with **Next.js 15** and **Payload CMS 3.0**.

## 🏗️ Architecture

Everything is unified into a single Next.js application, allowing for React Server Components to fetch data directly from Payload's Local API.

```
┌──────────────────────────────────────────────────────────┐
│                   Next.js 15 Application                 │
│                                                          │
│  ┌─────────────────────┐        ┌─────────────────────┐  │
│  │   Frontend (App)    │ <────> │   Payload CMS 3.0   │  │
│  │   (React 19)        │ Local  │   (Admin & API)     │  │
│  └─────────────────────┘ API    └─────────────────────┘  │
│                                                          │
└────────────────────────────┬─────────────────────────────┘
                             │
                             ▼
                    ┌─────────────────────┐
                    │   Vercel Deployment │
                    └─────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Data Layer | TanStack Query + Payload Local API |
| Offline | PWA (next-pwa) |
| CMS | Payload CMS 3.0 (Unified) |
| Database | PostgreSQL (Neon/Supabase) |
| Icons | Lucide React |
| Testing | Vitest + RTL |

## 🚀 Development

### Prerequisites

- Node.js 20+
- MongoDB or PostgreSQL instance (for Payload)

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3000
DATABASE_URI=mongodb://127.0.0.1/bistrot-delacour
PAYLOAD_SECRET=your-payload-secret
```

### 3. Start Development Server

```bash
npm run dev
```

## 📋 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## 📄 License

MIT
