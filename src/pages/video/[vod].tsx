import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { IVideo } from '~/@types/IVideo'
import { videoAdapter } from '~/adapters/videoAdapter'
import Video from '~/components/screens/Video/[vod]'
import revalidate from '~/constants/revalidate'
import connectDB from '~/lib/mongodb/mongodbConnect'
import deletedVodsV2 from '~/lib/mongodb/models/deletedVodsV2'
import { getTopVideos } from '~/services/api/getTopVideos'
import { getVideo } from '~/services/api/getVideo'
import { IDeletedVodSchema } from '~/@types/DeletedVodSchema'

export async function getStaticPaths() {
  return {
    paths: [{ params: { vod: '1238157665' } }],
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  if (!context.params?.vod) {
    return {
      notFound: true,
    } as const
  }

  const [videoData, relatedVideosData] = await Promise.all([
    getVideo(context.params.vod as string),
    getTopVideos({
      language: context.locale,
      limit: 32,
    }),
  ]).catch(() => [null, null])

  if (!videoData || !relatedVideosData) {
    await connectDB()
    const deletedVodData: IDeletedVodSchema = await deletedVodsV2.findOne({
      streamId: context.params.vod as string,
    })

    if (!deletedVodData) {
      return {
        notFound: true,
      } as const
    }

    const video: IVideo = {
      streamerInformation: {
        name: deletedVodData.name,
        displayName: deletedVodData.displayName,
        logo: deletedVodData.logo,
        description: '',
        followers: 0,
      },
      vodInformation: {
        id: deletedVodData.streamId.toString(),
        date: deletedVodData.streamDate,
        duration: 1,
        thumbnail: '',
        title: '',
        viewCount: 0,
      },
    }

    // todo: have better error handling than requesting data again https://youtu.be/d77uAqi2Ij0?t=18
    const newRelatedVideosData = await getTopVideos({
      language: context.locale,
      limit: 32,
    })

    const relatedVideos: IVideo[] = newRelatedVideosData.vods.map(videoAdapter)

    return {
      props: {
        video,
        relatedVideos: relatedVideos,
      },
    }
  }

  const video: IVideo = videoAdapter(videoData)

  const relatedVideos: IVideo[] = relatedVideosData.vods.map(videoAdapter)

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

  const seoTitle =
    video?.streamerInformation?.displayName ||
    video?.streamerInformation?.name ||
    ''

  const seoImage =
    video?.vodInformation?.thumbnail || video.streamerInformation.logo || ''

  const seoDescription =
    video?.vodInformation?.title ||
    `Watch this video of ${seoTitle} on pogu.live`

  return (
    <>
      <NextSeo
        title={`${seoTitle} | pogu.live`}
        description={`Watch this vod of ${seoTitle} on pogu.live`}
        openGraph={{
          title: `${seoTitle} | pogu.live`,
          description: seoDescription,
          images: [
            {
              url: seoImage,
              alt: `${seoTitle} | pogu.live`,
            },
          ],
        }}
      />
      <Video video={video} relatedVideos={relatedVideos} />
    </>
  )
}

export default VideoPage
