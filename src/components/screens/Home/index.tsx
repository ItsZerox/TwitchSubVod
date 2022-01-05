import { IVideo } from '~/@types/IVideo'
import AdsContainer from '~/components/atoms/AdsContainer'
import Box from '~/components/atoms/Box'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import * as S from './styles'

interface HomeProps {
  videos: IVideo[]
}

const Home = ({ videos }: HomeProps) => {
  return (
    <S.Container>
      <Box>
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
      <VideoButtonGroup videos={videos} />
    </S.Container>
  )
}

export default Home
