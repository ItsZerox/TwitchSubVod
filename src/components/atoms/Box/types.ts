export interface BoxProps {
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit'
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'initial'
    | 'inherit'
  flexDirection?:
    | 'row'
    | 'row-reverse'
    | 'column'
    | 'column-reverse'
    | 'initial'
    | 'inherit'
  gap?: string
  tabIndex?: number
  boxSize?: string
  hideInMobile?: boolean
  _mobileProps?: {
    alignItems?: BoxProps['alignItems']
    justifyContent?: BoxProps['justifyContent']
    flexDirection?: BoxProps['flexDirection']
    gap?: BoxProps['gap']
    boxSize?: BoxProps['boxSize']
  }
}
