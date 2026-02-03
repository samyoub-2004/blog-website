"use client"
import React from "react"
import { motion } from "framer-motion"

interface TechItem {
  name: string
  logo: string
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
                className="group p-8 max-w-xs w-full transition-all duration-500 flex flex-col items-center justify-center"
              >
                {/* Logo XL centré */}
                <div className="w-20 h-20 flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-300 mb-4">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${item.logo})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    aria-hidden
                  />
                </div>
                {/* Nom de la techno */}
                <div className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors text-center">
                  {item.name}
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  )
}