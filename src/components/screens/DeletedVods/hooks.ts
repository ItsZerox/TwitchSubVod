import axios from 'axios'
import { useState } from 'react'
import { IDeletedVods } from '~/@types/IDeletedVods'

export const useDeletedVods = (data: IDeletedVods[]) => {
  const [videosData, setVideosData] = useState(data)

  const getNewVideos = async () => {
    const { data: newVideosData } = await axios.get<IDeletedVods[]>(
      `/api/get-deleted-vods`,
      {
        params: {
          streamer: data[0].name,
          limit: 10,
          offset: videosData.length,
        },
      },
    )

    if (newVideosData?.length) {
      setVideosData([...videosData, ...newVideosData])
    }
  }

  return { videosData, getNewVideos }
}
