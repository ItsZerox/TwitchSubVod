export const getCors = () => {
  const EU_CORS = process.env.NEXT_PUBLIC_CORS_EU as string
  const GLOBAL_CORS = process.env.NEXT_PUBLIC_CORS as string

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)

  const isEU = Intl.DateTimeFormat()
    .resolvedOptions()
    .timeZone.includes('Europe')

  const getRandomUrl = (url: string[]) => {
    const randomIndex = Math.floor(Math.random() * url.length)
    return url[randomIndex]
  }

  if (isIOS) {
    return ''
  }

  if (isEU) {
    return getRandomUrl(EU_CORS.split(','))
  }

  return getRandomUrl(GLOBAL_CORS.split(','))
}
