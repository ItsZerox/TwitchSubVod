import { IComment } from '~/adapters/commentsAdapter'
import { colors } from '~/layout/colors'
import { convertToHourMinuteSecond } from '~/utils/convertToHourMinuteSecond'
import { useChatMessage } from './hooks'
import * as S from './styles'

const ChatMessage = (comment: IComment) => {
  const { formattedMessage } = useChatMessage({ comment })

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
      <S.ChatMessageBody>{formattedMessage}</S.ChatMessageBody>
    </S.ChatMessageContainer>
  )
}

export default ChatMessage
