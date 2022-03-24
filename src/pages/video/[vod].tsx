import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { IVideo } from '~/@types/IVideo'
import { videoAdapter } from '~/adapters/videoAdapter'
import Video from '~/components/screens/Video/[vod]'
import revalidate from '~/constants/revalidate'
import connectDB from '~/lib/mongodb/mongodbConnect'
import deletedVodsV2 from '~/lib/mongodb/models/deletedVodsV2'
import { getVideo } from '~/services/api/getVideo'
import { getStreamerVideos } from '~/services/api/getStreamerVideos'
import { IDeletedVodSchema } from '~/@types/DeletedVodSchema'

export async function getStaticPaths() {
  return {
    paths: [{ params: { vod: '1238157665' } }],
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const isNotNumber = Number.isNaN(Number(context?.params?.vod as string))

  if (!context.params?.vod || isNotNumber) {
    return {
      notFound: true,
    } as const
  }

  const videoData = await getVideo(context.params.vod as string)

  if (!videoData) {
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
        id: deletedVodData.name,
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

    const otherStreamerVideos = await getStreamerVideos({
      streamerName: deletedVodData.name,
      limit: 32,
    })

    const relatedVideos = otherStreamerVideos?.map(videoAdapter) || []

    return {
      props: {
        video,
        relatedVideos,
        isDeleted: true,
      },
    }
  }

  const video: IVideo = videoAdapter(videoData)

  const otherStreamerVideos = await getStreamerVideos({
    streamerName: videoData?.owner.login,
    limit: 32,
  })

  const relatedVideos = otherStreamerVideos?.map(videoAdapter) || []

  return {
    props: {
      video,
      relatedVideos,
      isDeleted: false,
    },
    revalidate: revalidate.video,
  }
}

const VideoPage = ({
  video,
  relatedVideos,
  isDeleted,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!video) {
    return null
  }

  const streamerName =
    video?.streamerInformation?.displayName ||
    video?.streamerInformation?.name ||
    ''

  const seoImage =
    video?.vodInformation?.thumbnail || video.streamerInformation.logo || ''

  const seoTitle = video?.vodInformation?.title
    ? `${video?.vodInformation?.title} | ${streamerName} | pogu.live`
    : `${streamerName}'s deleted VODs | pogu.live`

  const seoDescription = `Watch ${streamerName}'s sub-only VODs on pogu.live for free. ${streamerName} is a Twitch streamer and you can watch their sub only videos here. | ${
    video?.streamerInformation?.description || ''
  }`

  return (
    <>
      <NextSeo
        title={seoTitle}
        description={seoDescription}
        openGraph={{
          title: seoTitle,
          description: seoDescription,
          images: [
            {
              url: seoImage,
              alt: seoTitle,
            },
          ],
        }}
      />
      <Video
        video={video}
        relatedVideos={relatedVideos}
        isDeleted={isDeleted}
      />
    </>
  )
}

export default VideoPage
