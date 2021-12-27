import * as S from './styles'
import { ButtonProps } from './types'

const Button = (props: ButtonProps) => {
  return (
    <S.ButtonContainer {...props}>
      {props.iconPosition === 'left' && props.icon}
      <S.ButtonText>{props.text}</S.ButtonText>
      {props.iconPosition === 'right' && props.icon}
    </S.ButtonContainer>
  )
}

export default Button
