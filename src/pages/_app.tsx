import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import type { AppProps } from 'next/app'
import BasicLayout from '~/layout/Basic'
import { darkTheme, lightTheme } from '~/layout/theme'
import { useRouter } from 'next/router'
import GlobalProvider from '~/contexts/GlobalContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('dark')
  const router = useRouter()
  const { locale } = router

  return (
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalProvider locale={locale || 'en'}>
        <BasicLayout>
          <Component {...pageProps} />
          <ToastContainer theme="dark" />
        </BasicLayout>
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp
