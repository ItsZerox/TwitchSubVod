import { ITwitchVideo } from '~/@types/ITwitchVideo'
import { IVideo } from '~/@types/IVideo'
import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import { getUrlsFromVideo } from '~/utils/getUrlFromVideo/getUrlsFromVideo'

export const videoAdapter = (video: ITwitchVideo): IVideo => {
  const streamerInformation: StreamerInformation = {
    name: video.channel.name,
    logo: video.channel.logo,
    displayName: video.channel.display_name,
    followers: video.channel.followers,
    description: video.channel.description,
  }

  const vodInformation: VodInformation = {
    title: video.title,
    date: video.created_at as string,
    duration: video.length,
    id: video._id.replace('v', ''),
    thumbnail: video.preview.medium,
    viewCount: video.views,
    urls: getUrlsFromVideo(video),
  }

  return {
    streamerInformation,
    vodInformation,
  }
}
