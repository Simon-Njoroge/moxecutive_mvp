import { Navbar } from "@/components/navbar"
import { TopBar } from "@/components/top-bar"
import { HeroSection } from "@/components/hero-section"
import { WhyUsSection } from "@/components/why-us-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { FaqSection } from "@/components/faq-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <TopBar />
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <ServicesSection />
      <PortfolioSection />
      <FaqSection />
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
