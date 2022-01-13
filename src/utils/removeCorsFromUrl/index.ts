export const removeCorsFromUrl = (url: string) => {
  const corsRegex = /https:\/\/(.*)\/https:\/\//
  const cors = corsRegex.exec(url)

  if (cors) {
    return url.replace(corsRegex, 'https://')
  }

  return url
}
