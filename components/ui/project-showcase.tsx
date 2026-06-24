"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

interface Project {
  title: string
  description: string
  year: string
  link: string
  accent: string
}

const projects: Project[] = [
  {
    title: "TripIt",
    description: "Travel itinerary platform — UI redesign & performance optimization.",
    year: "2024",
    link: "https://www.tripit.com/",
    accent: "#0f2a45",
  },
  {
    title: "Javis Gravy",
    description: "Restaurant website with online ordering & menu management.",
    year: "2024",
    link: "https://www.javisgravy.com/",
    accent: "#3a0f08",
  },
  {
    title: "babi.sh",
    description: "Premium baby fashion e-commerce with seamless checkout.",
    year: "2024",
    link: "https://www.babi.sh/",
    accent: "#260f3a",
  },
  {
    title: "EduSuite",
    description: "Full-stack LMS platform for Pakistan's education sector.",
    year: "2024",
    link: "https://www.edusuite.pk/",
    accent: "#0f2e14",
  },
  {
    title: "Extendicare",
    description: "Senior care corporate website — accessibility & performance.",
    year: "2023",
    link: "https://www.extendicare.com/",
    accent: "#082030",
  },
]

const CARD_W = 340
const CARD_H = 210
const CHROME_H = 32

const previewSrc = (url: string) =>
  `/api/preview?url=${encodeURIComponent(url)}`

/* ─── Single project preview (always loads, never idle) ───────────── */
function ProjectPreview({
  project,
  isActive,
}: {
  project: Project
  isActive: boolean
}) {
  const [imgStatus, setImgStatus] = useState<"loading" | "loaded" | "error">("loading")

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: isActive ? 1 : 0,
        transition: "opacity 0.2s ease",
        pointerEvents: "none",
      }}
    >
      {/* Layer 1 – instant colour base (always visible) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: project.accent,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "rgba(255,255,255,0.09)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          {project.title[0]}
        </span>
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.22)",
          }}
        >
          {project.title}
        </span>
      </div>

      {/* Layer 2 – shimmer while screenshot is in-flight */}
      {imgStatus === "loading" && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.06) 50%,rgba(255,255,255,0) 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite linear",
          }}
        />
      )}

      {/* Layer 3 – real screenshot, fades in once loaded */}
      {/* img is always mounted so browser fetches immediately */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={previewSrc(project.link)}
        alt=""
        onLoad={() => setImgStatus("loaded")}
        onError={() => setImgStatus("error")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
          opacity: imgStatus === "loaded" ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Bottom vignette */}
      <div
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          height: 44,
          background: "linear-gradient(to top,rgba(0,0,0,0.45),transparent)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}

/* ─── Main component ──────────────────────────────────────────────── */
export function ProjectShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [smooth, setSmooth] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number | null>(null)

  /* smooth mouse lerp */
  useEffect(() => {
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const loop = () => {
      setSmooth((p) => ({ x: lerp(p.x, mouse.x, 0.12), y: lerp(p.y, mouse.y, 0.12) }))
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [mouse])

  /* preload all screenshots as soon as section enters viewport */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          projects.forEach((p) => {
            const img = new window.Image()
            img.src = previewSrc(p.link)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        onMouseMove={(e: React.MouseEvent) => {
          const rect = sectionRef.current?.getBoundingClientRect()
          if (!rect) return
          setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
        }}
        className="relative w-full"
      >
        {/* ── Floating preview card ─────────────────────────────── */}
        {/* position:absolute (not fixed) so Lenis v1 transform on <html> doesn't displace the card */}
        <div
          className="pointer-events-none absolute z-50 hidden lg:block"
          style={{
            left: 0,
            top: 0,
            width: CARD_W,
            height: CARD_H + CHROME_H,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow:
              "0 24px 56px -8px rgba(0,0,0,0.55),0 0 0 1px rgba(255,255,255,0.07)",
            transform: `translate3d(${smooth.x + 28}px,${smooth.y - (CARD_H + CHROME_H) / 2}px,0) scale(${visible ? 1 : 0.88})`,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.18s ease,transform 0.18s ease",
          }}
        >
          {/* Browser chrome */}
          <div
            style={{
              height: CHROME_H,
              background: "#1c1c1e",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "0 10px",
            }}
          >
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", flexShrink: 0 }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", flexShrink: 0 }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", flexShrink: 0 }} />
            <div
              style={{
                flex: 1,
                marginLeft: 8,
                height: 18,
                background: "rgba(255,255,255,0.07)",
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                color: "rgba(255,255,255,0.3)",
                overflow: "hidden",
                whiteSpace: "nowrap",
                padding: "0 8px",
              }}
            >
              {hoveredIndex !== null
                ? projects[hoveredIndex].link
                    .replace(/^https?:\/\//, "")
                    .replace(/\/$/, "")
                : ""}
            </div>
          </div>

          {/* Preview viewport */}
          <div style={{ position: "relative", width: CARD_W, height: CARD_H }}>
            {projects.map((project, i) => (
              <ProjectPreview
                key={project.title}
                project={project}
                isActive={hoveredIndex === i}
              />
            ))}
          </div>
        </div>

        {/* ── Project rows ─────────────────────────────────────── */}
        <div>
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              onMouseEnter={(e) => {
                const rect = sectionRef.current?.getBoundingClientRect()
                if (rect) {
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  setMouse({ x, y })
                  setSmooth({ x, y })
                }
                setHoveredIndex(i)
                setVisible(true)
              }}
              onMouseLeave={() => { setHoveredIndex(null); setVisible(false) }}
            >
              <div
                className="relative py-5 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="absolute inset-0 -mx-4 rounded-lg"
                  style={{
                    background: "var(--bg-secondary)",
                    opacity: hoveredIndex === i ? 1 : 0,
                    transform: hoveredIndex === i ? "scale(1)" : "scale(0.97)",
                    transition: "opacity 0.22s ease,transform 0.22s ease",
                  }}
                />

                <div className="relative flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="inline-flex items-center gap-2">
                      <h3
                        className="font-medium text-base tracking-tight sm:text-lg"
                        style={{ color: "var(--text-primary)" }}
                      >
                        <span className="relative">
                          {project.title}
                          <span
                            className="absolute left-0 -bottom-0.5 h-px"
                            style={{
                              background: "var(--text-primary)",
                              width: hoveredIndex === i ? "100%" : "0%",
                              transition: "width 0.28s ease",
                            }}
                          />
                        </span>
                      </h3>
                      <ArrowUpRight
                        className="w-4 h-4"
                        style={{
                          color: "var(--text-secondary)",
                          opacity: hoveredIndex === i ? 1 : 0,
                          transform: hoveredIndex === i
                            ? "translate(0,0)"
                            : "translate(-5px,5px)",
                          transition: "opacity 0.22s ease,transform 0.22s ease",
                        }}
                      />
                    </div>
                    <p
                      className="text-sm mt-1 leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.description}
                    </p>
                  </div>
                  <span
                    className="text-xs font-mono tabular-nums shrink-0"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.year}
                  </span>
                </div>
              </div>
            </a>
          ))}
          <div className="border-t" style={{ borderColor: "var(--border)" }} />
        </div>
      </section>
    </>
  )
}
