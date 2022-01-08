import styled from 'styled-components'

export const DrawerContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  max-width: 80vw;
  width: 300px;
  height: 100%;
  padding: 24px 20px;
  gap: 24px;

  background-color: ${({ theme }) => theme.colors.grey900};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
`
