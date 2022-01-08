import Image from 'next/image'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { FiMenu } from 'react-icons/fi'
import { IoNotificationsSharp, IoPersonSharp, IoSearch } from 'react-icons/io5'
import { RiFeedbackFill } from 'react-icons/ri'
import { toast } from 'react-toastify'
import ButtonPill from '~/components/atoms/ButtonPill'
import Input from '~/components/atoms/Input'
import { useGlobal } from '~/contexts/GlobalContext'
import Icon from '../../atoms/Icon'
import { useHeader } from './hooks'
import * as S from './styles'

interface HeaderProps {
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
}

const Header = ({ setIsDrawerOpen }: HeaderProps) => {
  const { texts } = useGlobal()

  const { search, handleSearch, handleSubmit } = useHeader()

  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.HeaderArea gap={30}>
          <Icon
            icon={<FiMenu />}
            title={texts.OPEN_MENU}
            isButton
            onClick={() => setIsDrawerOpen((isOpen) => !isOpen)}
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

        {/* @ts-ignore */}
        <S.Form flexGrow={1} onSubmit={handleSubmit}>
          <Input
            icon={<IoSearch />}
            iconPosition="left"
            placeholder={`${texts.SEARCH}...`}
            id="search-bar"
            type="text"
            aria-label={texts.SEARCH}
            autoComplete="off"
            name="search"
            value={search}
            onChange={handleSearch}
            isLoading={false}
          />
        </S.Form>
        <S.HeaderArea gap={8} hideInMobile={true}>
          <ButtonPill
            icon={<RiFeedbackFill />}
            iconPosition="right"
            text={texts.FEEDBACK}
            title={texts.SEND_FEEDBACK}
            onClick={() => {
              // @ts-ignore
              Tally.openPopup('3XQxgw')
            }}
          />
          <Icon
            icon={<IoPersonSharp />}
            title={texts.PROFILE}
            isButton
            onClick={() => toast(texts.IN_DEVELOPMENT_MESSAGE)}
          />
          <Icon
            icon={<IoNotificationsSharp />}
            title={texts.NOTIFICATIONS}
            isButton
            onClick={() => toast(texts.IN_DEVELOPMENT_MESSAGE)}
          />
        </S.HeaderArea>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  )
}

export default Header
