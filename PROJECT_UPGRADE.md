# Project Upgrade Roadmap: Bistrot De La Cour

This document outlines the strategic transition of the Bistrot De La Cour project from a functional MVP to a production-grade, offline-capable PWA.

## 1. Architecture & Backend
*   **Framework:** **Next.js 15 (App Router)**.
*   **CMS:** **Payload CMS 3.0 (Unified)**.
    *   *Rationale:* Running Payload natively within Next.js for superior performance, unified hosting, and a modern React Server Components workflow.
*   **Database:** **PostgreSQL** (via Neon.tech or Supabase for production).
*   **Storage:** **Cloudinary** for image optimization and CDN delivery.
*   **API Layer:** **TanStack Query (React Query)** + Payload Local API.

## 2. PWA & Offline Strategy
*   **Plugin:** `next-pwa` for service worker generation and manifest management.
*   **Strategy:** "Cache First" for static assets and "Stale-While-Revalidate" for menu data.
*   **Offline Support:** Basic offline viewing of the menu and contact info.

## 3. Deployment & Infrastructure
*   **Frontend & Backend:** Vercel (Unified Deployment).
*   **CI/CD:** GitHub Actions for automated testing and deployment.

## 4. Implementation Phases (Milestones)

### Milestone 1: Stability & Hardening
*   [X] Fix all 28 existing linting errors.
*   [X] Resolve `any` types in frontend components.
*   [X] Set up Vitest and React Testing Library for TDD.

### Milestone 2: PWA Integration
*   [X] Install and configure `next-pwa`.
*   [X] Create Web Manifest and icons.

### Milestone 3: Data Layer Upgrade
*   [X] Integrate TanStack Query.
*   [X] Implement persistent caching for offline menu access.
*   [X] Refactor TestimonialsCarousel as a proof-of-concept.

### Milestone 4: Payload CMS & Next.js Migration (In Progress)
*   [X] Purge Strapi backend and related configurations.
*   [X] Define TypeScript schemas for all collections and globals.
*   [X] Initialize Next.js App Router and adapt frontend pages.
*   [X] Integrate Payload 3.0 natively into Next.js.
*   [ ] Implement persistent PostgreSQL database and Media CDN.
*   [ ] Finalize new data fetching logic using Payload's Local API.

## 5. Development Standards
*   **TDD:** All new features must be accompanied by unit or integration tests.
*   **Atomic Commits:** Commit and push at every milestone.
*   **Performance:** Maintain < 1s Load Time on mobile 4G.
