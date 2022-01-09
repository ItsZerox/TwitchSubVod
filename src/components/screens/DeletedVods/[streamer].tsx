import { Skeleton } from '@mui/material'
import InfiniteScroll from 'react-infinite-scroll-component'
import { IDeletedVods } from '~/@types/IDeletedVods'
import { DeletedVodsTable } from '~/components/organisms/DeletedVodsTable'
import ProfilePage from '~/components/templates/ProfilePage'
import { useDeletedVods } from './hooks'

interface DeletedVodsProps {
  videos: IDeletedVods[]
}

const DeletedVods = ({ videos }: DeletedVodsProps) => {
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
    </ProfilePage>
  )
}

export default DeletedVods
