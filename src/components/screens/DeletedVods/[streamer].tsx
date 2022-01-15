import { Skeleton } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
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
  const { videosData, getNewVideos, hasMore } = useDeletedVods(videos)

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
        <RemovedUser streamerName={videosData[0].displayName} />
      ) : (
        <InfiniteScroll
          dataLength={videosData.length}
          next={getNewVideos}
          hasMore={hasMore}
          loader={
            <Skeleton
              variant="rectangular"
              animation="wave"
              width={'100%'}
              height={150}
            />
          }
          endMessage={null}
        >
          <DeletedVodsTable videos={videosData} />
        </InfiniteScroll>
      )}
    </ProfilePage>
  )
}

export default DeletedVods
