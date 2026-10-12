import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import portraitCutout from "./assets/optimized/portrait/quamar-cutout.webp"
import portraitOriginal from "./assets/portrait/quamar-original.png"
import portraitSeatedCropped from "./assets/optimized/portrait/quamar-seated-cropped.webp"
import {
  desktopProjects,
  mobileProjects,
  packagingAssets,
  philosophies,
  posters,
  socialLinks,
} from "./data"

gsap.registerPlugin(ScrollTrigger)

type DesktopProjectData = typeof desktopProjects[number]
const SNAPSHOT_WIDTH = 1440
const SNAPSHOT_HEIGHT = 900

const posterImageCache: HTMLImageElement[] = []

if (typeof Image !== "undefined") {
  posters.forEach((poster) => {
    const image = new Image()
    image.decoding = "async"
    image.fetchPriority = "low"
    image.loading = "eager"
    image.src = poster.image
    void image.decode().catch(() => undefined)
    posterImageCache.push(image)
  })
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className={diagonal ? "icon icon--diagonal" : "icon"}
      viewBox="0 0 24 24"
    >
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  )
}

type SocialIconName = typeof socialLinks[number]["icon"]

function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "linkedin") {
    return (
      <svg aria-hidden="true" className="social-icon" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M5.2 8.7h3.1V19H5.2zm1.55-5.1a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6ZM10.2 8.7h3v1.4c.7-1 1.8-1.7 3.4-1.7 3.1 0 3.7 2 3.7 4.7V19h-3.1v-5.2c0-1.3 0-2.8-1.8-2.8s-2 1.3-2 2.7V19h-3.2z"
        />
      </svg>
    )
  }

  if (name === "dribbble") {
    return (
      <svg
        aria-hidden="true"
        className="social-icon"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M8.25 3.8c4.15 4.2 6.6 9.7 7.35 16.1M3.2 9.3c5.3.15 10.4-1.4 14.15-4.35M4.5 17.95c3.2-4.05 8.5-6.1 15.2-5.75" />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      className="social-icon"
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect height="17" rx="4.5" width="17" x="3.5" y="3.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.7" fill="currentColor" r="1" />
    </svg>
  )
}

function PortraitArtwork({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`portrait-art ${compact ? "portrait-art--compact" : ""}`}
      aria-label="Portrait of Quamar Abrar"
    >
      <span className="portrait-art__halo" aria-hidden="true" />
      <span className="portrait-art__grid" aria-hidden="true" />
      <img
        src={portraitOriginal}
        alt="Quamar Abrar wearing glasses and a dark sweater"
        decoding="async"
        fetchPriority="high"
      />
      <span className="portrait-tag">Quamar Abrar / 01</span>
    </div>
  )
}

type Particle = {
  sx: number
  sy: number
  cx: number
  cy: number
  tx: number
  ty: number
  size: number
  rotation: number
  color: string
  shape: number
  delay: number
}

type Point = {
  x: number
  y: number
}

type DesktopSiteSnapshotProps = {
  url: string
  title: string
}

function samplePortraitTargets(
  image: HTMLImageElement,
  portraitRect: { left: number; top: number; width: number; height: number },
  count: number,
) {
  const mask = document.createElement("canvas")
  const maskContext = mask.getContext("2d", { willReadFrequently: true })
  if (!maskContext) return []

  const imgW = image.naturalWidth || 1080
  const imgH = image.naturalHeight || 700
  mask.width = 240
  mask.height = Math.max(100, Math.round(240 * (imgH / imgW)))
  maskContext.drawImage(image, 0, 0, mask.width, mask.height)
  const pixels = maskContext.getImageData(0, 0, mask.width, mask.height).data
  const candidates: Point[] = []

  for (let y = 0; y < mask.height; y += 2) {
    for (let x = 0; x < mask.width; x += 2) {
      if (pixels[(y * mask.width + x) * 4 + 3] > 60) {
        candidates.push({ x, y })
      }
    }
  }

  const { left, top, width: displayWidth, height: displayHeight } = portraitRect
  const targets: Point[] = []
  if (candidates.length === 0) return []
  const step = Math.max(1, Math.floor(candidates.length / count))

  for (
    let index = 0;
    index < candidates.length && targets.length < count;
    index += step
  ) {
    const point = candidates[(index * 37) % candidates.length]
    targets.push({
      x: left + (point.x / mask.width) * displayWidth,
      y: top + (point.y / mask.height) * displayHeight,
    })
  }
  return targets
}

