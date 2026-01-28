"use client"

import React, { useState } from "react"

export function BeforeAfterSlider() {
  const [pos, setPos] = useState(50)
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Avant / Après</h2>
          <p className="mt-3 text-sm sm:text-base text-white/60">Montrez l'impact d'une refonte en un coup d'œil.</p>
        </div>

        <div className="relative mx-auto max-w-5xl rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
          <div className="relative aspect-[16/9]">
            <img src="/images/1 (5).webp" alt="Après" className="absolute inset-0 h-full w-full object-cover" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <img src="/images/1 (3).webp" alt="Avant" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
              <div className="h-full w-[2px] bg-white/70" />
            </div>
          </div>
          <div className="p-4 bg-black/40 border-t border-white/10">
            <input
              aria-label="Position du comparateur"
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              className="w-full accent-white"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
