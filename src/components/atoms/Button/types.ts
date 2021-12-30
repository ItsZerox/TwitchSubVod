export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType
  href?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  text: string
  variant?: 'primary' | 'secondary'
  buttonWidth?: string
  _mobileProps?: {
    buttonWidth?: ButtonProps['buttonWidth']
  }
}
