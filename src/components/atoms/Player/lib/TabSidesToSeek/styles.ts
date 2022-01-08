import styled from 'styled-components'

export const TapSidesContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* @see https://github.com/vime-js/vime/blob/src/globals/themes/default.css */
  z-index: 21;
  pointer-events: none;

  ${({ theme }) => theme.breakpoints.down('sm')} {
    z-index: 100;
  }
`

export const TapSidesTarget = styled.div`
  width: 30%;
  height: 100%;
  pointer-events: auto;

  .animation-left {
    /* triangle pointing left */
    width: 0;
    height: 0;
    border-top: 50px solid transparent;
    border-right: 100px solid red;
    border-bottom: 50px solid transparent;
  }

  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 40%;
    height: 50%;
    transform: translateY(50%);
  }
`

export const Animation = styled.span`
  display: flex;
  justify-content: center;
  margin: 8px auto;
  width: fit-content;
  padding: 12px;
  border-radius: 8px;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.pink600};
  font-weight: 700;
  opacity: 0;

  animation: fadeIn 2s ease-in reverse;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.7;
    }
  }
`
