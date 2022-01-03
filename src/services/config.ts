import axios from 'axios'
import UserAgent from 'user-agents'

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

const scraper = axios.create({
  headers: {
    'User-Agent': new UserAgent().toString(),
  },
})

export default api
export { apiV6, scraper }
