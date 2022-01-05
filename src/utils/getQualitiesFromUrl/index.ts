import { VideoUrl } from '~/@types/VideoUrl'
import { scraper } from '~/services/config'

export const getQualitiesFromUrl = async (url: string): Promise<VideoUrl[]> => {
  const defaultUrlObject = {
    url,
    resolution: '1920x1080',
  }

  const qualities = ['720p60', '720p30', '480p30', '360p30', '160p30']
  const resolutions = ['1280x720', '1280x720', '852x480', '640x360', '284x160']

  const promises = qualities.map((quality) => {
    const newUrl = url.replace('chunked', quality)
    return scraper.head(newUrl)
  })

  const availableUrls = await Promise.allSettled(promises)

  let urlObject = availableUrls.map((response, index) => {
    if (response.status === 'fulfilled') {
      return {
        resolution: resolutions[index],
        url: url.replace('chunked', qualities[index]),
      }
    }

    return null
  })

  urlObject = urlObject.filter((urlObject) => urlObject !== null)

  return urlObject.concat(defaultUrlObject) as VideoUrl[]
}