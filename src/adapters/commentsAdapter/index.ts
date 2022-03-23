import { ITwitchComment } from '~/@types/ITwitchVideoComment'

export interface IComment {
  _id: string
  offsetSeconds: number
  body: string
  displayName: string
  userColor: string
}

export const commentsAdapter = (comment: ITwitchComment[]): IComment[] => {
  return comment.map((comment) => {
    return {
      _id: comment._id,
      offsetSeconds: comment.content_offset_seconds,
      body: comment.message.body,
      displayName: comment.commenter.display_name,
      userColor: comment.message.user_color,
    }
  })
}
