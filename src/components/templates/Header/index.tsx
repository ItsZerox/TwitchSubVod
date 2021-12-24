import Image from 'next/image'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'
import { IoNotificationsSharp, IoPersonSharp, IoSearch } from 'react-icons/io5'
import { RiFeedbackFill } from 'react-icons/ri'
import ButtonPill from '~/components/atoms/ButtonPill'
import Input from '~/components/atoms/Input'
import { useGlobal } from '~/contexts/GlobalContext'
import Icon from '../../atoms/Icon'
import * as S from './styles'

const Header = () => {
  const { texts } = useGlobal()

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.HeaderArea gap={30}>
          <Icon
            icon={<FiMenu />}
            title={texts.OPEN_MENU}
            isButton
            onClick={() => {
              alert(texts.OPEN_MENU)
            }}
          />
          <Link href="/" as={`/`} passHref>
            <Icon
              icon={
                <Image
                  src="/logo/white-with-icon-beta.svg"
                  width={106}
                  height={23}
                  aria-label="pogu.live"
                />
              }
              title="pogu.live"
              as="a"
              tabIndex={0}
            />
          </Link>
        </S.HeaderArea>
        <S.HeaderArea flexGrow={1}>
          <Input
            icon={<IoSearch />}
            iconPosition="left"
            placeholder={`${texts.SEARCH}...`}
            id="search-bar"
            aria-label={texts.SEARCH}
          />
        </S.HeaderArea>
        <S.HeaderArea gap={8}>
          <ButtonPill
            icon={<RiFeedbackFill />}
            iconPosition="right"
            text={texts.FEEDBACK}
            title={texts.SEND_FEEDBACK}
            onClick={() => {
              alert('Send feedback')
            }}
          />
          <Icon
            icon={<IoPersonSharp />}
            title={texts.PROFILE}
            isButton
            onClick={() => {
              alert('redirect to /profile')
            }}
          />
          <Icon
            icon={<IoNotificationsSharp />}
            title={texts.NOTIFICATIONS}
            isButton
            onClick={() => {
              alert('Open notification')
            }}
          />
        </S.HeaderArea>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  )
}

export default Header
