import { ITwitchChannelVideo } from '~/@types/ITwitchChannelVideo'
import { ITwitchUser } from '~/@types/ITwitchUser'
import api from '~/services/config'

interface IGetStreamerVideos {
  id?: string
  streamerName?: string
  limit?: number
  offset?: number
  sort?: string
  language?: string[]
  broadcast_type?: string[]
}

export const getStreamerVideos = async ({
  id,
  streamerName,
  limit = 16,
  offset = 0,
  sort,
  language,
  broadcast_type,
}: IGetStreamerVideos) => {
  let _id = id

  try {
    if (!id) {
      const { data } = await api.get<ITwitchUser>('/users', {
        params: { login: streamerName },
      })

      _id = data.users[0]._id
    }

    const response = await api.get<ITwitchChannelVideo>(
      `/channels/${_id}/videos`,
      {
        params: {
          limit,
          offset,
          sort,
          language,
          broadcast_type,
        },
      },
    )

    return response.data
  } catch (err) {
    console.log(err)
  }
}
