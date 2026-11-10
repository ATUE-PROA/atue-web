import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
import LandingHero from '@/components/landing/LandingHero'
import FeatureStrip from '@/components/landing/FeatureStrip'
import HowItWorks from '@/components/landing/HowItWorks'
import BuildSection from '@/components/landing/BuildSection'
import DomainCapture from '@/components/landing/DomainCapture'
import { LANDING_FOOTER } from '@/content/landing'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader />
      <main>
        <LandingHero />
        <FeatureStrip />
        <HowItWorks />
        <BuildSection />
        <DomainCapture />
      </main>
      <PublicFooter description={LANDING_FOOTER.description} copyright={LANDING_FOOTER.copyright} />
    </div>
  )
}
