import { render, screen } from '~/lib/testUtils'

import { darkTheme } from '~/layout/theme'
import Box from '.'
import 'jest-styled-components'

describe('Box component', () => {
  it('should render correctly', () => {
    render(<Box>Hello World</Box>)

    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should render correctly custom props', () => {
    render(
      <Box
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gap="10px"
      >
        Hello World
      </Box>,
    )

    expect(screen.getByText('Hello World')).toBeInTheDocument()
    expect(screen.getByText('Hello World')).toHaveStyleRule(
      'align-items',
      'center',
    )
    expect(screen.getByText('Hello World')).toHaveStyleRule(
      'justify-content',
      'center',
    )
    expect(screen.getByText('Hello World')).toHaveStyleRule(
      'flex-direction',
      'column',
    )
    expect(screen.getByText('Hello World')).toHaveStyleRule('gap', '10px')
  })
})
