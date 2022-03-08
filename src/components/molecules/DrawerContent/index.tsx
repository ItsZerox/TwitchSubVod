import Image from 'next/image'
import { AiFillGithub, AiFillTwitterCircle } from 'react-icons/ai'
import { SiKofi } from 'react-icons/si'
import Box from '~/components/atoms/Box'
import Button from '~/components/atoms/Button'
import Icon from '~/components/atoms/Icon'
import { useGlobal } from '~/contexts/GlobalContext'
import * as S from './styles'

const DrawerContent = () => {
  const { texts } = useGlobal()

  return (
    <S.DrawerContentContainer>
      <Box>
        <Image
          src="/logo/white-with-icon-beta.svg"
          width={106}
          height={23}
          aria-label="pogu.live"
          alt="pogu.live"
        />
      </Box>

      <Box flexDirection="column" alignItems="center" gap="8px">
        <Button
          text={texts.SEND_FEEDBACK}
          title={texts.SEND_FEEDBACK}
          variant="primary"
          buttonWidth="100%"
          onClick={() => {
            // @ts-ignore
            Tally.openPopup('3XQxgw')
          }}
        />
        <Button
          text={'Go to old site'}
          title={texts.SEND_FEEDBACK}
          variant="secondary"
          buttonWidth="100%"
          as="a"
          href="https://old.pogu.live?ref=pogu.live"
        />
      </Box>

      <Box boxHeight="104px">
        <Box gap="12px" boxHeight="fit-content">
          <Icon
            icon={<AiFillTwitterCircle size={28} color="#FFFFFF" />}
            title={texts.FOLLOW_OUR_TWITTER}
            isButton
            as="a"
            href="https://twitter.com/pogulive"
            target="_blank"
            rel="noopener noreferrer"
          />
          <Icon
            icon={<SiKofi size={28} color="#FFFFFF" />}
            title={texts.SUPPORT_US_ON_KOFI}
            isButton
            as="a"
            href="https://ko-fi.com/pogulive"
            target="_blank"
            rel="noopener noreferrer"
          />
          <Icon
            icon={<AiFillGithub size={28} color="#FFFFFF" />}
            title={texts.STAR_US_ON_GITHUB}
            isButton
            as="a"
            href="https://github.com/Alissonsleal/TwitchSubVod"
            target="_blank"
            rel="noopener noreferrer"
          />
        </Box>
      </Box>
    </S.DrawerContentContainer>
  )
}

export default DrawerContent
