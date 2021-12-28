import { render, screen } from '~/lib/testUtils'
import ShareButtons from '.'
import 'jest-styled-components'
import { useRouter } from '../../../../node_modules/next/router'

jest.mock('next/router')

describe('ShareButtons component', () => {
  ;(useRouter as jest.Mock).mockReturnValue({
    asPath: '/video/32321321',
  })

  it('should render correctly', () => {
    render(<ShareButtons titleText="title text" shareUrl="pogu.live" />)

    const shareButtons = screen.getByText(/Share this video/i)

    expect(shareButtons).toBeInTheDocument()
  })
})
