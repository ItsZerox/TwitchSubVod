import styled from 'styled-components'

export const AvatarImage = styled.img<{ avatarWidth?: string }>`
  width: ${({ avatarWidth }) => avatarWidth || '100%'};
  height: ${({ avatarWidth }) => avatarWidth || '100%'};
  object-fit: cover;

  border-radius: 50%;
  overflow: hidden;
`
