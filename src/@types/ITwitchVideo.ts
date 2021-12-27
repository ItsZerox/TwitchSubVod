import {
  Channel,
  Fps,
  Preview,
  Resolutions,
  Thumbnails,
} from './ITwitchCommons'

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
