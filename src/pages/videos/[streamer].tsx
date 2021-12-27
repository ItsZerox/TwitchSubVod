import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { videoAdapter } from '~/adapters/videoAdapter'
import Videos from '~/components/screens/Videos/[streamer]'
import revalidate from '~/constants/revalidate'
import { getStreamerVideos } from '~/services/api/getStreamerVideos'

export async function getStaticPaths() {
  return {
    paths: [{ params: { streamer: 'xqcow' } }],
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const streamer = context.params?.streamer as string

  const streamerVideos = await getStreamerVideos({
    streamerName: streamer,
    limit: 32,
  })

  if (!streamerVideos) {
    return { props: { videos: [] }, notFound: true }
  }

  const videos = streamerVideos?.videos.map(videoAdapter)

  return {
    props: {
      videos,
    },
    revalidate: revalidate.videos,
  }
}

const VideosPage = ({
  videos,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!videos) {
    return <div>No videos found</div>
  }

  return <Videos videos={videos} />
}

export default VideosPage
