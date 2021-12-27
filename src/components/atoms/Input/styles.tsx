import styled from 'styled-components'

export const InputLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  max-width: 480px;
  background-color: ${({ theme }) => theme.colors.grey800};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.grey800};
  padding: 10px;

  svg {
    width: 24px;
    height: auto;
    fill: ${({ theme }) => theme.colors.grey400};
  }

  :focus,
  :focus-within {
    border: 1px solid ${({ theme }) => theme.colors.pink600};

    svg {
      fill: ${({ theme }) => theme.colors.pink700};
    }
  }

  .loading-icon {
    animation: rotation 1s linear infinite;

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    position: absolute;
    width: 48px;
    right: 16px;

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
  padding: 0 8px;
`

export const Datalist = styled.datalist``

export const Option = styled.option``
