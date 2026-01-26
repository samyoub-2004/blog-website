import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import DotGridShader from "@/components/DotGridShader"

import ProjectCard from "@/components/project-card"
import AnimatedHeading from "@/components/animated-heading"
import RevealOnView from "@/components/reveal-on-view"

export default function Page() {
  const projects = [
    {
      title: "Walletly — Multi‑account mobile banking",
      subtitle: "End‑to‑end product design",
      imageSrc: "/images/1 (1).webp",
      tags: ["Mobile", "Fintech", "UI/UX"],
      href: "#project-1",
      priority: true,
      gradientFrom: "#0f172a",
      gradientTo: "#6d28d9",
    },
    {
      title: "Nimbus — SaaS analytics",
      subtitle: "Design system & web app",
      imageSrc: "/images/1 (2).webp",
      tags: ["SaaS", "Design System", "Web"],
      href: "#project-2",
      priority: false,
      gradientFrom: "#111827",
      gradientTo: "#2563eb",
    },
    {
      title: "Arcade — E‑commerce for streetwear",
      subtitle: "Mobile‑first storefront",
      imageSrc: "/images/1 (3).webp",
      tags: ["Commerce", "Mobile", "Brand"],
      href: "#project-3",
      priority: false,
      gradientFrom: "#0b132b",
      gradientTo: "#5bc0be",
    },
    {
      title: "CareConnect — Patient portal",
      subtitle: "Accessibility‑first UI",
      imageSrc: "/images/1 (4).webp",
      tags: ["A11y", "Web App", "Health"],
      href: "#project-4",
      priority: false,
      gradientFrom: "#0f172a",
      gradientTo: "#10b981",
    },
    {
      title: "Aurora — Creative portfolio",
      subtitle: "Motion & interaction design",
      imageSrc: "/images/1 (5).webp",
      tags: ["Portfolio", "Animation", "UI/UX"],
      href: "#project-5",
      priority: false,
      gradientFrom: "#1f2937",
      gradientTo: "#8b5cf6",
    },
    {
      title: "Hydra — AI assistant",
      subtitle: "Conversational product UX",
      imageSrc: "/images/1 (6).webp",
      tags: ["AI", "SaaS", "Product"],
      href: "#project-6",
      priority: false,
      gradientFrom: "#0b132b",
      gradientTo: "#10b981",
    },
  ]

  return (
    <main className="bg-neutral-950 text-white">
      <section className="px-4 pt-4 pb-16 lg:pb-4">
        <aside className="md:fixed md:top-0 md:left-0 md:h-screen md:w-[420px] self-start">
            <RevealOnView
              as="div"
              intensity="hero"
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8"
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

          <div className="relative space-y-4 md:pl-[420px]">
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
