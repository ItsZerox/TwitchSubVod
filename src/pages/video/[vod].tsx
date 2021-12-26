import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { videoAdapter } from '~/adapters/videoAdapter'
import Video from '~/components/screens/Video/[vod]'
import revalidate from '~/constants/revalidate'
import { getTopVideos } from '~/services/api/getTopVideos'
import { getVideo } from '~/services/api/getVideo'

export async function getStaticPaths() {
  return {
    paths: [{ params: { vod: '1238157665' } }],
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (!context.params?.vod) {
    return {
      props: {
        video: null,
        relatedVideos: [],
      },
      notFound: true,
    }
  }

  const [videoData, relatedVideosData] = await Promise.all([
    getVideo(context.params.vod as string),
    getTopVideos({
      language: context.locale,
      limit: 32,
    }),
  ])

  const video = videoAdapter(videoData)

  const relatedVideos = relatedVideosData.vods.map(videoAdapter)

  return {
    props: {
      video,
      relatedVideos,
    },
    revalidate: revalidate.video,
  }
}

const VideoPage = ({
  video,
  relatedVideos,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!video || !relatedVideos.length) {
    return null
  }

  return <Video video={video} relatedVideos={relatedVideos} />
}

export default VideoPage
