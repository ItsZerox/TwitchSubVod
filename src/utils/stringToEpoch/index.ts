export const stringToEpoch = (date: string) => {
  let epochMs = Math.floor(new Date(date).getTime())

  if (isNaN(epochMs)) {
    throw new Error('Invalid date')
  }

  return epochMs.toString().substring(0, 10)
}
