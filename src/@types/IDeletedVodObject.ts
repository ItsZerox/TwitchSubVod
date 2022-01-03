import { IDirectoriesAdapter } from './IDirectoriesAdapter'

export interface IDeletedVodObject {
  name: string
  displayName: string
  logo: string
  streamId: number
  streamDate: string
  length: number
  directories: IDirectoriesAdapter[]
}
