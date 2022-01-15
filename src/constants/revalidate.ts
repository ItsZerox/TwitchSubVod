import timeInSeconds from './defaultTime'

export default {
  home: timeInSeconds.day * 7,
  video: timeInSeconds.day * 30,
  videos: timeInSeconds.hour * 8,
  deletedVideos: timeInSeconds.hour * 8,
}
