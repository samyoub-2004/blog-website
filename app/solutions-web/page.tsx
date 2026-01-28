import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { FeaturesSection } from "@/components/features-section"
import { BusinessTypesSectionCreation } from "@/components/business-types-section-creation"
import { PortfolioSection } from "@/components/portfolio"
import { CTASection } from "@/components/cta-section"
import { ContactCTASection } from "@/components/contact-cta-section"
import { Footer } from "@/components/footer"
import { ProblemSolutionSection } from "@/components/problem-solution-section"


export default function CreationSitesWebPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <GlassmorphismNav />
          {/* Section Héro dédiée à la création de sites web */}
          <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-12 animate-fade-in-badge">
                <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse"></span>
                Création de Sites Web
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-heading">
                <span className="text-foreground">Des sites web modernes,</span>
                <br />
                <span className="text-foreground">performants et sur-mesure</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/80">
                Nous concevons des sites vitrines et e-commerce adaptés à vos besoins professionnels. Profitez d'une présence en ligne optimisée pour tous les appareils et moteurs de recherche.
              </p>
              <div className="flex flex-col md:flex-row gap-8 justify-center items-center mt-10">
                <div className="bg-white/10 rounded-lg shadow-md p-6 w-full md:w-1/2 border border-white/20">
                  <h2 className="text-2xl font-semibold mb-4 text-white">Sites vitrines</h2>
                  <p className="text-white/80">
                    Présentez votre activité, vos services et vos valeurs avec un site élégant, rapide et facile à gérer.
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg shadow-md p-6 w-full md:w-1/2 border border-white/20">
                  <h2 className="text-2xl font-semibold mb-4 text-white">Sites e-commerce</h2>
                  <p className="text-white/80">
                    Développez votre boutique en ligne avec une solution sécurisée, rapide et évolutive.
                  </p>
                </div>
              </div>
              <div className="mt-12">
                <a href="/contact" className="inline-block bg-gradient-to-r from-white to-slate-100 text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors duration-200 hover:from-slate-50 hover:to-slate-200 hover:scale-105 shadow-2xl">
                  Demander un devis gratuit
                </a>
              </div>
            </div>
          </section>
          {/* Sections réutilisées du thème principal */}
          <FeaturesSection />
          <BusinessTypesSectionCreation />
          <PortfolioSection />
          <ProblemSolutionSection />
          <CTASection />
          <ContactCTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
