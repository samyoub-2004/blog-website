"use client"

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react"
import Image from "next/image"

const projects = [
  { id: 1, title: "Lily Go", category: "E-commerce • 2024", image: "/lilygoLaptop.png" },
  { id: 2, title: "Le Parking VTC", category: "Site Vitrine • Mobile", image: "/leparkingvtcLaptop.png" },
  { id: 3, title: "DZ Shop", category: "E-commerce • 2024", image: "/dzshop.png" },
  { id: 4, title: "Hanane's Signature Patisserie", category: "Site Vitrine • 2025", image: "/pattiserie.webp" },
  { id: 5, title: "AAFD Val de Saône", category: "Application Web • 2026", image: "/aafd.webp" }
]

export function PortfolioCarousel() {
  // On utilise un tuple [index, direction] pour que Framer Motion sache d'où vient l'image
  const [[page, direction], setPage] = useState([0, 0]);
  const activeIndex = Math.abs(page % projects.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const variants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="relative group max-w-6xl mx-auto px-4 overflow-hidden">
      {/* --- MOCKUP PRINCIPAL --- */}
      <div className="relative aspect-[16/10] md:aspect-[16/10] aspect-[4/5] w-full bg-[#0a0a0a] rounded-[16px] md:rounded-[24px] border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Barre de navigation style Navigateur (cachée sur mobile) */}
        <div className="hidden md:flex h-8 bg-white/5 border-b border-white/10 items-center gap-1.5 px-4 z-50 relative backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        </div>

        {/* Boutons Navigation (Visible uniquement sur Desktop au hover) */}
        <div className="hidden md:flex absolute inset-0 z-50 items-center justify-between p-4 pointer-events-none">
          <button 
            onClick={() => paginate(-1)} 
            className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto active:scale-90"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => paginate(1)} 
            className="p-3 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/10 hover:bg-blue-600 transition-all opacity-0 group-hover:opacity-100 pointer-events-auto active:scale-90"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Slider avec AnimatePresence */}
        <div className="relative w-full h-full touch-pan-y">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag={typeof window !== 'undefined' && window.innerWidth < 768 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                const swipeThreshold = 50;
                if (swipe < -swipeThreshold) paginate(1);
                else if (swipe > swipeThreshold) paginate(-1);
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Effet Glow Arrière-plan */}
              <Image 
                src={projects[activeIndex].image} 
                alt="" fill 
                className="object-cover scale-110 blur-[50px] opacity-30 select-none pointer-events-none"
              />
              
              {/* Image Principale Nette */}
              <div className="relative w-full h-full p-3 md:p-10">
                <Image 
                  src={projects[activeIndex].image} 
                  alt={projects[activeIndex].title} 
                  fill 
                  priority
                  className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] select-none pointer-events-none"
                />
              </div>

              {/* Infos Projet en Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-50 bg-gradient-to-t from-black via-black/60 to-transparent">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-between items-end gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-blue-400 font-mono text-[10px] md:text-xs mb-1 uppercase tracking-widest">
                      {projects[activeIndex].category}
                    </p>
                    <h3 className="text-lg md:text-4xl font-black text-white uppercase tracking-tighter truncate">
                      {projects[activeIndex].title}
                    </h3>
                  </div>
                  <button className="hidden md:flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all shrink-0">
                    PROJET <ArrowUpRight size={18} />
                  </button>
                  {/* Bouton mobile */}
                  <button className="flex md:hidden items-center gap-1 bg-white text-black px-3 py-2 rounded-full text-xs font-bold hover:bg-blue-600 hover:text-white transition-all shrink-0">
                    <ArrowUpRight size={14} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Dots (Indicateurs) */}
      <div className="flex justify-center gap-3 mt-8">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage([i, i > activeIndex ? 1 : -1])}
            className={`h-1.5 transition-all duration-500 rounded-full ${
              i === activeIndex ? "w-12 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "w-2.5 bg-white/10 hover:bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  )
}