import styled from 'styled-components'

export const WatchedVideoButtonGroupContainer = styled.div`
  display: grid;
  align-self: flex-start;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 32px 16px;
  margin-bottom: 16px;
  align-items: flex-start;
  max-width: calc(100vw - 48px);
  animation: all 1s ease-in-out;

  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
`
