import styled, { css, keyframes } from 'styled-components';

interface AnimatedProps {
  url: string;
  animated: any;
}

export const Container = styled.div`
  max-width: 60rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  div {
    max-width: 19rem;
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    width: 19rem;

    button {
      width: 19rem;
      padding: 0;
      display: flex;
      flex-direction: column;
      background-color: transparent;
      color: var(--text);
      font-family: 'Roboto', sans-serif;

      &:hover {
        color: var(--purple);
      }

      div {
        max-height: 10.6875rem;
        margin: 0;

        &:hover {
          background: var(--purple);
        }
      }
    }

    strong {
      word-wrap: break-word;
      margin: 0.2rem 0;
      font-size: 0.9rem;
      font-weight: bold;
    }

    p {
      margin: 0;
      font-size: 0.75rem;
      font-weight: normal;
    }
  }

  div & {
    padding: 1rem 0;
  }
`;

const play = keyframes`
    100% {
        background-position: 0 -1800px;
      }
`;

export const Image = styled.figure<AnimatedProps>`
  ${(props) =>
    props.url &&
    css`
      background: url(${props.url}) no-repeat top center;
    `}
  background-size: contain;
  margin: 0;
  display: flex;
  height: 10.6875rem;
  width: 19rem;
  object-fit: contain;

  transition: transform 0.075s ease;

  &:hover {
    transform: translateX(0.5rem) translateY(-0.5rem);
    max-height: 10.6875rem;
    object-fit: cover;

    ${(props) =>
      props.animated
        ? css`
            background: url(${props.animated});
          `
        : css`
            background: url(${props.url});
          `}

    animation: ${play} 7s steps(10) infinite;
  }
`;
