import { ITwitchVideo } from '~/@types/ITwitchVideo'

export interface IGetTopVideos {
  limit?: number
  offset?: number
  game?: string
  period?: 'week' | 'month' | 'all'
  language?: string
  sort?: 'views' | 'time'
}

export interface ITwitchTopVideos {
  vods: ITwitchVideo[]
}
