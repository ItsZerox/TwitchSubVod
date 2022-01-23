import { useEffect, useState } from 'react'
import { IVideo } from '~/@types/IVideo'
import { videoAdapter } from '~/adapters/videoAdapter'
import { getStreamerVideos } from '~/services/api/getStreamerVideos'

export const useVideos = (data: IVideo[]) => {
  const [videosData, setVideosData] = useState(data)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    setVideosData(data)
  }, [data])

  const getNewVideos = async () => {
    const streamerVideos = await getStreamerVideos({
      streamerName: data[0].streamerInformation.name,
      limit: 8,
    })

    const newVideos = streamerVideos?.map(videoAdapter)

    if (newVideos?.length) {
      setVideosData([...videosData, ...newVideos])
    } else {
      setHasMore(false)
    }
  }

  const streamerInformation = data.length ? data[0].streamerInformation : null

  return { videosData, streamerInformation }
}
