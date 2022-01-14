import { VideoUrl } from '~/@types/VideoUrl'
import { scraper } from '~/services/config'

export const getQualitiesFromUrl = async (url: string): Promise<VideoUrl[]> => {
  const qualities = ['720p60', '720p30', '480p30', '360p30', '160p30']
  const resolutions = ['1280x720', '1280x720', '852x480', '640x360', '284x160']

  const promises = qualities.map((quality) => {
    const newUrl = url.replace('chunked', quality)
    return scraper.head(newUrl)
  })

  const availableUrls = await Promise.allSettled(promises)

  let urlObjects = availableUrls.map((response, index) => {
    if (response.status === 'fulfilled') {
      return {
        resolution: resolutions[index + 1],
        url: url.replace('chunked', qualities[index]),
      }
    }

    return null
  })

  if (urlObjects.length > 1) {
    delete urlObjects[urlObjects.length - 1]
  }

  urlObjects = urlObjects.filter((urlObjects) => urlObjects !== null)

  if (urlObjects.length === 0) {
    return [
      {
        resolution: '1920x1080',
        url: url,
      },
    ]
  }

  return urlObjects as VideoUrl[]
}
