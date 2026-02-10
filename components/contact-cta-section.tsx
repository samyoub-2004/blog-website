"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Mail, Phone } from "lucide-react"

export function ContactCTASection() {
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
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-5xl mx-auto">
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out rounded-3xl border border-white/20 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))] p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-5">
                <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse" />
                Contact
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 text-balance leading-tight">
                Parlons de votre projet et obtenez une réponse rapide.
              </h3>

              <p className="text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
                Décris-nous ton besoin (site vitrine, e-commerce, sur-mesure, refonte, automatisations). On te répond sous 24h avec une proposition claire.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
                <a href="mailto:hello@example.com" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@example.com
                </a>
                <a href="tel:+1234567890" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 flex lg:justify-end">
              <Link
                href="/contact"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-white to-slate-100 text-slate-900 rounded-full font-semibold text-base md:text-lg hover:from-slate-50 hover:to-slate-200 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                Nous contacter
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
