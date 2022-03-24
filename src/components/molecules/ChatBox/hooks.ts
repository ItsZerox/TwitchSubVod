import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { ILoadEmotes } from '~/@types/ILoadEmotes'
import { IComment } from '~/adapters/commentsAdapter'
import { useGlobal } from '~/contexts/GlobalContext'
import { load7TVEmotes } from '~/services/chat/get7TVEmotes '
import { loadBTTVEmotes } from '~/services/chat/getBTTVEmotes'
import { getComments } from '~/services/chat/getComments'
import { loadFFZEmotes } from '~/services/chat/getFFZEmotes'
import { loadBadges } from '~/services/chat/loadBadges'

interface IUseChatBox {
  currentVideoTime: number
  streamerId: string
  streamerName: string
}

export const useChatBox = ({
  currentVideoTime,
  streamerId,
  streamerName,
}: IUseChatBox) => {
  const { setEmotes, setBadges } = useGlobal()
  const router = useRouter()
  const [comments, setComments] = useState<IComment[]>([])
  const [newComments, setNewComments] = useState<IComment[]>([])

  const commentsRef = useRef<HTMLUListElement>(null)

  const vodId = router.query.vod as string

  useEffect(() => {
    const fetchCommentsAndEmotes = async () => {
      const [twitchBadges, bttvEmotes, ffzEmotes, sevenTvEmotes] =
        await Promise.all([
          loadBadges(streamerId),
          loadBTTVEmotes(streamerId),
          loadFFZEmotes(streamerId),
          load7TVEmotes(streamerName),
          getComments({
            vodId,
            currentVideoTime,
            setNewComments,
          }),
        ])

      // todo: get twitch global and local emotes
      setEmotes({
        bttvEmotes,
        ffzEmotes,
        sevenTvEmotes,
      })
      setBadges(twitchBadges)
    }

    fetchCommentsAndEmotes()
  }, [])

  const scrollToLastMessage = () => {
    const lastChild = commentsRef.current?.lastElementChild

    if (lastChild) {
      commentsRef.current?.scrollTo({
        top: commentsRef.current?.scrollHeight,
      })
    }
  }

  useEffect(() => {
    const lastComment = comments?.[comments.length - 1] || {}
    if (
      lastComment.offsetSeconds > currentVideoTime ||
      (!comments.length && newComments.length)
    ) {
      setComments([])
      setNewComments([])
      getComments({
        vodId,
        currentVideoTime,
        setNewComments,
      })

      if (lastComment.offsetSeconds > currentVideoTime) {
        return
      }
    }

    const commentsToPush = newComments.filter(
      (newComment) => newComment.offsetSeconds <= currentVideoTime,
    )

    const shouldAddComment =
      commentsToPush.length || (newComments.length > 0 && !comments.length)

    if (shouldAddComment) {
      const nComment = 100

      const lastNComments =
        comments.length > nComment
          ? comments.slice(comments.length - nComment)
          : comments

      const dedupedComments = Array.from(
        new Set([...lastNComments, ...commentsToPush]),
      ).reduce((acc: IComment[], curr) => {
        const existingComment = acc.find((comment) => comment._id === curr._id)

        if (existingComment) {
          return acc
        }

        return [...acc, curr]
      }, [])

      const newCommentsToSet = newComments.filter(
        (comment) => comment.offsetSeconds > currentVideoTime,
      )

      setComments(dedupedComments)
      setNewComments(newCommentsToSet)

      if (!newCommentsToSet.length) {
        getComments({
          vodId,
          currentVideoTime,
          setNewComments,
        })
      }
    }
  }, [currentVideoTime])

  useEffect(() => {
    scrollToLastMessage()
  }, [comments])

  return {
    comments,
    commentsRef,
  }
}
