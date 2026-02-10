"use client"

import { PortfolioCarousel } from "./portfolio-carousel"
import { motion } from "framer-motion"

export function ShowcaseSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* En-tête simplifié et percutant */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 tracking-tight"
          >
            Nos dernières <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">réalisations</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl sm:max-w-2xl mx-auto px-2"
          >
            Des interfaces sur mesure conçues pour la performance et l'expérience utilisateur.
          </motion.p>
        </div>

        {/* Le Carrousel prend maintenant toute la largeur max */}
        <div className="max-w-4xl sm:max-w-6xl mx-auto">
          <PortfolioCarousel />
        </div>
      </div>
    </section>
  )
}