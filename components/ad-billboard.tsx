"use client"

import React, { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const SLIDES = [
  {
    title: "Site Vitrine Moderne",
    subtitle: "Design élégant, vitesse, et SEO prêt pour performer.",
    tag: "Vitrine",
    src: "/images/1 (1).webp",
  },
  {
    title: "E‑commerce Confiance",
    subtitle: "Parcours d’achat fluide, conversion optimisée.",
    tag: "E‑commerce",
    src: "/images/1 (2).webp",
  },
  {
    title: "Landing Page Impact",
    subtitle: "Un message clair, un CTA puissant, des résultats.",
    tag: "Acquisition",
    src: "/images/1 (4).webp",
  },
  {
    title: "Portfolio Créatif",
    subtitle: "Mettez vos travaux en valeur avec une expérience premium.",
    tag: "Portfolio",
    src: "/images/1 (6).webp",
  },
]

export function AdBillboard() {
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)

  const count = SLIDES.length
  const next = () => setIndex((i) => (i + 1) % count)
  const prev = () => setIndex((i) => (i - 1 + count) % count)

  useEffect(() => {
    if (hovered) return
    const t = setInterval(next, 4500)
    return () => clearInterval(t)
  }, [hovered])

  return (
    <section className="relative py-12 sm:py-16">
      <style>{`
        @keyframes progressGrow { from { width: 0 } to { width: 100% } }
      `}</style>
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="relative rounded-[28px] overflow-hidden border border-white/10 bg-gradient-to-b from-white/10 to-transparent shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Progress */}
          <div className="h-1 bg-white/10">
            <div
              key={index}
              className="h-full bg-white/80"
              style={{ animation: "progressGrow 4.5s linear forwards" }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-6 sm:p-10">
            {/* Textual side */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Sites sur‑mesure • Performance • SEO
              </div>
              <h3 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                {SLIDES[index].title}
              </h3>
              <p className="mt-3 text-white/70 text-sm sm:text-base max-w-prose">
                {SLIDES[index].subtitle}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center rounded-full bg-white text-black px-5 py-2.5 text-sm font-semibold hover:bg-gray-100 transition"
                >
                  Voir le portfolio
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/0 text-white px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition"
                >
                  Devis gratuit
                </a>
              </div>
              <div className="mt-6 text-[11px] uppercase tracking-wider text-white/40 font-semibold">
                Catégorie: {SLIDES[index].tag}
              </div>
            </div>

            {/* Visual side */}
            <div className="relative">
              <div className="relative rounded-[22px] overflow-hidden bg-white/5 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                <div className="h-7 bg-white/10 border-b border-white/10 flex items-center gap-1 px-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                  <span className="ml-2 text-[10px] uppercase tracking-wider text-white/60">Aperçu visuel</span>
                </div>
                <div className="relative aspect-[16/10]">
                  {SLIDES.map((s, i) => (
                    <img
                      key={s.src}
                      src={s.src}
                      alt={s.title}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                        i === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Controls */}
              <div className="absolute inset-x-0 -bottom-4 flex items-center justify-center gap-3">
                <button
                  aria-label="Précédent"
                  onClick={prev}
                  className="p-2 rounded-full bg-white/90 text-black hover:bg-white shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  aria-label="Suivant"
                  onClick={next}
                  className="p-2 rounded-full bg-white/90 text-black hover:bg-white shadow-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
