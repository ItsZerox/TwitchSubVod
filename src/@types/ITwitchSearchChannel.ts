export interface Datum {
  broadcaster_language: string
  broadcaster_login: string
  display_name: string
  game_id: string
  game_name: string
  id: string
  is_live: boolean
  tag_ids: string[]
  thumbnail_url: string
  title: string
  started_at: any
}

export interface Pagination {
  cursor: string
}

export interface ITwitchSearchChannel {
  data: Datum[]
  pagination: Pagination
}
