"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"

const QA = [
  {
    q: "Combien de temps pour livrer un site vitrine ?",
    a: "Entre 1 et 3 semaines selon le nombre de pages, le contenu fourni et le niveau d'animation.",
  },
  {
    q: "Pouvez‑vous gérer le SEO et la performance ?",
    a: "Oui. Nous optimisons Core Web Vitals, le balisage sémantique, le sitemap/robots et la structure des contenus.",
  },
  {
    q: "Puis‑je demander des évolutions après la mise en ligne ?",
    a: "Bien sûr. Nous proposons une maintenance mensuelle/annuelle avec évolutions et support prioritaire.",
  },
  {
    q: "Est‑ce responsive sur mobile et tablette ?",
    a: "Oui, chaque interface est pensée pour tous les formats d’écran avec une attention particulière à l’ergonomie.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
          >
            Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">fréquentes</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-white/70 max-w-2xl mx-auto"
          >
            L'essentiel pour décider rapidement.
          </motion.p>
        </div>
        <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
          {QA.map((item, i) => {
            const isOpen = open === i
            return (
              <div key={item.q} className="p-5 sm:p-6">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left"
                >
                  <span className="text-white font-semibold">{item.q}</span>
                  <span className="text-white/60 text-xl leading-none">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="mt-3 text-sm text-white/70 leading-relaxed">{item.a}</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
