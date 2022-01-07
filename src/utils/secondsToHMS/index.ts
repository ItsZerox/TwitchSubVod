export const secondsToHMS = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  const secondsLeft = seconds - hours * 3600 - minutes * 60

  return `${hours > 0 ? `${hours}:` : ''}${
    hours > 0 && minutes < 10 ? `0${minutes}:` : `${minutes}:`
  }${secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}`
}
