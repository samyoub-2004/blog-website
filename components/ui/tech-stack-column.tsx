"use client"
import React from "react"
import { motion } from "framer-motion"

interface TechItem {
  name: string
  role: string
  text: string
  logo: string // On va passer l'URL du logo ici
}

export const TechStackColumn = (props: { items: TechItem[], duration?: number, className?: string }) => {
  return (
    <div className={`relative overflow-hidden h-[700px] ${props.className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.items.map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md max-w-xs w-full transition-all duration-500 hover:border-white/30 hover:bg-white/5"
              >
                <div className="flex items-center gap-4 mb-4">
                  {/* LOGO ORIGINAL ICI */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 p-2 group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={item.logo} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                    {item.role}
                  </span>
                </div>
                <div className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {item.name}
                </div>
                <div className="mt-3 text-gray-400 text-sm leading-relaxed font-light">
                  {item.text}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}