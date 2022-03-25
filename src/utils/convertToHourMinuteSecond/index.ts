export const convertToHourMinuteSecond = (seconds: number) => {
  const hour = Math.floor(seconds / 3600)
  const minute = Math.floor((seconds % 3600) / 60)
  const second = Math.floor((seconds % 3600) % 60)

  const prettyHour = hour
  const prettyMinute = minute < 10 ? `0${minute}` : minute
  const prettySecond = second < 10 ? `0${second}` : second

  if (hour === 0) {
    return `${prettyMinute}:${prettySecond}`
  }

  return `${prettyHour}:${prettyMinute}:${prettySecond}`
}
