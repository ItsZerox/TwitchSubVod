export interface Preview {
  small: string
  medium: string
  large: string
  template: string
}

export interface Small {
  type: string
  url: string
}

export interface Medium {
  type: string
  url: string
}

export interface Large {
  type: string
  url: string
}

export interface Template {
  type: string
  url: string
}

export interface Thumbnails {
  small: Small[]
  medium: Medium[]
  large: Large[]
  template: Template[]
}

export interface Fps {
  '160p30': number
  '360p30': number
  '480p30': number
  '720p60': number
  chunked: number
}

export interface Resolutions {
  '160p30': string
  '360p30': string
  '480p30': string
  '720p60': string
  chunked: string
}

export interface Channel {
  mature: boolean
  status: string
  broadcaster_language: string
  broadcaster_software: string
  display_name: string
  game: string
  language: string
  _id: number
  name: string
  created_at: Date
  updated_at: Date
  partner: boolean
  logo: string
  video_banner: string
  profile_banner: string
  profile_banner_background_color: string
  url: string
  views: number
  followers: number
  broadcaster_type: string
  description: string
  private_video: boolean
  privacy_options_enabled: boolean
}

export interface ITwitchVideo {
  title: string
  description?: any
  description_html?: any
  broadcast_id: number
  broadcast_type: string
  status: string
  tag_list: string
  views: number
  url: string
  language: string
  created_at: Date | string
  viewable: string
  viewable_at?: any
  published_at: Date
  delete_at: Date
  _id: string
  recorded_at: Date
  game: string
  length: number
  preview: Preview
  animated_preview_url: string
  thumbnails: Thumbnails
  fps: Fps
  seek_previews_url: string
  resolutions: Resolutions
  restriction: string
  channel: Channel
  increment_view_count_url?: string
}
