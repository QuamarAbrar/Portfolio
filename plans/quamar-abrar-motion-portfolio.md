# Quamar Abrar Portfolio — Production Website and Motion Handoff Plan

## 1. Goal and success criteria

Build a production-ready, single-page React portfolio for Quamar Abrar, a Bengaluru-based graphic designer at PW (Physics Wallah) with 6+ months of industry experience. The site must feel authored as a motion-led editorial object rather than a conventional card grid.

The result is successful when:

- The first visit opens with a cinematic preloader in which visual fragments representing the exact 18 design philosophies from Quamar's portfolio book swarm like butterflies, combine into the silhouette of his portrait, resolve into a mosaic, dissolve, and reveal the clean cutout portrait.
- The hero, Selected Work, About/Credibility, and Contact sections form a clear trust-first narrative with F-pattern eye guidance.
- Six desktop websites, two mobile UI projects, six poster projects, and one packaging project are all represented with the supplied production assets and copy.
- Motion is extravagant and distinctive on capable desktop devices, but remains smooth, content-safe, responsive, and accessible.
- GSAP is the only production animation runtime. `motion-ai` is an optional pre-implementation ideation/generation tool and ships no browser code.
- The site remains understandable and complete if animation, iframes, storage, or optional media fail.
- The implementation includes a concise motion/design handoff specification documenting tokens, timelines, responsive adaptations, and asset mapping.

## 2. Confirmed product decisions

- Visual direction: portfolio brand first; do not import the unrelated generic navy/teal/coral “Launch faster” direction.
- Typography: Alata for display/UI and Cardo for editorial/body accents.
- Palette: use the refined green identity from the supplied portfolio book; derive exact values from the source and encode them as named CSS tokens rather than inventing a parallel palette.
- Architecture: one scrolling page with anchored navigation; no project-detail routes.
- Deliverables: production website plus handoff specification.
- Hero-to-work transition: soft masked handoff.
- Desktop projects: live embeds with supplied visual fallbacks and external links.
- Contact: email CTA plus supplied social links; no form backend.
- Motion: adaptive spectacle—full choreography on capable desktops, simplified behavior on touch/smaller/lower-power contexts, and a reduced-motion path.
- Preloader: approximately 3.5–4.5 seconds, appears once per browser session, and offers a subtle Skip control after one second.
- Preloader source: exact 18 design philosophies from Quamar's portfolio book, each briefly labeled.
- Preloader portrait: use both a supplied high-resolution transparent cutout and original portrait.
- Preloader transition: mosaic silhouette to clean cutout portrait.

## 3. Required input bundle and manifest contract

Implementation begins by unpacking and validating the promised ZIP. Do not substitute stock imagery for missing portfolio work. The ZIP should contain:

- The portfolio book/reference document containing the exact 18 design philosophies and established color/typographic language.
- A manifest in JSON or CSV with stable IDs, display names, categories, captions, years, roles, external URLs, and asset paths.
- Portrait: original high-resolution image and production-quality transparent PNG or WebP cutout.
- Six desktop project cover/fallback images and live URLs: Summit, Forme, The Muse Society, Shift, Fold, Meridian.
- KOMA: five ordered mobile screens.
- VEIL: four ordered mobile screens.
- Six poster files: VEIL, RE:CODE, Sabrina Carpenter, Red Bull “Flat Out,” The Corporate Gamble, Ghulam Ali.
- Aurel & Ember packaging/label assets, including label flats and any supplied product/editorial photography.
- Final bio, project captions, role/company phrasing, resume file, email address, and social URLs.
- Logo/wordmark, favicon, and social preview image if available.
- Exact `motion-ai` package/repository reference. Treat it as an offline ideation input only; if it cannot be verified or run in this environment, proceed with the authored GSAP specification rather than blocking production or adding an unknown dependency.

Normalize image filenames and create responsive WebP/AVIF derivatives only where the source quality supports them. Preserve originals outside the runtime asset path if needed for handoff. Record source dimensions and intended crop/focal point in the handoff spec.

## 4. Technical foundation

### Dependencies

