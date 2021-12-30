import styled from 'styled-components'

export const Table = styled.table`
  padding: 1rem;
  border-spacing: 0;
  border: 1px solid ${({ theme }) => theme.colors.grey800};
  color: ${({ theme }) => theme.colors.white};

  width: 100%;
  max-width: 900px;
`

export const Thead = styled.thead``

export const Tr = styled.tr`
  :last-child {
    td {
      border-bottom: 0;
    }
  }
`

export const Th = styled.th`
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey800};
  border-right: 1px solid ${({ theme }) => theme.colors.grey800};

  :last-child {
    border-right: 0;
  }
`

export const Tbody = styled.tbody``

export const Td = styled.td`
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey800};
  border-right: 1px solid ${({ theme }) => theme.colors.grey800};

  img {
    max-width: 75px;
    opacity: 0.9;

    :hover {
      opacity: 1;
    }
  }

  :last-child {
    border-right: 0;
  }
`
