"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"

const projects = [
  { id: 1, title: "Lily Go", category: "E-commerce • 2024", image: "images/lilygoLaptop.webp" },
  { id: 2, title: "Le Parking VTC", category: "Site Vitrine • Mobile", image: "images/leparkingvtcLaptop(2).webp" },
  { id: 3, title: "DZ Shop", category: "E-commerce • 2024", image: "/dzshop.png" },
  { id: 4, title: "Hanane's Signature Patisserie", category: "Site Vitrine • 2025", image: "images/hananessignatureLaptop(2).webp" },
  { id: 5, title: "AAFD Val de Saône", category: "Application Web • 2026", image: "images/aafdLaptop.webp" }
]

export function PortfolioCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const next = () => setActiveIndex((activeIndex + 1) % projects.length)
  const prev = () => setActiveIndex((activeIndex - 1 + projects.length) % projects.length)

  return (
    <div className="relative group max-w-4xl sm:max-w-6xl mx-auto px-2 sm:px-4">
      
      {/* Desktop Version */}
      <div className="hidden sm:block relative aspect-[16/10] w-full bg-[#0a0a0a] rounded-[16px] sm:rounded-[32px] border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Top Bar */}
        <div className="flex h-6 sm:h-9 bg-white/5 border-b border-white/10 items-center gap-1 sm:gap-2 px-3 sm:px-5 z-50 relative backdrop-blur-md">
          <div className="flex gap-1 sm:gap-2">
            <span className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-red-500/40" />
            <span className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-yellow-500/40" />
            <span className="w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-green-500/40" />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 z-50 flex items-center justify-between p-3 sm:p-6 pointer-events-none">
          <button 
            onClick={prev} 
            className="p-2 sm:p-4 rounded-full bg-black/40 backdrop-blur-xl text-white border border-white/10 hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto"
          >
            <ChevronLeft size={20} className="sm:w-7 sm:h-7" />
          </button>
          <button 
            onClick={next} 
            className="p-2 sm:p-4 rounded-full bg-black/40 backdrop-blur-xl text-white border border-white/10 hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto"
          >
            <ChevronRight size={20} className="sm:w-7 sm:h-7" />
          </button>
        </div>

        {/* Image Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image 
              src={projects[activeIndex].image} 
              alt="" 
              fill 
              className="object-cover scale-110 blur-[70px] opacity-25 pointer-events-none"
            />
          
          <div className="relative w-full h-full p-12">
            <Image 
              src={projects[activeIndex].image} 
              alt={projects[activeIndex].title} 
              fill 
              className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
            />
          </div>

          {/* Project Info */}
          <div className="absolute bottom-0 left-0 right-0 p-12 z-50 bg-gradient-to-t from-black via-black/40 to-transparent">
            <div className="flex justify-between items-end gap-4">
              <div className="min-w-0">
                <p className="text-blue-400 font-mono text-sm mb-1 uppercase tracking-[0.3em]">
                  {projects[activeIndex].category}
                </p>
                <h3 className="text-6xl font-black text-white uppercase tracking-tighter truncate">
                  {projects[activeIndex].title}
                </h3>
              </div>
              
              <button className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all shrink-0 shadow-xl">
                VOIR PROJET <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile Version - Simple Grid */}
      <div className="sm:hidden space-y-4">
        {projects.slice(0, 3).map((project) => (
          <div key={project.id} className="relative aspect-[4/5] w-full bg-[#0a0a0a] rounded-[16px] border border-white/10 shadow-xl overflow-hidden">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-contain p-4"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
              <p className="text-blue-400 font-mono text-[9px] mb-1 uppercase tracking-widest">
                {project.category}
              </p>
              <h3 className="text-lg font-black text-white uppercase tracking-tighter">
                {project.title}
              </h3>
              
              <button className="mt-3 flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-bold text-xs shadow-xl">
                VOIR <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots - Desktop Only */}
      <div className="hidden sm:flex justify-center gap-3 mt-6 sm:mt-10">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              i === activeIndex 
                ? "w-10 sm:w-14 bg-blue-500" 
                : "w-3 bg-white/10 hover:bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}