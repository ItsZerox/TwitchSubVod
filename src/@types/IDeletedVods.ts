import { IDirectoriesAdapter } from './IDirectoriesAdapter'

export interface IDeletedVods {
  streamUrls: string[]
  name: string
  displayName: string
  logo: string
  streamId: number
  streamDate: string
  length: number
  directories: IDirectoriesAdapter[]
}
