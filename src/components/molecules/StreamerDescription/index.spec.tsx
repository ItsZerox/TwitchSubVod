import { render, screen } from '~/lib/testUtils'
import StreamerDescription from '.'
import 'jest-styled-components'

const mockedStreamerInformation = {
  displayName: 'xQcOw',
  name: 'xqcow',
  logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/xqcow-profile_image-9298dca608632101-150x150.jpeg',
  followers: 9323989,
  description:
    'Overwatch Professional tank player and full time streamer. EZ Clap',
}

describe('StreamDescription component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <StreamerDescription
        avatarUrl={mockedStreamerInformation.logo}
        name={mockedStreamerInformation.displayName}
        followers={mockedStreamerInformation.followers}
        description={mockedStreamerInformation.description}
      />,
    )

    expect(container).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'xQcOw' })).toHaveAttribute(
      'src',
      mockedStreamerInformation.logo,
    )
  })
})
