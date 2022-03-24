import axios from 'axios'
import { ILoadEmotes } from '~/@types/ILoadEmotes'
import { SEVENTV_EMOTE_API } from '~/constants/emotes'

export const load7TVEmotes = async (streamerName: string) => {
  try {
    const [{ data: streamerEmotes }, { data: globalEmotes }] =
      await Promise.all([
        axios.get(`${SEVENTV_EMOTE_API}/users/${streamerName}/emotes`),
        axios.get(`${SEVENTV_EMOTE_API}/emotes/global`),
      ])

    const allEmotes = [...streamerEmotes, ...globalEmotes].map((emote: any) => {
      return {
        code: emote?.name,
        id: emote?.id,
      }
    })

    return allEmotes as ILoadEmotes[]
  } catch {
    return []
  }
}
