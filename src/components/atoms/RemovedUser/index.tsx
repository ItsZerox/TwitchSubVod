import { useGlobal } from '~/contexts/GlobalContext'
import Box from '../Box'
import Typography from '../Typography'

interface RemovedUserProps {
  streamerName: string
}

const RemovedUser = ({ streamerName }: RemovedUserProps) => {
  const { texts } = useGlobal()

  if (typeof window !== 'undefined' && !streamerName) {
    streamerName = window.location.pathname.split('/')[2]
  }

  const capitalizedStreamerName =
    streamerName?.charAt(0)?.toUpperCase() + streamerName?.slice(1)

  return (
    <Box>
      <Typography variant="h4">
        {texts.REMOVED_USER_MESSAGE.replace(
          '{{streamerName}}',
          capitalizedStreamerName,
        )}
      </Typography>
    </Box>
  )
}

export default RemovedUser
