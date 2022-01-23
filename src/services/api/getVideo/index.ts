import { IGQLTwitchVideo } from '~/@types/Twitch/gql/IGQLTwitchVideo'
import { twitchVideoQuery } from '~/lib/gql/twitchVideoQuery'
import { apiGQL } from '~/services/config'

export const getVideo = async (id: number | string) => {
  try {
    const response = await apiGQL.post('', {
      query: `
      query {
        video(id: ${id.toString()}) {
          ${twitchVideoQuery}
        }
      }
    `,
    })

    return response.data.data.video as IGQLTwitchVideo
  } catch (err) {
    return null
  }
}
