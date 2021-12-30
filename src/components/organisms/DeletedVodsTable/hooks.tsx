import { useMemo } from 'react'
import { Cell, useSortBy, useTable } from 'react-table'
import Button from '~/components/atoms/Button'
import formatDate from '~/utils/formatDate'

export const useDeletedVodsTable = () => {
  const data = useMemo(
    () => [
      {
        date: formatDate('2021-10-22T23:15:14.000+00:00'),
        length: '179',
        playedGames: [
          {
            name: 'Just Chatting',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
          {
            name: 'Jump King',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Jump%20King-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
          {
            name: 'RISK: The Game of Global Domination',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/./RISK:%20The%20Game%20of%20Global%20Domination-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
        ],
        link: '40127400539',
      },
      {
        date: formatDate('2021-10-18T19:33:56.000+00:00'),
        length: '26',
        playedGames: [
          {
            name: 'Just Chatting',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
        ],
        link: '40127400539',
      },
      {
        date: formatDate('2021-10-20T19:44:11.000+00:00'),
        length: '120',
        playedGames: [
          {
            name: 'Just Chatting',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
          {
            name: 'Jump King',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Jump%20King-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
        ],
        link: '40127400539',
      },
      {
        date: formatDate('2021-10-20T19:44:11.000+00:00'),
        length: '120',
        playedGames: [
          {
            name: 'Just Chatting',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
          {
            name: 'Jump King',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Jump%20King-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
          {
            name: 'Just Chatting',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
          {
            name: 'Jump King',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Jump%20King-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
          {
            name: 'Just Chatting',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Just%20Chatting-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
          {
            name: 'Jump King',
            image:
              'https://static-cdn.jtvnw.net/ttv-boxart/Jump%20King-136x190.jpg?imenable=1&impolicy=user-profile-picture&imwidth=100',
          },
        ],
        link: '40127400539',
      },
    ],
    [],
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
      initialState: {
        // @ts-ignore
        sortBy: [
          {
            id: 'date',
            desc: true,
          },
        ],
      },
    },
    useSortBy,
  )

  return {
    data,
    columns,
    tableInstance,
  }
}
