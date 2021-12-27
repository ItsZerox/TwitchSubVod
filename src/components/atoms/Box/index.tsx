import { forwardRef } from 'react'
import * as S from './styles'
import { BoxProps } from './types'

interface BoxPropsComponent extends BoxProps {
  children: React.ReactNode
  as?: any
}

const Box = forwardRef<HTMLDivElement, BoxPropsComponent>(
  ({ children, as, ...props }: BoxPropsComponent, ref) => {
    return (
      <S.BoxContainer as={as} ref={ref} {...props}>
        {children}
      </S.BoxContainer>
    )
  },
)

export default Box
