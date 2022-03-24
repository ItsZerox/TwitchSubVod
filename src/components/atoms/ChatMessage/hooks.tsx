import { useCallback, useMemo } from 'react'
import { Fragment } from '~/@types/ITwitchVideoComment'
import { IComment } from '~/adapters/commentsAdapter'
import {
  BTTV_EMOTE_CDN,
  FFZ_EMOTE_CDN,
  SEVENTV_EMOTE_CDN,
  TWITCH_CDN,
} from '~/constants/emotes'
import { useGlobal } from '~/contexts/GlobalContext'
import * as S from './styles'

interface IUseChatMessage {
  comment: IComment
}

export const useChatMessage = ({ comment }: IUseChatMessage) => {
  const { emotes, badges } = useGlobal()

  const formatMessage = useCallback(
    (fragments: Fragment[]) => {
      const fullMessage = fragments.map((fragment, index) => {
        if (fragment?.emoticon) {
          return (
            <S.Emote
              key={comment._id + index}
              src={`${TWITCH_CDN}/emoticons/v2/${fragment.emoticon.emoticon_id}/default/dark/1.0`}
              title={fragment.text}
            />
          )
        }

        const thirdPartyEmote = fragment.text
          .split(' ')
          .map((text, textIndex) => {
            const ffzEmote = emotes.ffzEmotes.find(
              (emote) => emote.code === text,
            )

            if (ffzEmote) {
              return (
                <S.Emote
                  key={ffzEmote.id + textIndex}
                  src={`${FFZ_EMOTE_CDN}/${ffzEmote.id}/1`}
                  title={ffzEmote.code}
                />
              )
            }

            const bttvEmote = emotes.bttvEmotes.find(
              (emote) => emote.code === text,
            )

            if (bttvEmote) {
              return (
                <S.Emote
                  key={bttvEmote.id + textIndex}
                  src={`${BTTV_EMOTE_CDN}/${bttvEmote.id}/1x`}
                  title={bttvEmote.code}
                />
              )
            }

            const sevenTvEmote = emotes.sevenTvEmotes.find(
              (emote) => emote.code === text,
            )

            if (sevenTvEmote) {
              return (
                <S.Emote
                  key={sevenTvEmote.id + textIndex}
                  src={`${SEVENTV_EMOTE_CDN}/${sevenTvEmote.id}/1x`}
                  title={sevenTvEmote.code}
                />
              )
            }

            return ' ' + text + ' '
          })

        // emoteless chat WutFace
        return <>{thirdPartyEmote}</>
      })

      return fullMessage
    },
    [comment._id, emotes.bttvEmotes, emotes.ffzEmotes, emotes.sevenTvEmotes],
  )

  const formattedMessage = useMemo(
    () => formatMessage(comment.fragments),
    [comment.fragments, formatMessage],
  )

  const formattedBadges = useMemo(
    () =>
      comment?.badges?.map((badge) => {
        const localBadgeImage =
          badges?.[badge._id].versions[Number(badge.version) || 0 || 1]

        if (localBadgeImage?.image_url_1x) {
          return (
            <S.Badge
              key={badge._id}
              src={localBadgeImage?.image_url_1x}
              title={localBadgeImage?.title}
            />
          )
        }
      }),
    [comment.badges, badges],
  )

  return {
    formattedMessage,
    formattedBadges,
  }
}
