import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { HeroSection } from "@/components/hero-section"
import { ProblemSolutionSection } from "@/components/problem-solution-section"
import { ShowcaseSection } from "@/components/show-case-section"
import { TechStackSection } from "@/components/tech-stack-section"
// import { ROICalculatorSection } from "@/components/roi-calculator-section"
import { BusinessTypesSection } from "@/components/business-types-section"
import { CTASection } from "@/components/cta-section"
import { ContactCTASection } from "@/components/contact-cta-section"
import { Footer } from "@/components/footer"
import { PricingSection } from "@/components/pricing-section"
import { InteractiveExpertise } from "@/components/intrctive-screen"
import { BusinessTypesSectionCreation } from "@/components/business-types-section-creation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          <ProblemSolutionSection />
          {/* <FeaturesSection /> */}
          <ShowcaseSection />
          <TechStackSection />
          {/* <InteractiveExpertise /> */}
          {/* <ROICalculatorSection /> */}
          <BusinessTypesSectionCreation />
          <CTASection />
          <PricingSection />
          <ContactCTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
