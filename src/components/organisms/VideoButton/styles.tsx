import styled, { css } from 'styled-components'
import Box from '~/components/atoms/Box'

export const VideoButtonContainer = styled.div<{ isMinimal?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ isMinimal }) => (isMinimal ? '2px' : '2px 2px 8px')};

  cursor: pointer;

  text-decoration: none;
  color: inherit;

  &:hover {
    span {
      filter: brightness(0.9);
    }

    img {
      filter: brightness(1.2);
    }
  }

  :focus-within {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  ${({ isMinimal }) =>
    isMinimal &&
    css`
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: flex-start;

      span {
        font-size: 0.8rem;
        line-height: 1em;
      }
    `}
`

export const BoxLink = styled(Box)`
  /* keep aspect ratio of 16:9 */
  height: 0;
  padding-bottom: 56.25%;
  width: 100%;

  :focus {
    outline: none;
  }
`
