import { IVideo } from '~/@types/IVideo'
import Box from '~/components/atoms/Box'
import Button from '~/components/atoms/Button'
import StreamDescription from '~/components/molecules/StreamDescription'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import { useGlobal } from '~/contexts/GlobalContext'
import * as S from './styles'
import '@vime/core/themes/default.css'
import dynamic from 'next/dynamic'
const Player = dynamic(() => import('~/components/atoms/Player'), {
  ssr: false,
  loading: () => <div>...</div>,
})

const PlayerContainer = dynamic(
  // @ts-ignore
  () =>
    import('~/components/atoms/Player').then(
      (player) => player.PlayerContainer,
    ),
  {
    ssr: false,
  },
)

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
        _mobileProps={{
          gap: '32px',
        }}
      >
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
              />
              <Button
                variant="primary"
                text={texts.DOWNLOAD}
                _mobileProps={{
                  buttonWidth: '100%',
                }}
              />
            </Box>
          </Box>
        </Box>
        <VideoButtonGroup
          videos={relatedVideos.slice(-16)}
          minVideoWidth="300px"
        />
      </Box>
      <Box flexDirection="column">
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '250px',
            paddingTop: '56.25%',
            background: '#000',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        />
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
