import { NextApiRequest, NextApiResponse } from 'next'
import { ITwitchVideo } from '~/@types/ITwitchVideo'
import { VideoUrl } from '~/@types/VideoUrl'
import api from '~/services/config'
import { getCors } from '~/utils/getCors'
import { getUrlsFromVideo } from '~/utils/getUrlFromVideo/getUrlsFromVideo'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.origin) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  }

  console.log(req.headers)

  const id = req.query.id[0] as string
  const { data } = await api.get<ITwitchVideo>(
    `/videos/${id.replace('.m3u8', '')}`,
  )
  const urls = getUrlsFromVideo(data)

  res.setHeader('Content-Type', 'binary/octet-stream')
  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')

  const formatStreamInformation = (urlInformation: VideoUrl, index: number) => {
    const [width, height] = urlInformation.resolution.split('x')
    const widthInt = parseInt(width)
    const heightInt = parseInt(height)
    const bandwidth = widthInt * heightInt * (index + 1)

    return `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${urlInformation.resolution}`
  }

  const cors = getCors({ isIOS: false, isEU: false })

  res.write(`#EXTM3U
#EXT-X-VERSION:3
${urls
  .map(
    (url, index) => `${formatStreamInformation(url, index)}
${cors + url.url}`,
  )
  .join('\n\n')}
`)

  res.end()
}

export default handler
