import { NextApiRequest, NextApiResponse } from 'next'
import { getDeletedVods } from '~/lib/getDeletedVods'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.headers.origin) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  }

  res.setHeader('Cache-Control', 's-maxage=31536000, stale-while-revalidate')

  const { streamer, limit, offset } = req.query

  if (!streamer || !limit || !offset) {
    res.status(400).json({
      error: 'Bad request',
    })

    return
  }

  const streamerVideos = await getDeletedVods({
    username: streamer as string,
    limit: Number(limit),
    offset: Number(offset) + 1,
  })

  res.status(200).json(streamerVideos)
}

export default handler
