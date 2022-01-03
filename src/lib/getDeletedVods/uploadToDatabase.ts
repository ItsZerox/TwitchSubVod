import { IDeletedVodSchema } from '~/@types/DeletedVodSchema'
import { IDeletedVodObject } from '~/@types/IDeletedVodObject'
import connectDB from '~/lib/mongodb/mongodbConnect'
import deletedVodsV2 from '../mongodb/models/deletedVodsV2'

export const uploadToDatabase = async (
  deletedVodsObjects: IDeletedVodObject[],
) => {
  const data: IDeletedVodSchema[] = deletedVodsObjects.map((deletedVod) => ({
    name: deletedVod.name,
    displayName: deletedVod.displayName,
    logo: deletedVod.logo,
    streamId: deletedVod.streamId,
    streamDate: deletedVod.streamDate,
  }))

  await connectDB()

  await deletedVodsV2
    .insertMany(data, {
      ordered: false,
    })
    .catch((error) => {})
}
