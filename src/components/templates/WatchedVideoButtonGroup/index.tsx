import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import VideoButton from '~/components/organisms/VideoButton'
import { IWatchedVod } from '~/constants/localStorageKeys'
import * as S from './styles'

interface WatchedVideoButtonGroupProps {
  videos: IWatchedVod[]
}

const WatchedVideoButtonGroup = ({ videos }: WatchedVideoButtonGroupProps) => {
  return (
    <S.WatchedVideoButtonGroupContainer>
      {videos.map((video) => {
        const streamerInformation: StreamerInformation = {
          id: video.streamerName,
          name: video.streamerName,
          displayName: video.streamerName,
          followers: 0,
          logo: video.streamerLogoUrl,
          description: '',
        }
        const vodInformation: VodInformation = {
          id: video.id,
          title: video.title,
          thumbnail: video.thumbnailUrl || '/logo.jpg',
          duration: video.totalVodTime,
          date: '',
          viewCount: 0,
        }

        return (
          <VideoButton
            key={video.id}
            streamerInformation={streamerInformation}
            vodInformation={vodInformation}
            isMinimal={false}
            noAvatar={false}
            watchedPercentage={video.time / video.totalVodTime}
          />
        )
      })}
    </S.WatchedVideoButtonGroupContainer>
  )
}

export default WatchedVideoButtonGroup
