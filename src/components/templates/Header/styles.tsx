import styled from 'styled-components'

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: center;

  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey800};
  color: ${({ theme }) => theme.colors.white};
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  height: 100%;
  width: 100%;
  padding: 0 16px;
`

interface HeaderAreaProps {
  gap?: number
  flexGrow?: number
  hideInMobile?: boolean
}

export const HeaderArea = styled.div<HeaderAreaProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => gap || 0}px;
  flex-grow: ${({ flexGrow }) => flexGrow || 0};

  svg {
    width: 24px;
    height: auto;
    color: ${({ theme }) => theme.colors.white};
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    display: ${({ hideInMobile }) => (hideInMobile ? 'none' : 'flex')};
  }
`

// @ts-ignore
export const Form = styled(HeaderArea).attrs(({ as = 'form' }) => ({ as }))`
  [list]::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`
