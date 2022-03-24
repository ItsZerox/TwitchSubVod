import axios from 'axios'
import { toast } from 'react-toastify'
import { ILoadEmotes } from '~/@types/ILoadEmotes'
import { BTTV_EMOTE_API } from '~/constants/emotes'

export const loadBTTVEmotes = async (twitchId: string) => {
  try {
    const [{ data: streamerData }, { data: globalData }] = await Promise.all([
      axios.get(`${BTTV_EMOTE_API}/cached/users/twitch/${twitchId}`),
      axios.get(`${BTTV_EMOTE_API}/cached/emotes/global`),
    ])

    const allEmotes = [
      ...streamerData?.sharedEmotes,
      ...streamerData?.channelEmotes,
      ...globalData,
    ]

    return allEmotes as ILoadEmotes[]
  } catch {
    toast.error('Error loading BTTV emotes')
    return []
  }
}
