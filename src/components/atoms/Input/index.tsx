import { useRef } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import { IoSearch } from 'react-icons/io5'
import * as S from './styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
  buttonHref?: string
}

const Input = (props: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { icon, iconPosition, ...rest } = props

  return (
    <S.InputLabel
      data-testid={`label-${props.id}`}
      onClick={() => inputRef.current?.focus()}
    >
      {icon && iconPosition === 'left' && (
        <S.InputIcon
          iconPosition={iconPosition}
          data-testid={`icon-${rest.id}`}
          className="left-icon"
        >
          {icon}
        </S.InputIcon>
      )}
      <S.InputText ref={inputRef} {...rest} tabIndex={0} />

      {props.isLoading && <AiOutlineLoading className="loading-icon" />}
      <InputButton
        href={props?.buttonHref || '/'}
        disabled={props.buttonHref === '/videos'}
        className="search-button"
        type="submit"
        aria-label={props.placeholder}
        title={props.placeholder}
      />
    </S.InputLabel>
  )
}

export const InputButton = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    disabled?: boolean
  },
) => {
  const isIOS =
    typeof window !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent)
      ? true
      : false

  return (
    <S.InputButton isIOS={isIOS} {...props}>
      <IoSearch />
    </S.InputButton>
  )
}

export default Input
