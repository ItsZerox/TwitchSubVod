import { render, screen } from '~/lib/testUtils'

import { darkTheme } from '~/layout/theme'
import Header from '.'

describe('Header component', () => {
  it('should render correctly', () => {
    render(<Header />)

    const hamburgerMenu = screen.getByRole('button', { name: 'Open menu' })
    const logo = screen.getByRole('img', { name: 'pogu.live' })
    expect(hamburgerMenu).toBeInTheDocument()
    expect(logo).toBeInTheDocument()
  })
})
