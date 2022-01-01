import { prisma } from '../prisma'
import { IDeletedVods } from '~/@types/IDeletedVods'

export const uploadToDatabase = async (
  streams: IDeletedVods[],
): Promise<IDeletedVods[]> => {
  const databaseData = streams
    .map((stream) => {
      return stream.streamUrls.map((streamUrl) => {
        return {
          streamerName: stream.name,
          displayName: stream.displayName,
          logo: stream.logo,
          streamId: stream.streamId,
          url: streamUrl,
          createdAt: stream.streamDate,
          length: stream.length,
          directories: stream.directories,
        }
      })
    })
    .flat()

  // todo: insert the other data and relations
  await prisma.deletedVod.createMany({
    data: databaseData.map((data) => {
      return {
        streamerName: data.streamerName,
        length: data.length,
        url: data.url,
        streamId: data.streamId,
        createdAt: data.createdAt,
      }
    }),
    skipDuplicates: true,
  })

  return streams
}
