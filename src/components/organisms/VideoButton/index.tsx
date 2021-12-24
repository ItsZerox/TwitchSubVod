import Link from 'next/link'
import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import Box from '~/components/atoms/Box'
import VideoThumbnail from '~/components/atoms/VideoThumbnail'
import StreamDescription from '~/components/molecules/StreamDescription'
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
      <Link href="/video/[vod]" as={`/video/${vodInformation.id}`} passHref>
        <S.BoxLink as="a" tabIndex={0}>
          <VideoThumbnail
            src={vodInformation.thumbnail}
            title={vodInformation.title}
          />
        </S.BoxLink>
      </Link>

      <StreamDescription
        streamerInformation={streamerInformation}
        vodInformation={vodInformation}
        noAvatar={noAvatar}
        lineLimit={isMinimal ? 2 : 3}
        urlProps={{
          href: `/video/${vodInformation.id}`,
          as: `/video/${vodInformation.id}`,
        }}
      />
    </S.VideoButtonContainer>
  )
}

export default VideoButton
