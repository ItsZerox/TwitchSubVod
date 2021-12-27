import { forwardRef } from 'react'
import * as S from './styles'
import { BoxProps } from './types'

interface BoxPropsComponent extends BoxProps {
  children: React.ReactNode
  as?: any
  tabIndex?: number
  boxSize?: string
}

const Box = forwardRef<HTMLDivElement, BoxPropsComponent>(
  (
    {
      alignItems,
      justifyContent,
      flexDirection,
      gap,
      children,
      boxSize,
      ...props
    }: BoxPropsComponent,
    ref,
  ) => {
    return (
      <S.BoxContainer
        alignItems={alignItems}
        justifyContent={justifyContent}
        flexDirection={flexDirection}
        gap={gap}
        boxSize={boxSize}
        ref={ref}
        {...props}
      >
        {children}
      </S.BoxContainer>
    )
  },
)

export default Box
