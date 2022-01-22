import { Skeleton } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IVideo } from '~/@types/IVideo'
import Box from '~/components/atoms/Box'
import RemovedUser from '~/components/atoms/RemovedUser'
import ProfilePage from '~/components/templates/ProfilePage'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import { useVideos } from './hooks'

interface VideoProps {
  videos: IVideo[]
  isUserRemoved: boolean
}

const Videos = ({ videos, isUserRemoved }: VideoProps) => {
  const { videosData, getNewVideos, streamerInformation, hasMore } =
    useVideos(videos)

  return (
    <ProfilePage
      streamerInformation={streamerInformation}
      key={videos[0]?.streamerInformation.name || Math.random()}
    >
      <Box flexDirection="column" gap="20px" alignItems="center">
        {isUserRemoved ? (
          <RemovedUser />
        ) : (
          <VideoButtonGroup videos={videosData} />
        )}
      </Box>
    </ProfilePage>
  )
}

export default Videos
