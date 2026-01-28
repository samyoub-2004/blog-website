import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import DotGridShader from "@/components/DotGridShader"

import ProjectCard from "@/components/project-card"
import AnimatedHeading from "@/components/animated-heading"
import RevealOnView from "@/components/reveal-on-view"
import { GlassmorphismNav } from "@/components/glassmorphism-nav"

export default function Page() {
  const projects = [
    {
      title: "Lily Go",
      subtitle: "E-commerce • 2024",
      imageSrc: "/lilygoLaptop.png",
      tags: ["E-commerce", "Web", "Design"],
      href: "#project-1",
      priority: true,
      gradientFrom: "#064e3b",
      gradientTo: "#10b981",
    },
    {
      title: "Le Parking VTC",
      subtitle: "Site Vitrine • Mobile",
      imageSrc: "/leparkingvtcLaptop.png",
      tags: ["Vitrine", "Mobile", "Web"],
      href: "#project-2",
      priority: false,
      gradientFrom: "#1e3a8a",
      gradientTo: "#3b82f6",
    },
    {
      title: "DZ Shop",
      subtitle: "E-commerce • 2024",
      imageSrc: "/dzshop.png",
      tags: ["E-commerce", "Boutique", "Performance"],
      href: "#project-3",
      priority: false,
      gradientFrom: "#581c87",
      gradientTo: "#a855f7",
    },
    {
      title: "Portfolio Pro",
      subtitle: "Portfolio • Design",
      imageSrc: "/portfolio.png",
      tags: ["Portfolio", "Design", "Créatif"],
      href: "#project-4",
      priority: false,
      gradientFrom: "#7c2d12",
      gradientTo: "#f97316",
    },
  ]

  return (
    <main className="bg-black text-white">
      <GlassmorphismNav />
      <section className="px-4 pt-4 pb-16 lg:pb-4">
        <aside className="md:fixed md:top-24 md:left-0 md:h-screen md:w-[420px] self-start">
            <RevealOnView
              as="div"
              intensity="hero"
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl p-6 sm:p-8"
              staggerChildren
            >
              <div className="pointer-events-none absolute inset-0 opacity-5 mix-blend-soft-light">
                <DotGridShader />
              </div>
              <div>
                <div className="mb-8 flex items-center gap-2">
                  <div className="text-2xl font-extrabold tracking-tight">Portfolio</div>
                  <div className="h-2 w-2 rounded-full bg-white/60" aria-hidden="true" />
                </div>

                <AnimatedHeading
                  className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl"
                  lines={["Voici tous", "nos projets"]}
                />

                <p className="mt-4 max-w-[42ch] text-lg text-white/70">
                  Découvrez une sélection de sites web, applications et expériences digitales que nous avons conçus et
                  développés pour nos clients. Qualité, performance et design au service de vos objectifs.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/contact">
                      Discuter de votre projet
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-10">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-white/50">SECTEURS ACCOMPAGNÉS</p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-2xl font-black text-white/25 sm:grid-cols-3">
                    <li>Space Y</li>
                    <li>Melta</li>
                    <li>ClosedAI</li>
                    <li>Booble</li>
                    <li>Lentflix</li>
                    <li>Xwitter</li>
                  </ul>
                </div>
              </div>
            </RevealOnView>
          </aside>

          <div className="relative space-y-4 md:pl-[420px] md:pt-24">
            {projects.map((p, idx) => (
              <ProjectCard
                key={p.title}
                title={p.title}
                subtitle={p.subtitle}
                imageSrc={p.imageSrc}
                tags={p.tags}
                href={p.href}
                priority={p.priority}
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
