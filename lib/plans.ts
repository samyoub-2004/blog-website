export type Currency = "EUR" | "DZD"

export type PlanKey = "vitrine" | "business" | "ecommerce" | "surmesure"

export type PlanOptionKey =
  | "blog"
  | "formulaire_avance"
  | "seo_avance"
  | "galerie"
  | "carrousel"
  | "multilingue"
  | "paiement_en_ligne"
  | "reservation"

export type PlanOption = {
  key: PlanOptionKey
  label: string
}

export type Plan = {
  key: PlanKey
  name: string
  pitch: string
  features: string[]
  cta: string
  custom?: boolean
  buildPrice?: number
  maintenanceMonthly?: number
  maintenanceYearly?: number
  popular?: boolean
  availableOptions: PlanOption[]
}

const OPTIONS: Record<PlanOptionKey, PlanOption> = {
  blog: { key: "blog", label: "Blog / Actualités" },
  formulaire_avance: { key: "formulaire_avance", label: "Formulaire avancé" },
  seo_avance: { key: "seo_avance", label: "SEO avancé" },
  galerie: { key: "galerie", label: "Galerie" },
  carrousel: { key: "carrousel", label: "Carrousel" },
  multilingue: { key: "multilingue", label: "Multi‑langue" },
  paiement_en_ligne: { key: "paiement_en_ligne", label: "Paiement en ligne" },
  reservation: { key: "reservation", label: "Réservation" },
}

const VITRINE_OPTIONS: PlanOption[] = [OPTIONS.galerie, OPTIONS.carrousel, OPTIONS.formulaire_avance]
const BUSINESS_OPTIONS: PlanOption[] = [OPTIONS.blog, OPTIONS.galerie, OPTIONS.carrousel, OPTIONS.formulaire_avance, OPTIONS.seo_avance, OPTIONS.multilingue]
const ECOMMERCE_OPTIONS: PlanOption[] = [OPTIONS.blog, OPTIONS.formulaire_avance, OPTIONS.seo_avance, OPTIONS.multilingue, OPTIONS.paiement_en_ligne]
const SURMESURE_OPTIONS: PlanOption[] = [OPTIONS.blog, OPTIONS.formulaire_avance, OPTIONS.seo_avance, OPTIONS.multilingue, OPTIONS.paiement_en_ligne, OPTIONS.reservation]

const PLANS_EUR: Plan[] = [
  {
    key: "vitrine",
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
    availableOptions: VITRINE_OPTIONS,
  },
  {
    key: "business",
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
    availableOptions: BUSINESS_OPTIONS,
  },
  {
    key: "ecommerce",
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
    availableOptions: ECOMMERCE_OPTIONS,
  },
  {
    key: "surmesure",
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
    availableOptions: SURMESURE_OPTIONS,
  },
]

const PLANS_DZD: Plan[] = [
  {
    key: "vitrine",
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
    availableOptions: VITRINE_OPTIONS,
  },
  {
    key: "business",
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
    availableOptions: BUSINESS_OPTIONS,
  },
  {
    key: "ecommerce",
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
    availableOptions: ECOMMERCE_OPTIONS,
  },
  {
    key: "surmesure",
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
    availableOptions: SURMESURE_OPTIONS,
  },
]

export function getPlans(currency: Currency): Plan[] {
  return currency === "DZD" ? PLANS_DZD : PLANS_EUR
}

export function getPlanByKey(currency: Currency, key: PlanKey): Plan | undefined {
  return getPlans(currency).find((p) => p.key === key)
}
