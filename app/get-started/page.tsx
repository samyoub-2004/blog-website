"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Hidden pricing config (not rendered as per-option prices)
const PRICING = {
  base: {
    vitrine: 999,
    business: 1999,
    ecommerce: 3499,
    surmesure: 0,
  },
  pageUnit: 80, // hidden unit per additional page
  options: {
    glass: 250,
    micro: 200,
    carousel: 180,
    gallery: 150,
    blog: 220,
    formAdv: 120,
    seoAdv: 200,
    multilingual: 250, // per language beyond first
  },
  maintenance: {
    vitrine: { monthly: 99, yearly: 999 },
    business: { monthly: 159, yearly: 1590 },
    ecommerce: { monthly: 299, yearly: 2990 },
    surmesure: { monthly: 0, yearly: 0 },
  },
} as const

type SiteType = "vitrine" | "business" | "ecommerce" | "surmesure"
type Billing = "monthly" | "yearly"

type WizardState = {
  siteType: SiteType
  pages: number
  languages: number
  options: {
    glass: boolean
    micro: boolean
    carousel: boolean
    gallery: boolean
    blog: boolean
    formAdv: boolean
    seoAdv: boolean
  }
  billing: Billing
  hosting: "agency" | "client"
}

const DEFAULT_STATE: WizardState = {
  siteType: "vitrine",
  pages: 5,
  languages: 1,
  options: {
    glass: true,
    micro: true,
    carousel: false,
    gallery: false,
    blog: false,
    formAdv: false,
    seoAdv: false,
  },
  billing: "monthly",
  hosting: "agency",
}

function formatEUR(amount: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount)
}

