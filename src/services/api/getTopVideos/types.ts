export interface IGetTopVideos {
  limit?: number
  offset?: number
  game?: string
  period?: 'week' | 'month' | 'all'
  language?: string
  sort?: 'views' | 'time'
}

interface Preview {
  small: string
  medium: string
  large: string
  template: string
}

interface Small {
  type: string
  url: string
}

interface Medium {
  type: string
  url: string
}

interface Large {
  type: string
  url: string
}

interface Template {
  type: string
  url: string
}

interface Thumbnails {
  small: Small[]
  medium: Medium[]
  large: Large[]
  template: Template[]
}

interface Fps {
  '160p30': number
  '360p30': number
  '480p30': number
  '720p30': number
  chunked: number
  '720p60'?: number
}

interface Resolutions {
  '160p30': string
  '360p30': string
  '480p30': string
  '720p30': string
  chunked: string
  '720p60': string
}

interface Channel {
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

interface MutedSegment {
  duration: number
  offset: number
}

interface Vod {
  title: string
  description?: any
  description_html?: any
  broadcast_id: any
  broadcast_type: string
  status: string
  tag_list: string
  views: number
  url: string
  language: string
  created_at: Date
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
  increment_view_count_url: string
  muted_segments: MutedSegment[]
}

export interface ITwitchTopVideos {
  vods: Vod[]
}
