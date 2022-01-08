import { AiOutlineLoading } from 'react-icons/ai'
import Box from '~/components/atoms/Box'
import Typography from '~/components/atoms/Typography'
import { useGlobal } from '~/contexts/GlobalContext'

interface SearchIndicatorProps {
  streamerName?: string
}

const SearchIndicator = ({ streamerName }: SearchIndicatorProps) => {
  const { texts } = useGlobal()

  return (
    <Box
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxSize="100%"
      boxHeight="calc(100vh - 64px)"
      gap="32px"
    >
      <AiOutlineLoading className="loading-icon" color="#FFF" size={80} />
      {typeof window !== 'undefined' && (
        <Typography variant="h4" as="h1" color="white">
          {texts.FETCHING_STREAMER_VIDEOS.replace(
            '{{streamerName}}',
            `${streamerName}'s` || '',
          )}
        </Typography>
      )}
    </Box>
  )
}

export default SearchIndicator
