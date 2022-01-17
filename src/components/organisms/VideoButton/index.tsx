import Link from 'next/link'
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
  watchedPercentage?: number
}

const VideoButton = ({
  streamerInformation,
  vodInformation,
  noAvatar,
  isMinimal,
  watchedPercentage,
}: VideoButtonProps) => {
  const removedStreamers = process.env.NEXT_PUBLIC_REMOVED_STREAMERS
  if (
    streamerInformation?.name &&
    removedStreamers?.includes(streamerInformation.name)
  ) {
    return null
  }

  return (
    <S.VideoButtonContainer
      isMinimal={isMinimal}
      data-testid={vodInformation.id}
    >
      <Link
        href="/video/[vod]"
        as={`/video/${vodInformation.id}`}
        prefetch={false}
        passHref
      >
        <S.BoxLink as="a" tabIndex={0}>
          <S.VideoLength>
            <Typography variant="overline">
              {secondsToHM(vodInformation.duration)}
            </Typography>
          </S.VideoLength>
          <VideoThumbnail
            src={vodInformation.thumbnail}
            title={vodInformation.title}
            watchedPercentage={watchedPercentage}
          />
        </S.BoxLink>
      </Link>

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
