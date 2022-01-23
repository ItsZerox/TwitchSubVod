export const getUrlsFromVideo = (
  animatedPreviewUrl: string,
  isHighlight?: boolean,
  id?: string,
) => {
  const fullUrl = new URL(animatedPreviewUrl)
  const hostUrl = fullUrl.hostname
  const cleanedPath = fullUrl.pathname.replace(/\/storyboards.*/, '')

  if (isHighlight) {
    return `https://${hostUrl}${cleanedPath}/chunked/highlight-${id}.m3u8`
  }

  return `https://${hostUrl}${cleanedPath}/chunked/index-dvr.m3u8`
}
