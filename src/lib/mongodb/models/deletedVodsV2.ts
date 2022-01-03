import { Schema, model, models } from 'mongoose'
import { IDeletedVodSchema } from '~/@types/DeletedVodSchema'

const deletedVodsV2Schema = new Schema<IDeletedVodSchema>(
  {
    streamId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    streamDate: {
      type: String,
      default: Date.now().toString(),
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

if (process.env.NODE_ENV === 'development') {
  /**
   * When nextjs recompiles in dev mode it tries to recompile the model too, which causes an error of model overwrite
   */
  // @ts-ignore
  models = {}
}

export default models.DeletedVodsV2 ||
  model('DeletedVodsV2', deletedVodsV2Schema)
