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

export default api
export { apiV6 }
