import { VideoUrl } from './VideoUrl'

export interface VodInformation {
  id: string
  thumbnail: string
  title: string
  viewCount: number
  duration: number
  date: string
  urls?: VideoUrl[]
}
