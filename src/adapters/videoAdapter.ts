import { IVideo } from '~/@types/IVideo'
import { StreamerInformation } from '~/@types/StreamerInformation'
import { IGQLTwitchVideo } from '~/@types/Twitch/gql/IGQLTwitchVideo'
import { VodInformation } from '~/@types/VodInformation'

export const videoAdapter = (video: IGQLTwitchVideo): IVideo => {
  const streamerInformation: StreamerInformation = {
    name: video.owner.login,
    logo: video.owner.profileImageURL,
    displayName: video.owner.displayName,
    followers: video.owner.followers.totalCount,
    description: video.owner.description,
  }

  const vodInformation: VodInformation = {
    title: video.title,
    date: video.createdAt,
    duration: video.lengthSeconds,
    id: video.id,
    thumbnail: video.previewThumbnailURL,
    viewCount: video.viewCount,
  }

  return {
    streamerInformation,
    vodInformation,
  }
}
