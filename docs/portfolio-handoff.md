# Quamar Abrar Portfolio — Handoff

## Visual tokens

- Display/UI: Alata
- Editorial accent: Cardo
- Base palette: deep green `#0b3b2e`, core green `#196a4e`, paper `#f1eddd`
- Accents: acid `#d7ff63`, coral `#ff806a`, pink `#f7c8dd`
- Breakpoints: mobile under 560px, touch/tablet under 900px, full choreography from 900px

## Motion system

GSAP is the only runtime animation library. ScrollTrigger manages viewport choreography; native scrolling remains authoritative. Timelines are scoped with `gsap.context()` and desktop-only effects use `gsap.matchMedia()`.

The preloader uses one Canvas render loop and a single normalized GSAP progress value. It currently uses 160 deterministic fragments on desktop and 82 on mobile. It replays on every full page refresh, exposes Skip after one second, and bypasses the swarm when reduced motion is requested.

## Asset mapping

The supplied bundle includes Quamar's transparent portrait, mobile screens,
poster artwork, and Aurel & Ember packaging images. Optimized WebP assets are
used at runtime; original files are retained alongside them. The portrait is
wired into the hero from the 1170 × 1219 original image, masked with the
transparent cutout; the cutout also supplies the preloader silhouette.
Desktop website cards embed the project URLs in `src/data.ts`.

- Mobile screen, poster, and packaging assets are mapped in `src/data.ts`.
- Social destinations are configured in `src/data.ts`: LinkedIn,
  Dribbble, and Instagram.
- The contact email is currently `hello@quamar.design`; replace it with the
  approved address if needed.

All replacements should include descriptive alt text, dimensions, and WebP/AVIF variants where source quality permits.

## Interaction profiles

- Desktop: full preloader density, scroll-linked portrait and device depth, custom cursor, magnetic links.
- Touch/tablet: reduced particle count, no custom cursor, no pinned scroll, explicit showcase controls.
- Reduced motion: immediate branded entrance, no particle swarm, no parallax or scrub behavior.

## Live-site embeds

Desktop project cards load their live URLs in scaled iframes, and selecting a
card opens a larger interactive preview with an external site link. Cross-origin
iframe availability depends on each project's hosting configuration.
