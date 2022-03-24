import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const GTAG = process.env.NEXT_PUBLIC_GTAG_ID as string

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            name="keywords"
            content="Twitch, Deleted Vod, Deleted Vods, Sub-only, Sub-only Vods, Watch Twitch, Twitch Free Vods, Twitch Deleted Vods, Twitch Deleted Clips, Twitch Download Clips, Twitch Clips"
          />

          <link rel="manifest" href="/site.webmanifest" />
          <link
            rel="icon"
            type="image/png"
            sizes="196x196"
            href="/icons/favicon-196.png"
          ></link>

          <link rel="apple-touch-icon" href="/icons/apple-icon-180.png"></link>

          <meta name="apple-mobile-web-app-capable" content="yes"></meta>

          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2048-2732.jpg"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2732-2048.jpg"
            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1668-2388.jpg"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2388-1668.jpg"
            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1536-2048.jpg"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2048-1536.jpg"
            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1668-2224.jpg"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2224-1668.jpg"
            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1620-2160.jpg"
            media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2160-1620.jpg"
            media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1284-2778.jpg"
            media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2778-1284.jpg"
            media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1170-2532.jpg"
            media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2532-1170.jpg"
            media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1125-2436.jpg"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2436-1125.jpg"
            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1242-2688.jpg"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2688-1242.jpg"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-828-1792.jpg"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1792-828.jpg"
            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1242-2208.jpg"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-2208-1242.jpg"
            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-750-1334.jpg"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1334-750.jpg"
            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-640-1136.jpg"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
          ></link>
          <link
            rel="apple-touch-startup-image"
            href="/icons/apple-splash-1136-640.jpg"
            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
          ></link>

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8414071548156466"
            crossOrigin="anonymous"
          ></script>

          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GTAG}`}
          ></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', '${GTAG}', {
                page_path: window.location.pathname,
              });
        `,
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "57ea2ma1fh");

          window.clarity('set', 'isV2', true);
        `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {process.env.NODE_ENV === 'production' && (
            <>
              <script async src="https://tally.so/widgets/embed.js"></script>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `
                  window.TallyConfig = {
                    "formId": "3XQxgw",
                    "popup": {
                      "emoji": {
                        "text": "👋",
                        "animation": "wave"
                      },
                      "open": {
                        "trigger": "time",
                        "ms": 3000000
                      },
                      "autoClose": 2000
                    }
                  };`,
                }}
              />
              <script src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"></script>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: `
                  kofiWidgetOverlay.draw('pogulive', {
                    'type': 'floating-chat',
                    'floating-chat.donateButton.text': 'Support me',
                    'floating-chat.donateButton.background-color': '#D70070',
                    'floating-chat.donateButton.text-color': '#fff'
                  });`,
                }}
              />
            </>
          )}
        </body>
      </Html>
    )
  }
}

export default MyDocument
