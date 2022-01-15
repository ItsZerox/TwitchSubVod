// Source: Adapted from https://greasyfork.org/en/scripts/420212-twitch-vod-unblocker/code

import { Resolutions } from '~/@types/ITwitchCommons'
import { ITwitchVideo } from '~/@types/ITwitchVideo'
import { VideoUrl } from '~/@types/VideoUrl'

const THUMBNAIL_TO_ID_REGEX = /^https?:\/\/(?:[\w\.\/]+)\/(.+)\/storyboards/

const getVideoResolutions = (video: ITwitchVideo): Resolutions => {
  const keys = Object.keys(video.resolutions) as Array<keyof Resolutions>

  if (keys.length === 1) {
    return video.resolutions
  }

  keys.pop()

  const resolutions: Resolutions = {}

  keys.forEach((key, index: number) => {
    // @ts-ignore
    resolutions[key] = video.resolutions[keys[index]]
  })

  if (resolutions['720p30'] && resolutions['720p60']) {
    delete resolutions['720p60']
  }

  return resolutions
}

const getVideoHostUrl = (video: ITwitchVideo) => {
  const fullUrl = new URL(video.animated_preview_url)
  return fullUrl.hostname
}

const getChannelName = (video: ITwitchVideo) => video.channel.name
const getVideoPartId = (video: ITwitchVideo) => {
  const thumbnailUrl = video.animated_preview_url
  const matched = thumbnailUrl.match(THUMBNAIL_TO_ID_REGEX) as RegExpMatchArray
  return matched[1]
}

const getUploadedVideoUrls = (video: ITwitchVideo) => {
  const videoId = video._id.replace('v', '')
  const resolutions = getVideoResolutions(video)
  const hostUrl = getVideoHostUrl(video)
  const partId = getVideoPartId(video)
  const channelName = getChannelName(video)
  return Object.entries(resolutions).map(([resolutionForUrl, resolution]) => ({
    resolution,
    url: `https://${hostUrl}/${channelName}/${videoId}/${partId}/${resolutionForUrl}/index-dvr.m3u8`,
  })) as VideoUrl[]
}

const getBroadcastArchiveUrls = (video: ITwitchVideo) => {
  const resolutions = getVideoResolutions(video)
  const hostUrl = getVideoHostUrl(video)
  const partId = getVideoPartId(video)
  return Object.entries(resolutions).map(([resolutionForUrl, resolution]) => ({
    resolution,
    url: `https://${hostUrl}/${partId}/${resolutionForUrl}/index-dvr.m3u8`,
  })) as VideoUrl[]
}

const getHighlightUrls = (video: ITwitchVideo) => {
  const videoId = video._id.replace('v', '')
  const resolutions = getVideoResolutions(video)
  const hostUrl = getVideoHostUrl(video)
  const partId = getVideoPartId(video)
  return Object.entries(resolutions).map(([resolutionForUrl, resolution]) => ({
    resolution,
    url: `https://${hostUrl}/${partId}/${resolutionForUrl}/highlight-${videoId}.m3u8`,
  })) as VideoUrl[]
}

export const getUrlsFromVideo = (video: ITwitchVideo) => {
  switch (video.broadcast_type) {
    case 'highlight':
      return getHighlightUrls(video)
    case 'upload':
      return getUploadedVideoUrls(video)
    case 'archive':
    default:
      return getBroadcastArchiveUrls(video)
  }
}
