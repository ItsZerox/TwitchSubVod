import styled from 'styled-components'

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 24px;
  background: ${({ theme }) => theme.colors.grey900};
  width: 100%;
  min-height: 100vh;
  gap: 16px;

  ins {
    text-align: center;
    margin: 0 auto;
  }

  ${({ theme }) => theme.breakpoints.down('md')} {
    padding: 8px;
  }
`