- Keep React 19, Vite 8, TypeScript, Tailwind CSS v4, and the existing Figma Make setup.
- Use the repository's pnpm toolchain and lockfile; add `gsap` with pnpm even though the conceptual request was phrased as `npm install gsap`.
- Do not add Motion/Motion.dev, Framer Motion, Lenis, Three.js, Swiper, or a second animation runtime.
- Do not add a router for the single-page site.
- Use GSAP core plus package-provided plugins only where needed: ScrollTrigger for scroll choreography and optionally Flip/Observer for state transitions or pointer gestures. Register plugins once in a browser-safe motion module.

### Proposed source structure

- `src/App.tsx`: page shell, section order, skip link target, and global state boundaries.
- `src/components/Header.tsx`: compact anchored navigation and availability/status treatment.
- `src/components/Preloader.tsx`: session gate, asset decode, skip/failure behavior, Canvas field, philosophy labels, and handoff.
- `src/components/Hero.tsx`: identity statement, role/location, portrait, and primary work/contact actions.
- `src/components/SelectedWork.tsx`: category rhythm and project data orchestration.
- `src/components/DesktopProject.tsx`: MacBook frame, screenshot-first state, on-demand iframe, timeout/fallback controls.
- `src/components/PhoneShowcase.tsx`: KOMA/VEIL screen sequences in iPhone-style frames.
- `src/components/PosterShowcase.tsx`: six poster pieces in iPad-style frames.
- `src/components/PackagingShowcase.tsx`: Aurel & Ember editorial spread.
- `src/components/About.tsx`: bio, PW credibility, capabilities, and resume action.
- `src/components/Contact.tsx`: email-led closing statement and social links.
- `src/components/CustomCursor.tsx`: desktop fine-pointer cursor, disabled elsewhere.
- `src/hooks/useGsapContext.ts`: StrictMode-safe GSAP context setup/revert.
- `src/hooks/useMotionProfile.ts`: reduced-motion, pointer type, viewport, and optional conservative performance profile.
- `src/data/portfolio.ts`: typed content and ordered asset mapping derived from the manifest.
- `src/lib/motion.ts`: plugin registration, reusable eases, durations, stagger scales, and media-query profiles.
- `src/lib/preloaderField.ts`: portrait-mask sampling, deterministic particle target generation, and Canvas drawing.
- `src/index.css`: Tailwind import, Google font import, theme tokens, global defaults, selection/focus styles, device shells, and reduced-motion safeguards.
- `.figma/make/site.json`: final title, description, language, social image, icon, robots setting, and accessibility bypass-link option.
- `docs/portfolio-handoff.md`: final content map, design tokens, motion timings, responsive rules, and replacement instructions.

Components may be consolidated if the final implementation remains readable; avoid a monolithic `App.tsx` and avoid abstractions with only cosmetic value.

## 5. Content and page architecture

### Header

- Left: restrained Quamar Abrar wordmark/monogram.
- Right: anchored Work, About, and Contact links plus a small availability/status signal if supported by final content.
- Initially transparent over the hero; compact into a green/ivory glass or solid rail only after leaving the hero.
- Keep keyboard focus clear and never hide navigation solely behind hover.

### Hero

Use an asymmetrical F-pattern composition:

- Top horizontal scan: name/wordmark, concise role statement, location, and navigation.
- Strong left vertical: oversized editorial headline identifying Quamar as a graphic designer shaping identities, interfaces, and visual stories. Final wording must use supplied approved copy.
- Secondary Cardo line provides humanity and editorial contrast.
- Right/lower field: the same clean cutout portrait handed off from the preloader, integrated with geometric green forms rather than placed as a disconnected headshot.
- Primary action scrolls to Selected Work; secondary action reaches Contact or resume.
- Include a restrained project/count or discipline index to establish breadth immediately.

### Selected Work

Order the work to vary scale and tempo rather than showing four homogeneous grids:

1. Desktop UI opening sequence: Summit, Forme, The Muse Society.
2. Mobile UI interlude: KOMA and VEIL.
3. Desktop UI continuation: Shift, Fold, Meridian.
4. Poster gallery: VEIL, RE:CODE, Sabrina Carpenter, Red Bull “Flat Out,” The Corporate Gamble, Ghulam Ali.
5. Aurel & Ember packaging finale.

Use section indices, short role/category captions, and deliberate negative space to sustain F-pattern scanning. The implementation may adjust individual project order only if the portfolio book explicitly defines a stronger sequence; document the final order in the handoff.

