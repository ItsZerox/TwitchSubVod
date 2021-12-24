import styled from 'styled-components'

interface VideoButtonGroupContainerProps {
  minVideoWidth?: string
  isMinimal?: boolean
}

export const VideoButtonGroupContainer = styled.div<VideoButtonGroupContainerProps>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${({ minVideoWidth }) => minVideoWidth || '320px'}, 1fr)
  );
  grid-gap: ${({ isMinimal }) => (isMinimal ? '16px' : '32px 16px;')};
  margin-bottom: 16px;
  width: 100%;

  animation: all 1s ease-in-out;

  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }
`
