import { render, screen } from '~/lib/testUtils'
import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import StreamDescription from '.'
import 'jest-styled-components'

const mockedStreamerInformation: StreamerInformation = {
  displayName: 'xQcOw',
  name: 'xqcow',
  logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/xqcow-profile_image-9298dca608632101-150x150.jpeg',
}

const mockedVodInformation: VodInformation = {
  title:
    'BIG LONG CLASSIC STREAM (MASTERCHEF FINALE OMG) AND FIVE NIGHTS AT FREDDYS SECURITY BREACH AT MIDNIGHT!!!!&*^&*^$&*^*&^@*&$^#@*&($^@#&*^r*&@',
  thumbnail:
    'https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/efab2dea4b65d725df0e_xqcow_44818023629_1639713975//thumb/thumb0-640x360.jpg',
  duration: 434332,
  viewCount: 30434123,
  date: '2020-12-19T00:00:00+00:00',
  id: '0',
}

describe('StreamDescription component', () => {
  it('should render correctly', () => {
    const { container } = render(
      <StreamDescription
        streamerInformation={mockedStreamerInformation}
        vodInformation={mockedVodInformation}
      />,
    )

    expect(container).toBeInTheDocument()
    expect(
      screen.getByTitle(mockedStreamerInformation.displayName),
    ).toHaveAttribute('src', mockedStreamerInformation.logo)
  })

  it('should render without avatar image', () => {
    const { container } = render(
      <StreamDescription
        streamerInformation={mockedStreamerInformation}
        vodInformation={mockedVodInformation}
        noAvatar
      />,
    )

    expect(container).toBeInTheDocument()
    expect(
      screen.queryByTitle(mockedStreamerInformation.displayName),
    ).not.toBeInTheDocument()
  })

  it('should render with custom avatar width', () => {
    const { container } = render(
      <StreamDescription
        streamerInformation={mockedStreamerInformation}
        vodInformation={mockedVodInformation}
        avatarWidth="100px"
      />,
    )

    expect(container).toBeInTheDocument()
    expect(
      screen.queryByTitle(mockedStreamerInformation.displayName),
    ).toHaveStyleRule('width', '100px')
  })

  it('should render with an url in the whole container', () => {
    const { container } = render(
      <StreamDescription
        streamerInformation={mockedStreamerInformation}
        vodInformation={mockedVodInformation}
        urlProps={{
          href: '/video/44818023629',
          as: '/video/44818023629',
        }}
      />,
    )

    const title = screen.getByText(mockedVodInformation.title)
    const name = screen.getByText(mockedStreamerInformation.displayName)

    expect(container).toBeInTheDocument()

    expect(title).toHaveAttribute('href', '/video/44818023629')
    expect(name).toHaveAttribute('href', '/videos/xqcow')
  })
})
