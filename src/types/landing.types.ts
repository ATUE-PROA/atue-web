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
