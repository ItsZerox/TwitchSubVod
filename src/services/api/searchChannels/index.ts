import { ITwitchSearchChannel } from '~/@types/ITwitchSearchChannel'
import { apiV6 } from '~/services/config'

export const searchChannels = async (streamerName: string, first?: number) => {
  const response = await apiV6.get<ITwitchSearchChannel>('/search/channels', {
    params: {
      query: streamerName,
      first: first || 3,
    },
  })

  return response.data
}
