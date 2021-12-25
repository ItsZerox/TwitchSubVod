import { render, screen } from '~/lib/testUtils'

import { StreamerInformation } from '~/@types/StreamerInformation'
import ProfilePage from '.'
import 'jest-styled-components'
import { useRouter } from '../../../../node_modules/next/router'

const mockedStreamerInformation: StreamerInformation = {
  displayName: 'xQcOw',
  name: 'xqcow',
  logo: 'https://static-cdn.jtvnw.net/jtv_user_pictures/xqcow-profile_image-9298dca608632101-150x150.jpeg',
  followers: 121212,
  description: 'mr. cow is a streamer',
}

jest.mock('../../../../node_modules/next/router')

describe('ProfilePage component', () => {
  it('should render correctly with subonly pathname', () => {
    // @ts-ignore
    useRouter.mockImplementation(() => ({
      pathname: '/videos/xqcow',
    }))

    const { container } = render(
      <ProfilePage streamerInformation={mockedStreamerInformation}>
        Inside content
      </ProfilePage>,
    )

    expect(container).toBeInTheDocument()
    expect(screen.getByText('Inside content')).toBeInTheDocument()
    expect(screen.getByText('Sub only VODs')).toBeInTheDocument()
    expect(screen.getByText('Deleted VODs')).toBeInTheDocument()
  })

  it('should render correctly with deletedvods pathname', () => {
    // @ts-ignore
    useRouter.mockImplementation(() => ({
      pathname: '/deletedvods/xqcow',
    }))

    const { container } = render(
      <ProfilePage streamerInformation={mockedStreamerInformation}>
        Inside content
      </ProfilePage>,
    )

    expect(container).toBeInTheDocument()
    expect(screen.getByText('Inside content')).toBeInTheDocument()
    expect(screen.getByText('Sub only VODs')).toBeInTheDocument()
    expect(screen.getByText('Deleted VODs')).toBeInTheDocument()
  })
})
