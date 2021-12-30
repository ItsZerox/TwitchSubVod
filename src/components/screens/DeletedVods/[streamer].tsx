import type { NextPage } from 'next'
import { DeletedVodsTable } from '~/components/organisms/DeletedVodsTable'
import ProfilePage from '~/components/templates/ProfilePage'
import { mockedStreamerInformation, videos } from './_mockedData'

const DeletedVods: NextPage = () => {
  return (
    <ProfilePage streamerInformation={mockedStreamerInformation}>
      <DeletedVodsTable />
    </ProfilePage>
  )
}

export default DeletedVods
