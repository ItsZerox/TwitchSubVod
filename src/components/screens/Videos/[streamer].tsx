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
  const { videosData, getNewVideos, streamerInformation } = useVideos(videos)

  return (
    <ProfilePage streamerInformation={streamerInformation}>
      <Box flexDirection="column" gap="20px" alignItems="center">
        <InfiniteScroll
          dataLength={videosData.length}
          next={getNewVideos}
          hasMore={videosData.length <= 500}
          loader={<h3> Loading...</h3>}
          endMessage={<h4>Nothing more to show</h4>}
        >
          <VideoButtonGroup videos={videosData} />
        </InfiniteScroll>
      </Box>
    </ProfilePage>
  )
}

export default Videos
