/**
 * Quamar Abrar Portfolio — Verified Dataset & Intelligence Knowledge Base
 * Built to align with portfolio provenance, project archive, and design philosophy.
 */

export interface ProjectEntry {
  id: string
  title: string
  category: "desktop" | "mobile" | "packaging" | "poster"
  discipline: string
  year: string
  url?: string
  accent?: string
  tagline: string
  deliverables: string[]
  techStack: string[]
  metrics?: string
}

export interface ProfileData {
  name: string
  title: string
  currentCompany: string
  currentRole: string
  experience: string
  location: string
  ethos: string
  subEthos: string
  primaryEmail: string
  whatsappNumber: string
  whatsappDisplay: string
  whatsappUrl: string
  socialLinks: Array<{ label: string; url: string; platform: string }>
  philosophies: string[]
}

export const PROFILE_DATA: ProfileData = {
  name: "Quamar Abrar",
  title: "Graphic Designer & Creative Developer",
  currentCompany: "PW (Physics Wallah)",
  currentRole: "Product & Brand Designer",
  experience: "6+ months of intensive industry experience shaping digital products, campaigns, and identity systems at ed-tech scale",
  location: "Bengaluru, India",
  ethos: "Systems with soul. Ideas in motion.",
  subEthos: "Moving between structure and surprise — using geometry, type, and motion to make work that communicates before it decorates.",
  primaryEmail: "quamarabrar651@gmail.com",
  whatsappNumber: "919234566700",
  whatsappDisplay: "+91 9234566700",
  whatsappUrl: "https://wa.me/919234566700",
  socialLinks: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/quamar-abrar-7bb652381",
      platform: "linkedin",
    },
    {
      label: "Dribbble",
      url: "https://dribbble.com/quamar-abrar",
      platform: "dribbble",
    },
    {
      label: "Instagram",
      url: "https://www.instagram.com/lethargiccaveman",
      platform: "instagram",
    },
  ],
  philosophies: [
    "Bauhaus",
    "Swiss Modernism",
    "Constructivism",
    "Art Deco",
    "Memphis",
    "Brutalism",
    "Minimalism",
    "Maximalism",
    "Pop Art",
    "Psychedelia",
    "Surrealism",
    "Futurism",
    "Retro-futurism",
    "Grunge",
    "Wabi-sabi",
    "Editorial",
    "Kinetic Type",
    "Biomorphism",
  ],
}

