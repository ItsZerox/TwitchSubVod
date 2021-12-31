export interface IPlayedGamesAdapter {
  name?: string
  image?: string
}

export const playedGamesAdapter = (
  playedGames: string,
): IPlayedGamesAdapter[] => {
  const dataArray = playedGames.split('|')

  let returnedArray: IPlayedGamesAdapter[] = []

  for (let i = 0; i < dataArray.length; i += 3) {
    returnedArray.push({
      name: dataArray[i],
      image: dataArray[i + 2],
    })
  }
  return returnedArray
}
