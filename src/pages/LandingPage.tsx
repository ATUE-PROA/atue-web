import { PublicFooter } from '@/components/layout/public-footer'
import { PublicHeader } from '@/components/layout/public-header'
import LandingHero from '@/components/landing/LandingHero'
import FeatureStrip from '@/components/landing/FeatureStrip'
import HowItWorks from '@/components/landing/HowItWorks'
import BuildSection from '@/components/landing/BuildSection'
import DomainCapture from '@/components/landing/DomainCapture'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicHeader />
      <main className="flex-1">
        <LandingHero />
        <FeatureStrip />
        <HowItWorks />
        <BuildSection />
        <DomainCapture />
      </main>
      <PublicFooter />
    </div>
  )
}
