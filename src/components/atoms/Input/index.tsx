import { AiOutlineLoading } from 'react-icons/ai'
import { IoSearch } from 'react-icons/io5'
import * as S from './styles'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
}

const Input = (props: InputProps) => {
  const { icon, iconPosition, ...rest } = props

  return (
    <S.InputLabel htmlFor={props.id} data-testid={`label-${props.id}`}>
      {icon && iconPosition === 'left' && (
        <S.InputIcon
          iconPosition={iconPosition}
          data-testid={`icon-${rest.id}`}
          className="left-icon"
        >
          {icon}
        </S.InputIcon>
      )}
      <S.InputText {...rest} tabIndex={0} />

      {props.isLoading && <AiOutlineLoading className="loading-icon" />}
      <InputButton className="search-button" type="submit" />
    </S.InputLabel>
  )
}

const Datalist = (props: React.HTMLAttributes<HTMLDataListElement>) => {
  return <S.Datalist {...props} />
}

const Option = (props: React.OptionHTMLAttributes<HTMLOptionElement>) => {
  return <S.Option {...props} />
}

export const InputButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) => {
  return (
    <S.InputButton {...props}>
      <IoSearch />
    </S.InputButton>
  )
}

export default Input
export { Datalist, Option }
