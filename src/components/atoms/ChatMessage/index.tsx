import { IComment } from '~/adapters/commentsAdapter'
import { colors } from '~/layout/colors'
import { convertToHourMinuteSecond } from '~/utils/convertToHourMinuteSecond'
import { useChatMessage } from './hooks'
import * as S from './styles'

interface IChatMessage extends IComment {
  delay: number
}

const ChatMessage = (comment: IChatMessage) => {
  const { formattedMessage, formattedBadges } = useChatMessage({ comment })

  return (
    <S.ChatMessageContainer>
      <S.ChatMessageTimestamp>
        {convertToHourMinuteSecond(comment.offsetSeconds - comment.delay)}
      </S.ChatMessageTimestamp>
      <S.ChatMessageBadges>{formattedBadges}</S.ChatMessageBadges>
      <S.ChatMessageChatter
        style={{
          color: comment.userColor || colors.pink700,
          width: '100%',
          fontWeight: 700,
        }}
      >
        {comment.displayName}:{' '}
      </S.ChatMessageChatter>
      <S.ChatMessageBody>{formattedMessage}</S.ChatMessageBody>
    </S.ChatMessageContainer>
  )
}

export default ChatMessage
