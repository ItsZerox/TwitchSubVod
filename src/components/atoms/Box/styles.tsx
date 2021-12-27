import styled from 'styled-components'
import { BoxProps } from './types'

export const BoxContainer = styled.div<BoxProps>`
  display: flex;
  align-items: ${({ alignItems }) => alignItems};
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection};
  gap: ${({ gap }) => gap};
  max-width: 100%;

  ${({ theme }) => theme.breakpoints.down('md')} {
    display: ${({ hideInMobile }) => (hideInMobile ? 'none' : 'flex')};
    align-items: ${({ _mobileProps }) => _mobileProps?.alignItems};
    justify-content: ${({ _mobileProps }) => _mobileProps?.justifyContent};
    flex-direction: ${({ _mobileProps }) => _mobileProps?.flexDirection};
    gap: ${({ _mobileProps }) => _mobileProps?.gap};
    width: ${({ _mobileProps }) => _mobileProps?.boxSize};
  }
`
