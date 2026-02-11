"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function TechStackSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 300)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

const techItems = [
    { 
      name: "React", 
      logo: "https://cdn.simpleicons.org/react/61DAFB" 
    },
    { 
      name: "Next.js", 
      logo: "https://cdn.simpleicons.org/nextdotjs/white" 
    },
    { 
      name: "Tailwind CSS", 
      logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" 
    },
    { 
      name: "TypeScript", 
      logo: "https://cdn.simpleicons.org/typescript/3178C6" 
    },
    { 
      name: "Node.js", 
      logo: "https://cdn.simpleicons.org/nodedotjs/339933" 
    },
    { 
      name: "PostgreSQL", 
      logo: "https://cdn.simpleicons.org/postgresql/4169E1" 
    },
    { 
      name: "Prisma", 
      logo: "https://cdn.simpleicons.org/prisma/2D3748" 
    },
    { 
      name: "Supabase", 
      logo: "https://cdn.simpleicons.org/supabase/3ECF8E" 
    },
    { 
      name: "Firebase", 
      logo: "https://cdn.simpleicons.org/firebase/FFCA28" 
    },
    { 
      name: "Google Analytics", 
      logo: "https://cdn.simpleicons.org/googleanalytics/E37400" 
    },
    { 
      name: "Google Cloud", 
      logo: "https://cdn.simpleicons.org/googlecloud/4285F4" 
    },
    { 
      name: "Framer Motion", 
      logo: "https://cdn.simpleicons.org/framer/0055FF" 
    },
    { 
      name: "Resend", 
      logo: "https://cdn.simpleicons.org/resend/white" 
    },
    { 
      name: "Figma", 
      logo: "https://cdn.simpleicons.org/figma/F24E1E" 
    },
    { 
      name: "GitHub", 
      logo: "https://cdn.simpleicons.org/github/white" 
    }
  ]

  return (
    <section id="tech-stack" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium mb-6">
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2 animate-pulse" />
            Expertise Technique
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Stack</span> de prédilection
          </h2>
        </div>

        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative overflow-hidden">
          <motion.div
            animate={{ translateX: "-50%" }}
            transition={{
              duration: 45,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
              repeatType: "loop",
            }}
            className="flex py-8"
            style={{ 
              width: `${15 * 160 * 2}px`,
              gap: "0px"
            }}
          >
            {[...new Array(2)].map((_, index) => (
              <div key={index} className="flex shrink-0" style={{ gap: "0px" }}>
                {techItems.map((item, i) => (
                  <div
                    key={`${index}-${i}`}
                    className="group flex flex-col items-center justify-center shrink-0"
                    style={{ 
                      width: "160px",
                      minWidth: "160px",
                      padding: "0 20px"
                    }}
                  >
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
                    <div className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors text-center whitespace-nowrap px-2">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}