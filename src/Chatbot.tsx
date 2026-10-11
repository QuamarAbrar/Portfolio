import { useState, useRef, useEffect, useId, useMemo } from "react"
import {
  PROFILE_DATA,
  PROJECT_LIBRARY,
  TRUST_PILLARS,
  SERVICE_TIERS,
  ADDON_MODULES,
  ProjectEntry,
  ServiceTierConfig,
} from "./dataset"

export interface ChatMessage {
  id: string
  sender: "user" | "bot"
  text: string
  timestamp: string
  uiType?: "library" | "calculator" | "trust" | "contact" | "philosophies"
  calculatorData?: {
    idea: string
    tierKey: "design" | "design_build" | "design_build_marketing"
    sliderBudget: number
    selectedAddons: string[]
  }
}

export const SUGGESTIONS = [
  {
    code: "01",
    label: "See my whole project library",
    sub: "7 Live sites, 2 mobile systems & luxury packaging",
    query: "See my whole project library",
    category: "Archive",
  },
  {
    code: "02",
    label: "Calculate my project build cost",
    sub: "Deep research scope & investment ($100 – $3k)",
    query: "Calculate my project build cost",
    category: "Estimator",
  },
  {
    code: "03",
    label: "What is the background, How can I trust?",
    sub: "PW designer credentials, live proof & guarantees",
    query: "What is the background, How can I trust?",
    category: "Provenance",
  },
] as const

function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val))
}

