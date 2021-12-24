import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import VideoButton from '~/components/organisms/VideoButton'
import * as S from './styles'

interface IVideos {
  streamerInformation: StreamerInformation
  vodInformation: VodInformation
}

interface VideoButtonGroupProps {
  videos: IVideos[]
  minVideoWidth?: string
  isMinimal?: boolean
}

const VideoButtonGroup = ({
  videos,
  minVideoWidth,
  isMinimal,
}: VideoButtonGroupProps) => {
  return (
    <S.VideoButtonGroupContainer
      minVideoWidth={minVideoWidth}
      isMinimal={isMinimal}
    >
      {videos.map((video) => (
        <VideoButton
          key={video.vodInformation.id}
          streamerInformation={video.streamerInformation}
          vodInformation={video.vodInformation}
          noAvatar={isMinimal}
          isMinimal={isMinimal}
        />
      ))}
    </S.VideoButtonGroupContainer>
  )
}

export default VideoButtonGroup
