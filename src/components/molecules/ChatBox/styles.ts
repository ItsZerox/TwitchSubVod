import styled from 'styled-components'

export const ChatBoxContainer = styled.ul`
  width: 100%;
  height: 100vh;
  max-height: calc(100vh - 100px);
  overflow-y: scroll;
  background: ${({ theme }) => theme.colors.grey1000};

  ${({ theme }) => theme.breakpoints.down('md')} {
    max-height: calc(50vh);
  }
`
