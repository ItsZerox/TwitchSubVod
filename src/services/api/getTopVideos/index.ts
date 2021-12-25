import api from '~/services/config'
import { IGetTopVideos, ITwitchTopVideos } from './types'

export const getTopVideos = async ({
  limit = 10,
  offset = 0,
  game = '',
  period = 'week',
  language = '',
  sort = 'views',
}: IGetTopVideos) => {
  const query = {
    limit,
    offset,
    game,
    period,
    language,
    sort,
  }

  const response = await api.get<ITwitchTopVideos>('/videos/top', {
    params: query,
  })

  return response.data
}
