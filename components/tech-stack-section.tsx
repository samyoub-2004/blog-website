"use client"

import { useEffect, useRef } from "react"
import { TechStackColumn } from "@/components/ui/tech-stack-column"

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
      role: "Frontend", 
      logo: "https://cdn.simpleicons.org/react/61DAFB", 
      text: "Interfaces réactives et composants réutilisables." 
    },
    { 
      name: "Next.js", 
      role: "Framework", 
      logo: "https://cdn.simpleicons.org/nextdotjs/white", 
      text: "Optimisation SEO et rendu côté serveur (SSR)." 
    },
    { 
      name: "Tailwind CSS", 
      role: "Design", 
      logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4", 
      text: "Design moderne et responsive ultra-rapide." 
    },
    { 
      name: "TypeScript", 
      role: "Language", 
      logo: "https://cdn.simpleicons.org/typescript/3178C6", 
      text: "Code sécurisé et typage statique rigoureux." 
    },
    { 
      name: "Node.js", 
      role: "Backend", 
      logo: "https://cdn.simpleicons.org/nodedotjs/339933", 
      text: "Développement serveur performant et scalable." 
    },
    { 
      name: "PostgreSQL", 
      role: "Database", 
      logo: "https://cdn.simpleicons.org/postgresql/4169E1", 
      text: "Base de données relationnelle puissante et fiable." 
    },
    { 
      name: "Prisma", 
      role: "ORM", 
      logo: "https://cdn.simpleicons.org/prisma/2D3748", 
      text: "Gestion simplifiée de la base de données." 
    },
    { 
      name: "Supabase", 
      role: "BaaS", 
      logo: "https://cdn.simpleicons.org/supabase/3ECF8E", 
      text: "Auth et DB temps réel en toute simplicité." 
    },
    { 
      name: "Framer Motion", 
      role: "Motion", 
      logo: "https://cdn.simpleicons.org/framer/0055FF", 
      text: "Animations web fluides et interactives." 
    },
    { 
      name: "Resend", 
      role: "Email", 
      logo: "https://cdn.simpleicons.org/resend/white", 
      text: "Envoi d'emails transactionnels moderne." 
    },
    { 
      name: "Figma", 
      role: "Design Tool", 
      logo: "https://cdn.simpleicons.org/figma/F24E1E", 
      text: "Conception d'interfaces et prototypage." 
    },
    { 
      name: "GitHub", 
      role: "Workflow", 
      logo: "https://cdn.simpleicons.org/github/white", 
      text: "Gestion de version et travail collaboratif." 
    }
  ]

  return (
    <section id="tech-stack" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-32">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-white/30"></div>
            Expertise Technique
            <div className="w-8 h-px bg-white/30"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-4xl md:text-6xl font-bold text-white tracking-tight">
            Ma <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">stack</span> de prédilection
          </h2>
        </div>

        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative flex justify-center items-center min-h-[600px] md:min-h-[800px] overflow-hidden">
          <div className="flex gap-8 max-w-6xl" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
            <TechStackColumn items={techItems.slice(0, 4)} duration={25} className="flex-1" />
            <TechStackColumn items={techItems.slice(4, 8)} duration={18} className="flex-1 hidden md:block" />
            <TechStackColumn items={techItems.slice(8, 12)} duration={30} className="flex-1 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}