import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { IVideo } from '~/@types/IVideo'
import { videoAdapter } from '~/adapters/videoAdapter'
import SearchIndicator from '~/components/molecules/SearchIndicator'
import Videos from '~/components/screens/Videos/[streamer]'
import revalidate from '~/constants/revalidate'
import handleRemovedUser from '~/lib/handleRemovedUser'
import { getStreamerVideos } from '~/services/api/getStreamerVideos'

export async function getStaticPaths() {
  return {
    paths: [{ params: { streamer: 'xqcow' } }],
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const streamer = context.params?.streamer as string

  const removedUser = handleRemovedUser(streamer)

  if (!removedUser.continue) {
    return removedUser
  }

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
      isUserRemoved: false,
    },
    revalidate: revalidate.videos,
  }
}

const VideosPage = ({
  videos,
  isUserRemoved,
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

  const streamerName =
    video?.streamerInformation?.displayName ||
    video?.streamerInformation?.name ||
    ''

  const seoImage = video?.streamerInformation?.logo || ''

  const seoTitle = `${streamerName}'s sub-only VODs | pogu.live`
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
              alt: `${streamerName} on pogu.live`,
            },
          ],
        }}
      />
      <Videos videos={videos} isUserRemoved={isUserRemoved} />
    </>
  )
}

export default VideosPage
