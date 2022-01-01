import { IDirectoriesAdapter } from '~/@types/IDirectoriesAdapter'

export const directoriesAdapter = (
  directoriesAdapter: string,
): IDirectoriesAdapter[] => {
  const dataArray = directoriesAdapter.split('|')

  let returnedArray: IDirectoriesAdapter[] = []

  for (let i = 0; i < dataArray.length; i += 3) {
    returnedArray.push({
      name: dataArray[i],
      image: dataArray[i + 2],
    })
  }
  return returnedArray
}
