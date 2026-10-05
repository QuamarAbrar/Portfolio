import komaDiscover from "./assets/optimized/mobile/koma/01-discover.webp"
import komaAnime from "./assets/optimized/mobile/neon-ronin/01-anime.webp"
import komaReader from "./assets/optimized/mobile/neon-ronin/02-reader.webp"
import komaManga from "./assets/optimized/mobile/neon-ronin/03-manga.webp"
import komaWatch from "./assets/optimized/mobile/neon-ronin/04-watch.webp"
import veilHome from "./assets/optimized/mobile/veil/01-home.webp"
import veilOnboarding from "./assets/optimized/mobile/veil/02-onboarding.webp"
import veilProduct from "./assets/optimized/mobile/veil/03-product.webp"
import veilShop from "./assets/optimized/mobile/veil/04-shop.webp"
import packagingBottle from "./assets/optimized/packaging/01-bottle.webp"
import packagingCarton from "./assets/optimized/packaging/02-carton.webp"
import packagingPresentation from "./assets/optimized/packaging/03-presentation.webp"
import posterVeil from "./assets/optimized/posters/01-veil.webp"
import posterRecode from "./assets/optimized/posters/02-recode.webp"
import posterSabrina from "./assets/optimized/posters/03-sabrina.webp"
import posterRedbull from "./assets/optimized/posters/04-redbull.webp"
import posterCorporate from "./assets/optimized/posters/05-corporate.webp"
import posterGhulam from "./assets/optimized/posters/06-ghulam.webp"

export const philosophies = [
  "Bauhaus",
  "Swiss",
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
] as const

export const socialLinks = [
  {
    label: "LinkedIn",
    icon: "linkedin",
    url: "https://www.linkedin.com/in/quamar-abrar-7bb652381",
  },
  {
    label: "Dribbble",
    icon: "dribbble",
    url: "https://dribbble.com/quamar-abrar",
  },
  {
    label: "Instagram",
    icon: "instagram",
    url: "https://www.instagram.com/lethargiccaveman",
  },
] as const

export const desktopProjects = [
  {
    title: "Summit",
    discipline: "Digital product",
    year: "2026",
    motif: "summit",
    url: "https://summit.quamarabrar.xyz",
  },
  {
    title: "Forme",
    discipline: "Identity & web",
    year: "2026",
    motif: "forme",
    url: "https://forme.quamarabrar.xyz",
  },
  {
    title: "The Muse Society",
    discipline: "Editorial commerce",
    year: "2026",
    motif: "muse",
    url: "https://themusesociety.quamarabrar.xyz",
  },
  {
    title: "Shift",
    discipline: "Digital experience",
    year: "2026",
    motif: "shift",
    url: "https://shift.quamarabrar.xyz",
  },
  {
    title: "Fold",
    discipline: "Product design",
    year: "2026",
    motif: "fold",
    url: "https://fold.quamarabrar.xyz",
  },
  {
    title: "Meridian",
    discipline: "Web direction",
    year: "2026",
    motif: "meridian",
    url: "https://meridian.quamarabrar.xyz",
  },
  {
    title: "Warden",
    discipline: "Digital experience",
    year: "2026",
    motif: "warden",
    url: "https://warden.quamarabrar.xyz",
  },
] as const

export const mobileProjects = [
  {
    title: "KOMA",
    accent: "acid",
    caption:
      "An anime and manga discovery experience built for immersive exploration.",
    screens: [
      { src: komaDiscover, alt: "KOMA Discover screen" },
      { src: komaAnime, alt: "KOMA Neon Ronin anime details screen" },
      { src: komaReader, alt: "KOMA Neon Ronin manga reader screen" },
      { src: komaManga, alt: "KOMA Neon Ronin manga details screen" },
      { src: komaWatch, alt: "KOMA Neon Ronin watch screen" },
    ],
  },
  {
    title: "VEIL",
    accent: "rose",
    caption:
      "A quiet fashion-commerce experience with soft editorial structure.",
    screens: [
      { src: veilHome, alt: "VEIL home screen" },
      { src: veilOnboarding, alt: "VEIL onboarding screen" },
      { src: veilProduct, alt: "VEIL product details screen" },
      { src: veilShop, alt: "VEIL shop screen" },
    ],
  },
] as const

export const posters = [
  { title: "VEIL", code: "01", image: posterVeil },
  { title: "RE:CODE", code: "02", image: posterRecode },
  { title: "Sabrina Carpenter", code: "03", image: posterSabrina },
  { title: "Red Bull — Flat Out", code: "04", image: posterRedbull },
  { title: "The Corporate Gamble", code: "05", image: posterCorporate },
  { title: "Ghulam Ali", code: "06", image: posterGhulam },
] as const

export const packagingAssets = [
  { src: packagingBottle, alt: "Aurel and Ember bottle artwork" },
  { src: packagingCarton, alt: "Aurel and Ember gift carton artwork" },
  { src: packagingPresentation, alt: "Aurel and Ember packaging presentation" },
] as const
