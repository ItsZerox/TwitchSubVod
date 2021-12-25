import { render, screen } from '~/lib/testUtils'
import { darkTheme } from '~/layout/theme'
import NamedToggle from '.'
import 'jest-styled-components'

describe('NamedToggle component', () => {
  const title = 'Mr. Cow'
  const src =
    'https://static-cdn.jtvnw.net/jtv_user_pictures/xqcow-profile_image-9298dca608632101-150x150.jpeg'

  it('should render correctly', () => {
    render(
      <NamedToggle
        defaultSelected="subOnly"
        buttons={[
          {
            label: 'Sub only VODs',
            value: 'subOnly',
            url: '/videos/[streamer]',
            as: `/videos/mrcow`,
          },
          {
            label: 'Deleted VODs',
            value: 'deletedVods',
            url: '/deletedvods/[streamer]',
            as: `/deletedvods/mrcow`,
          },
        ]}
      />,
    )

    const subOnlyButton = screen.getByText('Sub only VODs')
    const deletedVodsButton = screen.getByText('Deleted VODs')

    expect(subOnlyButton).toBeInTheDocument()
    expect(deletedVodsButton).toBeInTheDocument()

    expect(subOnlyButton).toHaveStyleRule(
      'background-color',
      darkTheme.colors.pink700,
    )
    expect(deletedVodsButton).toHaveStyleRule(
      'background-color',
      darkTheme.colors.white,
    )
    expect(subOnlyButton).toHaveAttribute('href', '/videos/mrcow')
    expect(deletedVodsButton).toHaveAttribute('href', '/deletedvods/mrcow')
  })
})
