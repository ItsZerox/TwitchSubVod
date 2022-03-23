import axios from 'axios'
import { toast } from 'react-toastify'
import { SEVENTV_EMOTE_API } from '~/constants/emotes'

interface ILoad7TVEmotes {
  code: string
  id: string
}

export const load7TVEmotes = async (streamerName: string) => {
  try {
    const { data } = await axios.get(
      `${SEVENTV_EMOTE_API}/users/${streamerName}/emotes`,
    )

    const allEmotes = data.map((emote: any) => {
      return {
        code: emote.name,
        id: emote.id,
      }
    })

    return allEmotes as ILoad7TVEmotes[]
  } catch {
    toast.error('Error loading 7TV emotes')
    return []
  }
}
