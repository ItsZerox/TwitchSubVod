export interface IWatchedVod {
  id: string
  title: string
  streamerName: string
  streamerLogoUrl: string
  thumbnailUrl?: string
  expireDate: string
  time: number
  totalVodTime: number
}

export interface IWatchedVods {
  [key: string]: IWatchedVod
}

const localStorageKeys = {
  watchedVods: 'watchedVods',
}

export default localStorageKeys
