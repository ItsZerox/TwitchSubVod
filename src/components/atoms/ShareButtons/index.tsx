import {
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'next-share'
import { useRouter } from 'next/router'
import { useGlobal } from '~/contexts/GlobalContext'
import Box from '../Box'
import Typography from '../Typography'

interface ShareVideoProps {
  titleText: string
  shareUrl?: string
}

const ShareButtons = ({ titleText, shareUrl }: ShareVideoProps) => {
  const { texts } = useGlobal()
  const router = useRouter()

  const defaultShareUrl = `https://pogu.live${router.asPath}`

  return (
    <Box
      flexDirection="column"
      gap="4px"
      _mobileProps={{
        alignItems: 'center',
      }}
    >
      <Box gap="4px">
        <RedditShareButton url={shareUrl || defaultShareUrl} title={titleText}>
          <RedditIcon size={32} round />
        </RedditShareButton>

        <TwitterShareButton
          url={shareUrl || defaultShareUrl}
          title={titleText + ' @pogulive'}
          hashtags={['pogulive']}
        >
          <TwitterIcon size={32} round />
        </TwitterShareButton>

        <TelegramShareButton
          url={shareUrl || defaultShareUrl}
          title={titleText}
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <FacebookShareButton
          url={shareUrl || defaultShareUrl}
          quote={titleText}
          hashtag={'pogulive'}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </Box>
      <Typography variant="subtitle2">{texts.SHARE_THIS_VIDEO}</Typography>
    </Box>
  )
}

export default ShareButtons
