"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Lily Go",
    category: "E-commerce • 2024",
    image: "/lilygoLaptop.png",
  },
  {
    id: 2,
    title: "Le Parking VTC",
    category: "Site Vitrine • Mobile",
    image: "/leparkingvtcLaptop.png",
  },
  {
    id: 3,
    title: "DZ Shop",
    category: "E-commerce • 2024",
    image: "/dzshop.png",
  },
]

export function PortfolioCarousel() {
  const [index, setIndex] = useState(0)

  const next = () => setIndex((prev) => (prev + 1) % projects.length)
  const prev = () => setIndex((prev) => (prev - 1 + projects.length) % projects.length)

  return (
    <div className="relative group">
      {/* Conteneur Principal (Mockup Laptop) */}
      <div className="relative aspect-[16/9] w-full bg-[#161b22] rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Navigation Overlays */}
        <div className="absolute inset-0 z-20 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prev} className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-blue-600 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button onClick={next} className="p-3 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/10 hover:bg-blue-600 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Images avec Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "circOut" }}
            className="relative w-full h-full"
          >
            {/* Si tu n'as pas encore les images, ce div servira de placeholder coloré */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent z-10" />

            {/* Background (cover) + Foreground (contain) to avoid important content being cropped */}
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 scale-[1.06] blur-[18px] opacity-60"
                style={{
                  backgroundImage: `url(${projects[index].image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${projects[index].image})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
                aria-hidden
              />
            </div>

            {/* Overlay Infos Projet */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-30 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-between items-end"
              >
                <div>
                  <p className="text-blue-400 font-mono text-sm mb-2">{projects[index].category}</p>
                  <h3 className="text-3xl font-bold text-white">{projects[index].title}</h3>
                </div>
                <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all">
                  Voir le projet <ArrowUpRight size={18} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicateurs (Dots) */}
      <div className="flex justify-center gap-2 mt-8">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              i === index ? "w-12 bg-blue-500" : "w-3 bg-gray-700 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  )
} 