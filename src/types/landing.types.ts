export interface DomainFormValues {
  domain: string
}

export interface DomainCaptureState {
  domain: string
}

export interface LandingNavItem {
  readonly label: string
  readonly href: string
}

export interface LandingFeature {
  readonly title: string
  readonly description: string
}

export interface LandingStep {
  readonly title: string
  readonly description: string
}

export interface LandingHeroContent {
  readonly eyebrow: string
  readonly title: string
  readonly description: string
  readonly ctaLabel: string
  readonly ctaHref: string
}

export interface LandingVisionContent {
  readonly title: string
  readonly description: string
  readonly commitments: readonly string[]
}

export interface LandingDomainCaptureContent {
  readonly eyebrow: string
  readonly title: string
  readonly label: string
  readonly placeholder: string
  readonly submitLabel: string
  readonly helperText: string
}

export interface LandingFooterContent {
  readonly description: string
  readonly copyright: string
  readonly links: readonly LandingNavItem[]
}
