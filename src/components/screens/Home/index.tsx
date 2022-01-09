import { Skeleton } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IVideo } from '~/@types/IVideo'
import AdsContainer from '~/components/atoms/AdsContainer'
import Box from '~/components/atoms/Box'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import { useHome } from './hooks'
import * as S from './styles'

interface HomeProps {
  videos: IVideo[]
}

const Home = ({ videos }: HomeProps) => {
  const { videosData, getNewVideos } = useHome(videos)

  return (
    <S.Container>
      <Box boxSize="100vw" alignItems="center">
        <div
          style={{
            width: '100%',
            height: '120px',
            borderRadius: '8px',
            margin: '0 auto',
          }}
        >
          <AdsContainer adslot="4593736619" />
        </div>
      </Box>
      <InfiniteScroll
        dataLength={videosData.length}
        next={getNewVideos}
        hasMore={videosData.length <= 500}
        loader={
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={'100%'}
            height={170}
          />
        }
        endMessage={null}
      >
        <VideoButtonGroup videos={videosData} />
      </InfiniteScroll>
    </S.Container>
  )
}

export default Home
