interface IGetCors {
  isIOS: boolean
  isEU: boolean
}

export const getCors = ({ isIOS, isEU }: IGetCors) => {
  const EU_CORS = process.env.NEXT_PUBLIC_CORS_EU as string
  const GLOBAL_CORS = process.env.NEXT_PUBLIC_CORS as string

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
