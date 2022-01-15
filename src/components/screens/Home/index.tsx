import { Skeleton } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IVideo } from '~/@types/IVideo'
import AdsContainer from '~/components/atoms/AdsContainer'
import Box from '~/components/atoms/Box'
import Typography from '~/components/atoms/Typography'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import WatchedVideoButtonGroup from '~/components/templates/WatchedVideoButtonGroup'
import { useHome } from './hooks'
import * as S from './styles'

interface HomeProps {
  videos: IVideo[]
}

const Home = ({ videos }: HomeProps) => {
  const { videosData, getNewVideos, texts, watchedVideosData } = useHome(videos)

  return (
    <S.Container>
      <Box boxSize="100vw" alignItems="center">
        <div
          style={{
            width: '100%',
            height: '280px',
            borderRadius: '8px',
            margin: '0 auto',
          }}
        >
          <AdsContainer adslot="4593736619" />
        </div>
      </Box>

      {watchedVideosData?.length && (
        <>
          <Box alignItems="flex-start" boxSize="100%">
            <Typography variant="h4" as="h1">
              {texts.YOUR_LAST_WATCHED_VODS}
            </Typography>
          </Box>
          <WatchedVideoButtonGroup videos={watchedVideosData} />
        </>
      )}

      <Box alignItems="flex-start" boxSize="100%">
        <Typography variant="h4" as="h1">
          {texts.MOST_POPULAR_VODS_TODAY}
        </Typography>
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
