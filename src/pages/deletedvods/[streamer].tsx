import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import { NextSeo } from 'next-seo'
import DeletedVods from '~/components/screens/DeletedVods/[streamer]'
import revalidate from '~/constants/revalidate'
import { getDeletedVods } from '~/lib/getDeletedVods'
import { IDeletedVods } from '~/@types/IDeletedVods'
import SearchIndicator from '~/components/molecules/SearchIndicator'
import handleRemovedUser from '~/lib/handleRemovedUser'

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

  if (!streamer) {
    return { notFound: true } as const
  }

  const limit = 30
  const offset = 0

  try {
    const streamerVideos = await getDeletedVods({
      username: streamer,
      limit,
      offset,
    })

    return {
      props: {
        videos: streamerVideos,
      },
      revalidate: revalidate.deletedVideos,
    }
  } catch (err) {
    console.log(err)
    return { notFound: true } as const
  }
}

const DeletedVodsPage = ({
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

  const video: IDeletedVods = videos[0]

  const seoImage = video?.logo || ''

  const streamerName = video?.displayName || video?.name || ''

  const seoTitle = `${streamerName}'s deleted VODs | pogu.live`

  const seoDescription = `Watch ${streamerName}'s deleted VODs on pogu.live for free. ${streamerName} is a Twitch streamer and you can watch their deleted videos here.`

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
      <DeletedVods videos={videos} isUserRemoved={isUserRemoved} />
    </>
  )
}

export default DeletedVodsPage
