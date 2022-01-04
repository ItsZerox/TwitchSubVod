import { VideoUrl } from '~/@types/VideoUrl'
import { formatHLSStreamInformation } from '../formatHLSStreamInformation'

export const createHLSResponse = (videoUrls: VideoUrl[]) => {
  return `#EXTM3U
#EXT-X-VERSION:3
${videoUrls
  .map(
    (videoUrl, index) => `${formatHLSStreamInformation(videoUrl, index)}
${videoUrl.url}`,
  )
  .join('\n\n')}
`
}
