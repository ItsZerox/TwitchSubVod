import { useRouter } from 'next/router'
import { StreamerInformation } from '~/@types/StreamerInformation'
import Box from '~/components/atoms/Box'
import Button from '~/components/atoms/Button'
import NamedToggle from '~/components/atoms/NamedToggle'
import Typography from '~/components/atoms/Typography'
import StreamerDescription from '~/components/molecules/StreamerDescription'
import * as S from './styles'

interface ProfileProps {
  children: JSX.Element | JSX.Element[] | string
  streamerInformation: StreamerInformation
}

const ProfilePage = ({ children, streamerInformation }: ProfileProps) => {
  const router = useRouter()

  return (
    <S.Container>
      <Box flexDirection="column" gap="16px" alignItems="center">
        <StreamerDescription
          avatarUrl={streamerInformation.logo}
          name={streamerInformation.displayName}
          followers={streamerInformation.followers}
          description={streamerInformation.description}
        />
        <Button text="Follow" buttonWidth="100%" />
        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: '160px',
            height: '600px',
            background: '#000',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        />
      </Box>

      <Box flexDirection="column" gap="20px" alignItems="center">
        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: '728px',
            height: '90px',
            background: '#000',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        />
        <Typography variant="h3">
          All {streamerInformation.displayName} VODs
        </Typography>
        <NamedToggle
          defaultSelected={
            router.pathname.includes('/videos/') ? 'subOnly' : 'deletedVods'
          }
          buttons={[
            {
              label: 'Sub only VODs',
              value: 'subOnly',
              url: '/videos/[streamer]',
              as: `/videos/${streamerInformation.name}`,
            },
            {
              label: 'Deleted VODs',
              value: 'deletedVods',
              url: '/deletedvods/[streamer]',
              as: `/deletedvods/${streamerInformation.name}`,
            },
          ]}
        />
        {children}
      </Box>
    </S.Container>
  )
}

export default ProfilePage
