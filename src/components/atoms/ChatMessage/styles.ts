import styled from 'styled-components'

export const ChatMessageContainer = styled.li`
  color: white;
  list-style: none;
  padding: 5px 0 5px 10px;
  width: 100%;
  font-size: 13px;
`

export const ChatMessageTimestamp = styled.span`
  margin-right: 5px;
`

export const ChatMessageChatter = styled.span<{ textColor?: string }>`
  color: ${({ textColor }) => textColor || 'white'};
  width: 100%;
  font-weight: 700;
`

export const ChatMessageBody = styled.span`
  width: 100%;
`
