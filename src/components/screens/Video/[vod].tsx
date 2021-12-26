import { IVideo } from '~/@types/IVideo'
import Box from '~/components/atoms/Box'
import Button from '~/components/atoms/Button'
import StreamDescription from '~/components/molecules/StreamDescription'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import { useGlobal } from '~/contexts/GlobalContext'
import * as S from './styles'

interface VideoProps {
  video: IVideo
  relatedVideos: IVideo[]
}

const Video = ({ video, relatedVideos }: VideoProps) => {
  const { texts } = useGlobal()

  return (
    <S.Container>
      <Box flexDirection="column" gap="64px">
        <Box flexDirection="column" gap="16px">
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              paddingTop: '56.25%',
              background: '#000',
              borderRadius: '8px',
            }}
          />
          <Box gap="16px" justifyContent="space-between">
            <StreamDescription
              streamerInformation={video.streamerInformation}
              vodInformation={video.vodInformation}
              lineLimit={1}
              avatarWidth="64px"
            />
            <Box gap="8px">
              <Button variant="secondary" text={texts.FOLLOW} />
              <Button variant="primary" text={texts.DOWNLOAD} />
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
