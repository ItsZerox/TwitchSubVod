import { forwardRef } from 'react'
import * as S from './styles'

interface IconProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: JSX.Element
  onClick?: () => void
  title: string
  isButton?: boolean
  as?: any
  ref?: any
  href?: string
  target?: string
  rel?: string
}

const Icon = forwardRef<HTMLButtonElement, IconProps>(
  (props: IconProps, ref) => {
    const { icon, onClick, title, isButton, ...rest } = props
    return (
      <S.IconButton
        onClick={onClick}
        aria-label={title}
        title={title}
        isButton={isButton}
        ref={ref}
        {...rest}
      >
        {icon}
      </S.IconButton>
    )
  },
)

export default Icon
