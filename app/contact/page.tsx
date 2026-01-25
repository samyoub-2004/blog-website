import { GlassmorphismNav } from "@/components/glassmorphism-nav"
import { ContactFormSection } from "@/components/contact-form-section"
import { Footer } from "@/components/footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <main className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <GlassmorphismNav />
          <ContactFormSection />
          <Footer />
        </div>
      </main>
    </div>
  )
}
