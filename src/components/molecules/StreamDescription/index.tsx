import Link from 'next/link'
import { forwardRef } from 'react'
import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import Avatar from '~/components/atoms/Avatar'
import Box from '~/components/atoms/Box'
import Typography from '~/components/atoms/Typography'
import { useGlobal } from '~/contexts/GlobalContext'
import formatDate from '~/utils/formatDate'
import formatViews from '~/utils/formatViews'

interface ViewAndDateProps {
  viewCount?: number
  date?: string
  locale?: string
  translatedViews?: string
  isMinimal?: boolean
}

const ViewAndDate = forwardRef<HTMLDivElement, ViewAndDateProps>(
  (
    { viewCount, date, locale, translatedViews, isMinimal }: ViewAndDateProps,
    ref,
  ) => {
    if (!viewCount && !date) {
      return null
    }

    return (
      <Box as="span" gap="6px" ref={ref}>
        <Typography variant="body2" className="stream-description-views">
          {formatViews(viewCount, translatedViews)}
        </Typography>
        {!isMinimal && (
          <Typography variant="body2" className="stream-description-date">
            {formatDate(date, locale)}
          </Typography>
        )}
      </Box>
    )
  },
)

interface StreamDescriptionProps {
  streamerInformation: StreamerInformation
  vodInformation: VodInformation
  avatarWidth?: string
  noAvatar?: boolean
  lineLimit?: number
  isMinimal?: boolean
  urlProps?: {
    href: string
  }
}

const StreamDescription = ({
  streamerInformation,
  vodInformation,
  avatarWidth,
  noAvatar,
  lineLimit,
  isMinimal,
  urlProps,
}: StreamDescriptionProps) => {
  const { locale, texts } = useGlobal()

  return (
    <Box alignItems="flex-start" justifyContent="space-between" gap="9px">
      {!noAvatar && (
        <Link
          href="/videos/[streamer]"
          as={`/videos/${streamerInformation.name}`}
          prefetch={false}
          passHref
        >
          <Box as="a" tabIndex={avatarWidth ? 0 : -1}>
            <Avatar
              title={streamerInformation.displayName}
              src={streamerInformation.logo.replace('300x300', '50x50')}
              width={avatarWidth || '32px'}
            />
          </Box>
        </Link>
      )}

      <Box flexDirection="column" gap={'4px'}>
        {urlProps?.href ? (
          <Link href={urlProps.href} prefetch={false} passHref>
            <a>
              <Typography
                variant="h6"
                lineLimit={lineLimit || 3}
                title={vodInformation.title}
                className="stream-description-title"
                as="h2"
              >
                {vodInformation.title}
              </Typography>
            </a>
          </Link>
        ) : (
          <Typography
            variant="h6"
            lineLimit={lineLimit || 3}
            title={vodInformation.title}
            className="stream-description-title"
            as="h1"
          >
            {vodInformation.title}
          </Typography>
        )}
        <Link
          href="/videos/[streamer]"
          as={`/videos/${streamerInformation.name}`}
          prefetch={false}
          passHref
        >
          <Typography
            variant="body2"
            className="stream-description-name"
            as="a"
            cursor="pointer"
          >
            {streamerInformation.displayName}
          </Typography>
        </Link>

        {urlProps?.href ? (
          <Link href={urlProps.href} prefetch={false} passHref>
            <a>
              <ViewAndDate
                date={vodInformation.date}
                viewCount={vodInformation.viewCount}
                locale={locale}
                translatedViews={texts.VIEWS.toLowerCase()}
                isMinimal={isMinimal}
              />
            </a>
          </Link>
        ) : (
          <Box gap="6px">
            <ViewAndDate
              date={vodInformation.date}
              viewCount={vodInformation.viewCount}
              locale={locale}
              translatedViews={texts.VIEWS.toLowerCase()}
              isMinimal={isMinimal}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default StreamDescription
