"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SLIDES = [
  { src: "/images/1 (1).webp", title: "Site Vitrine" },
  { src: "/images/1 (2).webp", title: "E‑commerce" },
  { src: "/images/1 (3).webp", title: "Landing Page" },
  { src: "/images/1 (4).webp", title: "Portfolio" },
  { src: "/images/1 (5).webp", title: "SaaS" },
  { src: "/images/1 (6).webp", title: "Blog / Mag" },
]

export function ShowcaseCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  const count = SLIDES.length

  const scrollToIndex = (i: number) => {
    if (!trackRef.current) return
    const slides = Array.from(trackRef.current.children) as HTMLElement[]
    const next = ((i % count) + count) % count
    const el = slides[next]
    if (!el) return
    const container = trackRef.current
    const containerRect = container.getBoundingClientRect()
    const slideRect = el.getBoundingClientRect()
    const currentScroll = container.scrollLeft
    const target = currentScroll + (slideRect.left - containerRect.left) - (containerRect.width - slideRect.width) / 2
    container.scrollTo({ left: target, behavior: "smooth" })
    setIndex(next)
  }

  const onPrev = () => scrollToIndex(index - 1)
  const onNext = () => scrollToIndex(index + 1)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let raf: number | null = null
    let timer: number | null = null

    const tick = () => {
      if (hovered) return
      scrollToIndex(index + 1)
    }

    timer = window.setInterval(tick, 4000)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (timer) clearInterval(timer)
    }
  }, [index, hovered])

  const onScroll = () => {
    const container = trackRef.current
    if (!container) return
    const slides = Array.from(container.children) as HTMLElement[]
    const containerCenter = container.scrollLeft + container.clientWidth / 2
    let closest = 0
    let minDist = Infinity
    slides.forEach((el, i) => {
      const center = el.offsetLeft + el.clientWidth / 2
      const d = Math.abs(center - containerCenter)
      if (d < minDist) {
        minDist = d
        closest = i
      }
    })
    setIndex(closest)
  }

  return (
    <section className="relative py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.06),_transparent_60%)]" />
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-6 sm:mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Des interfaces qui parlent d’elles‑mêmes</h2>
          <p className="mt-3 text-sm sm:text-base text-white/60">Faites défiler pour découvrir des présentations de sites modernes.</p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent" />

          {/* Track */}
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 px-2 scrollbar-none"
          >
            {SLIDES.map((s, i) => (
              <div
                key={s.src}
                className="snap-center relative shrink-0 min-w-[85%] sm:min-w-[65%] lg:min-w-[42%]"
              >
                <div className="rounded-[22px] bg-white/5 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.02]">
                  <div className="h-7 bg-white/10 border-b border-white/10 flex items-center gap-1 px-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                    <span className="ml-2 text-[10px] uppercase tracking-wider text-white/60">{s.title}</span>
                  </div>
                  <div className="aspect-[16/10]">
                    <img src={s.src} alt={s.title} className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            aria-label="Précédent"
            onClick={onPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-black hover:bg-white shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            aria-label="Suivant"
            onClick={onNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 text-black hover:bg-white shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="mt-5 flex items-center justify-center gap-2">
            {SLIDES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
