import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Box from '~/components/atoms/Box'
import ProfilePage from '~/components/templates/ProfilePage'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import { mockedStreamerInformation, videos } from './_mockedData'

const Videos: NextPage = () => {
  const router = useRouter()

  console.log(router)

  return (
    <ProfilePage streamerInformation={mockedStreamerInformation}>
      <Box flexDirection="column" gap="20px" alignItems="center">
        <VideoButtonGroup videos={videos} />
        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: '728px',
            height: '90px',
            background: '#000',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        />
        <VideoButtonGroup videos={videos} />
      </Box>
    </ProfilePage>
  )
}

export default Videos
