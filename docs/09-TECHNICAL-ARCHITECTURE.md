# Technical Architecture

## Stack
Next.js App Router, TypeScript, Tailwind CSS, next-intl, Vercel. No CMS in V1.

## Proposed modules
- `app/[locale]/...`: locale routes
- `components/layout`: header, footer, locale switcher, WhatsApp
- `components/ui`: buttons, cards, headings, form primitives
- `components/sections`: homepage sections
- `content/services`: shared service taxonomy
- `messages/fr.json`, `messages/en.json`: translated UI
- `lib/validation`, `lib/contact`: validated submission boundary
- `lib/config`: environment validation and public contact settings

## Engineering rules
- Prefer server components; client components only for real interaction.
- Shared design tokens; no repeated hardcoded styles.
- Optimized local/static images with confirmed reuse rights.
- Validate environment variables, never expose contact-provider secrets.
- Secure submission endpoint, input limits, anti-spam, no unnecessary personal-data storage.
- Explicit production configuration for receiving leads; no fake success response.
- SEO metadata per locale, error/loading/not-found states.
- Keep dependencies minimal; avoid animation libraries unless necessary.
- Do not deploy publicly or widen access without explicit user approval.
