export const stringToEpoch = (date: string): number => {
  let epochMs = Math.floor(new Date(date).getTime())

  if (isNaN(epochMs)) {
    throw new Error('Invalid date')
  }

  // return epoch in seconds
  return epochMs / 1000
}
