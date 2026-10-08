# Contact & Lead Handling

## User-approved V1 form
- First name: required.
- Phone number: required.
- Email: optional.
- Subject: required.
- Message: required.

Do not add mandatory surname, budget, company name, service dropdown, or multi-step quote wizard.

## Routes and CTAs
- FR `/fr/contact#contact-form`; EN `/en/contact#contact-form`.
- All free-quote CTAs point to this form.
- No dedicated quote page and no popup form in V1.

## Validation and behavior
- Accessible labels, required indicators, useful inline errors.
- Trim and bound text lengths; validate phone plausibility without restricting exclusively to Moroccan numbers; email validate only when provided.
- Disable duplicate submissions while pending.
- Server-side validation and abuse prevention (honeypot/rate limiting), without exposing secrets.
- Success, error, retry and graceful fallback states in both languages.
- Do not claim a submission succeeded unless a configured backend accepted it.
- Store/send leads only through an explicitly configured and tested provider; fail safely if unconfigured. Avoid logging personal contact details.
- Privacy notice and consent language appropriate to the actual handling of submitted data.

## WhatsApp
- Persistent floating WhatsApp button on all routes, desktop and mobile.
- Open official `wa.me` URL using a configured number, with locale-appropriate prefilled greeting.
- Accessible name, clear focus state, mobile safe-area spacing, avoid obscuring content.
- If number not configured, do not show a broken button; flag configuration as required for launch.

## Future
Popup contact/quote form may be considered later, not part of V1.
