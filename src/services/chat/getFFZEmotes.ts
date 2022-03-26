import axios from 'axios'
import { toast } from 'react-toastify'
import { ILoadEmotes } from '~/@types/ILoadEmotes'
import { FFZ_EMOTE_API } from '~/constants/emotes'

export const loadFFZEmotes = async (twitchId: string) => {
  try {
    const { data } = await axios.get(`${FFZ_EMOTE_API}/room/id/${twitchId}`)

    const allEmotes = data.sets[data.room.set].emoticons.map((emote: any) => {
      return {
        code: emote.name,
        id: emote.id,
      }
    })

    return allEmotes as ILoadEmotes[]
  } catch {
    return []
  }
}
