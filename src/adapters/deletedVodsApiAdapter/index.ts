import { IDeletedVodObject } from '~/@types/IDeletedVodObject'
import { IExternalDeletedVodsApi } from '~/@types/IExternalDeletedVodsApi'
import { directoriesAdapter } from '../directoriesAdapter'

export const deletedVodsApiAdapter = async (
  data: IExternalDeletedVodsApi[],
): Promise<IDeletedVodObject[]> => {
  return data.map((stream) => {
    const directories = directoriesAdapter(stream.gamesplayed)

    return {
      name: stream.channelurl,
      displayName: stream.channeldisplayname,
      logo: stream.channellogo,
      streamId: stream.streamId,
      streamDate: stream.startDateTime,
      length: stream.length,
      directories,
    }
  })
}
