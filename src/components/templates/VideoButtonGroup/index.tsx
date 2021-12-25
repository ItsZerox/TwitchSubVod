import { IVideo } from '~/@types/IVideo'
import VideoButton from '~/components/organisms/VideoButton'
import * as S from './styles'

interface VideoButtonGroupProps {
  videos: IVideo[]
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
