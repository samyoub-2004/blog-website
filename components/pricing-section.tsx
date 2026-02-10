"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

type Billing = "monthly" | "yearly"

type Currency = "EUR" | "DZD"

const AFRICA_COUNTRIES = new Set([
  "DZ",
  "MA",
  "TN",
  "LY",
  "EG",
  "SD",
  "SS",
  "EH",
  "MR",
  "ML",
  "NE",
  "TD",
  "SN",
  "GM",
  "GW",
  "GN",
  "SL",
  "LR",
  "CI",
  "GH",
  "TG",
  "BJ",
  "BF",
  "NG",
  "CM",
  "CF",
  "GQ",
  "GA",
  "CG",
  "CD",
  "AO",
  "NA",
  "BW",
  "ZA",
  "LS",
  "SZ",
  "ZM",
  "ZW",
  "MW",
  "MZ",
  "MG",
  "MU",
  "SC",
  "KM",
  "RE",
  "YT",
  "KE",
  "UG",
  "TZ",
  "RW",
  "BI",
  "ET",
  "ER",
  "DJ",
  "SO",
  "ST",
  "CV",
])

function formatMoney(amount: number, currency: Currency) {
  if (currency === "DZD") {
    const grouped = new Intl.NumberFormat("fr-DZ", { maximumFractionDigits: 0, useGrouping: true }).format(amount)
    const withCommas = grouped.replace(/[\s\u00A0\u202F]/g, ",")
    return withCommas + " DZD"
  }
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount)
}

type Plan = {
  name: string
  pitch: string
  buildPrice?: number
  maintenanceMonthly?: number
  maintenanceYearly?: number
  popular?: boolean
  features: string[]
  cta: string
  custom?: boolean
}

const PLANS_EUR: Plan[] = [
  {
    name: "Vitrine",
    pitch: "Site élégant pour présenter votre activité.",
    buildPrice: 999,
    maintenanceMonthly: 99,
    maintenanceYearly: 999,
    features: [
      "Jusqu'à 5 pages",
      "Design responsive",
      "SEO technique de base",
      "Formulaire de contact",
      "Intégration Analytics",
      "Déploiement & SSL",
    ],
    cta: "Démarrer",
  },
  {
    name: "Business",
    pitch: "Plus de pages, plus d'impact, mieux optimisé.",
    buildPrice: 1999,
    maintenanceMonthly: 159,
    maintenanceYearly: 1590,
    popular: true,
    features: [
      "Jusqu'à 12 pages",
      "Design system léger",
      "Animations subtiles",
      "Blog / Actualités",
      "Perf & SEO avancés",
      "Support prioritaire",
    ],
    cta: "Choisir ce plan",
  },
  {
    name: "E‑commerce",
    pitch: "Boutique en ligne performante et rassurante.",
    buildPrice: 3499,
    maintenanceMonthly: 299,
    maintenanceYearly: 2990,
    features: [
      "Catalogue & variantes",
      "Paiements sécurisés",
      "Fiches produits optimisées",
      "Panier & emails",
      "Optimisation conversion",
      "Suivi + formation",
    ],
    cta: "Lancer ma boutique",
  },
  {
    name: "Sur‑mesure",
    pitch: "Projet ambitieux, intégrations, animations premium.",
    custom: true,
    features: [
      "Architecture headless",
      "Intégrations avancées",
      "Design system complet",
      "Multi‑langue",
      "Animations premium",
      "Accompagnement dédié",
    ],
    cta: "Demander un devis",
  },
]

