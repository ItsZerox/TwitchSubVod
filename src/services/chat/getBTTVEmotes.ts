import axios from 'axios'
import { toast } from 'react-toastify'
import { BTTV_EMOTE_API } from '~/constants/emotes'

export const loadBTTVEmotes = async (twitchId: string) => {
  try {
    const { data } = await axios.get(
      `${BTTV_EMOTE_API}/cached/users/twitch/${twitchId}`,
    )

    const allEmotes = [...data?.sharedEmotes, ...data?.channelEmotes]

    return allEmotes
  } catch {
    toast.error('Error loading BTTV emotes')
  }
}
