# Responsive Design & Accessibility

The Figma source has a desktop frame only; no verified mobile/tablet counterparts. Create intentional responsive designs.

## Responsive expectations
- Desktop: ~1200px content max-width; generous section spacing.
- Tablet: two-column grids as space permits; collapsible navigation.
- Mobile: one-column content, readable type, compact spacing, carefully composed hero images, full-width CTAs.
- Floating WhatsApp must respect safe-area and not overlap form controls or footer links.
- No horizontal page overflow.

## Accessibility
- Semantic landmarks, headings, labels, alt text and skip link.
- Keyboard navigation, visible focus, sufficient contrast.
- Accessible menu and language selector; proper `lang` attributes.
- Accessible form errors and live success/error messages.
- Reduced-motion support; pause or remove auto-marquees if implemented.
- Touch targets comfortably sized and no hover-only critical actions.

## Testing
At least 360px mobile, 768px tablet, 1440px desktop; test with keyboard, reduced motion, slow connection and both locales.
