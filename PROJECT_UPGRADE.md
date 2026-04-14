# Project Upgrade Roadmap: Bistrot De La Cour

This document outlines the strategic transition of the Bistrot De La Cour project from a functional MVP to a production-grade, offline-capable PWA.

## 1. Architecture & Backend
*   **CMS:** Transition to **Payload CMS**.
    *   *Rationale:* TypeScript-native, code-first schema, lighter resource footprint, and superior developer experience.
*   **Database:** **PostgreSQL** (via Neon.tech or Supabase for production).
*   **Storage:** **Cloudinary** for image optimization and CDN delivery.
*   **API Layer:** **TanStack Query (React Query)** for robust data fetching, caching, and offline state management.

## 2. PWA & Offline Strategy
*   **Plugin:** `vite-plugin-pwa` for service worker generation and manifest management.
*   **Strategy:** "Cache First" for static assets and "Stale-While-Revalidate" for menu data.
*   **Offline Support:** Basic offline viewing of the menu and contact info; no heavy local database (WatermelonDB) required for this use case.

## 3. Deployment & Infrastructure
*   **Frontend:** Vercel (Optimized for React 19/Vite).
*   **Backend:** Railway.app (Reliable Node.js hosting).
*   **CI/CD:** GitHub Actions for automated testing and deployment.

## 4. Implementation Phases (Milestones)

### Milestone 1: Stability & Hardening
*   [X] Fix all 28 existing linting errors.
*   [X] Resolve `any` types in frontend components.
*   [X] Set up Vitest and React Testing Library for TDD.

### Milestone 2: PWA Integration
*   [X] Install and configure `vite-plugin-pwa`.
*   [X] Create Web Manifest and icons.
*   [X] Register service worker in `main.tsx`.

### Milestone 3: Data Layer Upgrade
*   [X] Integrate TanStack Query.
*   [X] Implement persistent caching for offline menu access.
*   [X] Refactor TestimonialsCarousel as a proof-of-concept.

### Milestone 4: Payload CMS Migration (In Progress)
*   [X] Purge Strapi backend and related configurations.
*   [ ] Define TypeScript schemas for Menu, Gallery, and Reviews (Started: MenuItems defined).
*   [ ] Set up Payload CMS instance.
*   [ ] Implement new data fetching logic for Payload.

## 5. Development Standards
*   **TDD:** All new features must be accompanied by unit or integration tests.
*   **Atomic Commits:** Commit and push at every milestone.
*   **Performance:** Maintain < 1s Load Time on mobile 4G.
