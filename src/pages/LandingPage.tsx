import { PublicHeader } from '@/components/layout/public-header'
import { PublicFooter } from '@/components/layout/public-footer'
import LandingHero from '@/components/landing/LandingHero'
import Features from '@/components/landing/Features'
import Amostra from '@/components/landing/Amostra'
import Planos from '@/components/landing/Planos'
import LandingFaq from '@/components/landing/LandingFaq'
import CtaFinal from '@/components/landing/CtaFinal'
import { LANDING_FOOTER } from '@/content/landing'

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] overflow-x-clip bg-background text-foreground">
      <PublicHeader />
      <main id="conteudo">
        <LandingHero />
        <Features />
        <Amostra />
        <Planos />
        <LandingFaq />
        <CtaFinal />
      </main>
      <PublicFooter description={LANDING_FOOTER.description} copyright={LANDING_FOOTER.copyright} />
    </div>
  )
}
