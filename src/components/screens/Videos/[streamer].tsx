import { Skeleton } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IVideo } from '~/@types/IVideo'
import Box from '~/components/atoms/Box'
import ProfilePage from '~/components/templates/ProfilePage'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import { useVideos } from './hooks'

interface VideoProps {
  videos: IVideo[]
}

const Videos = ({ videos }: VideoProps) => {
  const { videosData, getNewVideos, streamerInformation, hasMore } =
    useVideos(videos)

  return (
    <ProfilePage streamerInformation={streamerInformation}>
      <Box flexDirection="column" gap="20px" alignItems="center">
        <InfiniteScroll
          dataLength={videosData.length}
          next={getNewVideos}
          hasMore={hasMore}
          loader={
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={'100%'}
              height={200}
            />
          }
          endMessage={null}
        >
          <VideoButtonGroup videos={videosData} />
        </InfiniteScroll>
      </Box>
    </ProfilePage>
  )
}

export default Videos
