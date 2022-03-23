export const twitchVideoQuery = `
  id
  previewThumbnailURL(height: 180, width: 320)
  createdAt
  lengthSeconds
  title
  viewCount
  owner {
    id
    displayName
    login
    description
    profileImageURL(width: 150)
    followers {
      totalCount
    }
  }
`
