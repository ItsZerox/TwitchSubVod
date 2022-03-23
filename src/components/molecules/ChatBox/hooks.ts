import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { IComment } from '~/adapters/commentsAdapter'
import { getComments } from '~/services/chat/getComments'

interface IUseChatBox {
  currentVideoTime: number
}

export const useChatBox = ({ currentVideoTime }: IUseChatBox) => {
  const router = useRouter()
  const [comments, setComments] = useState<IComment[]>([])
  const [newComments, setNewComments] = useState<IComment[]>([])

  const commentsRef = useRef<HTMLUListElement>(null)

  const vodId = router.query.vod as string

  useEffect(() => {
    getComments({
      vodId,
      currentVideoTime,
      setNewComments,
    })
  }, [])

  const scrollToLastMessage = () => {
    const lastChild = commentsRef.current?.lastElementChild

    if (lastChild) {
      lastChild.scrollIntoView({
        block: 'end',
        inline: 'nearest',
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
