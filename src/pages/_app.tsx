import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { DefaultSeo } from 'next-seo'
import NextNProgress from 'nextjs-progressbar'
import type { AppProps } from 'next/app'
import BasicLayout from '~/layout/Basic'
import { darkTheme, lightTheme } from '~/layout/theme'
import { useRouter } from 'next/router'
import GlobalProvider from '~/contexts/GlobalContext'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('dark')
  const router = useRouter()
  const { locale } = router

  return (
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
      <GlobalProvider locale={locale || 'en'}>
        <BasicLayout>
          <DefaultSeo
            title="pogu.live - The best way to watch VODS"
            description="Watch any sub-only or deleted Twitch VOD for free. Here you can find the best VODs from your favorite streamers and channels."
            openGraph={{
              type: 'website',
              locale: locale,
              url: 'https://pogu.live',
              site_name: 'pogu.live',
              images: [
                {
                  url: '/logo.jpg',
                  alt: `pogu.live`,
                  width: 1136,
                  height: 640,
                },
              ],
            }}
            twitter={{
              handle: '@pogulive',
              site: '@pogulive',
              cardType: 'summary_large_image',
            }}
          />
          <NextNProgress
            color="#D70070"
            startPosition={0.3}
            stopDelayMs={200}
            height={2}
            showOnShallow={true}
            options={{
              showSpinner: false,
            }}
          />
          <Component {...pageProps} />
          <ToastContainer theme="dark" />
        </BasicLayout>
      </GlobalProvider>
    </ThemeProvider>
  )
}

export default MyApp