function createParticles(
  width: number,
  height: number,
  count: number,
  targets: Point[] = [],
): Particle[] {
  const colors = [
    "#d7ff63",
    "#ff806a",
    "#f1eddd",
    "#6fcf97",
    "#0b3b2e",
    "#f7c8dd",
  ]
  const points: Particle[] = []
  let seed = 314159
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }

  for (let i = 0; i < count; i += 1) {
    const target = targets[i % targets.length]
    const tx = target?.x ?? width * (0.4 + random() * 0.2)
    const ty = target?.y ?? height * (0.24 + random() * 0.58)
    const side = i % 4
    const sx = side === 0 ? -40 : side === 1 ? width + 40 : random() * width
    const sy = side === 2 ? -40 : side === 3 ? height + 40 : random() * height

    points.push({
      sx,
      sy,
      cx: width * 0.5 + (random() - 0.5) * width * 0.6,
      cy: height * 0.5 + (random() - 0.5) * height * 0.6,
      tx,
      ty,
      size: 3.5 + random() * 7,
      rotation: random() * Math.PI * 2,
      color: colors[i % colors.length],
      shape: i % 3,
      delay: ((i % 16) / 16) * 0.35,
    })
  }
  return points
}

function drawParticles(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
  progress: number,
) {
  context.clearRect(0, 0, width, height)
  particles.forEach((particle, index) => {
    const local = Math.max(
      0,
      Math.min(1, (progress - particle.delay) / (1 - particle.delay)),
    )
    if (local <= 0) return
    const inverse = 1 - local
    const x =
      inverse * inverse * particle.sx +
      2 * inverse * local * particle.cx +
      local * local * particle.tx
    const y =
      inverse * inverse * particle.sy +
      2 * inverse * local * particle.cy +
      local * local * particle.ty
    const flutter = Math.sin(progress * 28 + index) * (1 - local) * 0.5
    const size = particle.size * (0.65 + local * 0.6)
    context.save()
    context.translate(x, y)
    context.rotate(particle.rotation + flutter)
    context.fillStyle = particle.color
    context.globalAlpha = Math.min(1, local * 3 + 0.2)
    if (particle.shape === 0) {
      context.beginPath()
      context.moveTo(0, -size)
      context.lineTo(size, size)
      context.lineTo(-size, size * 0.65)
      context.closePath()
      context.fill()
    } else if (particle.shape === 1) {
      context.fillRect(-size, -size * 0.35, size * 2, size * 0.7)
    } else {
      context.beginPath()
      context.arc(0, 0, size * 0.75, 0, Math.PI * 2)
      context.fill()
    }
    context.restore()
  })
}

