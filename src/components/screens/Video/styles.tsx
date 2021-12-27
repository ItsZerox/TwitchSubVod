import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 1rem;

  padding: 1rem 3rem;

  ${({ theme }) => theme.breakpoints.down('md')} {
    grid-template-columns: 1fr;
    padding: 1rem 0.5rem;
  }
`
