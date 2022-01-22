export interface IGQLTwitchVideo {
  id: string
  previewThumbnailURL: string
  createdAt: string
  lengthSeconds: number
  title: string
  viewCount: number
  owner: {
    displayName: string
    login: string
    description: string
    profileImageURL: string
    followers: {
      totalCount: number
    }
  }
}
