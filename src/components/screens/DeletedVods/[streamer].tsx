import InfiniteScroll from 'react-infinite-scroll-component'
import { IDeletedVods } from '~/@types/IDeletedVods'
import { DeletedVodsTable } from '~/components/organisms/DeletedVodsTable'
import ProfilePage from '~/components/templates/ProfilePage'
import { useDeletedVods } from './hooks'

interface DeletedVodsProps {
  videos: IDeletedVods[]
}

const DeletedVods = ({ videos }: DeletedVodsProps) => {
  const { videosData, getNewVideos } = useDeletedVods(videos)

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
        hasMore={videosData.length <= 500}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <DeletedVodsTable videos={videosData} />
      </InfiniteScroll>
    </ProfilePage>
  )
}

export default DeletedVods
