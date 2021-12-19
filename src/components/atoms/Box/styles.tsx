import styled from 'styled-components'
import { BoxProps } from './types'

export const BoxContainer = styled.div<BoxProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => gap};
`
