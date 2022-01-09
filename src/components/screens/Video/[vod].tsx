import { IVideo } from '~/@types/IVideo'
import Box from '~/components/atoms/Box'
import Button from '~/components/atoms/Button'
import StreamDescription from '~/components/molecules/StreamDescription'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import { useGlobal } from '~/contexts/GlobalContext'
import * as S from './styles'
import '@vime/core/themes/default.css'
import dynamic from 'next/dynamic'
import ShareButtons from '~/components/atoms/ShareButtons'
import AdsContainer from '~/components/atoms/AdsContainer'
import { toast } from 'react-toastify'
import { PlayerContainer } from '~/components/atoms/Player'
import Typography from '~/components/atoms/Typography'
const Player = dynamic(() => import('~/components/atoms/Player'), {
  ssr: false,
  loading: () => <div>...</div>,
})

interface VideoProps {
  video: IVideo
  relatedVideos: IVideo[]
}

const Video = ({ video, relatedVideos }: VideoProps) => {
  const { texts } = useGlobal()

  return (
    <S.Container>
      <Box
        flexDirection="column"
        gap="64px"
        as="main"
        _mobileProps={{
          gap: '32px',
        }}
      >
        <Box hideInMobile={false} hideInDesktop={true}>
          <div
            style={{
              width: '100%',
              height: '120px',
              borderRadius: '8px',
            }}
          >
            <AdsContainer adslot="5906818280" />
          </div>
        </Box>

        <Box flexDirection="column" gap="16px">
          <PlayerContainer>
            <Player
              url={`/api/get-video/${video.vodInformation.id}.m3u8`}
              poster={video.vodInformation.thumbnail}
            />
          </PlayerContainer>
          <Box
            gap="16px"
            justifyContent="space-between"
            _mobileProps={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              boxSize: '100%',
            }}
          >
            <StreamDescription
              streamerInformation={video.streamerInformation}
              vodInformation={video.vodInformation}
              lineLimit={1}
              avatarWidth="64px"
            />
            <Box
              gap="8px"
              _mobileProps={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxSize: '100%',
              }}
            >
              <Button
                variant="secondary"
                text={texts.FOLLOW}
                _mobileProps={{
                  buttonWidth: '100%',
                }}
                onClick={() => toast(texts.IN_DEVELOPMENT_MESSAGE)}
              />
              <Button
                variant="primary"
                text={texts.DOWNLOAD}
                _mobileProps={{
                  buttonWidth: '100%',
                }}
                onClick={() => toast(texts.IN_DEVELOPMENT_MESSAGE)}
              />
            </Box>
          </Box>
          <ShareButtons
            titleText={texts.SHARE_TEXT.replace(
              '{{streamerName}}',
              video.streamerInformation.displayName,
            )}
          />
        </Box>
        <Box flexDirection="column" gap="16px">
          <Typography variant="h5">
            {texts.OTHER_VIDEOS_OF_STREAMER.replace(
              '{{streamerName}}',
              video.streamerInformation.displayName ||
                video.streamerInformation.name,
            )}
          </Typography>
          <VideoButtonGroup
            videos={relatedVideos.slice(-16).reverse()}
            minVideoWidth="300px"
          />
        </Box>
      </Box>
      <Box flexDirection="column" as="aside">
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '250px',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        >
          <AdsContainer adslot="8461022959" />
        </div>

        <VideoButtonGroup
          videos={relatedVideos.reverse().slice(16)}
          minVideoWidth="300px"
          isMinimal={true}
        />
      </Box>
    </S.Container>
  )
}

export default Video
