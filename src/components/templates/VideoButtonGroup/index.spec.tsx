import { render, screen } from '~/lib/testUtils'

import { StreamerInformation } from '~/@types/StreamerInformation'
import { VodInformation } from '~/@types/VodInformation'
import { darkTheme } from '~/layout/theme'
import VideoButtonGroup from '.'
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

const videos = Array.from({ length: 10 }).map((_, index) => ({
  streamerInformation: mockedStreamerInformation,
  vodInformation: {
    ...mockedVodInformation,
    id: index.toString(),
  },
}))

describe('VideoButton component', () => {
  it('should render correctly', () => {
    const { container } = render(<VideoButtonGroup videos={videos} />)

    expect(container).toBeInTheDocument()
  })
})
