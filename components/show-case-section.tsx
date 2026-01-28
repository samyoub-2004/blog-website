"use client"

import { PortfolioCarousel } from "./portfolio-carousel"
import { motion } from "framer-motion"

export function ShowcaseSection() {
  return (
    <section className="py-24 bg-[#05070a] overflow-hidden">
      <div className="container mx-auto px-6">
        {/* En-tête simplifié et percutant */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Nos dernières <span className="text-blue-500">réalisations</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Des interfaces sur mesure conçues pour la performance et l'expérience utilisateur.
          </p>
        </div>

        {/* Le Carrousel prend maintenant toute la largeur max */}
        <div className="max-w-6xl mx-auto">
          <PortfolioCarousel />
        </div>
      </div>
    </section>
  )
}