import { IDeletedVods } from '~/@types/IDeletedVods'
import { IExternalDeletedVodsApi } from '~/@types/IExternalDeletedVodsApi'
import { deletedVodsApiAdapter } from '~/adapters/deletedVodsApiAdapter'
import { getDeletedVodUrls } from '~/lib/getDeletedVodUrls'
import { scraper } from '~/services/config'
import { getStreamerId } from './getStreamerId'
import { uploadToDatabase } from './uploadToDatabase'

interface IGetDeletedVods {
  username: string
  limit?: number
  offset?: number
}

export const getDeletedVods = async ({
  username,
  limit,
  offset,
}: IGetDeletedVods): Promise<IDeletedVods[]> => {
  limit = limit || 30
  offset = offset || 0

  const { data } = await scraper.get(
    `${process.env.DELETED_VODS_HOST}${username}`,
  )

  const streamerId = getStreamerId(data).toString()

  const allVodsResponse = await scraper.get(
    (process.env.DELETED_VODS as string)
      .replace('{{streamerId}}', streamerId)
      .replace('{{offset}}', offset.toString())
      .replace('{{limit}}', limit.toString()),
  )

  const allVods: IExternalDeletedVodsApi[] = allVodsResponse.data.data

  if (!allVods.length) {
    throw new Error('No vods found')
  }

  const streamsObject = await deletedVodsApiAdapter(allVods)

  const streamsPromise = streamsObject.map(async (stream) => {
    const streamUrls = await getDeletedVodUrls({
      streamerName: stream.name,
      vodDate: stream.streamDate,
      vodId: stream.streamId,
    })

    return {
      ...stream,
      streamUrls,
    }
  })

  const uploadedVodsPromise = uploadToDatabase(streamsObject)

  const [streams] = await Promise.all([
    Promise.all(streamsPromise),
    uploadedVodsPromise,
  ])

  return streams.filter((stream) => stream.streamUrls.length)
}
