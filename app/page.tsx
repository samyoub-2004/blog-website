import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { ShowcaseSection } from "@/components/show-case-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { CTASection } from "@/components/cta-section"
import { ContactCTASection } from "@/components/contact-cta-section"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/pricing-section"
import { BusinessTypesSectionCreation } from "@/components/business-types-section-creation"
import { ResponsiveDevices } from "@/components/responsive-devices"
import { ProcessSteps } from "@/components/process-steps"
import { FAQ } from "@/components/faq"
import { Background } from "@/components/background"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Background réutilisable avec variante par défaut */}
      <Background variant="default" />
      
      <main className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <ResponsiveDevices />
          <ProcessSteps />
          <ShowcaseSection />
          <BusinessTypesSectionCreation />
          <TechStackSection />
          <PricingSection />
          <FAQ />
          {/* <CTASection /> */}
          <ContactCTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
