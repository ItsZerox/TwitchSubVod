import { IVideos } from '~/@types/IVideos'
import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import { ITwitchTopVideos } from '~/services/api/getTopVideos/types'

export const topVideosAdapter = (data: ITwitchTopVideos): IVideos[] => {
  const videos: IVideos[] = data.vods.map((video) => {
    const streamerInformation: StreamerInformation = {
      name: video.channel.name,
      logo: video.channel.logo,
      displayName: video.channel.display_name,
      followers: video.channel.followers,
      description: video.channel.description,
    }

    const vodInformation: VodInformation = {
      title: video.title,
      date: video.created_at,
      duration: video.length,
      id: video.broadcast_id,
      thumbnail: video.preview.medium,
      viewCount: video.views,
    }

    return {
      streamerInformation,
      vodInformation,
    }
  })

  return videos
}
