import { IDeletedVods } from '~/@types/IDeletedVods'
import Typography from '~/components/atoms/Typography'
import { useDeletedVodsTable } from './hooks'
import * as S from './styles'

interface DeletedVodsTable {
  videos: IDeletedVods[]
}

export const DeletedVodsTable = ({ videos }: DeletedVodsTable) => {
  const { tableInstance, texts } = useDeletedVodsTable(videos)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  if (!rows.length) {
    return <Typography variant="h5">{texts.STREAMER_NOT_FOUND}</Typography>
  }

  return (
    <S.Table {...getTableProps()}>
      <S.Thead>
        {headerGroups.map((headerGroup) => (
          <S.Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <S.Th
                // @ts-ignore
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render('Header')}
                <span>
                  {/* @ts-ignore */}
                  {column.isSorted ? (column.isSortedDesc ? ' 🔻' : ' 🔺') : ''}
                </span>
              </S.Th>
            ))}
          </S.Tr>
        ))}
      </S.Thead>
      <S.Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <S.Tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <S.Td {...cell.getCellProps()}>{cell.render('Cell')}</S.Td>
                )
              })}
            </S.Tr>
          )
        })}
      </S.Tbody>
    </S.Table>
  )
}