### About / credibility

- State Bengaluru, India and current role at PW (Physics Wallah).
- Explicitly say “6+ months of industry experience” unless the supplied final copy updates the duration.
- Pair concise biography with capability clusters, working principles, and a resume action.
- Use proof-oriented hierarchy; avoid inflated metrics or invented clients.

### Contact footer

- Large email-led closing line with copy-to-clipboard and `mailto:` behavior.
- Approved social links: LinkedIn (`https://www.linkedin.com/in/quamar-abrar-7bb652381`), Dribbble (`https://dribbble.com/quamar-abrar`), and Instagram (`https://www.instagram.com/lethargiccaveman`).
- Local time/location line if desired from approved content; do not add live availability claims without source text.
- Closing motion should settle rather than compete with the email CTA.

## 6. Visual system

- Extract the exact refined green palette from the portfolio book and map it to semantic tokens such as `--ink`, `--paper`, `--green-deep`, `--green-core`, `--green-soft`, `--line`, and `--accent`. Validate text/background pairs against WCAG contrast.
- Use warm ivory/paper neutrals so green reads as authored rather than generic SaaS teal.
- Load Alata and Cardo through a Google Fonts CSS2 import at the top of `src/index.css`; supply robust system fallbacks and avoid layout shift by preconnecting in `index.html` if appropriate.
- Alata: headings, navigation, numbers, controls, project labels.
- Cardo: supporting statements, selected captions, quotations, editorial contrast—not every paragraph.
- Build an intentional responsive type scale using `clamp()` and an 8px-based spacing rhythm with optical exceptions for display composition.
- Use geometric frames, rules, circles, masks, and crop windows to express geometric vision and implied motion. Do not use arbitrary rounded SaaS cards, gradients without a role, emoji, or decorative icon packs.
- Device frames should be CSS/SVG constructions with supplied content placed inside; keep them refined and secondary to the work.

## 7. Motion architecture and interaction principles

### Runtime ownership

GSAP owns all time-based production motion. CSS handles static hover/focus states and tiny non-sequenced transitions. React owns semantic state. Canvas 2D handles the dense preloader particle field. This division prevents competing animation systems.

All GSAP timelines must:

- Be created in scoped `gsap.context()` blocks and reverted on cleanup to survive React StrictMode.
- Animate transforms and opacity where possible.
- Avoid layout thrashing; cache geometry on setup and refresh intentionally after fonts/media decode.
- Use named motion tokens and authored custom eases rather than one-off magic numbers.
- Use `gsap.matchMedia()` for desktop, touch/small-screen, and reduced-motion variants.
- Avoid scroll hijacking and scroll-jacking. Native document scroll remains authoritative.

### Motion vocabulary

- **Geometric vision:** crop windows, rules, masks, modular grids, and precise transform origins.
- **Implied motion:** diagonal entries, offset alignment, directional typography, and staggered depth.
- **Cognitive rhythm:** alternate dense and quiet sections; do not animate every element simultaneously.
- **Temporal flow:** each exit seeds the next entrance, especially portrait-to-hero and hero-to-work transitions.
- **Tactile interaction:** magnetic links, responsive device tilt, cursor labels, press compression, and drag/swipe affordances—but each interaction must have a keyboard/touch equivalent.

## 8. Preloader choreography

### Visual construction

Use a Canvas/DOM hybrid rather than hundreds of React DOM nodes:

- Read the exact 18 philosophy names and visual cues from the portfolio book.
- Create one small style “species” per philosophy: a deterministic palette, geometry, line behavior, texture, and typographic fragment based on the book. Each species contributes approximately 6–12 lightweight particles/sprites, yielding roughly 140–180 fragments on capable desktop, 70–100 on mobile, and none in reduced-motion mode.
- Render the dense fragment field on a single Canvas. Overlay 18 accessible DOM labels, one per philosophy, only during its readable beat.
- Do not reproduce copyrighted third-party artworks as full miniatures; use the portfolio book's own work or abstract visual cues.

### Portrait-mask algorithm

