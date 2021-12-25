import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px;
  background: ${({ theme }) => theme.colors.grey900};
  width: 100%;
  min-height: 100vh;

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 8px;
  }
`
