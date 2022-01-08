import { IDeletedVods } from '~/@types/IDeletedVods'
import { DeletedVodsTable } from '~/components/organisms/DeletedVodsTable'
import ProfilePage from '~/components/templates/ProfilePage'

interface DeletedVodsProps {
  videos: IDeletedVods[]
}

const DeletedVods = ({ videos }: DeletedVodsProps) => {
  const streamerInformation = {
    displayName: videos[0].displayName,
    name: videos[0].name,
    logo: videos[0].logo,
    description: '',
    followers: 0,
  }

  return (
    <ProfilePage streamerInformation={streamerInformation}>
      <DeletedVodsTable videos={videos} />
    </ProfilePage>
  )
}

export default DeletedVods
