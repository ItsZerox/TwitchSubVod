import { IVideo } from '~/@types/IVideo'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import * as S from './styles'

interface HomeProps {
  videos: IVideo[]
}

const Home = ({ videos }: HomeProps) => {
  return (
    <S.Container>
      <VideoButtonGroup videos={videos} />
    </S.Container>
  )
}

export default Home
