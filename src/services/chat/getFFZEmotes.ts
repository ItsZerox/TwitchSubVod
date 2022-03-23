import axios from 'axios'
import { toast } from 'react-toastify'
import { FFZ_EMOTE_API } from '~/constants/emotes'

interface ILoadFFZEmotes {
  code: string
  id: string
}

export const loadFFZEmotes = async (twitchId: string) => {
  try {
    const { data } = await axios.get(`${FFZ_EMOTE_API}/room/id/${twitchId}`)

    const allEmotes = data.sets[data.room.set].emoticons.map((emote: any) => {
      return {
        code: emote.name,
        id: emote.id,
      }
    })

    return allEmotes as ILoadFFZEmotes[]
  } catch {
    toast.error('Error loading FFZ emotes')
    return []
  }
}
