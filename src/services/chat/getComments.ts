import { Dispatch, SetStateAction } from 'react'
import { ITwitchVideoComment } from '~/@types/ITwitchVideoComment'
import { commentsAdapter, IComment } from '~/adapters/commentsAdapter'
import api from '../config'

interface IGetComments {
  vodId: string
  currentVideoTime: number
  setNewComments: Dispatch<SetStateAction<IComment[]>>
}

export const getComments = async ({
  vodId,
  currentVideoTime,
  setNewComments,
}: IGetComments) => {
  const params = {
    content_offset_seconds: Math.round(currentVideoTime),
  }

  const { data } = await api.get<ITwitchVideoComment>(
    `/videos/${vodId}/comments`,
    {
      params,
    },
  )

  const adaptedComments = commentsAdapter(data.comments)

  setNewComments((oldNewComments) =>
    Array.from(new Set([...oldNewComments, ...adaptedComments])),
  )
}
