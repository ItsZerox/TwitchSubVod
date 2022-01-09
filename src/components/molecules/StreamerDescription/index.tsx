import Avatar from '~/components/atoms/Avatar'
import Box from '~/components/atoms/Box'
import Typography from '~/components/atoms/Typography'
import { useGlobal } from '~/contexts/GlobalContext'
import formatViews from '~/utils/formatViews'

interface StreamerDescriptionProps {
  name: string
  followers: number
  description: string
  avatarUrl: string
}

const StreamerDescription = ({
  name,
  followers,
  description,
  avatarUrl,
}: StreamerDescriptionProps) => {
  const { texts } = useGlobal()

  return (
    <Box flexDirection="column" gap="16px">
      <Avatar title={name} src={avatarUrl} />

      <Box flexDirection="column" gap="4px">
        <Typography variant="h5" title={name} as="h2">
          {name}
        </Typography>
        <Typography
          variant="body1"
          title={
            followers > 0
              ? `${formatViews(followers)} ${texts.FOLLOWERS.toLowerCase()}`
              : ''
          }
        >
          {followers > 0
            ? `${formatViews(followers)} ${texts.FOLLOWERS.toLowerCase()}`
            : ''}
        </Typography>
        <Typography variant="body2" as="p" title={description}>
          {description ||
            'We couldn’t find a description for this streamer at this time. :('}
        </Typography>
      </Box>
    </Box>
  )
}

export default StreamerDescription