function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const portraitRef = useRef<HTMLDivElement>(null)
  const portraitImgRef = useRef<HTMLImageElement>(null)
  const [canSkip, setCanSkip] = useState(false)
  const [label, setLabel] = useState<typeof philosophies[number]>(
    philosophies[0],
  )
  const timeline = useRef<gsap.core.Timeline | null>(null)

  const finish = () => {
    if (!root.current) return
    timeline.current?.kill()
    gsap.to(root.current, {
      yPercent: -100,
      duration: 0.85,
      ease: "power3.inOut",
      onComplete,
    })
  }

  useLayoutEffect(() => {
    const node = canvas.current
    const container = root.current
    if (!node || !container) return
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduceMotion) {
      const id = window.setTimeout(finish, 250)
      return () => window.clearTimeout(id)
    }

    const context = node.getContext("2d")
    if (!context) {
      const id = window.setTimeout(finish, 400)
      return () => window.clearTimeout(id)
    }

    let particles: Particle[] = []
    const portraitImage = new Image()
    portraitImage.src = portraitSeatedCropped
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      const bounds = container.getBoundingClientRect()
      const particleCount = bounds.width < 700 ? 86 : 170
      node.width = bounds.width * ratio
      node.height = bounds.height * ratio
      node.style.width = `${bounds.width}px`
      node.style.height = `${bounds.height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)

      let pRect = {
        left: (bounds.width - Math.min(bounds.width * 0.86, 700)) / 2,
        top:
          (bounds.height -
            Math.min(bounds.width * 0.86, 700) * (700 / 1080)) /
          2,
        width: Math.min(bounds.width * 0.86, 700),
        height: Math.min(bounds.width * 0.86, 700) * (700 / 1080),
      }

      if (portraitImgRef.current) {
        const imgBounds = portraitImgRef.current.getBoundingClientRect()
        if (imgBounds.width > 0 && imgBounds.height > 0) {
          pRect = {
            left: imgBounds.left - bounds.left,
            top: imgBounds.top - bounds.top,
            width: imgBounds.width,
            height: imgBounds.height,
          }
        }
      }

      const targets =
        portraitImage.complete && portraitImage.naturalWidth
          ? samplePortraitTargets(portraitImage, pRect, particleCount)
          : []
      particles = createParticles(
        bounds.width,
        bounds.height,
        particleCount,
        targets,
      )
    }

    portraitImage.addEventListener("load", resize)
    const imgEl = portraitImgRef.current
    imgEl?.addEventListener("load", resize)
    resize()

    const state = { progress: 0 }
    const ctx = gsap.context(() => {
      timeline.current = gsap
        .timeline({ onComplete: finish })
        // 1. Shapes fly in and converge to form the portrait silhouette
        .to(state, {
          progress: 1,
          duration: 2.2,
          ease: "power2.inOut",
          onUpdate: () =>
            drawParticles(
              context,
              particles,
              container.clientWidth,
              container.clientHeight,
              state.progress,
            ),
        })
        // 2. Seamlessly connected: as shapes lock into the silhouette, portrait materializes in place
        .to(
          portraitRef.current,
          {
            opacity: 1,
            duration: 0.85,
            ease: "power2.out",
          },
          1.35,
        )
        // 3. Canvas shapes dissolve smoothly into the materialized portrait
        .to(
          node,
          {
            opacity: 0,
            duration: 0.65,
            ease: "power2.inOut",
          },
          1.95,
        )
        // 4. Identity badge enters smoothly
        .to(
          ".preloader__identity",
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          2.05,
        )
        // 5. Brief hold before curtain roll
        .to({}, { duration: 0.4 })
    }, root)

    const labelTimer = window.setInterval(() => {
      setLabel(
        (current) =>
          philosophies[
            (philosophies.indexOf(current) + 1) % philosophies.length
          ],
      )
    }, 150)
    const skipTimer = window.setTimeout(() => setCanSkip(true), 1000)
    window.addEventListener("resize", resize)
    return () => {
      ctx.revert()
      window.clearInterval(labelTimer)
      window.clearTimeout(skipTimer)
      window.removeEventListener("resize", resize)
      portraitImage.removeEventListener("load", resize)
      imgEl?.removeEventListener("load", resize)
    }
  }, [])

  return (
    <div
      className="preloader"
      ref={root}
      role="status"
      aria-label="Opening Quamar Abrar's portfolio"
    >
      <div className="preloader__top">
        <span>QA® / Portfolio</span>
        <span>18 philosophies → 1 identity</span>
      </div>
      <canvas ref={canvas} className="preloader__canvas" aria-hidden="true" />
      <div className="preloader__portrait" ref={portraitRef} aria-hidden="true">
        <span className="preloader__glow" aria-hidden="true" />
        <img
          ref={portraitImgRef}
          src={portraitSeatedCropped}
          alt="Quamar Abrar seated"
          className="preloader__portrait-img"
        />
      </div>
      <div className="preloader__style" aria-hidden="true">
        <span>{String(philosophies.indexOf(label) + 1).padStart(2, "0")}</span>
        <strong>{label}</strong>
      </div>
      <div className="preloader__identity">
        <span>Quamar Abrar</span>
        <span>Graphic designer</span>
      </div>
      <button
        className={`preloader__skip ${canSkip ? "is-visible" : ""}`}
        onClick={finish}
        tabIndex={canSkip ? 0 : -1}
      >
        Skip intro <Arrow />
      </button>
    </div>
  )
}

function Header() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Quamar Abrar, home">
        QA<span>®</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#about">About</a>
      </nav>
    </header>
  )
}

function ContactButton() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const button = root.current
    const contact = document.querySelector<HTMLElement>("#contact")
    if (!button || !contact) return

    const dock = () => {
      button.style.top = `${contact.offsetTop}px`
      button.classList.add("is-docked")
    }
    const release = () => {
      button.style.removeProperty("top")
      button.classList.remove("is-docked")
    }
    const trigger = ScrollTrigger.create({
      trigger: contact,
      start: "top 20px",
      onEnter: dock,
      onLeaveBack: release,
      onRefresh: (self) => {
        if (self.scroll() >= self.start) dock()
        else release()
      },
    })

    return () => trigger.kill()
  }, [])

  return (
    <div className="contact-button" ref={root}>
      <a href="#contact">
        Contact
        <Arrow diagonal />
      </a>
    </div>
  )
}

function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const media = window.matchMedia("(min-width: 900px) and (hover: hover)")
    if (!media.matches) return

    const portraitX = gsap.quickTo(".hero__portrait-inner", "x", { duration: 0.9, ease: "power2.out" })
    const portraitY = gsap.quickTo(".hero__portrait-inner", "y", { duration: 0.9, ease: "power2.out" })
    const portraitRot = gsap.quickTo(".hero__portrait-inner", "rotation", { duration: 1.1, ease: "power2.out" })
    const glowX = gsap.quickTo(".hero__backdrop-glow", "x", { duration: 1.2, ease: "power2.out" })
    const glowY = gsap.quickTo(".hero__backdrop-glow", "y", { duration: 1.2, ease: "power2.out" })

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2

      portraitX(nx * 18)
      portraitY(ny * 10)
      portraitRot(nx * 0.75)
      glowX(nx * 32)
      glowY(ny * 18)
    }

    const handleMouseLeave = () => {
      portraitX(0)
      portraitY(0)
      portraitRot(0)
      glowX(0)
      glowY(0)
    }

    hero.addEventListener("mousemove", handleMouseMove)
    hero.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove)
      hero.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero__panel">
        <Header />

        {/* Ambient atmospheric studio lighting */}
        <div className="hero__backdrop" aria-hidden="true">
          <div className="hero__backdrop-glow" />
        </div>

        {/* Monumental kinetic background typography ribbon moving left on scroll */}
        <div className="hero__display-wrap" aria-hidden="true">
          <div className="hero__display-track">
            <span className="hero__display-name">QUAMAR ABRAR</span>
            <span className="hero__display-dot">•</span>
            <span className="hero__display-name">GRAPHIC DESIGNER</span>
            <span className="hero__display-dot">•</span>
            <span className="hero__display-name">BENGALURU</span>
            <span className="hero__display-dot">•</span>
            <span className="hero__display-name">QUAMAR ABRAR</span>
            <span className="hero__display-dot">•</span>
            <span className="hero__display-name">GRAPHIC DESIGNER</span>
            <span className="hero__display-dot">•</span>
            <span className="hero__display-name">BENGALURU</span>
          </div>
        </div>

        {/* Foreground seated portrait cutout overlaying on top of the monumental text */}
        <div className="hero__portrait">
          <div className="hero__portrait-inner">
            <img
              src={portraitSeatedCropped}
              alt="Quamar Abrar sitting on a minimalist designer armchair"
              className="hero__portrait-img"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>

        {/* Essential metadata: Name, Role, Location positioned with generous editorial breathing room */}
        <div className="hero__meta">
          <h1 id="hero-title" className="hero__name">
            Quamar Abrar
          </h1>
          <div className="hero__details">
            <span className="hero__role">Graphic designer</span>
            <span className="hero__dot" aria-hidden="true">•</span>
            <span className="hero__location">Bengaluru, India</span>
          </div>
        </div>

        {/* Scroll to explore indicator */}
        <a
          className="hero__index"
          href="#work"
          aria-label="Scroll to selected work"
        >
          <span>01</span>
          <span className="hero__index-track" aria-hidden="true">
            <span />
          </span>
          <span>Scroll to explore</span>
          <span className="hero__index-arrow" aria-hidden="true">
            ↓
          </span>
        </a>
      </div>
    </section>
  )
}

function DesktopSiteSnapshot({ url, title }: DesktopSiteSnapshotProps) {
  const container = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLIFrameElement>(null)

  useLayoutEffect(() => {
    const containerNode = container.current
    const frameNode = frame.current
    if (!containerNode || !frameNode) return

    const fitSnapshot = () => {
      const bounds = containerNode.getBoundingClientRect()
      const scale = Math.min(
        bounds.width / SNAPSHOT_WIDTH,
        bounds.height / SNAPSHOT_HEIGHT,
      )
      frameNode.style.left = `${(bounds.width - SNAPSHOT_WIDTH * scale) / 2}px`
      frameNode.style.top = `${(bounds.height - SNAPSHOT_HEIGHT * scale) / 2}px`
      frameNode.style.transform = `scale(${scale})`
    }

    const observer = new ResizeObserver(fitSnapshot)
    observer.observe(containerNode)
    fitSnapshot()
    return () => observer.disconnect()
  }, [])

  return (
    <div className="scaled-preview" ref={container}>
      <iframe
        ref={frame}
        src={url}
        title={`${title} desktop website snapshot`}
        loading="lazy"
        tabIndex={-1}
      />
    </div>
  )
}

function DesktopProject({
  project,
  index,
  onOpen,
}: {
  project: DesktopProjectData
  index: number
  onOpen: (project: DesktopProjectData) => void
}) {
  const device = index % 2 === 0 ? "laptop" : "monitor"

  return (
    <article
      className={`desktop-project desktop-project--${index + 1} work-reveal`}
    >
      <button
        className="project-card__link"
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.title} project preview`}
      />
      <div className={`macbook project-card__visual project-device--${device}`}>
        <div className="project-device__shell">
          <div className="project-device__screen">
            <DesktopSiteSnapshot url={project.url} title={project.title} />
          </div>
          <div className="project-device__base" aria-hidden="true" />
        </div>
      </div>
      <div className="project-card__caption">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <h3>{project.title}</h3>
        <span>{project.year}</span>
        <Arrow diagonal />
      </div>
    </article>
  )
}

