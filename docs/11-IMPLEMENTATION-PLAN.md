# Codex Implementation Plan

## Prerequisites
- User approves specifications and confirms required brand/contact assets.
- Figma MCP connection is available.
- Project path: `S:\Projects\KlickTrick`.
- Figma: `UrZ5Q9pJ2iijlIkV99OAei`, node `291:711`.

## Phase 0 — Audit and plan
Inspect repository state and Figma via MCP. Before implementing, call Figma `get_design_context` for relevant nodes. Report source assets, potential licensing concerns and responsive gaps. Do not touch unrelated Figma frames.

## Phase 1 — Foundation
Initialize Next.js, TypeScript, Tailwind and next-intl. Configure French default and English routes, shared layout, typography/tokens, lint/typecheck, environment validation.

## Phase 2 — Home
Implement approved homepage sections, WEBYTE-inspired design language, localized copy and mobile behavior. Do not carry over placeholder client logos, stats, pricing or reviews.

## Phase 3 — Services and About
Implement six-pillar Services page and truthful About page, using shared components and translations.

## Phase 4 — Contact
Implement specified five-field form with server-side validation, safe lead-delivery integration, localized status feedback and global WhatsApp. No unconfigured fake success.

## Phase 5 — Quality and launch readiness
Test navigation, locale switching, form validation/submission, WhatsApp, accessibility, responsive layout, SEO, build/lint/types. Prepare deployment instructions; do not deploy publicly without approval.

## Definition of done
- FR default and EN fully functional.
- No dummy trust claims.
- No pricing or quote popup.
- Every primary CTA reaches Contact form.
- WhatsApp functional once configured.
- Contact submissions actually delivered through configured backend.
- Production build and relevant tests pass.
- User approves before public deployment.
