import Link from 'next/link'
import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import Avatar from '~/components/atoms/Avatar'
import Box from '~/components/atoms/Box'
import Typography from '~/components/atoms/Typography'
import { useGlobal } from '~/contexts/GlobalContext'
import formatDate from '~/utils/formatDate'

// todo: convert mockedVodInformation.viewCount to string like 111.3k views

interface StreamDescriptionProps {
  streamerInformation: StreamerInformation
  vodInformation: VodInformation
  avatarWidth?: string
  noAvatar?: boolean
  lineLimit?: number
  urlProps?: {
    href: string
    as: string
  }
}

const StreamDescription = ({
  streamerInformation,
  vodInformation,
  avatarWidth,
  noAvatar,
  lineLimit,
  urlProps,
}: StreamDescriptionProps) => {
  const { locale } = useGlobal()

  return (
    <Box alignItems="flex-start" justifyContent="space-between" gap="9px">
      {!noAvatar && (
        <Link
          href="/videos/[streamer]"
          as={`/videos/${streamerInformation.name}`}
          passHref
        >
          <Box as="a" tabIndex={avatarWidth ? 0 : -1}>
            <Avatar
              title={streamerInformation.displayName}
              src={streamerInformation.logo}
              width={avatarWidth || '32px'}
            />
          </Box>
        </Link>
      )}

      <Box flexDirection="column" gap={'2px'}>
        {urlProps?.href ? (
          <Link href={urlProps.href} as={urlProps.as} passHref>
            <Typography
              variant="h6"
              lineLimit={lineLimit || 3}
              title={vodInformation.title}
              className="stream-description-title"
              as="a"
            >
              {vodInformation.title}
            </Typography>
          </Link>
        ) : (
          <Typography
            variant="h6"
            lineLimit={lineLimit || 3}
            title={vodInformation.title}
            className="stream-description-title"
          >
            {vodInformation.title}
          </Typography>
        )}
        <Link
          href="/videos/[streamer]"
          as={`/videos/${streamerInformation.name}`}
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
          <Link href={urlProps.href} as={urlProps.as} passHref>
            <Box as="a">
              <Typography variant="body2" className="stream-description-views">
                {vodInformation.viewCount} views
              </Typography>
              <Typography variant="body2" className="stream-description-date">
                {formatDate(vodInformation.date, locale)}
              </Typography>
            </Box>
          </Link>
        ) : (
          <Box>
            <Typography variant="body2" className="stream-description-views">
              {vodInformation.viewCount} views
            </Typography>
            <Typography variant="body2" className="stream-description-date">
              {formatDate(vodInformation.date, locale)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default StreamDescription
