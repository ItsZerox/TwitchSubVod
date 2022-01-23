import { useEffect, useState } from 'react'
import { IVideo } from '~/@types/IVideo'
import { videoAdapter } from '~/adapters/videoAdapter'
import localStorageKeys, {
  IWatchedVod,
  IWatchedVods,
} from '~/constants/localStorageKeys'
import { useGlobal } from '~/contexts/GlobalContext'
import { getTopVideos } from '~/services/api/getTopVideos'

export const useHome = (data: IVideo[]) => {
  const [videosData, setVideosData] = useState(data)
  const [watchedVideosData, setWatchedVideosData] = useState<
    IWatchedVod[] | null
  >(null)
  const { locale, texts } = useGlobal()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStorageWatchedVods = JSON.parse(
        localStorage.getItem(localStorageKeys.watchedVods) || '[]',
      ) as IWatchedVods

      const watchedVideosData = Object.values(localStorageWatchedVods)

      const sortedWatchedVideosData = watchedVideosData.sort(
        (a, b) => Number(b.expireDate) - Number(a.expireDate),
      )

      const firstEightWatchVideosData = sortedWatchedVideosData.slice(0, 8)

      setWatchedVideosData(firstEightWatchVideosData)
    }
  }, [])

  const getNewVideos = async () => {
    const topVideos = await getTopVideos({
      language: locale,
      limit: 8,
      offset: videosData.length,
    })

    const newVideos = topVideos?.map(videoAdapter)

    if (!newVideos?.length) {
      return
    }

    setVideosData([...videosData, ...newVideos])
  }

  return { videosData, texts, watchedVideosData }
}
