import { ISearchChannel } from '~/@types/ISearchChannel'
import { ITwitchSearchChannel } from '~/@types/ITwitchSearchChannel'

export const searchChannelsAdapter = (
  twitchSearchChannelData: ITwitchSearchChannel,
): ISearchChannel[] => {
  return twitchSearchChannelData.data.map((channel) => ({
    id: channel.id,
    name: channel.display_name,
    displayName: channel.display_name,
  }))
}