export const PROJECT_LIBRARY: ProjectEntry[] = [
  {
    id: "summit",
    title: "Summit",
    category: "desktop",
    discipline: "Digital product",
    year: "2026",
    url: "https://summit.quamarabrar.xyz",
    accent: "#d7ff63",
    tagline: "High-altitude analytics interface balancing data density with Swiss typography.",
    deliverables: ["Product Architecture", "Design System", "Interactive Prototype", "React Code"],
    techStack: ["React 19", "Vite", "Tailwind CSS v4", "GSAP ScrollTrigger"],
    metrics: "Sub-second load times & zero layout shifts",
  },
  {
    id: "forme",
    title: "Forme",
    category: "desktop",
    discipline: "Identity & web",
    year: "2026",
    url: "https://forme.quamarabrar.xyz",
    accent: "#ff806a",
    tagline: "Sculptural brand identity with variable kinetic typography and spatial physics.",
    deliverables: ["Brand Identity Kit", "Design Tokens", "Interactive Canvas", "Responsive Web"],
    techStack: ["Variable Fonts", "Canvas Motion", "Vite", "TypeScript"],
    metrics: "18+ custom typographic responsive breakpoints",
  },
  {
    id: "muse",
    title: "The Muse Society",
    category: "desktop",
    discipline: "Editorial commerce",
    year: "2026",
    url: "https://themusesociety.quamarabrar.xyz",
    accent: "#f7c8dd",
    tagline: "Haute fashion-commerce platform bringing printed magazine layout pacing to modern browsers.",
    deliverables: ["Editorial Structure", "Commerce Experience", "Typography Direction"],
    techStack: ["CSS Grid", "Headless Commerce Patterns", "GSAP Transitions"],
    metrics: "Fluid scroll choreography with zero visual blind spots",
  },
  {
    id: "shift",
    title: "Shift",
    category: "desktop",
    discipline: "Digital experience",
    year: "2026",
    url: "https://shift.quamarabrar.xyz",
    accent: "#6fcf97",
    tagline: "Experimental spatial web experience examining fluidity and layout transitions.",
    deliverables: ["Creative Direction", "Micro-animations", "Front-end Architecture"],
    techStack: ["GSAP Timeline", "SVG Morphing", "React"],
    metrics: "60 FPS hardware-accelerated animations",
  },
  {
    id: "fold",
    title: "Fold",
    category: "desktop",
    discipline: "Product design",
    year: "2026",
    url: "https://fold.quamarabrar.xyz",
    accent: "#d7ff63",
    tagline: "Tactile card architecture based on origami spatial folds and fluid depth layers.",
    deliverables: ["UI/UX System", "Motion Choreography", "Web Scaffold"],
    techStack: ["CSS 3D Transforms", "React 19", "Tailwind CSS v4"],
    metrics: "Modular component hierarchy",
  },
  {
    id: "meridian",
    title: "Meridian",
    category: "desktop",
    discipline: "Web direction",
    year: "2026",
    url: "https://meridian.quamarabrar.xyz",
    accent: "#ff806a",
    tagline: "Avant-garde horology concept web direction with monochromatic precision.",
    deliverables: ["Art Direction", "Micro-interactions", "High-contrast Typography"],
    techStack: ["Parallax Scrubbing", "Vite", "Modern CSS"],
    metrics: "Editorial Swiss grid discipline",
  },
  {
    id: "warden",
    title: "Warden",
    category: "desktop",
    discipline: "Digital experience",
    year: "2026",
    url: "https://warden.quamarabrar.xyz",
    accent: "#b9e4c8",
    tagline: "Brutalist security telemetry dashboard with utilitarian clarity.",
    deliverables: ["Dashboard UI", "Real-time Telemetry Layout", "Dark Mode System"],
    techStack: ["Monospace Typography", "Telemetry Visualizations", "React"],
    metrics: "High information density without visual fatigue",
  },
  {
    id: "koma",
    title: "KOMA",
    category: "mobile",
    discipline: "Mobile ecosystem",
    year: "2026",
    accent: "#d7ff63",
    tagline: "Immersive anime & manga exploration ecosystem with 5 custom-engineered screens.",
    deliverables: ["Discover Screen", "Anime Details", "Manga Reader", "Manga Details", "Watch Screen"],
    techStack: ["iOS / Android Native Design", "Figma Token Systems", "Gesture Choreography"],
    metrics: "5 dedicated flow screens with custom dark-mode contrast",
  },
  {
    id: "veil-mobile",
    title: "VEIL Mobile",
    category: "mobile",
    discipline: "Quiet fashion commerce",
    year: "2026",
    accent: "#f7c8dd",
    tagline: "Understated luxury commerce mobile system with editorial serif pacing.",
    deliverables: ["Home Experience", "Editorial Onboarding", "Product Details", "Curated Shop"],
    techStack: ["Mobile UX", "Design Systems", "Editorial Micro-interactions"],
    metrics: "Zero clutter, single-thumb ergonomics",
  },
  {
    id: "aurel-ember",
    title: "Aurel & Ember",
    category: "packaging",
    discipline: "Physical packaging",
    year: "2026",
    accent: "#ff806a",
    tagline: "Bespoke fragrance bottle, gift carton, and luxury brand presentation.",
    deliverables: ["Bottle Label & Silk Screen Specs", "Debossed Gift Carton", "Presentation Collateral"],
    techStack: ["Industrial Print Preparation", "Foil Stamping Specs", "Pantone Matching"],
    metrics: "Museum-grade physical packaging finish",
  },
  {
    id: "poster-series",
    title: "International Poster Series",
    category: "poster",
    discipline: "Print & Typographic Edition",
    year: "2026",
    accent: "#d7ff63",
    tagline: "6 commissioned printed posters spanning editorial, pop culture, and constructivist commentary.",
    deliverables: [
      "01 / VEIL (Fashion Monograph)",
      "02 / RE:CODE (Techno-futurism)",
      "03 / Sabrina Carpenter (Pop Iconography)",
      "04 / Red Bull — Flat Out (Kinetic Motorsport)",
      "05 / The Corporate Gamble (Constructivism)",
      "06 / Ghulam Ali (Classical Heritage)",
    ],
    techStack: ["Kinetic Typography", "Constructivist Grid", "Large Format Print"],
    metrics: "6 museum-quality print editions",
  },
]

export interface TrustPillar {
  number: string
  title: string
  subtitle: string
  description: string
  evidence: string
}

