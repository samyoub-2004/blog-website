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
    { name: "React & Next.js", role: "Frontend", text: "Architecture d'applications modernes avec Server Components." },
    { name: "Tailwind CSS", role: "Design", text: "Stylisation rapide et responsive avec contrôle total." },
    { name: "TypeScript", role: "Language", text: "Code typé pour une maintenance et une fiabilité accrues." },
    { name: "Node.js", role: "Backend", text: "APIs robustes et scalables pour vos applications." },
    { name: "Framer Motion", role: "Motion", text: "Animations fluides et transitions haut de gamme." },
    { name: "PostgreSQL", role: "Database", text: "Gestion de données complexes et optimisées." },
    { name: "Figma", role: "Design Tool", text: "Maquettage et prototypage pour une UX soignée." },
    { name: "Git & GitHub", role: "Workflow", text: "Collaboration efficace et gestion de version rigoureuse." },
    { name: "Prisma", role: "ORM", text: "Modélisation de données simplifiée et requêtes sécurisées avec TypeScript." },
    { name: "Supabase", role: "Backend / Auth", text: "Gestion de l'authentification et base de données temps réel." },
    { name: "Resend", role: "Email Service", text: "Envoi d'emails transactionnels avec une intégration React fluide." },
  ]

  return (
    <section id="tech-stack" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="h-full w-full" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: "80px 80px" }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-32">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-white/30"></div>
            Expertise Technique
            <div className="w-8 h-px bg-white/30"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance">
            Ma <span className="font-medium italic">stack</span> de prédilection
          </h2>
        </div>

        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative flex justify-center items-center min-h-[600px] md:min-h-[800px] overflow-hidden">
          <div className="flex gap-8 max-w-6xl" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)" }}>
            <TechStackColumn items={techItems.slice(0, 4)} duration={25} className="flex-1" />
            <TechStackColumn items={techItems.slice(4, 8)} duration={18} className="flex-1 hidden md:block" />
            <TechStackColumn items={techItems.slice(8, 11)} duration={30} className="flex-1 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}