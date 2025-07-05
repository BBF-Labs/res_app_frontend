import { Header } from "@/components/layout/header"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { TestimonialsSlider } from "@/components/landing/testimonials-slider"
import { PartnersSlider } from "@/components/landing/partners-slider"
import { Stats } from "@/components/landing/stats"
import { ResumeExamples } from "@/components/landing/resume-examples"
import { FAQ } from "@/components/landing/faq"
import { Footer } from "@/components/layout/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <PartnersSlider />
        <ResumeExamples />
        <TestimonialsSlider />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