export function Chatbot({
  onOpenProjectPreview,
}: {
  onOpenProjectPreview?: (title: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [activeLibraryTab, setActiveLibraryTab] = useState<"all" | "desktop" | "mobile" | "packaging_poster">("all")
  const [copiedEmail, setCopiedEmail] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([])

  const isInitialState = messages.length === 0

  // Keyboard shortcut to close (Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("qa-open")
      setTimeout(() => {
        inputRef.current?.focus()
      }, 200)
    } else {
      document.body.classList.remove("qa-open")
    }
    return () => {
      document.body.classList.remove("qa-open")
    }
  }, [isOpen])

  useEffect(() => {
    if (!isInitialState) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isTyping, isInitialState])

  const addMessage = (msg: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `qa-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, newMsg])
  }

  const handleSend = (userQuery?: string) => {
    const text = (userQuery ?? inputText).trim()
    if (!text) return

    addMessage({ sender: "user", text })
    if (!userQuery) setInputText("")
    setIsTyping(true)

    setTimeout(() => {
      routeQuery(text)
      setIsTyping(false)
    }, 450)
  }

  const routeQuery = (query: string) => {
    const q = query.toLowerCase()

    // 1. Suggestion 1: See my whole project library
    if (
      q.includes("project library") ||
      q.includes("see my whole project") ||
      q.includes("whole project") ||
      q.includes("all projects") ||
      q.includes("show work") ||
      q.includes("portfolio") ||
      q.includes("summit") ||
      q.includes("forme") ||
      q.includes("muse") ||
      q.includes("shift") ||
      q.includes("fold") ||
      q.includes("meridian") ||
      q.includes("warden") ||
      q.includes("koma") ||
      q.includes("veil")
    ) {
      addMessage({
        sender: "bot",
        text: `Here is Quamar Abrar's complete project archive. Explore 7 live desktop experiences, 2 mobile systems, physical packaging, and print editions below. You can inspect any live desktop site directly inside the single-screen canvas preview:`,
        uiType: "library",
      })
      return
    }

    // 2. Suggestion 2: Calculate my project build cost
    if (
      q.includes("calculate") ||
      q.includes("cost") ||
      q.includes("build cost") ||
      q.includes("price") ||
      q.includes("quote") ||
      q.includes("estimate") ||
      q.includes("budget") ||
      q.includes("$") ||
      q.includes("100") ||
      q.includes("3000") ||
      q.includes("idea") ||
      q.includes("build") ||
      q.includes("website") ||
      q.includes("app") ||
      q.includes("ecommerce") ||
      q.includes("fintech") ||
      q.includes("hire")
    ) {
      let detectedTier: "design" | "design_build" | "design_build_marketing" = "design_build"
      if (q.includes("marketing") || q.includes("launch") || q.includes("growth") || q.includes("seo")) {
        detectedTier = "design_build_marketing"
      } else if (q.includes("only design") || q.includes("figma") || q.includes("ui only") || q.includes("prototype only")) {
        detectedTier = "design"
      }

      addMessage({
        sender: "bot",
        text: `Deep Research scope synthesized. Quamar guarantees fixed milestone pricing strictly between $100 and $3,000 USD with zero hidden fees. Select your tier, refine your investment slider, and configure scope enhancements below:`,
        uiType: "calculator",
        calculatorData: {
          idea:
            query.length > 5 && !query.includes("Calculate my project build cost")
              ? query
              : "High-Performance Digital Product & Brand Experience",
          tierKey: detectedTier,
          sliderBudget: SERVICE_TIERS[detectedTier].recommendedBase,
          selectedAddons: ["motion"],
        },
      })
      return
    }

    // 3. Suggestion 3: Background & Trust ("How can I trust?")
    if (
      q.includes("background") ||
      q.includes("trust") ||
      q.includes("how can i trust") ||
      q.includes("who are you") ||
      q.includes("who is quamar") ||
      q.includes("experience") ||
      q.includes("credentials") ||
      q.includes("physics wallah") ||
      q.includes("pw") ||
      q.includes("qualifications")
    ) {
      addMessage({
        sender: "bot",
        text: `Here is Quamar Abrar's verified background and trust dossier. He bridges creative typography and production frontend code, with active institutional pedigree at Physics Wallah and 7 deployed websites in production:`,
        uiType: "trust",
      })
      return
    }

    // 4. Contact inquiry
    if (
      q.includes("contact") ||
      q.includes("whatsapp") ||
      q.includes("email") ||
      q.includes("phone") ||
      q.includes("reach") ||
      q.includes("talk") ||
      q.includes("chat")
    ) {
      addMessage({
        sender: "bot",
        text: `You can reach Quamar directly via WhatsApp or Email. Every client commission receives direct access to him with zero intermediary delay:`,
        uiType: "contact",
      })
      return
    }

    // 5. Design philosophies
    if (q.includes("philosoph") || q.includes("style") || q.includes("bauhaus") || q.includes("swiss") || q.includes("brutalism")) {
      addMessage({
        sender: "bot",
        text: `Quamar operates across 18 distinct aesthetic movements — uniting rigorous Swiss typography and Bauhaus geometry with modern brutalism and kinetic storytelling:`,
        uiType: "philosophies",
      })
      return
    }

    // Default intelligent response with fallback to suggestions
    addMessage({
      sender: "bot",
      text: `Quamar Abrar is an independent graphic designer & creative developer based in Bengaluru, currently shaping product and brand design at PW (Physics Wallah). He operates across three core models: Design ($100–$800), Design + Build ($750–$2,000), and Design + Build + Marketing ($1,500–$3,000).\n\nSelect a suggestion below or describe your project concept to begin:`,
      uiType: undefined,
    })
  }

  const updateCalculator = (
    msgId: string,
    updater: (prev: NonNullable<ChatMessage["calculatorData"]>) => NonNullable<ChatMessage["calculatorData"]>,
  ) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== msgId || !m.calculatorData) return m
        return {
          ...m,
          calculatorData: updater(m.calculatorData),
        }
      }),
    )
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.primaryEmail)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <>
      {/* Floating Studio AI Badge Launcher */}
      <div className="qa-launcher-wrap">
        {!isOpen && (
          <button
            type="button"
            className="qa-launcher-teaser"
            onClick={() => setIsOpen(true)}
            aria-label="Open Studio AI Assistant"
          >
            <span className="qa-teaser-beacon" aria-hidden="true" />
            <span className="qa-teaser-label">✦ Studio AI · Estimate & Archives</span>
            <span className="qa-teaser-arrow">↗</span>
          </button>
        )}

        <button
          type="button"
          className={`qa-launcher-btn ${isOpen ? "is-open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close Quamar Abrar Studio AI" : "Open Quamar Abrar Studio AI"}
          aria-expanded={isOpen}
        >
          <span className="qa-launcher-beacon" aria-hidden="true" />
          <span className="qa-launcher-monogram">QA</span>
          <span className="qa-launcher-sep" aria-hidden="true">/</span>
          <span className="qa-launcher-text">{isOpen ? "Close Console" : "Studio AI"}</span>
          {!isOpen && <span className="qa-launcher-badge">3 Suggestions</span>}
        </button>
      </div>

      {/* Studio Intelligence Terminal Console */}
      {isOpen && (
        <aside
          className="qa-terminal"
          role="dialog"
          aria-label="Quamar Abrar Studio Intelligence Terminal"
        >
          {/* Header Bar */}
          <header className="qa-terminal-header">
            <div className="qa-header-identity">
              <div className="qa-avatar">
                <span>QA</span>
                <i className="qa-avatar-halo" aria-hidden="true" />
              </div>
              <div className="qa-header-meta">
                <div className="qa-header-title-row">
                  <h3>
                    Quamar Abrar <em>Studio AI</em>
                  </h3>
                  <span className="qa-tag-pw">PW Designer</span>
                </div>
                <p>
                  <span className="qa-status-dot" aria-hidden="true" />
                  <span>Bengaluru, IN · Available for Commissions</span>
                </p>
              </div>
            </div>

            <div className="qa-header-controls">
              <button
                type="button"
                className="qa-header-action"
                onClick={() => setMessages([])}
                title="Reset to home overview"
                aria-label="Reset conversation"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />
                </svg>
              </button>
              <button
                type="button"
                className="qa-header-action qa-header-action--close"
                onClick={() => setIsOpen(false)}
                title="Close terminal (Esc)"
                aria-label="Close terminal"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </header>

          {/* Main Content Area */}
          <div className="qa-terminal-body">
            {isInitialState ? (
              /* Concierge Welcome Canvas (Calm, Elegant, Spacious) */
              <div className="qa-welcome-canvas">
                <div className="qa-welcome-hero">
                  <div className="qa-welcome-kicker">
                    <span>03 / STUDIO INTELLIGENCE</span>
                    <span className="qa-kicker-dot">•</span>
                    <span>BENGALURU</span>
                  </div>
                  <h2 className="qa-welcome-headline">
                    Systems with soul.
                    <br />
                    <em>Ideas in motion.</em>
                  </h2>
                  <p className="qa-welcome-sub">
                    Direct access to Quamar Abrar’s verified portfolio intelligence. Explore 11 live artifacts, review institutional credentials at Physics Wallah, or calculate your project build cost ($100 – $3,000).
                  </p>
                </div>

                {/* 3 Core Suggestion Dossiers */}
                <div className="qa-welcome-dossiers">
                  <span className="qa-dossiers-heading">Select an Intelligence Dossier:</span>
                  <div className="qa-dossiers-grid">
                    {SUGGESTIONS.map((sug) => (
                      <button
                        key={sug.code}
                        type="button"
                        className="qa-dossier-card"
                        onClick={() => handleSend(sug.query)}
                      >
                        <div className="qa-dossier-top">
                          <span className="qa-dossier-code">{sug.code}</span>
                          <span className="qa-dossier-cat">{sug.category}</span>
                          <span className="qa-dossier-arrow">↗</span>
                        </div>
                        <strong className="qa-dossier-title">{sug.label}</strong>
                        <span className="qa-dossier-sub">{sug.sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="qa-welcome-footer">
                  <span className="qa-trust-pill">● Verified PW Product Designer</span>
                  <span className="qa-trust-pill">● 7 Live Deployed Domains (.xyz)</span>
                  <span className="qa-trust-pill">● $100–$3k Fixed Scope</span>
                </div>
              </div>
            ) : (
              /* Conversation Stream & Generative UI Artifacts */
              <div className="qa-conversation-feed">
                {messages.map((m) => (
                  <div key={m.id} className={`qa-message qa-message--${m.sender}`}>
                    <div className="qa-message-header">
                      <span className="qa-sender-tag">
                        {m.sender === "bot" ? "QA / STUDIO INTELLIGENCE" : "CLIENT BRIEF"}
                      </span>
                      <span className="qa-message-time">{m.timestamp}</span>
                    </div>

                    <div className="qa-message-body">
                      <p className="qa-message-text">{m.text}</p>

                      {/* Generative UI 1: Complete Project Archive Terminal */}
                      {m.uiType === "library" && (
                        <GenerativeProjectLibrary
                          activeTab={activeLibraryTab}
                          onTabChange={setActiveLibraryTab}
                          onInspect={(title) => onOpenProjectPreview?.(title)}
                          onCalculate={() => handleSend("Calculate my project build cost")}
                        />
                      )}

                      {/* Generative UI 2: Interactive Cost Calculator & Scope Synthesis */}
                      {m.uiType === "calculator" && m.calculatorData && (
                        <GenerativeCostCalculator
                          data={m.calculatorData}
                          onUpdate={(updater) => updateCalculator(m.id, updater)}
                        />
                      )}

                      {/* Generative UI 3: Provenance & Verified Trust Dossier */}
                      {m.uiType === "trust" && (
                        <GenerativeTrustDossier
                          onExploreWork={() => handleSend("See my whole project library")}
                          onCalculate={() => handleSend("Calculate my project build cost")}
                        />
                      )}

                      {/* Generative UI 4: Direct Contact Card */}
                      {m.uiType === "contact" && (
                        <GenerativeContactTerminal
                          onCopyEmail={handleCopyEmail}
                          copied={copiedEmail}
                        />
                      )}

                      {/* Generative UI 5: 18 Philosophies Codex */}
                      {m.uiType === "philosophies" && <GenerativePhilosophiesGrid />}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="qa-message qa-message--bot">
                    <div className="qa-message-header">
                      <span className="qa-sender-tag">QA / STUDIO INTELLIGENCE</span>
                      <span className="qa-message-time">Synthesizing...</span>
                    </div>
                    <div className="qa-typing-indicator">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Persistent Quick Action Suggestion Bar (During Active Chat) */}
          {!isInitialState && (
            <div className="qa-quick-actions-bar" aria-label="Quick Actions">
              {SUGGESTIONS.map((sug) => (
                <button
                  key={sug.code}
                  type="button"
                  className="qa-quick-chip"
                  onClick={() => handleSend(sug.query)}
                >
                  <span className="qa-chip-num">{sug.code}</span>
                  <span className="qa-chip-text">{sug.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Interactive Message Console Input */}
          <form
            className="qa-console-input-bar"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your project concept, ask a question, or request a quote..."
              aria-label="Type your message"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="qa-console-send-btn"
              aria-label="Send message"
            >
              <span>Send</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>

          {/* Verified Channel Direct Touchpoint Footer */}
          <footer className="qa-console-footer">
            <span className="qa-footer-label">Direct Line:</span>
            <a href="mailto:quamarabrar651@gmail.com">quamarabrar651@gmail.com</a>
            <span className="qa-footer-sep">·</span>
            <a href={PROFILE_DATA.whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp ({PROFILE_DATA.whatsappDisplay})
            </a>
          </footer>
        </aside>
      )}
    </>
  )
}

/**
 * GENERATIVE UI 1:
 * Complete Project Archive Terminal
 */
function GenerativeProjectLibrary({
  activeTab,
  onTabChange,
  onInspect,
  onCalculate,
}: {
  activeTab: "all" | "desktop" | "mobile" | "packaging_poster"
  onTabChange: (tab: "all" | "desktop" | "mobile" | "packaging_poster") => void
  onInspect: (title: string) => void
  onCalculate: () => void
}) {
  const filteredProjects = useMemo(() => {
    if (activeTab === "all") return PROJECT_LIBRARY
    if (activeTab === "desktop") return PROJECT_LIBRARY.filter((p) => p.category === "desktop")
    if (activeTab === "mobile") return PROJECT_LIBRARY.filter((p) => p.category === "mobile")
    return PROJECT_LIBRARY.filter((p) => p.category === "packaging" || p.category === "poster")
  }, [activeTab])

  return (
    <div className="gen-artifact gen-artifact--library">
      <div className="gen-artifact-header">
        <div className="gen-pill-row">
          <span className="gen-pill gen-pill--acid">VERIFIED ARCHIVE</span>
          <span className="gen-pill">{filteredProjects.length} WORKS</span>
        </div>
        <h4>
          Complete Project <em>Index</em>
        </h4>
        <p>
          All 7 desktop experiences are deployed live. Inspect in the single-screen canvas preview or launch external domains directly:
        </p>

        {/* Filter Segmented Control */}
        <div className="gen-segmented-control" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "all"}
            className={`gen-segment ${activeTab === "all" ? "is-active" : ""}`}
            onClick={() => onTabChange("all")}
          >
            All Works ({PROJECT_LIBRARY.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "desktop"}
            className={`gen-segment ${activeTab === "desktop" ? "is-active" : ""}`}
            onClick={() => onTabChange("desktop")}
          >
            Live Web (7)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "mobile"}
            className={`gen-segment ${activeTab === "mobile" ? "is-active" : ""}`}
            onClick={() => onTabChange("mobile")}
          >
            Mobile (2)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "packaging_poster"}
            className={`gen-segment ${activeTab === "packaging_poster" ? "is-active" : ""}`}
            onClick={() => onTabChange("packaging_poster")}
          >
            Physical & Print (2)
          </button>
        </div>
      </div>

      {/* Cards List */}
      <div className="gen-items-stream">
        {filteredProjects.map((project, idx) => (
          <article key={project.id} className="gen-project-item">
            <div className="gen-item-top">
              <span className="gen-item-num">{String(idx + 1).padStart(2, "0")}</span>
              <span className="gen-item-discipline">{project.discipline}</span>
              <span className="gen-item-year">{project.year}</span>
            </div>

            <h5 className="gen-item-title">{project.title}</h5>
            <p className="gen-item-tagline">{project.tagline}</p>

            <div className="gen-item-tags">
              {project.techStack.map((tech) => (
                <span key={tech} className="gen-item-tag">
                  {tech}
                </span>
              ))}
            </div>

            <div className="gen-item-actions">
              {project.url ? (
                <>
                  <button
                    type="button"
                    className="gen-btn-pill gen-btn-pill--primary"
                    onClick={() => onInspect(project.title)}
                  >
                    Inspect in Canvas ↗
                  </button>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="gen-btn-pill gen-btn-pill--secondary"
                  >
                    Live Domain ↗
                  </a>
                </>
              ) : (
                <span className="gen-item-note">
                  {project.category === "mobile"
                    ? "Multi-Screen Interactive Mobile System"
                    : "Museum-Grade Physical Packaging Edition"}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="gen-artifact-footer">
        <p>Looking to build an experience of comparable typographic rigor?</p>
        <button type="button" className="gen-footer-action-btn" onClick={onCalculate}>
          Calculate Project Build Cost ($100 – $3k) ↗
        </button>
      </div>
    </div>
  )
}

/**
 * GENERATIVE UI 2:
 * Interactive Scope & Cost Engineering Studio ($100 – $3,000)
 */
function GenerativeCostCalculator({
  data,
  onUpdate,
}: {
  data: NonNullable<ChatMessage["calculatorData"]>
  onUpdate: (updater: (prev: NonNullable<ChatMessage["calculatorData"]>) => NonNullable<ChatMessage["calculatorData"]>) => void
}) {
  const currentTier: ServiceTierConfig = SERVICE_TIERS[data.tierKey] ?? SERVICE_TIERS.design_build
  const sliderId = useId()

  const addonsTotal = useMemo(() => {
    return data.selectedAddons.reduce((sum, id) => {
      const match = ADDON_MODULES.find((m) => m.id === id)
      return sum + (match ? match.cost : 0)
    }, 0)
  }, [data.selectedAddons])

  // Total investment strictly clamped within $100 – $3,000
  const totalInvestment = clamp(data.sliderBudget + addonsTotal, 100, 3000)

  const toggleAddon = (addonId: string) => {
    onUpdate((prev) => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(addonId)
        ? prev.selectedAddons.filter((id) => id !== addonId)
        : [...prev.selectedAddons, addonId],
    }))
  }

  const selectTier = (tierKey: "design" | "design_build" | "design_build_marketing") => {
    onUpdate((prev) => ({
      ...prev,
      tierKey,
      sliderBudget: SERVICE_TIERS[tierKey].recommendedBase,
    }))
  }

  const setSliderValue = (val: number) => {
    onUpdate((prev) => ({
      ...prev,
      sliderBudget: clamp(val, 100, 3000),
    }))
  }

  const addonNames = data.selectedAddons
    .map((id) => ADDON_MODULES.find((m) => m.id === id)?.title)
    .filter(Boolean)
    .join(", ")

  const whatsappMessage = encodeURIComponent(
    `Hi Quamar! I used your portfolio AI cost estimator to engineer a project scope:\n\n` +
      `• Project Concept: ${data.idea}\n` +
      `• Selected Scope: ${currentTier.title} (${currentTier.rangeLabel})\n` +
      `• Calculated Investment: $${totalInvestment} USD (Guaranteed within $100 - $3,000 scope)\n` +
      `• Scope Add-ons: ${addonNames || "Standard Core"}\n` +
      `• Estimated Timeline: ${currentTier.timeline}\n\n` +
      `Let's connect and discuss building this!`,
  )
  const whatsappUrl = `https://wa.me/919234566700?text=${whatsappMessage}`

  const emailSubject = encodeURIComponent(`Project Inquiry: ${data.idea.slice(0, 50)} [$${totalInvestment} USD]`)
  const emailBody = encodeURIComponent(
    `Hello Quamar,\n\nI configured an estimate using your portfolio AI assistant:\n\n` +
      `• Concept / Scope: ${data.idea}\n` +
      `• Service Tier: ${currentTier.title}\n` +
      `• Calculated Investment: $${totalInvestment} USD\n` +
      `• Scope Add-ons: ${addonNames || "Standard Core"}\n` +
      `• Timeline: ${currentTier.timeline}\n\n` +
      `Please let me know your current availability for a sprint kickoff.\n\nBest regards,`,
  )
  const emailUrl = `mailto:quamarabrar651@gmail.com?subject=${emailSubject}&body=${emailBody}`

  return (
    <div className="gen-artifact gen-artifact--calculator">
      {/* Deep Research Scope Blueprint */}
      <div className="gen-blueprint-box">
        <div className="gen-blueprint-header">
          <span className="gen-pulse-dot" aria-hidden="true" />
          <span className="gen-blueprint-label">DEEP RESEARCH SCOPE SYNTHESIS</span>
          <span className="gen-blueprint-eta">{currentTier.timeline}</span>
        </div>
        <h4 className="gen-blueprint-title">"{data.idea}"</h4>
        <div className="gen-blueprint-checklist">
          <span className="gen-checklist-heading">Architected Deliverables:</span>
          <ul>
            {currentTier.deliverables.map((item) => (
              <li key={item}>
                <span className="gen-check-symbol">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 1. Core Service Tier Selection */}
      <div className="gen-config-group">
        <label className="gen-group-label">1. Select Service Model:</label>
        <div className="gen-tier-cards-row">
          {(["design", "design_build", "design_build_marketing"] as const).map((key) => {
            const tier = SERVICE_TIERS[key]
            const isSelected = data.tierKey === key
            return (
              <button
                key={key}
                type="button"
                className={`gen-tier-select-card ${isSelected ? "is-selected" : ""}`}
                onClick={() => selectTier(key)}
              >
                <div className="gen-tier-card-top">
                  <span className="gen-tier-code">{tier.code}</span>
                  <span className="gen-tier-range">{tier.rangeLabel}</span>
                </div>
                <strong className="gen-tier-heading">{tier.title}</strong>
                <p className="gen-tier-summary">{tier.summary}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Precision Investment Range Slider ($100 to $3,000) */}
      <div className="gen-config-group">
        <div className="gen-slider-header-row">
          <label htmlFor={sliderId} className="gen-group-label">
            2. Calibrate Investment Range:
          </label>
          <span className="gen-slider-current-val">${data.sliderBudget} USD</span>
        </div>
        <input
          id={sliderId}
          type="range"
          min={100}
          max={3000}
          step={50}
          value={data.sliderBudget}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="gen-slider-input"
        />
        <div className="gen-slider-ticks-row">
          <span>$100 Min</span>
          <span>$750</span>
          <span>$1,500</span>
          <span>$2,250</span>
          <span>$3,000 Max</span>
        </div>
      </div>

      {/* 3. Modular Scope Enhancements */}
      <div className="gen-config-group">
        <label className="gen-group-label">3. Modular Scope Enhancements:</label>
        <div className="gen-addons-stack">
          {ADDON_MODULES.map((addon) => {
            const isChecked = data.selectedAddons.includes(addon.id)
            return (
              <label
                key={addon.id}
                className={`gen-addon-switch-card ${isChecked ? "is-active" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAddon(addon.id)}
                />
                <div className="gen-addon-content">
                  <div className="gen-addon-headline">
                    <span className="gen-addon-tag">{addon.code}</span>
                    <strong className="gen-addon-name">{addon.title}</strong>
                    <span className="gen-addon-cost">{addon.badge}</span>
                  </div>
                  <span className="gen-addon-desc">{addon.description}</span>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      {/* 4. Guaranteed Total Investment Card */}
      <div className="gen-investment-summary-card">
        <div className="gen-summary-left">
          <span className="gen-summary-kicker">Guaranteed Total Investment</span>
          <div className="gen-summary-price">
            <span className="gen-summary-curr">$</span>
            <span className="gen-summary-amt">{totalInvestment}</span>
            <span className="gen-summary-unit">USD</span>
          </div>
          <span className="gen-summary-guarantee">
            Strictly bounded in $100 – $3,000 · Zero hidden fees
          </span>
        </div>
        <div className="gen-summary-right">
          <span className="gen-summary-tier-badge">{currentTier.title}</span>
          <span className="gen-summary-eta">Est. {currentTier.timeline}</span>
        </div>
      </div>

      {/* 5. Direct Proceed Actions */}
      <div className="gen-cta-container">
        <span className="gen-cta-prompt">Initiate project with this estimate:</span>
        <div className="gen-cta-stack">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="gen-action-link gen-action-link--whatsapp"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.89.87-.89 2.12 0 1.26.92 2.47 1.05 2.64.13.17 1.81 2.76 4.38 3.87.61.26 1.09.42 1.46.54.61.2 1.17.17 1.61.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.17-.48-.29" />
            </svg>
            <span>Proceed on WhatsApp (+91 9234566700)</span>
          </a>

          <a href={emailUrl} className="gen-action-link gen-action-link--email">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Email Proposal to quamarabrar651@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  )
}

/**
 * GENERATIVE UI 3:
 * Provenance & Verified Trust Dossier
 */
function GenerativeTrustDossier({
  onExploreWork,
  onCalculate,
}: {
  onExploreWork: () => void
  onCalculate: () => void
}) {
  const [copiedEmail, setCopiedEmail] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_DATA.primaryEmail)
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div className="gen-artifact gen-artifact--trust">
      <div className="gen-artifact-header">
        <div className="gen-pill-row">
          <span className="gen-pill gen-pill--acid">PW VERIFIED</span>
          <span className="gen-pill">PROVENANCE DOSSIER</span>
        </div>
        <h4>
          Built on curiosity. <em>Refined through practice.</em>
        </h4>
        <p className="gen-trust-lead">
          Quamar Abrar is an active product & brand designer at <strong>PW (Physics Wallah)</strong> with 6+ months of intensive enterprise ed-tech experience in Bengaluru, India.
        </p>
      </div>

      {/* 4 Pillars of Trust */}
      <div className="gen-trust-pillars-stack">
        {TRUST_PILLARS.map((p) => (
          <div key={p.number} className="gen-trust-pillar-card">
            <span className="gen-pillar-index">{p.number}</span>
            <div className="gen-pillar-details">
              <h5>{p.title}</h5>
              <span className="gen-pillar-subline">{p.subtitle}</span>
              <p>{p.description}</p>
              <div className="gen-pillar-proof">
                <span className="gen-proof-tag">Proof</span>
                <span className="gen-proof-text">{p.evidence}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Verified Touchpoints Grid */}
      <div className="gen-touchpoints-box">
        <div className="gen-touchpoints-header">
          <span className="gen-touchpoints-title">Direct Verified Touchpoints</span>
          <span className="gen-touchpoints-sub">Direct Line to Quamar Abrar</span>
        </div>

        <div className="gen-touchpoints-list">
          {/* 1. WhatsApp */}
          <a
            href={PROFILE_DATA.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="gen-touch-card gen-touch-card--wa"
          >
            <div className="gen-touch-card-icon gen-touch-card-icon--wa">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.63c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.89.87-.89 2.12 0 1.26.92 2.47 1.05 2.64.13.17 1.81 2.76 4.38 3.87.61.26 1.09.42 1.46.54.61.2 1.17.17 1.61.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.17-.48-.29" />
              </svg>
            </div>
            <div className="gen-touch-card-info">
              <span className="gen-touch-card-label">WhatsApp Direct</span>
              <span className="gen-touch-card-val">{PROFILE_DATA.whatsappDisplay}</span>
            </div>
            <span className="gen-touch-card-arrow">Open Chat ↗</span>
          </a>

          {/* 2. Direct Email */}
          <div className="gen-touch-card gen-touch-card--email">
            <div className="gen-touch-card-icon gen-touch-card-icon--email">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div className="gen-touch-card-info">
              <span className="gen-touch-card-label">Verified Email</span>
              <a
                href={`mailto:${PROFILE_DATA.primaryEmail}`}
                className="gen-touch-card-val gen-touch-card-val--link"
              >
                {PROFILE_DATA.primaryEmail}
              </a>
            </div>
            <button
              type="button"
              className="gen-touch-card-copy-btn"
              onClick={handleCopyEmail}
            >
              {copiedEmail ? "Copied ✓" : "Copy"}
            </button>
          </div>

          {/* 3. LinkedIn */}
          <a
            href={PROFILE_DATA.socialLinks[0].url}
            target="_blank"
            rel="noreferrer"
            className="gen-touch-card gen-touch-card--li"
          >
            <div className="gen-touch-card-icon gen-touch-card-icon--li">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </div>
            <div className="gen-touch-card-info">
              <span className="gen-touch-card-label">LinkedIn Dossier</span>
              <span className="gen-touch-card-val">Quamar Abrar · PW Designer</span>
            </div>
            <span className="gen-touch-card-arrow">Profile ↗</span>
          </a>
        </div>
      </div>

      <div className="gen-artifact-actions-row">
        <button type="button" className="gen-btn-pill gen-btn-pill--primary" onClick={onCalculate}>
          Calculate Project Build Cost ($100 – $3k) ↗
        </button>
        <button type="button" className="gen-btn-pill gen-btn-pill--secondary" onClick={onExploreWork}>
          Inspect All 7 Live Deployments ↗
        </button>
      </div>
    </div>
  )
}

/**
 * GENERATIVE UI 4:
 * Direct Contact Terminal
 */
function GenerativeContactTerminal({
  onCopyEmail,
  copied,
}: {
  onCopyEmail: () => void
  copied: boolean
}) {
  return (
    <div className="gen-artifact gen-artifact--contact">
      <div className="gen-artifact-header">
        <div className="gen-pill-row">
          <span className="gen-pill gen-pill--acid">DIRECT TOUCHPOINTS</span>
        </div>
        <h4>
          Start a <em>Conversation</em>
        </h4>
        <p>Available for select identity, web direction, and frontend development commissions.</p>
      </div>

      <div className="gen-contact-ctas">
        <a
          href={PROFILE_DATA.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="gen-action-link gen-action-link--whatsapp"
        >
          <span>Chat on WhatsApp ({PROFILE_DATA.whatsappDisplay}) ↗</span>
        </a>

        <div className="gen-email-copy-row">
          <a
            href={`mailto:${PROFILE_DATA.primaryEmail}`}
            className="gen-action-link gen-action-link--email"
          >
            <span>Email quamarabrar651@gmail.com ↗</span>
          </a>
          <button type="button" className="gen-copy-btn" onClick={onCopyEmail}>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="gen-social-pills-row">
        {PROFILE_DATA.socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="gen-social-chip"
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </div>
  )
}

/**
 * GENERATIVE UI 5:
 * 18 Philosophies Grid
 */
function GenerativePhilosophiesGrid() {
  return (
    <div className="gen-artifact gen-artifact--philosophies">
      <div className="gen-artifact-header">
        <div className="gen-pill-row">
          <span className="gen-pill gen-pill--acid">AESTHETIC CODEX</span>
          <span className="gen-pill">18 MOVEMENTS</span>
        </div>
        <h4>
          Structure & <em>Surprise</em>
        </h4>
        <p>
          Quamar synthesizes 18 aesthetic movements to craft distinct visual signatures tailored to each brand:
        </p>
      </div>

      <div className="gen-philosophies-cloud">
        {PROFILE_DATA.philosophies.map((name, i) => (
          <span key={name} className="gen-phil-badge">
            <span className="gen-phil-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="gen-phil-name">{name}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Chatbot
