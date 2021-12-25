import { render, screen } from '~/lib/testUtils'
import VideoThumbnail from '.'

describe('VideoThumbnail component', () => {
  const title = 'Mr. Cow'
  const src =
    'https://static-cdn.jtvnw.net/cf_vods/d1m7jfoe9zdc1j/efab2dea4b65d725df0e_xqcow_44818023629_1639713975//thumb/thumb0-640x360.jpg'

  it('should render correctly', () => {
    render(<VideoThumbnail title={title} src={src} />)

    const videoThumbnail = screen.getByRole('img', { name: title })
    expect(videoThumbnail).toBeInTheDocument()
  })

  it('should render correctly with custom width', () => {
    render(<VideoThumbnail title={title} src={src} width="228px" />)

    const videoThumbnail = screen.getByRole('img', { name: title })
    expect(videoThumbnail).toBeInTheDocument()
  })
})
