import { useState } from 'react'
import { IVideo } from '~/@types/IVideo'
import { videoAdapter } from '~/adapters/videoAdapter'
import { useGlobal } from '~/contexts/GlobalContext'
import { getTopVideos } from '~/services/api/getTopVideos'

export const useHome = (data: IVideo[]) => {
  const { locale, texts } = useGlobal()

  const [videosData, setVideosData] = useState(data)

  const getNewVideos = async () => {
    const topVideos = await getTopVideos({
      language: locale,
      limit: 8,
      offset: videosData.length,
    })

    const newVideos = topVideos.vods.map(videoAdapter)

    setVideosData([...videosData, ...newVideos])
  }

  return { videosData, getNewVideos, texts }
}
