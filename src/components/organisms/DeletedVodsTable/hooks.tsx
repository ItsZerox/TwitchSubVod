import { useMemo } from 'react'
import { Cell, useSortBy, useTable } from 'react-table'
import { IDeletedVods } from '~/@types/IDeletedVods'
import Button from '~/components/atoms/Button'
import { useGlobal } from '~/contexts/GlobalContext'
import formatDate from '~/utils/formatDate'
import { secondsToHM } from '~/utils/secondsToHM'

export const useDeletedVodsTable = (videos: IDeletedVods[]) => {
  const { texts } = useGlobal()

  const data = useMemo(
    () =>
      videos.map((video) => {
        return {
          date: formatDate(video.streamDate),
          length: secondsToHM(video.length * 60),
          playedGames: video.directories,
          link: video.streamId,
        }
      }),
    [videos],
  )

  const columns = useMemo(() => {
    // todo: add locales texts
    return [
      {
        Header: 'Date',
        accessor: 'date',
      },
      {
        Header: 'Length',
        accessor: 'length',
      },
      {
        Header: 'Played Games',
        accessor: 'playedGames',
        maxWidth: 70,
        minWidth: 70,
        Cell: (props: Cell) =>
          props.value.map((eachValue: any, index: number) => (
            <img
              key={index}
              src={eachValue.image}
              alt={eachValue.name}
              title={eachValue.name}
              className="table-img"
            />
          )),
      },
      {
        Header: 'Link',
        accessor: 'link',
        Cell: (props: Cell) => (
          <Button
            as="a"
            href={`/video/${props.value}`}
            text="Watch now"
            variant="primary"
          />
        ),
      },
    ]
  }, [])

  const tableInstance = useTable(
    {
      // @ts-ignore
      columns,
      data,
    },
    useSortBy,
  )

  return {
    data,
    columns,
    tableInstance,
    texts,
  }
}
