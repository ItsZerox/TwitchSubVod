import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { StreamerInformation } from '~/@types/StreamerInformation'
import AdsContainer from '~/components/atoms/AdsContainer'
import Box from '~/components/atoms/Box'
import Button from '~/components/atoms/Button'
import NamedToggle from '~/components/atoms/NamedToggle'
import Typography from '~/components/atoms/Typography'
import StreamerDescription from '~/components/molecules/StreamerDescription'
import { useGlobal } from '~/contexts/GlobalContext'
import * as S from './styles'

interface ProfileProps {
  children: JSX.Element | JSX.Element[] | string
  streamerInformation: StreamerInformation
}

const ProfilePage = ({ children, streamerInformation }: ProfileProps) => {
  const router = useRouter()
  const { texts } = useGlobal()

  return (
    <S.Container>
      <Box flexDirection="column" gap="16px" alignItems="center">
        <StreamerDescription
          avatarUrl={streamerInformation.logo}
          name={streamerInformation.displayName}
          followers={streamerInformation.followers}
          description={streamerInformation.description}
        />
        <Button
          text={texts.FOLLOW}
          buttonWidth="100%"
          onClick={() => toast(texts.IN_DEVELOPMENT_MESSAGE)}
        />
        <Box flexDirection="column" hideInMobile>
          <div
            style={{
              display: 'flex',
              width: '160px',
              height: '600px',
              borderRadius: '8px',
              marginBottom: '8px',
            }}
          >
            <AdsContainer adslot="3227332986" />
          </div>
        </Box>
      </Box>

      <Box
        flexDirection="column"
        gap="20px"
        alignItems="center"
        justifyContent="flex-start"
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            maxWidth: '728px',
            height: '90px',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        >
          <AdsContainer adslot="3176713160" />
        </div>
        <Typography variant="h3">
          {texts.ALL_STREAMER_VODS.replace(
            '{{streamer}}',
            streamerInformation.displayName,
          )}
        </Typography>
        <NamedToggle
          defaultSelected={
            router.pathname.includes('/videos/') ? 'subOnly' : 'deletedVods'
          }
          buttons={[
            {
              label: texts.SUB_ONLY_VODS,
              value: 'subOnly',
              url: '/videos/[streamer]',
              as: `/videos/${streamerInformation.name}`,
            },
            {
              label: texts.DELETED_VODS,
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
