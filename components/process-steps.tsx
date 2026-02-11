"use client"

import React from "react"
import { Sparkles, Code, Rocket } from "lucide-react"

export function ProcessSteps() {
  const steps = [
    {
      title: "Brief & Audit",
      desc: "Nous cadrons vos objectifs, audiences, contraintes et inspirations pour un projet sur mesure.",
      num: "1",
      icon: Sparkles,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Design & Build",
      desc: "Maquette haute fidélité, puis intégration soignée avec animations fluides et responsive total.",
      num: "2",
      icon: Code,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Mise en ligne",
      desc: "Optimisations performances, SEO aux petits oignons, déploiement et suivi technique.",
      num: "3",
      icon: Rocket,
      color: "from-orange-500 to-red-500",
    },
  ]

  return (
    <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-white rounded-t-[40px] sm:rounded-t-[60px] rounded-b-[40px] sm:rounded-b-[60px]">
      {/* Background Effects */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/5 backdrop-blur-md border border-black/10 text-black/60 text-xs sm:text-sm font-medium mb-6">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full mr-2 animate-pulse" />
            Notre Processus
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4">
            Du concept au <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">lancement</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-black/70 max-w-2xl mx-auto">
            Une méthode éprouvée pour des résultats exceptionnels
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.num}
                className="relative group bg-black/[0.03] border border-black/10 rounded-3xl p-8 transition-all duration-300 hover:bg-black/[0.06] hover:-translate-y-1"
              >
                {/* Icon Badge with Gradient */}
                <div className={`mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                {/* Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-black to-gray-800 flex items-center justify-center font-black text-white text-sm shadow-lg">
                  {step.num}
                </div>
                
                {/* Content */}
                <h3 className="text-black text-2xl font-bold mb-3">
                  {step.title}
                </h3>
                
                <p className="text-black/60 text-base leading-relaxed">
                  {step.desc}
                </p>

                {/* Connection Line (desktop only) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-black/20 to-transparent z-10" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
