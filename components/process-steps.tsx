"use client"

import React from "react"
import { motion } from "framer-motion"
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
    <section className="relative py-24 overflow-hidden bg-white rounded-t-[60px] rounded-b-[60px]">
      {/* Background Effects */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 text-black/60 text-xs font-mono uppercase tracking-widest mb-6"
          >
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Notre Processus
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-black mb-4"
          >
            Du concept au <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">lancement</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-black/70 max-w-2xl mx-auto"
          >
            Une méthode éprouvée pour des résultats exceptionnels
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                className="relative group bg-black/[0.03] border border-black/10 rounded-3xl p-8 transition-all duration-500 hover:bg-black/[0.06] hover:-translate-y-2"
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
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