export const TRUST_PILLARS: TrustPillar[] = [
  {
    number: "01",
    title: "Active Industry Proof",
    subtitle: "Product Designer at PW (Physics Wallah)",
    description: "Quamar isn’t a theorist. He actively designs at PW (one of India’s top tech unicorns), crafting scalable UI, product architectures, and brand campaigns that serve millions of students daily.",
    evidence: "6+ months of verified high-impact production experience in Bengaluru, India.",
  },
  {
    number: "02",
    title: "Verified Live Artifacts",
    subtitle: "7 Live Deployed Websites & 2 Mobile Systems",
    description: "Every desktop project in this portfolio is a real, live URL you can visit, inspect, and benchmark right now. Zero mockup vaporware or placeholder designs.",
    evidence: "7 live production domains on .xyz plus published physical packaging and print editions.",
  },
  {
    number: "03",
    title: "Single-Screen Philosophy",
    subtitle: "Clarity over Clutter, Zero Blind Spots",
    description: "Quamar operates on the uncompromising principle that an interface should communicate instantly without requiring user scavenger hunts. Layouts are engineered to be clear, fluid, and ergonomically whole.",
    evidence: "Obsessive responsive craftsmanship and 18 aesthetic movements mastered.",
  },
  {
    number: "04",
    title: "Strict Financial & Delivery Guarantee",
    subtitle: "Strict $100 to $3,000 Scope · Milestone Delivery",
    description: "No ambiguous hourly bloat. Every project has a locked scope, transparent milestone schedule, and direct line of communication to Quamar on WhatsApp (+91 9234566700) and email.",
    evidence: "Milestone-based progress: Blueprint approved → High-fi prototype → Clean code → Handover.",
  },
]

export interface ServiceTierConfig {
  id: "design" | "design_build" | "design_build_marketing"
  code: string
  title: string
  rangeLabel: string
  minPrice: number
  maxPrice: number
  recommendedBase: number
  timeline: string
  summary: string
  deliverables: string[]
  techHighlights: string[]
}

export const SERVICE_TIERS: Record<string, ServiceTierConfig> = {
  design: {
    id: "design",
    code: "01",
    title: "Design Only",
    rangeLabel: "$100 – $800",
    minPrice: 100,
    maxPrice: 800,
    recommendedBase: 350,
    timeline: "4 – 8 business days",
    summary: "Visual identity, user experience, typography hierarchy & interactive Figma prototype.",
    deliverables: [
      "Custom UI/UX & Responsive Layouts (Desktop & Mobile)",
      "High-Fidelity Interactive Figma Prototype",
      "Typography Scale & Design Tokens (JSON / CSS variables)",
      "Component Specification & Asset Export Package",
    ],
    techHighlights: ["Figma Enterprise", "Design Tokens", "Custom Typography Grid"],
  },
  design_build: {
    id: "design_build",
    code: "02",
    title: "Design + Build",
    rangeLabel: "$750 – $2,000",
    minPrice: 750,
    maxPrice: 2000,
    recommendedBase: 1250,
    timeline: "8 – 14 business days",
    summary: "Complete design crafted into clean, production-ready, performant frontend code.",
    deliverables: [
      "Everything in Design Only tier",
      "Production React 19 / TypeScript / Vite Architecture",
      "Fluid GSAP ScrollTrigger Motion & Kinetic Typography",
      "Mobile-First Ergonomics with 95+ Lighthouse Score",
      "Domain Setup, CI/CD Deployment & Clean Code Handover",
    ],
    techHighlights: ["React 19", "Vite", "Tailwind CSS v4", "GSAP", "TypeScript"],
  },
  design_build_marketing: {
    id: "design_build_marketing",
    code: "03",
    title: "Design + Build + Marketing",
    rangeLabel: "$1,500 – $3,000",
    minPrice: 1500,
    maxPrice: 3000,
    recommendedBase: 2350,
    timeline: "14 – 22 business days",
    summary: "End-to-end digital product launch: identity, development, technical SEO & launch campaign.",
    deliverables: [
      "Everything in Design + Build tier",
      "Technical SEO & Structured Schema Architecture",
      "Social Sharing OpenGraph Cards & Launch Asset Suite",
      "High-Converting Landing Funnel Optimization",
      "Analytics Integration & Post-Launch Support",
    ],
    techHighlights: ["Full Stack Launch", "Technical SEO", "Conversion Rate Optimization"],
  },
}

export interface AddonConfig {
  id: string
  code: string
  title: string
  cost: number
  description: string
  badge: string
}

export const ADDON_MODULES: AddonConfig[] = [
  {
    id: "motion",
    code: "M01",
    title: "GSAP & Kinetic Motion System",
    cost: 150,
    description: "Bespoke scroll-driven choreography, micro-interactions, and kinetic type.",
    badge: "+$150",
  },
  {
    id: "branding",
    code: "B02",
    title: "Full Brand Identity System",
    cost: 250,
    description: "Logo suite, color theory, typographic hierarchy, and style guide book.",
    badge: "+$250",
  },
  {
    id: "express",
    code: "E03",
    title: "7-Day Priority Rush Delivery",
    cost: 200,
    description: "Dedicated sprint bypass with guaranteed delivery in 7 business days.",
    badge: "+$200",
  },
  {
    id: "growth",
    code: "G04",
    title: "SEO & Launch Growth Engine",
    cost: 150,
    description: "Meta OpenGraph, sitemap, performance auditing, and social launch graphics.",
    badge: "+$150",
  },
]
