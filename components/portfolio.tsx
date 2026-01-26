"use client"

import Image from "next/image"
import { ExternalLink, ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Eco-Sphere",
    category: "E-commerce • 2024",
    image: "/project1.jpg", // Remplace par tes images
    gridClass: "md:col-span-2 md:row-span-2", // Grande carte
    color: "from-emerald-500/20",
    link: "https://eco-sphere.com",
  },
  {
    title: "Nova Studio",
    category: "Site Vitrine",
    image: "/project2.jpg",
    gridClass: "md:col-span-1 md:row-span-1",
    color: "from-blue-500/20",
    link: "https://nova-studio.com",
  },
  {
    title: "Apex App",
    category: "SaaS / Sur-mesure",
    image: "/project3.jpg",
    gridClass: "md:col-span-1 md:row-span-2", // Carte verticale
    color: "from-purple-500/20",
    link: "https://apex-app.com",
  },
  {
    title: "Lumina",
    category: "Branding",
    image: "/project4.jpg",
    gridClass: "md:col-span-1 md:row-span-1",
    color: "from-orange-500/20",
    link: "https://lumina-brand.com",
  },
]

export function PortfolioSection() {
  return (
    <section className="py-24 px-4 sm:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tighter">
              Projets <span className="text-white/40 italic font-light">Sélectionnés</span>
            </h2>
            <p className="text-white/60 text-lg">
              Une immersion dans nos dernières réalisations numériques alliant design et performance.
            </p>
          </div>
          <a
            href={projects[0].link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-white border-b border-white/20 pb-2 hover:border-white transition-all"
          >
            Voir tous les projets <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Grille Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 h-auto md:h-[900px]">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 ${project.gridClass}`}
            >
              {/* Image de fond avec overlay */}
              <div className="absolute inset-0 z-0">
                {/* Remplace par un composant <Image /> Next.js si possible */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-10" />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`} />
                <div className="w-full h-full bg-neutral-800 animate-pulse" /> {/* Placeholder */}
              </div>

              {/* Contenu Texte */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div>
                  <p className="text-white/50 text-sm font-medium mb-1 uppercase tracking-widest">
                    {project.category}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white leading-none">
                    {project.title}
                  </h3>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0"
                  aria-label={`Voir le site de ${project.title}`}
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}