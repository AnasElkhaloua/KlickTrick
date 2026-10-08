# Information Architecture & Routing

## Launch routes
- `/` -> `/fr` redirect
- `/fr`, `/en`: Home
- `/fr/services`, `/en/services`: Services overview
- `/fr/a-propos`, `/en/about`: About
- `/fr/contact`, `/en/contact`: Contact with form

## Future-ready routes (not fabricated launch content)
- `/fr/realisations`, `/en/work`: Work/Case Studies
- `/fr/blog`, `/en/blog`: Blog
- Service-detail routes only when actual useful content is ready.

Do not publish empty case-study cards, fictional projects, or thin blog placeholders as indexed content. Nav may omit future pages until content exists; keep code architecture extensible.

## Shared layout
Header with logo, Home, Services, About, Contact, language switcher and prominent quote CTA. Footer with useful navigation, contact CTA, legal/privacy links, language switcher, and verified social links only. Global floating WhatsApp button.

## i18n
Use `next-intl` with locale-aware routing. French is default, English secondary. Translate all UI, metadata, validation and form states. Preserve locale when navigating and switching language. Prefer localized slugs where specified. Use correct canonical and reciprocal `hreflang` links. Do not implement Arabic or RTL in V1.

## Content
One structured source of truth for service categories, translated content and navigation; no duplicated card data.
