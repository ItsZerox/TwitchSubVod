import axios from 'axios'
import { toast } from 'react-toastify'
import { ITwitchBadges } from '~/@types/ITwitchBadges'
import { TWITCH_BADGES_API } from '~/constants/emotes'

export const loadBadges = async (streamerId: string) => {
  try {
    const [{ data: globalBadges }, { data: channelBadges }] = await Promise.all(
      [
        axios.get<ITwitchBadges>(
          `${TWITCH_BADGES_API}/global/display?language=en`,
        ),
        axios.get<ITwitchBadges>(
          `${TWITCH_BADGES_API}/channels/${streamerId}/display`,
        ),
      ],
    )

    const allBadges = {
      ...globalBadges.badge_sets,
      ...channelBadges.badge_sets,
    }

    return allBadges
  } catch {
    toast.error('Error loading FFZ emotes')
    return null
  }
}
