import { IExternalDeletedVodsApi } from '~/@types/IExternalDeletedVodsApi'
import { playedGamesAdapter } from '../playedGamesAdapter'

export const deletedVodsApiAdapter = async (
  data: IExternalDeletedVodsApi[],
) => {
  return data.map((stream) => {
    const playedGames = playedGamesAdapter(stream.gamesplayed)

    return {
      name: stream.channelurl,
      displayName: stream.channeldisplayname,
      logo: stream.channellogo,
      streamId: stream.streamId,
      streamDate: stream.startDateTime,
      streamLengthInMinutes: stream.length,
      playedGames,
    }
  })
}
