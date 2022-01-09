import styled from 'styled-components'

export const InputLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  width: 80%;
  max-width: 480px;
  background-color: ${({ theme }) => theme.colors.grey800};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.grey800};
  transition: all 0.1s ease-in-out;
  overflow: hidden;

  svg {
    width: 24px;
    height: auto;
    fill: ${({ theme }) => theme.colors.grey400};
  }

  .left-icon {
    padding-left: 8px;
  }

  .search-button {
    opacity: 0;
    transform: translateX(48px);
  }

  :focus,
  :focus-within {
    border: 1px solid ${({ theme }) => theme.colors.pink600};

    .left-icon {
      transform: translateY(48px);
    }

    .loading-icon {
      fill: ${({ theme }) => theme.colors.pink700};
    }

    .search-button {
      /* display: flex; */
      opacity: 1;
      fill: ${({ theme }) => theme.colors.white};
      transform: translateX(0);
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    position: absolute;
    width: 48px;
    right: 16px;
    padding-left: 3px;

    transition: all 0.2s ease-in-out;

    :focus,
    :focus-within {
      width: 100%;
      max-width: calc(100vw - 16px - 16px);
      left: 16px;
    }
  }
`

export const InputIcon = styled.div<{ iconPosition: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${({ iconPosition }) =>
    iconPosition === 'right' ? '8px' : '0'};
  margin-right: ${({ iconPosition }) =>
    iconPosition === 'left' ? '8px' : '0'};
`

export const InputText = styled.input`
  display: flex;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  line-height: 1.5;
  padding: 10px 8px;
  transition: all 0.1s ease-in-out;

  :focus {
    transform: translateX(-24px);
  }
`

export const InputButton = styled.a<{ isIOS?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 48px;
  background-color: ${({ theme, isIOS }) =>
    isIOS ? 'transparent' : theme.colors.pink700};
  border: none;
  cursor: pointer;

  z-index: 100;
`
