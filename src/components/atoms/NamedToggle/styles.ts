import styled from 'styled-components'

interface ToggleButtonProps {
  isActive: boolean
}

export const NamedToggleContainer = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
`

export const ToggleButton = styled.a<ToggleButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 158px;
  height: 42px;
  cursor: pointer;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : theme.colors.black};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.pink700 : theme.colors.white};
  transition: all 0.1s ease-in-out;

  :hover,
  :focus {
    outline: none;
    filter: brightness(0.9);
  }
`
