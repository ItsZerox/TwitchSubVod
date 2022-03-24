export interface Versions {
  image_url_1x: string
  image_url_2x: string
  image_url_4x: string
  description: string
  title: string
  click_action: string
  click_url: string
  last_updated?: any
}

export interface BadgeSets {
  [key: string]: {
    versions: {
      [key: number]: Versions
    }
  }
}

export interface ITwitchBadges {
  badge_sets: BadgeSets
}
