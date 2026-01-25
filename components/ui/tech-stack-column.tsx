"use client"
import React from "react"
import { motion } from "framer-motion"

interface TechItem {
  text: string
  name: string
  role: string
}

export const TechStackColumn = (props: {
  className?: string
  items: TechItem[]
  duration?: number
}) => {
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
            {props.items.map(({ text, name, role }, i) => (
              <div
                key={i}
                className="group p-8 rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-md max-w-xs w-full transition-all duration-500 hover:border-white/30 hover:bg-white/5"
                style={{ boxShadow: "0 10px 30px -15px rgba(0,0,0,0.5)" }}
              >
                <div className="mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 rounded-md bg-white/5 text-white/50 border border-white/5">
                    {role}
                  </span>
                </div>
                <div className="text-2xl font-semibold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300">
                  {name}
                </div>
                <div className="mt-3 text-gray-400 text-sm leading-relaxed font-light">
                  {text}
                </div>
                <div className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 group-hover:w-full rounded-full" />
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}