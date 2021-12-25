import { ITwitchVideo } from '~/@types/ITwitchVideo'
import api from '~/services/config'

export const getVideo = async (id: number | string) => {
  const response = await api.get<ITwitchVideo>(`/videos/${id}`)

  return response.data
}
