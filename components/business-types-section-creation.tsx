"use client"

import { ShoppingCart, Store, LayoutGrid, Rocket, RefreshCw, ShieldCheck } from "lucide-react"

const businessTypes = [
  {
    icon: Store,
    title: "Site Vitrine",
    description: "Affirmez votre identité numérique avec un design unique pour captiver vos visiteurs et générer des contacts.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Boostez vos ventes avec une boutique fluide, optimisée pour la conversion et le paiement sécurisé.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: LayoutGrid,
    title: "Solutions Web",
    description: "Applications métiers ou plateformes complexes : nous développons des outils puissants adaptés à vos processus.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Rocket,
    title: "Landing Page",
    description: "Une page unique ultra-optimisée pour convertir vos prospects en clients lors de vos lancements.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: RefreshCw,
    title: "Refonte de site",
    description: "Modernisez votre image de marque et améliorez les performances de votre ancien site.",
    color: "from-yellow-400 to-orange-500",
  },
  {
    icon: ShieldCheck,
    title: "Maintenance & SEO",
    description: "Sécurité totale, mises à jour régulières et optimisation pour dominer les résultats Google.",
    color: "from-teal-400 to-blue-500",
  },
]

export function BusinessTypesSectionCreation() {
  return (
    <section className="relative py-20 px-4 sm:px-8 bg-black">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/80 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Expertises & Solutions
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Un site web adapté à <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">vos ambitions</span>
          </h2>
        </div>

        {/* Grille ajustée : 1 col sur mobile, 2 sur tablette, 3 sur desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {businessTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <div 
                key={index} 
                className="group relative bg-white/[0.03] border border-white/10 rounded-3xl p-8 transition-all duration-500 hover:bg-white/[0.06] hover:-translate-y-2"
              >
                <div className={`mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br ${type.color} text-white shadow-lg`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-white/60 text-base leading-relaxed">{type.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}