function ProjectPreviewModal({
  project,
  onClose,
}: {
  project: DesktopProjectData
  onClose: () => void
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [onClose])

  return (
    <div
      className="project-preview"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-preview-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="project-preview__panel">
        <div className="project-preview__header">
          <div className="project-preview__meta">
            <span>{project.year}</span>
            <span className="project-preview__sep">/</span>
            <span>{project.discipline}</span>
          </div>
          <h2 id="project-preview-title">{project.title}</h2>
          <button
            autoFocus
            onClick={onClose}
            aria-label="Close project preview"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="project-preview__stage">
          <div className="preview-macbook">
            <div className="preview-macbook__screen">
              <iframe
                src={project.url}
                title={`${project.title} interactive live website preview`}
              />
            </div>
            <div className="preview-macbook__base">
              <i />
            </div>
          </div>
          <a
            className="preview-side-oval-btn"
            href={project.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit the live site for ${project.title}`}
          >
            <span>Visit site</span>
            <Arrow diagonal />
          </a>
        </div>
      </div>
    </div>
  )
}

function PhoneShowcase() {
  const [activeProject, setActiveProject] = useState(0)
  const [screen, setScreen] = useState(0)
  const project = mobileProjects[activeProject]
  const changeProject = (index: number) => {
    setActiveProject(index)
    setScreen(0)
  }
  const next = () => setScreen((screen + 1) % project.screens.length)
  const previous = () =>
    setScreen((screen - 1 + project.screens.length) % project.screens.length)

  return (
    <section
      className={`mobile-showcase mobile-showcase--${project.accent} work-reveal`}
      aria-labelledby="mobile-heading"
    >
      <div className="section-kicker">
        <span>02</span>
        <span>Mobile systems</span>
      </div>
      <div className="mobile-showcase__copy">
        <h2 id="mobile-heading">{project.title}</h2>
        <p>{project.caption}</p>
        <div
          className="project-tabs"
          role="tablist"
          aria-label="Mobile projects"
        >
          {mobileProjects.map((item, index) => (
            <button
              key={item.title}
              className={index === activeProject ? "is-active" : ""}
              onClick={() => changeProject(index)}
              onMouseEnter={() => changeProject(index)}
              onFocus={() => changeProject(index)}
              role="tab"
              aria-selected={index === activeProject}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <div className="phones" aria-live="polite">
        <div className="phone phone--rear" aria-hidden="true">
          <div className="phone__screen phone__screen--asset">
            <img
              src={project.screens[(screen + 1) % project.screens.length].src}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
        <div className="phone phone--front">
          <div className="phone__screen phone__screen--asset">
            <img
              src={project.screens[screen].src}
              alt={project.screens[screen].alt}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
      <div className="showcase-controls">
        <button onClick={previous} aria-label="Previous screen">
          <Arrow />
        </button>
        <span>
          {String(screen + 1).padStart(2, "0")} /{" "}
          {String(project.screens.length).padStart(2, "0")}
        </span>
        <button onClick={next} aria-label="Next screen">
          <Arrow />
        </button>
      </div>
    </section>
  )
}

function PosterArtwork({ active }: { active: number }) {
  return (
    <div className="poster">
      {posters.map((poster, index) => (
        <img
          className={active === index ? "is-active" : ""}
          key={poster.title}
          src={poster.image}
          alt={`${poster.title} poster design`}
          aria-hidden={active !== index}
          loading="eager"
          decoding="async"
        />
      ))}
    </div>
  )
}

function PosterShowcase() {
  const [active, setActive] = useState(0)
  const previous = () =>
    setActive((active - 1 + posters.length) % posters.length)
  const next = () => setActive((active + 1) % posters.length)
  return (
    <section
      className="poster-showcase work-reveal"
      aria-labelledby="poster-heading"
    >
      <div className="section-kicker section-kicker--light">
        <span>03</span>
        <span>Poster studies</span>
      </div>
      <div className="poster-showcase__heading">
        <h2 id="poster-heading">
          Messages
          <br />
          <em>with gravity.</em>
        </h2>
        <p>Six exercises in scale, tension and cultural rhythm.</p>
      </div>
      <div className="ipad">
        <div className="ipad__screen">
          <PosterArtwork active={active} />
        </div>
      </div>
      <div className="poster-list">
        {posters.map((poster, index) => (
          <button
            key={poster.title}
            onClick={() => setActive(index)}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            className={active === index ? "is-active" : ""}
          >
            <span>{poster.code}</span>
            <span>{poster.title}</span>
          </button>
        ))}
      </div>
      <div className="showcase-controls showcase-controls--light">
        <button onClick={previous} aria-label="Previous poster">
          <Arrow />
        </button>
        <span>{posters[active].code} / 06</span>
        <button onClick={next} aria-label="Next poster">
          <Arrow />
        </button>
      </div>
    </section>
  )
}

function PackagingShowcase() {
  return (
    <section
      className="packaging work-reveal"
      aria-labelledby="packaging-heading"
    >
      <div className="section-kicker">
        <span>04</span>
        <span>Label & packaging</span>
      </div>
      <div className="packaging__title">
        <span>A study of ritual and material</span>
        <h2 id="packaging-heading">
          Aurel
          <br />
          <em>& Ember</em>
        </h2>
      </div>
      <div className="packaging__stage">
        {packagingAssets.map((asset, index) => (
          <figure
            className={`packaging__asset packaging__asset--${index + 1}`}
            key={asset.src}
          >
            <img
              src={asset.src}
              alt={asset.alt}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ))}
      </div>
      <p className="packaging__copy">
        An editorial label system balancing old-world restraint with
        contemporary tactility.
      </p>
    </section>
  )
}

function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="section-kicker section-kicker--light">
        <span>05</span>
        <span>About / Practice</span>
      </div>
      <h2 id="about-heading">
        Built on curiosity.
        <br />
        <em>Refined through practice.</em>
      </h2>
      <div className="about__grid">
        <p className="about__lead">
          I’m Quamar, a graphic designer in Bengaluru turning complex ideas into
          clear, characterful visual systems.
        </p>
        <div>
          <p>
            Currently designing at <strong>PW (Physics Wallah)</strong>, with 6+
            months of industry experience spanning digital products, campaigns
            and identity-led work.
          </p>
          <p>
            I move between structure and surprise—using geometry, type and
            motion to make work that communicates before it decorates.
          </p>
        </div>
        <dl>
          <div>
            <dt>Focus</dt>
            <dd>Identity / UI / Editorial</dd>
          </div>
          <div>
            <dt>Based</dt>
            <dd>Bengaluru, India</dd>
          </div>
          <div>
            <dt>Experience</dt>
            <dd>6+ months at PW</dd>
          </div>
        </dl>
      </div>
      <a className="text-link magnetic" href="#contact">
        Start a conversation <Arrow diagonal />
      </a>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const email = "hello@quamar.design"
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }
  return (
    <footer className="contact" id="contact">
      <div className="contact__top">
        <span>Made in Bengaluru, India</span>
        <span>Open to meaningful collaborations</span>
      </div>
      <div className="contact__flora" aria-hidden="true">
        <svg viewBox="0 0 1000 90" preserveAspectRatio="none">
          <path d="M185 90V46m0 8-18-15m18 2 19-20m-19 25 2-29M330 90V52m0 8-20-18m20 9 20-17M448 90V35m0 8-17-17m17 24 22-21M575 90V44m0 9-20-15m20 4 17-18M705 90V37m0 15-21-20m21 7 18-18M820 90V50m0 7-17-14m17 4 19-17" />
          <circle cx="187" cy="17" r="8" />
          <circle cx="204" cy="21" r="7" />
          <circle cx="330" cy="33" r="8" />
          <circle cx="448" cy="20" r="9" />
          <circle cx="470" cy="29" r="7" />
          <circle cx="575" cy="24" r="8" />
          <circle cx="705" cy="18" r="9" />
          <circle cx="723" cy="21" r="7" />
          <circle cx="820" cy="30" r="8" />
        </svg>
      </div>
      <div className="contact__panel">
        <nav className="contact__socials" aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              href={link.url}
              aria-label={`${link.label} (opens in a new tab)`}
              key={link.label}
              rel="noreferrer"
              target="_blank"
            >
              <SocialIcon name={link.icon} />
              {link.label}
            </a>
          ))}
          <a href="#top">Back to top ↑</a>
        </nav>
        <h2>
          Let’s make
          <br />
          <em>something clear.</em>
        </h2>
        <div className="contact__actions">
          <a href={`mailto:${email}`}>
            {email} <Arrow diagonal />
          </a>
          <button onClick={copyEmail}>
            {copied ? "Copied" : "Copy email"}
          </button>
        </div>
        <div className="contact__name" aria-hidden="true">
          Quamar Abrar
        </div>
      </div>
      <div className="contact__bottom">
        <span>© {new Date().getFullYear()} Quamar Abrar</span>
        <span>Graphic designer / Bengaluru</span>
      </div>
    </footer>
  )
}

function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return
    const move = (event: PointerEvent) => {
      if (!cursor.current) return
      gsap.to(cursor.current, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.35,
        ease: "power3.out",
      })
    }
    const over = (event: MouseEvent) => {
      if (!cursor.current) return
      cursor.current.classList.toggle(
        "is-active",
        Boolean((event.target as HTMLElement).closest("a, button")),
      )
    }
    window.addEventListener("pointermove", move)
    document.addEventListener("mouseover", over)
    return () => {
      window.removeEventListener("pointermove", move)
      document.removeEventListener("mouseover", over)
    }
  }, [])
  return (
    <div className="cursor" ref={cursor} aria-hidden="true">
      <span>↗</span>
    </div>
  )
}

export default function App() {
  const page = useRef<HTMLDivElement>(null)
  const [showPreloader, setShowPreloader] = useState(true)
  const [previewProject, setPreviewProject] =
    useState<DesktopProjectData | null>(null)

  const completePreloader = () => {
    document.body.classList.remove("is-loading")
    setShowPreloader(false)
  }

  useLayoutEffect(() => {
    if (showPreloader) {
      document.body.classList.add("is-loading")
      return () => document.body.classList.remove("is-loading")
    }
    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      // Hero entrance choreography
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } })
      heroTl
        .fromTo(".hero__backdrop-glow", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.8 }, 0)
        .fromTo(".hero__display-wrap", { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 1.5 }, 0.1)
        .fromTo(".hero__meta > *", { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.3)
        .fromTo(".hero__index", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9 }, 0.45)

      // Kinetic background text moves to the left upon scrolling
      gsap.to(".hero__display-track", {
        xPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      })

      // Metadata and index softly fade on scroll
      gsap.to(".hero__meta, .hero__index", {
        y: 28,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "65% top",
          scrub: 0.6,
        },
      })

      gsap.fromTo(".title-line > span", { yPercent: 115, rotate: 2 }, {
        yPercent: 0,
        rotate: 0,
        duration: 1.15,
        stagger: 0.1,
        ease: "power4.out",
      })
      gsap.utils.toArray<HTMLElement>(".work-reveal").forEach((element) => {
        gsap.fromTo(element, { y: 80, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 84%", once: true },
        })
      })

      media.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(".hero__portrait", {
            y: 45,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          })
          gsap.utils
            .toArray<HTMLElement>(".desktop-project")
            .forEach((project) => {
              const frame = project.querySelector(".macbook")
              gsap.fromTo(frame, { rotateX: 9, scale: 0.92 }, {
                rotateX: 0,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: project,
                  start: "top bottom",
                  end: "center center",
                  scrub: 1,
                },
              })
            })
        },
      )
    }, page)
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      media.revert()
      context.revert()
    }
  }, [showPreloader])

  useEffect(() => {
    const magnets = Array.from(
      document.querySelectorAll<HTMLElement>(".magnetic"),
    )
    const cleanups = magnets.map((element) => {
      const move = (event: PointerEvent) => {
        const bounds = element.getBoundingClientRect()
        gsap.to(element, {
          x: (event.clientX - bounds.left - bounds.width / 2) * 0.16,
          y: (event.clientY - bounds.top - bounds.height / 2) * 0.16,
          duration: 0.35,
        })
      }
      const leave = () =>
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, .4)",
        })
      element.addEventListener("pointermove", move)
      element.addEventListener("pointerleave", leave)
      return () => {
        element.removeEventListener("pointermove", move)
        element.removeEventListener("pointerleave", leave)
      }
    })
    return () => cleanups.forEach((cleanup) => cleanup())
  }, [])

  return (
    <div className="app-shell" ref={page}>
      {showPreloader && <Preloader onComplete={completePreloader} />}
      <CustomCursor />
      <ContactButton />
      <main>
        <Hero />
        <section className="work" id="work" aria-labelledby="work-heading">
          <div className="work__intro">
            <div className="section-kicker">
              <span>01</span>
              <span>Selected work</span>
            </div>
            <h2
              id="work-heading"
              style={{
                justifySelf: "start",
                lineHeight: 0.96,
                textAlign: "left",
              }}
            >
              Systems with soul.
              <br />
              <em>Ideas in motion.</em>
            </h2>
            <p>07 live experiences / 2026</p>
          </div>
          <div className="desktop-work">
            {desktopProjects.slice(0, 3).map((project, index) => (
              <DesktopProject
                key={project.title}
                project={project}
                index={index}
                onOpen={setPreviewProject}
              />
            ))}
          </div>
          <PhoneShowcase />
          <div className="desktop-work desktop-work--second">
            {desktopProjects.slice(3).map((project, index) => (
              <DesktopProject
                key={project.title}
                project={project}
                index={index + 3}
                onOpen={setPreviewProject}
              />
            ))}
          </div>
          <PosterShowcase />
          <PackagingShowcase />
        </section>
        <About />
      </main>
      {previewProject && (
        <ProjectPreviewModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}
      <Contact />
    </div>
  )
}
