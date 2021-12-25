import { render, screen } from '~/lib/testUtils'
import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import VideoButton from '.'
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
  id: '44818023629',
}

describe('VideoButton component', () => {
  it('should render correctly', () => {
    render(
      <VideoButton
        streamerInformation={mockedStreamerInformation}
        vodInformation={mockedVodInformation}
      />,
    )

    const container = screen.getByTestId('44818023629')
    const title = screen.getByText(mockedVodInformation.title)

    expect(container).toBeInTheDocument()
    expect(
      screen.getByTitle(mockedStreamerInformation.displayName),
    ).toHaveAttribute('src', mockedStreamerInformation.logo)
    expect(title).toHaveAttribute('href', '/video/44818023629')
    expect(container).toHaveStyleRule('display', 'flex')
  })

  it('should render correctly without an avatar', () => {
    render(
      <VideoButton
        streamerInformation={mockedStreamerInformation}
        vodInformation={mockedVodInformation}
        noAvatar
      />,
    )

    const container = screen.getByTestId('44818023629')
    const title = screen.getByText(mockedVodInformation.title)

    expect(container).toBeInTheDocument()
    expect(
      screen.queryByTitle(mockedStreamerInformation.displayName),
    ).not.toBeInTheDocument()
    expect(title).toHaveAttribute('href', '/video/44818023629')
    expect(container).toHaveStyleRule('display', 'flex')
  })

  it('should render correctly minimal version', () => {
    render(
      <VideoButton
        streamerInformation={mockedStreamerInformation}
        vodInformation={mockedVodInformation}
        noAvatar
        isMinimal
      />,
    )

    const container = screen.getByTestId('44818023629')
    const title = screen.getByText(mockedVodInformation.title)

    expect(container).toBeInTheDocument()
    expect(title).toHaveAttribute('href', '/video/44818023629')
    expect(container).toHaveStyleRule('display', 'grid')
  })
})
