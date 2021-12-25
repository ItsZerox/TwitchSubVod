import { InferGetStaticPropsType, NextPage, GetStaticPropsContext } from 'next'
import { videoAdapter } from '~/adapters/videoAdapter'
import HomePage from '~/components/screens/Home'
import revalidate from '~/constants/revalidate'
import { getTopVideos } from '~/services/api/getTopVideos'

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const topVideos = await getTopVideos({
    language: context.locale,
    limit: 30,
  })

  const videos = topVideos.vods.map(videoAdapter)

  return {
    props: {
      videos,
    },
    revalidate: revalidate.home,
  }
}

const Home = ({ videos }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <HomePage videos={videos} />
}

export default Home
