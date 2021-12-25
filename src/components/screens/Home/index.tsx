import { IVideos } from '~/@types/IVideos'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import * as S from './styles'

interface HomeProps {
  videos: IVideos[]
}

const Home = ({ videos }: HomeProps) => {
  return (
    <S.Container>
      <VideoButtonGroup videos={videos} />
    </S.Container>
  )
}

export default Home
