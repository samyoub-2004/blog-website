import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { FeaturesSection } from "@/components/features-section"
import { BusinessTypesSectionCreation } from "@/components/business-types-section-creation"
import { PortfolioSection } from "@/components/portfolio"
import { CTASection } from "@/components/cta-section"
import { ContactCTASection } from "@/components/contact-cta-section"
import { Footer } from "@/components/footer"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import { Background } from "@/components/background"
import { HeroSolutionsWeb } from "@/components/hero-solutions-web"


export default function CreationSitesWebPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <Background variant="blue" />
      
      <main className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSolutionsWeb />
          <BusinessTypesSectionCreation />
          <PortfolioSection />
          <FeaturesSection />
          <ProblemSolutionSection />
          <CTASection />
          <ContactCTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
