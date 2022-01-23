import React from 'react'
import { getTopVideos } from '~/services/api/getTopVideos'

const EXTERNAL_DATA_URL = 'https://pogu.live'

interface Props {
  streamers: string[]
  vods: string[]
}

const createSitemap = ({ streamers, vods }: Props) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://pogu.live/</loc>
      <lastmod>${
        new Date(new Date().toString().split('GMT')[0] + ' UTC')
          .toISOString()
          .split('.')[0]
      }</lastmod>
      <changefreq>daily</changefreq>
      <priority>1</priority>
    </url>
        ${streamers
          .map((streamer) => {
            return `
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/videos/${streamer}`}</loc>
                        <changefreq>daily</changefreq>
                        <priority>0.7</priority>
                    </url>
                    <url>
                        <loc>${`${EXTERNAL_DATA_URL}/deletedvods/${streamer}`}</loc>
                        <changefreq>daily</changefreq>
                        <priority>0.7</priority>
                    </url>
                `
          })
          .join('')}
          ${vods
            .map((vod) => {
              return `
                      <url>
                          <loc>${`${EXTERNAL_DATA_URL}/video/${vod}`}</loc>
                          <changefreq>monthly</changefreq>
                          <priority>0.2</priority>
                      </url>
                  `
            })
            .join('')}
    </urlset>
    `
}

class Sitemap extends React.Component {
  static async getInitialProps({ res }: any) {
    const promises = Array.from(Array(5).keys()).map(async (i) => {
      return getTopVideos({
        limit: 100,
        offset: 100 * i,
      })
    })

    const topVideos = await Promise.all(promises)

    let streamers: string[] = []
    let vods: string[] = []

    topVideos.forEach((videos) => {
      if (!videos) {
        return
      }

      streamers = streamers.concat(videos.map((vod) => vod.owner.login))
      vods = vods.concat(videos.map((vod) => vod.id))
    })

    const dedupedStreamers = streamers.filter(
      (value, index, array) => array.indexOf(value) === index,
    )

    const sitemap = createSitemap({ streamers: dedupedStreamers, vods })

    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()
  }
}

export default Sitemap