export default function GetStartedPage() {
  const router = useRouter()
  const params = useSearchParams()
  const planParam = params.get("plan")

  const [step, setStep] = useState(1)
  const [state, setState] = useState<WizardState>(DEFAULT_STATE)
  const [showCustomModal, setShowCustomModal] = useState(false)

  // Initialize site type from query
  useEffect(() => {
    if (!planParam) return
    const map: Record<string, SiteType> = {
      vitrine: "vitrine",
      business: "business",
      ecommerce: "ecommerce",
      "e-commerce": "ecommerce",
      surmesure: "surmesure",
      sur: "surmesure",
    }
    const site = map[planParam.toLowerCase()] || undefined
    if (site) setState((s) => ({ ...s, siteType: site }))
  }, [planParam])

  // Open a contact explanation modal when Sur‑mesure is selected
  useEffect(() => {
    if (state.siteType === "surmesure") {
      setShowCustomModal(true)
    }
  }, [state.siteType])

  // Price computation (not exposing unit prices)
  const totals = useMemo(() => {
    if (state.siteType === "surmesure") {
      return { buildTotal: 0, maintenance: 0 }
    }
    const base = PRICING.base[state.siteType]
    const extraPages = Math.max(0, state.pages - 5) * PRICING.pageUnit
    const opts = state.options
    const optionsTotal =
      (opts.glass ? PRICING.options.glass : 0) +
      (opts.micro ? PRICING.options.micro : 0) +
      (opts.carousel ? PRICING.options.carousel : 0) +
      (opts.gallery ? PRICING.options.gallery : 0) +
      (opts.blog ? PRICING.options.blog : 0) +
      (opts.formAdv ? PRICING.options.formAdv : 0) +
      (opts.seoAdv ? PRICING.options.seoAdv : 0) +
      Math.max(0, state.languages - 1) * PRICING.options.multilingual

    const buildTotal = base + extraPages + optionsTotal
    const maint = PRICING.maintenance[state.siteType]
    const maintenance = state.billing === "monthly" ? maint.monthly : maint.yearly
    return { buildTotal, maintenance }
  }, [state])

  const siteTypeLabel: Record<SiteType, string> = {
    vitrine: "Vitrine",
    business: "Business",
    ecommerce: "E‑commerce",
    surmesure: "Sur‑mesure",
  }

  const optionLabels: Record<keyof WizardState["options"], string> = {
    glass: "Glassmorphism",
    micro: "Micro‑interactions",
    carousel: "Carrousel",
    gallery: "Galerie",
    blog: "Blog",
    formAdv: "Formulaire avancé",
    seoAdv: "SEO avancé",
  }

  const StepHeader = (
    <div className="text-center mb-8">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
        <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse"></span>
        Démarrage rapide
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Construisez votre devis</h1>
      <p className="text-white/70 max-w-2xl mx-auto">Choisissez votre type de site et vos options. Le total se met à jour automatiquement.</p>
    </div>
  )

  const Progress = (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className={`h-1 rounded-full ${i <= step ? "bg-white" : "bg-white/20"}`} style={{ width: i === step ? 48 : 28 }} />
      ))}
    </div>
  )

  return (
    <section className="relative min-h-screen py-14 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {StepHeader}
        {Progress}

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8">
          {step === 1 && (
            <div className="grid gap-6">
              <div>
                <div className="text-white/80 text-sm mb-3">Type de site</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {([
                    { key: "vitrine", label: "Vitrine" },
                    { key: "business", label: "Business" },
                    { key: "ecommerce", label: "E‑commerce" },
                    { key: "surmesure", label: "Sur‑mesure" },
                  ] as const).map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setState((s) => ({ ...s, siteType: opt.key as SiteType }))}
                      className={`px-4 py-3 rounded-xl border transition-all text-left ${
                        state.siteType === opt.key ? "bg-white text-black border-transparent" : "bg-white/5 text-white border-white/15 hover:bg-white/10"
                      }`}
                    >
                      <div className="font-semibold">{opt.label}</div>
                      <div className="text-xs opacity-70">{opt.key !== "surmesure" ? "Création + maintenance" : "Sur devis"}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-6">
              <div className="text-white/80 text-sm">Pages</div>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={state.pages}
                  onChange={(e) => setState((s) => ({ ...s, pages: Number(e.target.value) }))}
                  className="w-full"
                />
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={state.pages}
                  onChange={(e) => setState((s) => ({ ...s, pages: Number(e.target.value) }))}
                  className="w-20 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                />
              </div>
              <p className="text-xs text-white/60">Inclut 5 pages. Les pages supplémentaires sont ajoutées au total.</p>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-6">
              <div className="text-white/80 text-sm">Design & Animations</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {([
                  { key: "glass", label: "Glassmorphism" },
                  { key: "micro", label: "Micro‑interactions" },
                  { key: "carousel", label: "Carrousel" },
                  { key: "gallery", label: "Galerie" },
                ] as const).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    role="switch"
                    aria-checked={state.options[opt.key]}
                    onClick={() => setState((s) => ({ ...s, options: { ...s.options, [opt.key]: !s.options[opt.key] } }))}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                      state.options[opt.key]
                        ? "bg-white text-black border-transparent"
                        : "bg-white/5 text-white border-white/15 hover:bg-white/10"
                    }`}
                  >
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-current opacity-80" />
                    <span className="text-sm">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-6">
              <div className="text-white/80 text-sm">Fonctionnalités</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {([
                  { key: "blog", label: "Blog" },
                  { key: "formAdv", label: "Formulaire avancé" },
                  { key: "seoAdv", label: "SEO avancé" },
                ] as const).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    role="switch"
                    aria-checked={state.options[opt.key]}
                    onClick={() => setState((s) => ({ ...s, options: { ...s.options, [opt.key]: !s.options[opt.key] } }))}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                      state.options[opt.key]
                        ? "bg-white text-black border-transparent"
                        : "bg-white/5 text-white border-white/15 hover:bg-white/10"
                    }`}
                  >
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-current opacity-80" />
                    <span className="text-sm">{opt.label}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-white/80 text-sm">Langues</div>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={state.languages}
                  onChange={(e) => setState((s) => ({ ...s, languages: Number(e.target.value) }))}
                  className="w-24 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                />
                <span className="text-xs text-white/60">La première langue est incluse.</span>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="grid gap-6">
              <div className="text-white/80 text-sm">Maintenance</div>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${state.billing === "monthly" ? "text-white" : "text-white/60"}`}>Mensuel</span>
                <button
                  aria-label="Basculer facturation"
                  onClick={() => setState((s) => ({ ...s, billing: s.billing === "monthly" ? "yearly" : "monthly" }))}
                  className="relative w-16 h-8 bg-white/10 border border-white/20 rounded-full backdrop-blur-md transition-colors"
                >
                  <span className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition-transform ${state.billing === "yearly" ? "translate-x-8" : "translate-x-0"}`} />
                </button>
                <span className={`text-sm ${state.billing === "yearly" ? "text-white" : "text-white/60"}`}>Annuel</span>
                <span className="ml-2 text-xs text-emerald-300/90 bg-emerald-500/10 border border-emerald-400/20 px-2 py-0.5 rounded-full">2 mois offerts</span>
              </div>

              <div className="mt-4">
                <div className="text-white/80 text-sm mb-2">Hébergement</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={state.hosting === "agency"}
                    onClick={() => setState((s) => ({ ...s, hosting: "agency" }))}
                    className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                      state.hosting === "agency"
                        ? "bg-white text-black border-transparent"
                        : "bg-white/5 text-white border-white/15 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-semibold">Hébergement géré par l’agence</div>
                    <div className="text-xs opacity-70">On s’occupe de tout (infra, sécurité, mises à jour).</div>
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={state.hosting === "client"}
                    onClick={() => setState((s) => ({ ...s, hosting: "client" }))}
                    className={`text-left px-4 py-3 rounded-xl border transition-colors ${
                      state.hosting === "client"
                        ? "bg-white text-black border-transparent"
                        : "bg-white/5 text-white border-white/15 hover:bg-white/10"
                    }`}
                  >
                    <div className="font-semibold">Hébergement par le client</div>
                    <div className="text-xs opacity-70">Nous fournissons le code source et les instructions de déploiement.</div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="grid gap-6">
              <div className="text-white text-lg font-semibold">Récapitulatif</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-1">Création</div>
                  <div className="text-2xl font-bold text-white">{state.siteType === "surmesure" ? "Sur devis" : formatEUR(totals.buildTotal)}</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-1">Maintenance ({state.billing === "monthly" ? "mensuelle" : "annuelle"})</div>
                  <div className="text-2xl font-bold text-white">{state.siteType === "surmesure" ? "Sur devis" : totals.maintenance ? formatEUR(totals.maintenance) : "Sur devis"}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-2">Paramètres</div>
                  <ul className="text-white/90 text-sm space-y-2">
                    <li>
                      <span className="text-white/60">Type de site:</span> {siteTypeLabel[state.siteType]}
                    </li>
                    <li>
                      <span className="text-white/60">Pages:</span> {state.pages}
                    </li>
                    <li>
                      <span className="text-white/60">Langues:</span> {state.languages}
                    </li>
                    <li>
                      <span className="text-white/60">Maintenance:</span> {state.billing === "monthly" ? "Mensuelle" : "Annuelle"}
                    </li>
                    <li>
                      <span className="text-white/60">Hébergement:</span> {state.hosting === "agency" ? "Géré par l’agence" : "Géré par le client (code source fourni)"}
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-2">Options sélectionnées</div>
                  <ul className="text-white/90 text-sm space-y-2">
                    {Object.entries(state.options)
                      .filter(([_, v]) => v)
                      .map(([k]) => (
                        <li key={k} className="flex items-center gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/70"></span>
                          <span>{optionLabels[k as keyof WizardState["options"]]}</span>
                        </li>
                      ))}
                    {Object.values(state.options).every((v) => !v) && (
                      <li className="text-white/60">Aucune option ajoutée</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom actions: navigation + assistance */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
              Précédent
            </Button>
            {step < 6 ? (
              <Button
                className="bg-white text-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => {
                  if (state.siteType !== "surmesure") setStep((s) => Math.min(6, s + 1))
                }}
                disabled={state.siteType === "surmesure"}
              >
                Suivant
              </Button>
            ) : (
              <Button
                className="bg-white text-black hover:bg-gray-100"
                onClick={() => {
                  try {
                    window.dispatchEvent(new CustomEvent("cc:navigate", { detail: { to: "/contact" } }))
                  } catch {
                    router.push("/contact")
                  }
                }}
              >
                Demander un devis
              </Button>
            )}
          </div>
          {state.siteType === "surmesure" && (
            <div className="text-xs text-white/70 mt-2">
              Projet sur‑mesure: merci de nous contacter pour définir votre besoin.
            </div>
          )}

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 w-full md:w-auto">
            <div className="flex items-center gap-6">
              <div>
                <div className="text-xs text-white/60">Total création</div>
                <div className="text-xl font-bold text-white">{state.siteType === "surmesure" ? "Sur devis" : formatEUR(totals.buildTotal)}</div>
              </div>
              <div className="hidden md:block w-px h-10 bg-white/10" />
              <div>
                <div className="text-xs text-white/60">Maintenance ({state.billing === "monthly" ? "mois" : "an"})</div>
                <div className="text-xl font-bold text-white">{state.siteType === "surmesure" ? "Sur devis" : totals.maintenance ? formatEUR(totals.maintenance) : "—"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Help box */}
        <div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white/90">
          <div className="font-semibold mb-2">Vous hésitez ?</div>
          <p className="text-sm mb-4">
            {state.siteType === "surmesure"
              ? "Pour un projet sur‑mesure, contactez‑nous pour détailler vos besoins et construire un devis adapté."
              : "Si vous n'êtes pas sûr des options à choisir, contactez‑nous et nous préparerons un devis personnalisé."}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-gray-100">Nous contacter</Button>
            </Link>
            <Link href="mailto:hello@example.com" className="text-white/80 underline underline-offset-4">hello@example.com</Link>
            <a href="tel:+1234567890" className="text-white/80 underline underline-offset-4">+1 (234) 567-890</a>
          </div>
        </div>
      </div>

      {showCustomModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowCustomModal(false)} />
          <div role="dialog" aria-modal="true" className="relative w-full max-w-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs text-white/70">Projet sur‑mesure</div>
                <h4 className="text-2xl font-bold">Parlons de votre besoin</h4>
              </div>
              <button onClick={() => setShowCustomModal(false)} className="text-white/70 hover:text-white">✕</button>
            </div>
            <p className="text-white/80 text-sm mb-6">
              Les projets sur‑mesure nécessitent un échange pour définir précisément vos objectifs (fonctionnalités, intégrations,
              animations, multi‑langue, contenus, délais). Cliquez ci‑dessous pour nous contacter et recevoir un devis adapté.
            </p>
            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10" onClick={() => setShowCustomModal(false)}>
                Fermer
              </Button>
              <Link href="/contact">
                <Button className="bg-white text-black hover:bg-gray-100">Nous contacter</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}


