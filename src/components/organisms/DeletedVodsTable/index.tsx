import { useDeletedVodsTable } from './hooks'
import * as S from './styles'

export const DeletedVodsTable = () => {
  const { tableInstance } = useDeletedVodsTable()

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

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
