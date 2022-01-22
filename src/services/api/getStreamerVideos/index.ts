import { apiGQL } from '~/services/config'
import { IGQLTwitchVideo } from '~/@types/Twitch/gql/IGQLTwitchVideo'
import { twitchVideoQuery } from '~/lib/gql/twitchVideoQuery'

interface IGetStreamerVideos {
  id?: string
  streamerName?: string
  limit?: number
}

export const getStreamerVideos = async ({
  streamerName,
  limit = 16,
}: IGetStreamerVideos): Promise<IGQLTwitchVideo[] | null> => {
  try {
    const response = await apiGQL.post('', {
      query: `
        query {
          user(login: "${streamerName?.toString()}") {
            videos(first: ${limit}) {
              edges {
                node {
                  ${twitchVideoQuery}
                }
              }
            }
          }
        }
      `,
    })

    return (
      response?.data?.data?.user?.videos?.edges?.map(
        ({ node }: { node: IGQLTwitchVideo }) => node,
      ) ?? null
    )
  } catch (err) {
    return null
  }
}
