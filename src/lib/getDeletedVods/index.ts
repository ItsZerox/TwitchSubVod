import { IDeletedVods } from '~/@types/IDeletedVods'
import { IExternalDeletedVodsApi } from '~/@types/IExternalDeletedVodsApi'
import { deletedVodsApiAdapter } from '~/adapters/deletedVodsApiAdapter'
import { getDeletedVodUrls } from '~/lib/getDeletedVodUrls'
import { scraper } from '~/services/config'
import { getStreamerId } from './getStreamerId'
import { uploadToDatabase } from './uploadToDatabase'

export const getDeletedVods = async (
  username: string,
  range?: number,
): Promise<IDeletedVods[]> => {
  console.log('1')
  const { data } = await scraper.get(
    `${process.env.DELETED_VODS_HOST}${username}`,
  )

  console.log('2')
  const streamerId = getStreamerId(data)
  console.log('3')

  const allVodsResponse = await scraper.get(
    `${process.env.DELETED_VODS}${range || 2}/${streamerId}${
      process.env.DELETED_VODS_PARAMS
    }`,
  )

  console.log('4')
  const allVods: IExternalDeletedVodsApi[] = allVodsResponse.data.data

  if (!allVods.length) {
    throw new Error('No vods found')
  }

  const streamsObject = await deletedVodsApiAdapter(allVods)

  console.log('5')
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

  console.log('6')
  const uploadedVodsPromise = uploadToDatabase(streamsObject)

  console.log('7')
  const [streams] = await Promise.all([
    Promise.all(streamsPromise),
    uploadedVodsPromise,
  ])

  return streams
}
