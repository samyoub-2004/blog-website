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
    pitch: "Site vitrine moderne avec vitrine produits et options d'évolution.",
    buildPrice: 999,
    features: [
      "Rubriques : 7",
      "Pages : 12 + contact",
      "Vitrine en ligne : 25 produits max",
      "Resposive Design",
      "Adresse E-mails : illimités",
      "Google mail : Oui",
      "Conception graphique / Maquettage : 2 réalisations au choix",
      "Référencement : Naturel",
      "Multilangue : 30% du prix global",
    ],
    cta: "Démarrer",
    availableOptions: VITRINE_OPTIONS,
  },
  {
    key: "business",
    name: "Business",
    pitch: "Site d'entreprise complet pour présenter vos services et générer des demandes.",
    buildPrice: 1999,
    popular: true,
    features: [
      "Présentation entreprise (à propos, valeurs, équipe)",
      "Pages services détaillées",
      "Portfolio / Réalisations",
      "Blog / Actualités",
      "Formulaires (contact + demande de devis)",
      "Avis / témoignages (optionnel)",
      "SEO optimisé (structure + contenus)",
      "Responsive design",
    ],
    cta: "Choisir ce plan",
    availableOptions: BUSINESS_OPTIONS,
  },
  {
    key: "ecommerce",
    name: "E‑commerce",
    pitch: "Boutique en ligne complète avec administration de gestion.",
    buildPrice: 3499,
    features: [
      "Administration de gestion",
      "Gestion des catégories et sous catégories",
      "Gestion des clients",
      "Gestion du stock et prix (mise a jour quotidienne via fichiers csv)",
      "Gestion des commandes",
      "Statistiques des ventes",
      "Nombre de pages : illimité",
      "Nombre de menus : illimité",
      "Nombre de produits : illimité",
      "Thème unique et personalisé",
      "Responsive design",
      "Formulaire de contact",
      "Catalogue de vente",
      "Système de blog et news",
      "Espace membre",
      "Panier",
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
    pitch: "Site vitrine moderne avec vitrine produits et options d'évolution.",
    buildPrice: 75000,
    features: [
      "Rubriques : 7",
      "Pages : 12 + contact",
      "Vitrine en ligne : 25 produits max",
      "Resposive Design",
      "Adresse E-mails : illimités",
      "Google mail : Oui",
      "Conception graphique / Maquettage : 2 réalisations au choix",
      "Référencement : Naturel",
      "Multilangue : 30% du prix global",
    ],
    cta: "Démarrer",
    availableOptions: VITRINE_OPTIONS,
  },
  {
    key: "business",
    name: "Business",
    pitch: "Site d'entreprise complet pour présenter vos services et générer des demandes.",
    buildPrice: 16000,
    popular: true,
    features: [
      "Présentation entreprise (à propos, valeurs, équipe)",
      "Pages services détaillées",
      "Portfolio / Réalisations",
      "Blog / Actualités",
      "Formulaires (contact + demande de devis)",
      "Avis / témoignages (optionnel)",
      "SEO optimisé (structure + contenus)",
      "Responsive design",
    ],
    cta: "Choisir ce plan",
    availableOptions: BUSINESS_OPTIONS,
  },
  {
    key: "ecommerce",
    name: "E‑commerce",
    pitch: "Boutique en ligne complète avec administration de gestion.",
    buildPrice: 300000,
    features: [
      "Administration de gestion",
      "Gestion des catégories et sous catégories",
      "Gestion des clients",
      "Gestion du stock et prix (mise a jour quotidienne via fichiers csv)",
      "Gestion des commandes",
      "Statistiques des ventes",
      "Nombre de pages : illimité",
      "Nombre de menus : illimité",
      "Nombre de produits : illimité",
      "Thème unique et personalisé",
      "Responsive design",
      "Formulaire de contact",
      "Catalogue de vente",
      "Système de blog et news",
      "Espace membre",
      "Panier",
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
