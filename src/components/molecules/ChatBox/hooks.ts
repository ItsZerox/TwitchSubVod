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
  const [currentVideoTimeState, setCurrentVideoTimeState] = useState(0)
  const [delay, setDelay] = useState(0)

  useEffect(() => {
    setCurrentVideoTimeState(currentVideoTime + delay)
  }, [currentVideoTime, delay])

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
            currentVideoTime: currentVideoTimeState,
            setNewComments,
          }),
        ])

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
    if (Math.round(currentVideoTimeState) <= 0) {
      return
    }

    const lastComment = comments?.[comments.length - 1] || {}
    if (
      lastComment.offsetSeconds > currentVideoTimeState ||
      (!comments.length && newComments.length)
    ) {
      setComments([])
      setNewComments([])
      getComments({
        vodId,
        currentVideoTime: currentVideoTimeState,
        setNewComments,
      })

      if (lastComment.offsetSeconds > currentVideoTimeState) {
        return
      }
    }

    const commentsToPush = newComments.filter(
      (newComment) => newComment.offsetSeconds <= currentVideoTimeState,
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
        (comment) => comment.offsetSeconds > currentVideoTimeState,
      )

      setComments(dedupedComments)
      setNewComments(newCommentsToSet)

      if (!newCommentsToSet.length) {
        getComments({
          vodId,
          currentVideoTime: currentVideoTimeState,
          setNewComments,
        })
      }
    }
  }, [currentVideoTimeState])

  // update chat every quarter second (less blocky and more fluid)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoTimeState((oldTime) => oldTime + 1 / 100000000000)
    }, 250)

    return () => clearInterval(interval)
  }, [currentVideoTimeState])

  useEffect(() => {
    scrollToLastMessage()
  }, [comments])

  return {
    comments,
    commentsRef,
    delay,
    setDelay,
  }
}
