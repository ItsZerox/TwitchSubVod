import type { NextPage } from 'next'
import Box from '~/components/atoms/Box'
import ProfilePage from '~/components/templates/ProfilePage'
import { mockedStreamerInformation, videos } from './_mockedData'

const DeletedVods: NextPage = () => {
  return (
    <ProfilePage streamerInformation={mockedStreamerInformation}>
      <Box>Test</Box>
    </ProfilePage>
  )
}

export default DeletedVods
