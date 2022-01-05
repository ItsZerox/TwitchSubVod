import { IVideo } from '~/@types/IVideo'
import { AdsContainer } from '~/components/atoms/AdsContainer'
import VideoButtonGroup from '~/components/templates/VideoButtonGroup'
import * as S from './styles'

interface HomeProps {
  videos: IVideo[]
}

const Home = ({ videos }: HomeProps) => {
  return (
    <S.Container>
      <AdsContainer adslot="4593736619" />
      <VideoButtonGroup videos={videos} />
    </S.Container>
  )
}

export default Home
