import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.bgColor};
  svg {
    margin-top: 50px;
    color: white;
  }
`;

export const Logo = styled.image`
  width: 200px;
  height: 200px;
`;
