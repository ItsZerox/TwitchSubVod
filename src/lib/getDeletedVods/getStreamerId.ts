import cheerio from 'cheerio'

export const getStreamerId = (data: any) => {
  const $ = cheerio.load(data)

  const pageDataBlock = $('script')
    .get()
    .map((script) => $(script).html())
    .filter((script) => script?.includes('PageInfo'))[0] as string

  const pageInfo = pageDataBlock?.match(/PageInfo = (.*);/) as RegExpMatchArray

  const parsedPageInfo = JSON.parse(
    pageInfo[0].replace('PageInfo = ', '')?.replace(/\;/g, ''),
  )

  return parsedPageInfo.id as number
}
