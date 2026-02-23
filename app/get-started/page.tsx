"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import { getPlans, type PlanKey } from "@/lib/plans"

type WizardState = {
  planKey: PlanKey
  pages: number
  languages: number
  selectedOptions: Record<string, boolean>
  contact: {
    fullName: string
    email: string
    phone: string
    company: string
    message: string
  }
}

const DEFAULT_STATE: WizardState = {
  planKey: "vitrine",
  pages: 5,
  languages: 1,
  selectedOptions: {},
  contact: {
    fullName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  },
}

export default function GetStartedPage() {
  const params = useSearchParams()
  const planParam = params.get("plan")

  const [step, setStep] = useState(1)
  const [state, setState] = useState<WizardState>(DEFAULT_STATE)

  const restoredFromStorageRef = useRef(false)

  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const plans = useMemo(() => getPlans("EUR"), [])

  const currentPlan = useMemo(() => plans.find((p) => p.key === state.planKey), [plans, state.planKey])

  const availableOptions = useMemo(() => currentPlan?.availableOptions || [], [currentPlan])
  const includedDetails = useMemo(() => currentPlan?.features || [], [currentPlan])

  // Restore wizard state if the page remounts (e.g. refresh / navigation)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("xo-link:get-started")
      if (!raw) return

      const parsed = JSON.parse(raw) as { step?: number; state?: WizardState } | null
      if (!parsed?.state) return

      if (typeof parsed.step === "number") setStep(parsed.step)
      setState(parsed.state)
      restoredFromStorageRef.current = true
    } catch {
      // ignore
    }
  }, [])

  // Persist wizard progress to prevent unexpected resets
  useEffect(() => {
    try {
      sessionStorage.setItem("xo-link:get-started", JSON.stringify({ step, state }))
    } catch {
      // ignore
    }
  }, [step, state])

  // Initialize plan from query
  useEffect(() => {
    if (!planParam) return
    if (restoredFromStorageRef.current) return
    const normalized = planParam.toLowerCase().trim()
    const map: Record<string, PlanKey> = {
      vitrine: "vitrine",
      business: "business",
      ecommerce: "ecommerce",
      "e-commerce": "ecommerce",
      surmesure: "surmesure",
      "sur-mesure": "surmesure",
      sur: "surmesure",
    }
    const key = map[normalized]
    if (key) setState((s) => ({ ...s, planKey: key }))
  }, [planParam])

  useEffect(() => {
    setState((s) => {
      const next: Record<string, boolean> = { ...s.selectedOptions }
      for (const opt of availableOptions) {
        if (typeof next[opt.key] === "undefined") next[opt.key] = false
      }
      for (const k of Object.keys(next)) {
        if (!availableOptions.some((o) => o.key === k)) delete next[k]
      }
      return { ...s, selectedOptions: next }
    })
  }, [availableOptions])

  const StepHeader = (
    <div className="text-center mb-8">
      <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6">
        <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse"></span>
        Démarrage rapide
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">Construisez votre devis</h1>
      <p className="text-white/70 max-w-2xl mx-auto">Choisissez votre plan, les détails du projet et les options. On vous recontacte avec un devis personnalisé.</p>
    </div>
  )

  const Progress = (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4, 5].map((i) => (
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
                <div className="text-white/80 text-sm mb-3">Plan</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {plans.map((p) => (
                    <button
                      key={p.key}
                      type="button"
                      onClick={() => setState((s) => ({ ...s, planKey: p.key }))}
                      className={`px-4 py-3 rounded-xl border transition-all text-left ${
                        state.planKey === p.key ? "bg-white text-black border-transparent" : "bg-white/5 text-white border-white/15 hover:bg-white/10"
                      }`}
                    >
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs opacity-70">{p.pitch}</div>
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
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-6">
              <div className="text-white text-lg font-semibold">Détails du plan : {currentPlan?.name || "—"}</div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-3">Inclus</div>
                  <ul className="text-white/90 text-sm space-y-2">
                    {includedDetails.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/70 mt-2 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                    {includedDetails.length === 0 && <li className="text-white/60">—</li>}
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-3">Options (à cocher)</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {availableOptions.map((opt) => {
                      const checked = !!state.selectedOptions[opt.key]
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          role="switch"
                          aria-checked={checked}
                          onClick={() =>
                            setState((s) => ({
                              ...s,
                              selectedOptions: { ...s.selectedOptions, [opt.key]: !checked },
                            }))
                          }
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${
                            checked ? "bg-white text-black border-transparent" : "bg-white/5 text-white border-white/15 hover:bg-white/10"
                          }`}
                        >
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-current opacity-80" />
                          <span className="text-sm">{opt.label}</span>
                        </button>
                      )
                    })}
                    {availableOptions.length === 0 && <div className="text-sm text-white/60">Aucune option disponible pour ce plan.</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="grid gap-6">
              <div className="text-white text-lg font-semibold">Vos coordonnées</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-white/70 text-sm mb-2">Nom complet</div>
                  <input
                    value={state.contact.fullName}
                    onChange={(e) => setState((s) => ({ ...s, contact: { ...s.contact, fullName: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-2">Email</div>
                  <input
                    type="email"
                    value={state.contact.email}
                    onChange={(e) => setState((s) => ({ ...s, contact: { ...s.contact, email: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                    placeholder="vous@exemple.com"
                  />
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-2">Téléphone</div>
                  <input
                    value={state.contact.phone}
                    onChange={(e) => setState((s) => ({ ...s, contact: { ...s.contact, phone: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                    placeholder="+213..."
                  />
                </div>
                <div>
                  <div className="text-white/70 text-sm mb-2">Entreprise</div>
                  <input
                    value={state.contact.company}
                    onChange={(e) => setState((s) => ({ ...s, contact: { ...s.contact, company: e.target.value } }))}
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                    placeholder="(optionnel)"
                  />
                </div>
              </div>

              <div>
                <div className="text-white/70 text-sm mb-2">Message</div>
                <textarea
                  value={state.contact.message}
                  onChange={(e) => setState((s) => ({ ...s, contact: { ...s.contact, message: e.target.value } }))}
                  className="w-full min-h-[120px] px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  placeholder="Expliquez votre besoin (deadline, style, exemples, etc.)"
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="grid gap-6">
              <div className="text-white text-lg font-semibold">Récapitulatif</div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-2">Paramètres</div>
                  <ul className="text-white/90 text-sm space-y-2">
                    <li>
                      <span className="text-white/60">Plan:</span> {currentPlan?.name || state.planKey}
                    </li>
                    <li>
                      <span className="text-white/60">Pages:</span> {state.pages}
                    </li>
                    <li>
                      <span className="text-white/60">Langues:</span> {state.languages}
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="text-white/70 text-sm mb-2">Options sélectionnées</div>
                  <ul className="text-white/90 text-sm space-y-2">
                    {availableOptions
                      .filter((o) => !!state.selectedOptions[o.key])
                      .map((o) => (
                        <li key={o.key} className="flex items-center gap-2">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/70"></span>
                          <span>{o.label}</span>
                        </li>
                      ))}
                    {availableOptions.every((o) => !state.selectedOptions[o.key]) && (
                      <li className="text-white/60">Aucune option ajoutée</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="text-white/70 text-sm mb-2">Contact</div>
                <div className="text-white/90 text-sm">
                  <div>{state.contact.fullName || "—"}</div>
                  <div>{state.contact.email || "—"}</div>
                  {state.contact.phone && <div>{state.contact.phone}</div>}
                  {state.contact.company && <div>{state.contact.company}</div>}
                </div>
              </div>

              {submitError && <div className="text-sm text-red-200">{submitError}</div>}
              {submitted && <div className="text-sm text-emerald-200">Demande envoyée. On vous répond très vite.</div>}
            </div>
          )}
        </div>

        {/* Bottom actions: navigation + assistance */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
              Précédent
            </Button>
            {step < 5 ? (
              <Button
                className="bg-white text-black hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => {
                  setSubmitError(null)
                  setStep((s) => Math.min(5, s + 1))
                }}
                disabled={false}
              >
                Suivant
              </Button>
            ) : (
              <Button
                className="bg-white text-black hover:bg-gray-100"
                disabled={submitting || submitted}
                onClick={async () => {
                  setSubmitting(true)
                  setSubmitError(null)
                  try {
                    const selected = availableOptions.filter((o) => !!state.selectedOptions[o.key]).map((o) => ({ key: o.key, label: o.label }))
                    const payload = {
                      planKey: state.planKey,
                      planName: currentPlan?.name || state.planKey,
                      pages: state.pages,
                      languages: state.languages,
                      options: selected,
                      contact: state.contact,
                    }

                    const res = await fetch("/api/quote", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    })

                    if (!res.ok) {
                      const data = (await res.json().catch(() => null)) as any
                      throw new Error(data?.error || "Impossible d'envoyer la demande")
                    }

                    setSubmitted(true)
                    toast.success("Demande envoyée", {
                      description: "Merci ! On vous répond très vite.",
                    })
                    try {
                      sessionStorage.removeItem("xo-link:get-started")
                    } catch {
                      // ignore
                    }
                  } catch (e: any) {
                    setSubmitError(e?.message || "Erreur lors de l'envoi")
                    toast.error("Erreur", {
                      description: e?.message || "Impossible d'envoyer la demande",
                    })
                  } finally {
                    setSubmitting(false)
                  }
                }}
              >
                {submitting ? "Envoi..." : submitted ? "Envoyé" : "Demander un devis"}
              </Button>
            )}
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 w-full md:w-auto">
            <div className="text-xs text-white/60">Plan sélectionné</div>
            <div className="text-lg font-bold text-white">{currentPlan?.name || state.planKey}</div>
          </div>
        </div>

        {/* Help box */}
        <div className="mt-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-white/90">
          <div className="font-semibold mb-2">Vous hésitez ?</div>
          <p className="text-sm mb-4">
            Si vous n'êtes pas sûr des options à choisir, contactez‑nous et nous préparerons un devis personnalisé.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/contact">
              <Button className="bg-white text-black hover:bg-gray-100">Nous contacter</Button>
            </Link>
            <Link href="mailto:contact@xo-link.com" className="text-white/80 underline underline-offset-4">contact@xo-link.com</Link>
            <a href="tel:+33765898864" className="text-white/80 underline underline-offset-4">+33 7 65 89 88 64</a>
            <a href="tel:+213794214276" className="text-white/80 underline underline-offset-4">+213 7 94 21 42 76</a>
          </div>
        </div>
      </div>
    </section>
  )
}