// Editable DZD plan pricing (edit values here for Algeria/Africa pricing)
const PLANS_DZD: Plan[] = [
  {
    name: "Vitrine",
    pitch: "Site élégant pour présenter votre activité.",
    buildPrice: 149850,
    maintenanceMonthly: 14850,
    maintenanceYearly: 149850,
    features: [
      "Jusqu'à 5 pages",
      "Design responsive",
      "SEO technique de base",
      "Formulaire de contact",
      "Intégration Analytics",
      "Déploiement & SSL",
    ],
    cta: "Démarrer",
  },
  {
    name: "Business",
    pitch: "Plus de pages, plus d'impact, mieux optimisé.",
    buildPrice: 299850,
    maintenanceMonthly: 23850,
    maintenanceYearly: 238500,
    popular: true,
    features: [
      "Jusqu'à 12 pages",
      "Design system léger",
      "Animations subtiles",
      "Blog / Actualités",
      "Perf & SEO avancés",
      "Support prioritaire",
    ],
    cta: "Choisir ce plan",
  },
  {
    name: "E‑commerce",
    pitch: "Boutique en ligne performante et rassurante.",
    buildPrice: 524850,
    maintenanceMonthly: 44850,
    maintenanceYearly: 448500,
    features: [
      "Catalogue & variantes",
      "Paiements sécurisés",
      "Fiches produits optimisées",
      "Panier & emails",
      "Optimisation conversion",
      "Suivi + formation",
    ],
    cta: "Lancer ma boutique",
  },
  {
    name: "Sur‑mesure",
    pitch: "Projet ambitieux, intégrations, animations premium.",
    custom: true,
    features: [
      "Architecture headless",
      "Intégrations avancées",
      "Design system complet",
      "Multi‑langue",
      "Animations premium",
      "Accompagnement dédié",
    ],
    cta: "Demander un devis",
  },
]

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("monthly")
  const [modalPlan, setModalPlan] = useState<Plan | null>(null)

  const [currency, setCurrency] = useState<Currency>("EUR")

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const res = await fetch("https://ipinfo.io/json")
        const data = (await res.json()) as { country?: string }
        const country = (data.country || "").toUpperCase()
        const isAfrica = country ? AFRICA_COUNTRIES.has(country) : false
        if (!cancelled) setCurrency(isAfrica ? "DZD" : "EUR")
      } catch {
        if (!cancelled) setCurrency("EUR")
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  const plans = currency === "DZD" ? PLANS_DZD : PLANS_EUR

  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-3 sm:px-4 md:px-6 lg:px-8 bg-white rounded-t-[40px] sm:rounded-t-[60px] rounded-b-[40px] sm:rounded-b-[60px]">
      <div className="max-w-5xl sm:max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-black/5 backdrop-blur-md border border-black/10 text-black/60 text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            Tarifs transparents
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-3 sm:mb-4"
          >
            Des plans adaptés à vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">objectifs</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-black/70 max-w-lg sm:max-w-2xl mx-auto px-2"
          >
            Prix de création unique + maintenance flexible. Passez à l'annuel et économisez jusqu'à 20%.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className={`text-sm ${billing === "monthly" ? "text-black" : "text-black/60"}`}>Mensuel</span>
          <button
            aria-label="Basculer facturation"
            onClick={() => setBilling((b) => (b === "monthly" ? "yearly" : "monthly"))}
            className="relative w-16 h-8 bg-black/10 border border-black/20 rounded-full backdrop-blur-md transition-colors"
          >
            <span
              className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-black transition-transform ${
                billing === "yearly" ? "translate-x-8" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-sm ${billing === "yearly" ? "text-black" : "text-black/60"}`}>Annuel</span>
          <span className="ml-2 text-xs text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
            2 mois offerts
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isCustom = !!plan.custom
            const creationPrice = isCustom ? "Sur devis" : formatMoney(plan.buildPrice || 0, currency)
            const maintenancePrice = isCustom
              ? "Sur devis"
              : billing === "monthly"
              ? `${formatMoney(plan.maintenanceMonthly || 0, currency)} / mois`
              : `${formatMoney(plan.maintenanceYearly || 0, currency)} / an`
            const slug = plan.name.toLowerCase().replace(/[^a-z0-9]+/g, "").replace("é", "e").replace("‑", "-")

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 md:p-8 bg-black/[0.03] backdrop-blur-md border border-black/10 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl ${
                  plan.popular ? "ring-2 ring-blue-500" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500 text-white shadow-lg">
                      Le plus populaire
                    </div>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-black mb-2">{plan.name}</h3>
                <p className="text-black/70 text-sm mb-6">{plan.pitch}</p>

                <div className="mb-4">
                  <div className="text-xs text-black/60 mb-1">Création</div>
                  <div className="text-3xl font-extrabold text-black">{creationPrice}</div>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <div>
                      <div className="text-xs text-black/60 mb-1">Maintenance</div>
                      <div className="text-lg font-semibold text-black">{maintenancePrice}</div>
                    </div>
                    {!isCustom && billing === "yearly" && (
                      <span className="text-xs text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                        -20%
                      </span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <svg className="w-4 h-4 mt-1 text-emerald-600 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-black/80 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
                {isCustom ? (
                  <Button
                    onClick={() => setModalPlan(plan)}
                    className="w-full bg-black text-white rounded-lg px-6 py-4 text-base font-medium transition-all duration-300 hover:bg-gray-900 hover:scale-[1.02]"
                  >
                    {plan.cta}
                  </Button>
                ) : (
                  <Link href="/contact" className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-gray-900 hover:scale-[1.02]">
                    Get Started
                    <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                )}
              </div>
            )
          })}
        </div>

        {/* Included in all plans */}
        <div className="mt-12 md:mt-16">
          <div className="bg-black/[0.03] backdrop-blur-md border border-black/10 rounded-2xl p-6 md:p-8">
            <div className="text-black font-semibold mb-4">Inclus dans tous les plans</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-black/80">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                Performance (Lighthouse 90+)
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                SEO technique de base
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                Responsive complet
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                Sécurité & SSL
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                Hébergement & déploiement
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                Support (SLA de base)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Modal */}
      {modalPlan && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setModalPlan(null)} />
          <div role="dialog" aria-modal="true" className="relative w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs text-white/70">Résumé du plan</div>
                <h4 className="text-2xl font-bold">{modalPlan.name}</h4>
              </div>
              <button onClick={() => setModalPlan(null)} className="text-white/70 hover:text-white">✕</button>
            </div>

            {modalPlan.custom ? (
              <>
                <p className="text-white/80 text-sm mb-4">
                  Ce plan est entièrement sur‑mesure. Contactez‑nous pour expliquer vos besoins et nous préparerons un devis
                  adapté (fonctionnalités, intégrations, animations premium, multi‑langue, etc.).
                </p>
                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10" onClick={() => setModalPlan(null)}>
                    Fermer
                  </Button>
                  <Link href="/contact">
                    <Button className="bg-white text-black hover:bg-gray-100">Nous contacter</Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 border border-white/15 rounded-xl p-4">
                    <div className="text-white/70 text-xs mb-1">Création</div>
                    <div className="text-xl font-semibold">{formatMoney(modalPlan.buildPrice || 0, currency)}</div>
                  </div>
                  <div className="bg-white/5 border border-white/15 rounded-xl p-4">
                    <div className="flex items-center gap-2">
                      <div className="text-white/70 text-xs">Maintenance ({billing === "monthly" ? "mensuelle" : "annuelle"})</div>
                    </div>
                    <div className="text-xl font-semibold">
                      {billing === "monthly"
                        ? `${formatMoney(modalPlan.maintenanceMonthly || 0, currency)} / mois`
                        : `${formatMoney(modalPlan.maintenanceYearly || 0, currency)} / an`}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-white/70 text-xs mb-2">Inclus</div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    {modalPlan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span className="text-white/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10" onClick={() => setModalPlan(null)}>
                    Annuler
                  </Button>
                  <Link href="/contact">
                    <Button className="bg-white text-black hover:bg-gray-100">Valider la demande</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
