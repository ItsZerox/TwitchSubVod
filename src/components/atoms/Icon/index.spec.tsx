import { render, screen } from '~/lib/testUtils'

import { darkTheme } from '~/layout/theme'
import Icon from '.'
import { FaTwitch } from 'react-icons/fa'

describe('Icon component', () => {
  it('should render correctly', () => {
    const fn = jest.fn()

    render(<Icon onClick={fn} title="Twitch" icon={<FaTwitch />} />)

    const icon = screen.getByRole('button', { name: 'Twitch' })
    expect(icon).toBeInTheDocument()
  })
})
