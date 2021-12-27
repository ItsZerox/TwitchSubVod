import { AiOutlineLoading } from 'react-icons/ai'
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
        >
          {icon}
        </S.InputIcon>
      )}
      <S.InputText {...rest} tabIndex={0} />
      {icon && iconPosition === 'right' && (
        <S.InputIcon
          iconPosition={iconPosition}
          data-testid={`icon-${rest.id}`}
        >
          {icon}
        </S.InputIcon>
      )}
      {props.isLoading && <AiOutlineLoading className="loading-icon" />}
    </S.InputLabel>
  )
}

const Datalist = (props: React.HTMLAttributes<HTMLDataListElement>) => {
  return <S.Datalist {...props} />
}

const Option = (props: React.OptionHTMLAttributes<HTMLOptionElement>) => {
  return <S.Option {...props} />
}

export default Input
export { Datalist, Option }
