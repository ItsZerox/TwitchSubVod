import axios from 'axios'
import { toast } from 'react-toastify'
import { ILoadEmotes } from '~/@types/ILoadEmotes'
import { SEVENTV_EMOTE_API } from '~/constants/emotes'

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

    return allEmotes as ILoadEmotes[]
  } catch {
    toast.error('Error loading 7TV emotes')
    return []
  }
}
