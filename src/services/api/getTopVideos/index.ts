import { IGQLTwitchVideo } from '~/@types/Twitch/gql/IGQLTwitchVideo'
import { twitchVideoQuery } from '~/lib/gql/twitchVideoQuery'
import { apiGQL } from '~/services/config'
import { IGetTopVideos } from './types'

export const getTopVideos = async ({
  limit = 10,
  language = 'EN',
}: IGetTopVideos): Promise<IGQLTwitchVideo[] | null> => {
  try {
    const response = await apiGQL.post('', {
      query: `
      query {
        videos(first: ${limit}, language: ${language.toUpperCase()}) {
          edges {
            node {
              ${twitchVideoQuery}
            }
          }
        }
      }
    `,
    })

    return (
      response?.data?.data?.videos?.edges?.map(
        ({ node }: { node: IGQLTwitchVideo }) => node,
      ) ?? null
    )
  } catch (err) {
    return null
  }
}
