import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { IVideo } from '~/@types/IVideo'
import { videoAdapter } from '~/adapters/videoAdapter'
import SearchIndicator from '~/components/molecules/SearchIndicator'
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
    return {
      redirect: {
        destination: `/deletedvods/${streamer}`,
        permanent: false,
      },
    }
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
    return (
      <SearchIndicator
        streamerName={
          typeof window !== 'undefined'
            ? window.location.pathname.split('/')[2]
            : ''
        }
      />
    )
  }

  const video: IVideo = videos[0]

  const seoTitle =
    video?.streamerInformation?.displayName ||
    video?.streamerInformation?.name ||
    ''

  const seoImage = video?.streamerInformation?.logo || ''

  const seoDescription = `Watch ${seoTitle}'s sub-only VODs on pogu.live for free`

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
      <Videos videos={videos} />
    </>
  )
}

export default VideosPage
