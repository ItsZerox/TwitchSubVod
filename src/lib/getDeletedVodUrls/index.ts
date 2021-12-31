import axios from 'axios'
import { createHash } from 'crypto'
import { stringToEpoch } from '~/utils/stringToEpoch'

export interface IGetDeletedVodUrls {
  streamerName: string
  vodId: number
  vodDate: string
}

export const getDeletedVodUrls = async ({
  streamerName,
  vodId,
  vodDate,
}: IGetDeletedVodUrls) => {
  if (!streamerName || !vodId || !vodDate) {
    throw new Error('Missing required params')
  }

  const hosts = process.env.TWITCH_HOSTS?.split(',') as string[]

  const epochTime = Number(stringToEpoch(vodDate))
  const splitString = [streamerName.toLowerCase(), vodId, epochTime].join('_')

  const sha1String = createHash('sha1')
    .update(splitString)
    .digest('hex')
    .substring(0, 20)

  const id = [sha1String, splitString].join('_')

  const fullLinks = hosts.map((host) =>
    [host, id, 'chunked', 'index-dvr.m3u8'].join('/'),
  )

  const promises = fullLinks.map(async (link) => {
    try {
      const response = await axios.head(link)
      if ([200, 304].includes(response.status)) {
        return link
      }
    } catch (error) {}
  })

  const link = await Promise.all(promises)

  return link.filter((l) => l) as string[]
}
