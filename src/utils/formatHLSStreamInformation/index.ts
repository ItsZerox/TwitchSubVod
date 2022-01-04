import { VideoUrl } from '~/@types/VideoUrl'

export const formatHLSStreamInformation = (
  urlInformation: VideoUrl,
  index: number,
) => {
  const [width, height] = urlInformation.resolution.split('x')
  const widthInt = parseInt(width)
  const heightInt = parseInt(height)
  const bandwidth = widthInt * heightInt * (index + 1)

  return `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${urlInformation.resolution}`
}
