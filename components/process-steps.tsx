import React from "react"

export function ProcessSteps() {
  const steps = [
    {
      title: "Brief & Audit",
      desc: "Nous cadrons vos objectifs, audiences, contraintes et inspirations.",
      num: "01",
    },
    {
      title: "Design & Build",
      desc: "Maquette rapide, puis intégration soignée, animations et responsive.",
      num: "02",
    },
    {
      title: "Mise en ligne",
      desc: "Optimisations perf/SEO, déploiement, suivi et amélioration continue.",
      num: "03",
    },
  ]
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Un processus clair en 3 étapes</h2>
          <p className="mt-3 text-sm sm:text-base text-white/60">Efficace, transparent et orienté résultats.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s) => (
            <div key={s.num} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="absolute -top-3 left-6">
                <div className="px-3 py-1 rounded-full text-xs font-semibold bg-white text-black shadow">{s.num}</div>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
