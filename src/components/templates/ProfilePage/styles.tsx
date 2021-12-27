import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  grid-gap: 2rem;

  padding: 1rem 2rem;

  ${({ theme }) => theme.breakpoints.down('md')} {
    display: flex;
    flex-direction: column;
    padding: 1rem 0.5rem;
  }
`
