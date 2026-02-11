import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import DotGridShader from "@/components/DotGridShader"

import ProjectCard from "@/components/project-card"
import AnimatedHeading from "@/components/animated-heading"
import RevealOnView from "@/components/reveal-on-view"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { Background } from "@/components/background"

export default function Page() {
  const projects = [
    {
      title: "Lily Go",
      subtitle: "E-commerce • 2024",
      imageSrc: "/lilygoLaptop.png",
      tags: ["E-commerce", "Web", "Design"],
      href: "#project-1",
      gradientFrom: "#064e3b",
      gradientTo: "#10b981",
    },
    {
      title: "Le Parking VTC",
      subtitle: "Site Vitrine • Mobile",
      imageSrc: "/leparkingvtcLaptop.png",
      tags: ["Vitrine", "Mobile", "Web"],
      href: "#project-2",
      gradientFrom: "#1e3a8a",
      gradientTo: "#3b82f6",
    },
    {
      title: "DZ Shop",
      subtitle: "E-commerce • 2024",
      imageSrc: "/dzshop.png",
      tags: ["E-commerce", "Boutique", "Performance"],
      href: "#project-3",
      gradientFrom: "#581c87",
      gradientTo: "#a855f7",
    },
    {
      title: "Portfolio Pro",
      subtitle: "Portfolio • Design",
      imageSrc: "/portfolio.png",
      tags: ["Portfolio", "Design", "Créatif"],
      href: "#project-4",
      gradientFrom: "#7c2d12",
      gradientTo: "#f97316",
    },
  ]

  return (
    <main className="bg-black text-white overflow-hidden">
      <Background variant="default" />
      <GlassmorphismNav />
      <section className="px-4 pt-4 pb-16 lg:pb-4 relative z-10">
        <aside className="mb-8 md:mb-0 md:fixed md:top-24 md:left-0 md:h-screen md:w-[420px] self-start">
            <div className="relative flex h-full flex-col justify-between p-4 sm:p-6 md:p-8 bg-white/5 md:bg-transparent rounded-2xl md:rounded-none border border-white/10 md:border-none backdrop-blur-sm md:backdrop-blur-none">
              <div>
                <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                  <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2 animate-pulse"></span>
                  Portfolio
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4">
                  Tous nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">projets</span>
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-white/70 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                  Découvrez une sélection de sites web et expériences digitales conçus pour nos clients.
                </p>

                <div className="mb-6 sm:mb-8 md:mb-10">
                  <Button asChild size="default" className="rounded-full w-full sm:w-auto">
                    <Link href="/contact">
                      Discuter de votre projet
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="block md:block">
                  <p className="mb-2 text-xs font-semibold tracking-widest text-white/50 uppercase">Nos Expertises</p>
                  <ul className="grid grid-cols-3 gap-2 text-xs sm:text-sm font-medium text-white/70">
                    <li className="bg-white/5 rounded-lg px-2 py-1 text-center">E-commerce</li>
                    <li className="bg-white/5 rounded-lg px-2 py-1 text-center">Vitrine</li>
                    <li className="bg-white/5 rounded-lg px-2 py-1 text-center">Portfolio</li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>

          <div className="relative space-y-4 md:pl-[440px] md:pt-24">
            {projects.map((p, idx) => (
              <ProjectCard
                key={p.title}
                title={p.title}
                subtitle={p.subtitle}
                imageSrc={p.imageSrc}
                tags={p.tags}
                href={p.href}
                gradientFrom={p.gradientFrom}
                gradientTo={p.gradientTo}
                imageContainerClassName="md:h-full"
                containerClassName="md:h-screen"
                revealDelay={idx * 0.06}
              />
            ))}
          </div>
      </section>
    </main>
  )
}
