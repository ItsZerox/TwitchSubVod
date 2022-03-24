import { useCallback, useMemo } from 'react'
import { Fragment } from '~/@types/ITwitchVideoComment'
import { IComment } from '~/adapters/commentsAdapter'
import { TWITCH_CDN } from '~/constants/emotes'
import * as S from './styles'

interface IUseChatMessage {
  comment: IComment
}

export const useChatMessage = ({ comment }: IUseChatMessage) => {
  const formatMessage = useCallback(
    (fragments: Fragment[]) => {
      const fullMessage = fragments.map((fragment, index) => {
        if (fragment?.emoticon) {
          return (
            <S.Emote
              key={comment._id + index}
              src={`${TWITCH_CDN}/emoticons/v2/${fragment.emoticon.emoticon_id}/default/dark/1.0`}
            />
          )
        }

        // emoteless chat WutFace
        return fragment.text
      })

      return fullMessage
    },
    [comment._id, TWITCH_CDN],
  )

  const formattedMessage = useMemo(
    () => formatMessage(comment.fragments),
    [comment.fragments],
  )

  return {
    formattedMessage,
  }
}
