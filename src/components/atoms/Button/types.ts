export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  text: string
  variant?: 'primary' | 'secondary'
  buttonWidth?: string
  _mobileProps?: {
    buttonWidth?: ButtonProps['buttonWidth']
  }
}
