import Image from 'next/image'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'
import { IoNotificationsSharp, IoPersonSharp, IoSearch } from 'react-icons/io5'
import { RiFeedbackFill } from 'react-icons/ri'
import ButtonPill from '~/components/atoms/ButtonPill'
import Input, { Datalist, Option } from '~/components/atoms/Input'
import { useGlobal } from '~/contexts/GlobalContext'
import Icon from '../../atoms/Icon'
import { useHeader } from './hooks'
import * as S from './styles'

const Header = () => {
  const { texts } = useGlobal()

  const { search, options, handleSearch, handleSubmit, isLoading } = useHeader()

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

        {/* @ts-ignore */}
        <S.Form flexGrow={1} onSubmit={handleSubmit}>
          <Input
            icon={<IoSearch />}
            iconPosition="left"
            placeholder={`${texts.SEARCH}...`}
            id="search-bar"
            aria-label={texts.SEARCH}
            list="search-list"
            autoComplete="off"
            name="search"
            value={search}
            onChange={handleSearch}
            isLoading={isLoading}
          />

          <Datalist id="search-list">
            {options.map((option) => (
              <Option
                key={option.id}
                value={option.name}
                label={option.displayName}
              />
            ))}
          </Datalist>
        </S.Form>
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
