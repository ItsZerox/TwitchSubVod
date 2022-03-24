import ChatMessage from '~/components/atoms/ChatMessage'
import { useChatBox } from './hooks'
import * as S from './styles'

interface IChatBox {
  currentVideoTime: number
  streamerId: string
  streamerName: string
}

const ChatBox = ({ currentVideoTime, streamerId, streamerName }: IChatBox) => {
  const { comments, commentsRef, delay } = useChatBox({
    currentVideoTime,
    streamerId,
    streamerName,
  })

  return (
    <S.ChatBoxContainer ref={commentsRef}>
      {comments.map((comment) => (
        <ChatMessage key={comment._id} {...comment} delay={delay} />
      ))}
      {/* todo: add delay settings */}
    </S.ChatBoxContainer>
  )
}

export default ChatBox
