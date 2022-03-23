import { IComment } from '~/adapters/commentsAdapter'
import { colors } from '~/layout/colors'
import { convertToHourMinuteSecond } from '~/utils/convertToHourMinuteSecond'
import * as S from './styles'

const ChatMessage = (comment: IComment) => {
  return (
    <S.ChatMessageContainer>
      <S.ChatMessageTimestamp>
        {convertToHourMinuteSecond(comment.offsetSeconds)}
      </S.ChatMessageTimestamp>
      {/* todo: add badges */}
      <S.ChatMessageChatter textColor={comment.userColor || colors.pink700}>
        {comment.displayName}:{' '}
      </S.ChatMessageChatter>
      {/* todo: add twitch/bttv/ffz/7tv emotes */}
      <S.ChatMessageBody>{comment.body}</S.ChatMessageBody>
    </S.ChatMessageContainer>
  )
}

export default ChatMessage
