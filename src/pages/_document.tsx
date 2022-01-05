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
        `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
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
                    "trigger": "exit"
                  },
                  "overlay": true,
                  "autoClose": 2000
                }
              };
        `,
            }}
          />
        </body>
      </Html>
    )
  }
}

export default MyDocument
