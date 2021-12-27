import { render, screen } from '~/lib/testUtils'
import Header from '.'
import { useRouter } from '../../../../node_modules/next/router'

jest.mock('next/router')

describe('Header component', () => {
  it('should render correctly', () => {
    ;(useRouter as jest.Mock).mockReturnValue({
      asPath: '/',
    })

    render(<Header />)

    const hamburgerMenu = screen.getByRole('button', { name: 'Open menu' })
    const logo = screen.getByRole('img', { name: 'pogu.live' })
    expect(hamburgerMenu).toBeInTheDocument()
    expect(logo).toBeInTheDocument()
  })
})
