"use client"

import { PortfolioCarousel } from "./portfolio-carousel"
import { motion } from "framer-motion"

export function ShowcaseSection() {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        {/* En-tête simplifié et percutant */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Nos dernières <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">réalisations</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Des interfaces sur mesure conçues pour la performance et l'expérience utilisateur.
          </motion.p>
        </div>

        {/* Le Carrousel prend maintenant toute la largeur max */}
        <div className="max-w-6xl mx-auto">
          <PortfolioCarousel />
        </div>
      </div>
    </section>
  )
}