1. Decode the transparent portrait cutout before choreography begins, with a hard timeout.
2. Draw its alpha channel to an offscreen canvas at a bounded resolution.
3. Sample opaque pixels on a responsive grid, then choose an even deterministic subset of target points. Seed the random generator so the sequence is stable across rerenders.
4. Assign philosophy particles across the sampled targets so all 18 styles remain distributed through the final silhouette rather than clumping by source order.
5. Calculate and cache start positions, one or two curved waypoints, target positions, rotations, scales, wing-flutter phase, and dissipate vectors. Animate one normalized GSAP progress value and interpolate in the Canvas draw loop rather than creating hundreds of independent GSAP tweens.
6. Stop the requestAnimationFrame/GSAP ticker immediately after handoff or skip.

### Timeline: target 3.5–4.5 seconds

- **0.00–0.35s — establish:** opaque deep-green/ivory field, minimal name/index signal, portrait target still hidden.
- **0.20–1.75s — philosophy arrivals:** 18 species enter from viewport edges in overlapping cohorts. Their labels flash for roughly 300–500ms in a readable but fast sequence. Motion resembles butterfly flocking through curved paths and alternating “wing” scale, not literal butterfly illustrations.
- **1.25–2.75s — convergence:** cohorts orbit, tighten, and settle into sampled portrait-mask targets. Spatial audio is out of scope unless explicitly supplied and approved.
- **2.65–3.25s — mosaic lock:** the assembled multistyle silhouette becomes momentarily legible; labels collapse into a single Quamar Abrar identity mark.
- **3.10–3.75s — portrait resolve:** the clean cutout portrait crossfades beneath the mosaic while fragments desaturate/shrink or peel outward. Keep enough overlap to avoid a visible pop.
- **3.55–4.35s — site handoff:** transfer the portrait visually into its hero position, reveal hero typography in a coordinated F-pattern sweep, then remove the preloader overlay from the accessibility tree and DOM.

### Preloader behavior and failure modes

- Gate with a versioned `sessionStorage` key such as `qa-preloader-v1`; catch storage access exceptions.
- On the same session, skip the full loader and run only a brief 350–600ms hero/portrait entrance.
- Show a keyboard-focusable Skip control after one second. Skip must accelerate to the clean portrait/handoff state, not abruptly blank the screen.
- If portrait decode or Canvas setup fails, show a short branded CSS entrance and continue; never trap users on a loader.
- Set a hard maximum loader lifetime around five seconds even on failed media.
- Lock body scrolling only while the overlay is active, preserve the initial scroll position, and restore overflow on completion, skip, failure, or component cleanup.
- Under `prefers-reduced-motion: reduce`, do not run the swarm. Show the clean portrait and hero with a short opacity transition or immediately; content must not wait 4 seconds.
- Keep labels decorative to screen readers (`aria-hidden`) and provide one concise live/status message such as “Opening Quamar Abrar's portfolio,” avoiding 18 rapid announcements.

## 9. Section-specific motion and interactions

### Hero

- Preloader handoff reuses the portrait's final viewport geometry to avoid a visual reset.
- Headline lines reveal through geometric masks from the left; metadata follows in a shorter stagger.
- Pointer movement creates a bounded, low-amplitude portrait/parallax response on fine pointers only.
- A subtle kinetic index/rule indicates scroll direction without an infinite attention-stealing loop.
- Scroll begins separating portrait, geometry, and type at different rates, but all essential text remains readable.

### Soft masked handoff to Selected Work

- As the hero approaches its end, a green geometric mask grows from a hero rule/shape and becomes the Selected Work background or first project viewport.
- “Selected Work” locks briefly while the first MacBook frame enters through that mask.
- Use ScrollTrigger with a modest pinned interval only on capable desktop. On touch/mobile, use a normal flow reveal with no long pin.
- Ensure direct anchor navigation lands on real content, not the middle of a pinned transform state.

### Desktop website projects

- Render a high-quality supplied cover screenshot immediately inside a CSS/SVG MacBook frame.
- Use screenshot-first/on-demand embedding: load the cross-origin iframe only after the user activates “Explore live preview.” This protects load performance and avoids six background sites running simultaneously.
- Keep the fallback screenshot behind the iframe. Show loading state, a “Return to preview” control, and an always-available “Visit live site” link.
- Because browsers cannot reliably inspect cross-origin `X-Frame-Options`/CSP failures, do not claim perfect automatic detection. Use an 8–10 second timeout to present a graceful fallback message and external-link action, while still allowing retry.
- Pause/unmount offscreen iframes when practical so embedded sites do not dominate CPU and memory.
- Desktop hover may add a bounded perspective tilt and cursor action label. Keyboard focus uses a stable outline and no tilt. Touch uses explicit controls.

