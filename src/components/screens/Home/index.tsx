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
  const { videosData, texts, watchedVideosData } = useHome(videos)

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

      {watchedVideosData?.length ? (
        <>
          <Box alignItems="flex-start" boxSize="100%">
            <Typography variant="h4" as="h1">
              {texts.YOUR_LAST_WATCHED_VODS}
            </Typography>
          </Box>
          <WatchedVideoButtonGroup videos={watchedVideosData} />
        </>
      ) : null}

      <Box alignItems="flex-start" boxSize="100%">
        <Typography variant="h4" as="h1">
          {texts.MOST_POPULAR_VODS_TODAY}
        </Typography>
      </Box>
      <VideoButtonGroup videos={videosData} />
    </S.Container>
  )
}

export default Home
