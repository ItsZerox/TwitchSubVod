import { NextApiRequest, NextApiResponse } from 'next'
import { IDeletedVodSchema } from '~/@types/DeletedVodSchema'
import { ITwitchVideo } from '~/@types/ITwitchVideo'
import { getDeletedVodUrls } from '~/lib/getDeletedVodUrls'
import deletedVodsV2 from '~/lib/mongodb/models/deletedVodsV2'
import dbConnect from '~/lib/mongodb/mongodbConnect'
import { apiGQL } from '~/services/config'
import { createHLSResponse } from '~/utils/createHLSResponse'
import { getQualitiesFromUrl } from '~/utils/getQualitiesFromUrl'
import { getUrlsFromVideo } from '~/utils/getUrlFromVideo/getUrlsFromVideo'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.origin) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  }

  const dirtyId = req.query.id[0] as string
  const id = dirtyId.replace('.m3u8', '')

  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')
  res.setHeader('Content-Type', 'binary/octet-stream')

  if (id.length > 10) {
    await dbConnect()

    const deletedVod: IDeletedVodSchema = await deletedVodsV2.findOne({
      streamId: id,
    })

    const foundUrls = await getDeletedVodUrls({
      streamerName: deletedVod.name,
      vodDate: deletedVod.streamDate,
      vodId: id,
    })

    const urlsObjectPromise = foundUrls.map(async (url) => {
      return getQualitiesFromUrl(url)
    })

    const urlsObject = await Promise.all(urlsObjectPromise)

    if (!urlsObject.flat().length) {
      res.status(404).json({ error: true, message: 'Not found' })
      return
    }

    res.write(createHLSResponse(urlsObject[0]))

    res.end()
    return
  }

  const { data } = await apiGQL.post('', {
    query: `
      query {
        video(id: "${id}") {
          animatedPreviewURL
          broadcastType
        }
      }
    `,
  })

  if (!data?.data?.video) {
    res.setHeader('Content-Type', 'application/json')

    res.status(404).json({ error: true, message: 'Not found' })
    return
  }

  const { animatedPreviewURL, broadcastType } = data.data.video || {}

  const url = getUrlsFromVideo(
    animatedPreviewURL,
    broadcastType === 'HIGHLIGHT',
    id,
  )

  const urls = await getQualitiesFromUrl(url)

  if (!urls.flat().length) {
    res.setHeader('Content-Type', 'application/json')

    res.status(404).json({ error: true, message: 'Not found' })
    return
  }

  res.write(createHLSResponse(urls))

  res.end()
}

export default handler
