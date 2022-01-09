import { createGlobalStyle, css } from 'styled-components'
import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Header from '~/components/templates/Header'
import DrawerContent from '~/components/molecules/DrawerContent'
import Box from '~/components/atoms/Box'
import Typography from '~/components/atoms/Typography'
import { useGlobal } from '~/contexts/GlobalContext'

export const GlobalStyles = createGlobalStyle`
  :root {
    --toastify-color-progress-dark: ${({ theme }) => theme.colors.pink900};
  }

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

.loading-icon {
    margin-right: 8px;
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

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.grey900};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey700};
    border-radius: 8px;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.pink900};
    color: ${({ theme }) => theme.colors.white};
  }
`

const BasicLayout = ({ children }: { children: any }) => {
  const { texts } = useGlobal()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <GlobalStyles />
      <Header setIsDrawerOpen={setIsDrawerOpen} />
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerContent />
      </Drawer>
      <div
        style={{
          width: '100%',
          maxWidth: '1920px',
          margin: '0 auto',
        }}
      >
        {children}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '100%',
            maxWidth: '1920px',
            minHeight: '100vh',
            margin: '0 auto',
            padding: '24px',
          }}
        >
          <Box
            flexDirection="column"
            gap="8px"
            boxSize="800px"
            justifyContent="center"
          >
            <Typography variant="body1" as="p">
              {texts.POGU_LIVE_DESCRIPTION} {':)'}
            </Typography>
            <Typography variant="body1" as="p">
              {texts.POGU_LIVE_BETA_DESCRIPTION}
            </Typography>
          </Box>
        </div>
      </div>
    </>
  )
}

export default BasicLayout
