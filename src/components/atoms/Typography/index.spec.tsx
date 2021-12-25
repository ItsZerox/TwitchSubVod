import { render, screen } from '~/lib/testUtils'
import Typography from '.'
import { typographyVariants } from './constants'
import 'jest-styled-components'

describe('Typography component', () => {
  it('should render correctly', () => {
    render(
      <>
        {Object.keys(typographyVariants).map((variant) => (
          <Typography
            key={variant}
            variant={variant as keyof typeof typographyVariants}
          >
            {variant}
          </Typography>
        ))}
      </>,
    )

    Object.keys(typographyVariants).forEach((variant) => {
      const Typography = screen.getByText(variant)
      expect(Typography).toHaveStyleRule('color', '#FFFFFF')
      expect(Typography).toHaveStyleRule(
        'font-size',
        typographyVariants[variant as keyof typeof typographyVariants].fontSize,
      )
      expect(Typography).toHaveStyleRule(
        'font-weight',
        typographyVariants[variant as keyof typeof typographyVariants]
          .fontWeight,
      )
      expect(Typography).toHaveStyleRule(
        'line-height',
        typographyVariants[variant as keyof typeof typographyVariants]
          .lineHeight,
      )

      expect(Typography).toBeInTheDocument()
    })
  })

  it('should render correctly with color', () => {
    render(
      <>
        {Object.keys(typographyVariants).map((variant) => (
          <Typography
            key={variant}
            variant={variant as keyof typeof typographyVariants}
            color="#ff6699"
          >
            {variant}
          </Typography>
        ))}
      </>,
    )

    Object.keys(typographyVariants).forEach((variant) => {
      const Typography = screen.getByText(variant)
      expect(Typography).toHaveStyleRule('color', '#ff6699')
      expect(Typography).toBeInTheDocument()
    })
  })
})
