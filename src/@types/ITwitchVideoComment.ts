export interface Commenter {
  display_name: string
  _id: string
  name: string
  type: string
  bio: string
  created_at: Date
  updated_at: Date
  logo: string
}

export interface Emoticon {
  emoticon_id: string
  emoticon_set_id: string
}

export interface Fragment {
  text: string
  emoticon: Emoticon
}

export interface UserBadge {
  _id: string
  version: string
}

export interface UserNoticeParams {}

export interface Emoticon2 {
  _id: string
  begin: number
  end: number
}

export interface Message {
  body: string
  fragments: Fragment[]
  is_action: boolean
  user_badges: UserBadge[]
  user_notice_params: UserNoticeParams
  user_color: string
  emoticons: Emoticon2[]
}

export interface ITwitchComment {
  _id: string
  created_at: Date
  updated_at: Date
  channel_id: string
  content_type: string
  content_id: string
  content_offset_seconds: number
  commenter: Commenter
  source: string
  state: string
  message: Message
}

export interface ITwitchVideoComment {
  comments: ITwitchComment[]
  _next: string
}
