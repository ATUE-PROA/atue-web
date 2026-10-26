import LandingHeader from '@/components/landing/LandingHeader'
import LandingHero from '@/components/landing/LandingHero'
import FeatureStrip from '@/components/landing/FeatureStrip'
import HowItWorks from '@/components/landing/HowItWorks'
import BuildSection from '@/components/landing/BuildSection'
import DomainCapture from '@/components/landing/DomainCapture'
import LandingFooter from '@/components/landing/LandingFooter'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <LandingHeader />
      <main>
        <LandingHero />
        <FeatureStrip />
        <HowItWorks />
        <BuildSection />
        <DomainCapture />
      </main>
      <LandingFooter />
    </div>
  )
}
