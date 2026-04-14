# Bistrot De La Cour

Restaurant website for **Bistrot De La Cour** in Charleroi, Belgium. A high-performance, offline-capable PWA built with React 19 and Payload CMS.

## 🏗️ Architecture (In Progress)

```
┌─────────────────────┐      REST API        ┌──────────────────┐
│   React Frontend    │ ◄──────────────────► │   Payload CMS    │
│   (Vite + React 19) │                      │   (Node.js)      │
│   Port: 5173        │                      │   Port: 3000     │
└─────────────────────┘                      └──────────────────┘
         │                                            │
         ▼                                            ▼
┌─────────────────────┐                      ┌──────────────────┐
│   Vercel            │                      │   PostgreSQL     │
│   (Static hosting)  │                      │   (Neon/Supabase)│
└─────────────────────┘                      └──────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + TypeScript + Vite 7 |
| Styling | Tailwind CSS v4 |
| Data Layer | TanStack Query (React Query) |
| Offline | PWA (vite-plugin-pwa) + Persistence |
| CMS | Payload CMS (Headless CMS) |
| Database | PostgreSQL |
| Icons | Lucide React |
| Testing | Vitest + RTL |

## 🚀 Development

### Prerequisites

- Node.js 20+
- npm or pnpm

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

## 📋 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production (includes PWA) |
| `npm run test` | Run unit and integration tests |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build locally |

## 🔒 Environment Variables

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3000
```

## 📄 License

MIT
