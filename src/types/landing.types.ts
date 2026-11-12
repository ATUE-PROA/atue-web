import type { IssueSeverity } from '@/types/api'

export interface DomainFormValues {
  domain: string
}

export interface DomainCaptureState {
  domain: string
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
  readonly primaryCtaLabel: string
  readonly primaryCtaHref: string
  readonly secondaryCtaLabel: string
  readonly secondaryCtaHref: string
}

export interface LandingTrustFact {
  readonly title: string
  readonly description: string
}

export interface LandingPreviewFinding {
  readonly title: string
  readonly severity: IssueSeverity
}

export interface LandingProductPreview {
  readonly badge: string
  readonly title: string
  readonly domain: string
  readonly dateLabel: string
  readonly scoreCaption: string
  readonly score: number
  readonly scoreLabel: string
  readonly summary: string
  readonly findings: readonly LandingPreviewFinding[]
  readonly nextActionLabel: string
  readonly nextAction: string
  readonly footnote: string
}

export interface LandingFaqItem {
  readonly question: string
  readonly answer: string
}

export interface LandingSectionIntro {
  readonly eyebrow: string
  readonly title: string
  readonly description: string
}

export interface LandingPhoto {
  readonly src: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

export interface LandingVisionContent {
  readonly eyebrow: string
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
  readonly loginLabel: string
}

export interface LandingFooterContent {
  readonly description: string
  readonly copyright: string
}
