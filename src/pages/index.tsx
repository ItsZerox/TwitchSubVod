import { InferGetStaticPropsType, NextPage, GetStaticPropsContext } from 'next'
import { topVideosAdapter } from '~/adapters/topVideosAdapter'
import HomePage from '~/components/screens/Home'
import revalidate from '~/constants/revalidate'
import { getTopVideos } from '~/services/api/getTopVideos'

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const topVideos = await getTopVideos({
    language: context.locale,
    limit: 30,
  })

  const videos = topVideosAdapter(topVideos)

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
