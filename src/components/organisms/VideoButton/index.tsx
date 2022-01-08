import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import Typography from '~/components/atoms/Typography'
import VideoThumbnail from '~/components/atoms/VideoThumbnail'
import StreamDescription from '~/components/molecules/StreamDescription'
import { secondsToHM } from '~/utils/secondsToHM'
import * as S from './styles'

interface VideoButtonProps {
  streamerInformation: StreamerInformation
  vodInformation: VodInformation
  noAvatar?: boolean
  isMinimal?: boolean
}

const VideoButton = ({
  streamerInformation,
  vodInformation,
  noAvatar,
  isMinimal,
}: VideoButtonProps) => {
  return (
    <S.VideoButtonContainer
      isMinimal={isMinimal}
      data-testid={vodInformation.id}
    >
      <S.BoxLink as="a" tabIndex={0} href={`/video/${vodInformation.id}`}>
        <S.VideoLength>
          <Typography variant="overline">
            {secondsToHM(vodInformation.duration)}
          </Typography>
        </S.VideoLength>
        <VideoThumbnail
          src={vodInformation.thumbnail}
          title={vodInformation.title}
        />
      </S.BoxLink>

      <StreamDescription
        streamerInformation={streamerInformation}
        vodInformation={vodInformation}
        noAvatar={noAvatar}
        lineLimit={3}
        urlProps={{
          href: `/video/${vodInformation.id}`,
        }}
        isMinimal={isMinimal}
      />
    </S.VideoButtonContainer>
  )
}

export default VideoButton
