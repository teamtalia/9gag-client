import styled from 'styled-components';

export const Container = styled.button`
  margin: 0 5px;
  background-color: ${({ theme }) => theme.primaryColor};
  border: 0;
  padding: 15px;
  border-radius: 2px;
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 22pt;
  cursor: pointer;
  svg {
    margin-top: 5px;
  }
  span {
    margin-right: 5px;
  }
  &:hover {
    background-color: ${({ theme }) => theme.primaryDarkColor};
  }
`;
