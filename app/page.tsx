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
import { AdBillboard } from "@/components/ad-billboard"
import { ResponsiveDevices } from "@/components/responsive-devices"
import { LogosMarquee } from "@/components/logos-marquee"

import { ProcessSteps } from "@/components/process-steps"
import { FAQ } from "@/components/faq"


export default function HomePage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Global background avec gradient orbs et grille */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-tl from-purple-600/20 via-blue-400/20 to-transparent blur-3xl" />
        <div className="absolute top-[15%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-gradient-to-bl from-cyan-400/15 to-transparent blur-3xl" />
        <div className="absolute bottom-[20%] left-[20%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-tr from-indigo-500/15 to-transparent blur-2xl" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ 
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "100px 100px"
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/30" />
      </div>
      
      <main className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <GlassmorphismNav />
          <HeroSection />
          {/* <LogosMarquee /> */}
          {/* <AdBillboard /> */}
          <ResponsiveDevices />
          {/* <ProblemSolutionSection /> */}
          <ProcessSteps />
          <ShowcaseSection />
          
          {/* <FeaturesSection /> */}
          {/* <InteractiveExpertise /> */}
          {/* <ROICalculatorSection /> */}
          <BusinessTypesSectionCreation />
          <TechStackSection />
          <PricingSection />
          <FAQ />
          <CTASection />
          <ContactCTASection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