### Mobile UI projects

- KOMA contains exactly five supplied screens; VEIL exactly four.
- Use iPhone 14 Pro Max-inspired frames without trademark-heavy decorative detail.
- Desktop interaction: horizontal scrub or controlled drag with snap and visible progress; do not make horizontal wheel capture mandatory.
- Mobile interaction: native-feeling swipe/snap with Previous/Next controls and a text counter.
- Screens enter with depth and overlap, but never reduce artwork legibility.

### Poster showcase

- Present six posters in iPad-style frames with an editorial wall/contact-sheet rhythm, not six identical carousel slides.
- Active poster can enlarge or rotate into a reading plane using GSAP Flip; retain explicit controls, titles, and count.
- Use restrained frame motion so poster typography and composition remain the focal point.

### Aurel & Ember

- Treat packaging as an editorial finale: large label detail, material/color swatches, oversized project title, and layered supplied pack/product views.
- Scroll can peel a label flat into a packaging view through masks and transform continuity. Do not fake a 3D package if only flat label assets are provided; instead use a high-quality 2D editorial composition and document the limitation.

### Microinteractions

- Fine-pointer custom cursor with context labels (“View,” “Drag,” “Email”) and subtle trailing geometry; disable for touch, reduced motion, form controls, and if pointer tracking becomes stale.
- Magnetic primary links stay within a small radius and snap back with an authored elastic ease.
- Buttons/links use press compression and directional underlines.
- Email copy action gives visible and screen-reader feedback, with fallback when Clipboard API is unavailable.

## 10. Responsive and performance strategy

Define three behavior profiles rather than only shrinking desktop:

- **Capable desktop/fine pointer:** full preloader density, layered hero parallax, short pins, perspective hover, custom cursor.
- **Touch/small screen:** fewer particles, no cursor, no hover-only content, no long pins, simplified parallax, explicit carousel controls, normal-flow section transitions.
- **Reduced motion/conservative:** no swarm, no scrub/pin/parallax, immediate content, simple opacity/color feedback only.

Performance requirements:

- Keep Canvas rendering resolution capped by device pixel ratio (for example at 1.5–2) and responsive particle counts.
- Use a single animation loop for preloader particles and stop it after completion.
- Lazy-load below-fold images and iframes; preload only hero/preloader-critical portrait assets and required fonts.
- Reserve image aspect ratios to prevent layout shift.
- Use responsive images with `srcset`/`sizes` where derivatives exist.
- Avoid animating blur, large box shadows, or layout properties continuously.
- Refresh ScrollTrigger only after critical fonts and image geometry settle; debounce resize/rebuild work.
- Use semantic HTML even when visual order is layered.

## 11. Accessibility and resilience

- Add a working skip-to-content link and semantic landmarks: header/nav/main/sections/footer.
- Keep all controls keyboard operable and visibly focused.
- Carousels/slideshows expose labels, current count, and Previous/Next buttons; dragging is supplemental.
- Device mockups use meaningful alt text derived from approved project captions; decorative frames are hidden from assistive technology.
- Do not rapidly announce preloader philosophy labels.
- Ensure no essential meaning appears only on hover, through motion, or inside an iframe.
- External links indicate that they open a new context and use safe `rel` attributes.
- If JavaScript animation initialization fails, CSS layout still displays all sections and assets in document order.
- Respect color contrast, reduced-motion preference, text zoom, and 320px viewport width.

## 12. Data interfaces

Use typed data so display order and asset replacement do not live in JSX. A practical model includes:

- `SiteProfile`: name, role, location, employer, experience, bio, email, resume, social links.
- `DesktopProject`: stable ID, title, year, role, summary, cover sources/alt, live URL, optional accent.
- `MobileProject`: stable ID, title, platform/frame label, ordered screens with alt text.
- `PosterProject`: stable ID, title, year, image sources/alt, optional caption.
- `PackagingProject`: title, summary, ordered editorial assets, label details, alt text.
- `DesignPhilosophy`: stable ID, exact book name, short cue, palette/shape/texture parameters, source-page reference.

