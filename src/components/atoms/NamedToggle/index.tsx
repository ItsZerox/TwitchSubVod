import Link from 'next/link'
import * as S from './styles'

interface Button {
  label: string
  value: string
  url: string
  as: string
}

interface NamedToggleProps {
  buttons: Button[]
  defaultSelected: string
}

const NamedToggle = ({ buttons, defaultSelected }: NamedToggleProps) => {
  return (
    <S.NamedToggleContainer>
      {buttons.map((button) => (
        <Link key={button.value} href={button.url} as={button.as} passHref>
          <S.ToggleButton
            key={button.value}
            isActive={button.value === defaultSelected}
            tabIndex={0}
          >
            {button.label}
          </S.ToggleButton>
        </Link>
      ))}
    </S.NamedToggleContainer>
  )
}

export default NamedToggle
