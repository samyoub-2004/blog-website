"use client"

import { ExternalLink, ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Lily Go",
    category: "E-commerce • 2024",
    image: "/lilygoLaptop.png",
    gridClass: "md:col-span-2 md:row-span-2",
    color: "from-emerald-500/20",
    link: "https://lilygo.fr",
  },
  {
    title: "Le Parking VTC",
    category: "Site Vitrine • Mobile",
    image: "/leparkingvtcLaptop.png",
    gridClass: "md:col-span-1 md:row-span-1",
    color: "from-blue-500/20",
    link: "leparkingvtc.fr",
  },
  {
    title: "DZ Shop",
    category: "E-commerce • 2024",
    image: "/dzshop.png",
    gridClass: "md:col-span-1 md:row-span-2",
    color: "from-purple-500/20",
    link: "",
  },
  {
    title: "Portfolio Pro",
    category: "Portfolio • Design",
    image: "/portfolio.png",
    gridClass: "md:col-span-1 md:row-span-1",
    color: "from-orange-500/20",
    link: "https://portfolio.example.com",
  },
  {
    title: "Mobile App",
    category: "Application • iOS/Android",
    image: "/mobile-app.png",
    gridClass: "md:col-span-1 md:row-span-1",
    color: "from-rose-500/20",
    link: "https://app.example.com",
  },
]

export function PortfolioSection() {
  return (
    <section className="py-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
              Projets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Sélectionnés</span>
            </h2>
            <p className="text-white/60 text-lg">
              Une immersion dans nos dernières réalisations numériques alliant design et performance.
            </p>
          </div>
          <a
            href="/portfolio"
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
              className={`group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 ${project.gridClass} flex items-center justify-center`}
            >
              {/* Image de fond avec overlay */}
              <div className="absolute inset-0 z-0">
                <div
                  className="absolute inset-0 scale-[1.06] blur-[18px] opacity-60 transition-transform duration-700 ease-out group-hover:scale-[1.1]"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 group-hover:from-black/40 group-hover:via-transparent group-hover:to-black/40 transition-all duration-500 z-10" />
                <div className={`absolute inset-0 bg-gradient-to-t ${project.color} to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-10`} />
              </div>

              {/* Contenu Texte */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex justify-between items-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div>
                  <p className="text-white/70 text-xs font-medium mb-1 uppercase tracking-widest drop-shadow-lg">
                    {project.category}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-white leading-none drop-shadow-lg">
                    {project.title}
                  </h3>
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur-sm text-black p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 hover:scale-110 shadow-lg"
                  aria-label={`Voir le site de ${project.title}`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}