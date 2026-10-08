# Design System — WEBYTE-Inspired

## Source and fidelity
Inspect Figma node `291:711` via Figma MCP before implementation. Use `get_design_context` for actual implementation, not only metadata. Preserve the visual direction, not WEBYTE brand copy or false proof.

## Confirmed source values
- Canvas: 1440px desktop; principal content ~1200px, 120px side margins.
- Main background `#000000`; text `#FFFFFF`; muted text `#9B9EA0`.
- Card background `#1A242C`, sometimes ~60% opacity.
- Bright blue `#56A6D8`; mint accents `#75F8D2` (also approx `#58E6A6`).
- Gradient: mint to blue, sometimes returning to mint.
- Atmospheric background: five oversized blue blurred ellipses (~1643×1755px, ~10% opacity, ~500px blur).
- Typical section gap ~120px desktop; card padding ~25–32px.
- Card radii generally ~24–35px; pill buttons ~100px.
- Minimal shadows; dark cards, outlined secondary controls.
- Source mixes Poppins, Plus Jakarta Sans and Source Sans Pro; normalize to a single coherent primary font, with any secondary font justified.

## Implementation rules
- Build shared tokens for colors, spacing, typography, radii, and button variants.
- Keep dark theme for V1; no unsolicited light mode.
- Strong legibility and keyboard focus, AA contrast wherever feasible.
- Use subtle, reduced-motion-aware hover/entrance effects; avoid expensive full-screen blur animation.
- Preserve distinctive fanned three-image hero composition where feasible, with graceful mobile alternative.
- Responsive breakpoints and hover states must be designed; no matching mobile Figma was found.
- Use optimized licensed images and SVG icons; do not assume assets embedded in Figma are cleared for commercial reuse.
- Create original Klick Trick logo treatment only from supplied/approved brand assets; otherwise use a clean text wordmark placeholder clearly marked as provisional.
