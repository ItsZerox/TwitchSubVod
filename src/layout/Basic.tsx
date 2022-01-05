import { createGlobalStyle, css } from 'styled-components'
import Header from '~/components/templates/Header'

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    background-color: ${({ theme }) => theme.colors.grey900};
  }

  *, *:before, *:after {
    box-sizing: inherit;
    font-family: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  ${
    process.env.NODE_ENV === 'development' &&
    css`
      ins {
        border: 1px solid red !important;
      }
    `
  }

  ::selection {
    background: ${({ theme }) => theme.colors.pink900};
    color: ${({ theme }) => theme.colors.white};
  }
`

const BasicLayout = ({ children }: { children: any }) => {
  return (
    <>
      <GlobalStyles />
      <Header />
      {children}
    </>
  )
}

export default BasicLayout
