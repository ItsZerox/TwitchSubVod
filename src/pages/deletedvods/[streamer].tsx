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

export async function getStaticPaths() {
  return {
    paths: [{ params: { streamer: 'xqcow' } }],
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const streamer = context.params?.streamer as string

  if (!streamer) {
    return { notFound: true } as const
  }

  const range = 30

  const streamerVideos = await getDeletedVods(streamer, range)

  if (!streamerVideos.length) {
    return { notFound: true } as const
  }

  return {
    props: {
      videos: streamerVideos,
    },
    revalidate: revalidate.deletedVideos,
  }
}

const DeletedVodsPage: NextPage = ({
  videos,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!videos) {
    // todo: add better error handling
    return <div>Not found</div>
  }

  const video: IDeletedVods = videos[0]

  const seoTitle = video?.displayName || video?.name || ''

  const seoImage = video?.logo || ''

  const seoDescription = `Watch ${seoTitle}'s deleted VODs on pogu.live`

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
      <DeletedVods videos={videos} />
    </>
  )
}

export default DeletedVodsPage
