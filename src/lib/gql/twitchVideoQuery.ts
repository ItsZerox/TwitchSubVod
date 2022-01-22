export const twitchVideoQuery = `
  id
  previewThumbnailURL(height: 180, width: 320)
  createdAt
  lengthSeconds
  title
  viewCount
  owner {
    displayName
    login
    description
    profileImageURL(width: 150)
    followers {
      totalCount
    }
  }
`
