import { BrandLink } from '@/components/layout/site-header'
import { LANDING_FOOTER } from '@/content/landing'

export default function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <BrandLink />
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">{LANDING_FOOTER.description}</p>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs text-muted-foreground">{LANDING_FOOTER.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
