import {
  Fragment,
  ITwitchComment,
  UserBadge,
} from '~/@types/ITwitchVideoComment'

export interface IComment {
  _id: string
  offsetSeconds: number
  fragments: Fragment[]
  displayName: string
  userColor: string
  badges: UserBadge[]
}

export const commentsAdapter = (comment: ITwitchComment[]): IComment[] => {
  return comment.map((comment) => {
    return {
      _id: comment._id,
      offsetSeconds: comment.content_offset_seconds,
      fragments: comment.message.fragments,
      displayName: comment.commenter.display_name,
      userColor: comment.message.user_color,
      badges: comment.message.user_badges,
    }
  })
}