Validate manifest counts during implementation: 6 desktop, KOMA 5 screens, VEIL 4 screens, 6 posters, 1 packaging project, and 18 philosophies. Fail visibly during development if counts or paths are wrong rather than silently omitting work.

## 13. Metadata and production details

Update `.figma/make/site.json` with approved values:

- Title such as `Quamar Abrar — Graphic Designer`.
- Concise description mentioning graphic design, digital experiences, and Bengaluru.
- Language `en`.
- Supplied favicon and social preview asset.
- Robots indexing enabled only when launch-ready.
- Accessibility bypass links enabled if compatible with the in-app skip link.

Use descriptive section IDs for anchored navigation. Preserve Vite's configured public base path for all assets; avoid root-hardcoded URLs that break Figma deployment paths.

## 14. Verification plan

Follow repository guidance: do not start another development server. Use the existing Figma Make server/hot reload for visual work. Run checks proportionate to this broad implementation.

### Static and build checks

- Run the repository formatter through its documented entry point after implementation.
- Run the production build because this is a broad multi-file change with a new dependency and Canvas/GSAP code.
- Resolve all TypeScript/build errors, missing assets, malformed URLs, and apostrophe/string issues.

### Functional checks

- Fresh session: full preloader runs, Skip appears at one second, portrait silhouette resolves, hero handoff completes, and scrolling unlocks.
- Same session: full preloader does not replay; brief hero entrance runs.
- Storage blocked: site still enters successfully.
- Portrait decode/Canvas failure: fallback entrance completes within the maximum timeout.
- Reduced motion: no swarm, pinning, parallax, or cursor; all content appears promptly.
- Keyboard-only: skip loader, use nav, operate all showcases, load/exit iframe states, copy/open email, and reach every link.
- Live embed allowed, blocked, slow, and offline: screenshot and external link remain usable in every case.
- Clipboard unavailable: email action falls back gracefully.

### Responsive and visual checks

Review at representative 320px mobile, modern phone, tablet, laptop, and wide desktop sizes:

- No clipped display type or portrait.
- F-pattern hierarchy remains clear.
- Device frames preserve supplied asset ratios.
- KOMA has 5 screens and VEIL has 4 in the correct order.
- All 6 desktop projects, 6 posters, and Aurel & Ember are present.
- All 18 philosophy labels are represented in the preloader without unreadable overlap.
- Touch layout has no hover dependency or trapped horizontal scrolling.
- Anchor navigation does not land inside broken pinned states.

### Motion/performance checks

- Watch the complete preloader and every scroll timeline at least once; rendering without errors is not sufficient.
- Test repeated resize/orientation changes for duplicate GSAP timelines or stale Canvas geometry.
- Confirm GSAP contexts and ticker callbacks are cleaned up under React StrictMode.
- Inspect for layout shifts, sustained offscreen iframe activity, dropped frames, and runaway memory after the loader completes.
- Verify the portrait-mask target remains recognizable across aspect ratios and that fragment density scales down cleanly.

## 15. Handoff specification

Create `docs/portfolio-handoff.md` alongside implementation containing:

- Final palette, type scale, spacing scale, breakpoints, and component inventory.
- The exact 18 philosophy names, source references, and visual cue mapping.
- Preloader timeline table, particle counts by profile, mask sampling logic, skip/session/failure behavior.
- GSAP motion tokens, eases, ScrollTrigger start/end positions, and responsive substitutions.
- Final project order, asset paths, external URLs, fallback covers, and alt text.
- Instructions for replacing portrait/project assets without breaking aspect ratios or mask generation.
- Known iframe restrictions and the screenshot-first fallback model.
- Accessibility and reduced-motion behavior.
- Commands actually used for dependency installation, formatting, and production verification.

## 16. Explicit non-goals

- No multi-page case studies or router.
- No CMS, authentication, analytics, database, or contact-form backend.
- No audio by default.
- No stock photography when the supplied portfolio/portrait assets cover the content.
- No forced smooth scrolling or scroll hijacking.
- No runtime `motion-ai` dependency and no second animation library.
- No fabricated project metrics, testimonials, clients, awards, availability, or 3D packaging assets.
