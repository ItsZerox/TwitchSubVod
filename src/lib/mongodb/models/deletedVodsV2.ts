import { Schema, model, models } from 'mongoose'

interface DeletedVod {
  streamId: number
  streamerName: string
  streamerDisplayName: string
  logo: string
  createdAt: Date
}

const deletedVodsV2Schema = new Schema<DeletedVod>(
  {
    streamId: {
      type: Number,
      required: true,
      unique: true,
    },
    streamerName: {
      type: String,
      required: true,
    },
    streamerDisplayName: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now as any,
      required: true,
    },
  },
  {
    timestamps: false,
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
