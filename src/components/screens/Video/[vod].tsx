import dynamic from 'next/dynamic'
import { IVideo } from '~/@types/IVideo'
import Box from '~/components/atoms/Box'
import Button from '~/components/atoms/Button'
import StreamDescription from '~/components/molecules/StreamDescription'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import { useGlobal } from '~/contexts/GlobalContext'
import * as S from './styles'
import '@vime/core/themes/default.css'
import ShareButtons from '~/components/atoms/ShareButtons'
import AdsContainer from '~/components/atoms/AdsContainer'
import { toast } from 'react-toastify'
import { PlayerContainer } from '~/components/atoms/Player'
import Typography from '~/components/atoms/Typography'
import ChatBox from '~/components/molecules/ChatBox'
import { useState } from 'react'
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
  const [currentVideoTime, setCurrentVideoTime] = useState(0)

  return (
    <>
      <Box
        boxSize="100vw"
        alignItems="center"
        hideInMobile={true}
        hideInDesktop={false}
      >
        <div
          style={{
            width: '100%',
            height: '280px',
            borderRadius: '8px',
            margin: '0 auto',
          }}
        >
          <AdsContainer adslot="5175833696" />
        </div>
      </Box>

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
                key={video.vodInformation.id}
                url={`/api/get-video/${video.vodInformation.id}.m3u8`}
                poster={video.vodInformation.thumbnail}
                title={video.vodInformation.title || ''}
                streamerLogoUrl={video.streamerInformation.logo || ''}
                thumbnailUrl={video.vodInformation.thumbnail || ''}
                vodId={video.vodInformation.id}
                streamerName={
                  video.streamerInformation.displayName ||
                  video.streamerInformation.name ||
                  ''
                }
                notFoundText={texts.VIDEO_NOT_FOUND}
                setCurrentVideoTime={setCurrentVideoTime}
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
                hideInMobile={true}
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
            <Box hideInMobile={true}>
              <ShareButtons
                titleText={texts.SHARE_TEXT.replace(
                  '{{streamerName}}',
                  video.streamerInformation.displayName,
                )}
              />
            </Box>
          </Box>

          <Box flexDirection="column" gap="16px" hideInMobile={true}>
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
        <Box flexDirection="column" as="aside" gap="8px">
          <ChatBox
            currentVideoTime={currentVideoTime}
            streamerId={video.streamerInformation.id}
            streamerName={video.streamerInformation.name}
          />

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
    </>
  )
}

export default Video
