import { useGlobal } from '~/contexts/GlobalContext'
import Box from '../Box'
import Typography from '../Typography'

const RemovedUser = () => {
  const { texts } = useGlobal()

  return (
    <Box>
      <Typography variant="h4">{texts.REMOVED_USER_MESSAGE}</Typography>
    </Box>
  )
}

export default RemovedUser
