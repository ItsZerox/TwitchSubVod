import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-Id': process.env.NEXT_PUBLIC_TWITCH_TOKEN as string,
  },
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

const scraper = axios.create({
  headers: {
    origin: 'null',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': '*',
  },
})

export default api
export { apiV6, scraper, apiGQL }
