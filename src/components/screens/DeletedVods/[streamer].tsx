import { IDeletedVods } from '~/@types/IDeletedVods'
import RemovedUser from '~/components/atoms/RemovedUser'
import { DeletedVodsTable } from '~/components/organisms/DeletedVodsTable'
import ProfilePage from '~/components/templates/ProfilePage'
import { useDeletedVods } from './hooks'

interface DeletedVodsProps {
  videos: IDeletedVods[]
  isUserRemoved: boolean
}

const DeletedVods = ({ videos, isUserRemoved }: DeletedVodsProps) => {
  const { videosData } = useDeletedVods(videos)

  const streamerInformation = {
    displayName: videos[0].displayName,
    name: videos[0].name,
    logo: videos[0].logo,
    description: '',
    followers: 0,
  }

  return (
    <ProfilePage streamerInformation={streamerInformation}>
      {isUserRemoved && typeof window !== undefined ? (
        <RemovedUser />
      ) : (
        <DeletedVodsTable videos={videosData} />
      )}
    </ProfilePage>
  )
}

export default DeletedVods
