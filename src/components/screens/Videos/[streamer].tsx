import { IVideo } from '~/@types/IVideo'
import Box from '~/components/atoms/Box'
import ProfilePage from '~/components/templates/ProfilePage'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'

interface VideoProps {
  videos: IVideo[]
}

const Videos = ({ videos }: VideoProps) => {
  const streamerInformation = videos[0].streamerInformation

  return (
    <ProfilePage streamerInformation={streamerInformation}>
      <Box flexDirection="column" gap="20px" alignItems="center">
        <VideoButtonGroup videos={videos} />
      </Box>
    </ProfilePage>
  )
}

export default Videos
