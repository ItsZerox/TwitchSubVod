import axios from 'axios'
import { cacheAdapterEnhancer } from 'axios-extensions'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-Id': process.env.NEXT_PUBLIC_TWITCH_GQL_TOKEN as string,
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter!),
})

const apiV6 = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: {
    'Client-Id': process.env.NEXT_PUBLIC_TWITCH_TOKEN as string,
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_AUTH}`,
  },
})

const apiGQL = axios.create({
  baseURL: 'https://gql.twitch.tv/gql',
  headers: {
    'Client-Id': process.env.NEXT_PUBLIC_TWITCH_GQL_TOKEN as string,
    'Content-Type': 'application/json',
  },
})

const scraper = {
  get: async (url: string) => {
    const config = {
      method: 'post',
      url: process.env.SCRAPER_API_URL,
      data: {
        token: process.env.SCRAPER_API_TOKEN,
        url,
      },
    }

    return await axios(config as any)
      .then(function (response) {
        return response
      })
      .catch(function (error) {
        console.log(error)
      })
  },
}

export default api
export { apiV6, scraper, apiGQL }
